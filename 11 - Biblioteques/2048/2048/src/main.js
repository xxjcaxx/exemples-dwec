/** 
 * Aquesta biblioteca proporciona varies funcions per jugar al 2048
 * Tan sols implementa la generació del tauler i el càlcul dels moviments
 * No fa res relacionat amb l'interfície gràfica ni el càlcul de punts.
 * 
 * Algunes funcions són auxiliars i es deixen exportades per si són d'utilitat i per fer tests
 * 
 * @module 2048 */

/** 
 * @description Aquesta funció genera un tauler aleatori, retorna una matriu bidimensional 
 * @param {number} size - Mida del tauler
 * @return {Array.<Array.<number>>}
*/
export function generate2048Board(size = 4) {
  /// Interesante: return new Array(size).fill(new Array(size).fill(0));
  return new Array(size).fill(0).map(() => new Array(size).fill(0));
}

/** 
 * @description Aquesta funció rep un tauler buit i retorna una funció que accepta un número per a posar-ho 2 vegades en el tauler
 * @param {Array.<Array.<number>>} board
 * @returns {function}
 */
export function randomPlace(board) {
  /**
   * @description Aquesta funció retornada per randomPlace accepta un número y retorna el tauler amb el número posicionat aleatoriament 2 vegades.
   * @param {number}
   * @returns {Array.<Array.<number>>}
   */
  return function placeNumber(number) {
    const maxPosition = board.length ** 2;
    let pos1 = Math.floor(Math.random() * maxPosition);
    let pos2 = pos1;
    while (pos1 === pos2) {
      pos2 = Math.floor(Math.random() * maxPosition);
    }
    const boardCopy = structuredClone(board);
    boardCopy[Math.floor(pos1 / board.length)][pos1 % board.length] = number;
    boardCopy[Math.floor(pos2 / board.length)][pos2 % board.length] = number;
    return boardCopy;
  };
}

/** 
 *  @description Aquesta funció mou un array unidimensional cap al final. La funció sols fa un moviment i retorna el resultat d'aquest moviment. Si el moviment no suposa cap canvi, retorna sols una còpia de l'array original Sempre retorna una copia, no muta l'array original
 * @param {Array<number>} array
 * @return {Array<number>}
 */
export function moveRow(array) {
  const row = [...array];
  for (let i = row.length - 1; i >= 0; i--) {
    if (row[i] !== 0 && row[i + 1] === 0) {
      row[i + 1] = row[i];
      row[i] = 0;
    }
  }
  return row;
}

/** 
 * @description Aquesta funció, si troba dos números iguals els suma i els coloca cap al final La funció sols fa un moviment i retorna el resultat d'aquest moviment. Si el moviment no suposa cap canvi, retorna sols una còpia de l'array original Sempre retorna una copia, no muta l'array original
 * @param {Array<number>} array
 * @return {Array<number>}
 */
export function sumRow(array){
  const row = [...array];
  for (let i = row.length - 1; i >= 0; i--) {
    if (row[i] !== 0 && row[i + 1] === row[i]) {
      row[i + 1] = row[i] * 2;
      row[i] = 0;
    }
  }

  return row;
}

/**   
 * @description Aquesta funció rota una matriu n vegades en el sentit de les agulles del rellotge 
 * @param {Array.<Array.<number>>} matrix
 * @param {number} n_rotations
 * @return {Array.<Array.<number>>}
*/
export function rotateMatrix(matrix, n_rotations) {
  let result = structuredClone(matrix);
  for (let i = 0; i < n_rotations; i++) {
    result = result[0].map((col, X) => result.map((row) => row[X]).reverse());
  }
  return result;
}

/**  
 * @description Aquesta funció rep un tauler i retorna una funció per moure en alguna de les 4 direccions possibles El moviment desplaça tots els números cap a un costat, sempre que ocupen posicions amb 0. En cas de trobar 2 números iguals i en el mateix eix del moviment, retorna la suma. i la col·loca sobre el número més pròxim al destí del moviment
 * @param {Array.<Array.<number>>} board
 * @return {Array.<Array.<number>>}
 */
export function moveBoard(board) {
  return function (direction) {
    const directions = { right: 0, left: 2, up: 1, down: 3 };
    let rotatedBoard = rotateMatrix(board, directions[direction]);
    // Hi ha un màxim de 3 moviments
    for (let i = 0; i < 3; i++) {
        rotatedBoard = rotatedBoard.map(moveRow);
    }
    rotatedBoard = rotatedBoard.map(sumRow); // Es suma una vegada nomes
    // Hi ha un màxim de 3 moviments
    for (let i = 0; i < 3; i++) {
        rotatedBoard = rotatedBoard.map(moveRow);
    }
    return rotateMatrix(rotatedBoard, 4-directions[direction]);
  };
}

/**
 * @description Retorna la llista de posicions on hi ha un 0 i es pot ficar un número
 * @param {Array.<Array.<number>>} board 
 * @returns {Array<number>} cellsAvailable
 */
export function getCellsAvailable(board){
  return board.flat().map((n,index)=> n !== 0 ? -1 : index).filter(n => n>=0);
}

/**
 * @description Insertar un número en una posició lliure aleatoria
 * @param {Array.<Array.<number>>} board 
 * @returns {Array.<Array.<number>>} board
 */
export function insertRandomNumber(board){
    return function(number){
      let result = structuredClone(board);
      const cellsAvailable = getCellsAvailable(board);
      const pos1 = cellsAvailable[Math.floor(Math.random()*cellsAvailable.length)];
      result[Math.floor(pos1 / board.length)][pos1 % board.length] = number;
      return result;
    }
}