let state = 0;
//1 Qué passa si canvie el nom d'aquesta variable?

function incrementar(stateCopy) {
  stateCopy++;
  return stateCopy;
  /*  setTimeout(() => {
         estatDiv.innerText = state; // 8 Si passen coses asíncrones pot fallar. La solució són les promeses que ja vorem. 
     }, 1000); */
}
function decrementar(number) {
  number--;
  return number;
}

document.addEventListener("DOMContentLoaded", () => {
  const incrementarBtn = document.querySelector("#incrementar");
  const decrementarBtn = document.querySelector("#decrementar");
  const estatDiv = document.querySelector("#estat");

  incrementarBtn.addEventListener("click", () => {
    state = incrementar(state);
    estatDiv.innerText = state;
  });
  decrementarBtn.addEventListener("click", () => {
    state = decrementar(state);
    estatDiv.innerText = state;
  });
});

let state2 = [2, 3, 5, 1, 0];
let max = 0; // 10 ús de 2 variables per a l'estat

///// Funció per aconseguir el primer valor d'un array
function first(array) {
  return array[0];
}

console.log({ max, state2, first: first(state2) });

// Funció per obtindre el màxim de l'estat original
function getMax(array) {
  let sorted = [...array].sort((a, b) => (a > b ? -1 : 1)); // 9 Ja hem perdut l'ordre original
  return sorted[0];
}
max = getMax(state2);

console.log({ max, state2, first: first(state2) }); // 11 suposem que la variable max ja no la necessitem més i la tenim com a global

//// Funció per aconseguir un array amb la suma incremental de cada element de l'estat original.
function sumarIncremental(array) {
  let arrayCopy = [...array];
  let sumaTotal = arrayCopy.reduce((previous, current, index) => {
    arrayCopy[index] = arrayCopy[index] + previous; // 12 No té sentit, però estic modifican el stat en el callback de reduce
    return arrayCopy[index];
  }, 0);
  return { arraySumat: arrayCopy, sumaTotal: sumaTotal };
}
let sumaTotal = sumarIncremental(state2);
max = getMax(state2); // 13 Executem ací getMax

console.log({
  max,
  state2,
  first: first(state2),
  suma: sumaTotal.sumaTotal,
  arraySumat: sumaTotal.arraySumat,
});
