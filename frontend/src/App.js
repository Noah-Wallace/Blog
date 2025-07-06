import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { getAllPosts } from './posts';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import BackToTop from './components/BackToTop';
import LoadingSpinner from './components/LoadingSpinner';
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
  const posts = getAllPosts();
  const [featuredPost, ...remainingPosts] = posts;

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={
          <div className="main-container">
            <Navbar />
            <HeroSection />
            <main className="content-wrapper">
              <section className="posts">
                <section className="posts-section1">
                <h2 className="section-title1">Featured Post</h2>
                <div className="featured-post">
                  <BlogPost {...featuredPost} />
                </div>
                </section>
                <section className="posts-section2">
                  <h2 className="section-title2">Latest Posts</h2>
                  <div className="posts-grid">
                    {remainingPosts.map(post => (
                      <BlogPost key={post.id} {...post} />
                    ))}
                  </div>
                </section>
              </section>
            </main>
            <Footer />
            <BackToTop />
          </div>
        } />
        <Route path="/post/:id" element={
          <>
            <BlogPostView />
            <BackToTop />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar />
            <About />
            <Footer />
            <BackToTop />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <>
            <Navbar />
            <AdminDashboard />
            <Footer />
            <BackToTop />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Navbar />
            <Contact />
            <Footer />
            <BackToTop />
          </>
        } />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
