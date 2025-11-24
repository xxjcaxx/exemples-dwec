// Aquest arxiu sols rep els components i els registra
import {App} from './components/app/app.js';
import {Buscador} from './components/buscador/buscador.js';
import {CardList} from './components/cardList/cardList.js';
import {ArtCard} from './components/artCard/artCard.js';


customElements.define('art-app', App);
customElements.define('art-buscador', Buscador);
customElements.define('art-card-list', CardList);
customElements.define('art-card', ArtCard);