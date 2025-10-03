import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/Posts.css';
import './components/Navigation.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import BlogPost from './components/BlogPost';
import BlogPostView from './components/BlogPostView';
import About from './components/About';
import Contact from './components/Contact';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or try again later.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading Component
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    <div>Loading...</div>
  </div>
);

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const { getPosts } = await import('./services/api');
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message || 'Failed to fetch posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array since we don't have any dependencies

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>Error loading posts</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content-wrapper">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={
                <>
                  <HeroSection />
                  <div className="blog-posts-container">
                    {posts.map(post => (
                      <BlogPost key={post.id} {...post} />
                    ))}
                  </div>
                </>
              } />
              <Route path="/blog" element={
                <div className="blog-posts-container">
                  {posts.map(post => (
                    <BlogPost key={post.id} {...post} />
                  ))}
                </div>
              } />
              <Route path="/post/:id" element={<BlogPostView posts={posts} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={
                <div className="not-found">
                  <h2>Page Not Found</h2>
                  <p>Sorry, the page you're looking for doesn't exist.</p>
                </div>
              } />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;