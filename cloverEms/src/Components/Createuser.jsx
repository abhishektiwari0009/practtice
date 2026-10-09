import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
const Createuser = () => {
    let[name , setName] = useState('')
    let[contact, setContact] = useState('')
    let[age, setAge] = useState('')
    let[email, setEmail] =useState('')
    let[password, setPassword] = useState('')
    let[btn,setBtn] = useState('')
    let navigate = useNavigate()
    let nameHandler = (e)=>{
        e.preventDefault();
        setName(e.target.value);
    }
    let contactHandler = (e)=>{
        e.preventDefault();
        setContact(e.target.value);
    }
    let ageHandler = (e)=>{
        e.preventDefault();
        setAge(e.target.value);
    }
    let emailHandler = (e) =>{
        e.preventDefault();
        setEmail(e.target.value);
    }
    let passwordHandler = (e) =>{
        e.preventDefault();
        setPassword(e.target.value);
    }
    let btnHandler = async (e)=>{
        e.preventDefault();
        // console.log(name,email,contact,password,age)
        let payload = {name,email,contact,password,age};
        try{
            await axios.post('http://localhost:3000/students', payload);
        } catch (err){
            console.log(err);
        }
        setName('');
        setAge('');
        setPassword('');
        setContact('');
        setEmail('');
        navigate('/All user')
    }

    return (
        <div>
            <form className={'w-100 m-auto mt-10 border-2 rounded-lg bg-blue-100'}>
                <h1 className={'pl-38 font-bold'}>Create User</h1>
                <p className={'py-3'}>
                    <label htmlFor={'name'} className={'font-bold pr-7 pl-4'}>Name: </label>
                    <input id={'name'} type={'name'} required placeholder={'Enter your name'} className={'border-2 rounded-lg pl-3'} value={name} onChange={nameHandler}/>
                </p>
                <p className={'py-3'}>
                    <label htmlFor={'contact'} className={'font-bold pr-3 pl-4'}>Contact: </label>
                    <input id={'contact'} placeholder={"Enter your contact"} className={'border-2 rounded-lg pl-3'} value={contact} onChange={contactHandler}/>
                </p>
                <p className={'py-3'}>
                    <label htmlFor={"Age"} className={'font-bold pr-10 pl-4'}>Age: </label>
                    <input id={'Age'} type={'number'} placeholder={"Enter your age"} className={'border-2 rounded-lg pl-3'} value={age} onChange={ageHandler}/>
                </p>
                <p className={'py-3'}>
                    <label htmlFor={'email'} className={'font-bold pr-7 pl-4'}> Email: </label>
                    <input id={'email'} type={'email'} required placeholder={'Enter your email'} className={'border-2 rounded-lg pl-3'} value={email} onChange={emailHandler}/>
                </p>
                <p className={'py-3'}>
                    <label htmlFor={'password'} className={'font-bold  pl-4'}> Password: </label>
                    <input id={'password'} type={'password'} required placeholder={'Create your password'} className={'border-2 rounded-lg pl-3'} value={password} onChange={passwordHandler}/>
                </p>
                <p className={'px-38 py-3 '}>
                    <button className={'border-2 rounded-lg px-5 bg-[#00A651] font-bold'} value={btn} onClick={btnHandler} type={'submit'}>Save</button>
                </p>
            </form>
        </div>
    )
}
export default Createuser
