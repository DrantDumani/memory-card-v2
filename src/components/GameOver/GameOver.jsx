import "./GameOver.scss";

function GameOver({ score, handleRestart }) {
  return (
    <div className="game-over">
      <h2 className="game-over__heading">Game over! Your score was {score}</h2>
      <button className="game-over__btn" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
}

export default GameOver;
