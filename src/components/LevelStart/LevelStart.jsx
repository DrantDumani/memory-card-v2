import "./LevelStart.scss";

const messages = {
  start: ["Aim for a high score"],
  easy: ["Not bad!", "Pretty good!", "You're alright!"],
  med: [
    "Woah!",
    "You're still playing this?!",
    "You've got a photographic memory!",
    "The True Arena approaches...",
  ],
  hard: [
    "You've peaked!",
    "It doesn't get any harder than this!",
    "Lunatic mode?!",
    "This is 9.0 difficulty!",
  ],
};

function LevelStart({ level, handleStart }) {
  let msgBank = null;
  if (level === 1) msgBank = messages.start;
  else if (level < 10) msgBank = messages.easy;
  else if (level < 24) msgBank = messages.med;
  else msgBank = messages.hard;

  const gameMsg = msgBank[Math.floor(Math.random() * msgBank.length)];

  return (
    <div className="level-start">
      <h2 className="level-start__level">Level {level}</h2>
      <p className="level-start__gameMsg">{gameMsg}</p>

      <button className="level-start__btn" onClick={handleStart}>
        Start Level
      </button>
    </div>
  );
}

export default LevelStart;
