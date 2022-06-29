// Primera versió

export function fibonacci(n) {
  if (n == 0) return [0];
  if (n == 1) return [0, 1];
}

document.addEventListener("DOMContentLoaded", () => {
  let succesion = fibonacci(100);

  document.querySelector("#fibonacci").innerHTML = succesion;
});
