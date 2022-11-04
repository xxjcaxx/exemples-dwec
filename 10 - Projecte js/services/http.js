export {loginSupabase, signUpSupabase};

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
    let data = await response.json();
    return data
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

async function getData(URI){
    
}