import "./Game.scss";
import { useState } from "react";
import Card from "../Card/Card";

function Game({ score, hiScore, level, cards, handleClick }) {
  return (
    <>
      <p className="main__rules">
        <span className="main__rules--bold">Rules: </span>Click on a card, but
        don&apos;t click the same card twice per level.
      </p>

      <div className="scoreboard">
        <p className="scoreboard__text">Current Score: {score}</p>
        <p className="scoreboard__text">High Score: {hiScore}</p>
      </div>

      <h2 className="main__level">Level {level}</h2>

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            title={card.name}
            key={card.id}
            imgLink={card.image}
            handleClick={() => handleClick(card.id)}
          />
        ))}
      </div>
    </>
  );
}

export default Game;
