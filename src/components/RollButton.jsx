import "../styles/RollButton.css";

const RollButton = (props) => {
  return (
    <div className="button--container">
      <button className="button--roll" onClick={props.handleClick}>
        Roll
      </button>
    </div>
  );
};

export default RollButton;
