// // src/utils/chessRules.js

// /**
//  * Get piece color
//  * Uppercase = white, Lowercase = black
//  */
// export const getPieceColor = (piece) => {
//     if (!piece) return null;
//     return piece === piece.toUpperCase() ? "white" : "black";
//   };

//   /**
//    * Main function to get all legal moves for a piece
//    */
//   export const getLegalMoves = (board, row, col, turn, history = []) => {
//     const piece = board[row][col];
//     if (!piece) return [];

//     const color = getPieceColor(piece);
//     if (color !== turn) return [];

//     switch (piece.toLowerCase()) {
//       case "p": return getPawnMoves(board, row, col, color, history);
//       case "r": return getRookMoves(board, row, col, color);
//       case "n": return getKnightMoves(board, row, col, color);
//       case "b": return getBishopMoves(board, row, col, color);
//       case "q": return getQueenMoves(board, row, col, color);
//       case "k": return getKingMoves(board, row, col, color, history);
//       default: return [];
//     }
//   };

//   /**
//    * Pawn moves (forward, capture, double step from start)
//    * TODO: add en passant and promotion
//    */
//   export const getPawnMoves = (board, row, col, color, history) => {
//     const moves = [];
//     const dir = color === "white" ? -1 : 1;

//     // Forward 1
//     if (isEmpty(board, row + dir, col)) moves.push({ row: row + dir, col });

//     // Forward 2 from start
//     const startRow = color === "white" ? 6 : 1;
//     if (row === startRow && isEmpty(board, row + dir, col) && isEmpty(board, row + 2*dir, col))
//       moves.push({ row: row + 2*dir, col });

//     // Captures
//     for (const dc of [-1,1]) {
//       const c = col + dc;
//       if (c >= 0 && c < 8) {
//         const target = board[row + dir][c];
//         if (target && getPieceColor(target) !== color) {
//           moves.push({ row: row + dir, col: c });
//         }
//       }
//     }

//     // TODO: En passant
//     return moves;
//   };

//   /**
//    * Rook moves (straight lines)
//    */
//   export const getRookMoves = (board, row, col, color) => {
//     return getLinearMoves(board, row, col, color, [
//       [-1,0], [1,0], [0,-1], [0,1]
//     ]);
//   };

//   /**
//    * Bishop moves (diagonals)
//    */
//   export const getBishopMoves = (board, row, col, color) => {
//     return getLinearMoves(board, row, col, color, [
//       [-1,-1], [-1,1], [1,-1], [1,1]
//     ]);
//   };

//   /**
//    * Queen moves (rook + bishop)
//    */
//   export const getQueenMoves = (board, row, col, color) => {
//     return [
//       ...getRookMoves(board, row, col, color),
//       ...getBishopMoves(board, row, col, color)
//     ];
//   };

//   /**
//    * Knight moves (L-shaped)
//    */
//   export const getKnightMoves = (board, row, col, color) => {
//     const moves = [];
//     const jumps = [
//       [-2,-1], [-2,1], [2,-1], [2,1],
//       [-1,-2], [-1,2], [1,-2], [1,2]
//     ];
//     jumps.forEach(([dr, dc]) => {
//       const r = row + dr;
//       const c = col + dc;
//       if (r >=0 && r < 8 && c >=0 && c < 8) {
//         const target = board[r][c];
//         if (!target || getPieceColor(target) !== color) moves.push({ row: r, col: c });
//       }
//     });
//     return moves;
//   };

//   /**
//    * King moves (1 square any direction + castling)
//    */
//   export const getKingMoves = (board, row, col, color, history) => {
//     const moves = [];
//     const dirs = [
//       [-1,-1], [-1,0], [-1,1],
//       [0,-1],         [0,1],
//       [1,-1], [1,0], [1,1]
//     ];

