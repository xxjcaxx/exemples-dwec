import { resumePokemon, resumeAllPokemons, getBestPokemon, getPokemonWinner, checkTypePokemon, getTypes, 
    generatePokemonDiv, appendDivPokemonToContainer, fillPokemonContainer, betterThanPokemon } from "../src/index.js";
//import { pokemons } from "../../src/pokedex.js";

const pokemons = [{
    "id": 1,
    "name": {
      "english": "Bulbasaur",
      "japanese": "フシギダネ",
      "chinese": "妙蛙种子",
      "french": "Bulbizarre"
    },
    "type": [
      "Grass",
      "Poison"
    ],
    "base": {
      "HP": 45,
      "Attack": 49,
      "Defense": 49,
      "Sp. Attack": 65,
      "Sp. Defense": 65,
      "Speed": 45
    }
  },
  {
    "id": 2,
    "name": {
      "english": "Ivysaur",
      "japanese": "フシギソウ",
      "chinese": "妙蛙草",
      "french": "Herbizarre"
    },
    "type": [
      "Grass",
      "Poison"
    ],
    "base": {
      "HP": 60,
      "Attack": 62,
      "Defense": 63,
      "Sp. Attack": 80,
      "Sp. Defense": 80,
      "Speed": 60
    }
  },
  {
    "id": 3,
    "name": {
      "english": "Venusaur",
      "japanese": "フシギバナ",
      "chinese": "妙蛙花",
      "french": "Florizarre"
    },
    "type": [
      "Grass",
      "Poison"
    ],
    "base": {
      "HP": 80,
      "Attack": 82,
      "Defense": 83,
      "Sp. Attack": 100,
      "Sp. Defense": 100,
      "Speed": 80
    }
  }]

describe("Pokemons", function () {
    describe("Utilitats", function () {
        it("Pokemon resume", function () {
            const result = resumePokemon(pokemons[0]);
            expect(result).toBeDefined();
            expect(result).toEqual(jasmine.any(Object));
            expect(result).toEqual({ name: "Bulbasaur", points: 53 });
        });
        it("All Pokemons resume", function () {
            const result = resumeAllPokemons(pokemons);
            expect(result).toBeInstanceOf(Array);
            expect(result.length).toBe(pokemons.length);
            expect(result[0]).toEqual({ name: "Bulbasaur", points: 53 });
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
            expect(checkTypePokemon(pokemons[0], "Grass")).toBe(true);
            expect(checkTypePokemon(pokemons[0], "Poison")).toBe(true);
            expect(checkTypePokemon(pokemons[0], "Foo")).toBe(false);
        });
        it("Get Types", function () {
            expect(getTypes(pokemons)).toEqual([
                "Grass",
                "Poison"
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