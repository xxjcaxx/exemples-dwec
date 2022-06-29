let name = ["Commander", "Bullet", "Imperator", "Doof", "Duff", "Immortal", "Big", "Grease", "Junk", "Rusty", "Gas", "War",
     "Feral", "Blood", "Lead", "Max", "Sprog", "Allan", "Smoke"];
let surname = ["Rider", "Cutter", "Guts", "Eater", "Warrior", "Colossus", "Blaster", "Gunner", "Smith",
     "Doe", "Farmer", "Rock", "Claw", "Boy", "Girl", "Driver", "Ace", "Quick", "Blitzer", "Fury", "Roadster",
     "Interceptor"];

function cartesian(array1, array2){
    return array1.map(a => array2.map(b=> `${a} ${b}`)).flat();
}

console.log(cartesian(name,surname));