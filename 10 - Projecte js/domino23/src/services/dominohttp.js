import {
  updateData, createData, getData, fileRequest, getFileRequest,
} from './http.js';

export {
  saveGame, getGame, updateGame, getAllGames, getAvailableGames,
};

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bWhhbHd3d29ydHp1ZWN6bG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjYzMDIsImV4cCI6MjAxNDg0MjMwMn0.6t5wygarFGkpH3N3UjWYmEnoEdDeB2zsfgZevCl9VPo';

function saveGame(players, state) {
  let token = localStorage.getItem('access_token');
  const {
    player1, player2, player3, player4,
  } = players;
  const newGame = createData('games', token, {
    player1, player2, player3, player4, game_state: state,
  });
  return newGame; // retorna la promesa
}

function updateGame(state, gameId) {
  let token = localStorage.getItem('access_token');
  updateData(`games?id=eq.${gameId}`, token, { game_state: state });
}

async function getGame(id) {
  let token = localStorage.getItem('access_token');
  const data = await getData(`games?id=eq.${id}&select=*`, token);
  return data[0];
}

async function getAllGames(uid) {
  let token = localStorage.getItem('access_token');
  const data = await getData(`games?or=(player1.eq.${uid},player2.eq.${uid},player3.eq.${uid},player4.eq.${uid})&select=*`, token);
  return data;
}

async function getAvailableGames(uid) {
  let token = localStorage.getItem('access_token');
  let data = await getData('games?started.eq.false&select=*', token);
  data = data.filter((game) => game.player1 != uid && game.player1 != uid && game.player1 != uid && game.player1 != uid);
  return data;
}
