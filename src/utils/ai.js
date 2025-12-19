import { getRandomAIMove } from "./aiEasy";
import { aiMediumMove } from "./aiMedium";
import { aiHardMove } from "./aiHard";
import { getGmMove } from "./aiGm.js";

export async function getAIMove (board, color, history, level) {
  if (level === "easy") {
    return Promise.resolve(getRandomAIMove(board, color, history));
  }

  else if (level === "medium") {
    return Promise.resolve(aiMediumMove(board, color, history));
  }

  else if (level === "hard") {
    return Promise.resolve(aiHardMove(board, color, history));
  }

  else if (level === "grand-master") {
    return await getGmMove(board, color, history);
  }

  return null;
};
