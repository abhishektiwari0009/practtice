import React from 'react'
import {useState} from "react";

const Data = () => {
    let [arr, setCount] = useState([10, 20, 30, 40])
    let btnhandler = ()=>{
       let nextele = arr[arr.length-1]+10
        setCount(()=>[...arr,nextele])
    }
    let sub = ()=>{
        let previousele = arr[arr.length-1]-10
        setCount(()=>[...arr,previousele])
    }
    return (
        <>
            <button onClick={btnhandler} className='border rounded bg-red-600'>Increase</button>
            <button onClick={sub}>decrease</button>
            <button onClick={reset}>Reset</button>

            {
                arr.map((ele, ind)=>{
                   return(
                       <div key={ind}>
                       <h1>{ele}</h1>
                       </div>
                   )
                })
            }

        </>
    )
}
export default Data
