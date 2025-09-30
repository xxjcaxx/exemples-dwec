export {renderContent}

function renderContent(fruitsBoard){
    return `
<div class="container board-wrapper">
  <div class="board">
  ${
    fruitsBoard.map(f=>`<div class="cell">${f}</div>`).join('')
  }
  
   
  </div>
</div>
    `;
}