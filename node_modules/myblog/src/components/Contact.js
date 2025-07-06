import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus({ submitting: false, submitted: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 3000);
    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: error.message });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <div className="contact-overlay"></div>
        <h1 className="contact-title">Contact Us</h1>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Email</h3>
            <p>contact@spacetech.blog</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🌍</div>
            <h3>Social Media</h3>
            <div className="social-links">
              <a href="https://twitter.com/spacetechblog" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com/company/spacetechblog" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Location</h3>
            <p>Space Tech Innovation Hub</p>
          </div>
        </div>

        {status.submitted && (
          <div className="success-message">
            Thanks for your message! We'll get back to you soon.
          </div>
        )}
        {status.error && (
          <div className="error-message">
            {status.error}
          </div>
        )}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What's this about?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message..."
              rows="6"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Send Message
            <span className="button-glow"></span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
