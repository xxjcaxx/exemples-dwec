import { CustomPlayer, CustomPlayerStats } from './playersComponent';
import { CustomTeamInfo, CustomTeams } from './teamsComponent';

export const componentsRegister = () => {
    customElements.define("custom-team", CustomTeams);
    customElements.define("custom-player", CustomPlayer);
    customElements.define("custom-team-info", CustomTeamInfo);
    customElements.define("custom-playerstats",CustomPlayerStats);
}