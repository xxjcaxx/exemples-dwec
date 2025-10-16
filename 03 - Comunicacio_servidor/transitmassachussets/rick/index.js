let colorArray = [
  "#FF6633",
  "#E6FF80",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];
/*
const getAlerts = (url) =>
  fetch(url)
    .then((response) => response.json())
    .then((data) => data.data.map((a) => a.attributes));
*/

const getAlerts = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return  data.data.map((a) => a.attributes);
}

const renderAlerts = (alerts) => {
  const tableAlerts = document.createElement("table");
  tableAlerts.innerHTML = `
                <thead>
                <th>
                    Cause
                </th>
                <th>
                    Description
                </th>
                <th>
                    Effect
                </th>
            </thead>
    `;

  const causes = [...new Set(alerts.map((a) => a.cause))];

  /*const trs = alerts.map((a) => {
    const tr = document.createElement("tr");
    tr.style.backgroundColor = colorArray[causes.indexOf(a.cause)];
    tr.innerHTML = `<td>${a.cause}</td><td>${a.header}</td><td>${a.effect}</td>`;
    return tr;
  });
  tableAlerts.append(...trs);*/

  for(let a of alerts){
     const tr = document.createElement("tr");
    tr.style.backgroundColor = colorArray[causes.indexOf(a.cause)];
    tr.innerHTML = `<td>${a.cause}</td><td>${a.header}</td><td>${a.effect}</td>`;
    tableAlerts.append(tr);
  }

  return tableAlerts;
};
/*
const manageAlerts = (url, time, callback, filterFunction) => {
  const intervalIdentificator = setInterval(() => {
    getAlerts(url)
    .then(alerts => alerts.filter(filterFunction))
    .then(callback);
  }, time);
  return intervalIdentificator;
};
*/

const manageAlerts = (url, time, callback, filterFunction) => {
  const intervalIdentificator = setInterval(async () => {
    let alerts = await getAlerts(url);
    alerts = alerts.filter(filterFunction);
    callback(alerts);
  }, time);
  return intervalIdentificator;
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#container");
  const url =
    "https://api-v3.mbta.com/alerts?sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE";
  const intervalIdentificator=  manageAlerts(url, 3000, (alerts) => {
    const tableAlerts = renderAlerts(alerts);
    container.replaceChildren(tableAlerts);
  }, (alert)=> alert.cause === "CONSTRUCTION");

   
 
  /*
  getAlerts(
    "https://api-v3.mbta.com/alerts?sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE"
  ).then((alerts) => {
    const tableAlerts = renderAlerts(alerts);
    container.append(tableAlerts);
  });*/
});
