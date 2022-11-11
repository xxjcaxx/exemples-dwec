export {loginSupabase, signUpSupabase , logoutSupabase, getData, updateData, createData};

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"
const headers = {
    "apiKey": SUPABASE_KEY,
    "Content-Type": "application/json",
}; 

async function supaRequest(url,method,headers,body){
   // headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    let response = await fetch(url,{
        method,
        headers,
        body: JSON.stringify(body)
    });
    if(response.status >=200 && response.status <=300){
        if(response.headers.get("content-type")){
            return await response.json();
        }
        return {};
    }
    else{
        return Promise.reject(await response.json());
    }
    
    
}

async function loginSupabase(email,password){ 
    let url = 'https://bqhnvwfovmcxrqrsmfxr.supabase.co/auth/v1/token?grant_type=password';
    let data = await supaRequest(url,'post',headers,{ email, password });
    return data;
}

async function signUpSupabase(email,password){ 
    let url = 'https://bqhnvwfovmcxrqrsmfxr.supabase.co/auth/v1/signup';
    let data = await supaRequest(url,'post',headers,{ email, password });
    return data;
}

async function logoutSupabase(token){ 
    let url = 'https://bqhnvwfovmcxrqrsmfxr.supabase.co/auth/v1/logout';
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let data = await supaRequest(url,'post',headersAux,{});
    return data;
}

async function getData(URI,token){
    let url = `https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/${URI}`;
    let headersAux = {...headers, "Authorization" :"Bearer "+token};
    let data = await supaRequest(url,'get',headersAux);
    return data;
}

async function updateData(URI,token,data){
    let url = `https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/${URI}`;
    let headersAux = {...headers, 
        "Authorization" :"Bearer "+token,
        "Prefer" : "return=representation"
    };
    let response = await supaRequest(url,'PATCH',headersAux,data);
    return response;
}

async function createData(URI,token,data){
    let url = `https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/${URI}`;
    let headersAux = {...headers, 
        "Authorization" :"Bearer "+token,
        "Prefer" : "return=representation"
    };
    let response = await supaRequest(url,'post',headersAux,data);
    return response;
}

