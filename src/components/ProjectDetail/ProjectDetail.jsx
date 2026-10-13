import React, { useEffect } from 'react';
import { projects } from '../../data/projects';

function ProjectDetail({ slug, onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];

  const handleBackToWork = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('/#home');
    } else {
      window.history.pushState({}, '', '/#home');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleProjectClick = (e, targetSlug) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/project/${targetSlug}`);
    } else {
      window.history.pushState({}, '', `/project/${targetSlug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  if (!project) {
    return (
      <div className="project-detail-page not-found-page">
        <div className="container text-center not-found-container">
          <div className="eyebrow">
            <span>404 · CASE STUDY</span>
          </div>
          <h1 className="not-found-title">PROJECT NOT FOUND</h1>
          <p className="not-found-desc">
            The requested project case study could not be located.
          </p>
          <a href="#home" onClick={handleBackToWork} className="btn btn-primary">
            <span>RETURN HOME</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    );
  }

  // Calculate previous and next projects
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  return (
    <article className="project-detail-page" role="main">
      {/* Top Floating Back Bar */}
      <div className="project-top-bar">
        <div className="container project-top-bar-inner">
          <a href="#home" onClick={handleBackToWork} className="back-to-work-link">
            <span className="back-arrow" aria-hidden="true">←</span>
            <span>BACK TO HOME</span>
          </a>
          <div className="project-top-meta">
            <span className="top-meta-num">{project.id}</span>
            <span className="top-meta-divider">/</span>
            <span className="top-meta-total">0{projects.length}</span>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Section A: Project Header & Hero Frame */}
        <header className="project-hero-header">
          <div className="project-hero-meta">
            <span className="hero-meta-badge">PROJECT / {project.id}</span>
            <span className="hero-meta-pill">{project.category}</span>
            <span className="hero-meta-year">{project.year}</span>
          </div>

          <h1 className="project-hero-title">
            {project.title.toUpperCase()}
          </h1>

          <p className="project-hero-lead">
            {project.shortDescription}
          </p>

          {/* Large Cinematic Hero Media Stage */}
          <div className="project-hero-stage">
            {project.heroImage ? (
              <img
                src={project.heroImage}
                alt={project.title}
                className="project-hero-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              /* Ambient Media Placeholder (Empty State) */
              <div className="project-stage-placeholder" aria-hidden="true">
                <div className="stage-placeholder-top">
                  <span className="stage-badge">
                    <span className="badge-dot"></span>
                    HERO FRAME / {project.id}
                  </span>
                  <span className="stage-specs">{project.discipline} · 4K MASTER</span>
                </div>

                <div className="stage-placeholder-center">
                  <span className="stage-canvas-label">VISUAL PLACEHOLDER</span>
                  <span className="stage-canvas-title">{project.title.toUpperCase()}</span>
                  <span className="stage-canvas-status">ASSET SLOT READY</span>
                </div>

                <div className="stage-placeholder-bottom">
                  <span className="stage-ambient-text">EDITORIAL COLOR MASTER</span>
                </div>

                {/* Corner Accents */}
                <span className="stage-corner stage-corner-tl"></span>
                <span className="stage-corner stage-corner-tr"></span>
                <span className="stage-corner stage-corner-bl"></span>
                <span className="stage-corner stage-corner-br"></span>
              </div>
            )}

            <div className="project-hero-overlay" aria-hidden="true"></div>
          </div>
        </header>

        {/* Section B: Overview & Objective Two-Column Layout */}
        <section className="project-section project-overview-section" aria-labelledby="overview-heading">
          <div className="project-two-col-grid">
            <div className="project-overview-block">
              <div className="section-eyebrow">
                <span className="eyebrow-line"></span>
                <span id="overview-heading">OVERVIEW</span>
              </div>
              <h2 className="project-block-title">THE CONTEXT</h2>
              <p className="project-body-text">{project.overview}</p>
            </div>

            <div className="project-objective-block">
              <div className="section-eyebrow">
                <span className="eyebrow-line"></span>
                <span>OBJECTIVE</span>
              </div>
              <h2 className="project-block-title">THE MISSION</h2>
              <p className="project-body-text">{project.objective}</p>
            </div>
          </div>
        </section>

        {/* Section C: Creative Approach */}
        <section className="project-section project-approach-section" aria-labelledby="approach-heading">
          <div className="section-header-left">
            <div className="eyebrow">
              <span className="badge-dot"></span>
              <span id="approach-heading">CREATIVE STRATEGY</span>
            </div>
            <h2 className="section-title">THE <span className="text-accent">APPROACH.</span></h2>
          </div>

          <div className="approach-list-grid">
            {project.approach.map((step, idx) => (
              <div key={idx} className="approach-card">
                <span className="approach-num">0{idx + 1}</span>
                <p className="approach-text">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section D: Tools + Services Metadata */}
        <section className="project-section project-specs-section" aria-label="Tools and Services">
          <div className="specs-grid">
            <div className="specs-card">
              <div className="specs-card-header">
                <span className="specs-dot" aria-hidden="true"></span>
                <h3 className="specs-title">TOOLS USED</h3>
              </div>
              <div className="specs-pill-group">
                {project.tools.map((tool) => (
                  <span key={tool} className="specs-tool-pill">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="specs-card">
              <div className="specs-card-header">
                <span className="specs-dot" aria-hidden="true"></span>
                <h3 className="specs-title">SERVICES DELIVERED</h3>
              </div>
              <div className="specs-services-list">
                {project.services.map((service, idx) => (
                  <div key={service} className="specs-service-item">
                    <span className="service-bullet">/</span>
                    <span className="service-label">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section E: Process Timeline */}
        <section className="project-section project-process-section" aria-labelledby="process-heading">
          <div className="section-header-left">
            <div className="eyebrow">
              <span className="badge-dot"></span>
              <span id="process-heading">WORKFLOW BREAKDOWN</span>
            </div>
            <h2 className="section-title">THE <span className="text-accent">PROCESS.</span></h2>
          </div>

          <div className="project-process-timeline">
            {project.process.map((step, idx) => (
              <div key={step.title} className="process-timeline-item">
                <div className="timeline-node" aria-hidden="true">
                  <span className="node-dot"></span>
                  {idx < project.process.length - 1 && <span className="node-line"></span>}
                </div>
                <div className="timeline-content">
                  <h3 className="timeline-title">{step.title}</h3>
                  <p className="timeline-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section F: Selected Frames Gallery */}
        <section className="project-section project-gallery-section" aria-labelledby="gallery-heading">
          <div className="section-header-left">
            <div className="eyebrow">
              <span className="badge-dot"></span>
              <span id="gallery-heading">VISUAL SEQUENCE</span>
            </div>
            <h2 className="section-title">SELECTED <span className="text-accent">FRAMES.</span></h2>
          </div>

          <div className="project-gallery-grid">
            {project.gallery.map((img, idx) => (
              <div key={idx} className={`gallery-frame-card frame-card-${idx + 1}`}>
                {img ? (
                  <img
                    src={img}
                    alt={`${project.title} - Frame 0${idx + 1}`}
                    className="gallery-frame-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="gallery-frame-placeholder" aria-hidden="true">
                    <div className="frame-placeholder-top">
                      <span className="frame-badge">FRAME / 0{idx + 1}</span>
                      <span className="frame-ratio-label">
                        {idx === 0 ? '16:9' : idx === 1 ? '4:5' : '1:1'}
                      </span>
                    </div>
                    <div className="frame-placeholder-center">
                      <span className="frame-canvas-title">ASSET SLOT 0{idx + 1}</span>
                      <span className="frame-canvas-sub">{project.title}</span>
                    </div>
                    <span className="frame-corner frame-corner-tl"></span>
                    <span className="frame-corner frame-corner-br"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section G: Outcome Statement */}
        <section className="project-section project-outcome-section" aria-labelledby="outcome-heading">
          <div className="outcome-container">
            <div className="eyebrow">
              <span className="badge-dot"></span>
              <span id="outcome-heading">FINAL RESULT</span>
            </div>
            <h2 className="outcome-title">THE OUTCOME</h2>
            <blockquote className="outcome-quote">
              "{project.outcome}"
            </blockquote>
          </div>
        </section>

        {/* Section H: Previous / Next Project Navigation */}
        <nav className="project-pagination-nav" aria-label="Project Navigation">
          <div className="pagination-grid">
            <a
              href={`/project/${prevProject.slug}`}
              onClick={(e) => handleProjectClick(e, prevProject.slug)}
              className="pagination-card pagination-prev"
            >
              <span className="pagination-direction">← PREVIOUS PROJECT</span>
              <span className="pagination-title">{prevProject.title}</span>
              <span className="pagination-cat">{prevProject.category}</span>
            </a>

            <div className="pagination-center">
              <a href="#home" onClick={handleBackToWork} className="btn btn-secondary pagination-all-btn">
                <span>BACK TO HOME</span>
              </a>
            </div>

            <a
              href={`/project/${nextProject.slug}`}
              onClick={(e) => handleProjectClick(e, nextProject.slug)}
              className="pagination-card pagination-next"
            >
              <span className="pagination-direction">NEXT PROJECT →</span>
              <span className="pagination-title">{nextProject.title}</span>
              <span className="pagination-cat">{nextProject.category}</span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  );
}

export default ProjectDetail;
