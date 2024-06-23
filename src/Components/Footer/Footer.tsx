import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div style={{ marginTop: "160px" }} className="footer-container">
      {/* <section className="footer-subscription">
          <p className="footer-subscription-heading">
            Join the Adventure newsletter to receive our best vacation deals
          </p>
          <p className="footer-subscription-text">
            You can unsubscribe at any time.
          </p>
          <div className="input-areas">
            <form>
              <input
                className="footer-input"
                name="email"
                type="email"
                placeholder="Your Email"
              />
              <Button>Subscribe</Button>
              <Button className="btn--outline"> </Button>
            </form>
          </div>
        </section> */}
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Home</h2>

            <Link to="/">TOP 5 Destinations</Link>
            <Link to="/">Most Views</Link>
            <Link to="/">About Us</Link>
          </div>
          <div className="footer-link-items">
            <h2>Destinations </h2>
            <Link to="/">Search Destinations</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Recommendation</h2>
            <Link to="/">Recommendation </Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div style={{ marginLeft: "60px" }} className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/">Information </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
