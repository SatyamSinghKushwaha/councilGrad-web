import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <h3 className={styles.brand}>CouncilGrad</h3>
          <p className={styles.tagline}>
            Your trusted guide for choosing the right college.
          </p>
        </div>

        <div>
          <h4 className={styles.heading}>Explore</h4>
          <ul>
            <li>
              <Link to="/" onClick={scrollToTop}>
                Eligibility Checker
              </Link>
            </li>
            <li>
              <Link to="/college-courses" onClick={scrollToTop}>
                Colleges & Courses
              </Link>
            </li>
            <li>
              <Link to="/course-colleges" onClick={scrollToTop}>
                Find Colleges
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Company</h4>
          <ul>
            <li>
              <Link to="/about" onClick={scrollToTop}>
                About
              </Link>
            </li>
            <li>
              <Link to="/help" onClick={scrollToTop}>
                Help / FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Connect</h4>
          <div className={styles.socials}>
            <button type="button" aria-label="Twitter">
              <Twitter size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="LinkedIn">
              <Linkedin size={18} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Instagram">
              <Instagram size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        Copyright {new Date().getFullYear()} CouncilGrad - All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
