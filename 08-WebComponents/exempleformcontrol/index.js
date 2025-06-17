const cssText = `
    :host {
    display: block;
    background: lightgray;

}

@layer {

    :host {
        --my-input-border-color: light-dark(rgb(118, 118, 118), rgb(161, 161, 161));
        --my-input-border-color-hover: light-dark(rgb(78, 78, 78), rgb(200, 200, 200));
        --my-input-border-color-disabled: rgba(150, 150, 150, 0.5);
        --my-input-text-color: light-dark(fieldtext, rgb(240, 240, 240));
        --my-input-text-color-disabled: light-dark(rgb(84, 84, 84), rgb(170, 170, 170));
        --my-input-bg-color: inherit;
        --my-input-bg-color-disabled: inherit;
        --my-input-min-width: 4ch;
    }

    div {
        display: block;
        background-color: var(--my-input-bg-color);
        color: var(--my-input-text-color);
        border: 1px dotted var(--my-input-border-color);
        padding: 2px 3px;
        margin-bottom: -2px;
        border-radius: 3px;

        &:focus-visible {
            border-color: transparent;
            outline-offset: 0;
            outline: 2px solid royalblue;
            /* firefox */
            outline-color: -webkit-focus-ring-color;
            /* the rest */
        }
    }



    div[disabled] {
        border-color: var(--my-input-border-color-disabled);
        background-color: var(--my-input-bg-color-disabled);
        color: var(--my-input-text-color-disabled);
        -webkit-user-select: none;
        user-select: none;
    }

    div:hover {
        border-color: var(--input-inline-border-color-hover);
    }


    div[readonly] {
        color: var(--my-input-text-color-disabled);
        background-color: var(--my-input-bg-color-disabled);
        border-color: var(--my-input-border-color-disabled);
        user-select: text;
        pointer-events: none;
        /* bloquea edición/clics */
        opacity: 0.6;
        /* opcional, efecto visual */
        cursor: default;
    }



    @media screen and (-webkit-min-device-pixel-ratio:0) {
        my-input:empty::before {
            /* fixes issue where empty my-input shifts left in chromium browsers */
            content: " ";
        }
    }

}
`;

function cleanTextContent(text) {
    return (text ?? '')
        // replace newlines and tabs with spaces
        .replace(/[\n\r\t]+/g, ' ');
}

customElements.define('my-input', class extends HTMLElement {
    static formAssociated = true;
    #internals;
    #shouldFireChange = false;
    #formDisabled = false;
    #value;
    #editable;

    constructor() {
        super();
        this.#internals = this.attachInternals();
        this.#internals.role = 'textbox';
        this.addEventListener('input', this);
        this.addEventListener('keydown', this);
        this.addEventListener('paste', this);
        this.addEventListener('focusout', this);
    }

    set value(v) {
        this.#value = String(v);

        this.#internals.setFormValue(this.#value);
    }

    get value() {
        return this.#value ?? this.defaultValue;
    }

    get defaultValue() {
        return this.getAttribute('value') ?? '';
    }
    set defaultValue(value) {
        this.setAttribute('value', String(value));
    }

    set disabled(v) {
        if (v) {
            this.#editable.setAttribute('disabled', 'true');
        } else {
            this.#editable.removeAttribute('disabled');
        }
        this.#update();
    }
    get disabled() {
        return this.#editable.hasAttribute('disabled');
    }

    set readOnly(v) {
        if (v) {
            this.#editable.setAttribute('readonly', 'true');
        } else {
            this.#editable.removeAttribute('readonly');
        }
        this.#update();
    }
    get readOnly() {
        return this.#editable.hasAttribute('readonly');
    }

    get name() {
        return this.getAttribute('name') ?? '';
    }
    set name(v) {
        this.setAttribute('name', String(v));
    }

    connectedCallback() {
        console.log('connected');


        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
        <div contenteditable="true"></div>
      `;
        this.#editable = shadow.querySelector('div');


        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(cssText);
        this.shadowRoot.adoptedStyleSheets = [styleSheet];

        this.#update();
    }

    static observedAttributes = ['value', 'disabled', 'readonly'];
    attributeChangedCallback() {
        console.log('attributeChangedCallback');
        if (!this.isConnected) return;
        this.#update();
    }


    #update() {
        console.log('update');

        this.#editable.textContent = this.value;
        this.#internals.setFormValue(this.value);

        const isDisabled = this.#formDisabled || this.disabled;
        this.#internals.ariaDisabled = isDisabled;
        this.#internals.ariaReadOnly = this.readOnly;
        this.#editable.contentEditable = !this.readOnly && !isDisabled && 'plaintext-only';
        this.tabIndex = isDisabled ? -1 : 0;
    }

    handleEvent(e) {
        switch (e.type) {
            // Cualquier cambio producido por el usuario.
            case 'input':

                this.value = cleanTextContent(this.#editable.textContent);  // Limpiamos y asignamos
                this.#shouldFireChange = true; // Los form control emiten un evento `change` 
                break;
            // Sólo para el intro, que pedirá al form ser enviado 
            case 'keydown':
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.#internals.form?.requestSubmit();
                }
                break;
            // Emitir el evento de cambio al cambiar el foco a otro elemento
            case 'focusout':
                if (this.#shouldFireChange) {
                    this.#shouldFireChange = false;
                    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
                }
                break;
        }
    }


    formResetCallback() {
        console.log('reset');
        this.#value = undefined;
        this.#update();
    }

    formDisabledCallback(disabled) {
        console.log('disbled');
        this.#formDisabled = disabled;
        this.disabled = disabled;

        this.#update();
    }

    formStateRestoreCallback(state) {
        console.log('restore');
        // Se ejecuta cuando se refresca, se autocompleta por el navegador o se restaura la pestaña
        // state: el valor que se había guardado (por ejemplo, un string, como en value)
        this.#value = state ?? undefined;
        this.#update();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const submit = document.querySelector("#submit-form");
    const form = document.querySelector('form');
    const input1 = document.querySelector('#myinput');
    const input2 = document.querySelector('#myinput2');



    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const data = new FormData(form);

        console.log(...data);
    });



    document.querySelector('#proves').addEventListener('click',
        {
            name: 'Merlin',
            handleEvent(event) {
                console.log(`The ${event.type} happened on ${this.name}.`);
            }
        }
    );

    document.querySelector('#disable1').addEventListener('click', (e) => {
        e.preventDefault();
        input1.disabled = !input1.disabled;
    });

    document.querySelector('#disable2').addEventListener('click', (e) => {
        e.preventDefault();
        input2.disabled = !input2.disabled;
    });


    document.querySelector('#disableall').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#my-inputs').disabled = !document.querySelector('#my-inputs').disabled;
    });

    document.querySelector('#readonly1').addEventListener('click', (e) => {
        e.preventDefault();
        input1.readOnly = !input1.readOnly;
    });

    document.querySelector('#readonly2').addEventListener('click', (e) => {
        e.preventDefault();
        input2.readOnly = !input2.readOnly;
    });


});