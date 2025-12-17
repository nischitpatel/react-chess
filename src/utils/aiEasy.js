import { getSafeMoves, getPieceColor } from "./chessRules";

export const getRandomAIMove = (board, color, history) => {
  const allMoves = [];

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (piece && getPieceColor(piece) === color) {
        const safeMoves = getSafeMoves(board, r, c, color, history);
        safeMoves.forEach(move => {
          allMoves.push({
            fromRow: r,
            fromCol: c,
            toRow: move.row,
            toCol: move.col,
            piece
          });
        });
      }
    }
  }

  if (allMoves.length === 0) return null;

  return allMoves[Math.floor(Math.random() * allMoves.length)];
};
