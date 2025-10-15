import React, { useEffect, useState } from "react";
import { Facebook, Youtube, Linkedin, Instagram } from "lucide-react";

// Footer Component
const Footer = () => {
  return (
    <footer className="relative bg-gray-900/95 backdrop-blur-md text-white py-12">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              CouncilGrad
            </h3>
            
            <div className="flex gap-4">
              <a href="#facebook" className="p-2 rounded-lg bg-white/5 hover:bg-gradient-to-br hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-300 hover:scale-110">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300" />
              </a>
              <a href="#youtube" className="p-2 rounded-lg bg-white/5 hover:bg-gradient-to-br hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-300 hover:scale-110">
                <Youtube className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300" />
              </a>
              <a href="#linkedin" className="p-2 rounded-lg bg-white/5 hover:bg-gradient-to-br hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300" />
              </a>
              <a href="#instagram" className="p-2 rounded-lg bg-white/5 hover:bg-gradient-to-br hover:from-red-500/20 hover:to-orange-500/20 transition-all duration-300 hover:scale-110">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Explore</h4>
            <ul className="space-y-3">
              <li><a href="#page" className="text-gray-400 hover:text-white transition-colors duration-300">Page</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#page" className="text-gray-400 hover:text-white transition-colors duration-300">Page</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-3">
              <li><a href="#page" className="text-gray-400 hover:text-white transition-colors duration-300">Page</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} CouncilGrad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;