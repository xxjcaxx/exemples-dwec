export {
  getTile, gameTiles, allTiles, shuffleTiles, tileCanFollow, filterTilesThatCanFollow, blackTile,
  gameState, rotateGame, getFreeNumbersBoard, canFollowBoard, startGame, changeTileChoosen, moveToBoard, changeTurn, getFromTileStack,
  logBoard, logPlayers, getFirstPlayer, getFollowPosition, rotateIfNedeed, doMachineStep, orderByPriority,
  restartGame, calculateWinner, checkFinished,
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

const boardToArray = (board) => board.map((t) => idToCoordinates(t.tile)).flat();

const tileCanFollow = (number, tile) => idToCoordinates(tile).some((n) => n === number);

const filterTilesThatCanFollow = (number, tiles) => tiles.filter((t) => tileCanFollow(number, t));

const getFreeNumbersBoard = (board) => ([boardToArray(board)[0], boardToArray(board).at(-1)]);

// Returns if a tile can follow a position (after or before)
const canFollowBoard = (board, tile, idx) => {
  let canFollow = false;
  if (idx === 0 || idx === board.length - 1) {
    const indexLocation = idx === 0 ? 0 : 1;
    const numberToFollow = getFreeNumbersBoard(board)[indexLocation];
    canFollow = tileCanFollow(numberToFollow, tile);
    if (board.length === 1) {
      const numberToFollow2 = getFreeNumbersBoard(board)[1];
      canFollow = canFollow ? true : tileCanFollow(numberToFollow2, tile);
    }
  }
  return canFollow;
};

// Returns a valid position to follow, if can't follow returns false
const getFollowPosition = (board, tile) => {
  const freeNumbersBoard = getFreeNumbersBoard(board);
  if (board.length === 1) { // Specific 1 tile case
    const followAfter = tileCanFollow(freeNumbersBoard[1], tile);
    const followBefore = tileCanFollow(freeNumbersBoard[0], tile);
    if (followAfter) {
      return 'after';
    } if (followBefore) {
      return 'before';
    }
  }
  if (tileCanFollow(freeNumbersBoard[1], tile)) { return 'after'; }
  if (tileCanFollow(freeNumbersBoard[0], tile)) { return 'before'; }

  return false;
};

const rotateIfNedeed = (tile, board, location) => {
  if (board.length > 0) {
    const boardTile = location === 'after' ? board.at(-1).tile : board[0].tile;
    const boardTileCoordinates = idToCoordinates(boardTile);
    const tileCoordinates = idToCoordinates(tile);
    const numberToFollow = location === 'after' ? boardTileCoordinates[1] : boardTileCoordinates[0];
    const expectedNumber = location === 'after' ? tileCoordinates[0] : tileCoordinates[1];
    if (numberToFollow === expectedNumber) {
      return tile;
    }
    return tile.split('').reverse().join('');
  }
  return tile;
};

const sumTiles = (tiles) => tiles.reduce((total, tile) => {
  total += (idToCoordinates(tile)[0] + idToCoordinates(tile)[1]);
  return total;
}, 0);

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
  winner: null,
  points: [0, 0, 0, 0],
  tileChoosen: null,
  rotation: 0,
});

/* Game State Management */

function startGame(players, state) {
  const stateCopy = structuredClone(state);
  stateCopy.players = players;
  stateCopy.tileStack = shuffleTiles(gameTiles);
  for (let i = 0; i < players; i++) {
    stateCopy.playersTiles[i + 1] = stateCopy.tileStack.splice(0, 7);
  }
  return stateCopy;
}

function restartGame(state) {
  const stateCopy = structuredClone(state);
  stateCopy.tileStack = shuffleTiles(gameTiles);
  stateCopy.board = [];
  for (let i = 0; i < stateCopy.players; i++) {
    stateCopy.playersTiles[i + 1] = stateCopy.tileStack.splice(0, 7);
  }
  return stateCopy;
}

