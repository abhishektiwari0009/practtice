import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                {/* Title */}
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
                    About <span className="text-[#00A651]">Clover EMS</span>
                </h1>
                <p className="text-center text-gray-500 mb-8 text-base">
                    A simple and reliable Employee Management System
                </p>

                {/* Overview Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-[#00A651] pl-3">
                        What is Clover EMS?
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        Clover EMS is an intuitive Employee Management System built to simplify how organizations maintain and track their employee records. Whether it's adding new members, reviewing existing employee details, or updating records, Clover EMS keeps the workflow smooth and accessible.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-[#00A651] pl-3">
                        Key Highlights
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-center">
                            <div className="text-2xl mb-2">👥</div>
                            <h3 className="font-bold text-gray-800 mb-1">Centralized Records</h3>
                            <p className="text-gray-600 text-xs">
                                View and manage all employee details in one structured table.
                            </p>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-center">
                            <div className="text-2xl mb-2">⚡</div>
                            <h3 className="font-bold text-gray-800 mb-1">Quick Actions</h3>
                            <p className="text-gray-600 text-xs">
                                Instantly create, update, or remove records without hassle.
                            </p>
                        </div>
                        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-center">
                            <div className="text-2xl mb-2">💻</div>
                            <h3 className="font-bold text-gray-800 mb-1">Modern Tech Stack</h3>
                            <p className="text-gray-600 text-xs">
                                Built with React, Tailwind CSS, Vite, and REST APIs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8 bg-green-50 rounded-xl p-5 border border-green-100">
                    <h2 className="text-lg font-bold text-[#00A651] mb-2">
                        Technologies Used
                    </h2>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                        <span className="bg-white px-3 py-1 rounded-md border border-gray-200">React.js</span>
                        <span className="bg-white px-3 py-1 rounded-md border border-gray-200">React Router</span>
                        <span className="bg-white px-3 py-1 rounded-md border border-gray-200">Tailwind CSS</span>
                        <span className="bg-white px-3 py-1 rounded-md border border-gray-200">Axios</span>
                        <span className="bg-white px-3 py-1 rounded-md border border-gray-200">JSON Server</span>
                        <span className="bg-white px-3 py-1 rounded-md border border-gray-200">Vite</span>
                    </div>
                </div>

                {/* Call to Action Buttons */}
                <div className="flex justify-center gap-4 pt-4 border-t border-gray-200">
                    <Link
                        to="/"
                        className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-5 py-2 rounded-lg text-sm transition duration-200"
                    >
                        Back to Home
                    </Link>
                    <Link
                        to="/All user"
                        className="bg-[#00A651] hover:bg-[#008f45] text-white font-semibold px-5 py-2 rounded-lg text-sm transition duration-200"
                    >
                        View All Users
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default About
