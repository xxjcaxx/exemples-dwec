export {getTable, register,login, patchTable, dowloadFile, uploadFile}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL; 
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;


async function getTable(table, params = {}) {
  const query = new URLSearchParams({ select: '*', ...params });
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${encodeURIComponent(table)}?${query}`, {
    headers: {
      apikey: SUPABASE_KEY,
    Authorization: `Bearer ${localStorage.getItem("token") || API_KEY}`,
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


async function login(loginData){
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "post",
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json"
    },
    body: loginData
  });
  if (!response.ok) {
    throw new Error(`Error Supabase ${response.status}: ${await response.text()}`);
  }
  const loginRespose = await response.json();
  localStorage.setItem("token", loginRespose.access_token);
  return loginRespose;
}

async function patchTable(table, id, data) {
  const query = new URLSearchParams({ id: `eq.${id}` });
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${encodeURIComponent(table)}?${query}`, {
    method: "PATCH",
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token") || API_KEY}`,
    },
    body: data
  });

  if (!response.ok) {
    throw new Error(`Error Supabase ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

async function dowloadFile(bucketName, filePath) {
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucketName}/${filePath}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${localStorage.getItem("token") || API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error Supabase ${response.status}: ${await response.text()}`);
  }
  return response.blob();
}

async function uploadFile(bucketName, filePath, file) {
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucketName}/${filePath}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${localStorage.getItem("token") || API_KEY}`,
    },
    body: file
  });

  if (!response.ok) {
    throw new Error(`Error Supabase ${response.status}: ${await response.text()}`);
  }
  return response.json();
}