//     dirs.forEach(([dr, dc]) => {
//       const r = row + dr;
//       const c = col + dc;
//       if (r >=0 && r < 8 && c >=0 && c < 8) {
//         const target = board[r][c];
//         if (!target || getPieceColor(target) !== color) moves.push({ row: r, col: c });
//       }
//     });

//     // TODO: Castling logic
//     return moves;
//   };

//   /**
//    * Helper: get linear moves in directions until blocked
//    */
//   const getLinearMoves = (board, row, col, color, directions) => {
//     const moves = [];

//     directions.forEach(([dr, dc]) => {
//       let r = row + dr;
//       let c = col + dc;

//       while (r >=0 && r < 8 && c >=0 && c < 8) {
//         const target = board[r][c];
//         if (!target) {
//           moves.push({ row: r, col: c });
//         } else {
//           if (getPieceColor(target) !== color) moves.push({ row: r, col: c });
//           break; // blocked
//         }
//         r += dr;
//         c += dc;
//       }
//     });

//     return moves;
//   };

//   /**
//    * Helper: check if square is empty
//    */
//   const isEmpty = (board, row, col) => {
//     if (row < 0 || row >= 8 || col < 0 || col >= 8) return false;
//     return !board[row][col];
//   };




// src/utils/chessRules.js

export const isInBounds = (row, col) => row >= 0 && row < 8 && col >= 0 && col < 8;

export const getPieceColor = (piece) => {
    if (!piece) return null;
    return piece === piece.toUpperCase() ? "white" : "black";
};

export const isEmpty = (board, row, col) => {
    if (!isInBounds(row, col)) return false;
    return !board[row][col];
};

// Linear moves helper for Rook/Bishop/Queen
const getLinearMoves = (board, row, col, color, directions) => {
    const moves = [];
    directions.forEach(([dr, dc]) => {
        let r = row + dr;
        let c = col + dc;
        // if (!isInBounds(r,c)) return;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const target = board[r][c];
            if (!target) moves.push({ row: r, col: c });
            else {
                if (getPieceColor(target) !== color) moves.push({ row: r, col: c });
                break;
            }
            r += dr;
            c += dc;
        }
    });
    return moves;
};

export const getSafeMoves = (board, row, col, color, history) => {
    const moves = getLegalMoves(board, row, col, color, history);
    const safeMoves = moves.filter(move => {
      const tempBoard = board.map(r => [...r]); // clone board
      // simulate move
      tempBoard[move.row][move.col] = tempBoard[row][col];
      tempBoard[row][col] = null;
      // king must not be in check after move
      return !isKingInCheck(tempBoard, color);
    });
    return safeMoves;
  };
  

// Main legal moves function
export const getLegalMoves = (board, row, col, turn, history = []) => {
    const piece = board[row][col];
    if (!piece) return [];
    if (getPieceColor(piece) !== turn) return [];

    switch (piece.toLowerCase()) {
        case "p": return getPawnMoves(board, row, col, turn, history);
        case "r": return getRookMoves(board, row, col, turn);
        case "n": return getKnightMoves(board, row, col, turn);
        case "b": return getBishopMoves(board, row, col, turn);
        case "q": return getQueenMoves(board, row, col, turn);
        case "k": return getKingMoves(board, row, col, turn, history);
        default: return [];
    }
};

/** ---------------- PIECE MOVE FUNCTIONS ---------------- **/

