import * as domino from './domino.js';
import { drawPlayers } from './gameViews/gameViews.js';
import { getBoardTemplate } from './gameViews/templates.js';

import './styles.scss';
// import * as bootstrap from 'bootstrap';

// https://en.wikipedia.org/wiki/Domino_Tiles

let state;

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#container').append(...getBoardTemplate());
  state = domino.gameState();
  state = domino.startGame(4, state);
  domino.logBoard(state);
  domino.logPlayers(state);
  state = domino.getFirstPlayer(state);
  drawPlayers(state);

  let tileChoosen = null;

  document.querySelector('#player1').addEventListener('click', (e) => {
    const tileClicked = e.target.id.split('-')[1];
    if (tileClicked && state.turn === 1) {
      if (state.board.length === 0) {
        state = domino.moveToBoard(1, tileClicked, 'first', 'vertical', state);
        state = domino.changeTurn(state);
      } else {
        tileChoosen = tileClicked;
      }

      drawPlayers(state);
      domino.logPlayers(state);
      domino.logBoard(state);
    }
  });

  document.querySelector('#board').addEventListener('click', (e) => {
    const tileClicked = e.target.id.split('-')[1];
    const tileIdx = parseInt(e.target.dataset.board_index, 10);
    if (tileClicked) {
      if (tileChoosen) {
        // console.log(tileClicked, tileChoosen, tileIdx);
        const canMove = domino.canFollowBoard(state.board, tileChoosen, tileIdx);
        // console.log(movePosition);
        if (canMove) {
          const location = tileIdx === 0 ? 'before' : 'after';
          state = domino.moveToBoard(1, tileChoosen, location, 'vertical', state);
          state = domino.changeTurn(state);
          drawPlayers(state);
        }
      }
    }
  });

  document.querySelector('#machine_step').addEventListener('click', (e) => {
    state = domino.doMachineStep(state);
    state = domino.changeTurn(state);
    drawPlayers(state);
  });

  document.querySelector('#new_game').addEventListener('click', (e) => {
    state = domino.calculateWinner(state);
    state = domino.restartGame(state);
    state = domino.getFirstPlayer(state);
    drawPlayers(state);
  });

  document.querySelector('#pass').addEventListener('click', (e) => {
    state = domino.changeTurn(state);
    drawPlayers(state);
  });
});
