let graphPlaceholder = `<img src="images/graphPlaceholder.png" alt="graph Placeholder">`

function generateGraphCard(graph){
    let cardTemplate = document.createElement('div');
    cardTemplate.classList.add('col');
    cardTemplate.innerHTML = `
    <div class="card">
      <div class="card-header">
        ${graph.title}
      </div>
      <div class="card-body">
        <div class="graph">${graph.data ? generateGraph(graph.data) : graphPlaceholder}</div>
        <p class="card-text">${graph.description}</p>
        <a href="#" class="btn btn-primary">Full screen</a>
      </div>
      </div>
    `;
    return cardTemplate;
}

function generateGraph(data){
    return 'GRAPH!!!';
}