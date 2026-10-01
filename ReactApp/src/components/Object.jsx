import React from 'react'
import {useState} from "react";
const Object = () => {
    let[obj, setObj] = useState({name:"Abhishek", Age: 21, id: 6969})
    return (
        <>

            <h1>{obj.name}</h1>
            <p>{obj.Age}</p>
            <p>{obj.id}</p>


        </>
    )
}
export default Object
