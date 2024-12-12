import { compose } from "../functionals";
import { patchGoals } from "../services/supaservice";

export class CustomPlayer extends HTMLElement {
 
    constructor() {
      super();
    }
  
    connectedCallback() {
        const {player_image,player_name,nationality,age,position,"height(cm)":height,"weight(kg)":weight,goals} = this.data;
        this.innerHTML = `<div class="sticker">
          <img
            src="${player_image}"
            alt="${player_name}"
          />
          <h2>${player_name}</h2>
          <p>
          <span class="highlight">Nationality:</span>
          <span class="dotted-line"></span>
          <span class="value">${nationality}</span>
          </p>
          <p>
          <span class="highlight">Age:</span>
          <span class="dotted-line"></span>
          <span class="value"> ${age}</span>
          </p>
          <p><span class="highlight">Position:</span>
          <span class="dotted-line"></span>
           <span class="value">${position}</span>
          </p>
          <p><span class="highlight">Height:</span>
          <span class="dotted-line"></span>
          <span class="value"> ${height} cm</span>
          </p>
          <p><span class="highlight">Weight:</span>
          <span class="dotted-line"></span>
           <span class="value">${weight} kg</span>
          </p>
          
        </div>`;
        const stats = document.createElement('custom-playerstats');
        stats.data = goals;
        stats.data.team = this.data.id_team;
        this.querySelector('div').append(stats)
        

    }
  
  }
  
  export class CustomPlayerStats extends HTMLElement {
 
    constructor() {
      super();
    }
  
    connectedCallback() {
  
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
        <style>
        div.stats {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Espacio entre los elementos */
}

div.stats > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

span {
  flex: 1; /* Ocupa el espacio disponible */
  text-align: left; /* Alineación a la izquierda */
}

button {
  margin-left: 5px;
}

        </style>
        <div>
        
        <h4>Stats</h4>
<div class="stats">
    ${Object.keys(this.data)
      .filter(key => key !== "id_player") // Excluye id_player
      .filter(key => key !== "team") // Excluye team
      .map(key => `
        <div>
          <span>${key}: ${this.data[key]}</span>
          <button data-role="increment" data-key="${key}" data-idplayer="${this.data.id_player}">&#x2191;</button>
          <button data-role="decrement" data-key="${key}" data-idplayer="${this.data.id_player}">&#x2193;</button>
        </div>
      `).join('')}
  </div>
        </div>
        `


        shadow.addEventListener('click',async (event)=>{
          event.target.dataset
          if(event.target.dataset.idplayer){
            let value = this.data[event.target.dataset.key];
            value = event.target.dataset.role === 'increment' ? value+1 : value-1;
            this.data[event.target.dataset.key] = value;
            this.data.goals =   this.data.head +  this.data.other +  this.data.left_foot+  this.data.right_foot +  this.data.inside_area +  this.data.outside_area +  this.data.penalties_scored;
            const body = {goals:  this.data.goals};
            body[event.target.dataset.key] = value;
            await patchGoals(JSON.stringify(body),`id_player=eq.${event.target.dataset.idplayer}`);
            this.dispatchEvent(
              new CustomEvent("teamSelected", {
                bubbles: true,
                detail: {
                  team: this.data.team,
                },
              })
            );
          }
        });

    }
  
  }
  
