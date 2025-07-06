import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="about-overlay"></div>
        <h1 className="about-title">About Space Tech Blog</h1>
      </div>
      
      <div className="about-content">
        <section className="about-section mission">
          <h2>Our Mission</h2>
          <p>Exploring the frontiers of space technology and sharing groundbreaking discoveries in space exploration, satellite technology, and future space innovations.</p>
        </section>

        <section className="about-section vision">
          <div className="vision-grid">
            <div className="vision-card">
              <h3>Exploration</h3>
              <p>Covering the latest developments in space exploration, from Mars missions to deep space discoveries.</p>
            </div>
            <div className="vision-card">
              <h3>Innovation</h3>
              <p>Highlighting cutting-edge space technologies and their impact on our future.</p>
            </div>
            <div className="vision-card">
              <h3>Education</h3>
              <p>Making space science accessible and engaging for everyone.</p>
            </div>
          </div>
        </section>

        <section className="about-section team">
          <h2>Behind the Blog</h2>
          <div className="team-content">
            <p>We are a passionate team of space enthusiasts, scientists, and tech writers dedicated to bringing you the most exciting developments in space technology.</p>
          </div>
        </section>

        <section className="about-section contact">
          <h2>Get in Touch</h2>
          <p>Have questions or suggestions? We'd love to hear from you!</p>
          <div className="contact-links">
            <a href="mailto:contact@spacetech.blog" className="contact-button">Email Us</a>
            <a href="https://twitter.com/spacetechblog" className="contact-button">Follow on Twitter</a>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
