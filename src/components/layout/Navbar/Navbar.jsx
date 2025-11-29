import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.siteNav}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.brand}>
          Council<span className={styles.brandStrong}>Grad</span>
        </Link>

        {/* Desktop Links */}
        <div className={`hidden md:flex items-center gap-6 ${styles.navLinks}`}>
          <Link to="/college-courses" className={styles.navLink}>
            College → Courses
          </Link>
          <Link to="/course-colleges" className={styles.navLink}>
            Course → Colleges
          </Link>
          <Link to="/specializations" className={styles.navLink}>
            Specializations
          </Link>
          <Link to="/help" className={styles.navLink}>
            Help
          </Link>
          <Link to="/about" className={styles.navLink}>
            About
          </Link>
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
        <div className={`${styles.mobileMenu} md:hidden text-gray-700`}>
          <Link to="/college-courses" onClick={() => setOpen(false)}>
            College → Courses
          </Link>
          <Link to="/course-colleges" onClick={() => setOpen(false)}>
            Course → Colleges
          </Link>
          <Link to="/specializations" onClick={() => setOpen(false)}>
            Specializations
          </Link>
          <Link to="/help" onClick={() => setOpen(false)}>
            Help
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
