function graphPlaceholder() {
  let gph = document.createElement(`img`)
  gph.src = "images/graphPlaceholder.png";
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
        <a href="#" class="btn btn-primary">Full screen</a>
      </div>
      </div>
    `;
    let graphContainer = cardTemplate.querySelector('.graph');
    graphContainer.append(graph.data ? generateBarGraph(graph.data) : graphPlaceholder());
    graphContainer.classList.add()
    return cardTemplate;
}

function generateGraph(data){
    return 'GRAPH!!!';
}