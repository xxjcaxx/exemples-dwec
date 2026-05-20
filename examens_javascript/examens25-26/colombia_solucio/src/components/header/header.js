export class AppHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		this.bindEvents();
	}

	bindEvents() {
		const searchInput = this.shadowRoot.querySelector('.search-input');

		searchInput.addEventListener('input', (event) => {
			this.dispatchEvent(
				new CustomEvent('search-change', {
					detail: { value: event.target.value },
					bubbles: true,
					composed: true,
				}),
			);
		});
	}

	render() {
		this.shadowRoot.innerHTML = `
			<style>
				:host {
					display: block;
					width: 100%;
					font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
					--colombia-yellow: #fcd116;
					--colombia-blue: #003893;
					--colombia-red: #ce1126;
					--colombia-ink: #0f172a;
					--colombia-surface: #fff9e6;
				}

				.navbar {
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 1rem;
					padding: 0.75rem 1rem;
					background: var(--colombia-blue);
					color: #ffffff;
					border-bottom: 4px solid var(--colombia-red);
				}

				.brand {
					margin: 0;
					font-size: 1rem;
					font-weight: 600;
					letter-spacing: 0.02em;
					color: var(--colombia-yellow);
				}

				.search-input {
					width: min(320px, 100%);
					border: 2px solid var(--colombia-yellow);
					border-radius: 0.5rem;
					padding: 0.5rem 0.75rem;
					font: inherit;
					color: var(--colombia-ink);
					background: var(--colombia-surface);
				}

				.search-input::placeholder {
					color: #64748b;
				}

				.search-input:focus {
					outline: 2px solid var(--colombia-red);
					outline-offset: 1px;
					border-color: var(--colombia-red);
				}
			</style>

			<nav class="navbar" aria-label="Navegación principal">
				<h1 class="brand">Turismo de Colombia</h1>
				<input
					class="search-input"
					type="search"
					placeholder="Buscar..."
					aria-label="Buscador"
				/>
			</nav>
		`;
	}
}

customElements.define('colombia-header', AppHeader);

