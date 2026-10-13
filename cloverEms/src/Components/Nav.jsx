import React from 'react'
import { Link, useLocation } from "react-router-dom";
import logo from '../Asset/logo.png'

const Nav = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.toLowerCase() === path.toLowerCase()) return true;
        return false;
    };

    return (
        <header className="sticky top-0 z-50 bg-[#00A651] shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center transition-transform hover:scale-105">
                        <img src={logo} alt="Clover EMS logo" className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm" />
                    </Link>
                </div>

                {/* Primary Nav Links */}
                <div className="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm lg:text-base font-semibold text-white">
                    <Link
                        to="/"
                        className={`px-3 py-2 rounded-lg transition-colors duration-150 ${
                            isActive('/') ? 'bg-[#008f45] text-white shadow-inner' : 'hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/About"
                        className={`px-3 py-2 rounded-lg transition-colors duration-150 ${
                            isActive('/About') ? 'bg-[#008f45] text-white shadow-inner' : 'hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        About
                    </Link>
                    <Link
                        to="/Create user"
                        className={`px-3 py-2 rounded-lg transition-colors duration-150 ${
                            isActive('/Create user') ? 'bg-[#008f45] text-white shadow-inner' : 'hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        Create User
                    </Link>
                    <Link
                        to="/All user"
                        className={`px-3 py-2 rounded-lg transition-colors duration-150 ${
                            isActive('/All user') ? 'bg-[#008f45] text-white shadow-inner' : 'hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        All Users
                    </Link>
                </div>

                {/* Auth Links */}
                <div className="flex items-center space-x-2 sm:space-x-3 text-sm font-semibold">
                    <Link
                        to="/Login"
                        className={`px-3.5 py-1.5 rounded-lg text-white transition-all ${
                            isActive('/Login') ? 'bg-white/20' : 'hover:bg-white/10'
                        }`}
                    >
                        Login
                    </Link>
                    <Link
                        to="/Sign up"
                        className="px-4 py-1.5 rounded-lg bg-white text-[#00A651] hover:bg-slate-50 active:bg-slate-100 font-bold shadow-sm transition-all hover:shadow"
                    >
                        Sign Up
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Nav
