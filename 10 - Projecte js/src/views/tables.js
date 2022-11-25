import * as icons from '../views/icons.js';


export {generateTable};

/// Programació funcional
const cols = data => Object.keys(data[0]);

const generateTr = (type,columns,index,icons) => 
`<tr>
    ${cols([columns]).map(c => `<${type} id="${c}-${index}" >${c}</${type}>`).join('')}
    ${icons.length > 0 ? `<${type}>${icons.map(i => `<span class="${i}" id="${i}-${index}">${icons[i]}</span>`).join('')}</${type}>` : ''}   
</tr>`;

function generateEditableTr(edit_icon, index, dataRow){
  let tr = edit_icon.parentElement.parentElement;
  let form = cols(dataRow).map((c)=> `<td id="${c}-${index}" > <div><input type="text"  class="form-control" value="${dataRow[c]}"> </div></td>`).join('')
                          +`<td><span class="save_icon" id="save-${index}">${icons.save_icon}</span></td>`;
  tr.innerHTML = form;
}

function generateDataTable(data){

  let table = document.createElement('table');
  table.classList.add('table','table-responsive');
  let tableHeader = document.createElement('thead');
  table.append(tableHeader);

  tableHeader.innerHTML = generateTr('th',{...data[0],'Modifications':''},'th',[]);



  let rows = data.map((g,i) => generateTr('td',g,i,['pencil_icon','trash_icon']) )


  /*let rows = data.map((g,i) => "<tr>"
                                  +cols(data).map(c => `<td id="${c}-${i}" >${g[c]}</td>`).join('')
                                  +`<td><span class="edit_icon" id="edit-${i}">${icons.pencil_icon}</span>
                                  <span class="delete_icon" id="delete-${i}">${icons.trash_icon}</span></td>
                                  graph   </tr>`).join('');*/
      
  let tBody = document.createElement('tbody');
  tBody.innerHTML = rows;
  table.append(tBody);

  
  table.querySelectorAll('.edit_icon').forEach(edit_icon=>{
    let index = edit_icon.id.split('-')[1];
    let dataRow = data[index];
    edit_icon.addEventListener('click',()=>{
      generateEditableTr(edit_icon,index,dataRow);        
    });
  })
  return table;
}


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
    cardTemplate.querySelector('.card-body').append(generateDataTable(graph.Data));
    
    return cardTemplate;
}