import { compose } from "../functionals";
export { getSupabase, getTeams, getPlayers, getGoals, fetchPatchTable, patchSupabase, patchGoals };

const url = `https://gxrbdmlipaqjuecbneoj.supabase.co/rest/v1/`;
const apikey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4cmJkbWxpcGFxanVlY2JuZW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4NzgxMTcsImV4cCI6MjA0ODQ1NDExN30.yE6fkV-mWrWGzJTVaqi8JpFuB7VlUJ40h_QkBHkpZj8`;
const headers = {
  apikey,
  Authorization: `Bearer ${apikey}`,
};

const fetchTable = (urlBase) => (fields)=> (search) => (table) =>
  fetch(`${urlBase}${table}?select=${fields}${search ? '&'+search : ''}`, {method:'GET', headers })
    .then(async (response) => {
      //console.log(response.ok);
      if (!response.ok) {
        console.log(`Server Error: ${JSON.stringify(await response.json())}`);
        return new Response("[]");
      }
      return response;
    })
    .catch((error) => {
      console.error(`Network error or other issue: ${error.message}`);
      return Promise.resolve(new Response("[]"));
    });


const fetchPatchTable = (urlBase) => (search) => (table) => (body) =>
      fetch(`${urlBase}${table}?${search}`, {method:'PATCH', headers: {...headers, "Content-Type": "application/json"} , body})
        .then(async (response) => {
          //console.log(response.ok);
          if (!response.ok) {
            console.log(`Server Error: ${JSON.stringify(await response.json())}`);
            return new Response("[]");
          }
          return response;
        })
        .catch((error) => {
          console.error(`Network error or other issue: ${error.message}`);
          return Promise.resolve(new Response("[]"));
        });

const json = (response) => response.json();

const fetchUrl = fetchTable(url);

const getSupabase =  (fields,table) => async (search) => {
  return compose(json, fetchUrl(fields)(search))(table);
};


const patchSupabase =  (table) => async (search,body) => {
  return fetchPatchTable(url)(search)(table)(body);
};


const getTeams = (fields) => getSupabase(fields,'teams');
const getPlayers =(fields) => getSupabase(fields,'players');
const getGoals =(fields) => getSupabase(fields,'goals');

const patchGoals=(body,search) => patchSupabase('goals')(search,body);