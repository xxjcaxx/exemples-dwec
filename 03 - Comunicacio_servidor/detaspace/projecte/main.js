import './index.scss'

import * as bootstrap from 'bootstrap'
import { getMainTemplate } from './src/mainTemplate.js'

document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('#app').innerHTML = getMainTemplate();


  const SUPABASE_KEY = ""; //Poner tu API KEY, mejor si la importas de un fichero que esté en .gitignore
  let access_token = '';

  document.querySelector('#signupbtn').addEventListener('click', async () => {
    let signUpObject = {
      email: document.querySelector('#signupemail').value,
      password: document.querySelector('#signuppassword').value
    };
    let response = await fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/auth/v1/signup', {  // Cambiar por tu url
      method: 'post',
      headers: {
        "apiKey": SUPABASE_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpObject)
    });
    let data = await response.json();
    document.querySelector('#userInfo').innerHTML = JSON.stringify(data);
  });

  document.querySelector('#loginbutton').addEventListener('click', async () => {
    let signUpObject = {
      email: document.querySelector('#loginemail').value,
      password: document.querySelector('#loginpassword').value
    };
    let response = await fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/auth/v1/token?grant_type=password', {
      method: 'post',
      headers: {
        "apiKey": SUPABASE_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpObject)
    });
    let data = await response.json();
    document.querySelector('#userInfo').innerHTML = JSON.stringify(data);
    access_token = data.access_token;

  });



  document.querySelector('#pedirDatos').addEventListener('click', () => {
    fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/graphs', {    // En este ejemplo hay una tabla llamada graphs, cámbiala por la que tengas
      method: 'get',
      headers: {
        "apiKey": SUPABASE_KEY,
        "Authorization": "Bearer " + access_token
      }
    })
      .then(r => r.json())
      .then(d => {
        document.querySelector('#datosServidor').innerHTML = JSON.stringify(d);
        console.log(d);
      });
  });


});

