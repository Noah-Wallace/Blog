import React from 'react';
import Post0 from './post0.js';
import Post1 from './post1.js';
import Post2 from './post2.js';

import './posts.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Function to get all posts with their metadata
export const getAllPosts = () => {
  const posts = [
    { ...Post0.metadata, Component: Post0 },
    { ...Post1.metadata, Component: Post1 },
    { ...Post2.metadata, Component: Post2 }
    { ...Post2.metadata, Component: Post2 }
  ];
  
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Function to get a post by ID
export const getPostById = (id) => {
  if (id === undefined || id === null) {
    console.error('getPostById called with invalid id:', id);
    return null;
  }

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    console.error('getPostById failed to parse id:', id);
    return null;
  }

  const posts = getAllPosts();
  const post = posts.find(post => post.id === parsedId);
  
  if (!post) {
    console.error('No post found with id:', parsedId);
    return null;
  }

  return post;
};

// Main posts page component
function MainP() {
  const posts = getAllPosts();

  return (
    <div className="main-container">
      <Navbar />
      <div className="content">
        <div className="blog-posts">
          {posts.map((post) => (
            <article key={post.id} className="blog-post">
              <div className="blog-post-content">
                <h2 className="blog-post-title">
                  <a href={`/post/${post.id}`}>{post.title}</a>
                </h2>
                <div className="post-metadata">
                  <span className="date">{post.date}</span>
                  <span className="author">{post.author}</span>
                </div>
                <p className="blog-post-excerpt">{post.excerpt}</p>
                <a href={`/post/${post.id}`} className="read-more-link">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainP;
