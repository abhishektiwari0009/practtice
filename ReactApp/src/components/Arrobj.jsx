import React from 'react'
import {useState} from "react";
const Arrobj = () => {
    let[arrobj, setArrobj] = useState([{name:"Abhishek", Age: 21, id:6969}, {name:"Akanksha", Age: 21, id: 6970}])

    return (
        <>
            {
                arrobj.map((key)=>{
                    return(
                        <div className={'border rounded h-50 w-50 bg-red-300'}>
                            <h1>{key.name}</h1>
                            <p>{key.Age}</p>
                            <p>{key.id}</p>
                        </div>
                    )
                })
            }
        </>
    )
}
export default Arrobj
