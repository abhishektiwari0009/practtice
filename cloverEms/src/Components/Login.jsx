import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const bodyElement = document.body;
    bodyElement.style.backgroundColor = "#FFFFFF"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.get('http://localhost:4000/users');
            const user = res.data.find((u) => u.email === email && u.password === password);
            if (user) {
                navigate('/');
            } else {
                setError('Invalid Email or Password!');
            }
        } catch (err) {
            console.error(err);
            setError('Login failed! Please check if JSON server is running on port 4000.');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={'w-100 m-auto mt-10 border-2 rounded-xl p-4'}>
                <h1 className={'text-center font-bold text-xl mb-4'}>Login</h1>
                {error && <p className={'text-red-600 text-center font-semibold mb-2'}>{error}</p>}
                <p className={'pt-2 pb-3'}>
                    <label htmlFor={'email'} className={'pr-9 pl-4 font-bold'}>Email: </label>
                    <input
                        placeholder={'Enter Registered Email'}
                        type={'email'}
                        required
                        id={'email'}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        className={'border-2 font-bold rounded pl-2'}
                    />
                </p>
                <p className={'pb-5'}>
                    <label htmlFor={'password'} className={'pr-2 pl-4 font-bold'}>Password: </label>
                    <input
                        type={'password'}
                        placeholder={'Enter your Password'}
                        required
                        id={'password'}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        className={'border-2 font-bold rounded pl-2'}
                    />
                </p>
                <p className={'text-center pb-2'}>
                    <button type="submit" className={'border-2 rounded mb-2 px-5 py-1 font-bold cursor-pointer bg-[#00A651] text-white'}>
                        Submit
                    </button>
                </p>
                <p className={'font-bold text-center'}>
                    Don't have an account?{' '}
                    <span className={'hover:text-[#172554] text-blue-600 underline'}>
                        <Link to={'/Sign Up'}>Sign Up</Link>
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Login
