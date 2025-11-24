/*
Fer un web component 'buscador' que permeti cercar obres d'art.
Aquest component ha de tenir un camp de text per introduir el filtre de cerca i un botó per iniciar la cerca.
El component sols ha d'emetre un esdeveniment 'search' quan l'usuari escriu al camp de text. 
El component, amb ajuda de rxjs ha de evitar emetre l'esdeveniment 'search' més d'una vegada cada 500ms (debounceTime).
L'esdeveniment 'search' ha de portar com a detall el valor del camp de text.

Cal crear els estils css en un fitxer separat 'buscador.css' i importar-los al component.

El component ha de ser registrat amb el nom 'art-buscador'.
*/
import style from './style.css?inline';
import { debounceTime, fromEvent, map} from 'rxjs';


export class Buscador extends HTMLElement {
  constructor() {
    super();
    // Inicialització de les propietats i el shadow DOM
  }

  connectedCallback() {
    // Codi per renderitzar el component i afegir els listeners d'esdeveniments
    this.innerHTML = `
    <style>${style}</style>
      <input type="text" id="searchInput" placeholder="Cerca obres d'art..."/>
      <button id="searchButton">Cerca</button>
    `;

    const input = this.querySelector('#searchInput');
    const button = this.querySelector('#searchButton');

    // Utilitzar rxjs per gestionar l'input amb debounceTime

    fromEvent(input, 'input').pipe(
      map(event => event.target.value),
      debounceTime(500)
    ).subscribe(value => {
      this.dispatchEvent(new CustomEvent('search', {
        detail: value,
        bubbles: true,
        composed: true
      }));
    });

    // També es pot afegir un listener al botó si es vol
    button.addEventListener('click', () => {
      const value = input.value;
      this.dispatchEvent(new CustomEvent('search', {
        detail: value,
        bubbles: true,
        composed: true
      }));
    }); 
  }

  // Altres mètodes necessaris per gestionar les interaccions
}