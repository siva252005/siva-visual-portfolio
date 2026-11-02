import React, { useState, useRef, useCallback, useEffect } from 'react';
import { beforeAfterProjects } from '../../data/beforeAfter';

function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(40);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const rafIdRef = useRef(null);
  const isDraggingRef = useRef(false);
  const sliderPosRef = useRef(40);

  // Cache loaded project IDs to eliminate flickering and avoid redundant spinners
  const [loadedProjectIds, setLoadedProjectIds] = useState(() => new Set());
  const loadedProjectsRef = useRef(new Set());
  const loadedLayersRef = useRef({}); // { [id]: { before: bool, after: bool } }

  const currentProject = beforeAfterProjects[currentIndex] || beforeAfterProjects[0];
  const isCurrentReady = loadedProjectIds.has(currentProject.id);

  // Helper to apply position directly to DOM for zero React re-renders during dragging
  const applyPosition = useCallback((percentage) => {
    sliderPosRef.current = percentage;
    if (containerRef.current) {
      containerRef.current.style.setProperty('--slider-pos', `${percentage}%`);
      containerRef.current.setAttribute('aria-valuenow', Math.round(percentage));
      containerRef.current.setAttribute('aria-valuetext', `${Math.round(percentage)}% reveal`);
    }
  }, []);

  // Mark layer as loaded and update ready state when both layers are ready
  const handleLayerLoaded = useCallback((layer, projId) => {
    if (!loadedLayersRef.current[projId]) {
      loadedLayersRef.current[projId] = { before: false, after: false };
    }
    loadedLayersRef.current[projId][layer] = true;
    if (loadedLayersRef.current[projId].before && loadedLayersRef.current[projId].after) {
      if (!loadedProjectsRef.current.has(projId)) {
        loadedProjectsRef.current.add(projId);
        setLoadedProjectIds(new Set(loadedProjectsRef.current));
      }
    }
  }, []);

  // Prefetch inactive transformations on button hover/focus with responsive srcset
  const prefetchProject = useCallback((project) => {
    if (!project || loadedProjectsRef.current.has(project.id)) return;
    const targetAfter = project.afterWebp || project.after;
    const targetBefore = project.beforeWebp || project.before;

    let loadedCount = 0;
    const checkBoth = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        loadedProjectsRef.current.add(project.id);
        setLoadedProjectIds(new Set(loadedProjectsRef.current));
      }
    };

    if (targetAfter) {
      const imgA = new Image();
      if (project.afterSrcSet) {
        imgA.srcset = project.afterSrcSet;
        imgA.sizes = project.sizes || '(max-width: 480px) 280px, (max-width: 768px) 360px, 440px';
      }
      imgA.src = targetAfter;
      if (imgA.complete) {
        checkBoth();
      } else {
        imgA.onload = checkBoth;
        imgA.onerror = checkBoth;
      }
    }

    if (targetBefore) {
      const imgB = new Image();
      if (project.beforeSrcSet) {
        imgB.srcset = project.beforeSrcSet;
        imgB.sizes = project.sizes || '(max-width: 480px) 280px, (max-width: 768px) 360px, 440px';
      }
      imgB.src = targetBefore;
      if (imgB.complete) {
        checkBoth();
      } else {
        imgB.onload = checkBoth;
        imgB.onerror = checkBoth;
      }
    }
  }, []);

  // Preload initial active project on mount
  useEffect(() => {
    if (beforeAfterProjects[0]) {
      prefetchProject(beforeAfterProjects[0]);
    }
  }, [prefetchProject]);

  // Cleanup any pending animation frame on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      applyPosition(percentage);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX;
    if (rafIdRef.current) return; // Drop frame if previous is still queued
    rafIdRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      applyPosition(percentage);
      rafIdRef.current = null;
    });
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setSliderPosition(sliderPosRef.current);
    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e) => {
    let step = 5;
    if (e.shiftKey) step = 15;

    let newPos = sliderPosRef.current;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      newPos = Math.max(0, newPos - step);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      newPos = Math.min(100, newPos + step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      newPos = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newPos = 100;
    } else {
      return;
    }

    applyPosition(newPos);
    setSliderPosition(newPos);
  };

  const handleSelectProject = (idx) => {
    setCurrentIndex(idx);
    applyPosition(40);
    setSliderPosition(40);
    // Eagerly prefetch the selected project if not already loaded
    if (beforeAfterProjects[idx]) {
      prefetchProject(beforeAfterProjects[idx]);
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
                  onClick={() => handleSelectProject(idx)}
                  onMouseEnter={() => prefetchProject(project)}
                  onFocus={() => prefetchProject(project)}
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
              style={{
                aspectRatio: currentProject.aspectRatio || '854 / 1280',
                '--slider-pos': `${sliderPosition}%`,
              }}
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
              {/* Progressive Loading Skeleton */}
              {!isCurrentReady && (
                <div className="comparison-skeleton" aria-hidden="true">
                  <div className="comparison-skeleton-shimmer"></div>
                  <div className="comparison-skeleton-badge">
                    <span className="skeleton-spinner"></span>
                    <span>Loading transformation...</span>
                  </div>
                </div>
              )}

              {/* Layer 1: AFTER (Base Underneath Layer) */}
              <div className={`comparison-layer comparison-layer-after ${isCurrentReady ? 'is-ready' : 'is-loading'}`}>
                {currentProject.after ? (
                  <picture>
                    {currentProject.afterSrcSet ? (
                      <source
                        type="image/webp"
                        srcSet={currentProject.afterSrcSet}
                        sizes={currentProject.sizes || '(max-width: 480px) 280px, (max-width: 768px) 360px, 440px'}
                      />
                    ) : currentProject.afterWebp ? (
                      <source type="image/webp" srcSet={currentProject.afterWebp} />
                    ) : null}
                    <img
                      src={currentProject.afterWebp || currentProject.after}
                      alt={`${currentProject.title} Refined`}
                      className="comparison-img comparison-img-base"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      width={currentProject.width || 854}
                      height={currentProject.height || 1280}
                      onLoad={() => handleLayerLoaded('after', currentProject.id)}
                      onError={(e) => {
                        if (e.target.src !== currentProject.after) {
                          e.target.src = currentProject.after;
                        }
                      }}
                    />
                  </picture>
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
                className={`comparison-layer comparison-layer-before ${isCurrentReady ? 'is-ready' : 'is-loading'}`}
                style={{
                  clipPath: `polygon(0 0, var(--slider-pos, ${sliderPosition}%) 0, var(--slider-pos, ${sliderPosition}%) 100%, 0 100%)`,
                }}
              >
                {currentProject.before ? (
                  <picture>
                    {currentProject.beforeSrcSet ? (
                      <source
                        type="image/webp"
                        srcSet={currentProject.beforeSrcSet}
                        sizes={currentProject.sizes || '(max-width: 480px) 280px, (max-width: 768px) 360px, 440px'}
                      />
                    ) : currentProject.beforeWebp ? (
                      <source type="image/webp" srcSet={currentProject.beforeWebp} />
                    ) : null}
                    <img
                      src={currentProject.beforeWebp || currentProject.before}
                      alt={`${currentProject.title} Raw`}
                      className="comparison-img comparison-img-clipped"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      width={currentProject.width || 854}
                      height={currentProject.height || 1280}
                      onLoad={() => handleLayerLoaded('before', currentProject.id)}
                      onError={(e) => {
                        if (e.target.src !== currentProject.before) {
                          e.target.src = currentProject.before;
                        }
                      }}
                    />
                  </picture>
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
                style={{ left: `var(--slider-pos, ${sliderPosition}%)` }}
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
            {/* Drag Hint */}
            <div className="comparison-hint" aria-hidden="true">
              <span className="comparison-hint-icon">↔</span>
              <span>Drag to compare</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BeforeAfter;
