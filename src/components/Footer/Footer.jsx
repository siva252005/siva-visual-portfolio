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
          {/* Column 1: Brand & Statement */}
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

          {/* Column 3: Connect & Availability */}
          <div className="footer-meta-column">
            {/* Direct Connect Links */}
            <div className="footer-meta-block">
              <h4 className="footer-column-heading">CONNECT</h4>
              <div className="footer-connect-links">
                {footer.connect.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target={item.id === 'email' ? undefined : '_blank'}
                    rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
                    className={`footer-connect-link footer-connect-${item.id}`}
                    aria-label={`Connect on ${item.label}`}
                  >
                    <span className="footer-connect-icon" aria-hidden="true">
                      {item.id === 'whatsapp' && (
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      )}
                      {item.id === 'instagram' && (
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                      )}
                      {item.id === 'email' && (
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      )}
                    </span>
                    <span className="footer-connect-label">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Standardized Status */}
            <div className="footer-meta-block">
              <h4 className="footer-column-heading">STATUS</h4>
              <div className="footer-status-badge">
                <span className="footer-status-dot" aria-hidden="true"></span>
                <span className="footer-status-text">{footer.availability}</span>
              </div>
            </div>

            {/* Standardized Location */}
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
