let array = [
  95, 95, 14, 83, 58, 33, 65, 52, 7, 72, 13, 46, 19, 31, 27, 36, 30, 86, 88, 88,
  68, 16, 5, 14, 41, 56, 89, 11, 6, 29, 72, 11, 69, 36, 16, 11, 82, 84, 32, 84,
  95, 98, 76, 99, 100, 12, 89, 1, 92, 27, 66, 48, 38, 49, 30, 40, 87, 19, 31,
  37, 5, 32, 9, 33, 98, 94, 5, 15, 4, 88, 47, 34, 83, 8, 31, 4, 2, 72, 31, 39,
  15, 10, 46, 78, 11, 21, 92, 22, 83, 3, 6, 71, 39, 54, 50, 77, 13, 85, 7, 36,
];

// Fes una funció que retorne l'array ordenat sense modificar l'array original
const sortImmutable = (array) => {
  let arrayAux = [...array];
  return arrayAux.sort((a, b) => (a < b ? -1 : 1));
};

console.log(sortImmutable(array));
console.log(array);

// Fes una funció que retorne els números imparells i ordenats

const oddSort = (array) => {
  let odds = array.filter((i) => i % 2 === 1);
  return sortImmutable(odds);
};
console.log(oddSort(array));

// Fes una funció que retorne els números imparells de dos xifres

function odd2(array) {
  return array.filter((i) => i % 2 === 1 && ("" + i).length === 2);
}

console.log(odd2(array));

// Fes una funció que retorne un array de 0 a 100 amb la feqúencia de cada número en l'array original
let freq = new Array(101).fill(0);
freq = freq.map((n, i) => array.filter((n) => n === i).length);
console.log(freq);

// Fes una funció que indique si un número és major que un altre segons la longitut del seu nom en castellá o valenciá
let numerosCastella = [
  "cero",
  "uno",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
  "nueve",
  "diez",
  "once",
  "doce",
  "trece",
  "catorce",
  "quince",
  "dieciséis",
  "diecisiete",
  "dieciocho",
  "diecinueve",
  "veinte",
  "veintiuno",
  "veintidós",
  "veintitrés",
  "veinticuatro",
  "veinticinco",
  "veintiséis",
  "veintisiete",
  "veintiocho",
  "veintinueve",
  "treinta",
  "treinta y uno",
  "treinta y dos",
  "treinta y tres",
  "treinta y cuatro",
  "treinta y cinco",
  "treinta y seis",
  "treinta y siete",
  "treinta y ocho",
  "treinta y nueve",
  "cuarenta",
  "cuarenta y uno",
  "cuarenta y dos",
  "cuarenta y tres",
  "cuarenta y cuatro",
  "cuarenta y cinco",
  "cuarenta y seis",
  "cuarenta y siete",
  "cuarenta y ocho",
  "cuarenta y nueve",
  "cincuenta",
  "cincuenta y uno",
  "cincuenta y dos",
  "cincuenta y tres",
  "cincuenta y cuatro",
  "cincuenta y cinco",
  "cincuenta y seis",
  "cincuenta y siete",
  "cincuenta y ocho",
  "cincuenta y nueve",
  "sesenta",
  "sesenta y uno",
  "sesenta y dos",
  "sesenta y tres",
  "sesenta y cuatro",
  "sesenta y cinco",
  "sesenta y seis",
  "sesenta y siete",
  "sesenta y ocho",
  "sesenta y nueve",
  "setenta",
  "setenta y uno",
  "setenta y dos",
  "setenta y tres",
  "setenta y cuatro",
  "setenta y cinco",
  "setenta y seis",
  "setenta y siete",
  "setenta y ocho",
  "setenta y nueve",
  "ochenta",
  "ochenta y uno",
  "ochenta y dos",
  "ochenta y tres",
  "ochenta y cuatro",
  "ochenta y cinco",
  "ochenta y seis",
  "ochenta y siete",
  "ochenta y ocho",
  "ochenta y nueve",
  "noventa",
  "noventa y uno",
  "noventa y dos",
  "noventa y tres",
  "noventa y cuatro",
  "noventa y cinco",
  "noventa y seis",
  "noventa y siete",
  "noventa y ocho",
  "noventa y nueve",
  "cien",
];
const gt = (a,b) => numerosCastella[a].length > numerosCastella[b].length ? 1 : -1;

console.log(gt(22,10))

// Fes una funció per ordenar l'array segons el criteri de la funció anterior
const sortByName = (array) => {
    let arrayAux = [...array];
    return arrayAux.sort(gt)
}

console.log(sortByName(array))

// Fes una funció que accepte un número y retorne una funció que accepte un array i 
// retorne si el número està en l'array.
const findNumber = (number) => (array) => array.includes(number);


const find34 = findNumber(34);
const find35 = findNumber(35);
console.log(find34(array),find35(array));