import React from "react";
import { Facebook, Youtube, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
    return (
      <footer className="bg-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Social Icons */}
            <div>
              <h3 className="text-xl font-semibold mb-4">CouncilGrad</h3>
              
              {/* Social Media Icons */}
              <div className="flex gap-4">
                <a href="#facebook" className="text-gray-600 hover:text-gray-900">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#youtube" className="text-gray-600 hover:text-gray-900">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#linkedin" className="text-gray-600 hover:text-gray-900">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#instagram" className="text-gray-600 hover:text-gray-900">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Explore Links */}
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#page" className="text-gray-600 hover:text-gray-900">Page</a></li>
                <li><a href="#page" className="text-gray-600 hover:text-gray-900">Page</a></li>
                <li><a href="#page" className="text-gray-600 hover:text-gray-900">Page</a></li>
              </ul>
            </div>
            
            {/* Resources Links */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#page" className="text-gray-600 hover:text-gray-900">Page</a></li>
                <li><a href="#page" className="text-gray-600 hover:text-gray-900">Page</a></li>
                <li><a href="#page" className="text-gray-600 hover:text-gray-900">Page</a></li>
              </ul>
            </div>
            
            {/* Support Links */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#page" className="text-gray-600 hover:text-gray-900">Page</a></li>
                <li><a href="#page" className="text-gray-600 hover:text-gray-900">Page</a></li>
                <li><a href="#page" className="text-gray-600 hover:text-gray-900">Page</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;