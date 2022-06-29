function frequencies(paraules) {
  return paraules.reduce((objecte, paraula) => {
    objecte[paraula] ? (objecte[paraula] += 1) : (objecte[paraula] = 1);
    return objecte;
  }, {});
}

let paraules = [
  "program",
  "application",
  "network",
  "javascript",
  "network",
  "application",
  "javascript",
  "javascript",
];

console.log(frequencies(paraules));

document.addEventListener("DOMContentLoaded", () => {
  mocha.setup("bdd");
  mocha.checkLeaks();

  var expect = chai.expect;

  describe("Frequencies", () => {
    it("should return frequencies", () => {
      expect(frequencies(["a", "a", "b"])).to.deep.equal({ a: 2, b: 1 });
    });
  });

  mocha.run();
});
