////////////////////////// TEMPORAL

let exampleGraphs = [
  {
    id: "1",
    title: "Sales",
    type: "lines",
    data: undefined,
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
    mainWindowRow.classList.add("row", "gx-2", "gy-2");
    mainWindow.append(mainWindowRow);

    for (let g of exampleGraphs) {
      mainWindowRow.append(generateGraphCard(g));
    }

    container.append(generateFooter());

    ////////////// Proves d3js

    let data = [{"letter":"A","frequency":0.08167},{"letter":"B","frequency":0.01492},{"letter":"C","frequency":0.02782},{"letter":"D","frequency":0.04253},{"letter":"E","frequency":0.12702},{"letter":"F","frequency":0.02288},{"letter":"G","frequency":0.02015},{"letter":"H","frequency":0.06094},{"letter":"I","frequency":0.06966},{"letter":"J","frequency":0.00153},{"letter":"K","frequency":0.00772},{"letter":"L","frequency":0.04025},{"letter":"M","frequency":0.02406},{"letter":"N","frequency":0.06749},{"letter":"O","frequency":0.07507},{"letter":"P","frequency":0.01929},{"letter":"Q","frequency":0.00095},{"letter":"R","frequency":0.05987},{"letter":"S","frequency":0.06327},{"letter":"T","frequency":0.09056},{"letter":"U","frequency":0.02758},{"letter":"V","frequency":0.00978},{"letter":"W","frequency":0.0236},{"letter":"X","frequency":0.0015},{"letter":"Y","frequency":0.01974},{"letter":"Z","frequency":0.00074}];
    
    let width = 420;
    let height = 500;
    let margin = {top: 20, right: 0, bottom: 30, left: 40};


    let x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.frequency)])
    .range([height - margin.bottom, margin.top])

    let y = d3.scaleBand()
    .domain(data.map(d => d.letter))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1)
    //.range([0, 20 * data.length])

    const divGraph = document.querySelector("#graph");
    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

  svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    divGraph.append(svg.node());

    ////////////// FI proves d3js
  });
})();
