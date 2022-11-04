import {loginSupabase, signUpSupabase} from "./http.js";

export {loginUser,registerUser};

function loginUser(email,password){
    loginSupabase(email,password).then(dataLogin=>{
        console.log(dataLogin);
    })
}

function registerUser(email,password){
    signUpSupabase(email,password).then(dataRegister=>{
        console.log(dataRegister);
    })
}