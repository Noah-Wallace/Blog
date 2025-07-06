import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, getAllPosts } from '../posts';
import Navbar from './Navbar';
import Footer from './Footer';
import Engagement from './Engagement';
import { Helmet } from 'react-helmet';
import '../posts/posts.css';

function BlogPostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Debug information
  useEffect(() => {
    console.log('URL Parameter ID:', id);
    console.log('All Posts:', getAllPosts());
  }, [id]);

  const post = getPostById(id);
  console.log('Found Post:', post);

  if (!post) {
    return (
      <div className="main-container">
        <Navbar />
        <div className="blog-post-content">
          <h1>Post Not Found</h1>
          <p>Sorry, the post you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')} 
            className="cta-button"
            style={{ marginTop: '1rem' }}
          >
            Return to Home
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const PostComponent = post.Component;

  return (
    <>
      <Helmet>
        <title>{post.title} | Space Tech Blog</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Space Tech Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <link rel="icon" type="image/png" sizes="32x32" href="/sparkles.png" />
      </Helmet>
      <div className="main-container">
        <Navbar />
        <main className="content">
          <article className="blog-post-content">
            <header>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-metadata">
                <span className="date">{post.date}</span>
                <span className="author">{post.author}</span>
              </div>
            </header>
            <div className="post-content">
              <PostComponent />
            </div>
            <Engagement postId={id} />
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default BlogPostView;
