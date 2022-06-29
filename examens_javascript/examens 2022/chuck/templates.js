export { factTemplate };

function factTemplate(fact) {
  const divFact = document.createElement("div");
  divFact.innerHTML = `
    <p>${fact.value}<p>
    <a href="${fact.url}">Link</a>

    `;
 
  return divFact;
}
