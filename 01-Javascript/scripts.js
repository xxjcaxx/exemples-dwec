document.addEventListener("DOMContentLoaded", () => {
    let progress = document.querySelector("#progress");
    let i = 0;
    function count() {
      // do a piece of the heavy job (*)
      do {
        i++;
        progress.innerHTML = i;
      } while (i % 1e1 != 0);
   
      if (i < 1e7) {     setTimeout(count);   }
    }
    count();
   });
   
