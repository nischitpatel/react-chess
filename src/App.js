import React from "react";
import Chessboard from "./components/Chessboard";
import Galaxy from "./components/GalaxyBG";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Galaxy />
      <h1 className="chess-title">
        Play Chess with Nischit's AI ♟️
      </h1>
      <Chessboard />
    </div>
  );
}

export default App;