import "../styles/RollButton.css";

const RollButton = (props) => {
  return (
    <div className="button--container">
      <button
        className="button--roll"
        onClick={props.won ? props.handleReset : props.handleClick}
      >
        {props.won ? "New Game" : "Roll"}
      </button>
    </div>
  );
};

export default RollButton;
