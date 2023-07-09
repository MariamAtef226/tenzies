import "./App.css";
import Die from "./components/Die";
import Winner from "./components/Winner";
import { useState, useEffect } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

// functions to format time difference for score display
function formatTimeDifference(difference) {
  difference = Math.round(difference / 1000);
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

  let [bestRolls, setBestRolls] = useState(JSON.parse(localStorage.getItem('bestRolls')) || {rolls:10000000,time:0});

  useEffect(()=>{
    console.log(JSON.parse(localStorage.getItem('bestRolls')))
    console.log(bestRolls);
    // localStorage.setItem('bestRolls',JSON.stringify({rolls:10000000,time:0}))

  })

  // checks endGame (winning)
  useEffect(() => {
    let unheld = values.filter((v) => v.isHeld == false); // checks if any is unheld
    let unequal = values.filter((v) => v.value != values[0].value); // check if a held dice isn't equal to the rest
    if (unheld.length == 0 && unequal.length == 0) {
      setEndGame(true);
      let d = new Date();
      setEndTime(d.getTime()); // store game's endTime
      if (rollsCount <= bestRolls.rolls){
        let d = formatTimeDifference(endTime-startTime)
        localStorage.setItem('bestRolls',JSON.stringify({rolls:rollsCount,time:d}))
        setBestRolls({rolls:rollsCount,time:d});
        
      }

    } else if (unheld.length == 0 && unequal.length !== 0) {
      alert("Make Sure you hold 10 similar numbers!");
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
            <>
              <Winner
              endTime={endTime}
              startTime={startTime}
              rollsCount={rollsCount}
              bestRolls = {bestRolls}
              formatTimeDifference = {formatTimeDifference}
            />
            </>
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
