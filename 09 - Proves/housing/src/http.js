export { testDescarga, getHousings };

const url = "https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/housing?select=*";
const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM";
const Authorization =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM";
const headers = { apikey, Authorization };
const PAGESIZE = 100;

async function testDescarga() {
  let response = await fetch(url, { method: "GET", headers: headers });
  let housing = await response.json();
  return housing;
}

const fetchJson = async (url, method, headers) => {
  return await (await fetch(url, { method, headers })).json();
};  

const getHousings = (page) =>
  fetchJson(url, "GET", { ...headers, Range: `${page}-${page + PAGESIZE}` });


