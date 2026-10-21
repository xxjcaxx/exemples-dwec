import { liga } from "./liga.js";

function cleanData(partits) {
  return partits.filter((p) => p["Sem."] !== "");
}

function weekGroup(partits) {
  const weekArray = Array(38)
    .fill(0)
    .map((i) => []);
  for (let p of partits) {
    weekArray[p["Sem."] - 1].push(p);
  }
  return weekArray;
}

function weeksToHTML(weeks) {
  const weeksTables = weeks.map((w) => {
    const trsPartits = w
      .map(
        (p) =>
          `<tr><td>${p.Local}</td><td>${p.Marcador}</td><td>${p.Visitante}</td></tr>`,
      )
      .join("");
    const plantilla = `
    <table>
        <tr><td>Local</td><td>Resultat</td><td>Visitant</td></tr>
        ${trsPartits}
    </table>
    `;
    return plantilla;
  });
  return weeksTables;
}

function appendWeeks(weeksTables, contenedor) {
  contenedor.innerHTML = weeksTables
    .map(
      (wt, i) => `<div class="weekCard"><h2>Setmana ${i + 1}</h2>${wt}</div>`,
    )
    .join("");
}

function filterTeams(weeks, name) {
  /*
    const weeksResult = [];
    for(let week of weeks){
        const partits = week.filter(p => p.Local.toLowerCase().includes(name.toLowerCase()) || p.Visitante.toLowerCase().includes(name.toLowerCase()));
        weeksResult.push(partits)
    }

    return weeksResult;*/

  return weeks.map((w) =>
    w.filter(
      (p) =>
        p.Local.toLowerCase().includes(name.toLowerCase()) ||
        p.Visitante.toLowerCase().includes(name.toLowerCase()),
    ),
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const weeks = weekGroup(cleanData(liga));

  //console.log(filterTeams(weeks, "vale"));
  const buscador = document.querySelector("#buscador");

  buscador.addEventListener("keyup",()=>{
    const filteredWeeks = filterTeams(weeks, buscador.value);
    console.log(buscador.value, filteredWeeks);
    appendWeeks(weeksToHTML(filteredWeeks), document.querySelector("#container"));
  });

  appendWeeks(weeksToHTML(weeks), document.querySelector("#container"));
});

/*
(0,5) Crea una funció que arreplegue els partits i elimine els que estan buits.
-> filter

(0,5) Crea una funció que arreplegue  un array de partits i els agrupe per setmanes.
-> map, forEach for..of 

(0,5) Crea una funció que arreplegue un array de setmanes i les transforme en taules HTML amb els resultats dels partits. 
createElement, innerHTML, map, forEach

(0,5) Crea una funció que arreplegue l’array de taules i les agregue al contenedor principal de l’HTML. 
append, querySelector, map, forEach

(2) Crea una funció de filtre  que arreplegue el nom parcial d’un equip de futbol retorne l’array de setmanes sols amb la informació dels partit d’eixe equip. 
filter, map

(2) Fes un input en l’HTML que, quan siga modificat (keyup), cride a la funció del punt F i torne a renderitzar les setmanes però sols amb l’equip trobat.
addeventlister, 

(2) Amb la llista de partits i aplicant les tècniques de programació funcional, fes una funció que retorne la classificació final en forma d’un array d’objectes amb cada equip, els punts i els gols a favor i en contra. Fes també una funció que transforme aquestes dades en elements del DOM per mostrar-la a la web.   


*/
