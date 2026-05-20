import { loadAttractionsDetails, attractionSubject} from '../../services/colombiapi.js';

export class AppContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    highlightAttractions(searchTerm) {
        const attractionItems = this.shadowRoot.querySelectorAll('.attraction-item');
      const normalizedSearchTerm = (searchTerm ?? '').toLowerCase().trim();

      if (normalizedSearchTerm.length < 3) {
        attractionItems.forEach(item => {
          item.classList.add('is-normal');
          item.classList.remove('is-highlighted');
        });
        return;
      }

        attractionItems.forEach(item => {
            const nameElement = item.querySelector('h3');
            const descriptionElement = item.querySelector('p');

        const nameMatches = nameElement.textContent.toLowerCase().includes(normalizedSearchTerm);
        const descriptionMatches = descriptionElement.textContent.toLowerCase().includes(normalizedSearchTerm);

            if (nameMatches || descriptionMatches) {
          item.classList.add('is-highlighted');
          item.classList.remove('is-normal');
            } else {
          item.classList.add('is-normal');
          item.classList.remove('is-highlighted');
            }
        });
    }


  
    connectedCallback() {
        attractionSubject.subscribe(attractions => this.render(attractions));
        loadAttractionsDetails();
        this.shadowRoot.addEventListener('click', (event) => {
           
            
            const attractionItem = event.target.closest('.attraction-item');
             console.log(attractionItem, event.target);
            if (!attractionItem) return;

            const departmentElement = attractionItem.querySelector('.department');
            if (departmentElement) {
                departmentElement.classList.toggle('hidden');
            }
        });
    }


    render(attractions) {
        console.log(attractions);
        
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            padding: 1.5rem;
            font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
          }

          .wrapper {
            max-width: 900px;
            margin: 0 auto;
          }

          h2 {
            margin: 0 0 1rem;
            color: #003893;
          }

          .attractions-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .attraction-item {
            padding: 1.2rem;
            border: 1px solid;
            border-radius: 0.75rem;
            color: #0f172a;
            box-shadow: 0 4px 12px rgba(0, 56, 147, 0.08);
          }

          .attraction-item.is-normal {
            border-color: #bfd7ff;
            background: #ffffff;
          }

          .attraction-item.is-highlighted {
            border-color: #fcd116;
            background: #fff6cc;
          }

          .department {
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 1px solid #e2e8f0;
          }

          .hidden {
            display: none;
          }

          .city {
          cursor: pointer;
    }
        </style>

        <section class="wrapper">
          <h2>Atracciones</h2>
          <ul class="attractions-list">
            ${attractions.map(a => `<li class="attraction-item is-normal">
                <img src="${a.images ? a.images[0]: ''}" alt="${a.name}" width="100%" height="auto" style="border-radius: 0.5rem; margin-bottom: 0.75rem;" />
                <h3>${a.name}</h3>
                <p>${a.description}</p>
                <p class="city"><strong>Ciudad: ${a.city.name}</strong></p>
                <div class="department hidden"><strong>Departamento: ${a.city?.department?.name}</strong>
                ${a.city?.department?.description ? `<p>${a.city.department.description}</p>` : ''}
                </div>
                
                
                </li>`).join('')}
          </ul>
        </section>
      `;
    }
}

customElements.define('colombia-content', AppContent);
