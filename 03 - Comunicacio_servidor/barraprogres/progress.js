document.addEventListener("DOMContentLoaded", () => {
 let progress = document.querySelector("#progress");
 progress.innerHTML = 0;
 let i = 0;
 function count() {
   // do a piece of the heavy job (*)
   do {
     i++;
     progress.innerHTML = i;
   } while (i % 1e3 != 0);

   if (i < 1e7) {     setTimeout(count);   }
 }
 setTimeout(count,0);  
});