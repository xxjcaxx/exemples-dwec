class HelloWorldComponent extends HTMLElement {
  constructor() {
    super();
    console.log("Constructor");
  }

  connectedCallback() {
    console.log("Custom element added to page.");
    this.innerHTML = "<h1>Hola</h1>";
    const shadow = this.attachShadow({ mode: "closed" });
    const span = document.createElement("span");
    span.textContent = "I'm in the shadow DOM";
    shadow.appendChild(span);
    console.log(this.getAttribute('dato'));
    
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute ${name} has changed from ${oldValue} to ${newValue}.`
    );
  }
}

customElements.define("x-hello-world", HelloWorldComponent);

document.addEventListener("DOMContentLoaded", () => {
  const helloWorld = document.createElement("x-hello-world");
  helloWorld.setAttribute('dato',1000);
  document.querySelector("#container").append(helloWorld);
});
