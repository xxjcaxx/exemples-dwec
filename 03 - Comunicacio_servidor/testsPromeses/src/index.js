export {incrementar,decrementar,getData}

let state = 0;

const incrementar = async (stateCopy) => {
    const incrementPromise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            stateCopy++;
            resolve(stateCopy);
        },1000);
    });
    
    return incrementPromise;
}
const decrementar = async (stateCopy) => {
    const decrementPromise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            stateCopy--;
            resolve(stateCopy);
        },1000);
    });
    
    return decrementPromise;
}

const getData = async (file) => {
    try {
        let response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitut:', error);
        throw error; 
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const incrementarBtn = document.querySelector('#incrementar');
    const decrementarBtn = document.querySelector('#decrementar');

    const estatDiv = document.querySelector('#estat');



    incrementarBtn.addEventListener('click', async () => { state = await incrementar(state); estatDiv.innerHTML = state; });
    decrementarBtn.addEventListener('click', async () => { state = await decrementar(state); estatDiv.innerHTML = state; });
        // Què passa quan fem click molt ràpid? Cóm podem solucionar-ho?

    getData('dades.json').then((data)=> {
        console.log(data);
    });
})
