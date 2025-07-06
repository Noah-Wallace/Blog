import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import navLogo from '../assets/nav.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-wrapper">
          <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
            <img src={navLogo} alt="Blog Logo" className="navbar-logo-img" />
            <h3 className='navbar-logo-text'>Chronicles of the Cosmos</h3>
          </Link>
          
          <button 
            className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="navbar-link" onClick={handleLinkClick}>Home</Link>
            <Link to="/blog" className="navbar-link" onClick={handleLinkClick}>Blog</Link>
            <Link to="/about" className="navbar-link" onClick={handleLinkClick}>About</Link>
            <Link to="/contact" className="navbar-link" onClick={handleLinkClick}>Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
