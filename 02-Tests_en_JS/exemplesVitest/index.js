import { sum } from "./sum";

export const numeric = (a, b) => typeof a === "number" && typeof b === "number" ? a + b : NaN;

export const arrays = (a, b) => [
    ...(Array.isArray(a) ? a : (a != null ? [a] : [])),
    ...(Array.isArray(b) ? b : (b != null ? [b] : []))
];

export const objectes = (a, b) => ({ a, b });

export const promeses = (a, b) => ([Promise.resolve(a), Promise.resolve(b)]);

export const promeses2 = (a, b) => ([
    new Promise(resolve => {
        Math.random() > 0.5 && resolve(a)
    }),
    new Promise(resolve => {
        Math.random() > 0.5 && resolve(b)
    })
]);

export const promeses3 = (a, b) => ([
    new Promise((resolve, reject) => {
        Math.random() > 0.5 && resolve(a) || reject(new Error(a))
    }),
    new Promise((resolve, reject) => {
        Math.random() > 0.5 && resolve(b) || reject(new Error(b))

    })
]);


export const server = async (url) => {
    try {
        const result = await fetch(url);
        if(!result.ok){
            throw new Error(result.statusText)
        }
        const data = await result.json();
        return data
    }
    catch (error) {
       throw error
    }
}


export const serverPost = (url) => async (data) => { 
    try{
        const result = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!result.ok){
            throw new Error(result.statusText)
        }
        const dataResponse = await result.json();
        return dataResponse
    }
    catch(error){
        throw error
    }
}
export const serverImage = async (url) => { 
    try{
        const result = await fetch(url);
        if(!result.ok){
            console.log(result.statusText);
            
            throw new Error(result.statusText)
        }
        const dataResponse = await result.blob();
        const src = URL.createObjectURL(dataResponse);
        return src
    }
    catch(error){
        throw error
    }
}

export const callback = (callback) => { 
    return callback();
}



export const spyFunctions = (data,callback) => { 
    const max = Math.max(...data);
    const min = Math.min(...data);
    const suma = sum(...data);
    return callback(max,min,suma);

}

export const domDiv = (content) => { 
    const div = document.createElement('div');
    div.innerHTML = content;
    return div;
}
export const domEventListener = (div) => (handler) => { 
    div.addEventListener('click', handler);
    return () => div.removeEventListener('click', handler);
}
export const domEventEmit = (div) => (eventName) => (details) => { 
    const event = new CustomEvent(eventName, { detail: details });
    div.dispatchEvent(event);
}




////////////// CRUD COMPLET


export const getUsers = async () => {
  const response = await fetch("/api/users");
  if (!response.ok) throw new Error("Error en GET");
  return await response.json();
};

export const addUser = async (user) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error("Error en POST");
  return await response.json();
};

export const updateUser = async (id, updates) => {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Error en PUT");
  return await response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error en DELETE");
  return true;
};
