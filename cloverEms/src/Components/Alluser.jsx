import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Alluser = () => {
    const [content, setContent] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [visiblePasswords, setVisiblePasswords] = useState({})

    const getData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/students');
            setContent(response.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    const deleteHandler = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`http://localhost:3000/students/${id}`);
            setContent((prev) => prev.filter((item) => item.id !== id));
            alert("User Deleted!!");
        } catch (err) {
            console.error(err);
            alert("Failed to delete user. Please check if the server is running.");
        }
    }

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    useEffect(() => {
        getData()
    }, [])

    // Filter users based on search term
    const filteredUsers = content.filter((user) => {
        const query = searchTerm.toLowerCase();
        return (
            (user.name && user.name.toLowerCase().includes(query)) ||
            (user.email && user.email.toLowerCase().includes(query)) ||
            (user.contact && user.contact.toString().toLowerCase().includes(query))
        );
    });

    // Helper to get initials
    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.slice(0, 2).toUpperCase();
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-emerald-50/50 via-slate-50 to-teal-50/40 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header & Controls Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">User Directory</h1>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#00A651]">
                                {content.length} {content.length === 1 ? 'user' : 'users'}
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                            Manage and organize all registered employee profiles
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {/* Search Input */}
                        <div className="relative min-w-[240px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name, email, or contact..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-8 py-2 text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00A651] focus:border-[#00A651] transition-all placeholder:text-slate-400"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Reload Button */}
                        <button
                            onClick={getData}
                            title="Refresh data"
                            className="p-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center"
                        >
                            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#00A651]' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                        </button>

                        {/* Add User CTA */}
                        <Link
                            to="/Create user"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#00A651] hover:bg-[#008f45] active:bg-[#007a3a] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#00A651]/20 hover:shadow-lg transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <span>Create User</span>
                        </Link>
                    </div>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-600 text-xs uppercase font-bold tracking-wider">
                                    <th className="px-6 py-4">ID</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Age</th>
                                    <th className="px-6 py-4">Password</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <svg className="animate-spin h-7 w-7 text-[#00A651]" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                </svg>
                                                <span className="text-sm font-medium">Loading user records...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredUsers && filteredUsers.length > 0 ? (
                                    filteredUsers.map((ele, index) => {
                                        const userId = ele.id || index + 1;
                                        const isPassVisible = visiblePasswords[userId];

                                        return (
                                            <tr
                                                key={userId}
                                                className="hover:bg-slate-50/80 transition-colors group"
                                            >
                                                {/* ID */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="font-mono text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                                        #{userId}
                                                    </span>
                                                </td>

                                                {/* User with Avatar */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#00A651] font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-200/50">
                                                            {getInitials(ele.name)}
                                                        </div>
                                                        <span className="font-semibold text-slate-800">
                                                            {ele.name || 'Unnamed'}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Email */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-slate-600 font-medium">
                                                        {ele.email || '—'}
                                                    </span>
                                                </td>

                                                {/* Contact */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="text-slate-600 font-mono text-xs">
                                                        {ele.contact || '—'}
                                                    </span>
                                                </td>

                                                {/* Age */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {ele.age ? (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                                                            {ele.age} yrs
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-400">—</span>
                                                    )}
                                                </td>

                                                {/* Password with Mask Toggle */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-xs text-slate-600">
                                                            {isPassVisible ? ele.password : '••••••••'}
                                                        </span>
                                                        <button
                                                            onClick={() => togglePasswordVisibility(userId)}
                                                            className="text-slate-400 hover:text-slate-600 focus:outline-none"
                                                            title={isPassVisible ? 'Hide password' : 'Show password'}
                                                        >
                                                            {isPassVisible ? (
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                                                </svg>
                                                            ) : (
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>

                                                {/* Action Buttons */}
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link
                                                            to={`/Edit/${ele.id}`}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                            </svg>
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteHandler(ele.id)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors cursor-pointer"
                                                        >
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                            </svg>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-16 text-center text-slate-500">
                                            <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                    </svg>
                                                </div>
                                                <h3 className="text-base font-semibold text-slate-800 mb-1">
                                                    {searchTerm ? 'No matching users found' : 'No users found'}
                                                </h3>
                                                <p className="text-xs text-slate-500 mb-4">
                                                    {searchTerm
                                                        ? `Try adjusting your search query "${searchTerm}"`
                                                        : 'Start by creating your first user in the system.'}
                                                </p>
                                                {searchTerm ? (
                                                    <button
                                                        onClick={() => setSearchTerm('')}
                                                        className="text-xs font-semibold text-[#00A651] hover:underline"
                                                    >
                                                        Clear search
                                                    </button>
                                                ) : (
                                                    <Link
                                                        to="/Create user"
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00A651] text-white text-xs font-semibold rounded-xl hover:bg-[#008f45] transition-colors"
                                                    >
                                                        + Create First User
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Alluser
