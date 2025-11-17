
// import React from 'react';
// import UnifiedBackground from './components/common/UnifiedBackground';
// import Navbar from './components/layout/Navbar';
// import HeroSection from './components/home/HeroSection';
// import Reviews from './components/home/Reviews';
// import Footer from './components/layout/Footer';
// import './styles/global.css';


// const App = () => (
// <div className="app-root">
// <UnifiedBackground />
// <div className="content">
// <Navbar />
// <HeroSection />
// <Reviews />
// <Footer />
// </div>
// </div>
// );


// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UnifiedBackground from "./components/common/UnifiedBackground";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/home/HeroSection";
import Reviews from "./components/home/Reviews";
import Footer from "./components/layout/Footer";
import EligibleCollegesPage from "./components/pages/EligibleCollegesPage";
import './styles/global.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-root">
        <UnifiedBackground />

        <div className="content relative z-10">
          <Navbar />

          <Routes>
            {/* HOME PAGE */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <Reviews />
                </>
              }
            />

            {/* ELIGIBLE COLLEGES RESULT PAGE */}
            <Route path="/eligible" element={<EligibleCollegesPage />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
