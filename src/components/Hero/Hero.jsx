import React, { useState, useEffect } from 'react';
import heroData from '../../data/hero';
import videos from '../../data/videos';
import { scrollToSection } from '../../utils/scroll';

function Hero() {
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  // Check if a working showreel video is available
  const showreelVideo = Array.isArray(videos) && videos.length > 0 ? videos[0] : null;
  const hasShowreel = Boolean(showreelVideo && showreelVideo.video);

  const handleOpenShowreel = (e) => {
    e.preventDefault();
    if (hasShowreel) {
      setIsShowreelOpen(true);
    } else {
      scrollToSection('#video');
    }
  };

  const handleCloseShowreel = () => {
    setIsShowreelOpen(false);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseShowreel();
      }
    };

    if (isShowreelOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isShowreelOpen]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-glow-bg" aria-hidden="true"></div>

      <div className="container hero-container">
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

            {/* Consistent 3-Tier Action Buttons */}
            <div className="hero-actions">
              <a
                href="#photo-editing"
                className="hero-btn hero-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '#photo-editing');
                  scrollToSection('#photo-editing', true);
                }}
              >
                View My Work
              </a>

              <a
                href="#contact"
                className="hero-btn hero-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, '', '#contact');
                  scrollToSection('#contact', true);
                }}
              >
                Hire Me
              </a>

              {hasShowreel && (
                <button
                  type="button"
                  className="hero-btn hero-btn-tertiary"
                  onClick={handleOpenShowreel}
                  aria-label={`Watch showreel video: ${showreelVideo.title}`}
                >
                  <span className="hero-btn-play-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
                      <polygon points="7,4 20,12 7,20" />
                    </svg>
                  </span>
                  <span>Watch Showreel</span>
                </button>
              )}
            </div>

            {/* Minimal Information Strip with Subtle Teal Slash Dividers */}
            <div className="hero-meta" role="region" aria-label="Key Highlights">
              <div className="hero-meta-strip">
                <span className="hero-meta-item">4+ YEARS</span>
                <span className="hero-meta-divider" aria-hidden="true">/</span>
                <span className="hero-meta-item">200+ VIDEOS</span>
                <span className="hero-meta-divider" aria-hidden="true">/</span>
                <span className="hero-meta-item">ALL TAMIL NADU</span>
              </div>
            </div>
          </div>

          {/* Editorial Visual Frame */}
          <div className="hero-visual-wrapper">
            <div className="hero-visual-card">
              <div className="hero-visual-frame">
                {/* Image slot with optimized responsive WebP and eager loading priority */}
                {heroData.heroImage ? (
                  <picture className="hero-visual-picture">
                    {heroData.heroImageSrcSet ? (
                      <source
                        type="image/webp"
                        srcSet={heroData.heroImageSrcSet}
                        sizes={heroData.heroImageSizes || '(max-width: 640px) 420px, (max-width: 1024px) 480px, 520px'}
                      />
                    ) : heroData.heroImageWebp ? (
                      <source type="image/webp" srcSet={heroData.heroImageWebp} />
                    ) : null}
                    <img
                      src={heroData.heroImage}
                      alt="Siva Creative Visual Showcase"
                      className="hero-visual-img"
                      width="480"
                      height="600"
                      loading="eager"
                      fetchpriority="high"
                      decoding="async"
                      onError={(e) => {
                        const target = e.currentTarget || e.target;
                        const parent = target.closest('picture') || target;
                        parent.style.display = 'none';
                      }}
                    />
                  </picture>
                ) : null}

                {/* Cinematic ambient framing overlay */}
                <div className="hero-visual-overlay"></div>

                {/* Available for Projects Badge */}
                <div className="hero-visual-badge">
                  <span className="hero-visual-badge-dot" aria-hidden="true"></span>
                  <span>{heroData.badgeText || "Available for Projects"}</span>
                </div>

                {/* Editorial Canvas Elements */}
                <div className="hero-visual-placeholder">
                  <div className="hero-visual-caption-box">
                    <span className="hero-visual-tag">{heroData.captionTag || "Cinematic Grading & Editing"}</span>
                    <span className="hero-visual-subtag">{heroData.captionSubtag || "Color · Frame · Rhythm"}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Centered Bottom Scroll Indicator positioned safely below content */}
        <div className="hero-scroll-container">
          <a
            href="#photo-editing"
            className="hero-scroll"
            aria-label="Scroll down to photo editing"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '#photo-editing');
              scrollToSection('#photo-editing', true);
            }}
          >
            <span className="hero-scroll-text">SCROLL</span>
            <span className="hero-scroll-icon" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* Video Modal for Showreel */}
      {isShowreelOpen && showreelVideo && (
        <div
          className="video-modal-backdrop"
          onClick={handleCloseShowreel}
          role="dialog"
          aria-modal="true"
          aria-label="Showreel Video Player"
        >
          <button
            type="button"
            className="video-modal-close-btn"
            onClick={handleCloseShowreel}
            aria-label="Close showreel video"
          >
            ✕
          </button>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-player-wrapper">
              <video
                src={showreelVideo.video}
                className="video-modal-player"
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
