import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import './HeroSection.css'; // Assuming you have a CSS file for styling


function HeroSection() {
  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-container">
        <div className="hero-content">
          <main className="hero-main">
            <div className="hero-text-container">
              <div className="animated-title">
                <div className="text-top">
                  <div>
                    <span>Welcome to </span>
                    <span>My Space Tech</span>
                  </div>
                </div>
                <div className="text-bottom">
                  <div>Blog</div>
                </div>
              </div>
              <p className="hero-description">
                Exploring the frontiers of space technology, innovation, and the future of human exploration.
              </p>
              <div className="hero-buttons">
                <Link to="/post/0" className="cta-button primary">
                  Read Latest Post
                </Link>
                <Link to="/blog" className="cta-button secondary">
                  Explore Articles
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
