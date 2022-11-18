export {generateTable};

function generateTable(graph){

    let cardTemplate = document.createElement('div');
    cardTemplate.classList.add('col');
    cardTemplate.innerHTML = `
    <div class="card">
      <div class="card-header">
        ${graph.title}
      </div>
      <div class="card-body">
      </div>
      </div>
    `;

    let data = graph.Data;
    let cols = Object.keys(graph.Data[0]);

    
    let table = document.createElement('table');
    let tableHeader = document.createElement('tr');
    table.append(tableHeader);
    let columnNames = cols.map(c=> `<th>${c}</th>`).join('');
    tableHeader.innerHTML = columnNames;
    cardTemplate.querySelector('.card-body').append(table);
    let rows = graph.Data.map(g => cols.map(c => `<td>${g[c]}</td>`).join(''));
    for(let r of rows){
        let rowTR = document.createElement('tr');
        rowTR.innerHTML = r;
        table.append(rowTR);
    }

    return cardTemplate;
}