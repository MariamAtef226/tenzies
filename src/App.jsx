import './App.css'
import Die from './components/Die'
import {useState, useEffect} from 'react'

function App() {
    let [values,setValues] = useState([]);

    useEffect(()=>{
      let temp = [];
      for (let i=0; i<10;i++)
        temp.push(Math.round(Math.random(0,1)*5 +1))
      setValues(temp);
      console.log(values)
    },[]);


  return (
    <>
     <main className='container'>
      {values.map(v=>{
        return <Die value={v} />
      })}       
 
     </main>
    </>
  )
}

export default App
