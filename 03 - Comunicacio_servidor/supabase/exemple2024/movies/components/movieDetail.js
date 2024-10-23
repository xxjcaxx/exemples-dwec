export {generateMovieDetail}

function generateMovieDetail (movie) {
    console.log(movie);
    
    const {original_title,release_date} = movie;
    const movieDiv= document.createElement('div');
    movieDiv.innerHTML = `
    <h1>${original_title}</h1>
    <h3>${release_date}</h3>
    `;

    return movieDiv;
}