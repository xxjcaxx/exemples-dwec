import { Chess } from 'chess.js'

export {
  board, pieces, getSymbol, getSymbolBoard,
};

const board = [
  [{ piece: 'rook', color: 'black' }, { piece: 'horse', color: 'black' }, { piece: 'bishop', color: 'black' }, { piece: 'queen', color: 'black' }, { piece: 'king', color: 'black' }, { piece: 'bishop', color: 'black' }, { piece: 'horse', color: 'black' }, { piece: 'rook', color: 'black' }],
  [{ piece: 'pawn', color: 'black' }, { piece: 'pawn', color: 'black' }, { piece: 'pawn', color: 'black' }, { piece: 'pawn', color: 'black' }, { piece: 'pawn', color: 'black' }, { piece: 'pawn', color: 'black' }, { piece: 'pawn', color: 'black' }, { piece: 'pawn', color: 'black' }],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [{ piece: 'pawn', color: 'white' }, { piece: 'pawn', color: 'white' }, { piece: 'pawn', color: 'white' }, { piece: 'pawn', color: 'white' }, { piece: 'pawn', color: 'white' }, { piece: 'pawn', color: 'white' }, { piece: 'pawn', color: 'white' }, { piece: 'pawn', color: 'white' }],
  [{ piece: 'rook', color: 'white' }, { piece: 'horse', color: 'white' }, { piece: 'bishop', color: 'white' }, { piece: 'queen', color: 'white' }, { piece: 'king', color: 'white' }, { piece: 'bishop', color: 'white' }, { piece: 'horse', color: 'white' }, { piece: 'rook', color: 'white' }],
];

const pieces = {
  rook: { characters: { black: '♜', white: '♖' } },
  horse: { characters: { black: '♞', white: '♘' } },
  bishop: { characters: { black: '♝', white: '♗' } },
  queen: { characters: { black: '♛', white: '♕' } },
  king: { characters: { black: '♚', white: '♔' } },
  pawn: { characters: { black: '♟︎', white: '♙' } },
};

const getSymbol = (pieces, piece) => (piece ? pieces[piece.piece].characters[piece.color] : ' ');

const getSymbolBoard = (pieces, board) => board.map((line) => line.map((piece) => getSymbol(pieces, piece)));

const rulesPawn = (board,movement) => {
  let piece = board[movement[0]][movement[1]];
  let piecePlayerDirection = piece.color === 'black' ? 1 : -1;
  let occupied = 
}