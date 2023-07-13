import { movement, createBoardTable, createRows, DOMTools, State } from "../src/DamesFunctions.js";

import { ç } from "../src/ç.js";
const tauler = [
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0]
];

describe('Ç functional namespace', function () {
  describe('compose', function () {
    it('should compose some functions', function () {
      let fa = (input) => input+"a";
      let fb = (input) => input+"b";
      expect(ç.compose(fb,fa)('AA')).toBe('AAab');
    });
  });
  describe('map', function () {
    it('should map an array', function () {
      let a = [1,2,3,4]
      expect(ç.map(A=> A+2)(a)).toEqual([3,4,5,6]);
    });
    it('should map and maintain immutable', function () {
      let a = [1,2,3,4];
      let b = ç.map(A=> A+2)(a);
      expect(a).toEqual([1,2,3,4]);
    });
  });
  describe('log', function () {
    it('should log and return', function () {
      let a = [1,2,3,4]
      expect(ç.log(a)).toEqual(a);
    });
    it('should log and maintain immutable', function () {
      let a = [1,2,3,4];
      ç.log(a);
      expect(a).toEqual([1,2,3,4]);
    });
  });
  describe('join', function () {
    it('should join and return', function () {
      let a = [1,2,3,4]
      expect(ç.join(',')(a)).toEqual('1,2,3,4');
    });
    it('should join and maintain immutable', function () {
      let a = [1,2,3,4];
      let b= ç.join(',')(a);
      expect(a).toEqual([1,2,3,4]);
    });
  });

  describe('copy2DArray', function () {
    let a = [[1,2,3,4],[1,2,3,4]];
    let b = ç.copy2DArray(a);
    it('should do the copy', function () {
      expect(b).toEqual(a);
    });
    it('should be immutable and return a copy', function () {
      b[0][0] = 8;
      expect(a).toEqual([[1,2,3,4],[1,2,3,4]]);
    });
  });
});


describe('DOMTools', function () {
  describe('innerHTML', function () {
    let div = document.createElement('div');
    let div2 = DOMTools.innerHTML(div)('<span>A</span>')
    it('it returns an Element', function () {
      expect(div2 instanceof Element).toBe(true);
    });
    it('it has innerHTML', function () {
      expect(div2.innerHTML).toBe('<span>A</span>');
    });
  });

  describe('appendElements', function () {
    let div = document.createElement('div');
    let div2 = DOMTools.appendElements(div)([document.createElement('p'), document.createElement('span')])
    it('it returns an Element', function () {
      expect(div2 instanceof Element).toBe(true);
    });
    it('it has p and span as children', function () {
      expect(div2.childNodes.length).toBe(2);
      expect([...div2.childNodes][0].tagName).toBe('P');
      expect([...div2.childNodes][1].tagName).toBe('SPAN');
    });
  });

  describe('addClassesToChildren', function () {
    let div = document.createElement('div');
    div.innerHTML = '<p></p><span></span>';
    let div2 = DOMTools.addClassesToChildren([
      {selector: 'p', classes: ['A','B']},{selector: 'span', classes: ['C']}
    ])(div)
    it('it returns an Element', function () {
      expect(div2 instanceof Element).toBe(true);
    });
    it('All children has the expected classes', function () {
      expect(div2.querySelector('p').classList.contains('A')).toBe(true);
      expect(div2.querySelector('p').classList.contains('B')).toBe(true);
      expect(div2.querySelector('span').classList.contains('C')).toBe(true);
    });
  });

  describe('addClasses', function () {
    let div = document.createElement('div');
    let div2 = DOMTools.addClasses(['A','B'])(div)
    it('it returns an Element', function () {
      expect(div2 instanceof Element).toBe(true);
    });
    it('Has expected classes', function () {
      expect(div2.classList.contains('A')).toBe(true);
      expect(div2.classList.contains('B')).toBe(true);
    });
  });
});


describe('Dames', function () {
  describe('Generation', function () {
    it('createRows should create some divs', function () {
      let divs = createRows([0,1,2],0)
      let html = '<div data-piece="0" data-color="white"></div><div data-piece="1" data-color="black">⚫</div><div data-piece="2" data-color="white">⚪</div>';
      console.log(divs); console.log(html);
      expect(divs).toBe(html);
    });
  });




  describe('moviment', function () {

    it('should make the movement 1', function () {
      const tauler1 = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
      ];
      expect(movement(tauler, [[2, 5], [3, 6]])).toEqual(tauler1);
    });
    it('should be inmutable', function () {
      const tauler_copy = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 2, 0, 2],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
      ];
      movement(tauler, [[2, 5], [3, 6]]);
      expect(tauler).toEqual(tauler_copy);
    });
  })
})

describe('State', function () {
  let state = new State(tauler,1);
  let firstState = state.getState()
  describe('constructor', function () {
    
    it('Create a State', function () {
      expect(state instanceof State).toBe(true);
    });
    it('Get a state', function () {
      expect(firstState).toEqual({board: tauler, turn: 1});
    });
    it('Set a state', function () {
      state.setState(tauler,2);
      expect(state.getState()).toEqual({board: tauler, turn: 2});
    });
    it('State is immutable', function () {
      let taulerAux = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
      ];
      let taulerAuxCopy = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 2, 0, 2, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
      ];
      state.setState(taulerAux,2);
      taulerAux[0][1] = 0; 

      expect(state.getState()).toEqual({board: taulerAuxCopy, turn: 2});
    });
  });
});