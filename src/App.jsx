import "./App.css";
import Heading from "./components/Heading";
import Dice from "./components/Dice";
import RollButton from "./components/RollButton";
import gameDice from "./gameDice";
import { useState } from "react";

function App() {
  const [dice, setDice] = useState(gameDice);

  const freezeDie = (dieId) => {
    setDice((prevVals) => {
      return prevVals.map((dieVals) => {
        if (dieVals.id == dieId) {
          return { ...dieVals, freezeNum: !dieVals.freezeNum };
        } else {
          return dieVals;
        }
      });
    });
  };

  const rollDice = () => {
    setDice((prevVals) => {
      return prevVals.map((dieVals) => {
        if (!dieVals.freezeNum) {
          return { ...dieVals, rollNum: Math.ceil(Math.random() * 6) };
        } else {
          return dieVals;
        }
      });
    });
  };

  return (
    <main className="App">
      <Heading />
      <Dice handleFreeze={freezeDie} dice={dice} />
      <RollButton handleClick={rollDice} />
    </main>
  );
}

export default App;
