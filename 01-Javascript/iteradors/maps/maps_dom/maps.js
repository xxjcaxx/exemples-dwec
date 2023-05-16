document.addEventListener("DOMContentLoaded",()=>{


  const table = document.createElement('table');
document.body.append(table);

const count = 10000;
for (let i = 0; i < count; i++) {
  const item = document.createElement('tr');
  item.id = i;
  item.textContent = 'item';
  table.append(item);
}

let trMap = new Map();

function clickFunction(){
  trMap.get(this).selected = trMap.get(this).selected ? false : true;
  if(trMap.get(this).selected) this.style.backgroundColor = "#F00";
  else this.style.backgroundColor = null;
}

let trs = table.querySelectorAll('tr');
for(let tr of trs){
  trMap.set(tr,{selected: false});
  tr.addEventListener('click',clickFunction);
}




});

// Inspirat en https://www.macarthur.me/posts/maps-for-dom-nodes 
