import {
  updateData, createData, getData, fileRequest, getFileRequest,
} from './http.js';

export {
  saveGame, getGame, updateGame, getAllGames, getAvailableGames
};

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bWhhbHd3d29ydHp1ZWN6bG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjYzMDIsImV4cCI6MjAxNDg0MjMwMn0.6t5wygarFGkpH3N3UjWYmEnoEdDeB2zsfgZevCl9VPo';

function saveGame(players, state) {
  const {
    player1, player2, player3, player4,
  } = players;
  const newGame = createData('games', SUPABASE_KEY, {
    player1, player2, player3, player4, game_state: state,
  });
  return newGame; // retorna la promesa
}

function updateGame(state, gameId) {
  updateData(`games?id=eq.${gameId}`, SUPABASE_KEY, { player1: Math.floor(Math.random() * 1000), game_state: state });
}

async function getGame(id) {
  const data = await getData(`games?id=eq.${id}&select=*`, SUPABASE_KEY);
  return data[0];
}

async function getAllGames(uid) {
  const data = await getData(`games?or=(player1.eq.${uid},player2.eq.${uid},player3.eq.${uid},player4.eq.${uid})&select=*`, SUPABASE_KEY);
  return data;
}

async function getAvailableGames(uid) {
  const data = await getData(`games?player1.neq.${uid}&select=*`, SUPABASE_KEY);
  return data;
}
