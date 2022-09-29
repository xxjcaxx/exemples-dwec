"use strict";
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

function validarGrup(grup){
  /*  // Validar si te 0
    let te0 = grup.includes(0);
    // Validar si te repetits (o si falta algun numero)
    let faltaNumero = false;
    for(let i=1;i<10;i++) {
        if (!grup.includes(i)) {
            faltaNumero = true;
        }
    }
    return !(te0 || faltaNumero);*/
    let setGrup = new Set(grup);
    setGrup.delete(0);
    return setGrup.size == 9;
    
}

function validarSudoku(sudoku) {
    // Validar Files
    let filesOK = true;
    for(let fila of sudoku){
        if (!validarGrup(fila)){
            filesOK = false;
        } 
    }
    // Validar Columnes
    let columnesOK = true;
    for (let i=0; i<9; i++){
        let columna = [];
        for (let j=0;j<9;j++){
            columna[j] = sudoku[j][i];
        }
        if (!validarGrup(columna)){
            columnesOK = false;
        } 
    }

    // Validar Quadrats
    let quadratsOK = true;
    for(let I =0; I< 3; I++){ // Files grans
        for(let J=0;J<3; J++){ // columnes grans
            for(let i=0; i<3; i++){  // Files i columnes menudes
                for (let j=0;j<3;j++){

                }
            }
        }
    }

    return filesOK && columnesOK;
}

console.log(validarSudoku(sudokuExemple));
