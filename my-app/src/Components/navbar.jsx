// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () =>{
//     return(
//         <>
// <div className="bg-black p-8">
// <div className="container mx-auto flex justify-between items-center">
//     <Link>
//     <Link to="/Login" className=" text-white  hover:text-blue-600 top-0">
//     profile
//     </Link>

//     </Link>
//     <div className="flex space-x-3">
//         <Link>
//         <Link to="/" className="text-green p-2 hover:text-blue-700">
//         home</Link>
//         <Link to="/Signup" className="text-green p-2 hover:text-blue-700">
//         signUp</Link>
//         <Link to="/Login" className="text-green p-2 hover:text-blue-700">
//         Login</Link>
//         {/* <Link to="/productCard" className="text-green p-2 hover:text-blue-700">
//         productcard</Link> */}
//         <Link to="/productform" className="text-green p-2 hover:text-blue-700">
//         prodcut from</Link>

//         </Link>
//     </div>
// </div>
// </div>
        
//         </>
//     )
// }
// export default Navbar;


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
                        <NavLink to="/Login" className="text-white hover:text-gray-400">Login</NavLink>
                        <NavLink to="/Signup" className="text-white hover:text-gray-400">Signup</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar