(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global["2048"] = {}));
})(this, function(exports2) {
  "use strict";
  function generate2048Board(size = 4) {
    return new Array(size).fill(0).map(() => new Array(size).fill(0));
  }
  function randomPlace(board) {
    return function(number) {
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
  function moveRow(array) {
    const row = [...array];
    for (let i = row.length - 1; i >= 0; i--) {
      if (row[i] !== 0 && row[i + 1] === 0) {
        row[i + 1] = row[i];
        row[i] = 0;
      }
    }
    return row;
  }
  function sumRow(array) {
    const row = [...array];
    for (let i = row.length - 1; i >= 0; i--) {
      if (row[i] !== 0 && row[i + 1] === row[i]) {
        row[i + 1] = row[i] * 2;
        row[i] = 0;
      }
    }
    return row;
  }
  function rotateMatrix(matrix, n_rotations) {
    let result = structuredClone(matrix);
    for (let i = 0; i < n_rotations; i++) {
      result = result[0].map((col, X) => result.map((row) => row[X]).reverse());
    }
    return result;
  }
  function moveBoard(board) {
    return function(direction) {
      const directions = { right: 0, left: 2, up: 1, down: 3 };
      let rotatedBoard = rotateMatrix(board, directions[direction]);
      for (let i = 0; i < 3; i++) {
        rotatedBoard = rotatedBoard.map(moveRow);
      }
      rotatedBoard = rotatedBoard.map(sumRow);
      for (let i = 0; i < 3; i++) {
        rotatedBoard = rotatedBoard.map(moveRow);
      }
      return rotateMatrix(rotatedBoard, 4 - directions[direction]);
    };
  }
  function getCellsAvailable(board) {
    return board.flat().map((n, index) => n !== 0 ? -1 : index).filter((n) => n >= 0);
  }
  function insertRandomNumber(board) {
    return function(number) {
      let result = structuredClone(board);
      const cellsAvailable = getCellsAvailable(board);
      const pos1 = cellsAvailable[Math.floor(Math.random() * cellsAvailable.length)];
      result[Math.floor(pos1 / board.length)][pos1 % board.length] = number;
      return result;
    };
  }
  exports2.generate2048Board = generate2048Board;
  exports2.getCellsAvailable = getCellsAvailable;
  exports2.insertRandomNumber = insertRandomNumber;
  exports2.moveBoard = moveBoard;
  exports2.moveRow = moveRow;
  exports2.randomPlace = randomPlace;
  exports2.rotateMatrix = rotateMatrix;
  exports2.sumRow = sumRow;
  Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
});
