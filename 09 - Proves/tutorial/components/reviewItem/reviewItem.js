export {reviewTemplate};

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
