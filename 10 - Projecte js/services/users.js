import {loginSupabase, signUpSupabase} from "./http.js";

export {loginUser,registerUser, logout};

async function loginUser(email,password){
    loginSupabase(email,password).then(dataLogin=>{
        console.log(dataLogin);
        localStorage.setItem("access_token",dataLogin.access_token)
    })
}

function registerUser(email,password){
    signUpSupabase(email,password).then(dataRegister=>{
        console.log(dataRegister);
    })
}

function logout(){
    localStorage.removeItem('access_token');
}