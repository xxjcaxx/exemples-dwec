import * as domino from './domino.js';

import './styles.scss';
// import * as bootstrap from 'bootstrap';

// https://en.wikipedia.org/wiki/Domino_Tiles

let state;

const generatePlayerDiv = (playerTiles, position) => {
  const tiles = playerTiles.map((tile) => `<span id="tile-${tile}">${domino.getTile(domino.allTiles, tile, position)}</span>`).join('');
  const div = document.createElement('div');
  div.innerHTML = tiles;
  return div;
};

const generateBoardDiv = (board) => {
  const tiles = board.map((tile, idx) => `<span id="board-${tile.tile}" data-board_index = "${idx}"> 
                                          ${tile.tileFigure}</span>`).join('');
  const div = document.createElement('div');
  div.innerHTML = tiles;
  return div;
};

const drawPlayers = (state) => {
  document.querySelector('#player1').innerHTML = '';
  document.querySelector('#player2').innerHTML = '';
  document.querySelector('#player3').innerHTML = '';
  document.querySelector('#player4').innerHTML = '';
  document.querySelector('#player1').append(generatePlayerDiv(state.playersTiles[1], 'vertical'));
  document.querySelector('#player2').append(generatePlayerDiv(Array(state.playersTiles[2].length).fill('99'), 'horizontal'));
  document.querySelector('#player3').append(generatePlayerDiv(Array(state.playersTiles[3].length).fill('99'), 'horizontal'));
  document.querySelector('#player4').append(generatePlayerDiv(Array(state.playersTiles[4].length).fill('99'), 'vertical'));
  document.querySelector('#board').innerHTML = '';
  document.querySelector('#board').append(generateBoardDiv(state.board));
};

document.addEventListener('DOMContentLoaded', () => {
  state = domino.gameState();
  state = domino.startGame(4, state);
  domino.logBoard(state);
  domino.logPlayers(state);
  state = domino.getFirstPlayer(state);
  drawPlayers(state);

  let tileChoosen = null;

  document.querySelector('#player1').addEventListener('click', (e) => {
    const tileClicked = e.target.id.split('-')[1];
    if (tileClicked) {
      if (state.board.length === 0) {
        state = domino.moveToBoard(1, tileClicked, 'first', 'vertical', state);
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
    if (tileClicked && (tileIdx === 0 || tileIdx === state.board.length - 1)) {
      if (tileChoosen) {
        console.log(tileClicked, tileChoosen, tileIdx);
        if (domino.canFollowBoard(state.board, tileClicked, tileIdx)) {
          console.log('Can Follow');
        }
      }
    }
  });
});
