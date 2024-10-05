import * as bootstrap from "bootstrap";
import "./styles.scss";
import styles from "./styles.scss?inline";
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  filter,
  withLatestFrom,
  map,
  tap,
  fromEvent,
  debounceTime,
  distinctUntilChanged,
  interval,
  merge
} from "rxjs";

const _ = {
  compose:
    (...fns) =>
      (x) =>
        fns.reduceRight((v, f) => f(v), x),
  asyncCompose:
    (...fns) =>
      (x) =>
        fns.reduceRight(async (v, f) => f(await v), x),
  curriedMap: (func) => (array) => array.map(func),

};

const plantillaFormulario = `
    <div class="container mt-5">
      <h2 class="mb-4">
      <slot name="titulo">Formulario reactivo</slot>
      </h2>
      <form id="formularioReactivo">
        <!-- Campo de texto -->
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre</label>
          <input
            type="text"
            class="form-control"
            id="nombre"
            placeholder="Ingresa tu nombre"
            required
            name="nombre"
          />
        </div>

        <!-- Campo de correo electrónico -->
        <div class="mb-3">
          <label for="email" class="form-label">Correo Electrónico</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="Ingresa tu correo electrónico"
            required
            name="email"
          />
        </div>

        <!-- Botón de enviar -->
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
      <div>
        <p><strong>Valor Nombre:</strong> 
        <span id="nombre-output"></span>
        </p>
        <p>
          <strong>Valor Correo Electrónico:</strong>
          <span id="email-output"></span>
        </p>
      </div>
    </div>
`;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#app").innerHTML = `
  <div>
  <div class="container py-4 px-3 mx-auto">
  <h1>Hello, Bootstrap and Vite!</h1>
  <button class="btn btn-primary">Primary button</button>
</div>   
  </div>
`;

  const host = document.querySelector("#host");
  const shadow = host.attachShadow({ mode: "open" });
  const span = document.createElement("div");
  span.innerHTML = `
 <style>${styles}</style>
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" >Dark</button>
`;
  shadow.appendChild(span);
  //console.log(styles);

  ///////// El formulario reactivo
  const createCustomFormComponent = ({
    tag, 
    template, 
    keyUpFunction // Object destructuring
  }) => {
    class customComponent extends HTMLElement {
      constructor() {
        super();
        this.dataSubject = new Subject();  // La manera de obtener datos del padre
      }
      connectedCallback() {
        const templateComponent = document.createElement('template');
        templateComponent.innerHTML = template;
        const shadowRoot = this.attachShadow({ mode: "closed" });

        // Este paso es redundante e innecesario en este caso ya que estamos creando la plantilla dinámicamente
        // Lo dejamos para dejar la referencia a las funciones en un mismo ejemplo. 
        const contentFragment = templateComponent.content;
        const content = contentFragment.cloneNode(true);
        shadowRoot.append(content);

        // El evento de keyup tratado de forma reactiva 
        this.keyUpSubscription = fromEvent(shadowRoot, 'keyup')
          .pipe(
            map((event) => new FormData(shadowRoot.querySelector('form'))),
            distinctUntilChanged(
              (previous, current) =>
                [...previous.entries()]
                  .every(
                    ([key, value], index) =>
                      value === [...current.entries()][index][1]
                  )),
            debounceTime(200)
          ).subscribe(values => {
            // Evento para informar al componente padre de un cambio
            const customEvent = new CustomEvent('formChanged', {
              bubbles: true,
              detail: { message: 'Form changed', values }
            });
            this.dispatchEvent(customEvent);
            // Implementar la reactividad en el mismo formulario
            keyUpFunction(shadowRoot)(values);
          });

          // Atender a los datos externos
        this.dataSubscription = this.dataSubject.subscribe(data => {
          [...shadowRoot.querySelectorAll('input')]
          .forEach(input => input.value = data[input.name]);
          shadowRoot.dispatchEvent(new KeyboardEvent('keyup'));
        });
      }



      disconnectedCallback() {
        this.keyUpSubscription.unsubscribe();
        this.dataSubscription.unsubscribe();
      }

    }
    customElements.define(tag, customComponent);
  }




  createCustomFormComponent(
    {  // Al pasar un objeto como parámetro, podemos asignar los nombres de los atributos y desordenarlos.
      tag: 'custom-formularioreactivo',
      template: plantillaFormulario,
      keyUpFunction: (shadowRoot) => (values) => {
        [...values].forEach(([key, value]) => {
          shadowRoot.querySelector(`#${key}-output`).innerText = value;
        });
      }
    }
  )

  const customFormulario = document.createElement('custom-formularioreactivo');

  // Crear el span con el slot="titulo"
  const spanTitulo = document.createElement('span');
  spanTitulo.setAttribute('slot', 'titulo');
  spanTitulo.textContent = 'Formulario reactivo con el titulo en slot';

  // Añadir el span al custom element
  customFormulario.appendChild(spanTitulo);

  // Insertar el custom element en el DOM
  document.querySelector("#reactividad").appendChild(customFormulario);

  // Atender al evento 
  document.querySelector("#reactividad").addEventListener('formChanged', event => {
    console.log(event.detail);
  });

  interval(1000).pipe(
    map(i=>({nombre: i, email: i}))
  )
  .subscribe(customFormulario.dataSubject)

  // Obtenemos el "estado" del formulario:

  const formulario = document.querySelector("#formularioReactivo");
});
