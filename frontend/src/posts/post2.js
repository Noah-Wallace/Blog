import React from 'react';
import "../posts.css";
import microservicesImg from "../assets/microservices.jpg";

const Post = () => (
  <div className="main-container">
    <article className="blog-post-content">
      <h1>Microservices in Space: The Future of Mission Control</h1>
      <div className="post-metadata">
        <span className="date">May 29, 2025</span>
        <span className="author">By Tech Explorer</span>
      </div>
      <div className="post-content">
        <p>The space industry is embracing microservices architecture to revolutionize how we control and manage space missions. This shift is transforming everything from ground control systems to onboard spacecraft software.</p>

        <h2>Why Microservices for Space?</h2>
        <p>Space missions require highly reliable, scalable, and maintainable software systems. Microservices architecture provides several key advantages:</p>
        <ul>
          <li>Independent deployment of mission-critical components</li>
          <li>Better fault isolation and system reliability</li>
          <li>Easier updates and maintenance of space systems</li>
          <li>Improved scalability for growing mission demands</li>
        </ul>

        <h2>Real-World Applications</h2>
        <p>Several space agencies and private companies are already implementing microservices:</p>
        <ul>
          <li>Mission control systems</li>
          <li>Satellite telemetry processing</li>
          <li>Space station operations</li>
          <li>Interplanetary communication networks</li>
        </ul>

        <p>The future of space exploration depends not just on rockets and spacecraft, but on the software architecture that controls them. Microservices are leading this software revolution in space.</p>
      </div>
    </article>
  </div>
);

// Add metadata for the post
Post.metadata = {
  id: 2,
  title: "Microservices in Space: The Future of Mission Control",
  date: "2025-05-29",
  author: "Tech Explorer",
  excerpt: "Discover how microservices architecture is revolutionizing space technology and mission control systems.",
  thumbnail: "/assets/microservices.jpg" // This will be mapped in BlogPost component
};

export default Post;
