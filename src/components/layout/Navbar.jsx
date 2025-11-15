import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav shadow-sm">
      <div className="container nav-inner">
        <a href="#home" className="brand">
          Council<span className="brand-strong">Grad</span>
        </a>

        {/* Desktop Links */}
        <div className="nav-links hidden md:flex">
          <a href="#help">Help</a>
          <a href="#about">About</a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="menu toggle"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                open
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <a href="#help">Help</a>
          <a href="#about">About</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;