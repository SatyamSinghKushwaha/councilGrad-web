import React from "react";
import { Facebook, Youtube, Linkedin, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="site-footer">
    <div className="container grid-cols">
      <div>
        <h3 className="logo">CouncilGrad</h3>
        <p className="footer-tagline">
          Guiding students toward the right colleges with clarity & confidence.
        </p>

        <div className="socials">
          <a href="#"><Facebook /></a>
          <a href="#"><Youtube /></a>
          <a href="#"><Linkedin /></a>
          <a href="#"><Instagram /></a>
        </div>
      </div>

      <nav>
        <h4>Help</h4>
        <ul>
          <li><a href="#help">Help Center</a></li>
          <li><a href="#help">FAQs</a></li>
        </ul>
      </nav>

      <nav>
        <h4>About</h4>
        <ul>
          <li><a href="#about">Our Story</a></li>
          <li><a href="#about">Mission</a></li>
        </ul>
      </nav>

      <nav>
        <h4>Connect</h4>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">LinkedIn</a></li>
        </ul>
      </nav>
    </div>

    <div className="copyright">
      © {new Date().getFullYear()} CouncilGrad. All rights reserved.
    </div>
  </footer>
);

export default Footer;