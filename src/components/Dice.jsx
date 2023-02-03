import "../styles/Dice.css";

const Dice = (props) => {
  const dice = props.dice.map((die) => {
    const styles = {
      backgroundColor: die.freezeNum ? "#59E391" : "#FFFFFF",
    };
    return (
      <div
        key={die.id}
        className="dice--die_wrapper"
        onClick={() => props.handleFreeze(die.id)}
        style={styles}
      >
        <p>{die.rollNum}</p>
      </div>
    );
  });
  return <div className="dice--container">{dice}</div>;
};

export default Dice;
