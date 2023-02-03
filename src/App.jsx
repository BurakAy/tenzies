import "./App.css";
import Heading from "./components/Heading";
import Dice from "./components/Dice";
import RollButton from "./components/RollButton";
import Footer from "./components/Footer";
import gameDice from "./gameDice";
import { useState } from "react";

function App() {
  const [dice, setDice] = useState(loadDice());

  function loadDice() {
    const diceVals = [];
    for (let x = 0; x < 10; x++) {
      diceVals.push({
        id: x,
        rollNum: Math.ceil(Math.random() * 6),
        freezeNum: false,
      });
    }
    return diceVals;
  }

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

    checkWinner();
  };

  const checkWinner = () => {
    let matching = 1;
    dice.map((die, i) => {
      if (matching < 10 && die.rollNum === dice[0].rollNum && die.freezeNum) {
        matching++;
      }
      if (matching == 10) {
        console.log("WINNER!");
        matching = 1;

        setDice((prevVals) => {
          return prevVals.map((dieVals) => {
            return {
              ...dieVals,
              rollNum: Math.ceil(Math.random() * 6),
              freezeNum: false,
            };
          });
        });
      }
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
      <Footer />
    </main>
  );
}

export default App;
