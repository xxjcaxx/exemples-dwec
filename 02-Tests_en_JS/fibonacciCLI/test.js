import chai from 'chai';


var expect = chai.expect;

import {fibonacci} from './scripts.js';

describe('Array', function() {
 describe('#indexOf()', function() {
    it('should return 0', () => {
        expect(fibonacci(0)).to.eql([0]);
        
    });
    it('should return 0, 1', () => {
        expect(fibonacci(1)).to.eql([0, 1]);
    });
    it('should return 0, 1, 1', () => {
        expect(fibonacci(2)).to.eql([0, 1, 1]);
    });
    it('should return 0, 1, 1, 2', () => {
        expect(fibonacci(3)).to.eql([0, 1, 1, 2]);
    });
    it('should return 0, 1, 1, 2, 3', () => {
        expect(fibonacci(4)).to.eql([0, 1, 1, 2, 3]);
    });
    it('should return 0, 1, 1, 2, 3, 5', () => {
        expect(fibonacci(5)).to.eql([0, 1, 1, 2, 3, 5]);
    });
    it('should return 0, 1, 1, 2, 3, 5, 8', () => {
        expect(fibonacci(6)).to.eql([0, 1, 1, 2, 3, 5, 8]);
    });
    it('should return 0, 1, 1, 2, 3, 5, 8, 13', () => {
        expect(fibonacci(7)).to.eql([0, 1, 1, 2, 3, 5, 8, 13]);
    });
 });
});
