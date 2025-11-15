import React, { useState } from "react";
import EligibilityFormModal from "../common/EligibilityFormModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="hero relative flex items-center justify-center text-center min-h-screen overflow-hidden">
      {/* Hero content */}
      <div className="container relative z-10 px-6">
        <h1 className="hero-heading text-4xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-sm">
          Empowering Students to Discover Their Ideal Colleges
        </h1>

        <p className="hero-subtext mt-4 text-lg md:text-xl text-gray-800/90 max-w-2xl mx-auto leading-relaxed">
          Find out where your marks can take you — instantly and effortlessly.
        </p>

        <div className="mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="hero-btn inline-flex items-center px-8 py-3 text-lg font-semibold rounded-full shadow-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 hover:shadow-xl transition-transform"
          >
            Check Your Eligibility
          </button>
        </div>
      </div>

      {/* Optional: subtle overlay for better contrast on light background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/20 backdrop-blur-[1px] z-0"></div>

      {isModalOpen && (
        <EligibilityFormModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
};

export default HeroSection;
