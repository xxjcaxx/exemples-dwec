export {generateCRUDTABLE, getArrayTable};

const getArrayTable = (data) => {
    let columns = [... new Set(data.map(row => Object.keys(row)).flat())];
    let dataTable = data.map(row => columns.map(col => row[col] ? row[col]: null));
    return [columns, ...dataTable];
}

 /*

    [{a: 1, b: 2},{a: 1, c: 4}]  

    [[a,b,c],[1,2,null],[1,null,4]] 

    */

const generateROW = (row) => row.map( col => `<td class="overflow-hidden">${col}</td>`).join('')

const generateCRUDTR = (row) => `<tr>${generateROW(row)}<td>
<span class="edit">&#x270D;</span>
<span class="delete">&#x1F5D1;</span>
</td></tr>`;

const generateCRUDTABLE = (data) => `
<table class="table table-striped table-hover table-sm table-responsive">
${getArrayTable(data).map(generateCRUDTR).join('')}
</table>`;