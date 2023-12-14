import * as domino from '../domino.js';
import { getBoardTemplate } from './templates.js';
import {
  getGame, saveGame, updateGame, updateGamePlayers, getAllGames, getAvailableGames,
} from '../services/dominohttp.js';
import { generateDominoCanvas } from './dominoCanvas.js';

export { drawPlayers, generateGame, generateGameList };

const getRotation = (players, uid) => 4 - players.findIndex((player) => player === uid);
const playerIsInGame = (players, uid) => players.indexOf(uid) >= 0;
const addPlayer = (players, uid) => {
  const playersCopy = [...players];
  playersCopy[players.indexOf(null)] = uid;
  return playersCopy;
};

const generatePlayerDiv = (playerTiles, position) => {
  const tiles = playerTiles.map((tile) => `
  <span id="tile-${tile}">${domino.getTile(domino.allTiles, tile, position)}</span>
  `).join('');
  const div = document.createElement('div');
  div.innerHTML = tiles;
  return div;
};

const generateBoardDiv = (board) => {
  const tiles = board.map((tile, idx) => `<span id="board-${tile.tile}" data-board_index = "${idx}" class="board-tile-${tile.position}"> 
                                            ${tile.tileFigure}</span>`).join('');
  const div = document.createElement('div');
  // div.innerHTML = tiles;

  const dominoCanvas = generateDominoCanvas(board, { width: 450, height: 400 });
  div.append(dominoCanvas);
  return div;
};

const drawPlayers = (container, state, players) => {
  // const container = document.createElement('div');
  // container.append(...getBoardTemplate());
  container.innerHTML = '';
  container.append(...getBoardTemplate());
  const rotation = getRotation(players, localStorage.getItem('uid'));
  const rotatedState = domino.rotateGame(state, rotation);
  container.querySelector('#mainPlayer').append(generatePlayerDiv(rotatedState.playersTiles[1], 'vertical'));
  container.querySelector('#playerLeft').append(generatePlayerDiv(Array(rotatedState.playersTiles[2].length).fill('99'), 'horizontal'));
  container.querySelector('#playerTop').append(generatePlayerDiv(Array(rotatedState.playersTiles[3].length).fill('99'), 'vertical'));
  container.querySelector('#playerRight').append(generatePlayerDiv(Array(rotatedState.playersTiles[4].length).fill('99'), 'horizontal'));
  container.querySelector('#board').append(generateBoardDiv(state.board));
  container.querySelector(`#${['mainPlayer', 'playerLeft', 'playerTop', 'playerRight'][rotatedState.turn - 1]}`).classList.add('turn');

  container.querySelector('#stats').innerHTML = `Turn: Player ${state.turn} Winner: ${state.winner} Points: ${state.points}`;

  container.querySelector('#mainPlayer').addEventListener('click', async (e) => {
    const tileClicked = e.target.id.split('-')[1];
    if (tileClicked && rotatedState.turn === 1) {
      if (state.board.length === 0) {
        state = domino.moveToBoard(state.turn, tileClicked, 'first', 'vertical', state);
        state = domino.changeTurn(state);
        await updateGame(state, localStorage.getItem('gameId'));
        window.location.hash = `#/game?id=${localStorage.getItem('gameId')}&random=${Math.floor(Math.random() * 1000)}`;
      } else {
        state = domino.changeTileChoosen(tileClicked, state);
        await updateGame(state, localStorage.getItem('gameId'));
        window.location.hash = `#/game?id=${localStorage.getItem('gameId')}&random=${Math.floor(Math.random() * 1000)}`;
      }
    }
  });

  container.querySelector('#board').addEventListener('click', async (e) => {
    const tileClicked = e.target.id.split('-')[1];
    const tileIdx = parseInt(e.target.dataset.board_index, 10);

    if (tileClicked) {
      if (state.tileChoosen) {
        const canMove = domino.canFollowBoard(state.board, state.tileChoosen, tileIdx);
        if (canMove) {
          const location = tileIdx === 0 ? 'before' : 'after';
          state = domino.moveToBoard(state.turn, state.tileChoosen, location, 'vertical', state);
          state = domino.changeTurn(state);
          state = domino.changeTileChoosen(null, state);

          await updateGame(state, localStorage.getItem('gameId'));

          window.location.hash = `#/game?id=${localStorage.getItem('gameId')}&random=${Math.floor(Math.random() * 1000)}`;
        }
      }
    }
  });

  container.querySelector('#machine_step').addEventListener('click', async (e) => {
    state = domino.doMachineStep(state);
    state = domino.changeTurn(state);
    await updateGame(state, localStorage.getItem('gameId'));
    window.location.hash = `#/game?id=${localStorage.getItem('gameId')}&random=${Math.floor(Math.random() * 1000)}`;
  });

  container.querySelector('#new_game').addEventListener('click', async (e) => {
    state = domino.calculateWinner(state);
    state = domino.restartGame(state);
    state = domino.getFirstPlayer(state);
    await updateGame(state, localStorage.getItem('gameId'));
    window.location.hash = `#/game?id=${localStorage.getItem('gameId')}&random=${Math.floor(Math.random() * 1000)}`;
  });

  container.querySelector('#pass').addEventListener('click', async (e) => {
    state = domino.changeTurn(state);
    await updateGame(state, localStorage.getItem('gameId'));
    window.location.hash = `#/game?id=${localStorage.getItem('gameId')}&random=${Math.floor(Math.random() * 1000)}`;
  });

  return container.childNodes.values();
};

