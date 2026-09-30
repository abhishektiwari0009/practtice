import React from 'react'
import {useState} from "react";

const Counter = () => {
    let [count,setCount] = useState(0)
    let btnhandler = ()=>{
        setCount(count+1)
    }
    let sub = ()=>{
        setCount(count-1)
    }
    let reset = ()=>{
        setCount(0)
    }
    return (
        <>
            <h1>{count}</h1>
            <button onClick={btnhandler}>Add</button>
            <button onClick={sub}>sub</button>
            <button onClick={reset}>reset</button>
        </>
    )
}
export default Counter
