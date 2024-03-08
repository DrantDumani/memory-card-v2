import { useState, useEffect } from "react";
import Game from "./components/Game/Game";
import dummyImg from "./assets/images/dummy.jpg";

const dummyStore = () => {
  const store = [];
  for (let i = 0; i < 250; i++) {
    const obj = { name: "dummy" + i, head: i, image: dummyImg };
    store.push(obj);
  }
  return store;
};

// utils

const shuffleArray = (arr) => {
  const copyArr = [...arr];
  for (let i = copyArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[rand]] = [copyArr[rand], copyArr[i]];
  }
  return copyArr;
};

const randomSubArray = (arr, len) => {
  const shuffle = shuffleArray(arr);
  return len >= shuffle.length ? shuffle : shuffle.slice(0, len);
};

const createLevel = (db, modifier) => {
  const len = 4 + (modifier - 1) * 2;
  return randomSubArray(db, len).map((info) => ({
    name: info.name,
    id: info.head,
    image: info.image,
    clicked: false,
  }));
};

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
        const data = await dummyStore();
        cache = randomSubArray(data, 100);
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
  };

  const pickCard = (id) => {
    const picked = cards.find((card) => card.id === id);
    if (picked.clicked) handleGameOver();
    else {
      updateScore();
      const newCards = cards.map((el) =>
        el.id === id ? { ...el, clicked: true } : el
      );
      if (newCards.every((el) => el.picked)) handleLevelComplete();
      else {
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
    const firstLevel = randomSubArray(cardStore, levelOne);

    setScore(0);
    setLevel(levelOne);
    setCards(firstLevel);
  };

  return (
    <>
      <header className="header">
        <h1 className="header__title">Miimory Cards</h1>
        <p className="header__credit-text">Created by Darnell</p>
      </header>

      <Game />

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
