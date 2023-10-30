/**https://github.com/xxjcaxx/exemples-dwec/blob/master/01-Javascript/iteradors/pokedex.json 

1 Transforma el fitxer anterior en un mòdul que exporte l’array de pokemons i importa en el teu mòdul principal.
2 Fes una funció que accepte un pokemon i retorne un objecte que sols continga el nom del pokemon i una puntuació basada en la mitjana de les seues propietats.
3 Fes una funció que aplica aquesta funció a un .map() sobre l’array original i retorna el resultat. 
4 Sense utilitzar for, while o foreach fes una funció que accepte el resultat de l’anterior i retorne el millor pokemon. Aquesta funció no pot alterar l’array original.
5 Fes una funció que accepte dos pokemons i calcule el que va a guanyar segons el criteri anterior. 
6 Fes una funció que diga si un pokemon és d’un tipus o no. 
7 Fes una funció que retorne tots els tipus de pokemons que hi ha sense utilitzar for, while o foreach.
8 Fes una funció que transforme un pokemon en un div amb informació d’ell.
9 Fes una funció que accepte un pokemon, un div contenedor i l’agregue al mateix, retornant el container.
10 Fes una funció amb reduce que plene un div contenedor en funció d’un array de pokemons utilitzant el codi anteriorment fet. 
11 Fes la funció principal que mostre tots els pokemons en una web. Aprofita les funcions anteriors que necessites. Ha de mostrar tant les dades que ja tens com la puntuació calculada. 
12 Fes una funció que accepte un array de tipus de pokemons y retorne un array de botons. Aquests botons tindran un manejador d’esdeveniment de manera que quan es polsa, filtra els pokemons i sols mostra els que passen el filtre.
13 Fes una funció que, donat un pokemon, retorne tots els pokemons que li poden guanyar. 
14 Fes que cada pokemon tinga un botó per mostrar-lo a ell i a tots els que li poden guanyar. 
15 Fes un botó per ordenar afabéticament els pokemons segons el nom anglés. Aquesta ordenació no altera l’array original. 

TESTS: Fes tests de tot excepte de la 11, 12, 14
 */


//////// 1 
import { pokemons } from "./pokedex.js";
export {resumePokemon, resumeAllPokemons, getBestPokemon, getPokemonWinner, checkTypePokemon, getTypes, generatePokemonDiv, 
    appendDivPokemonToContainer, fillPokemonContainer, betterThanPokemon}

//////// 2
const resumePokemon = pokemon => (
    {name: pokemon.name.english, 
     points: Object.values(pokemon.base).reduce((p,c)=> p+c,0)/6}
    );

function resumePokemon2(pokemon){
    let pokemonResume = {};
    pokemonResume.name = pokemon.name.english;
    let contador = 0;
    for(let point in pokemon.base){
        contador += pokemon.base[point];
    }
    pokemonResume.points = contador/6;
    return pokemonResume;
}
/////// 3
const resumeAllPokemons = pokemonArray => pokemonArray.map(resumePokemon);

function resumeAllPokemons2(pokemonArray){
    return pokemonArray.map((p)=> resumePokemon(p));
}
////// 4
const getBestPokemon = pokemonsResumeArray => 
    [...pokemonsResumeArray].sort((a,b)=> a.points > b.points ? -1 : 1)[0];
///// 5
const getPokemonWinner = (pokemon1, pokemon2) => resumePokemon(pokemon1).points > resumePokemon(pokemon2).points ? pokemon1 : pokemon2;
///// 6
const checkTypePokemon = (pokemon, type) => pokemon.type.some(t => t === type);
///// 7
const getTypes = pokemonArray => [...new Set(pokemonArray.map(p => p.type).flat())];
///// 8
const generatePokemonDiv = (pokemon) => { 
    let div = document.createElement('div');
    div.id = `p_${pokemon.id}`;
    div.classList.add('pokemon')
    div.innerHTML = JSON.stringify(pokemon) + `Points: ${resumePokemon(pokemon).points}`;
    return div;
}
///// 9 
const appendDivPokemonToContainer = (pokemon, container) => {
     container.append(generatePokemonDiv(pokemon));
    return container;
    }
///// 10
const fillPokemonContainer = (pokemons, container) =>  pokemons.reduce(
    (previousContainer,pokemon) => 
    appendDivPokemonToContainer(pokemon,previousContainer)
    ,container);


///// 12 
const generateButtonsType = (pokemons,container) => getTypes(pokemons).map(type => {
    
    let button = document.createElement('button');
    button.innerHTML = type;
    button.addEventListener('click',()=>{
        let pokemonFiltered = pokemons.filter(p => checkTypePokemon(p,type));
        fillpokemons(pokemonFiltered,container);
    });
    return button;
});    

////// 13

const betterThanPokemon = (pokemons,pokemon) => pokemons.filter(p => getPokemonWinner(p,pokemon) === p);


///// 14 
const addButtonsToPokemons = (container,pokemons) => container.querySelectorAll('.pokemon').forEach(pokemonDiv =>{
    let id = pokemonDiv.id.split('_')[1];
    let pokemon = pokemons.find(p => p.id == id);
   
    let button = document.createElement('button');
    button.innerHTML = 'Show Best pokemons';
    button.addEventListener('click',()=>{
        container.innerHTML = '';
        let pokemonFiltered = betterThanPokemon(pokemons,pokemon);
        console.log(pokemon);
        console.log(pokemonFiltered);
        fillpokemons(pokemonFiltered,container);
    });
    pokemonDiv.append(button);
});

const fillpokemons = (pokemons,container) =>{
    container.innerHTML = '';
    fillPokemonContainer(pokemons,container);
    addButtonsToPokemons(container,pokemons);
}

//// 15 
const alfabeticalSort = (pokemons) => {
    return [...pokemons].sort((a,b) => a.name.english > b.name.english ? 1 : -1);
}

const alfabeticalSortButton = (pokemons,container,buttonContainer) => {
    let button = document.createElement('button');
    button.innerHTML = 'Sort Alfabetically'
    button.addEventListener('click',()=>{
        fillpokemons(alfabeticalSort(pokemons),container);
    });
    buttonContainer.append(button);
}

///// 11

document.addEventListener('DOMContentLoaded',()=>{
    const container = document.querySelector('#container');
    fillpokemons(pokemons,container);
    const buttons = document.querySelector('#buttons');
    buttons.append(...generateButtonsType(pokemons,container));
    alfabeticalSortButton(pokemons,container,buttons);
});

