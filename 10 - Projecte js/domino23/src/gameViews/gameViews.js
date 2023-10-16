import * as domino from '../domino.js';

export { drawPlayers };

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
  [1, 2, 3, 4].forEach((p) => {
    document.querySelector(`#player${p}`).classList.remove('turn');
    document.querySelector(`#player${p}`).innerHTML = '';
  });

  document.querySelector('#player1').append(generatePlayerDiv(state.playersTiles[1], 'vertical'));
  document.querySelector('#player2').append(generatePlayerDiv(Array(state.playersTiles[2].length).fill('99'), 'horizontal'));
  document.querySelector('#player3').append(generatePlayerDiv(Array(state.playersTiles[3].length).fill('99'), 'vertical'));
  document.querySelector('#player4').append(generatePlayerDiv(Array(state.playersTiles[4].length).fill('99'), 'horizontal'));
  document.querySelector('#board').innerHTML = '';
  document.querySelector('#board').append(generateBoardDiv(state.board));
  document.querySelector(`#player${state.turn}`).classList.add('turn');

  document.querySelector('#stats').innerHTML = `Turn: Player ${state.turn} Winner: ${state.winner} Points: ${state.points}`;
};
