import { loginSupabase, signUpSupabase, logoutSupabase, updateData, createData, getData } from "./http.js";

export { loginUser, registerUser, logout,updateProfile };

async function loginUser(email, password) {
    let status = { success: false };
    try {
        let dataLogin = await loginSupabase(email, password);
        console.log(dataLogin);
        localStorage.setItem("access_token", dataLogin.access_token);
        localStorage.setItem("uid", dataLogin.user.id);
        localStorage.setItem("mail",dataLogin.user.email);


        let dataProfile = await getData(`profiles?id=eq.${dataLogin.user.id}`,dataLogin.access_token)
        dataProfile = dataProfile[0];
        localStorage.setItem('dataProfile',JSON.stringify(dataProfile));

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
            status.success = true;
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


function updateProfile(profile){

    let access_token = localStorage.getItem('access_token');
    let uid = localStorage.getItem('uid');

    updateData(`profiles?id=eq.${uid}&select=*`,access_token,profile);
   //createData('profiles',access_token,profile);

}