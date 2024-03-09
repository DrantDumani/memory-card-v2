import "./Game.scss";
import Card from "../Card/Card";

function Game({ level, cards, handleClick }) {
  return (
    <>
      <h2 className="game-level">Level {level}</h2>

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
