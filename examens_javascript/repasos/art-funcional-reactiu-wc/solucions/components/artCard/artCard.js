import style from './card.css?inline';

export const cardTemplate = (artWork) => `
<style>${style}</style>
<div class="artWork">
    <img src="${artWork.img_url}" alt="${artWork.title}"/>
    <h2>${artWork.title}</h2>
    <p>${artWork.description ? artWork.description : ''}</p>
</div>
`;


/*
Crear un web component 'art-card' que mostri la informació d'una obra d'art.
Aquest component ha de rebre un objecte 'artWork' com a propietat i utilitzar la plantilla 'cardTemplate' per renderitzar el contingut.
El component ha de tenir un mètode 'set artWork(value)' per actualitzar la propietat i renderitzar el contingut.
El component ha de tenir un mètode 'render()' que utilitzi la plantilla per generar el HTML i inserir-lo al shadow DOM.

El component ha de ser registrat amb el nom 'art-card'.

El component no obté les dades de l'obra d'art, només les mostra. Les dades seran passades des de fora del component.

Cal crear els estils css en un fitxer separat 'artCard.css' i importar-los al component.
*/

export class ArtCard extends HTMLElement {
  constructor() {
    super();
    // Inicialització de les propietats i el shadow DOM
    this.attachShadow({ mode: 'open' });
    this.artWork = null;
  }

  connectedCallback() {
    // Codi per renderitzar el component
    this.render();
  }

  set artWork(value) {
    // Actualització de la propietat i renderització del contingut
    this._artWork = value;
    console.log(value);
    
    this.render();
  }

  get artWork() {
    return this._artWork;
  }

  render() {
    // Generació del HTML utilitzant la plantilla i inserció al shadow DOM
    if (this.artWork) {
      this.shadowRoot.innerHTML = cardTemplate(this.artWork);
    }
  }
}   