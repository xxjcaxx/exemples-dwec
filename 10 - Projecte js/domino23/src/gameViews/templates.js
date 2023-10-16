export { getBoardTemplate };

const getBoardTemplate = () => {
  const template = `
<div id="player1" class="player"></div>
<div id="player2" class="player"></div>
<div id="player3" class="player"></div>
<div id="player4" class="player"></div>
<div id="board">
  <div class="tile"></div>
</div>
<button id="machine_step">Machine Step</button>
<div id="stats"></div>
<button id="pass">Pass</button>
<button id="new_game">New Game</button>
`;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;
  return wrapper.childNodes.values();
};

