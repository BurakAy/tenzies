import "./App.css";
import Heading from "./components/Heading";
import Dice from "./components/Dice";
import RollButton from "./components/RollButton";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(loadDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const won = dice.every(
      (die) => die.rollNum === dice[0].rollNum && die.freezeNum
    );

    won ? setTenzies(true) : "";
  }, [dice]);

  function loadDice() {
    const diceVals = [];
    for (let x = 0; x < 10; x++) {
      diceVals.push({
        id: nanoid(),
        rollNum: Math.ceil(Math.random() * 6),
        freezeNum: false,
      });
    }
    return diceVals;
  }

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

  const resetGame = () => {
    setDice(loadDice());
    setTenzies(false);
  };

  return (
    <main className="App">
      {tenzies && <Confetti className="confetti" />}
      <Heading />
      <Dice handleFreeze={freezeDie} dice={dice} />
      <RollButton
        handleClick={rollDice}
        handleReset={resetGame}
        won={tenzies}
      />
      <Footer />
    </main>
  );
}

export default App;
