import React from 'react'
import {Link} from "react-router-dom";
import logo from '../Asset/logo.png'
const Nav = () => {
    return (
        <div>
    <nav className={'flex justify-between items-center h-16 bg-[#00A651]'}>
      <div>
        <ul className={'flex items-center'}>
            <li><Link to={'/'}><img src={logo} alt={'logo'} className={'h-12 w-auto object-contain '}/></Link></li>
        </ul>
      </div>
      <div>
          <ul className={'flex m-10 pr-40 pl-40 text-lg text-white '}>
            <li className={'pr-10 hover:text-[#172554]'}><Link to={'/'}>Home</Link></li>
            <li className={'pr-10 hover:text-[#172554]'}><Link to={'/About'}>About</Link></li>
            <li className={'pr-10 hover:text-[#172554]'}><Link to={'/Create user'}>Create user</Link></li>
            <li className={'pr-10 hover:text-[#172554]'}><Link to={'/All user'}> All user</Link></li>
          </ul>
      </div>
      <div>
      <ul className={'flex text-lg text-white'}>
          <li className={'pr-5 hover:text-[#172554]'}><Link to={'/Login'}>Login</Link></li>
          <li className={'pr-3 hover:text-[#172554]'}><Link to={'/Sign up'}>Sign Up</Link></li>
      </ul>
      </div>
    </nav>
</div>
)
}
export default Nav
