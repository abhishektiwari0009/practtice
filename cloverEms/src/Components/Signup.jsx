import React from 'react'
import {Link} from "react-router-dom";
const Signup = () => {
    const bodyElement = document.body;
    bodyElement.style.backgroundColor = "#FFFFFF"
    return (
        <div>
            <form className={'border-2 w-100 m-auto mt-10 '}>
                <h1 className={'font-bold pl-40 m-2'}>Sign Up</h1>
                <p className={'pt-2 pb-3'}>
                    <label htmlFor={'name'} className={'font-bold pr-7 pl-4'}>Name: </label>
                    <input id={'name'} placeholder={'Enter Your Name '} type={'name'} required className={'border-2 rounded-lg'}/>
                </p>
                <p className={'pt-2 pb-3'}>
                    <label htmlFor={'email'} className={'font-bold pr-8 pl-4'}>Email: </label>
                    <input id={'email'} placeholder={'Enter Your Email'} type={'email'} required className={'border-2 rounded-lg'}/>
                </p>
                <p className={'pt-2 pb-3'}>
                    <label htmlFor={'password'} className={'font-bold pr-5'}>Password: </label>
                    <input id={'password'} placeholder={'Enter Password'} type={'password'} requiredn className={"border-2 rounded-lg"}/>
                </p>
                <p className={'pt-2 pb-3 pl-40'}>
                    <button className={'font-bold border-2 rounded-lg bg-red-900'}>Sign Up</button>
                </p>
                <p className={'font-bold pl-20'}>Already have a account?<span className={'hover:text-[#172554] text-black'}><Link to={'/Login'}>Login</Link></span></p>
            </form>
        </div>
    )
}
export default Signup
