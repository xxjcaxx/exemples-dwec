import { generate2048Board, randomPlace } from "../src/2084.js";

describe('2048 functions', () => {
    describe('Generation', () => {
        it('Should create board', () => {
            let board = generate2048Board(4);
            expect(board).toEqual([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
        });
        it('Should  place in board', () => {
            let board = generate2048Board(4);
            let boardPlaced = randomPlace(board)(2);
            console.log(boardPlaced);
            console.log(board);
            expect(boardPlaced).not.toEqual([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
            expect(board).not.toBe(boardPlaced);
            expect(board.flat().reduce((p,c)=> p = c === 2 ? p+1 : p,0)).toBe(2);
        });
    });
});