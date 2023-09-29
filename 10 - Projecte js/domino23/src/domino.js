export {
  getTile, gameTiles, allTiles, shuffleTiles, tileCanFollow, filterTilesThatCanFollow, blackTile,
  gameState, getFreeNumbersBoard, canFollowBoard, startGame, moveToBoard, changeTurn, getFromTileStack,
  logBoard, logPlayers, getFirstPlayer,
};

const allTiles = [
  ['🀱', '🀲', '🀳', '🀴', '🀵', '🀶', '🀷'],
  ['🀸', '🀹', '🀺', '🀻', '🀼', '🀽', '🀾'],
  ['🀿', '🁀', '🁁', '🁂', '🁃', '🁄', '🁅'],
  ['🁆', '🁇', '🁈', '🁉', '🁊', '🁋', '🁌'],
  ['🁍', '🁎', '🁏', '🁐', '🁑', '🁒', '🁓'],
  ['🁔', '🁕', '🁖', '🁗', '🁘', '🁙', '🁚'],
  ['🁛', '🁜', '🁝', '🁞', '🁟', '🁠', '🁡'],
  ['🁣', '🁤', '🁥', '🁦', '🁧', '🁨', '🁩'],
  ['🁪', '🁫', '🁬', '🁭', '🁮', '🁯', '🁰'],
  ['🁱', '🁲', '🁳', '🁴', '🁵', '🁶', '🁷'],
  ['🁸', '🁹', '🁺', '🁻', '🁼', '🁽', '🁾'],
  ['🁿', '🂀', '🂁', '🂂', '🂃', '🂄', '🂅'],
  ['🂆', '🂇', '🂈', '🂉', '🂊', '🂋', '🂌'],
  ['🂍', '🂎', '🂏', '🂐', '🂑', '🂒', '🂓'],
];

const blackTile = ['🁢', '🀰'];

// Select non repeated tiles represented by an integer
// (23 is 🁂, but we don't need 32 🁈)

const gameTiles = (() => {
  const numbers = [0, 1, 2, 3, 4, 5, 6];
  const tiles = numbers.map((n) => numbers.filter((a) => a >= n).map((a) => `${n}${a}`)).flat();
  return tiles;
})();

//  Fisher-Yates algorithm
const shuffleTiles = (tiles) => {
  const tilesAux = [...tiles];
  for (let i = tilesAux.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = tilesAux[i];
    tilesAux[i] = tilesAux[j];
    tilesAux[j] = temp;
  }
  return tilesAux;
};

const idToCoordinates = (id) => (`${id}`).split('').map((n) => parseInt(n));

const getTile = (tiles, id, position) => {
  let [x, y] = idToCoordinates(id);
  if (x === 9) return blackTile[position === 'vertical' ? 0 : 1];
  x = position === 'vertical' ? x + 7 : x;
  return tiles[x][y];
};

const tileCanFollow = (number, tile) => idToCoordinates(tile).some((n) => n === number);

const filterTilesThatCanFollow = (number, tiles) => tiles.filter((t) => tileCanFollow(number, t));

const getFreeNumbersBoard = (board) => ([parseInt(board[0].tile.split('')[0], 10), parseInt(board.at(-1).tile.split('')[1], 10)]);

const canFollowBoard = (board, tile, idx) => {
  console.log(board, tile, idx);
  let canFollow = false;
  if (idx === 0 || idx === board.length - 1) {
    const indexLocation = idx === 0 ? 0 : 1;
    const numberToFollow = getFreeNumbersBoard(board)[indexLocation];
    console.log({indexLocation,numberToFollow});
    canFollow = tileCanFollow(numberToFollow, tile);
    
  }
  return canFollow;
};

/* GAME STATE */

const gameState = () => ({
  playersTiles: {
    1: [],
    2: [],
    3: [],
    4: [],
  },
  players: 0,
  turn: 1,
  board: [], // { tileFigure, tile, position, player}
  tileStack: [],
});

/* Game State Management */

const startGame = (players, state) => {
  const stateCopy = structuredClone(state);
  stateCopy.players = players;
  stateCopy.tileStack = shuffleTiles(gameTiles);
  for (let i = 0; i < players; i++) {
    stateCopy.playersTiles[i + 1] = stateCopy.tileStack.splice(0, 7);
  }
  return stateCopy;
};

const moveToBoard = (player, tile, location, position, state) => {
  const stateCopy = structuredClone(state);
  const tileIndex = stateCopy.playersTiles[player].indexOf(tile);
  const tileFigure = getTile(allTiles, tile, position);
  if (location === 'first') {
    stateCopy.board = [{
      tileFigure, tile, position, player,
    }, ...stateCopy.board];
  } else { // last
    stateCopy.board.push({
      tileFigure, tile, position, player,
    });
  }
  stateCopy.playersTiles[player].splice(tileIndex, 1);
  return stateCopy;
};

const changeTurn = (state) => {
  const stateCopy = structuredClone(state);
  stateCopy.turn = stateCopy.turn === stateCopy.players ? 1 : stateCopy.turn + 1;
  return stateCopy;
};

const getFromTileStack = (player, state) => {
  const stateCopy = structuredClone(state);
  stateCopy.playersTiles[player].push(stateCopy.tileStack.pop());
  return stateCopy;
};

const logBoard = (state) => { console.log('Board: ', state.board.map((t) => t.tileFigure)); };

const logPlayers = (state) => {
  const colors = [
    '#2a9d8f', '#e9c46a', '#a8dadc', '#e63946',
  ];
  console.log(state.players);
  for (let i = 0; i < state.players; i++) {
    console.log(`%c${state.playersTiles[i + 1].map((t) => getTile(allTiles, t, 'vertical')).join('')}`, `font-size: 3em; color: ${colors[i]}`);
  }
};

const getFirstPlayer = (state) => {
  const stateCopy = structuredClone(state);
  const choosen = ['66', '55', '44', '33', '22', '11'].map((doubleTile) => Object.values(state.playersTiles).findIndex((pt) => pt.includes(doubleTile)) + 1);
  stateCopy.turn = choosen.find((index) => index > 0);
  return stateCopy;
};
