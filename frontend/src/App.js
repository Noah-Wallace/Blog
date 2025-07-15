import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

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

  // API URL from environment variable
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${API_URL}/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [API_URL]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Connection Error</h2>
        <p>Unable to connect to the server: {error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Space Tech Blog</h1>
            <nav>
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </nav>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Home posts={posts} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer>
            <p>&copy; 2024 Space Tech Blog</p>
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

// Home Component
const Home = ({ posts }) => (
  <div>
    <h2>Latest Posts</h2>
    {!Array.isArray(posts) || posts.length === 0 ? (
      <p>No posts available.</p>
    ) : (
      posts.map(post => (
        <div key={post.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <a href={`/post/${post.id}`}>Read More</a>
        </div>
      ))
    )}
  </div>
);

// About Component
const About = () => (
  <div>
    <h2>About</h2>
    <p>Welcome to our Space Tech Blog!</p>
  </div>
);

// Contact Component
const Contact = () => (
  <div>
    <h2>Contact</h2>
    <p>Get in touch with us!</p>
  </div>
);

// Post Detail Component
const PostDetail = () => (
  <div>
    <h2>Post Details</h2>
    <p>Post content will be displayed here.</p>
  </div>
);

// Not Found Component
const NotFound = () => (
  <div>
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
  </div>
);

export default App;