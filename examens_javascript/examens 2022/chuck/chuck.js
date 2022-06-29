import { randomFact, categoryList, categoryQuery, searchQuery } from "./api.js";
import { factTemplate } from "./templates.js";

document.addEventListener("DOMContentLoaded", function main() {
  const searchInput = document.querySelector("#searchInput");
  const factsList = document.querySelector("#factsList");
  const refreshButton = document.querySelector("#refreshButton");
  const categoryListDiv = document.querySelector("#categoriesList");

  let throttleTimer;

  function throttle  (callback, time) {
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  };

  function replaceFact(factArray) {
    factsList.innerHTML = "";
    for (let f of factArray) {
      factsList.append(factTemplate(f));
    }
  }

  randomFact().then((fact) => replaceFact([fact]));

  refreshButton.addEventListener("click", function refreshClick() {
    factsList.innerHTML = '<img src="loading.gif">';
    randomFact().then((fact) => {
      replaceFact([fact]);
    });
  });

  categoryList().then((cList) => {
    for (let cat of cList) {
      const catLi = document.createElement("li");
      catLi.innerHTML = cat;
      catLi.addEventListener("click", () => {
        categoryQuery(cat).then((fact) => replaceFact([fact]));
      });
      categoryListDiv.append(catLi);
    }
  });

  searchInput.addEventListener("keyup", (event) => {
    let value = searchInput.value;
    if (value.length >= 4) {
      console.log(value);
      throttle(() => {
        searchQuery(value).then((facts) => {
          console.log(facts);
          replaceFact(facts.result);
        });
      }, 2000);
    }
  });
});
