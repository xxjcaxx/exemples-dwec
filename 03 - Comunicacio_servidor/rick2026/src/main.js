import "./style.css";

async function getCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const characters = await response.json();
  return characters;
}


console.log(await getCharacters());
