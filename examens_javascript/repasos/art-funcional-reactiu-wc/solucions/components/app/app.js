/*
Aquest web component 'app' ha de ser el component arrel de l'aplicació.
Aquest component ha de contenir el component 'buscador' i el component 'card-list'.

El component ha de gestionar l'estat de l'aplicació, incloent la llista d'obres d'art i el filtre de cerca.

Quan l'usuari escriu al camp de text del component 'buscador', el component 'app' ha d'escoltar l'esdeveniment 'search' i actualitzar la llista d'obres d'art mostrada al component 'card-list' segons el filtre introduït.

El component ha de fer servir les funcions del mòdul 'artService.js' per obtenir les dades de les obres d'art.

Cal crear els estils css en un fitxer separat 'app.css' i importar-los al component.

El component ha de ser registrat amb el nom 'art-app'.
*/

import { fromEvent, map, startWith } from 'rxjs';
import { searchArts } from '../../services/artService.js';

export class App extends HTMLElement {
  constructor() {
    super();
    // Inicialització de l'estat i altres propietats
  }

  connectedCallback() {
    // Codi per renderitzar el component i afegir els listeners d'esdeveniments
    this.innerHTML = `
      <art-buscador></art-buscador>
      <art-card-list></art-card-list>
    `;
    const buscador = this.querySelector('art-buscador');
    const cardList = this.querySelector('art-card-list');
    

    const search$ = fromEvent(buscador, 'search').pipe(
      // Mapear l'esdeveniment per obtenir el valor del filtre
      map(event => event.detail),
      startWith('') // Valor inicial buit per carregar totes les obres d'art
    );

    const subscription = searchArts(search$).subscribe(artWorks => {
      cardList.artWorks = artWorks;
    });

   
  }

  // Altres mètodes necessaris per gestionar l'estat i les interaccions
}

