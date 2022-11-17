export {loginSupabase, fileRequest, getFileRequest, signUpSupabase , logoutSupabase, recoverPasswordSupabase, getData, updateData, createData};

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"
const urlBase = "https://bqhnvwfovmcxrqrsmfxr.supabase.co";
const headers = {
    "apiKey": SUPABASE_KEY,
    "Content-Type": "application/json",
}; 



///////////
////////// Per a les peticions normals a dades de la base de dades 
//////////
async function supaRequest(url,method,headers,body){
    let response = await fetch(url,{
        method,
        headers,
        body: JSON.stringify(body)  // En cas d'enviar dades per post, put patch... 
    });
    if(response.status >=200 && response.status <=300){ // En cas d'error en el servidor
        if(response.headers.get("content-type")){ // Si retorna un JSON
            return await response.json();
        }
        return {}; // Si no contesta res no té content-type i cal retornar un objecte buit per a ser coherent en l'eixida.
    }
    else{
        return Promise.reject(await response.json()); // En cas de problemes en el servidor retornen un reject. 
    }
}


///////////
////////// Per a les peticions a coses del storage
////////// Cal un header diferent i tractar l'eixida de manera correcta.
//////////
async function fileRequest(url,body,token){
    const headersFile = {
        "apiKey": SUPABASE_KEY,
        "Authorization" :`Bearer ${token}`,
        "x-upsert": true  // Necessari per a sobreescriure
    }; 
    let response = await fetch(`${urlBase}${url}`,{
        method: 'POST',
        headers: headersFile,
        body
    });
    if(response.status >=200 && response.status <=300){
        if(response.headers.get("content-type")){
            let datos = await response.json(); // Retorna un json amb la ruta relativa. 
            datos.urlAvatar = `${urlBase}${url}`; // El que 
            return datos;
        }
        return {};
    }
    else{
        return Promise.reject(await response.json());
    }
}

async function getFileRequest(url,token){
    const headersFile = {
        "apiKey": SUPABASE_KEY,
        "Authorization" :`Bearer ${token}`,
    }; 
    let response = await fetch(`${url}`,{
        method: 'GET',
        headers: headersFile,
        
    });
    if(response.status >=200 && response.status <=300){
        if(response.headers.get("content-type")){
            let datos = await response.blob();
            return datos;
        }
        return {};
    }
    else{
        return Promise.reject(await response.json());
    }
}

async function loginSupabase(email,password){ 
    let url = `${urlBase}/auth/v1/token?grant_type=password`;
    let data = await supaRequest(url,'post',headers,{ email, password });
    return data;
}

async function signUpSupabase(email,password){ 
    let url = `${urlBase}/auth/v1/signup`;
    let data = await supaRequest(url,'post',headers,{ email, password });
    return data;
}

async function logoutSupabase(token){ 
    let url = `${urlBase}/auth/v1/logout`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let data = await supaRequest(url,'post',headersAux,{});
    return data;
}

async function recoverPasswordSupabase(email){
    let url = `${urlBase}/auth/v1/recover`;
    let headersAux = {...headers};
    let data = await supaRequest(url,'post',headersAux,{email});
    return data;
}

async function getData(URI,token){
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let data = await supaRequest(url,'get',headersAux);
    return data;
}

async function updateData(URI,token,data){
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, 
        "Authorization" :"Bearer "+token,
        "Prefer" : "return=representation"
    };
    let response = await supaRequest(url,'PATCH',headersAux,data);
    return response;
}

async function createData(URI,token,data){
    let url = `${urlBase}/rest/v1/${URI}`;
    let headersAux = {...headers, 
        "Authorization" :"Bearer "+token,
        "Prefer" : "return=representation"
    };
    let response = await supaRequest(url,'post',headersAux,data);
    return response;
}

