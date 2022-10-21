import {renderSudoku} from "./sudoku.js";

//prettier-ignore
let sudokuExemple = [
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


document.addEventListener("DOMContentLoaded", () => {
    let sudokuTabla = renderSudoku(sudokuExemple);
  
  /*  document.querySelector("#validar").addEventListener("click", () => {
      let valid = validarSudoku(readSudoku(sudokuTabla));
      console.log(valid, readSudoku(sudokuTabla));
    });*/
  });