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

function validarGrup(grup) {
  let setGrup = new Set(grup);
  setGrup.delete(0);
  return setGrup.size == 9;
}

function validarSudoku(sudoku) {

  function validarFiles(matrix){return matrix.map((fila) => validarGrup(fila));}
  function validarTotes(llistaOks){return listFilesOk.every((f) => f);}

  // Validar Files
  let listFilesOk = validarFiles(sudoku); //sudoku.map((fila) => validarGrup(fila));
  let filesOK = validarTotes(listFilesOk);// listFilesOk.every((f) => f);

  // Validar Columnes
  let inverseSudoku = sudoku[0].map((col, i) => sudoku.map((fila) => fila[i]));
  let listcolumnesOK =  validarFiles(inverseSudoku);
  let columnesOK = validarTotes(listcolumnesOK);

  function extractSubMatrix(matrix, pos, size) {
    return matrix
      .filter((fila, i) => i >= pos.y && i < pos.y + size)
      .map((fila) => fila.slice(pos.x, pos.x + size));
  }

  let SquaresSudoku = [0,3,6].map(y => [0,3,6].map(x => extractSubMatrix(sudoku,{x,y},3).flat()));
   let listQuadratsOK = validarFiles(SquaresSudoku.flat());
  let quadratsOK = validarTotes(listQuadratsOK);

  return {
    ok: filesOK && columnesOK && quadratsOK,
    listFilesOk, listcolumnesOK, listQuadratsOK
  };
}

//console.log(validarSudoku(sudokuExemple));

function renderSudoku(sudoku) {
  let sudokuTabla = document.createElement("table");
  sudokuTabla.id = "sudokuTabla";
  for (let fila of sudoku) {
    let filaTR = document.createElement("tr");
    sudokuTabla.append(filaTR);
    for (let celda of fila) {
      let celdaTD = document.createElement("td");
      celdaTD.innerHTML = celda > 0 ? celda : "";
      filaTR.append(celdaTD);
      celdaTD.classList.add(celda > 0 ? "static" : "userInput");
    }
  }

  sudokuTabla.addEventListener("click", function tablaClick(event) {
    this.querySelectorAll('div.teclado').forEach(tecladoViejo => tecladoViejo.remove());
    let target = event.target;
    let teclado;
    if (target.classList.contains("userInput")) {
      // console.log('userInput', target);
      teclado = document.createElement("div");
      teclado.innerHTML = `<span>1</span>
     <span>2</span>
     <span>3</span>
     <span>4</span>
     <span>5</span>
     <span>6</span>
     <span>7</span>
     <span>8</span>
     <span>9</span>
     `;
      teclado.classList.add("teclado");
      target.append(teclado);
      teclado.addEventListener("click", (e) => {
        target.innerText = e.target.innerText;
        teclado.remove();
        colorizeSudoku(this,validarSudoku(readSudoku(this)));
      });
    }
  });

  document.querySelector("#container").append(sudokuTabla);
  return sudokuTabla;
}

function readSudoku(tabla) {
  let resultSudoku = [];
  let filas = tabla.querySelectorAll("tr");
  filas.forEach((f) => {
    let arrayFila = [];
    f.querySelectorAll("td").forEach((c) => {
      let value = parseInt(c.innerText);
      value = isNaN(value) ? 0 : value;
      arrayFila.push(value);
    });
    resultSudoku.push(arrayFila);
  });
  return resultSudoku;
}

function colorizeSudoku(tabla,validation){
  tabla.className = ""; // reset
  tabla.classList.add(validation.ok ? '': 'mal');
}

document.addEventListener("DOMContentLoaded", () => {
  let sudokuTabla = renderSudoku(sudokuExemple);

  document.querySelector("#validar").addEventListener("click", () => {
    let valid = validarSudoku(readSudoku(sudokuTabla));
    console.log(valid, readSudoku(sudokuTabla));
  });
});
