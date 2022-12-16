import './styles.css';


const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM";

///////////////// Functional 

const compose =
    (...fns) =>
     (...args) =>
       fns.slice(0, -1).reverse().reduce(
         async (memo, fn) => { return fn(await memo)},
         fns[fns.length - 1](...args),
       ); 

const syncCompose =
(...fns) =>
     (...args) =>
       fns.slice(0, -1).reverse().reduce(
         (memo, fn) => { return fn(memo)},
         fns[fns.length - 1](...args),
       ); 

const CLog = data => { console.log(data); return data }

//////////////// Data management


const specialRows = {id: `id`, link: `link`, linkText: `headline`, toDelete: ['id','link','created_at']};

const copyObject = object => { console.log("copyobject"); return {...object}; };
const deleteRows = toDelete => data => {  
  toDelete.forEach(row => delete data[row]); 
  return data;
}

const createLink =  link => linkText => data => {
  data[linkText] = `<a href="${data[link]}">${data[linkText]}</a>`;
  return data;
}

const applySpecialRows = data => specialRows => {
 return syncCompose(
  deleteRows(specialRows.toDelete),
  createLink(specialRows.link)(specialRows.linkText),
  copyObject)(data);
}

const keyToValues = data => Object.fromEntries(
                              Object.entries(data).map(([key,value]) => [key, key])
                              )

//Set => string => Set
const addCathegories = cathList => newCath => cathList.add(newCath)

///////////  HTTP API


const supaRequest = ()=> 
fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/news?select=*',
{headers : {"apiKey": SUPABASE_KEY,"Content-Type": "application/json","Range": "0-9"}}
);

const json = response => response.json();


//////////// DOM

const createElement = tag => document.createElement(tag);
const addId = element => id => { element.id = id; return element } 
const addClass = element => clasS => { element.classList.add(clasS); return element } 

const appendEl = target => element => { target.append(element); return target; }
const inner = target => innerHTML => { target.innerHTML = innerHTML; return target;}

const createRowContent = type => specialRows => data => Object.values(applySpecialRows(data)(specialRows)).map(value=> `<${type}>${value}</${type}>`).join('');

const createRow = type => specialRows => rowData =>  inner(addId(createElement(`tr`))(`article_`+rowData[specialRows.id]))(createRowContent(type)(specialRows)(rowData))

const createTable = specialRows => tableData =>tableData
                    .reduce((table,data) => 
                        appendEl(table)(createRow(`td`)(specialRows)(data)), 
                        addClass(appendEl(createElement('table'))(createRow(`th`)(specialRows)(keyToValues(tableData[0]))))('ExcelTable2007')
                    );




//////////////////// MAIN


document.addEventListener('DOMContentLoaded',()=>{
    compose(
        appendEl(document.querySelector('#container')),
        createTable(specialRows),
        json,
        supaRequest)()
});