const generateGame = (container, gameId) => {
  container.innerHTML = '';
  container.append(...getBoardTemplate());
  let currentTurn = 0;

  const getAndDrawGame = () => {
    getGame(gameId).then(({ game_state: state, players }) => {
      const uid = localStorage.getItem('uid');

      // console.log(state);
      localStorage.setItem('gameId', gameId);
      if (!playerIsInGame(players, uid)) {
        players = addPlayer(players, uid);
        updateGamePlayers(players, gameId);
      }

      if (currentTurn !== state.turn) {
        domino.logBoard(state);
        domino.logPlayers(state);
        drawPlayers(container, state, players);
        currentTurn = state.turn;
      }
    });
  };

  getAndDrawGame();

  setInterval(() => {
    getAndDrawGame();
  }, 1000);

  return container;
};

const generateGameList = () => {
  const generateTable = (games) => {
    const gameListTable = document.createElement('table');
    gameListTable.classList.add('table');
    console.log(games);
    gameListTable.innerHTML = games.map((g) => { 
      console.log(g.players);
      return `<tr>
        <td>${g.id}</td>
        <td>${g.players[0] ? g.players[0].full_name : ''}</td>
        <td>${g.players[1] ? g.players[1].full_name : ''}</td>
        <td>${g.players[2] ? g.players[2].full_name : ''}</td>
        <td>${g.players[3] ? g.players[3].full_name : ''}</td><td><button class="btn btn-primary" id="play_${g.id}">Play</button></td>
      </tr>`; }).join('');
    gameListTable.addEventListener('click', (event) => {
      const button = event.target;
      if (button.tagName === 'BUTTON') {
        const gameId = button.id.split('_')[1];
        window.location.hash = `#/game?id=${gameId}`;
      }
    });
    return gameListTable;
  };

  const userId = localStorage.getItem('uid');

  const gameListDiv = document.createElement('div');
  gameListDiv.classList.add('yourgamesdiv');
  const gameListTable = document.createElement('div');
  gameListTable.innerHTML = '<h2>Your Games</h2>';
  const gameAvailableTable = document.createElement('div');
  gameAvailableTable.innerHTML = '<h2>Available Games</h2>';
  const newGamePlayersInput = document.createElement('input');
  newGamePlayersInput.placeholder = 'Players (2-4)';
  const newGameButton = document.createElement('button');
  newGameButton.innerHTML = 'New Game';
  newGameButton.addEventListener('click', async () => {
    const nPlayers = newGamePlayersInput.value ? parseInt(newGamePlayersInput.value) : 4;
    const createdGame = await saveGame(
      { player1: userId },
      domino.getFirstPlayer(domino.startGame(nPlayers, domino.gameState())),
    );
    window.location.hash = `#/game?id=${createdGame[0].id}`;
  });
  gameListDiv.append(gameListTable, newGamePlayersInput, newGameButton, gameAvailableTable);

  if (userId) {
    getAllGames(userId).then((games) => gameListTable.append(generateTable(games)));
    getAvailableGames(userId).then((games) => gameAvailableTable.append(generateTable(games)));
  }

  return gameListDiv;
};
