var expect = chai.expect;
describe('Cartesian', function() {
 describe('cartesian array', function() {
   it('should return an array', function() {
     expect(cartesian(['a','b'],['c','d'])).to.be.an('array');
     
   });
   it('should return ["a c","a d ...', function() {
    expect(cartesian(['a','b'],['c','d'])).deep.equal(['a c','a d','b c','b d']);
    
  });
 });
});
