import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UnifiedBackground from "./components/common/UnifiedBackground/UnifiedBackground";
import Navbar from "./components/layout/Navbar/Navbar";
import HeroSection from "./components/home/HeroSection/HeroSection";
import Reviews from "./components/home/Reviews/Reviews";
import Footer from "./components/layout/Footer/Footer";
import EligibleCollegesPage from "./components/pages/EligibleCollegesPage/EligibleCollegesPage";

import CollegeCoursesPage from "./components/pages/CollegeCoursesPage";
import CourseCollegesPage from "./components/pages/CourseCollegesPage";
import SpecializationsExplorerPage from "./components/pages/SpecializationsExplorerPage";

import HelpPage from "./components/pages/HelpPage/HelpPage";
import AboutPage from "./components/pages/AboutPage/AboutPage";

import "./styles/global.css";

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

            {/* NEW PAGES */}
            <Route path="/college-courses" element={<CollegeCoursesPage />} />
            <Route path="/course-colleges" element={<CourseCollegesPage />} />
            <Route
              path="/specializations"
              element={<SpecializationsExplorerPage />}
            />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
