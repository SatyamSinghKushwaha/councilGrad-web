import React from "react";

const HeroSection = () => {
    return (
      <section className="bg-gray-100 py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-gray-600 text-lg mb-8">
            Why wander through many doors, when your future opens here?
          </h1>
          
          {/* Start Button with Icon */}
          <button className="bg-white text-gray-700 px-8 py-3 rounded-full shadow-sm hover:shadow-md transition flex items-center gap-2 mx-auto">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            Start
          </button>
        </div>
      </section>
    );
  };

export default HeroSection;
