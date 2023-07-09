import "./App.css";
import Die from "./components/Die";
import Winner from "./components/Winner";
import { useState, useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

function formatTimeDifference(difference) {
  difference = difference/1000;
  const seconds = difference % 60;
  difference = Math.floor(difference / 60);
  const minutes = difference % 60;
  difference = Math.floor(difference / 60);
  const hours = difference % 24;

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(value, length = 2) {
  value = value.toString();
  while (value.length < length) {
    value = "0" + value;
  }
  return value;
}

function App() {
  const { width, height } = useWindowSize(); // used for confetti effect

  let [rollsCount, setRollsCount] = useState(0); // counting the rolls you've made in the current game

  let [startTime, setStartTime] = useState(() => {
    let d = new Date();
    return d.getTime();
  }); // store start time

  let [endTime, setEndTime] = useState(0); // counting the rolls you've made in the current game

  let [endGame, setEndGame] = useState(false); // determines games winning

  let [values, setValues] = useState(() => {
    let temp = [];
    for (let i = 0; i < 10; i++)
      temp.push({
        value: Math.round(Math.random(0, 1) * 5 + 1),
        isHeld: false,
      });
    return temp;
  });

  // checks endGame
  useEffect(() => {
    let res = values.filter((v) => v.isHeld == false);
    if (res.length == 0) {
      let res2 = values.filter((v) => {
        return v.value != values[0].value;
      });
      if (res2.length == 0) {
        setEndGame(true);
        let d = new Date();
        setEndTime(d.getTime());

      } else {
        alert("Make Sure you hold 10 similar numbers!");
      }
    }
  }, [values]);

  // roll dices
  function roll() {
    if (!endGame) {
      let temp = [];
      for (let i = 0; i < 10; i++) {
        if (!values[i].isHeld)
          temp.push({
            value: Math.round(Math.random(0, 1) * 5 + 1),
            isHeld: false,
          });
        else temp.push(values[i]);
        setValues(temp);
      }

      setRollsCount((prev) => prev + 1);
    }
  }

  // toggle state of a dice
  function toggle(index) {
    if (!endGame) {
      setValues((prev) =>
        prev.map((v, i) => {
          return index == i ? { ...v, isHeld: !v.isHeld } : { ...v };
        })
      );
    }
  }

  // play again handler
  function startAgain() {
    setEndGame(false);

    let temp = [];
    for (let i = 0; i < 10; i++)
      temp.push({
        value: Math.round(Math.random(0, 1) * 5 + 1),
        isHeld: false,
      });
    setValues(temp);
    setRollsCount(0);
  }

  return (
    <>
      <main className="text-center">
        <h1 className="title text-light">Tenzies</h1>
        <p className="instructions text-light">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="container">
          {values.map((v, index) => {
            return (
              <Die
                value={v.value}
                index={index}
                key={index}
                clickHandler={toggle}
                held={v.isHeld}
              />
            );
          })}
          {endGame && (
            <div className="winner">
              <div className="winner-inner">
                <h1> You won!</h1>
                <div className="text-light">
                  <span className="text-warning">Number of Rolls:</span>{" "}
                  {rollsCount}
                </div>
                <div className="text-light">
                  <span className="text-warning">Time Taken:</span>{" "}
                  {formatTimeDifference(endTime - startTime)}
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={!endGame ? roll : startAgain}
          className="btn-primary btn text-light"
        >
          {!endGame ? "Roll" : "Start Again"}
        </button>

        {endGame && (
          <div
            onClick={startAgain}
            className="instructions text-light mb-4 fs-2"
          >
            <Confetti width={width} height={height} />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
