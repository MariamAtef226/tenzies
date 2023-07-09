import "./App.css";
import Die from "./components/Die";
import { useState, useEffect } from "react";

function App() {
  let [values, setValues] = useState(()=>{
    let temp = [];
    for (let i = 0; i < 10; i++)
      temp.push({value: Math.round(Math.random(0, 1) * 5 + 1), isHeld:false});
    return temp
  });

function roll(){
  let temp = [];
  for (let i = 0; i < 10; i++){
    if (!values[i].isHeld)
      temp.push({value:Math.round(Math.random(0, 1) * 5 + 1), isHeld:false});
    else
      temp.push(values[i])  
  setValues(temp);
}
}

function toggle(index){
  setValues((prev)=>prev.map((v,i)=>{ return index == i ? {...v, isHeld:!v.isHeld}: {...v} }));
    
}


  return (
    <>
      <main className='text-center'>
        <div className="container">
          {values.map((v, index) => {
            return <Die value={v.value} index={index} key={index} clickHandler={toggle}  held={v.isHeld}/>;
          })}
        </div>
        <button onClick={roll} className="btn-primary btn text-light">Roll</button>

      </main>
    </>
  );

}

export default App;
