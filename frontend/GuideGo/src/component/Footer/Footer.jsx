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

            <a href="/">Home</a>
            <a href="/guides">Explore Guides</a>
            <a href="/about">Our Mission</a>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>

            <a href="/faq">FAQ</a>
            <a href="/become-guide">Become a Guide</a>
            <a href="/contact">Contact</a>
          </div>

          <div className="footer-column">
            <h3>Socials</h3>

            <a href="#">Instagram</a>
            <a href="#">GitHub</a>
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