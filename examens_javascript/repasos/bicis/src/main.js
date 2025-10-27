// Import our custom CSS
import "./style.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";

const getBikes = async (limit, offset) => {
  const response = await fetch(
    `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/jcdecaux-bike-stations-data-rt/records/?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  return data;
};

const renderBikes = (bikes) => {
  const divBikes = document.createElement("div");
  divBikes.innerHTML = `
<div class="container">
  <div class="row">
      ${bikes
        .map(
          (b) => `
          <div class="col">
          <div class="card ${b.available_bikes < 1 ? 'roig': ''}" style="width: 18rem;"
          >
            <div class="card-body">
              <h5 class="card-title">${b.name}</h5>
              <h6 class="card-subtitle mb-2 text-body-secondary">${b.address}</h6>
              <p class="card-text">available_bikes: ${b.available_bikes} <br>
              bike_stands ${b.bike_stands} <br>
              </p>

            </div>
          </div>
          </div>
    `
        )
        .join("")}
  </div>
</div>
  `;

  return divBikes;
};

const renderPages = (pages) => {
  const divPages = document.createElement("div");
  divPages.innerHTML = `
    <div class="btn-group me-2" role="group" aria-label="First group" id="buttonsGroup">
        ${
          /*pages
          .map(
            (p) => `
            <button type="button" class="btn btn-primary" data-page="${p}">${
              p === -1 ? "..." : p
            }</button>
            `
          )
          .join("")*/ ""
        }
    </div>
  `;
  const buttonsGroup = divPages.querySelector("#buttonsGroup");

  const renderButton = (p) => {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-primary");
    button.dataset.page = p;
    button.textContent = p === -1 ? "..." : p;
    //buttonsGroup.append(button);
    return button;
  };

  buttonsGroup.append(...pages.map(renderButton));

  divPages.addEventListener("click", (event) => {
    if (event.target.dataset.page) {
      const page = event.target.dataset.page;
      const customEvent = new CustomEvent("pageChange", {
        bubbles: true, // para que se propague
        detail: { page },
      });
      divPages.dispatchEvent(customEvent);
    }
  });
  return divPages;
};

const getPageAndRender = () => {
  
  let pageCache = {};

  return async function (page,container, map) {
    const offset = page * 10;
    const limit = 10;
    let dataBikes = {};
    if(page in pageCache){
      dataBikes = pageCache[page];
    }
    else {
      dataBikes = await getBikes(limit, offset);
      dataBikes.results.sort((a,b)=> a.available_bikes < b.available_bikes ? -1 : 1);
      pageCache[page] = dataBikes;
    }
    
    const totalPages = Math.ceil(dataBikes.total_count / 10);
    let currentPage = page;
    const visiblePages = Array(totalPages)
      .fill(0)
      .map((v, i) => i)
      .filter(
        (v) =>
          v < 3 ||
          (v > currentPage - 3 && v < currentPage + 3) ||
          v > totalPages - 4
      )
      .map((v, i, pages) => (Math.abs(pages[i + 1] - v) > 1 ? [v, -1] : v))
      .flat();
    console.log(totalPages, currentPage, visiblePages);

    const divBikes = renderBikes(dataBikes.results);
    const divPages = renderPages(visiblePages, currentPage);

    dataBikes.results.forEach((b) => {
      L.marker([b.position.lat, b.position.lon]).addTo(map).bindPopup(b.name);
    });

    const available_bikes = dataBikes.results.reduce(
      (suma, b) => {
        suma.available_bikes += b.available_bikes;
        return suma;
      },
      { available_bikes: 0 }
    );
    console.log(available_bikes);

    container.replaceChildren(divBikes, divPages);
  };
};

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#app");
  const getPageCache = getPageAndRender();

  let map = L.map("map").setView([51.505, -0.09], 5);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  getPageCache(17,container, map);

  container.addEventListener("pageChange", (event) => {
    console.log(event.detail);
    getPageCache(event.detail.page,container,map);
  });
});
