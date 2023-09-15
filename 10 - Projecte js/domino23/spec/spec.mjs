/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import {
  getTile, gameTiles, allTiles, shuffleTiles, tileCanFollow, filterTilesThatCanFollow,
} from '../src/domino.js';

describe('Domino', () => {
  describe('Generation', () => {
    it('should get Tile', () => {
      expect(getTile(allTiles, 34, 'vertical')).toBe('🁼');
      expect(getTile(allTiles, 45, 'horizontal')).toBe('🁒');
    });
    it('should known if a tile can follow a number', () => {
        expect(tileCanFollow(5,35)).toBe(true);
        expect(tileCanFollow(5,54)).toBe(true);
        expect(tileCanFollow(5,12)).toBe(false);
      });
      it('should extract the tiles that can follow a number', () => {
        expect(filterTilesThatCanFollow(4,[12,34,45,56,66])).toEqual([34,45]);
      });
      it('should shuffle and return the same elements', () => {
        expect(shuffleTiles(gameTiles).length).toEqual(gameTiles.length);
        expect(shuffleTiles(gameTiles).sort()).toEqual(gameTiles.sort());
      });
  });
});

