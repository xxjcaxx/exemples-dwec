////// Un iterador té una funció next que retorna els nous valors o done en cas d'acabar.
////// Un consumidor d'iteradors invoca aquesta funció i interpreta el resultat.
function makeIterator(array) {
  let nextIndex = 0;

  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { done: true };
    },
  };
}

let it = makeIterator(["yo", "ya"]);

console.log(it.next().value); // 'yo'
console.log(it.next().value); // 'ya'
console.log(it.next().done); // true

///// Un altre exemple de iterador. En aquest cas, mai acaba perquè no pot retornar done.
function idMaker() {
  let index = 0;
  return {
    next: function () {
      return { value: index++, done: false };
    },
  };
}

var itid = idMaker();

console.log(itid.next().value); // '0'
console.log(itid.next().value); // '1'
console.log(itid.next().value); // '2'
// ...

////////// Amb * creem una funció generadora que retorna un objecte de tipus Generator
/// Un Generator és una funció de la que es pot eixir i tornar a entrar i que conserva el seu context
/// Cridar a una funció generadora no l'executa, retorna un iterador amb la funció next()
/// Quan s'executa next() la funció s'executa fins al primer yield

/// Ací tenim exemples de generadors per fer el mateix que les funcións de dalt.

function* makeSimpleGenerator(array) {
  let nextIndex = 0;

  while (nextIndex < array.length) {
    yield array[nextIndex++];
  }
}

var gen = makeSimpleGenerator(["yo", "ya"]);

console.log(gen.next().value); // 'yo'
console.log(gen.next().value); // 'ya'
console.log(gen.next().done); // true

function* idMaker() {
  var index = 0;
  while (true) yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // '0'
console.log(gen.next().value); // '1'
console.log(gen.next().value); // '2'
// ...
