import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const bodyElement = document.body;
    bodyElement.style.backgroundColor = "#FFFFFF"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const payload = { name, email, password };
        try {
            const res = await axios.get('http://localhost:4000/users');
            const existingUser = res.data.find((user) => user.email === email);
            if (existingUser) {
                setError('User with this email already exists!');
                return;
            }
            await axios.post('http://localhost:4000/users', payload);
            navigate('/Login');
        } catch (err) {
            console.error(err);
            setError('Signup failed! Please check if JSON server is running on port 4000.');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={'border-2 w-100 m-auto mt-10 rounded-xl p-4'}>
                <h1 className={'font-bold text-center text-xl mb-4'}>Sign Up</h1>
                {error && <p className={'text-red-600 text-center font-semibold mb-2'}>{error}</p>}
                <p className={'pt-2 pb-3'}>
                    <label htmlFor={'name'} className={'font-bold pr-7 pl-4'}>Name: </label>
                    <input
                        id={'name'}
                        placeholder={'Enter Your Name'}
                        type={'text'}
                        required
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                        }}
                        className={'border-2 rounded-lg pl-2'}
                    />
                </p>
                <p className={'pt-2 pb-3'}>
                    <label htmlFor={'email'} className={'font-bold pr-8 pl-4'}>Email: </label>
                    <input
                        id={'email'}
                        placeholder={'Enter Your Email'}
                        type={'email'}
                        required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        className={'border-2 rounded-lg pl-2'}
                    />
                </p>
                <p className={'pt-2 pb-3'}>
                    <label htmlFor={'password'} className={'font-bold pr-5 pl-4'}>Password: </label>
                    <input
                        id={'password'}
                        placeholder={'Enter Password'}
                        type={'password'}
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        className={'border-2 rounded-lg pl-2'}
                    />
                </p>
                <p className={'pt-2 pb-3 text-center'}>
                    <button type="submit" className={'font-bold border-2 rounded-lg bg-red-900 text-white px-4 py-1 cursor-pointer'}>
                        Sign Up
                    </button>
                </p>
                <p className={'font-bold text-center'}>
                    Already have an account?{' '}
                    <span className={'hover:text-[#172554] text-blue-600 underline'}>
                        <Link to={'/Login'}>Login</Link>
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Signup
