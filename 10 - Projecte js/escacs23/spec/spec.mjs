/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { board, pieces, getSymbol, getSymbolBoard } from '../src/escacs.js';

describe('Chess game functions', () => {
  describe('getSymbol', () => {
    it('should get a correct symbol', () => {
      expect(getSymbol(pieces, { piece: 'rook', color: 'black' })).toBe('♜');
      expect(getSymbol(pieces, { piece: 'rook', color: 'white' })).toBe('♖');
    });
    it('should get a correct board', () => {
      const auxBoard = [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟︎', '♟︎', '♟︎', '♟︎', '♟︎', '♟︎', '♟︎', '♟︎'],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
      ];
      expect(getSymbolBoard(pieces, board)).toEqual(auxBoard);
    });
  });
});
