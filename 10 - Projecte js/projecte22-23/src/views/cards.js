import {generateLineGraph, generateBarGraph} from "../graphs/graphs.js"
import placeHolderImg from '../images/graphPlaceholder.png'

export {graphPlaceholder,generateGraphCard,generateGraph};

function graphPlaceholder() {
  let gph = document.createElement(`img`)
  gph.src =  placeHolderImg; //"images/graphPlaceholder.png";
  gph.style.width = '100%';
  return gph;
} 

function generateGraphCard(graph){
    let cardTemplate = document.createElement('div');
    cardTemplate.classList.add('col');
    cardTemplate.innerHTML = `
    <div class="card">
      <div class="card-header">
        ${graph.title}
      </div>
      <div class="card-body">
        <div class="graph"></div>
        <p class="card-text">${graph.description}</p>
        <a href="#/graph/${graph.id}" class="btn btn-primary">Full screen</a>
      </div>
      </div>
    `;
    let graphContainer = cardTemplate.querySelector('.graph');
    graphContainer.append(graph.Data ? generateBarGraph(graph.Data) : graphPlaceholder());
    graphContainer.classList.add()
    return cardTemplate;
}

function generateGraph(data){
    return 'GRAPH!!!';
}
