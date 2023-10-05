let john = { name: "John Doe" },
  lily = { name: "Lily Bush" },
  peter = { name: "Peter Drucker" };

let userRoles = new Map();

///// Comprovacions que es poden fer:
console.log(typeof userRoles); // object
console.log(userRoles instanceof Map); // true

//// Assignar un valor a un objecte (clau). Es pot concatenar
userRoles.set(john, "admin").set(lily, "editor").set(peter, "user");

/// Fer-ho tot en una

let userRoles2 = new Map([
  [john, "admin"],
  [lily, "editor"],
  [peter, "user"],
]);

console.log(userRoles, userRoles2, userRoles.size);

if (userRoles.has(john)) {
  console.log(userRoles.get(john));
}

///// Iterar

for (const user of userRoles.keys()) {
  console.log(user.name);
}

for (const role of userRoles.values()) {
  console.log(role);
}

for (let [user, role] of userRoles.entries()) {
  // Array destructuring
  console.log(`${user.name}: ${role}`);
}

userRoles.forEach((role, user) => console.log(`${user.name}: ${role}`));

///////////////////////////////////////////////////////////////////////////

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

let pokemonsMap = new Map(
  pokemons.map((p) => [p, Math.random() > 0.5 ? true : false])
);
console.log(pokemonsMap);

pokemonsMap.forEach((valor, clau) =>
  valor ? console.log(clau) : console.log(false)
);
