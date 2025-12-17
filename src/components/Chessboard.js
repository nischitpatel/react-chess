import React, { useState, useEffect } from "react";
import { getSafeMoves, getPieceColor, isKingInCheck, getAllMovesForColor } from "../utils/chessRules";
import Square from "./Square";
import { getAIMove } from "../utils/ai";

const initialBoard = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

export default function ChessBoard() {
    const [board, setBoard] = useState(initialBoard);
    const [selected, setSelected] = useState(null);
    const [possibleMoves, setPossibleMoves] = useState([]);
    const [turn, setTurn] = useState("white");
    const [history, setHistory] = useState([]);
    const [kingInCheck, setKingInCheck] = useState(null);
    const [aiLevel, setAiLevel] = useState("easy");
    const AI_COLOR = "black";

    const resetGame = () => {
        setBoard(initialBoard());
        setTurn("white");
        setSelected(null);
        setPossibleMoves([]);
        setHistory([]);
        setKingInCheck(null);
      };
      

    const makeMove = (fromRow, fromCol, toRow, toCol) => {
        const newBoard = board.map(r => [...r]);
        let movingPiece = newBoard[fromRow][fromCol];
        const capturedPiece = newBoard[toRow][toCol];
      
        // Pawn promotion
        if (movingPiece.toLowerCase() === "p") {
          const promotionRow = movingPiece === "P" ? 0 : 7;
          if (toRow === promotionRow) {
            movingPiece = movingPiece === "P" ? "Q" : "q";
          }
        }
      
        newBoard[toRow][toCol] = movingPiece;
        newBoard[fromRow][fromCol] = null;
      
        setBoard(newBoard);
        setSelected(null);
        setPossibleMoves([]);
      
        const moveRecord = {
          fromRow,
          fromCol,
          toRow,
          toCol,
          piece: movingPiece,
          captured: capturedPiece
        };
      
        const newHistory = [...history, moveRecord];
        setHistory(newHistory);
      
        const opponent = turn === "white" ? "black" : "white";
      
        // Check / Checkmate / Stalemate
        let opponentMoves = [];
        for (let r = 0; r < 8; r++) {
          for (let c = 0; c < 8; c++) {
            const p = newBoard[r][c];
            if (p && getPieceColor(p) === opponent) {
              opponentMoves.push(
                ...getSafeMoves(newBoard, r, c, opponent, newHistory)
              );
            }
          }
        }
      
        // if (isKingInCheck(newBoard, opponent)) {
        //   setKingInCheck(opponent);
        //   if (opponentMoves.length === 0) {
        //     alert(`${turn} wins by checkmate!`);
        //     resetGame();
        //   }
        // } else {
        //   setKingInCheck(null);
        //   if (opponentMoves.length === 0) {
        //     alert("Draw by stalemate!");
        //   }
        // }

        if (isKingInCheck(newBoard, opponent)) {
            setKingInCheck(opponent);
          
            if (opponentMoves.length === 0) {
              setTimeout(() => {
                alert(`${turn} wins by checkmate!`);
                resetGame();
              }, 100);
              return;
            }
          } else {
            setKingInCheck(null);
          
            if (opponentMoves.length === 0) {
              setTimeout(() => {
                alert("Draw by stalemate!");
                resetGame();
              }, 100);
              return;
            }
          }
          
      
        setTurn(opponent);
      };
      

    useEffect(() => {
        if (!aiLevel) return;
        if (turn !== AI_COLOR) return;
      
        const aiMove = getAIMove(board, AI_COLOR, history, aiLevel);
        if (!aiMove) return;
      
        setTimeout(() => {
          makeMove(
            aiMove.fromRow,
            aiMove.fromCol,
            aiMove.toRow,
            aiMove.toCol
          );
        }, 500);
      }, [turn, board, aiLevel]);
      

    // const handleClick = (row, col) => {
    //     if (aiLevel && turn === AI_COLOR) return;

    //     const piece = board[row][col];

    //     // Select piece
    //     if (!selected) {
    //         if (!piece || getPieceColor(piece) !== turn) return;
    //         setSelected({ row, col });
    //         // setPossibleMoves(getLegalMoves(board, row, col, turn, history));
    //         setPossibleMoves(getSafeMoves(board, row, col, turn, history));
    //         return;
    //     }

    //     // Move
    //     const { row: fromRow, col: fromCol } = selected;
    //     const movingPiece = board[fromRow][fromCol];
    //     const valid = possibleMoves.some(m => m.row === row && m.col === col);
    //     if (!valid) { setSelected(null); setPossibleMoves([]); return; }

    //     // Pawn promotion
    //     let pieceToPlace = movingPiece;
    //     if (movingPiece.toLowerCase() === 'p' && (row === 0 || row === 7)) pieceToPlace = movingPiece === 'P' ? 'Q' : 'q';

    //     // Update board
    //     const newBoard = board.map(r => [...r]);
    //     newBoard[row][col] = pieceToPlace;
    //     newBoard[fromRow][fromCol] = null;
    //     setBoard(newBoard);

    //     // Update history
    //     setHistory([...history, { fromRow, fromCol, toRow: row, toCol: col, piece: pieceToPlace, captured: board[row][col] || null }]);

    //     setSelected(null);
    //     setPossibleMoves([]);
    //     setTurn(turn === 'white' ? 'black' : 'white');

    //     const opponent = turn === 'white' ? 'black' : 'white';

    //     let opponentMoves = [];
    //     for (let r = 0; r < 8; r++) {
    //         for (let c = 0; c < 8; c++) {
    //             const piece = newBoard[r][c];
    //             if (piece && getPieceColor(piece) === opponent) {
    //                 opponentMoves.push(
    //                     ...getSafeMoves(newBoard, r, c, opponent, [...history, { fromRow, fromCol, toRow: row, toCol: col, piece: pieceToPlace }])
    //                         .map(m => ({ from: { row: r, col: c }, to: m }))
    //                 );
    //             }
    //         }
    //     }

    //     if (isKingInCheck(newBoard, opponent)) {
    //         setKingInCheck(opponent);
    //         if (opponentMoves.length === 0) alert(`${turn} wins by checkmate!`);
    //         else console.log(opponent + " king is in check!");
    //     } else {
    //         setKingInCheck(null);
    //         if (opponentMoves.length === 0) alert("Draw by stalemate!");
    //     }

    // };
    const handleClick = (row, col) => {
        const piece = board[row][col];
      
        // prevent human playing during AI turn
        if (aiLevel && turn === AI_COLOR) return;
      
        // select piece
        if (!selected) {
          if (!piece || getPieceColor(piece) !== turn) return;
      
          const safeMoves = getSafeMoves(board, row, col, turn, history);
          if (safeMoves.length === 0) return;
      
          setSelected({ row, col });
          setPossibleMoves(safeMoves);
          return;
        }
      
        // move selected piece
        const isValid = possibleMoves.some(m => m.row === row && m.col === col);
        if (!isValid) {
          setSelected(null);
          setPossibleMoves([]);
          return;
        }
      
        makeMove(selected.row, selected.col, row, col);
      };
      

    return (
        <>
            <h2>Turn: {turn.charAt(0).toUpperCase() + turn.slice(1)}</h2>

            <div className="board">
                {board.map((rowArr, row) =>
                    rowArr.map((piece, col) => {
                        const isSelected = selected?.row === row && selected?.col === col;
                        const isPossible = possibleMoves.some(m => m.row === row && m.col === col);
                        const isKingCheck = kingInCheck && piece?.toLowerCase() === 'k' && getPieceColor(piece) === kingInCheck;
                        const dark = (row + col) % 2 === 1;
                        return <Square key={`${row}-${col}`} dark={dark} piece={piece} isSelected={isSelected} isPossibleMove={isPossible} isKingInCheck={isKingCheck} onClick={() => handleClick(row, col)} />;
                    })
                )}
            </div>

            <div style={{ marginBottom: 12 }}>
                <label>Play vs AI: </label>
                <select value={aiLevel} onChange={e => setAiLevel(e.target.value)}>
                    <option value={null}>Human vs Human</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
        </>
    );
}
