import * as domino from './domino.js';
import { drawPlayers } from './gameViews/gameViews.js';
import { route } from './router.js';
import { menu } from './views/menu.js';

import './styles.scss';
import * as bootstrap from 'bootstrap';
import { isLogged } from './services/users.js';

// https://en.wikipedia.org/wiki/Domino_Tiles

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#menu').innerHTML = menu();

  route(window.location.hash);

  window.addEventListener('hashchange', () => {
    route(window.location.hash);
  });
});
