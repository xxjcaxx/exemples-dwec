import {liga} from "./liga.js"



function cleanData(partits){

    return partits
}

console.log(cleanData(liga));

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