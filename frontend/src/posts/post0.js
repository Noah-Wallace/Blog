import React from 'react';
import "../posts.css";

function Post() {
  return (
    <div className="post-content">
      <p>As humanity ventures further into space, the question of how we'll live among the stars becomes increasingly relevant. Today, we'll explore the fascinating world of space architecture and the innovative solutions being developed for future space habitats.</p>
      
      <p>Space architecture combines cutting-edge engineering with human-centric design to create environments that not only protect against the harsh conditions of space but also provide comfortable living spaces for long-term habitation.</p>
      
      <p>Key innovations in space habitat design include:</p>
      <ul>
        <li>Radiation shielding using advanced materials</li>
        <li>Artificial gravity systems for long-term health</li>
        <li>Closed-loop life support systems</li>
        <li>Modular construction methods</li>
        <li>Psychological well-being considerations</li>
      </ul>

      <p>These developments aren't just science fiction anymore—they're becoming reality as private companies and space agencies work together to establish permanent human presence beyond Earth.</p>
    </div>
  );
}

Post.metadata = {
  id: 0,
  title: "Living Among the Stars: The Future of Space Habitats",
  date: "2025-05-29",
  author: "Space Explorer",
  excerpt: "Explore the cutting-edge innovations in space architecture and how they're shaping our future among the stars.",
  thumbnail: "/assets/space-bg.jpg" // This will be mapped in BlogPost component
};

export default Post;
