// aiHard.js
import { getSafeMoves, getPieceColor, isKingInCheck } from "./chessRules";

// Piece values for evaluation
const PIECE_VALUES = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 100
};

/**
 * Evaluate board for a color
 * Positive score means advantage for `color`
 */
const evaluateBoard = (board, color) => {
    let score = 0;
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (!piece) continue;
            const pieceColor = getPieceColor(piece);
            const value = PIECE_VALUES[piece.toLowerCase()] || 0;
            score += pieceColor === color ? value : -value;
        }
    }
    return score;
};

/**
 * Deep clone a board
 */
// const cloneBoard = (board) => board.map(r => [...r]);
const cloneBoard = (board) => board.map(row => row.map(cell => cell));


/**
 * Minimax algorithm with depth = 2 (hard AI)
 */
const minimax = (board, depth, maximizingPlayer, color, history) => {
    if (depth === 0) {
        return { score: evaluateBoard(board, color) };
    }

    const opponent = color === "white" ? "black" : "white";

    const moves = [];

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = board[r][c];
            if (!piece) continue;

            const pieceColor = getPieceColor(piece);
            if ((maximizingPlayer && pieceColor !== color) || (!maximizingPlayer && pieceColor !== opponent)) continue;

            let safeMoves = [];
            try {
                safeMoves = getSafeMoves(board, r, c, pieceColor, history);
            } catch (err) {
                continue; // skip any piece that throws error
            }
            if (!safeMoves || safeMoves.length === 0) continue;

            safeMoves.forEach(move => {
                moves.push({
                    fromRow: r,
                    fromCol: c,
                    toRow: move.row,
                    toCol: move.col
                });
            });
        }
    }

    if (moves.length === 0) {
        // checkmate or stalemate
        const score = isKingInCheck(board, maximizingPlayer ? color : opponent) ?
            (maximizingPlayer ? -1000 : 1000) : 0;
        return { score };
    }

    if (maximizingPlayer) {
        let maxEval = -Infinity;
        let bestMove = null;

        for (const move of moves) {
            const newBoard = cloneBoard(board);
            const movingPiece = newBoard[move.fromRow][move.fromCol];
            if (!movingPiece) continue;
            newBoard[move.toRow][move.toCol] = movingPiece;
            newBoard[move.fromRow][move.fromCol] = null;

            const newHistory = [...history, move];
            const evalScore = minimax(newBoard, depth - 1, false, color, newHistory).score;

            if (evalScore > maxEval) {
                maxEval = evalScore;
                bestMove = move;
            }
        }

        return { score: maxEval, move: bestMove };
    } else {
        let minEval = Infinity;
        let bestMove = null;

        for (const move of moves) {
            const newBoard = cloneBoard(board);
            const movingPiece = newBoard[move.fromRow][move.fromCol];
            newBoard[move.toRow][move.toCol] = movingPiece;
            newBoard[move.fromRow][move.fromCol] = null;

            const newHistory = [...history, move];
            const evalScore = minimax(newBoard, depth - 1, true, color, newHistory).score;

            if (evalScore < minEval) {
                minEval = evalScore;
                bestMove = move;
            }
        }

        return { score: minEval, move: bestMove };
    }
};

/**
 * Hard AI: Level 3
 * Uses minimax with depth = 2
 */
export const aiHardMove = (board, color, history) => {
    const result = minimax(board, 2, true, color, history);
    return result.move;
};
