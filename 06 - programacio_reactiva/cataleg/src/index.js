
import "./style.css";
import {exemples,categories} from './exemples';

document.addEventListener("DOMContentLoaded", () => {

  const categoriesDivs = categories.map(c=> {
    const catDiv = document.createElement('div');
    catDiv.id = c.id;
    catDiv.innerHTML = `
    <h2>${c.name}</h2>
    <p>${c.description}</p>
    `;
    return catDiv;
});
categoriesDivs.forEach(cD => document.querySelector('#container').append(cD));


  exemples.forEach((exemple)=>{
    const catDiv = document.querySelector(`#${exemple.category}`);
    const exempleDiv = document.createElement('div');
    //exempleDiv.id = exemple.id; 
    exempleDiv.classList.add('containerExemples')
    exempleDiv.innerHTML = `
          <div class="exemplesResum">
            <h3>${exemple.name}</h3>
            <p>${exemple.description}</p>
          </div>
          ${exemple.htmlExemple}
          <div id="${exemple.id}code" class="code">
            ${exemple.htmlCode}
          </div>
    `;
    catDiv.append(exempleDiv);
    exemple.method();
  })
  


  
  

});
