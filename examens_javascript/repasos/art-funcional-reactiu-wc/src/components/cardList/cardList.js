/*
Cal crear un web component 'card-list' que mostri una llista d'obres d'art.
Aquest component ha de rebre una llista d'objectes 'artWork' com a propietat i utilitzar el component 'art-card' per renderitzar cada obra d'art.

El component ha de tenir un mètode 'set artWorks(value)' per actualitzar la propietat i renderitzar el contingut.
El component ha de tenir un mètode 'render()' que genere el HTML amb una instància d'art-card per a cada obra d'art i inserir-lo al shadow DOM.

S'utilitzaran les funcions del mòdul 'utils.js' per a les operacions asíncrones i de transformació.

El component ha de ser registrat amb el nom 'card-list'.

El component no obté les dades de les obres d'art, només les mostra. Les dades seran passades des de fora del component.

Cal crear els estils css en un fitxer separat 'cardList.css' i importar-los al component.
 */

import style from './list.css?inline';

import { BehaviorSubject } from "rxjs";

export class CardList extends HTMLElement {

    artWorks$ = new BehaviorSubject([]);
    artWorksSubscription = null;

  constructor() {
    super();
    // Inicialització de les propietats i el shadow DOM
 
  }

  connectedCallback() {
    // Codi per renderitzar el component
      this.artWorksSubscription = this.artWorks$.subscribe(this.render);
      
  }

  set artWorks(value) {
    // Actualització de la propietat i renderització del contingut
    this.artWorks$.next(value);
  }


  disconnectedCallback() {
    // Neteja de recursos si cal
    if (this.artWorksSubscription) {
      this.artWorksSubscription.unsubscribe();
    }
  }

  render = (artWorks) => {
    // Generació del HTML utilitzant la plantilla i inserció al shadow DOM
    const cardsArtworks = artWorks.map(artWork => {
        const artCard = document.createElement('art-card');
        artCard.artWork = artWork;
        return artCard;
    });
    
    const host = document.createElement('div');
    host.className = 'card-list-host';
    const stylElement = document.createElement('style');
    stylElement.textContent = style;
    host.append(stylElement,...cardsArtworks);
    this.innerHTML = '';
    this.appendChild(host);

  }
}