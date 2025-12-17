# React Chess Game

A fully interactive chess game built with **React**, featuring human vs AI play, multiple AI difficulty levels, and a responsive user interface. This project is designed for learning React concepts while building a complex and fun application.

---

## Features

- **Interactive Chessboard**
  - Drag-and-click style selection and movement
  - Highlight selected piece and possible moves
  - Highlight king when in check

- **Game Logic**
  - Legal move enforcement for all pieces (pawn, knight, bishop, rook, queen, king)
  - Special moves:
    - Castling
    - En passant
    - Pawn promotion
  - Check, checkmate, and stalemate detection
  - Move history tracking

- **AI Opponent**
  - **Easy**: Random moves
  - **Medium**: Heuristic-based AI considering piece safety
  - **Hard**: Minimax AI with 2-ply lookahead for strategic play
  - **Future**: Grandmaster-level AI using a trained model

- **User Interface**
  - Responsive design for desktop and mobile
  - Side panel for selecting AI difficulty and restarting the game
  - Real-time turn indicator (Human vs AI)

---

## Tech Stack

- **Frontend**: React, JavaScript, CSS
- **State Management**: React Hooks (`useState`, `useEffect`)
- **Game Logic**: Custom chess rules implemented in `chessRules.js`
- **AI Logic**: Separate modules for easy, medium, and hard AI (`ai.js`, `aiMedium.js`, `aiHard.js`)

---

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/nischitpatel/react-chess.git
cd react-chess

# Install dependencies
npm install
# or
yarn install

# Start development server
npm start
# or
yarn start
