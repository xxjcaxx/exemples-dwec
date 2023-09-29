/* eslint-disable no-undef */
/* eslint-disable import/extensions */

/*
import {
  getTile, gameTiles, allTiles, shuffleTiles, tileCanFollow, filterTilesThatCanFollow,
  gameState, getFreeNumbersBoard, canFollowBoard
} from '../src/domino.js';
*/

import * as domino from '../src/domino.js';

describe('Domino', () => {
  describe('Generation', () => {
    it('should get Tile', () => {
      expect(domino.getTile(domino.allTiles, 34, 'vertical')).toBe('🁼');
      expect(domino.getTile(domino.allTiles, 45, 'horizontal')).toBe('🁒');
      expect(domino.getTile(domino.allTiles, 99, 'horizontal')).toBe('🀰');
      expect(domino.getTile(domino.allTiles, 99, 'vertical')).toBe('🁢');
    });
    it('should known if a tile can follow a number', () => {
      expect(domino.tileCanFollow(5, 35)).toBe(true);
      expect(domino.tileCanFollow(5, 54)).toBe(true);
      expect(domino.tileCanFollow(5, 12)).toBe(false);
    });
    it('should extract the tiles that can follow a number', () => {
      expect(domino.filterTilesThatCanFollow(4, [12, 34, 45, 56, 66])).toEqual([34, 45]);
    });
    it('should shuffle and return the same elements', () => {
      expect(domino.shuffleTiles(domino.gameTiles).length).toEqual(domino.gameTiles.length);
      expect(domino.shuffleTiles(domino.gameTiles).sort()).toEqual(domino.gameTiles.sort());
    });

    it('should return the available numbers in a board', () => {
      expect(domino.getFreeNumbersBoard([{ tileFigure: '🁼', tile: '34', position: 'vertical' }])).toEqual([3, 4]);
      expect(domino.getFreeNumbersBoard([{ tileFigure: '🁼', tile: '34', position: 'vertical' }, { tileFigure: '🁒', tile: '45', position: 'horizontal' }])).toEqual([3, 5]);
    });

    it('should validate if a tile can follow a board in a location', () => {
      expect(domino.canFollowBoard([{ tileFigure: '🁼', tile: '34', position: 'vertical' }], '35', 0)).toBe(true);
      expect(domino.canFollowBoard([{ tileFigure: '🁼', tile: '34', position: 'vertical' }], '53', 0)).toBe(true);
      expect(domino.canFollowBoard([{ tileFigure: '🁼', tile: '34', position: 'vertical' }], '45', 0)).toBe(true);
      expect(domino.canFollowBoard([{ tileFigure: '🁼', tile: '34', position: 'vertical' }], '54', 0)).toBe(true);
      expect(domino.canFollowBoard([{ tileFigure: '🁼', tile: '34', position: 'vertical' }], '62', 0)).toBe(false);
    });

    it('should start a game', () => {
      let state = domino.gameState();
      state = domino.startGame(3, state);
      expect(state.playersTiles[1].length).toBe(7);
      expect(state.playersTiles[2].length).toBe(7);
      expect(state.playersTiles[3].length).toBe(7);
      expect(state.tileStack.length).toBe(7);
    });

    it('should move a tile', () => {
      let state = domino.gameState();
      state = domino.startGame(3, state);
      const tile = state.playersTiles[1][3];
      const tile2 = state.playersTiles[1][4];
      state = domino.moveToBoard(1, tile, 'last', 'vertical', state);
      expect(state.playersTiles[1].length).toBe(6);
      expect(state.board.length).toBe(1);
      expect(state.board[0].tileFigure).toBe(domino.getTile(domino.allTiles, tile, 'vertical'));
      state = domino.moveToBoard(1, tile2, 'first', 'vertical', state);
      expect(state.playersTiles[1].length).toBe(5);
      expect(state.board.length).toBe(2);
      expect(state.board[0].tileFigure).toBe(domino.getTile(domino.allTiles, tile2, 'vertical'));
    });

    it('should change turn tile', () => {
      let state = domino.gameState();
      state = domino.startGame(4, state);
      state = domino.changeTurn(state);
      expect(state.turn).toBe(2);
      state = domino.changeTurn(state);
      expect(state.turn).toBe(3);
      state = domino.changeTurn(state);
      expect(state.turn).toBe(4);
      state = domino.changeTurn(state);
      expect(state.turn).toBe(1);
    });

    it('should move a tile from stack', () => {
      let state = domino.gameState();
      state = domino.startGame(3, state);
      const lastTile = state.tileStack.at(-1);
      state = domino.getFromTileStack(2, state);
      expect(state.playersTiles[2].length).toBe(8);
      expect(state.tileStack.length).toBe(6);
      expect(state.playersTiles[2].at(-1)).toBe(lastTile);
    });

    it('should choose the first player', () => {
      let state = domino.gameState();
      state = domino.startGame(3, state);
      state = domino.getFirstPlayer(state);
      expect(state.playersTiles[state.turn].includes('66') || state.playersTiles[state.turn].includes('55')).toBe(true);
    });
  });
});
