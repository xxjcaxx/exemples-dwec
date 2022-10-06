////////////////////////// TEMPORAL

let exampleGraphs = [
  {
    id: "1",
    title: "Sales",
    type: "lines",
    data: [1,2,3,4],
    description: "Total sales in a year per mounth",
    size: [2, 2],
  },
  {
    id: "2",
    title: "Purchases",
    type: "cake",
    data: undefined,
    description: "Total purchases in a year per mounth",
    size: [1, 2],
  },
  {
    id: "3",
    title: "Clients",
    type: "bars",
    data: undefined,
    description: "Total sales in a year per mounth",
    size: [2, 1],
  },
  {
    id: "4",
    title: "Electricity",
    type: "bars",
    data: undefined,
    description: "Total electricity consumed in a year per mounth",
    size: [1, 1],
  },
];
// https://masonry.desandro.com/options.html
// https://getbootstrap.com/docs/5.0/examples/masonry/
////////////////////////// FI TEMPORAL

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector("#container");
    container.append(menuTemplate);
    let mainWindow = document.createElement("div");
    mainWindow.id = "main";
    mainWindow.classList.add("container");
    container.append(mainWindow);
    let mainWindowRow = document.createElement("div");
    mainWindowRow.classList.add("row", "gx-2", "gy-2", "row-cols-3");
    mainWindow.append(mainWindowRow);

    for (let g of exampleGraphs) {
      mainWindowRow.append(generateGraphCard(g));
    }

    container.append(generateFooter());

  
  });
})();
