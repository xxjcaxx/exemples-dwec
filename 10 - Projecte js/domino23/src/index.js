import * as domino from './domino.js';
import { drawPlayers } from './gameViews/gameViews.js';
import { route } from './router.js';

import './styles.scss';
import * as bootstrap from 'bootstrap';

// https://en.wikipedia.org/wiki/Domino_Tiles



document.addEventListener('DOMContentLoaded', () => {
 

  route(window.location.hash);

  window.addEventListener('hashchange', () => {
    route(window.location.hash);
  });
});
