import React from 'react';
import { Link } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';
import './BlogPost.css';

// Import images
import spaceBg from '../assets/space-bg.jpg';
import satellites from '../assets/satellites.jpg';
import microservices from '../assets/microservices.jpg';

// Image mapping
const imageMap = {
  '/assets/space-bg.jpg': spaceBg,
  '/assets/satellites.jpg': satellites,
  '/assets/microservices.jpg': microservices
};

const BlogPost = ({ 
  id, 
  title, 
  date, 
  author, 
  excerpt, 
  thumbnail, 
  Component,
  featured 
}) => {
  const imageUrl = imageMap[thumbnail] || spaceBg;
  const postClassName = `blog-post ${featured ? 'featured-post' : ''}`;

  return (
    <article className={postClassName}>
      <div className="blog-post-content">
        <div className="blog-post-image">
          <Link to={`/post/${id}`}>
            <ResponsiveImage 
              src={imageUrl} 
              alt={title}
              sizes={featured ? 
                "(max-width: 480px) 100vw, (max-width: 768px) 90vw, 80vw" : 
                "(max-width: 480px) 100vw, (max-width: 768px) 45vw, 30vw"
              }
            />
          </Link>
        </div>
        <div className="blog-post-text">
          <h2 className="blog-post-title">
            <Link to={`/post/${id}`}>{title}</Link>
          </h2>
          <div className="blog-post-metadata">
            <span className="date">{date}</span>
            <span className="author">{author}</span>
          </div>
          <p className="blog-post-excerpt">
            {featured ? excerpt : excerpt.slice(0, 120) + '...'}
          </p>
          <Link 
            to={`/post/${id}`} 
            className="read-more-link"
            role="button"
            aria-label={`Read more about ${title}`}
          >
            Read More 
            <span className="read-more-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
