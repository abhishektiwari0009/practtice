import React from 'react'

const Form = () => {
    return (
        <>
            <form className={"border-2 rounded-2xl bg-pink-300 w-100 p-10 m-auto mt-20  "}>
                <p className={"font-bold text text-2xl "}>User Detail</p>
                <p>
                <label for = "username">Name: </label>
                <input type={"text"} id={"username"} placeholder={"enter your name"} required className={"border rounded"}/>
                </p>
                <p>
                    <label for = "age">Age: </label>
                    <input type={"number"} id={"age"} placeholder={"enter your Age"} required className={"border rounded"}/>
                </p>
                <p>
                    <label for = "Gender">Gender: </label>
                    <input type={"radio"}  name={"gender"}/>male
                    <input type={"radio"} name={"gender"} />female
                </p>
                <button className={"border rounded"}>Submit</button>
            </form>
        </>
    )
}
export default Form
