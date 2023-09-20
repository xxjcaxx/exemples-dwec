import {
  getTile, gameTiles, allTiles, shuffleTiles, tileCanFollow, filterTilesThatCanFollow, gameState,
} from './domino.js';
import './styles.scss';
// import * as bootstrap from 'bootstrap';

// https://en.wikipedia.org/wiki/Domino_Tiles

const generatePlayerDiv = (playerTiles, position) => {
  const tiles = playerTiles.map((tile) => `<span id="tile-${tile}">${getTile(allTiles, tile, position)}</span>`).join('');
  const div = document.createElement('div');
  div.innerHTML = tiles;
  return div;
};

const generateBoardDiv = (board) => {
  const tiles = board.map((tile, idx) => `<span id="board-${tile.tile}" data-first = "${idx === 0 ? 'first' : 'no'}" data-last = "${idx === board.length - 1 ? 'last' : 'no'}">${tile.tileFigure}</span>`).join('');
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
  const state = gameState();
  state.startGame(4);
  state.logBoard();
  state.logPlayers();
  state.turn = state.getFirstPlayer();
  drawPlayers(state);
  let tileChoosen = null;

  document.querySelector('#player1').addEventListener('click', (e) => {
    const tileClicked = e.target.id.split('-')[1];
    if (tileClicked) {
      if (state.board.length === 0) {
        state.moveToBoard(1, tileClicked, 'vertical');
      } else {
        tileChoosen = tileClicked;
      }

      drawPlayers(state);
      // state.logPlayers();
    }
  });

  document.querySelector('#board').addEventListener('click', (e) => {
    const tileClicked = e.target.id.split('-')[1];
    const locationFirst = e.target.dataset.first;
    const locationLast = e.target.dataset.last;
    if (tileClicked && (locationFirst || locationLast)) {
      if (tileChoosen) {
        console.log(tileClicked, tileChoosen, locationFirst, locationLast);
      }
    }
  });
});
