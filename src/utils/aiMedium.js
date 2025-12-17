// aiMedium.js
import { getSafeMoves } from "./chessRules";

/**
 * Returns numeric value for a piece for prioritizing captures
 * @param {string} piece - chess piece character
 * @returns {number}
 */
export const getPieceValue = (piece) => {
  if (!piece) return 0;
  const p = piece.toLowerCase();
  switch (p) {
    case "p": return 1;
    case "n":
    case "b": return 3;
    case "r": return 5;
    case "q": return 9;
    case "k": return 100; // King has high value to prioritize capture logic (AI won't capture king directly)
    default: return 0;
  }
};

/**
 * Medium AI: Level 2
 * 1-ply lookahead: prefers captures, avoids moving into check
 *
 * @param {array} board - current board state
 * @param {string} color - 'white' or 'black'
 * @param {array} history - move history array
 * @returns {object|null} {fromRow, fromCol, toRow, toCol} or null if no move
 */
export const aiMediumMove = (board, color, history) => {
  const moves = [];

  // Generate all safe moves
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (!piece) continue;

      // Skip opponent's pieces
      if ((color === "white" && piece === piece.toLowerCase()) || 
          (color === "black" && piece === piece.toUpperCase())) continue;

      // Get all safe moves for this piece
      const safeMoves = getSafeMoves(board, row, col, color, history);

      safeMoves.forEach(move => {
        moves.push({
          fromRow: row,
          fromCol: col,
          toRow: move.row,
          toCol: move.col,
          captured: board[move.row][move.col] || null,
        });
      });
    }
  }

  if (moves.length === 0) return null; // No legal moves available

  // PRIORITIZE CAPTURES
  const captureMoves = moves.filter(m => m.captured !== null);

  if (captureMoves.length > 0) {
    // Pick the capture that takes the highest-value piece
    captureMoves.sort((a, b) => {
      const valA = getPieceValue(a.captured);
      const valB = getPieceValue(b.captured);
      return valB - valA; // descending
    });
    return captureMoves[0];
  }

  // Otherwise, pick a random safe move
  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  return randomMove;
};
