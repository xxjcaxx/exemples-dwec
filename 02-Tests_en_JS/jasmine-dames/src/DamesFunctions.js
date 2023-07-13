export { movement, createBoardTable, createRows, DOMTools, State } 
import { ç } from "./ç.js";

const DOMTools = {  // DOM Tools for compose. They mutate the element (not-pure functions)
    innerHTML: (element) => (html) => {
        element.innerHTML = html;
        return element;
    },
    appendElements: (element) => (elements) => {
        element.append(...elements);
        return element;
    },
    addClassesToChildren: (addObjectList) => (fatherElement) => {
        addObjectList.forEach(({selector,classes})=> 
        fatherElement.querySelectorAll(selector).forEach(e => e.classList.add(...classes))
        )
        return fatherElement;
    },
    addClasses: (classes) => (element) => {
        element.classList.add(...classes);
        return element;
    }
}

function createRows(row,rowIndex){
    return row.map((piece,pieceIndex) => `<div data-piece="${piece}" data-color="${(rowIndex+pieceIndex)%2 === 1 ? 'black' : 'white'}">${piece == 1 ? '⚫' : piece == 2 ? '⚪' : ''}</div>`).join('');
}


function createBoardTable(){
    
    const boardTable =  ç.compose(
        DOMTools.addClasses(['leading-none','align-middle','max-w-[80vw]', 'max-h-[80vw]','w-[80vh]', 'relative', 'grid','grid-cols-8', 'grid-rows-8','grid-flow-row-dense']),
        DOMTools.addClassesToChildren([
            {selector: 'div', classes: ['aspect-square','pt-1','w-full', 'h-full']},
            {selector: 'div[data-color="black"]', classes: ['bg-neutral-500']},
            {selector: 'div[data-color="white"]', classes: ['bg-neutral-100']},
            {selector: 'div[data-piece="2"]',classes: ['dama-black']},
            {selector: 'div[data-piece="1"]',classes: ['dama-white']}
        ]),
        DOMTools.innerHTML(document.createElement('div')),
        ç.join(''),
        ç.map(createRows),
    )([
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
      ]);


    return boardTable;
}


function movement(board,mov){
    let nextBoard = ç.copy2DArray(board);
    nextBoard[mov[1][0]][mov[1][1]] =  nextBoard[mov[0][0]][mov[0][1]];
    nextBoard[mov[0][0]][mov[0][1]] = 0;
    return nextBoard;
}

class State {
    constructor(board,turn){

    }
    getState(){}
    setState(){}
}