import React, {useEffect, useState} from 'react'
import axios from "axios";
const Alluser = () => {
    let [content, setContent] = useState([])
    let getData = async ()=>{
        let response = await axios.get('http://localhost:3000/students')
        console.log(response)
        setContent(response.data)
    }
    useEffect(()=>{
       try {
           getData();
       }
       catch (err){
           console.log(err);
       }
    })
    return (
        <div>
            {
                content.map((ele)=>{
                    return(
                        <div>
                            <div key={ele.id}>
                                <p>Name: {ele.name}</p>
                                <p>Email: {ele.email}</p>
                                <p>Contact: {ele.contact}</p>
                                <p>password: {ele.password}</p>
                                <p>age: {ele.age}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Alluser
