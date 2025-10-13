import React, { useState } from "react";

const CollegeSearchSection = () => {
    // State to store search input
    const [searchQuery, setSearchQuery] = useState('');
    
    // Function to handle search
    const handleSearch = () => {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
      alert(`Searching for colleges: ${searchQuery}`);
    };
    
    return (
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2 className="text-3xl font-bold mb-8">
            Find Colleges That Fit Your Needs
          </h2>
          
          {/* Search Bar Container */}
          <div className="flex gap-4">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Tell us what you seek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 px-6 py-3 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            
            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Search
            </button>
          </div>
        </div>
      </section>
    );
  };

export default CollegeSearchSection;
