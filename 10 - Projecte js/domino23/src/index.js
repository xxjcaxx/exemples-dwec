import * as domino from './domino.js';
import { drawPlayers } from './gameViews/gameViews.js';

import './styles.scss';
// import * as bootstrap from 'bootstrap';

// https://en.wikipedia.org/wiki/Domino_Tiles

let state;

document.addEventListener('DOMContentLoaded', () => {
  state = domino.gameState();
  state = domino.startGame(4, state);
  domino.logBoard(state);
  domino.logPlayers(state);
  state = domino.getFirstPlayer(state);
  drawPlayers(state);
});
