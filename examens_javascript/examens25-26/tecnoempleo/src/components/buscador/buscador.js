import { debounceTime, from, fromEvent, map, startWith, Subject, tap } from 'rxjs';


export const handleChange = (form) => (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const filters = new URLSearchParams([
    ['Descripción', `ilike.*${formData.get('description')}*`],
    ['Jornada', `eq.${formData.get('jornada')}`],
    ['Tipo contrato', `eq.${formData.get('tipo-contrato')}`],
    ['Funciones', `eq.${formData.get('funciones')}`],
    ['"Salario Mínimo"::int', `gte.${formData.get('salario-minimo')}`]
  ]);

  //console.log('Filtros aplicados:', ""+filters);

  return filters;
}

class TecnoBuscador extends HTMLElement {


  constructor() {
    super();
    this.filtersSubject = new Subject();
  }

  insertJornadas(jornadas) {
    const selectJornada = this.querySelector('#select-jornada');
    jornadas.forEach((jornada) => {
      const option = document.createElement('option');
      option.value = jornada.id;
      option.textContent = jornada.jornadas;
      selectJornada.appendChild(option);
    });
  }

  insertTiposContrato(tipos) {
    const selectTipoContrato = this.querySelector('#select-tipo-contrato');
    tipos.forEach((tipo) => {
      const option = document.createElement('option');
      option.value = tipo.id;
      option.textContent = tipo.tipo;
      selectTipoContrato.appendChild(option);
    });
  }

  insertFunciones(funciones) {
    const selectFunciones = this.querySelector('#select-funciones');
    funciones.forEach((funcion) => {
      const option = document.createElement('option');
      option.value = funcion.id;
      option.textContent = funcion.funcion;
      selectFunciones.appendChild(option);
    });
  }

  connectedCallback() {
    this.innerHTML = `<h2>Buscador</h2>
    <form id="buscador-form">
      <input id="buscador-input" type="text" name="description" placeholder="Buscar en título y descripción">
      <select id="select-jornada" name="jornada"></select>
      <select id="select-tipo-contrato" name="tipo-contrato"></select>
      <select id="select-funciones" name="funciones"></select>
      <label for="salario-minimo">Salario mínimo:
          <span id="range-value">0</span> €
      </label>
      <input id="salario-minimo" type="range" name="salario-minimo" min="0" max="100000" step="100" value="20000" placeholder="Salario mínimo">
    </form>
  `;

    const form = this.querySelector('#buscador-form');
    const rangeOutput = this.querySelector("#range-value");
    const salarioMinimoInput = this.querySelector("#salario-minimo");
    //rangeOutput.textContent = formData.get('salario-minimo');
    //
    fromEvent(salarioMinimoInput, 'input').subscribe(e => {
      //console.log(e);

      rangeOutput.textContent = e.target.value;
    });


    fromEvent(form, 'change').pipe(
      map(handleChange(form)),
     // tap(console.log)
    ).subscribe(this.filtersSubject);

    fromEvent(form, 'keyup').pipe(
      debounceTime(300),
      map(handleChange(form)),
    )
      .subscribe(this.filtersSubject);


  }

}

customElements.define('tecno-buscador', TecnoBuscador);