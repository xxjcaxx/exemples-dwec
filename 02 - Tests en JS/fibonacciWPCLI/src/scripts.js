import './test.js';

// Primera versió 

export function fibonacci(n){
 return -1;
}

document.addEventListener("DOMContentLoaded", () => {
    let succesion = fibonacci(100);
    
    document.querySelector('#fibonacci').innerHTML = succesion;
  });
  