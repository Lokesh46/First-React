import { useState } from 'react'
import CounterButton from './CounterButton'
import './counter.css'

export default function Counter(){
    const [count,setCount] = useState(0);

    function incrementCounterParentFunction(by){
        setCount(count+by)
    }

    function decrementCounterParentFunction(by){
        setCount(count-by)
    }

    function resetCounter(){
        setCount(0)
    }
    return(
        <div>
            <span className="count">{count}</span>
            <CounterButton by={1} incMethod={incrementCounterParentFunction} decMethod={decrementCounterParentFunction}/>
            <CounterButton by={2} incMethod={incrementCounterParentFunction} decMethod={decrementCounterParentFunction}/>
            <CounterButton by={5} incMethod={incrementCounterParentFunction} decMethod={decrementCounterParentFunction}/>
            <button className="resetButton" onClick={resetCounter}>RESET</button>
        </div>
    )
}
