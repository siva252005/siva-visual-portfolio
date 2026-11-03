import React, { useState, useEffect } from 'react';
import { scrollToSection } from '../../utils/scroll';

function Navbar({ onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Don't track homepage scroll when on a project page
      if (window.location.pathname.startsWith('/project/')) return;

      // When near top of page, always mark #home active
      if (window.scrollY < 180) {
        setActiveSection('#home');
        return;
      }

      // When near bottom of page, mark #contact active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('#contact');
        return;
      }

      const sectionIds = [
        'home',
        'photo-editing',
        'before-after',
        'video',
        'process',
        'about',
        'contact'
      ];

      const scrollPos = window.scrollY + 160;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(`#${sectionIds[i]}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile drawer on Escape key or viewport resize beyond mobile/tablet
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

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
      setActiveSection(href);
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
              className={`nav-link ${activeSection === link.href ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, link.href)}
              aria-current={activeSection === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Hamburger Toggle Button */}
        <div className="navbar-right">
          <a
            href="#contact"
            className="navbar-hire-btn"
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            Hire Me
          </a>

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
              className={`mobile-nav-link ${activeSection === link.href ? 'active' : ''}`}
              onClick={(e) => handleLinkClick(e, link.href)}
              aria-current={activeSection === link.href ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-nav-hire-btn"
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
