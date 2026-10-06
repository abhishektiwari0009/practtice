import React, { useState } from 'react'
import { useEffect } from 'react'
const FetchData = () => {
    let[content,setContent] = useState([])
    let getData = async() =>{
        let response = await fetch('https://jsonplaceholder.typicode.com/comments')
        let data = await response.json()
        console.log(data);
        setContent(data)
        
    }
    useEffect(()=>{
        try{
            getData()
        }
        catch(err){
            console.log(err);
            
        }
    })
    return (
    <>
        {
            content.map((ele)=>{
                return(
                    <>
                        <h1>{ele.name}</h1>
                    </>
                )
            })
        }
    </>
  )
}

export default FetchData