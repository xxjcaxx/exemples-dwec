import { generateMoviesList } from "./components/movieslist";
import { getMovie, getMovies } from "./services/supaservice";
import { generateMovieDetail } from "./components/movieDetail";

export {router}

async function router(route, container){
    console.log(route);

   // const routeModel = route.split('/')[1];
   // const routeID = route.split('/')[2];

    const [hash,routeModel,routeID] = route.split('/');

    switch(routeModel){
        case 'movies':
            const movies = await getMovies();
            const moviesDiv = await generateMoviesList(movies);
            container.innerHTML='';
            container.append(moviesDiv);
            break;
        case 'login':
            console.log('login');
            break;
        case 'movie':
            const movie = await getMovie(routeID,localStorage.getItem('token'));
            console.log(movie);
            
            const movieDiv = await generateMovieDetail(movie[0]);
            container.innerHTML='';
            container.append(movieDiv);
            break;
        default: 
            window.location.hash = '#/movies'
    }
}