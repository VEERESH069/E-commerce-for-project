import React from 'react'
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-white text-2xl font-bold">E-commerce</h1>
                </div>
                <div className="flex space-x-4">
                    <NavLink to="/" className="text-white hover:text-gray-400">Home</NavLink>
                    <NavLink to="/productform" className="text-white hover:text-gray-400">Productform</NavLink>
                    <div className="flex space-x-4">
                        <NavLink to="/login" className="text-white hover:text-gray-400">Login</NavLink>
                        <NavLink to="/signup" className="text-white hover:text-gray-400">Signup</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar