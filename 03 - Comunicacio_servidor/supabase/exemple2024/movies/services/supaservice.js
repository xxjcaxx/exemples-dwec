export {getMovies}

async function getMovies(){
    const token = localStorage.getItem('token');
   const response = await fetch("https://ygvtpucoxveebizknhat.supabase.co/rest/v1/movies?select=*",{
        method: "get",
        headers: {
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndnRwdWNveHZlZWJpemtuaGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNTA0ODYsImV4cCI6MjAzMDkyNjQ4Nn0.rDdWANw1LN10BunTH8TKeIAfM-EMlWpTaNyxQSbe30k",
            Authorization: `Bearer ${token}`,
             
        }
    });
    const movies = await response.json();
    return movies;

}


