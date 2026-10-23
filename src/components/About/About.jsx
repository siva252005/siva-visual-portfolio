import React from 'react';
import about from '../../data/about';

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container about-container">
        {/* Two-Column Editorial Grid: Left Photo, Right Content */}
        <div className="about-grid">
          {/* Left Column: Portrait Photograph with Overlapping Visual Accent */}
          <div className="about-visual-column">
            <div className="about-image-layout">
              {/* Main Large Vertical Portrait (9:16) */}
              <div className="about-image-wrapper">
                <picture className="about-profile-picture">
                  {about.imageSrcSet ? (
                    <source
                      type="image/webp"
                      srcSet={about.imageSrcSet}
                      sizes={about.imageSizes || '(max-width: 640px) 340px, 340px'}
                    />
                  ) : about.imageWebp ? (
                    <source type="image/webp" srcSet={about.imageWebp} />
                  ) : null}
                  <img
                    src={about.image}
                    alt="Siva — visual artist and editor"
                    className="about-profile-img"
                    width="340"
                    height="604"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      if (!e.target.dataset.fallbackTried) {
                        e.target.dataset.fallbackTried = 'true';
                        e.target.src = '/assets/images/profile/1757828030248.jpg';
                      } else {
                        const target = e.currentTarget || e.target;
                        const parent = target.closest('picture') || target;
                        parent.style.display = 'none';
                      }
                    }}
                  />
                </picture>

                {/* Ambient Canvas Placeholder (visible if image unavailable) */}
                <div className="about-placeholder" aria-hidden="true">
                  <span className="about-placeholder-badge">SIVA · CREATIVE</span>
                  <span className="about-placeholder-title">VISUAL ARTIST</span>
                </div>

                {/* Creative Brand Lettering Overlay in Bottom-Left Corner */}
                <div className="about-photo-badge" aria-label="SIVA EDITS">
                  <span className="photo-badge-line1">SIVA</span>
                  <span className="photo-badge-line2">EDITS</span>
                  <span className="sr-only">SIVA EDITS</span>
                </div>
              </div>

              {/* Smaller Overlapping Portrait Image at Bottom-Right Corner */}
              <div className="about-image-overlap" aria-hidden="true">
                <picture className="about-overlap-picture">
                  {about.imageSrcSet ? (
                    <source
                      type="image/webp"
                      srcSet={about.imageSrcSet}
                      sizes={about.imageSizes || '(max-width: 640px) 340px, 340px'}
                    />
                  ) : about.imageWebp ? (
                    <source type="image/webp" srcSet={about.imageWebp} />
                  ) : null}
                  <img
                    src={about.image}
                    alt=""
                    className="about-overlap-img"
                    width="125"
                    height="222"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      if (!e.target.dataset.fallbackTried) {
                        e.target.dataset.fallbackTried = 'true';
                        e.target.src = '/assets/images/profile/1757828030248.jpg';
                      } else {
                        const target = e.currentTarget || e.target;
                        const parent = target.closest('picture') || target;
                        parent.style.display = 'none';
                      }
                    }}
                  />
                </picture>
              </div>
            </div>
          </div>

          {/* Right Column: Personal Story & Creative Journey */}
          <div className="about-content">
            <div className="eyebrow">
              <span className="badge-dot" aria-hidden="true"></span>
              <span>{about.eyebrow}</span>
            </div>

            <h2 className="about-title">
              {about.titlePart1} <span className="text-accent">{about.titleAccent}</span>
            </h2>

            <p className="about-intro">
              {about.introduction}
            </p>

            {/* Creative Journey Section */}
            <div className="about-journey-section">
              <div className="journey-header">
                <span className="journey-label">{about.journeyHeading}</span>
                <span className="journey-line" aria-hidden="true"></span>
              </div>

              <div className="journey-cards">
                {about.journey.map((item) => (
                  <div key={item.id} className="journey-card">
                    <div className="journey-card-top">
                      <span className="journey-number">{item.number}</span>
                      <h3 className="journey-title">{item.title}</h3>
                    </div>
                    <p className="journey-description">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Supporting Discipline Badges */}
            <div className="about-disciplines-row" aria-label="Core Creative Disciplines">
              {about.disciplines.map((item) => (
                <div key={item.label} className="discipline-badge">
                  {item.icon === 'camera' && (
                    <svg className="discipline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                      <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                  )}
                  {item.icon === 'wand' && (
                    <svg className="discipline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"></path>
                    </svg>
                  )}
                  {item.icon === 'video' && (
                    <svg className="discipline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="m9 8 7 4-7 4V8z"></path>
                    </svg>
                  )}
                  <span className="discipline-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Metadata Strip */}
        <div className="about-meta-strip" aria-label="Artist Metadata">
          <div className="meta-strip-item">
            <span className="meta-strip-label">LOCATION</span>
            <span className="meta-strip-value">{about.location}</span>
          </div>

          <div className="meta-strip-divider" aria-hidden="true"></div>

          <div className="meta-strip-item">
            <span className="meta-strip-label">FOCUS</span>
            <span className="meta-strip-value">PHOTO + VIDEO</span>
          </div>

          <div className="meta-strip-divider" aria-hidden="true"></div>

          <div className="meta-strip-item">
            <span className="meta-strip-label">STATUS</span>
            <span className="meta-strip-value status-active">
              <span className="status-live-dot" aria-hidden="true"></span>
              {about.availability}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

