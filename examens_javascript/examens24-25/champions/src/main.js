import { componentsRegister } from './components/componentsRegister';
import { compose, logInCompose } from './functionals';
import { getPlayers, getSupabase, getTeams } from './services/supaservice'
import './style.css';
import  {appendDivs,createCustomElement,createDivs,getAndAppend} from "./dom";


componentsRegister();



document.addEventListener("DOMContentLoaded",()=>{

    const playersDiv = document.querySelector('#players');
    playersDiv.innerHTML = '';

    getAndAppend({
        getTableFunction: getTeams('*'), 
        search: null, 
        tag: 'custom-team', 
        container: document.querySelector('#teams')
    });

    document.addEventListener('teamSelected',(event)=>{
        getAndAppend({
            getTableFunction: getTeams('*,players(*,goals(*))'), 
            search: `team_id=eq.${event.detail.team}`, 
            tag: 'custom-team-info', 
            container: document.querySelector('#team_info')
        });
  
    });


});


