import React from 'react';
import { featuredProjects } from '../../data/featuredWork';

function FeaturedWork({ onNavigate }) {
  const handleProjectClick = (e, slug) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/project/${slug}`);
    } else {
      window.history.pushState({}, '', `/project/${slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <section id="work" className="section featured-work-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <span>SELECTED PROJECTS</span>
          </div>
          <h2 className="section-title">
            SELECTED <span className="text-accent">WORK.</span>
          </h2>
          <p className="section-subtitle">
            A curated collection of portrait photography, creative photo manipulation, travel visuals, and cinematic video edits.
          </p>
        </div>

        {/* Responsive 4-Column Project Grid */}
        <div className="featured-grid">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="featured-card"
            >
              {/* Visual Media Frame Link */}
              <a
                href={`/project/${project.slug}`}
                onClick={(e) => handleProjectClick(e, project.slug)}
                className="featured-media-link"
                aria-label={`View ${project.title} case study`}
              >
                <div className="featured-media-wrapper">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="featured-media-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    /* Ambient Visual Placeholder Overlay */
                    <div className="featured-media-placeholder">
                      <div className="featured-media-header">
                        <span className="featured-type-badge">
                          <span className="badge-dot"></span>
                          {project.type.toUpperCase()}
                        </span>
                        <span className="featured-tag">{project.tag}</span>
                      </div>

                      <div className="featured-media-center">
                        <span className="featured-canvas-title">{project.title}</span>
                        <span className="featured-canvas-hint">VIEW CASE STUDY →</span>
                      </div>

                      {/* Editorial Corner Marks */}
                      <span className="featured-corner featured-corner-tl" aria-hidden="true"></span>
                      <span className="featured-corner featured-corner-tr" aria-hidden="true"></span>
                      <span className="featured-corner featured-corner-bl" aria-hidden="true"></span>
                      <span className="featured-corner featured-corner-br" aria-hidden="true"></span>
                    </div>
                  )}

                  <div className="featured-media-overlay" aria-hidden="true"></div>
                </div>
              </a>

              {/* Project Metadata & Details */}
              <div className="featured-info">
                <div className="featured-info-top">
                  <span className="featured-number">{project.number}</span>
                  <span className="featured-category">{project.category}</span>
                </div>
                
                <h3 className="featured-title">
                  <a
                    href={`/project/${project.slug}`}
                    onClick={(e) => handleProjectClick(e, project.slug)}
                    className="featured-title-link"
                  >
                    {project.title}
                  </a>
                </h3>
                
                <p className="featured-description">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedWork;

