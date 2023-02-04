import "./App.css";
import Heading from "./components/Heading";
import GameStats from "./components/GameStats";
import Dice from "./components/Dice";
import RollButton from "./components/RollButton";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(loadDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [bestGame, setBestGame] = useState(loadGameData());

  useEffect(() => {
    const won = dice.every(
      (die) => die.rollNum === dice[0].rollNum && die.freezeNum
    );

    if (won) {
      setTenzies(true);
      if (rolls < bestGame || bestGame === "0") {
        setBestGame(rolls);
        localStorage.setItem("bestGame", rolls.toString());
      }
    }
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

  function loadGameData() {
    return localStorage.getItem("bestGame")
      ? localStorage.getItem("bestGame")
      : localStorage.setItem("bestGame", "0");
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

    setRolls((prevRoll) => (prevRoll += 1));
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
    setRolls(0);
  };

  return (
    <main className="App">
      {tenzies && <Confetti className="confetti" />}
      <Heading />
      <GameStats diceRolls={rolls} lowestRolls={bestGame} />
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
