import "./Game.scss";
import { useState } from "react";

function Game() {
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [gameState, setGameState] = useState("levelStart");
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState([]);

  return (
    <main className="main">
      <p className="main__rules">
        <span className="main__rules--bold">Rules: </span>Click on a card, but
        don&apos;t click the same card twice per level.
      </p>

      <div className="scoreboard">
        <p className="scoreboard__text">Current Score: {score}</p>
        <p className="scoreboard__text">High Score: {hiScore}</p>
      </div>

      <h2 className="main__level">Level {level}</h2>
    </main>
  );
}

export default Game;
