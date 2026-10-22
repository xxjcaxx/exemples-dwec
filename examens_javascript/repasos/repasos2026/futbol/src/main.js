import './style.css';
import cara from '/1.png'
import {partits} from "./football_charts_matches"

document.addEventListener("DOMContentLoaded",()=>{

  document.querySelector("#app").innerHTML = `<img src="${cara}">`

  
  const llistaPartits = partits.split("\n").map(linea => linea.split(","))
console.log(llistaPartits);

// Convertir el array de partits en una array d'objectes partit (classe opcional)

// Mostrar 100 partits
});