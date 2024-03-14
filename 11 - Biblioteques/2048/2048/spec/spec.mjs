import { generate2048Board, randomPlace, moveBoard, moveRow, rotateMatrix, sumRow, getCellsAvailable, insertRandomNumber } from "../src/main.js";

describe('2048 functions', () => {
    describe('Generation', () => {
        it('Should create board', () => {
            let board = generate2048Board(4);
            expect(board).toEqual([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
        });
        it('Should  place in board', () => {
            let board = generate2048Board(4);
            let boardPlaced = randomPlace(board)(2);
            expect(boardPlaced).not.toEqual([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
            expect(board).not.toBe(boardPlaced);
            expect(boardPlaced.flat().reduce((p,c)=> c === 2 ? p+1 : p,0)).toBe(2);
        });

    });
    describe('Moves', () => {
        it('Should rotate a matrix', () => {
            let matrix = [
                [1,0,5,0],
                [2,0,6,0],
                [3,0,7,0],
                [4,0,8,0]];
            let expectedMatrix = [
                [4,3,2,1],
                [0,0,0,0],
                [8,7,6,5],
                [0,0,0,0]];
            let expectedMatrix2 = [
                [0,8,0,4],
                [0,7,0,3],
                [0,6,0,2],
                [0,5,0,1]];
            let expectedMatrix3 = [
                [0,0,0,0],
                [5,6,7,8],
                [0,0,0,0],
                [1,2,3,4]];
            expect(rotateMatrix(matrix,1)).toEqual(expectedMatrix);
            expect(rotateMatrix(matrix,2)).toEqual(expectedMatrix2);
            expect(rotateMatrix(matrix,3)).toEqual(expectedMatrix3);
            expect(rotateMatrix(matrix,4)).toEqual(matrix);
           
        });
        it('moveRow should move an array to the rigth',()=>{
            let row1 = [2,0,0,2]; let row1_step = [0,2,0,2];
            let row2 = [2,4,4,2]; let row2_step = [2,4,4,2];
            let row3 = [0,2,2,0]; let row3_step = [0,0,2,2];
            let row4 = [0,0,0,4]; let row4_step = [0,0,0,4];
            let row5 = [0,0,2,4]; let row5_step = [0,0,2,4];
            let row6 = [4,2,2,0]; let row6_step = [0,4,2,2];

            expect(moveRow(row1)).toEqual(row1_step);
            expect(moveRow(row2)).toEqual(row2_step);
            expect(moveRow(row3)).toEqual(row3_step);
            expect(moveRow(row4)).toEqual(row4_step);
            expect(moveRow(row5)).toEqual(row5_step);
            expect(moveRow(row6)).toEqual(row6_step);

        });
        it('sumRow sum  an array to the rigth',()=>{
            let row1 = [2,0,0,2]; let row1_step = [2,0,0,2];
            let row2 = [2,4,4,2]; let row2_step = [2,0,8,2];
            let row3 = [0,0,2,2]; let row3_step = [0,0,0,4];
            let row4 = [0,0,0,4]; let row4_step = [0,0,0,4];
            let row5 = [0,0,2,4]; let row5_step = [0,0,2,4];
            let row6 = [4,2,2,0]; let row6_step = [4,0,4,0];

            expect(sumRow(row1)).toEqual(row1_step);
            expect(sumRow(row2)).toEqual(row2_step);
            expect(sumRow(row3)).toEqual(row3_step);
            expect(sumRow(row4)).toEqual(row4_step);
            expect(sumRow(row5)).toEqual(row5_step);
            expect(sumRow(row6)).toEqual(row6_step);

        });
        it('Should move a board in a direction', () => {
            let board = [
                [0,0,2,0],
                [0,4,0,4],
                [0,0,2,0],
                [0,0,4,0]];
            let rigthBoard = [
                [0,0,0,2],
                [0,0,0,8],
                [0,0,0,2],
                [0,0,0,4]
            ]; 
            let leftBoard = [
                [2,0,0,0],
                [8,0,0,0],
                [2,0,0,0],
                [4,0,0,0]
            ]; 
            let upBoard = [
                [0,4,4,4],
                [0,0,4,0],
                [0,0,0,0],
                [0,0,0,0]
            ]; 
            let downBoard = [
                [0,0,0,0],
                [0,0,0,0],
                [0,0,4,0],
                [0,4,4,4]
            ]; 

            expect(moveBoard(board)('right')).toEqual(rigthBoard);
            expect(moveBoard(board)('left')).toEqual(leftBoard);
            expect(moveBoard(board)('up')).toEqual(upBoard);
            expect(moveBoard(board)('down')).toEqual(downBoard);
            expect(moveBoard(board)('down')).not.toBe(board)

        });

        it('getCellsAvailable should return cells available',()=>{
            let board = [
                [0,0,2,0],
                [0,4,0,4],
                [0,0,2,0],
                [0,0,4,0]];
            expect(getCellsAvailable(board)).toEqual([0,1,3,4,6,8,9,11,12,13,15]);
        });

        it('insertRandomNumber should insert a number i a random free cell',()=>{
            let board = [
                [0,8,2,16],
                [2,4,2,4],
                [4,4,2,8],
                [4,2,4,32]];
            let expectedboard = [
                [2,8,2,16],
                [2,4,2,4],
                [4,4,2,8],
                [4,2,4,32]];
            expect(insertRandomNumber(board)(2)).toEqual(expectedboard);
        });

    });
});