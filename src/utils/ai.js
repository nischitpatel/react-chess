import { getRandomAIMove } from "./aiEasy";
// later:
// import { getGreedyAIMove } from "./aiMedium";
// import { getMinimaxAIMove } from "./aiHard";

export const getAIMove = (board, color, history, level) => {
  if (level === "easy") {
    return getRandomAIMove(board, color, history);
  }

  if (level === "medium") {
    // placeholder
    return getRandomAIMove(board, color, history);
  }

  if (level === "hard") {
    // placeholder
    return getRandomAIMove(board, color, history);
  }

  return null;
};
