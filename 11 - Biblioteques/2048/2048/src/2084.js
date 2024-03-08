/** Aquesta funció genera un tauler aleatori amb 2 2 */

export function generate2048Board(size=4){
   /// Interesante: return new Array(size).fill(new Array(size).fill(0));
} 

export function randomPlace(board){
    return function(number){
        const maxPosition = board.length**2;
        let pos1 = Math.floor(Math.random()*maxPosition);
        let pos2 = pos1;
        while(pos1 === pos2){
            pos2 = Math.floor(Math.random()*maxPosition);
        }
        const boardCopy = structuredClone(board);
        boardCopy[0][0] = 'A'
        console.log(pos1, pos2);
        console.log('init',boardCopy);
        boardCopy[Math.floor(pos1/board.length)][pos1 % board.length] = number;
        console.log('first',boardCopy);
        boardCopy[Math.floor(pos2/board.length)][pos2 % board.length] = number;
        console.log(boardCopy);
        return boardCopy;
    }
}