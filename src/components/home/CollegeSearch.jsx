import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
// College Search Section Component
const CollegeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
    alert(`Searching for colleges: ${searchQuery}`);
  };
  
  return (
    <section className="relative py-24 sm:py-32">
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 bg-red-500 ${i % 2 === 1 ? 'rotate-45' : ''} animate-pulse`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            Find Colleges That
            <br />
            <span className="text-red-600">Fit Your Needs</span>
          </h2>
        </div>
        
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-25 transition-opacity duration-500"></div>
          
          <div className="relative flex gap-4 bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
            <div className="flex items-center pl-4">
              <Search className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
            </div>
            
            <input
              type="text"
              placeholder="Tell us what you seek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-2 py-3 bg-transparent focus:outline-none text-gray-900 placeholder-gray-400"
            />
            
            <button
              onClick={handleSearch}
              className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold
                         hover:from-red-700 hover:to-orange-700
                         transform hover:scale-105
                         transition-all duration-300
                         shadow-[0_4px_15px_rgb(239,68,68,0.4)]"
            >
              <span className="relative">Search</span>
            </button>
          </div>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['Engineering', 'Medical', 'Business', 'Arts'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border-2 border-gray-200
                         hover:border-red-400 hover:bg-gradient-to-br hover:from-red-50 hover:to-orange-50
                         text-gray-700 hover:text-red-600 font-medium
                         transition-all duration-300 transform hover:scale-105
                         shadow-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollegeSearch;