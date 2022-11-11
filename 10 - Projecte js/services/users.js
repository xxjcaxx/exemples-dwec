import { loginSupabase, signUpSupabase, logoutSupabase } from "./http.js";

export { loginUser, registerUser, logout };

async function loginUser(email, password) {
    let status = { success: false };
    try {
        let dataLogin = await loginSupabase(email, password);
        console.log(dataLogin);
        localStorage.setItem("access_token", dataLogin.access_token);
        status.success = true;
    }
    catch (err) {
        console.log(err);
        status.success = false;
        status.errorText = err.error_description;
    }

    return status;
}

function registerUser(email, password) {
    let status = { success: false };
    try {
        signUpSupabase(email, password).then(dataRegister => {
            console.log(dataRegister);
            success = true;
        })
    }
    catch (err) {
        console.log(err);
        status.success = false;
        status.errorText = err.error_description;
    }
    return status;
}

function logout() {
    logoutSupabase(localStorage.getItem('access_token')).then(lOData => {
        console.log(lOData);
        localStorage.removeItem('access_token');
    });

}


function updateProfile(profile){}