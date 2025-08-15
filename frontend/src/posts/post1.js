import React from 'react';
import "../posts.css";
import satellitesImage from "../assets/satellites.jpg";


const Post = () => (
  <div className="main-container">
    <article className="blog-post-content">
      <h1>The Space Architecture Revolution</h1>
      <div className="post-metadata">
        <span className="date">May 29, 2025</span>
        <span className="author">By Space Explorer</span>
      </div>
      <div className="post-content">
        <p>Space architecture is undergoing a revolutionary transformation, reshaping how we think about human habitation beyond Earth. In this post, we'll explore the latest breakthroughs and their implications for future space missions.</p>

        <h2>Key Innovations in Space Architecture</h2>
        
        <p>Recent developments have brought us closer than ever to sustainable space habitation:</p>
        
        <ul>
          <li>Self-repairing habitat materials</li>
          <li>Advanced life support systems</li>
          <li>Artificial gravity solutions</li>
          <li>Expandable space structures</li>
        </ul>

        <h2>The Impact on Future Missions</h2>
        
        <p>These architectural innovations are not just theoretical - they're actively shaping upcoming space missions. NASA and private companies are already incorporating these designs into their plans for lunar and Martian habitats.</p>

        <p>Some key benefits include:</p>
        
        <ul>
          <li>Reduced construction time and costs</li>
          <li>Improved radiation protection</li>
          <li>Better psychological well-being for astronauts</li>
          <li>More efficient use of space and resources</li>
        </ul>

        <h2>Looking Ahead</h2>
        
        <p>As we continue to push the boundaries of space exploration, these architectural innovations will play a crucial role in establishing permanent human presence beyond Earth. The future of space architecture is not just about survival - it's about creating comfortable, sustainable homes among the stars.</p>
      </div>
    </article>
  </div>
);

// Add metadata for the post
Post.metadata = {
  id: 1,
  title: "The Space Architecture Revolution",
  date: "2025-05-29",
  author: "Space Explorer",
  excerpt: "Discover how revolutionary advances in space architecture are reshaping our approach to space exploration and habitation.",
  thumbnail: "/assets/satellites.jpg" // This will be mapped in BlogPost component
};

export default Post;