function rotateGame(state, rotation) {
  const stateCopy = structuredClone(state);
  for (let playerIndex = 1; playerIndex <= state.players; playerIndex++) {
    stateCopy.playersTiles[`${(playerIndex - 1 + rotation) % state.players + 1}`] = state.playersTiles[`${playerIndex}`];
  }
  stateCopy.turn = (state.turn - 1 + rotation) % state.players + 1;
  stateCopy.rotation = rotation;
  //console.log(stateCopy,state);
  return stateCopy;
}

const changeTileChoosen = (tile, state) => {
  const stateCopy = structuredClone(state);
  stateCopy.tileChoosen = tile;
  return stateCopy;
};

const moveToBoard = (player, tile, location, position, state) => {
  let stateCopy = structuredClone(state);
  const tileIndex = stateCopy.playersTiles[player].indexOf(tile);
  if (location === 'before') {
    const rotatedTile = rotateIfNedeed(tile, stateCopy.board, location);
    const tileFigure = getTile(allTiles, rotatedTile, position);
    stateCopy.board = [{
      tileFigure, tile: rotatedTile, position, player,
    }, ...stateCopy.board];
  } else { // after
    const rotatedTile = rotateIfNedeed(tile, stateCopy.board, location);
    const tileFigure = getTile(allTiles, rotatedTile, position);
    stateCopy.board.push({
      tileFigure, tile: rotatedTile, position, player,
    });
  }
  stateCopy.playersTiles[player].splice(tileIndex, 1);
  if (checkFinished(stateCopy)) { /// /////// Mala decisió, cal solucionar-ho en Observables
    stateCopy = calculateWinner(stateCopy);
    stateCopy = restartGame(stateCopy);
    stateCopy = getFirstPlayer(stateCopy);
  }
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
  const choosen = ['66', '55', '44', '33', '22', '11'].map((doubleTile) => Object.values(stateCopy.playersTiles).findIndex((pt) => pt.includes(doubleTile)) + 1);
  const choosed = choosen.find((index) => index > 0);
  stateCopy.turn = choosed || Math.floor(Math.round() * stateCopy.players) + 1;

  return stateCopy;
};

const calculateWinner = (state) => {
  const stateCopy = structuredClone(state);
  const points = Object.values(stateCopy.playersTiles).map(sumTiles);
  const max = [...points].sort((a, b) => (a > b ? -1 : 1))[0];
  stateCopy.winner = points.indexOf(max);
  stateCopy.points = stateCopy.points.map((p, i) => p + points[i]);
  return stateCopy;
};

const checkFinished = (state) => Boolean(
  Object.entries(state.playersTiles).find(
    ([player, tiles]) => tiles.length === 0 && player <= state.players,
  ),
);

/* IA */

const orderByPriority = (tiles) => tiles.sort((a, b) => {
  const aCoordinates = idToCoordinates(a);
  const bCoordinates = idToCoordinates(b);
  let aPoints = 0;
  let bPoints = 0;
  if (aCoordinates[0] === aCoordinates[1]) aPoints += 12;
  if (bCoordinates[0] === bCoordinates[1]) bPoints += 12;
  aPoints += (aCoordinates[0] + aCoordinates[1]);
  bPoints += (bCoordinates[0] + bCoordinates[1]);
  return aPoints > bPoints ? -1 : 1;
});

const doMachineStep = (state) => {
  let stateCopy = structuredClone(state);
  const { turn, board, playersTiles } = stateCopy;
  if (board.length === 0) { // Start
    const selectedTile = orderByPriority(playersTiles[turn])[0];
    stateCopy = moveToBoard(turn, selectedTile, 'after', 'vertical', stateCopy);
  } else {
    const freeNumbersBoard = getFreeNumbersBoard(board);
    const tilesThatCanFollow = [
      ...filterTilesThatCanFollow(freeNumbersBoard[0], playersTiles[turn]),
      ...filterTilesThatCanFollow(freeNumbersBoard[1], playersTiles[turn]),
    ];
    if (tilesThatCanFollow.length > 0) {
      const selectedTile = orderByPriority(tilesThatCanFollow)[0];
      const position = getFollowPosition(board, selectedTile, 1);
      stateCopy = moveToBoard(turn, selectedTile, position, 'horizontal', stateCopy);
    }
  }
  return stateCopy;
};
