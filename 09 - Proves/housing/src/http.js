export { testDescarga, getHousings,registerUser,loginUser };

const url = "https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/housing?select=*";
const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM";
const anonAuthorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM";
const PAGESIZE = 100;

const getHeaders = () => ({
  apikey,
  Authorization: localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : anonAuthorization
})

async function testDescarga() {
  let response = await fetch(url, { method: "GET", headers: headers });
  let housing = await response.json();
  return housing;
}

const fetchJson = async (url, method, headers, body) => {

  let data = [];
  try{
    let response = await fetch(url, { method, headers , body });
    data = await response.json();
  }
  catch (e){
    throw e;
  }

  return data;

  //return await (await fetch(url, { method, headers , body })).json();
};  

const getHousings = (page) =>
  fetchJson(url, "GET", { ...getHeaders() , Range: `${page}-${page + PAGESIZE}` }).catch(e => { console.log(e); return [{Error: e}]});


const registerUser = (userData) => 
  fetchJson('https://bqhnvwfovmcxrqrsmfxr.supabase.co/auth/v1/signup',
            'POST',
            {apikey, "Content-Type": "application/json"},
            JSON.stringify(userData)
  )


const loginUser = async (userData) => {
  let userToken = await fetchJson('https://bqhnvwfovmcxrqrsmfxr.supabase.co/auth/v1/token?grant_type=password',
            'POST',
            {apikey, "Content-Type": "application/json"},
            JSON.stringify(userData)
        );

  localStorage.setItem('access_token',userToken.access_token);
  localStorage.setItem('expires_in',Math.floor(Date.now() / 1000)+userToken.expires_in);

  return userToken;

}