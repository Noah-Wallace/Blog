import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getAllPosts } from './posts';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BackToTop from './components/BackToTop';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorFallback from './components/ErrorFallback';
import './styles/critical.css';
import './styles/responsive.css';

const BlogPost = lazy(() => import('./components/BlogPost'));
const BlogPostView = lazy(() => import('./components/BlogPostView'));
const Footer = lazy(() => import('./components/Footer'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const Login = lazy(() => import('./components/Login'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = getAllPosts();
        setPosts(allPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={error} />;

  const [featuredPost, ...remainingPosts] = posts.length ? posts : [null];

  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/"
              element={
                <div className="main-container">
                  <Navbar />
                  <HeroSection />
                  <main className="content-wrapper">
                    <section className="posts">
                      <section className="posts-section1">
                        <h2 className="section-title1">Featured Post</h2>
                        <div className="featured-post">
                          {featuredPost ? (
                            <BlogPost {...featuredPost} />
                          ) : (
                            <p>No featured post available.</p>
                          )}
                        </div>
                      </section>
                      <section className="posts-section2">
                        <h2 className="section-title2">Latest Posts</h2>
                        <div className="posts-grid">
                          {remainingPosts.length > 0 ? (
                            remainingPosts.map(post => (
                              <BlogPost key={post.id} {...post} />
                            ))
                          ) : (
                            <p>No posts available.</p>
                          )}
                        </div>
                      </section>
                    </section>
                  </main>
                  <Footer />
                  <BackToTop />
                </div>
              }
            />
            <Route
              path="/post/:id"
              element={
                <>
                  <Navbar />
                  <BlogPostView />
                  <Footer />
                  <BackToTop />
                </>
              }
            />
            <Route path="/about" element={
              <>
                <Navbar />
                <About />
                <Footer />
                <BackToTop />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <>
                  <Navbar />
                  <AdminDashboard />
                  <Footer />
                  <BackToTop />
                </>
              }
            />
            <Route
              path="/contact"
              element={
                <>
                  <Navbar />
                  <Contact />
                  <Footer />
                  <BackToTop />
                </>
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
