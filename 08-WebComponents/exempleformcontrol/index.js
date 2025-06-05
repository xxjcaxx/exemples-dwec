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
        if (this.#value !== String(v)) {
            this.#value = String(v);
            this.#update();    
        }
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
            this.setAttribute('disabled', 'true');
        } else {
            this.removeAttribute('disabled');
        }
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }

    set readOnly(v) {
        if (v) {
            this.setAttribute('readonly', 'true');
        } else {
            this.removeAttribute('readonly');
        }
    }
    get readOnly() {
        return this.hasAttribute('readonly');
    }

    get name() {
        return this.getAttribute('name') ?? '';
    }
    set name(v) {
        this.setAttribute('name', String(v));
    }
    
    connectedCallback() {
        this.contentEditable = true;  // Convertir el contenido en editable
        this.style.display = 'inline';
        this.#update();
    }

    static observedAttributes = ['value', 'disabled', 'readonly'];
    attributeChangedCallback() {
        this.#update();
    }


    #update() {
        this.style.display = 'inline';
        this.textContent = this.value;
        this.#internals.setFormValue(this.value);

        const isDisabled = this.#formDisabled || this.disabled;
        this.#internals.ariaDisabled = isDisabled;
        this.#internals.ariaReadOnly = this.readOnly;
        this.contentEditable = !this.readOnly && !isDisabled && 'plaintext-only';
        this.tabIndex = isDisabled ? -1 : 0;
    }

    handleEvent(e) {
        switch (e.type) {
            // respond to user input (typing, drag-and-drop, paste)
            case 'input':
                this.value = cleanTextContent(this.textContent);
                this.#shouldFireChange = true;
                break;
            // enter key should submit form instead of adding a new line
            case 'keydown':
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.#internals.form?.requestSubmit();
                }
                break;
            // prevent pasting rich text (firefox), or newlines (all browsers)
            case 'paste':
                e.preventDefault();
                const text = e.clipboardData.getData('text/plain')
                    // replace newlines and tabs with spaces
                    .replace(/[\n\r\t]+/g, ' ')
                    // limit length of pasted text to something reasonable
                    .substring(0, 1000);
                // shadowRoot.getSelection is non-standard, fallback to document in firefox
                // https://stackoverflow.com/a/70523247
                let selection = this.getRootNode()?.getSelection?.() || document.getSelection();
                let range = selection.getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(text));
                // manually trigger input event to restore default behavior
                this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
                break;
            // fire change event on blur
            case 'focusout':
                if (this.#shouldFireChange) {
                    this.#shouldFireChange = false;
                    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
                }
                break;
        }
    }


    formResetCallback() {
        this.#value = undefined;
        this.#update();
    }
    
    formDisabledCallback(disabled) {
        this.#formDisabled = disabled;
        this.#update();
    }
    
    formStateRestoreCallback(state) {
        this.#value = state ?? undefined;
        this.#update();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const submit = document.querySelector("#submit-form");
    const form = document.querySelector('form');
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const data = new FormData(form);

        console.log([...data]);
    });



    document.querySelector('#proves').addEventListener('click', 
        {
            name: 'Merlin',
            handleEvent (event) {
                console.log(`The ${event.type} happened on ${this.name}.`);
            }
        }
    );
});