let pokemons = [
    {
      id: 1,
      name: {
        english: "Bulbasaur",
        japanese: "フシギダネ",
        chinese: "妙蛙种子",
        french: "Bulbizarre",
      },
      type: ["Grass", "Poison"],
      base: {
        HP: 45,
        Attack: 49,
        Defense: 49,
        "Sp. Attack": 65,
        "Sp. Defense": 65,
        Speed: 45,
      },
    },
    {
      id: 2,
      name: {
        english: "Ivysaur",
        japanese: "フシギソウ",
        chinese: "妙蛙草",
        french: "Herbizarre",
      },
      type: ["Grass", "Poison"],
      base: {
        HP: 60,
        Attack: 62,
        Defense: 63,
        "Sp. Attack": 80,
        "Sp. Defense": 80,
        Speed: 60,
      },
    },
    {
      id: 3,
      name: {
        english: "Venusaur",
        japanese: "フシギバナ",
        chinese: "妙蛙花",
        french: "Florizarre",
      },
      type: ["Grass", "Poison"],
      base: {
        HP: 80,
        Attack: 82,
        Defense: 83,
        "Sp. Attack": 100,
        "Sp. Defense": 100,
        Speed: 80,
      },
    },
    {
      id: 4,
      name: {
        english: "Charmander",
        japanese: "ヒトカゲ",
        chinese: "小火龙",
        french: "Salamèche",
      },
      type: ["Fire"],
      base: {
        HP: 39,
        Attack: 52,
        Defense: 43,
        "Sp. Attack": 60,
        "Sp. Defense": 50,
        Speed: 65,
      },
    },
    {
      id: 5,
      name: {
        english: "Charmeleon",
        japanese: "リザード",
        chinese: "火恐龙",
        french: "Reptincel",
      },
      type: ["Fire"],
      base: {
        HP: 58,
        Attack: 64,
        Defense: 58,
        "Sp. Attack": 80,
        "Sp. Defense": 65,
        Speed: 80,
      },
    },
  ];
  
  // Fes una funció constructora que accepte un objecte literal i retorne un objecte basat en el 
  // prototip Pokemon que continga una funció per obtindre la informació bàsica en un string.
  
  function Pokemon(infoPokemon){
    Object.assign(this , infoPokemon);

  /*  this.id = infoPokemon.id;
    this.name = {...infoPokemon.name};
    this.type = [...infoPokemon.type];
    this.base = {...infoPokemon.base};*/
  }

  Pokemon.prototype.getInfo = function (){
    return `id: ${this.id}, name: ${this.name} `;
  }
  
  let pokemonsPrototype = [];
  for(let pokemonLiteral of pokemons) {
    pokemonsPrototype.push(new Pokemon(pokemonLiteral));
  }
  
 // console.log(pokemonsPrototype);
 // console.log(pokemonsPrototype[0].getInfo())
  
  // Fes una classe amb un constructor funcione com l'anterior. 
  class PokemonClass{
    constructor (infoPokemon){
        this.id = infoPokemon.id;
        this.name = {...infoPokemon.name};
        this.type = [...infoPokemon.type];
        this.base = {...infoPokemon.base};
      }
      getInfo (){
        return `id: ${this.id}, name: ${this.name} `;
      }
  }
  
  let pokemonsClass = [];
  for(let pokemonLiteral of pokemons) {
    pokemonsClass.push(new PokemonClass(pokemonLiteral));
  }
  
 // console.log(pokemonsClass);
  
  // Fes la funció per obtindre la info bàsica per separat i clona els 
  // pokemons literals de manera que tinguen també eixa funció. 
  // Mostra també per la terminal el resultat
  
  function getInfoPokemon(){
    return `${this} id: ${this.id}, name: ${this.name} `;
  }
  

  for(let pokemon of pokemons){
    pokemon.getInfo = getInfoPokemon;
  }

 // console.log(pokemons);

  console.log(pokemons[0].getInfo());