import { renderSudoku, validarGrup, validarSudoku } from "../src/sudoku.js";


describe("Operacions sudoku", function () {
    describe("Validacions", function () {
        it("Valida un grup", function () {
            expect(validarGrup([1,2,3])).toBe(false);
            expect(validarGrup([1,2,3,4,5,6,7,8,9])).toBe(true);
            expect(validarGrup([1,2,3,4,4,6,7,8,9])).toBe(false);
            expect(validarGrup([1,2,3,4,0,6,7,8,9])).toBe(false);
        });
        it("Valida un sudoku", function () {
            let sudokuExemple =  [
                [2, 9, 5,  6, 7, 8,  1, 4, 3],
                [6, 4, 3,  9, 5, 1,  8, 7, 2],
                [8, 7, 1,  3, 4, 2,  5, 9, 6],
                
                [7, 1, 2,  5, 6, 9,  3, 8, 4],
                [3, 6, 8,  7, 1, 4,  9, 2, 5],
                [4, 5, 9,  8, 2, 3,  6, 1, 7],
            
                [9, 2, 7,  1, 3, 6,  4, 5, 0],
                [5, 8, 6,  4, 9, 7,  2, 3, 1],
                [1, 3, 4,  2, 0, 5,  7, 6, 9]
            ];

            expect(validarSudoku(sudokuExemple).ok).toBe(false);
            expect(validarSudoku(sudokuExemple).listFilesOk).toEqual([true,true,true,true,true,true,false,true,false]);
            sudokuExemple[6][8] = 8;
            sudokuExemple[8][4] = 8;
            expect(validarSudoku(sudokuExemple).ok).toBe(true);
            expect(validarSudoku(sudokuExemple).listFilesOk).toEqual([true,true,true,true,true,true,true,true,true]);
          
        });
   
 }); 
});