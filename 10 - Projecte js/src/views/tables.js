import * as DOM from '../utils/dom.js';
import * as icons from '../views/icons.js';


export {generateTable};

/// Programació funcional
const cols = data => Object.keys(data[0]);
const values = data => Object.values(data);

const generateTr = (type,columns,index,iconList) => 
`<tr>
    ${columns.map(c => `<${type} id="${c}-${index}" >${c}</${type}>`).join('')}
    ${iconList.length > 0 ? `<${type}>${iconList.map(i => `<span class="${i}" id="${i}-${index}">${icons[i]}</span>`).join('')}</${type}>` : ''}   
</tr>`;

function generateEditableTr(edit_icon, index, dataRow){
  let tr = edit_icon.parentElement.parentElement;
  let form = cols([dataRow]).map((c)=> `<td id="${c}-${index}" > <div><input type="text"  class="form-control" value="${dataRow[c]}"> </div></td>`).join('')
                          +`<td><span class="save_icon" id="save-${index}">${icons.save_icon}</span></td>`;
  tr.innerHTML = form;
}

function generateDataTable(data){
  let table = DOM.createElement('table',{classes: ['table','table-responsive']})
              .add(DOM.createElement('thead',{innerHTML: generateTr('th',[...cols(data),'Modifications'],'th',[])}))
              .add(DOM.createElement('tbody',{innerHTML: data.map((g,i) => generateTr('td',values(g),i,['pencil_icon','trash_icon']) ).join('') }))
 
  table.querySelectorAll('.pencil_icon').forEach(edit_icon=>{
    let index = edit_icon.id.split('-')[1];
    let dataRow = data[index];
    edit_icon.addEventListener('click',()=>{
      generateEditableTr(edit_icon,index,dataRow);        
    });
  })
  return table;
}


function generateTable(graph){

    const cardTemplate = document.createElement('div');
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