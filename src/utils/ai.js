import { getRandomAIMove } from "./aiEasy";
import { aiMediumMove } from "./aiMedium";
import { aiHardMove } from "./aiHard";
// later:
// import { getGreedyAIMove } from "./aiMedium";
// import { getMinimaxAIMove } from "./aiHard";

export const getAIMove = (board, color, history, level) => {
  if (level === "easy") {
    return getRandomAIMove(board, color, history);
  }

  if (level === "medium") {
    // placeholder
    return aiMediumMove(board, color, history);
  }

  if (level === "hard") {
    // placeholder
    return aiHardMove(board, color, history);
  }

  return null;
};
