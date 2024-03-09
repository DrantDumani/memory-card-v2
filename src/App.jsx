import { useState, useEffect } from "react";
import Game from "./components/Game/Game";
import LevelStart from "./components/LevelStart/LevelStart";
import GameOver from "./components/GameOver/GameOver";
import {
  randomSubArray,
  createLevel,
  shuffleArray,
} from "../utils/gameManager";
import "./App.scss";

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

  useEffect(() => {
    const savedScore = localStorage.getItem("hiScore");
    setHiScore(savedScore || 0);
  }, []);

  const updateScore = () => {
    setScore((s) => {
      const newScore = s + 1;
      if (newScore > hiScore) setHiScore(newScore);
      localStorage.setItem("hiScore", newScore);
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
        <p className="main__text">
          <span className="main__text--bold">Rules: </span>Click on a card, but
          don&apos;t click the same card twice per level.
        </p>
        <div className="main__score-flex">
          <p className="main__text main__text--flex-item">
            Your Score: {score}
          </p>
          <p className="main__text main__text--flex-item">
            High Score: {hiScore}
          </p>
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
          <a
            className="footer__link"
            href="https://github.com/DrantDumani/memory-card-v2"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              className="footer__svg"
              viewBox="0 0 128 128"
              aria-labelledby="title"
            >
              <title id="title" lang="en">
                Github repo
              </title>
              <g fill="#ffffff">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                ></path>
                <path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>
              </g>
            </svg>
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