export const getPawnMoves = (board, row, col, color, history) => {
    const moves = [];
    const dir = color === "white" ? -1 : 1;

    // Forward 1
    if (isEmpty(board, row + dir, col)) moves.push({ row: row + dir, col });

    // Forward 2 from start
    const startRow = color === "white" ? 6 : 1;
    if (row === startRow && isEmpty(board, row + dir, col) && isEmpty(board, row + 2 * dir, col))
        moves.push({ row: row + 2 * dir, col });

    // Captures
    for (const dc of [-1, 1]) {
        const c = col + dc;
        const r = row + dir;
        if (!isInBounds(r,c)) continue;
        if (c >= 0 && c < 8) {
            const target = board[row + dir][c];
            if (target && getPieceColor(target) !== color) moves.push({ row: r, col: c });
        }
    }

    // En passant
    const lastMove = history[history.length - 1];
    if (
        lastMove &&
        lastMove.piece.toLowerCase() === "p" &&
        Math.abs(lastMove.fromRow - lastMove.toRow) === 2 &&
        lastMove.toRow === row &&
        Math.abs(lastMove.toCol - col) === 1
    ) {
        moves.push({ row: row + dir, col: lastMove.toCol });
    }

    return moves;
};

export const getRookMoves = (board, row, col, color) => {
    return getLinearMoves(board, row, col, color, [[-1, 0], [1, 0], [0, -1], [0, 1]]);
};

export const getBishopMoves = (board, row, col, color) => {
    return getLinearMoves(board, row, col, color, [[-1, -1], [-1, 1], [1, -1], [1, 1]]);
};

export const getQueenMoves = (board, row, col, color) => {
    return [
        ...getRookMoves(board, row, col, color),
        ...getBishopMoves(board, row, col, color)
    ];
};

export const getKnightMoves = (board, row, col, color) => {
    const moves = [];
    const jumps = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2]];
    jumps.forEach(([dr, dc]) => {
        const r = row + dr;
        const c = col + dc;
        if (!isInBounds(r,c)) return;
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const target = board[r][c];
            if (!target || getPieceColor(target) !== color) moves.push({ row: r, col: c });
        }
    });
    return moves;
};

export const getKingMoves = (board, row, col, color, history) => {
    const moves = [];
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    dirs.forEach(([dr, dc]) => {
        const r = row + dr;
        const c = col + dc;
        if (!isInBounds(r,c)) return;
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const target = board[r][c];
            if (!target || getPieceColor(target) !== color) moves.push({ row: r, col: c });
        }
    });

    // Castling
    if (!kingHasMoved(color, history)) {
        if (!rookHasMoved(color, 'h', history) && pathClearForCastling(board, row, col, 'kingside')) moves.push({ row, col: col + 2 });
        if (!rookHasMoved(color, 'a', history) && pathClearForCastling(board, row, col, 'queenside')) moves.push({ row, col: col - 2 });
    }

    return moves;
};

// Helper functions for castling
const kingHasMoved = (color, history) => history.some(m => m.piece.toLowerCase() === 'k' && getPieceColor(m.piece) === color);
const rookHasMoved = (color, side, history) => history.some(m => m.piece.toLowerCase() === 'r' && getPieceColor(m.piece) === color && (side === 'h' ? m.fromCol === 7 : m.fromCol === 0));
const pathClearForCastling = (board, row, col, side) => {
    if (side === 'kingside') return !board[row][col + 1] && !board[row][col + 2];
    else return !board[row][col - 1] && !board[row][col - 2] && !board[row][col - 3];
};

// Check detection
export const isKingInCheck = (board, color) => {
    let kingPos = null;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
        if (board[r][c] && board[r][c].toLowerCase() === 'k' && getPieceColor(board[r][c]) === color) kingPos = { row: r, col: c };
    }
    if (!kingPos) return true;

    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && getPieceColor(piece) !== color) {
            const moves = getLegalMoves(board, r, c, getPieceColor(piece), []);
            if (moves.some(m => m.row === kingPos.row && m.col === kingPos.col)) return true;
        }
    }
    return false;
};

// Helper: all legal moves for color
export const getAllMovesForColor = (board, color, history) => {
    const moves = [];
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
        const piece = board[r][c];
        if (piece && getPieceColor(piece) === color) {
            const legal = getLegalMoves(board, r, c, color, history);
            legal.forEach(m => moves.push({ from: { row: r, col: c }, to: m, piece }));
        }
    }
    return moves;
};
