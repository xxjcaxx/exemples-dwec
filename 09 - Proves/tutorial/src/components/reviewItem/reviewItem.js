export {reviewTemplate, reviewItemTemplate};

const reviewTemplate = (review) => {
    let div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `  
        <div class="card" style="width: 18rem">
        <div class="card-body">
            <h5 class="card-title">${review.asin}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${review.summary}</h6>
            <p class="card-text">${review.reviewText}</p>
            <p class="card-text">${review.overall}</p>
            <p class="card-text">${review.reviewerName}</p>
        </div>
        </div>
        `;
    return div;
}


const reviewItemTemplate = (review) => {
    let div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `  
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#collapse${review.id}" 
                    aria-expanded="true" aria-controls="collapse${review.id}">
                    ${review.overall} ${review.summary}
                </button>
             </h2>
            <div id="collapse${review.id}" class="accordion-collapse collapse ">
            <div class="accordion-body">
                <p class="card-text">${review.reviewText}</p>
                <p class="card-text">${review.reviewerName}</p>
            </div
            </div>
        </li>
        `;
    return div;
}