import "./style.scss";
import * as bootstrap from "bootstrap";

async function getCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character");
  const characters = await response.json();
  return characters;
}

function renderCharacter(character) {
  const plantilla = `
  <section class="card" style="max-width: 320px">
  <img src="${character.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title">${character.name}</h4>
    <p class="card-text">${character.species} </p>
    <p class="card-text">${character.gender} </p>
    <a href="#" class="btn-solid theme-primary">Details</a>
  </div>
</section>
  `;
  const div = document.createElement("div");
  div.classList.add("col-3");
  div.innerHTML = plantilla;

  return div;
}

function renderCharacters(characters) {
  const divRow = document.createElement("div");
  divRow.classList.add("row", "gy-5");
  divRow.append(...characters.map(renderCharacter));
  return divRow;
}

function createNavbar() {
  const plantilla = `<nav class="navbar md:navbar-expand bg-1">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Rick and Morty</a>
    <button class="btn-icon navbar-toggler" type="button" data-bs-toggle="drawer" data-bs-target="#navbarDrawer" aria-controls="navbarDrawer" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" aria-hidden="true"></span>
    </button>
    <dialog class="drawer drawer-end" tabindex="-1" id="navbarDrawer" aria-labelledby="navbarDrawerLabel">
      <div class="drawer-header">
        <h5 class="drawer-title" id="navbarDrawerLabel">Menu</h5>
        <button type="button" class="btn-close" data-bs-dismiss="drawer" aria-label="Close"></button>
      </div>
      <div class="drawer-body mb-2 md:mb-0">
        <ul class="nav navbar-nav me-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <button class="nav-link" type="button" data-bs-toggle="menu" aria-expanded="false">
              Menu
            </button>
            <div class="menu">
              <a class="menu-item" href="#">Action</a>
              <a class="menu-item" href="#">Another action</a>
              <hr class="menu-divider">
              <a class="menu-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form class="hstack gap-2" role="search">
          <input class="form-control" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn-solid btn-icon theme-secondary" type="submit">
            <svg class="bi" width="16" height="16"><use href="#search" /></svg>
          </button>
        </form>
      </div>
    </dialog>
  </div>
</nav>`;
  const divWrapper = document.createElement("div");
  divWrapper.innerHTML = plantilla;
  return divWrapper.firstElementChild;
}

function createPagination(pages) {
  const divPagination = document.createElement("div");
  divPagination.classList.add("btn-group");
  divPagination.role = "group";
  const template = Array(pages)
    .fill(0)
    .map(
      (_, i) =>
        ` <button type="button" class="btn-solid theme-primary">${i}</button>`,
    )
    .join("");

  divPagination.innerHTML = template;

  return divPagination;
}

document.addEventListener("DOMContentLoaded", async () => {
  const characters = await getCharacters();
  document.querySelector("#header").append(createNavbar());
  document.querySelector("#app").append(renderCharacters(characters.results));
  document
    .querySelector("#footer")
    .append(createPagination(parseInt(characters.info.pages)));
});
