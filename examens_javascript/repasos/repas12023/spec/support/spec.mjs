import { resumePokemon, resumeAllPokemons, getBestPokemon, getPokemonWinner, checkTypePokemon, getTypes, 
    generatePokemonDiv, appendDivPokemonToContainer, fillPokemonContainer, betterThanPokemon } from "../../src/index.js";
import { pokemons } from "../../src/pokedex.js";

describe("Pokemons", function () {
    describe("Utilitats", function () {
        it("Pokemon resume", function () {
            expect(resumePokemon(pokemons[0])).toEqual({ name: "Bulbasaur", points: 53 });
        });
        it("All Pokemons resume", function () {
            expect(resumeAllPokemons(pokemons).length).toBe(pokemons.length);
            expect(resumeAllPokemons(pokemons)[0]).toEqual({ name: "Bulbasaur", points: 53 });
        });
        it("Best pokemon", function () {
            let resumePokemons = resumeAllPokemons(pokemons)
            let bestPokemon = getBestPokemon(resumePokemons);
            expect(resumePokemons.findIndex(p => p.points > bestPokemon)).toBe(-1);
        });
        it("Winner ", function () {
            expect(getPokemonWinner(pokemons[0], pokemons[1])).toEqual(pokemons[1]);
            expect(getPokemonWinner(pokemons[1], pokemons[2])).toEqual(pokemons[2]);
            expect(getPokemonWinner(pokemons[2], pokemons[1])).toEqual(pokemons[2]);
        });
        it("Check type ", function () {
            expect(checkTypePokemon(pokemons[0], "Grass")).toEqual(true);
            expect(checkTypePokemon(pokemons[0], "Poison")).toEqual(true);
            expect(checkTypePokemon(pokemons[0], "Foo")).toEqual(false);
        });
        it("Get Types", function () {
            expect(getTypes(pokemons)).toEqual([
                "Grass",
                "Poison",
                "Fire",
                "Flying",
                "Water",
                "Bug",
                "Normal",
                "Electric",
                "Ground",
                "Fairy",
                "Fighting",
                "Psychic",
                "Rock",
                "Steel",
                "Ice",
                "Ghost",
                "Dragon",
                "Dark"
            ]);
        });
        it("Generate Div ", function () {
            expect(generatePokemonDiv(pokemons[0])).toBeInstanceOf(Element);
        });
        it("Generate Div and append ", function () {
            let container = document.createElement('div');
            expect(appendDivPokemonToContainer(pokemons[0],container)).toBeInstanceOf(Element);
        });
        it("10 generate all pokemon divs in a container ", function () {
            let container = document.createElement('div');
            expect(fillPokemonContainer(pokemons,container)).toBeInstanceOf(Element);
            container.innerHTML ='';
            expect(fillPokemonContainer(pokemons,container).querySelectorAll('div').length).toBe(pokemons.length);
        });
        it("Get Better Pokemons ", function () {
            expect(betterThanPokemon(pokemons,pokemons[0])).toBeInstanceOf(Array);
            expect(betterThanPokemon(pokemons,pokemons[0]).findIndex(p => getPokemonWinner(p,pokemons[0]))).not.toEqual(pokemons[0]);
        });
    });
});