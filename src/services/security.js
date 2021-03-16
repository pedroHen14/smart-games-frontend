const GAME_KEY = "@game";

export const gameIn = (game) => {
  localStorage.setItem(GAME_KEY, JSON.stringify(game));
};
