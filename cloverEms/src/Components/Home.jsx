import React from 'react'
import { Link } from 'react-router-dom'
import Bg from '../Asset/Homebg.png'

const Home = () => {
    return (
        <div className="relative w-full h-[calc(100vh-64px)] flex items-center justify-center">
            {/* Background Image - Fully Visible */}
            <img
                src={Bg}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Foreground Content Card */}
            <div
                className="relative z-10 text-center p-8 rounded-2xl shadow-2xl max-w-lg mx-4 border border-gray-200"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.92)' }}
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
                    Welcome to <span className="text-[#00A651]">Clover EMS</span>
                </h1>
                <p className="text-gray-600 mb-6 font-medium text-base">
                    A simple Employee Management System to organize, create, and manage employee records.
                </p>

                {/* Quick Action Buttons */}
                <div className="flex justify-center gap-4 mb-6">
                    <Link
                        to="/All user"
                        className="bg-[#00A651] hover:bg-[#008f45] text-white font-bold py-2.5 px-6 rounded-lg shadow transition duration-200"
                    >
                        View All Users
                    </Link>
                    <Link
                        to="/Create user"
                        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2.5 px-6 rounded-lg shadow transition duration-200"
                    >
                        + Create User
                    </Link>
                </div>

                {/* Quick Highlights */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 text-xs text-gray-700 font-semibold">
                    <div>👥 All Users</div>
                    <div>➕ Add Employee</div>
                    <div>✏️ Edit & Manage</div>
                </div>
            </div>
        </div>
    )
}

export default Home
