import React from 'react'
import {useState} from "react";
import users from "../users.json"
const Json = () => {
    let[post, setPost] = useState(users)
    return (
        <>
            {
                post.map((ele)=>{
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
export default Json
