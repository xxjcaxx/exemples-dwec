import * as domino from '../domino.js';
import { getBoardTemplate } from './templates.js';

export { drawPlayers };

const generatePlayerDiv = (playerTiles, position) => {
  const tiles = playerTiles.map((tile) => `<span id="tile-${tile}">${domino.getTile(domino.allTiles, tile, position)}</span>`).join('');
  const div = document.createElement('div');
  div.innerHTML = tiles;
  return div;
};

const generateBoardDiv = (board) => {
  const tiles = board.map((tile, idx) => `<span id="board-${tile.tile}" data-board_index = "${idx}" class="board-tile-${tile.position}"> 
                                            ${tile.tileFigure}</span>`).join('');
  const div = document.createElement('div');
  div.innerHTML = tiles;
  return div;
};

const drawPlayers = (state) => {
  const container = document.querySelector('#container');
  container.innerHTML = '';
  container.append(...getBoardTemplate());

  document.querySelector('#player1').append(generatePlayerDiv(state.playersTiles[1], 'vertical'));
  document.querySelector('#player2').append(generatePlayerDiv(Array(state.playersTiles[2].length).fill('99'), 'horizontal'));
  document.querySelector('#player3').append(generatePlayerDiv(Array(state.playersTiles[3].length).fill('99'), 'vertical'));
  document.querySelector('#player4').append(generatePlayerDiv(Array(state.playersTiles[4].length).fill('99'), 'horizontal'));
  document.querySelector('#board').append(generateBoardDiv(state.board));
  document.querySelector(`#player${state.turn}`).classList.add('turn');

  document.querySelector('#stats').innerHTML = `Turn: Player ${state.turn} Winner: ${state.winner} Points: ${state.points}`;

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

};
