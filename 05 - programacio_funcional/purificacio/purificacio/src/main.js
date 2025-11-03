import { ordernarArray, mostrarEstat } from "./dades";

const estat = [1, 0, 3, 7, 5];



document.addEventListener("DOMContentLoaded", () => {
  console.log(estat);
  const app = document.querySelector("#app");
  app.innerHTML = mostrarEstat(ordernarArray(estat));
  console.log(estat);
});
