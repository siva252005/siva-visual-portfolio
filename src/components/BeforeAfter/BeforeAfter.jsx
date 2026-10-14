import React, { useState, useRef, useCallback, useEffect } from 'react';
import { beforeAfterProjects } from '../../data/beforeAfter';

function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const rafIdRef = useRef(null);

  const currentProject = beforeAfterProjects[currentIndex] || beforeAfterProjects[0];

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  // Cleanup any pending animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    updatePosition(e.clientX);
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX;
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      updatePosition(clientX);
      rafIdRef.current = null;
    });
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e) => {
    let step = 5;
    if (e.shiftKey) step = 15;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - step));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <section id="before-after" className="section before-after-section">
      <div className="container">
        {/* Two-Column Transformation Layout */}
        <div className="before-after-container">
          {/* Left Content Panel (~42% width) */}
          <div className="before-after-panel">
            {/* Section Header */}
            <div className="section-header before-after-header">
              <div className="eyebrow">
                <span>THE TRANSFORMATION</span>
              </div>
              <h2 className="section-title">
                RAW IN.<br />
                <span className="text-accent">REFINED OUT.</span>
              </h2>
              <p className="section-subtitle">
                See the difference thoughtful color, light and detail can make.
              </p>
            </div>

            <div className="before-after-info">
              <div className="before-after-meta">
                <span className="before-after-category">{currentProject.category}</span>
                <span className="before-after-dot">·</span>
                <span className="before-after-tag">{currentProject.tag}</span>
              </div>
              <h3 className="before-after-title">{currentProject.title}</h3>
              <p className="before-after-desc">{currentProject.description}</p>
            </div>

            {/* Vertically Stacked Transformation Selection Controls */}
            <div className="before-after-selector" role="tablist" aria-label="Comparison projects">
              {beforeAfterProjects.map((project, idx) => (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={currentIndex === idx}
                  className={`selector-btn ${currentIndex === idx ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setSliderPosition(50);
                  }}
                >
                  <span className="selector-num">{project.number}</span>
                  <span className="selector-label">{project.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Image Stage (~58% width) */}
          <div className="before-after-stage-wrapper">
            <div
              ref={containerRef}
              className={`comparison-stage ${isDragging ? 'is-dragging' : ''}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onKeyDown={handleKeyDown}
              role="slider"
              tabIndex={0}
              aria-label="Before and after comparison slider"
              aria-orientation="horizontal"
              aria-valuenow={Math.round(sliderPosition)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={`${Math.round(sliderPosition)}% reveal`}
            >
              {/* Layer 1: AFTER (Base Underneath Layer) */}
              <div className="comparison-layer comparison-layer-after">
                {currentProject.after ? (
                  <img
                    src={currentProject.after}
                    alt={`${currentProject.title} Refined`}
                    className="comparison-img comparison-img-base"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="comparison-placeholder placeholder-after">
                    <div className="placeholder-center">
                      <span className="placeholder-title">{currentProject.title}</span>
                      <span className="placeholder-status text-accent">REFINED COLOR &amp; LIGHT</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Layer 2: BEFORE (Clipped Top Layer) */}
              <div
                className="comparison-layer comparison-layer-before"
                style={{
                  clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                }}
              >
                {currentProject.before ? (
                  <img
                    src={currentProject.before}
                    alt={`${currentProject.title} Raw`}
                    className="comparison-img comparison-img-clipped"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="comparison-placeholder placeholder-before">
                    <div className="placeholder-center">
                      <span className="placeholder-title">{currentProject.title}</span>
                      <span className="placeholder-status">FLAT RAW PROFILE</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Badges */}
              <div className="comparison-badges" aria-hidden="true">
                <span className="placeholder-badge badge-before">BEFORE · RAW</span>
                <span className="placeholder-badge badge-after">AFTER · REFINED</span>
              </div>

              {/* Draggable Vertical Divider Handle */}
              <div
                className="comparison-handle-line"
                style={{ left: `${sliderPosition}%` }}
                aria-hidden="true"
              >
                <div className="comparison-handle-grip">
                  <span className="grip-arrow">◀</span>
                  <span className="grip-arrow">▶</span>
                </div>
              </div>

              {/* Corner Editorial Accents */}
              <span className="comparison-corner comparison-corner-tl" aria-hidden="true"></span>
              <span className="comparison-corner comparison-corner-tr" aria-hidden="true"></span>
              <span className="comparison-corner comparison-corner-bl" aria-hidden="true"></span>
              <span className="comparison-corner comparison-corner-br" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;
