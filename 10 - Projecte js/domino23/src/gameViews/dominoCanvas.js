import * as domino from '../domino.js';

export { generateDominoCanvas };

const generateDominoCanvas = (board, dimensions) => {
  const boardCopy = structuredClone(board);
  const canvas = document.createElement('canvas');
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;

  const ctx = canvas.getContext('2d');

  ctx.font = `${dimensions.width / 11}px system-ui`;
  const metrics = { full: ctx.measureText('🀳'), half: ctx.measureText('🁥') };
  console.log(metrics.full.width, metrics.half.width);
  // Aquestes mesures també compten amb la separació dels caracters.
  // La separació és proporcional a la mida de la lletra.
  const metricsSeparation = metrics.full.width / 9;

  const drawTile = (tile, index, x, y) => {
    ctx.fillText(tile.tileFigure, x, y);
  };

  const drawBoard = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x = 0;
    let y = metrics.full.width;

    boardCopy.forEach((tile, i) => {
      let tileOrientation = Math.floor(i / 7) % 2 == 0 ? 'horizontal' : 'vertical';
      const tileNumbers = tile.tile.split('');
      if (tileNumbers[0] === tileNumbers[1]) {
        tileOrientation = tileOrientation === 'horizontal' ? 'vertical' : 'horizontal';
      }
      tile.tileFigure = domino.getTile(domino.allTiles, tile.tile, tileOrientation);
      drawTile(tile, i, x, y);

      // prepare next tile
      const possibleDirections = ['x', 'y', '-x', '-y'];
      const direction = possibleDirections[Math.floor(i / 7)];

      if (direction === 'x') {
        x += (tileOrientation === 'horizontal' ? metrics.full.width : metrics.half.width) - metricsSeparation;
        y = metrics.full.width;
      }
      if (direction === 'y') {
        x = x;
        y += (tileOrientation === 'horizontal' ? metrics.half.width : metrics.full.width) - metricsSeparation;
      }
      if (direction === '-x') {
        x -= (tileOrientation === 'horizontal' ? metrics.full.width : metrics.half.width) - metricsSeparation;
        y = y;
      }
      if (direction === '-y') {
        x = x;
        y -= (tileOrientation === 'horizontal' ? metrics.half.width : metrics.full.width) - metricsSeparation;
      }
      console.log(tile.tile, x, y, direction);
    });
  };

  drawBoard();

  return canvas;
};
