import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../../utils/scroll';

function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (e, href) => {
    closeMobileMenu();

    if (window.location.pathname.startsWith('/project/')) {
      e.preventDefault();
      const targetPath = href.startsWith('#') ? `/${href}` : href;
      if (onNavigate) {
        onNavigate(targetPath);
      } else {
        window.history.pushState({}, '', targetPath);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      scrollToSection(href, true);
    }
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Photo Editing', href: '#photo-editing' },
    { label: 'Before & After', href: '#before-after' },
    { label: 'Video Editing', href: '#video' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => handleLinkClick(e, '#home')}
        >
          SIVA<span className="navbar-logo-dot">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-nav ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="mobile-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-nav-link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
