import React from "react";

const Navbar = () => {
    return (
      <nav className="bg-white py-4 px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-semibold">
          CouncilGrad
        </div>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <a href="#page" className="text-gray-700 hover:text-gray-900">
            Page
          </a>
          <a href="#help" className="text-gray-700 hover:text-gray-900">
            Help
          </a>
          <a href="#about" className="text-gray-700 hover:text-gray-900">
            About
          </a>
          
          {/* Signup Button */}
          <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
            Signup
          </button>
        </div>
      </nav>
    );
  };


export default Navbar;