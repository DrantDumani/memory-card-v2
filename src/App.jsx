import { useState, useEffect } from "react";
import Game from "./components/Game/Game";
import LevelStart from "./components/LevelStart/LevelStart";
import GameOver from "./components/GameOver/GameOver";
import {
  randomSubArray,
  createLevel,
  shuffleArray,
} from "../utils/gameManager";

function App() {
  const [cardStore, setCardStore] = useState([]);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [gameState, setGameState] = useState("levelStart");

  useEffect(() => {
    const getData = async () => {
      let cache = JSON.parse(sessionStorage.getItem("amiibo"));
      if (!cache || cache.length < 100) {
        const resp = await fetch(
          "https://amiiboapi.com/api/amiibo/?type=figure"
        );
        if (!resp.ok) throw new Error("Unable to retrieve data.");
        const data = await resp.json();
        cache = randomSubArray(data.amiibo, 100);
        sessionStorage.setItem("amiibo", JSON.stringify(cache));
      }
      setCardStore(cache);
      const levelOne = createLevel(cache, 1);
      setCards(levelOne);
    };

    getData();
  }, []);

  const updateScore = () => {
    setScore((s) => {
      const newScore = s + 1;
      if (newScore > hiScore) setHiScore(newScore);
      return newScore;
    });
  };

  const startLevel = () => {
    const newLevel = createLevel(cardStore, level);
    setCards(newLevel);
    setGameState("isPlaying");
  };

  const pickCard = (id) => {
    const picked = cards.find((card) => card.id === id);
    if (picked.clicked) handleGameOver();
    else {
      updateScore();
      const newCards = cards.map((el) =>
        el.id === id ? { ...el, clicked: true } : el
      );

      if (newCards.every((el) => el.clicked)) {
        setLevel((l) => l + 1);
        handleLevelComplete();
      } else {
        const shuffled = shuffleArray(newCards);
        setCards(shuffled);
      }
    }
  };

  const handleGameOver = () => {
    setGameState("gameOver");
  };

  const handleLevelComplete = () => {
    setGameState("levelStart");
  };

  const restartGame = () => {
    const levelOne = 1;
    const firstLevel = createLevel(cardStore, levelOne);

    setScore(0);
    setLevel(levelOne);
    setCards(firstLevel);
    setGameState("isPlaying");
  };

  const levelStart = gameState === "levelStart";
  const isPlaying = gameState === "isPlaying";
  const gameOver = gameState === "gameOver";

  return (
    <>
      <header className="header">
        <h1 className="header__title">Miimory Cards</h1>
        <p className="header__credit-text">Created by Darnell</p>
      </header>

      <main className="main">
        <div className="scoreboard">
          <p className="scoreboard__text">Current Score: {score}</p>
          <p className="scoreboard__text">High Score: {hiScore}</p>
        </div>

        {levelStart && <LevelStart level={level} handleStart={startLevel} />}
        {isPlaying && (
          <Game
            score={score}
            hiScore={hiScore}
            level={level}
            cards={cards}
            handleClick={pickCard}
          />
        )}
        {gameOver && <GameOver score={score} handleRestart={restartGame} />}
      </main>

      <footer className="footer">
        <p className="footer__text">
          Built with React and SCSS{" "}
          <a className="footer__link" href="#">
            Github Repo
          </a>
        </p>

        <p className="footer__text">
          All images were fetched via{" "}
          <a className="footer__link" href="https://amiiboapi.com/">
            Amiibo API
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
