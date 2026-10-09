import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
const Alluser = () => {
    let [content, setContent] = useState([])

    let getData = async () => {
        try {
            let response = await axios.get('http://localhost:3000/students')
            console.log(response)
            setContent(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    let deleteHandler = async (id)=>{
        try{
            await axios.delete(`http://localhost:3000/students/${id}`)
            alert("User Deleted!!")
        }
        catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">All Users</h1>
            <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-left text-sm bg-white">
                    <thead className="bg-[#00A651] text-white">
                        <tr>
                            <th className="px-6 py-3 font-semibold">ID</th>
                            <th className="px-6 py-3 font-semibold">Name</th>
                            <th className="px-6 py-3 font-semibold">Email</th>
                            <th className="px-6 py-3 font-semibold">Contact</th>
                            <th className="px-6 py-3 font-semibold">Age</th>
                            <th className="px-6 py-3 font-semibold">Password</th>
                            <th className="px-6 py-3 font-semibold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {content && content.length > 0 ? (
                            content.map((ele, index) => (
                                <tr key={ele.id || index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{ele.id || index + 1}</td>
                                    <td className="px-6 py-4 text-gray-700">{ele.name}</td>
                                    <td className="px-6 py-4 text-gray-700">{ele.email}</td>
                                    <td className="px-6 py-4 text-gray-700">{ele.contact}</td>
                                    <td className="px-6 py-4 text-gray-700">{ele.age}</td>
                                    <td className="px-6 py-4 text-gray-700">{ele.password}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-1 rounded transition duration-200 cursor-pointer">
                                                <Link to={`/Edit/${ele.id}`}>Edit</Link>
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded transition duration-200 cursor-pointer" onClick={()=>{
                                                deleteHandler(ele.id)
                                            }}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Alluser
