import React from 'react'

const Login = () => {
    const bodyElement = document.body;
    bodyElement.style.backgroundColor = "#FCA5A5"
    return (
        <div>
            <form  className={'w-100 m-auto mt-10 border-2 rounded-xl'}>
                <h1 className={'pl-40 m-2 font-bold'}>Login</h1>
                <p className={'pt-2 pb-3'}>
                <label htmlFor={'email'} className={'pr-9 font-bold'}>Email: </label>
                <input  placeholder={'Enter Registered Email: '} type={'email'} required id={'email'} className={'border-2 font-bold rounded '}/>
                </p>
                <p className={'pb-5'}>
                <label htmlFor={'password'} className={'pr-2 font-bold'}>Password: </label>
                <input type={'password'} placeholder={'Enter your Password: '} required id={'password'} className={'border-2 font-bold rounded'}/>
                </p>
                <p className={'pl-35'}>
                <button className={'pl-1 border-2 rounded mb-2 pr-5 pl-5 font-bold  '}> Submit </button>
                </p>
            </form>
        </div>
    )
}
export default Login
