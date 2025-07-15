import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './components/Posts.css';

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

  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </nav>

          {error ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h2>Connection Error</h2>
              <p>Unable to connect to the server: {error}</p>
              <button onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home posts={posts} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/post/:id" element={<BlogPost posts={posts} />} />
            </Routes>
          )}
        </div>
      </Router>
    </ErrorBoundary>
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
const Home = ({ posts }) => {
  if (!posts || !Array.isArray(posts)) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>No posts available.</p>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <h1>Latest Posts</h1>
      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-image">
              <img src={post.imageUrl} alt={post.title} />
            </div>
            <div className="post-content">
              <h2>{post.title}</h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="post-meta">
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                <span className="post-author">By {post.author}</span>
              </div>
              <a href={`/post/${post.id}`} className="read-more">Read More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

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