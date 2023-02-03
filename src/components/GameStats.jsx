import "../styles/GameStats.css";

const GameStats = (props) => {
  return (
    <div className="gamestats--container">
      <div className="gamestats--wrapper">
        <p className="gamestats-best_game">Best Game: {props.lowestRolls}</p>
        <p className="gamestats--rolls">Rolls: {props.diceRolls}</p>
      </div>
    </div>
  );
};

export default GameStats;
