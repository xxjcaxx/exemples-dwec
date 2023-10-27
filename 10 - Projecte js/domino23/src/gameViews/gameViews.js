import * as domino from '../domino.js';
import { getBoardTemplate } from './templates.js';

export { drawPlayers, generateGame };



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
  const container = document.createElement('div');
 
  container.append(...getBoardTemplate());


  container.querySelector('#player1').append(generatePlayerDiv(state.playersTiles[1], 'vertical'));
  container.querySelector('#player2').append(generatePlayerDiv(Array(state.playersTiles[2].length).fill('99'), 'horizontal'));
  container.querySelector('#player3').append(generatePlayerDiv(Array(state.playersTiles[3].length).fill('99'), 'vertical'));
  container.querySelector('#player4').append(generatePlayerDiv(Array(state.playersTiles[4].length).fill('99'), 'horizontal'));
  container.querySelector('#board').append(generateBoardDiv(state.board));
  container.querySelector(`#player${state.turn}`).classList.add('turn');

  container.querySelector('#stats').innerHTML = `Turn: Player ${state.turn} Winner: ${state.winner} Points: ${state.points}`;

  container.querySelector('#player1').addEventListener('click', (e) => {
    const tileClicked = e.target.id.split('-')[1];
    
    if (tileClicked && state.turn === 1) {
      if (state.board.length === 0) {
        state = domino.moveToBoard(1, tileClicked, 'first', 'vertical', state);
        state = domino.changeTurn(state);
      } else {
        state = domino.changeTileChoosen(tileClicked,state);
       // console.log(tileClicked, state.tileChoosen);
      }

      drawPlayers(state);
      domino.logPlayers(state);
      domino.logBoard(state);
    }
  });

  container.querySelector('#board').addEventListener('click', (e) => {
    const tileClicked = e.target.id.split('-')[1];
    const tileIdx = parseInt(e.target.dataset.board_index, 10);
    //console.log(tileClicked, state.tileChoosen, tileIdx);
    if (tileClicked) {
      if (state.tileChoosen) {
         //console.log(tileClicked, tileChoosen, tileIdx);
        const canMove = domino.canFollowBoard(state.board, state.tileChoosen, tileIdx);
        // console.log(movePosition);
        if (canMove) {
          const location = tileIdx === 0 ? 'before' : 'after';
          state = domino.moveToBoard(1, state.tileChoosen, location, 'vertical', state);
          state = domino.changeTurn(state);
          state = domino.changeTileChoosen(null,state);
          drawPlayers(state);
        }
      }
    }
  });

  container.querySelector('#machine_step').addEventListener('click', (e) => {
    state = domino.doMachineStep(state);
    state = domino.changeTurn(state);
    drawPlayers(state);
  });

  container.querySelector('#new_game').addEventListener('click', (e) => {
    state = domino.calculateWinner(state);
    state = domino.restartGame(state);
    state = domino.getFirstPlayer(state);
    drawPlayers(state);
  });

  container.querySelector('#pass').addEventListener('click', (e) => {
    state = domino.changeTurn(state);
    drawPlayers(state);
  });

  return container.childNodes.values();

};



const generateGame = ()=> {
  let state;
  state = domino.gameState();
  state = domino.startGame(4, state);
  domino.logBoard(state);
  domino.logPlayers(state);
  state = domino.getFirstPlayer(state);
  return drawPlayers(state);
}