import React from 'react';
import heroData from '../../data/hero';
import { scrollToSection } from '../../utils/scroll';

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-glow-bg" aria-hidden="true"></div>
      
      <div className="container">
        <div className="hero-grid">
          {/* Editorial Text Content */}
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-line" aria-hidden="true"></span>
              <span>{heroData.eyebrow}</span>
            </div>

            <h1 className="hero-title">
              {heroData.titlePart1}<br />
              {heroData.titlePart2}<br />
              <span className="text-accent text-glow">{heroData.titleAccent}</span>
            </h1>

            <p className="hero-description">
              {heroData.description}
            </p>

            <div className="hero-actions">
              <a
                href="#photo-editing"
                className="btn btn-primary btn-lg"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#photo-editing');
                }}
              >
                VIEW MY WORK
              </a>
              <a
                href="#video"
                className="btn btn-secondary btn-lg"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#video');
                }}
              >
                WATCH SHOWREEL
              </a>
            </div>

            <div className="hero-meta">
              <span className="hero-meta-item">{heroData.metaItem1}</span>
              <span className="hero-meta-divider">/</span>
              <span className="hero-meta-item">{heroData.metaItem2}</span>
            </div>
          </div>

          {/* Editorial Visual Frame */}
          <div className="hero-visual-wrapper">
            <div className="hero-visual-card">
              <div className="hero-visual-frame">
                {/* Image slot ready for assets/images/hero/ - renders only when asset is connected */}
                {heroData.heroImage ? (
                  <img
                    src={heroData.heroImage}
                    alt="Siva Creative Visual Showcase"
                    className="hero-visual-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : null}
                
                {/* Cinematic ambient framing overlay */}
                <div className="hero-visual-overlay"></div>
                
                {/* Editorial Canvas Placeholder Elements (visible until image loaded) */}
                <div className="hero-visual-placeholder">
                  <div className="hero-visual-badge">
                    <span className="hero-visual-badge-dot"></span>
                    <span>{heroData.archiveBadge}</span>
                  </div>
                  <div className="hero-visual-center-text">
                    <span className="hero-visual-tag">{heroData.canvasTag}</span>
                    <span className="hero-visual-subtag">{heroData.canvasSubtag}</span>
                  </div>
                </div>

                {/* Editorial Corner Crosshairs */}
                <span className="hero-corner hero-corner-tl" aria-hidden="true"></span>
                <span className="hero-corner hero-corner-tr" aria-hidden="true"></span>
                <span className="hero-corner hero-corner-bl" aria-hidden="true"></span>
                <span className="hero-corner hero-corner-br" aria-hidden="true"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#photo-editing"
        className="hero-scroll"
        aria-label="Scroll to photo editing"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection('#photo-editing');
        }}
      >
        <span className="hero-scroll-text">SCROLL</span>
        <span className="hero-scroll-icon" aria-hidden="true">↓</span>
      </a>
    </section>
  );
}

export default Hero;

