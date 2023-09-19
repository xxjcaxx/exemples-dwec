/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import {
  getTile, gameTiles, allTiles, shuffleTiles, tileCanFollow, filterTilesThatCanFollow, gameState,
} from '../src/domino.js';

describe('Domino', () => {
  describe('Generation', () => {
    it('should get Tile', () => {
      expect(getTile(allTiles, 34, 'vertical')).toBe('🁼');
      expect(getTile(allTiles, 45, 'horizontal')).toBe('🁒');
    });
    it('should known if a tile can follow a number', () => {
      expect(tileCanFollow(5, 35)).toBe(true);
      expect(tileCanFollow(5, 54)).toBe(true);
      expect(tileCanFollow(5, 12)).toBe(false);
    });
    it('should extract the tiles that can follow a number', () => {
      expect(filterTilesThatCanFollow(4, [12, 34, 45, 56, 66])).toEqual([34, 45]);
    });
    it('should shuffle and return the same elements', () => {
      expect(shuffleTiles(gameTiles).length).toEqual(gameTiles.length);
      expect(shuffleTiles(gameTiles).sort()).toEqual(gameTiles.sort());
    });

    it('should start a game', () => {
      let state = gameState();
      state.startGame(3);
      expect(state.playersTiles[1].length).toBe(7);
      expect(state.playersTiles[2].length).toBe(7);
      expect(state.playersTiles[3].length).toBe(7);
      expect(state.tileStack.length).toBe(7);
    });

    it('should move a tile', () => {
      let state = gameState();
      state.startGame(3);
      let tile = state.playersTiles[1][3];
      state.moveToBoard(1, tile, 'vertical');
      expect(state.playersTiles[1].length).toBe(6);
      expect(state.board.length).toBe(1);
      expect(state.board[0].tileFigure).toBe(getTile(allTiles, tile, 'vertical'));
    });

    it('should change turn tile', () => {
      let state = gameState();
      state.startGame(4);
      state.changeTurn();
      expect(state.turn).toBe(2);
      state.changeTurn();
      expect(state.turn).toBe(3);
      state.changeTurn();
      expect(state.turn).toBe(4);
      state.changeTurn();
      expect(state.turn).toBe(1);
    });

    it('should move a tile from stack', () => {
      let state = gameState();
      state.startGame(3);
      let lastTile = state.tileStack.at(-1);
      state.getFromTileStack(2);
      expect(state.playersTiles[2].length).toBe(8);
      expect(state.tileStack.length).toBe(6);
      expect(state.playersTiles[2].at(-1)).toBe(lastTile);
    });

  });
});
