export {getTable, register}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL; 
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;


async function getTable(table, params = {}) {
  const query = new URLSearchParams({ select: '*', ...params });
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${encodeURIComponent(table)}?${query}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error Supabase ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

async function register(registerData){
    
  const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "post",
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json"
    },
    body: registerData
  });

  if (!response.ok) {
    throw new Error(`Error Supabase ${response.status}: ${await response.text()}`);
  }
  return response.json();
  
}
