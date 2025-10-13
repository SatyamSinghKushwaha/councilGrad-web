import React from 'react'
import Navbar from './components/layout/Navbar';
import HeroSection from "./components/home/HeroSection";
import Reviews from "./components/home/Reviews";
import CollegeSearch from "./components/home/CollegeSearch";
import Footer from "./components/layout/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <Navbar />
      <HeroSection/>
      <Reviews/>
      <CollegeSearch/>
      <Footer/>
    </div>
  );
};

export default App;

