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
  

  document.addEventListener("DOMContentLoaded",function (){

    const buttonChangePokemon = document.querySelector('#changePokemon');
  
    function choosePokemon(pokemons){
        return pokemons[Math.floor(Math.random()*pokemons.length)];
    }
    function renderPokemon(pokemon){
        return `${pokemon.name.english}`;
    }
    
    buttonChangePokemon.innerHTML = renderPokemon(choosePokemon(pokemons));
    
    // Completa el addEventListener de manera que modifique el nom del pokemon del botó al fer click.
    // Utilitza un declaració de funció i this
    buttonChangePokemon.addEventListener('click', function(){
        this.innerHTML = renderPokemon(choosePokemon(pokemons));
    });
    
    // Utilitza una funció fletxa 
  /*  buttonChangePokemon.addEventListener('click', (event) => {
        event.target.innerHTML = renderPokemon(choosePokemon(pokemons));
        console.log(this);
    });*/

    
    // Fes que cada pokemon renderitze el seu botó i, al fer click, mostre 
    //la seua informació per consola. Utilitza this, that i fes una alternativa 
    //amb funcions fletxa.

    const pokemonsDiv = document.querySelector('#pokemons');

    function drawButton(){
        let button = document.createElement('button');
        button.innerHTML = this.name.english;
        button.addEventListener('click',() => console.log(JSON.stringify(this)));
        return button;
    }
    const pokemons2 = pokemons.map( p=> { p.render = drawButton; return p})
    console.log(pokemons2);
    pokemonsDiv.append(...pokemons2.map(p => p.render()))
  })

  