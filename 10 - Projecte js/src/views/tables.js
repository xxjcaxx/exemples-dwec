export {generateTable};

let trash_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`;
let pencil_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>`;
let save_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
<path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
</svg>`;


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
    let cols = Object.keys(data[0]);

    
    let table = document.createElement('table');
    table.classList.add('table','table-responsive');
    let tableHeader = document.createElement('thead');
    table.append(tableHeader);
    let columnNames = '<tr>'+cols.map(c=> `<th>${c}</th>`).join('')+`<th class="column_buttons">Modify</th></tr>`;
    tableHeader.innerHTML = columnNames;

    cardTemplate.querySelector('.card-body').append(table);
    let rows = graph.Data.map((g,i) => "<tr>"
                                    +cols.map(c => `<td id="${c}-${i}" >${g[c]}</td>`).join('')
                                    +`<td><span class="edit_icon" id="edit-${i}">${pencil_icon}</span>
                                    <span class="delete_icon" id="delete-${i}">${trash_icon}</span></td>
                                    </tr>`).join('');
        
    let tBody = document.createElement('tbody');
    tBody.innerHTML = rows;
    table.append(tBody);

    
    table.querySelectorAll('.edit_icon').forEach(edit_icon=>{
      edit_icon.addEventListener('click',()=>{
        let index = edit_icon.id.split('-')[1];
        let tr = edit_icon.parentElement.parentElement;
        let dataRow = graph.Data[index];
        let form = cols.map((c)=> `<td id="${c}-${index}" > <div><input type="text"  class="form-control" value="${dataRow[c]}"> </div></td>`).join('')
                                +`<td><span class="save_icon" id="save-${index}">${save_icon}</span></td>`;
        tr.innerHTML = form;
        
      });
    })

    return cardTemplate;
}