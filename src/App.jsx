import "./App.css";
import Die from "./components/Die";
import { useState, useEffect } from "react";

function App() {
  let [endGame, setEndGame] = useState(false);
  let [values, setValues] = useState(() => {
    let temp = [];
    for (let i = 0; i < 10; i++)
      temp.push({
        value: Math.round(Math.random(0, 1) * 5 + 1),
        isHeld: false,
      });
    return temp;
  });

  useEffect(() => {
    let res = values.filter((v) => v.isHeld == false);
    if (res.length == 0) setEndGame(true);
  }, [values]);

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
    }
  }

  function toggle(index) {
    if (!endGame){
    setValues((prev) =>
      prev.map((v, i) => {
        return index == i ? { ...v, isHeld: !v.isHeld } : { ...v };
      })
    );
    }
  }
  function startAgain(){
    setEndGame(false);
    
    let temp = [];
    for (let i = 0; i < 10; i++)
      temp.push({
        value: Math.round(Math.random(0, 1) * 5 + 1),
        isHeld: false,
      });
    setValues(temp);

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
        </div>

        <button onClick={roll} className="btn-primary btn text-light">
          Roll
        </button>

        {endGame && <button onClick={startAgain} className="btn-primary btn start-again text-light">
          Start Again
        </button>}
        {endGame && <div onClick={startAgain} className="instructions text-light mb-4 fs-2">
          Congrats! You Won!
        </div>}
      </main>
    </>
  );
}

export default App;
