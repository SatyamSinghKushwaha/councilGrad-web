
import React from 'react';
import UnifiedBackground from './components/common/UnifiedBackground';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/home/HeroSection';
import Reviews from './components/home/Reviews';
import Footer from './components/layout/Footer';
import './styles/global.css';


const App = () => (
<div className="app-root">
<UnifiedBackground />
<div className="content">
<Navbar />
<HeroSection />
<Reviews />
<Footer />
</div>
</div>
);


export default App;