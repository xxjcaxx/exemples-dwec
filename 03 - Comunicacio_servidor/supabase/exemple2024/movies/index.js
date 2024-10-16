import { generateMoviesList } from "./components/movieslist";
import { getMovies } from "./services/supaservice";


async function getAndRenderMovies(container){
    container.append(generateMoviesList(await getMovies()))
}

document.addEventListener('DOMContentLoaded', ()=>{
    const moviesContainer = document.querySelector('#moviesContainer');
    getAndRenderMovies(moviesContainer);
});