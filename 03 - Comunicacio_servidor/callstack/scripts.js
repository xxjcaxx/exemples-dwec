(function autoinvocada() {
  function mostrarConsola(msg) {
    console.log(msg);
  }

  document.addEventListener("DOMContentLoaded", function load() {
    let button = document.querySelector("#button");
    button.addEventListener("click", function click() {
      mostrarConsola("click");
    });
  });
})();

function first() {
  console.log(1);
}
function second() {
  setTimeout(() => {
    console.log(2);
  }, 0);
} // 0 segons
function third() {
  console.log(3);
}
first();
second();
third();
first();
first();
first();
first();
first();
