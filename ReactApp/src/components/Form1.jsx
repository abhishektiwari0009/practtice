import React from 'react'
import { useRef } from 'react'
const Form1 = () => {
    let nameRef = useRef();
    let ageRef = useRef();
    let emailRef = useRef();
    let btnHandler = (e)=>{
        e.preventDefault();
        console.log(nameRef,ageRef,emailRef);
        console.log(nameRef.current.value);
        console.log(ageRef.current.value);
        console.log(emailRef.current.value);
        
        
    };
    
    return (
        <>
            <form className={"border-2 rounded-2xl bg-pink-300 w-100 p-10 m-auto mt-20  "}>
                <p className={"font-bold text text-2xl "} > User Detail</p>
                <p>
                <label htmlFor = "username" >Name: </label>
                <input type={"text"} id={"username"} placeholder={"enter your name"} required className={"border rounded"} ref={nameRef}/>
                </p>
                <p>
                    <label htmlFor = "age" >Age: </label>
                    <input type={"number"} id={"age"} placeholder={"enter your Age"} required className={"border rounded"} ref={ageRef}/>
                </p>
                <p>
                    <label htmlFor="email" >Email: </label>
                    <input type="email" id='email' placeholder='Enter your email' required className='border rounded'ref={emailRef} />
                </p>
                <button onClick={btnHandler} className={"border rounded"}>Submit</button>
            </form>
        </>
    )
}
export default Form1
