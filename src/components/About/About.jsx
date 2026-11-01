import React from 'react';
import about from '../../data/about';
import { scrollToSection } from '../../utils/scroll';

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

          {/* Right Column: Content & Editorial Flow */}
          <div className="about-content">
            {/* 1 & 2. Heading Group: Eyebrow + Section Title */}
            <div className="about-heading-group">
              <div className="eyebrow about-eyebrow">
                <span className="badge-dot" aria-hidden="true"></span>
                <span>{about.eyebrow}</span>
              </div>

              <h2 className="about-title">
                <span className="about-title-line">
                  {about.titlePart1} <span className="text-accent">{about.titleAccent1 || 'VISUAL'}</span>
                </span>
                <span className="about-title-line text-accent">
                  {about.titleAccent2 || 'STORYTELLER.'}
                </span>
              </h2>
            </div>

            {/* 3. Short Introduction Paragraph */}
            <p className="about-intro">
              {about.introduction}
            </p>

            {/* 4. Two CTA Buttons */}
            <div className="about-actions">
              <a
                href="#photo-editing"
                className="about-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#photo-editing');
                }}
              >
                <svg className="about-btn-icon" viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
                <span>View My Work</span>
              </a>

              <a
                href="#contact"
                className="about-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
              >
                <svg className="about-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15" aria-hidden="true">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Hire Me</span>
              </a>
            </div>

            {/* 5. Clean Three-Column Stats Row */}
            <div className="about-stats-row" role="region" aria-label="Experience Statistics">
              {about.stats.map((stat, idx) => (
                <div key={stat.id} className="about-stat-col">
                  {idx > 0 && <div className="about-stat-divider" aria-hidden="true"></div>}
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* 6. Services Section: 3 equal rectangular cards */}
            <div className="about-services-section">
              <div className="about-services-header">
                <span className="about-services-label">{about.servicesLabel || 'SERVICES'}</span>
                <span className="about-services-line" aria-hidden="true"></span>
              </div>
              <div className="about-services-grid" role="list" aria-label="Creative Services">
                {about.services.map((service) => (
                  <div key={service.id} className="about-service-card" role="listitem">
                    <div className="service-card-icon-wrap" aria-hidden="true">
                      {service.icon === 'camera' && (
                        <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                      )}
                      {(service.icon === 'image' || service.icon === 'sparkle') && (
                        <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      )}
                      {service.icon === 'video' && (
                        <svg className="service-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m22 8-6 4 6 4V8Z" />
                          <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                        </svg>
                      )}
                    </div>
                    <span className="service-card-title">{service.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Tools I Use Panel */}
            <div className="about-tools-section">
              <div className="about-tools-header">
                <span className="about-tools-label">{about.toolsHeading}</span>
                <span className="about-tools-line" aria-hidden="true"></span>
              </div>
              <div className="about-tools-panel" role="list" aria-label="Software Tools Used">
                {about.tools.map((tool, idx) => (
                  <React.Fragment key={tool.id}>
                    {idx > 0 && <div className="about-tool-sep" aria-hidden="true"></div>}
                    <div className="about-tool-item" role="listitem">
                      <div className="about-tool-icon-wrap" aria-hidden="true">
                        {tool.id === 'lightroom' && (
                          <svg className="about-tool-svg" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="6" fill="#001D26" stroke="#00BFAF" strokeWidth="1.2" />
                            <text x="14" y="19" fill="#00BFAF" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif" textAnchor="middle">Lr</text>
                          </svg>
                        )}
                        {tool.id === 'photoshop' && (
                          <svg className="about-tool-svg" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="6" fill="#001E36" stroke="#31A8FF" strokeWidth="1.2" />
                            <text x="14" y="19" fill="#31A8FF" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif" textAnchor="middle">Ps</text>
                          </svg>
                        )}
                        {tool.id === 'premiere' && (
                          <svg className="about-tool-svg" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="6" fill="#1E002B" stroke="#EA77FF" strokeWidth="1.2" />
                            <text x="14" y="19" fill="#EA77FF" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif" textAnchor="middle">Pr</text>
                          </svg>
                        )}
                        {tool.id === 'davinci' && (
                          <svg className="about-tool-svg" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="6" fill="#14181B" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
                            <circle cx="14" cy="9.5" r="2.8" fill="#E53935" />
                            <circle cx="18.5" cy="17" r="2.8" fill="#1E88E5" />
                            <circle cx="9.5" cy="17" r="2.8" fill="#FBC02D" />
                            <circle cx="14" cy="14" r="1.6" fill="#FFFFFF" opacity="0.8" />
                          </svg>
                        )}
                        {tool.id === 'capcut' && (
                          <svg className="about-tool-svg" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="6" fill="#0E1214" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
                            <path d="M7 9L14 13.5L21 9L21 12L14 16.5L7 12Z" fill="#FFFFFF" />
                            <path d="M7 19L14 14.5L21 19L21 16L14 11.5L7 16Z" fill="#00BFAF" />
                          </svg>
                        )}
                      </div>
                      <span className="about-tool-text">{tool.name}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 8. Compact Bottom Status Bar */}
        <div className="about-status-bar" aria-label="Location, Focus, and Availability Information">
          <div className="status-bar-group">
            <svg className="status-bar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="status-bar-text">{about.metaBar.location}</span>
          </div>

          <div className="status-bar-divider" aria-hidden="true"></div>

          <div className="status-bar-group">
            <svg className="status-bar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span className="status-bar-text">{about.metaBar.focus}</span>
          </div>

          <div className="status-bar-divider" aria-hidden="true"></div>

          <div className="status-bar-group">
            <span className="status-dot-indicator" aria-hidden="true"></span>
            <span className="status-bar-text">{about.metaBar.status}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
