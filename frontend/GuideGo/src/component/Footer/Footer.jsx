import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-logo">
          <span className="logo-white">Guide</span>
          <span className="logo-orange">GO</span>
        </div>

        <div className="footer-grid">

          <div className="footer-column">
            <h3>Quick Links</h3>

            <NavLink to="/">Home</NavLink>
            <NavLink to="/guides">Explore Guides</NavLink>
            <NavLink to="/about">Our Mission</NavLink>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>

            <NavLink to="/faq">FAQ</NavLink>
            <NavLink to="/become-guide">Become a Guide</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          <div className="footer-column">
            <h3>Socials</h3>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>

          <div className="subscribe">

            <h3>Subscribe</h3>

            <div className="email-row">
              <label htmlFor="email">Email:</label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="checkbox-row">
              <input
                id="agree"
                type="checkbox"
              />

              <label htmlFor="agree">
                By subscribing, you agree to our privacy policy and consent to
                receive updates from GuideGo.
              </label>
            </div>

          </div>

        </div>

        <div className="footer-bottom">
          © 2026 GuideGo. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;