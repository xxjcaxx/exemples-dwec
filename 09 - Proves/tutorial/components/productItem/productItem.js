export {productTemplate};

const productTemplate = (product) => {
    let div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `  
        <div class="card" style="width: 18rem">
        <div class="card-body">
            <h5 class="card-title">${product.asin}</h5>
            
        </div>
        </div>
        `;
    return div;
}
