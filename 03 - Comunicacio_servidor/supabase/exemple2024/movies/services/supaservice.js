export {getMovies, getMovie}

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndnRwdWNveHZlZWJpemtuaGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNTA0ODYsImV4cCI6MjAzMDkyNjQ4Nn0.rDdWANw1LN10BunTH8TKeIAfM-EMlWpTaNyxQSbe30k";
const url = "https://ygvtpucoxveebizknhat.supabase.co/rest/v1/"   

async function getMovies(){
    const token = localStorage.getItem('token');
   const response = await fetch(`${url}movies?select=*`,{
        method: "get",
        headers: {
            apiKey, Authorization: `Bearer ${token}`,   
        }
    });
    const movies = await response.json();
    return movies;

}


async function getMovie(id,token){
   // const token = localStorage.getItem('token');
   const response = await fetch(`${url}movies?id=eq.${id}&select=*`,{
        method: "get",
        headers: {
            apiKey,
            Authorization: `Bearer ${token}`, 
        }
    });
    const movies = await response.json();
    return movies;

}



