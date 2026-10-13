import React from 'react';
import footer from '../../data/footer';
import { scrollToSection } from '../../utils/scroll';

function Footer({ onNavigate }) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLinkClick = (e, href) => {
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

  return (
    <footer className="footer-section" role="contentinfo">
      <div className="container">
        {/* Main Footer Multi-Column Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Identity */}
          <div className="footer-brand-column">
            <a
              href="#home"
              className="footer-logo"
              aria-label="SIVA - Back to Home"
              onClick={(e) => handleLinkClick(e, '#home')}
            >
              SIVA<span className="navbar-logo-dot">.</span>
            </a>
            <p className="footer-tagline">
              {footer.tagline}
            </p>
            <p className="footer-statement">
              “{footer.statement}”
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-nav-column">
            <h4 className="footer-column-heading">EXPLORE</h4>
            <nav className="footer-nav-links" aria-label="Footer Navigation">
              {footer.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="footer-nav-link"
                  onClick={(e) => handleLinkClick(e, item.href)}
                >
                  <span className="footer-link-bullet" aria-hidden="true">/</span>
                  <span className="footer-link-text">{item.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Availability & Location */}
          <div className="footer-meta-column">
            <div className="footer-meta-block">
              <h4 className="footer-column-heading">STATUS</h4>
              <div className="footer-status-badge">
                <span className="footer-status-dot" aria-hidden="true"></span>
                <span className="footer-status-text">{footer.availability}</span>
              </div>
            </div>

            <div className="footer-meta-block">
              <h4 className="footer-column-heading">LOCATION</h4>
              <span className="footer-meta-value">{footer.location}</span>
            </div>
          </div>
        </div>

        {/* Full-Width Editorial Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            {footer.copyright}
          </p>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="footer-back-to-top"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <span className="top-arrow" aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
