export { getTile, gameTiles, allTiles, blackTile, shuffleTiles, tileCanFollow, filterTilesThatCanFollow }

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

const idToCoordinates = (id) => (`${id}`).split('').map(n=>parseInt(n));

const getTile = (tiles, id, position) => {
  let [x, y] = idToCoordinates(id);
  x = position === 'vertical' ? x + 7 : x;
  return tiles[x][y];
};

const tileCanFollow = (number,tile) => idToCoordinates(tile).some(n => n == number);

const filterTilesThatCanFollow = (number,tiles) => tiles.filter(t => tileCanFollow(number,t));

