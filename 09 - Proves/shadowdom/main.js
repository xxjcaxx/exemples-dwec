import * as bootstrap from "bootstrap";
import "./styles.scss";
import styles from "./styles.scss?inline";

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
          />
        </div>

        <!-- Botón de enviar -->
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
      <div>
        <p><strong>Valor Nombre:</strong> <span id="nombre-output"></span></p>
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
  console.log(styles);

  ///////// El formulario reactivo

  class formularioReactivo extends HTMLElement {

    constructor() {
      super();

    }
    connectedCallback() {
      const templateFormulario = document.createElement('template');
      templateFormulario.innerHTML = plantillaFormulario;
      const templateFormularioContent = templateFormulario.content;
      const shadowRoot = this.attachShadow({ mode: "closed" });
      shadowRoot.append(templateFormularioContent.cloneNode(true));
    }

  }

  customElements.define("custom-formularioreactivo", formularioReactivo);

  document.querySelector("#reactividad").innerHTML = "";

  document.querySelector("#reactividad").innerHTML = `
  <custom-formularioreactivo>
    <span slot="titulo">Formulario reactivo con el titulo en slot</slot>
  </custom-formularioreactivo>
  `;

  // Obtenemos el "estado" del formulario:

  const formulario = document.querySelector("#formularioReactivo");
});
