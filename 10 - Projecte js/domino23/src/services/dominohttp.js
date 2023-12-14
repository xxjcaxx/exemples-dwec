import {
  updateData, createData, getData, fileRequest, getFileRequest,
} from './http.js';

export {
  saveGame, getGame, updateGame, updateGamePlayers, getAllGames, getAvailableGames,
};

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bWhhbHd3d29ydHp1ZWN6bG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjYzMDIsImV4cCI6MjAxNDg0MjMwMn0.6t5wygarFGkpH3N3UjWYmEnoEdDeB2zsfgZevCl9VPo';

function saveGame(players, state) {
  const token = localStorage.getItem('access_token');
  const {
    player1, player2, player3, player4,
  } = players;
  const newGame = createData('games', token, {
    players: [player1, player2, player3, player4],
    player1,
    player2,
    player3,
    player4,
    game_state: state,
  });
  return newGame; // retorna la promesa
}

async function updateGame(state, gameId) {
  const token = localStorage.getItem('access_token');
  await updateData(`games?id=eq.${gameId}`, token, { game_state: state });
}

async function updateGamePlayers(players, gameId) {
  const token = localStorage.getItem('access_token');
  await updateData(`games?id=eq.${gameId}`, token, { players });
}

async function getGame(id) {
  const token = localStorage.getItem('access_token');
  const data = await getData(`games?id=eq.${id}&select=*`, token);
  return data[0];
}

async function getAllGames(uid) {
  const token = localStorage.getItem('access_token');
  let data = await getData(`games?or=(player1.eq.${uid},player2.eq.${uid},player3.eq.${uid},player4.eq.${uid})&select=*`, token);
  const players = [...new Set(data.map((game) => game.players)
    .flat().filter((p) => p))].map((player) => getData(`profiles?id=eq.${player}&select=*`, token));
  const playersProfiles = Object.fromEntries((await Promise.all(players)).flat().map((p) => [p.id, p]));
  // console.log(playersProfiles);
  data = data.map(game => {
    let players = game.players.map(p => playersProfiles[p]);
    game.players = players;
    return game;
  });
 // console.log(data);
  return data;
}

async function getAvailableGames(uid) {
  const token = localStorage.getItem('access_token');
  let data = await getData('games?started.eq.false&select=*', token);
  data = data.filter((game) => game.player1 != uid && game.player1 != uid && game.player1 != uid && game.player1 != uid);
  return data;
}
