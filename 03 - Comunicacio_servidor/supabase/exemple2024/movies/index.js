import { generateMoviesList } from "./components/movieslist";
import { getMovies } from "./services/supaservice";
import { router } from "./router";

async function getAndRenderMovies(container){
    container.append(generateMoviesList(await getMovies()))
}

document.addEventListener('DOMContentLoaded', ()=>{
    const moviesContainer = document.querySelector('#moviesContainer');
    //getAndRenderMovies(moviesContainer);

    router(window.location.hash, moviesContainer);

    window.addEventListener("hashchange", () => {
       router(window.location.hash, moviesContainer);
       });
       

    const loginButton = document.querySelector('#loginButton');
    loginButton.addEventListener('click', async(event)=>{
        event.preventDefault();
        const datos = new FormData(document.querySelector('#login form'));
        console.log(JSON.stringify(Object.fromEntries(datos)));
        const body = JSON.stringify(Object.fromEntries(datos));
        const response = await fetch('https://ygvtpucoxveebizknhat.supabase.co/auth/v1/token?grant_type=password',{
            method: "POST",
            headers: {
                apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndnRwdWNveHZlZWJpemtuaGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNTA0ODYsImV4cCI6MjAzMDkyNjQ4Nn0.rDdWANw1LN10BunTH8TKeIAfM-EMlWpTaNyxQSbe30k",
                "Content-type": "application/json" 
            },
            body
        });
        const dataLogin = await response.json();
        console.log(dataLogin);
        localStorage.setItem('token',dataLogin.access_token);
        const responseProfile =  await fetch(`https://ygvtpucoxveebizknhat.supabase.co/rest/v1/profiles?select=*&id=eq.${dataLogin.user.id}`,{
            method: "get",
            headers: {
                apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndnRwdWNveHZlZWJpemtuaGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNTA0ODYsImV4cCI6MjAzMDkyNjQ4Nn0.rDdWANw1LN10BunTH8TKeIAfM-EMlWpTaNyxQSbe30k",
                Authorization: `Bearer ${dataLogin.access_token}`,
                 
            }
        });
        const dataProfile = await responseProfile.json();
        console.log(dataProfile);
        const avatarResponse = await fetch(`https://ygvtpucoxveebizknhat.supabase.co/storage/v1/object/fotos/${dataProfile[0].avatar_url}`,{
            method: "get",
            headers: {
                apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndnRwdWNveHZlZWJpemtuaGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNTA0ODYsImV4cCI6MjAzMDkyNjQ4Nn0.rDdWANw1LN10BunTH8TKeIAfM-EMlWpTaNyxQSbe30k",
                Authorization: `Bearer ${dataLogin.access_token}`,
                 
            }
        });
        const avatarImage = await avatarResponse.blob();
        console.log(avatarImage);
        
        const avatarImageURL = URL.createObjectURL(avatarImage);

        document.querySelector('#avatar').src=avatarImageURL
        
    });

    const registerButton = document.querySelector('#registerButton');
    registerButton.addEventListener('click', async(event)=>{
        event.preventDefault();
        const datos = new FormData(document.querySelector('#login form'));
        console.log(JSON.stringify(Object.fromEntries(datos)));
        const body = JSON.stringify(Object.fromEntries(datos));
        const response = await fetch('https://ygvtpucoxveebizknhat.supabase.co/auth/v1/signup',{
            method: "POST",
            headers: {
                apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndnRwdWNveHZlZWJpemtuaGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNTA0ODYsImV4cCI6MjAzMDkyNjQ4Nn0.rDdWANw1LN10BunTH8TKeIAfM-EMlWpTaNyxQSbe30k",
                "Content-type": "application/json" 
            },
            body
        });
        const dataLogin = await response.json();
        console.log(dataLogin);        
    });
});