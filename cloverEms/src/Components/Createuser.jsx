import React, { useState } from 'react'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Createuser = () => {
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const nameHandler = (e) => setName(e.target.value)
    const contactHandler = (e) => setContact(e.target.value)
    const ageHandler = (e) => setAge(e.target.value)
    const emailHandler = (e) => setEmail(e.target.value)
    const passwordHandler = (e) => setPassword(e.target.value)

    const btnHandler = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const payload = { name, email, contact, password, age };
        try {
            await axios.post('http://localhost:3000/students', payload);
            setName('');
            setAge('');
            setPassword('');
            setContact('');
            setEmail('');
            navigate('/All user');
        } catch (err) {
            console.error(err);
            setError('Failed to create user. Please ensure the server is running on port 3000.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-emerald-50 via-slate-50 to-teal-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-emerald-950/5 border border-slate-100 p-6 sm:p-10 transition-all">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-[#00A651]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.765z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create User</h1>
                            <p className="text-xs sm:text-sm text-slate-500">Add a new record to the Clover EMS directory</p>
                        </div>
                    </div>
                    <Link
                        to="/All user"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#00A651] bg-slate-100 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                        Back to List
                    </Link>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 flex items-start gap-3 p-3.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
                        <svg className="w-5 h-5 shrink-0 text-red-500 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        <span className="font-medium leading-relaxed">{error}</span>
                    </div>
                )}

                {/* Form Fields */}
                <form onSubmit={btnHandler} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name Field */}
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </div>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    placeholder="Enter user's full name"
                                    value={name}
                                    onChange={nameHandler}
                                    className="w-full pl-11 pr-4 py-2.5 text-sm font-medium text-slate-800 bg-slate-50/70 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    placeholder="Enter Email Address: "
                                    value={email}
                                    onChange={emailHandler}
                                    className="w-full pl-11 pr-4 py-2.5 text-sm font-medium text-slate-800 bg-slate-50/70 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Contact Field */}
                        <div>
                            <label htmlFor="contact" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Contact Number
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                    </svg>
                                </div>
                                <input
                                    id="contact"
                                    type="tel"
                                    placeholder="Enter phone no"
                                    value={contact}
                                    onChange={contactHandler}
                                    className="w-full pl-11 pr-4 py-2.5 text-sm font-medium text-slate-800 bg-slate-50/70 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Age Field */}
                        <div>
                            <label htmlFor="age" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Age
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.253M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                </div>
                                <input
                                    id="age"
                                    type="number"
                                    min="1"
                                    max="120"
                                    placeholder="e.g. 28"
                                    value={age}
                                    onChange={ageHandler}
                                    className="w-full pl-11 pr-4 py-2.5 text-sm font-medium text-slate-800 bg-slate-50/70 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                    </svg>
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="Create password for user"
                                    value={password}
                                    onChange={passwordHandler}
                                    className="w-full pl-11 pr-11 py-2.5 text-sm font-medium text-slate-800 bg-slate-50/70 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] transition-all placeholder:text-slate-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                        <Link
                            to="/All user"
                            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="py-2.5 px-6 bg-[#00A651] hover:bg-[#008f45] active:bg-[#007a3a] text-white font-semibold text-sm rounded-xl shadow-lg shadow-[#00A651]/25 hover:shadow-xl hover:shadow-[#00A651]/35 focus:outline-none focus:ring-2 focus:ring-[#00A651] focus:ring-offset-2 transition-all duration-200 cursor-pointer flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                    </svg>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span>Save User</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Createuser
