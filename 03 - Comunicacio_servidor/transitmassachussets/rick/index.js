const getAlerts = (url) =>
    fetch(url)
    .then(response => response.json())
    .then(data => data.data.map(a => a.attributes))




document.addEventListener("DOMContentLoaded",()=>{
    const container = document.querySelector('#container');
    const tableAlerts = document.createElement('table');
    container.append(tableAlerts);
    tableAlerts.innerHTML= `
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
    `

   getAlerts("https://api-v3.mbta.com/alerts?sort=-created_at&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE").then(alerts =>
   {
    
     const trs = alerts.map(a=> {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${a.cause}</td><td>${a.header}</td><td>${a.effect}</td>`;
        return tr
     });
     tableAlerts.append(...trs)
   }
   )

});