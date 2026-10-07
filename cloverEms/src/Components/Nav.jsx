import React from 'react'
import {Link} from "react-router-dom";
import logo from '../Asset/logo.png'
const Nav = () => {
    return (
        <>
    <nav className={'flex'}>
      <div>
        <ul className={'flex w-full justify-around'}>
            <li className={'w-50 h-'}><Link to={'/Home'}><img src={logo}/></Link></li>
        </ul>
      </div>
      <div>
          <ul className={'flex justify-around'}>
            <li><Link to={'/Home'}>Home</Link></li>
            <li><Link to={'/About'}>About</Link></li>
            <li><Link to={'/Create user'}>Create user</Link></li>
            <li><Link to={'/All user'}> All user</Link></li>
          </ul>
      </div>
      <div>
      <ul className={'flex justify-around'}>
          <li><Link to={'/Login'}>Login</Link></li>
          <li><Link to={'/Sign up'}>Sign Up</Link></li>
      </ul>
      </div>
    </nav>
</>
)
}
export default Nav
