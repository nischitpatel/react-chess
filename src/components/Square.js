import React from "react";

const pieceMap = {
    r: "♜",
    n: "♞",
    b: "♝",
    q: "♛",
    k: "♚",
    p: "♟",
    R: "♖",
    N: "♘",
    B: "♗",
    Q: "♕",
    K: "♔",
    P: "♙",
  };

const Square = ({ dark, piece, isSelected, isPossibleMove, isKingInCheck,onClick }) => {
    return (
        <div className={
                            `square 
                            ${dark ? "dark" : "light"} 
                            ${isSelected ? "selected" : ""} 
                            ${isPossibleMove ? "possible" : ""}
                            ${isKingInCheck ? "kingCheck" : ""}`
                        } onClick={onClick}>
            {piece && <span className="piece">{pieceMap[piece]}</span>}
        </div>
    );
};

export default Square;