let data = {
  numero: 20,
  setData(n) {
    console.log(n);
    this.numero = n;
    document.querySelector("#numero").value = this.numero;
    document.querySelector("#doble").value = this.numero * 2;
  },

  /// Manera de no tindre que implementar sempre els esdeveniments
  __numeroAutomatic__: 40,
  __dobleAutomatic__: 80,

  set numeroAutomatic(n) {
    this.__numeroAutomatic__ = n;
    this.setDataAutomatic(n * 2, "dobleAutomatic");
  },
  get numeroAutomatic() {
    return this.__numeroAutomatic__;
  },
  set dobleAutomatic(n) {
    this.__dobleAutomatic__ = n;
  },
  get dobleAutomatic() {
    return this.__dobleAutomatic__;
  },

  setDataAutomatic(n, variable) {
    this[variable] = n;
    const input = document.querySelector(`#${variable}`);
    input.value = this[variable];
    console.log(variable, this[variable]);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  data.setData(30);

  document.querySelector("#numero").addEventListener("keyup", function () {
    data.setData(this.value);
  });

  automatitzar(data);
});

function automatitzar(objecteData) {
  const inputs = document.querySelectorAll('input[value^="*"]'); //selector CSS diguent que comence per *
  inputs.forEach((i) => {
    const variable = i.value.slice(1);
    i.value = objecteData[variable];
    i.addEventListener("keyup", function () {
      objecteData.setDataAutomatic(i.value, variable);
    });
  });
}
