import React from "react";
import Chessboard from "./components/Chessboard";
import Galaxy from "./components/GalaxyBG";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Galaxy/>
      <Chessboard/>
    </div>
  );
}

export default App;