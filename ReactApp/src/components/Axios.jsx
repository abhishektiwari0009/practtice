import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Axios = () => {
    let[comments, setContent] = useState([])
    async function getData() {
        let response = await axios.get('https://jsonplaceholder.typicode.com/comments')
        console.log(response.data);
        setContent(response.data)
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <>
        {
            comments.slice(0,10).map((ele)=>{
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

export default Axios