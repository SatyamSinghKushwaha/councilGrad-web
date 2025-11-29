import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
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
              <Link to="/eligible">Eligible Colleges</Link>
            </li>
            <li>
              <Link to="/college-courses">College Courses</Link>
            </li>
            <li>
              <Link to="/course-colleges">Colleges by Course</Link>
            </li>
            <li>
              <Link to="/specializations">Specializations</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Company</h4>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/help">Help / FAQ</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className={styles.heading}>Connect</h4>
          <div className={styles.socials}>
            <a href="#">
              <i className="ri-twitter-line"></i>
            </a>
            <a href="#">
              <i className="ri-linkedin-fill"></i>
            </a>
            <a href="#">
              <i className="ri-instagram-line"></i>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} CouncilGrad — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
