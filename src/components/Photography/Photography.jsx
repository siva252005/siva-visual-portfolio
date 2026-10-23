import React, { useState, useEffect, useRef, useCallback } from 'react';
import { photographyCategories, photoItems } from '../../data/photography';

function Photography() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(false);
  const activeTriggerRef = useRef(null);

  // Resolve Vite public path
  const getImageSrc = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  };

  const filteredItems =
    activeCategory === 'all'
      ? photoItems
      : photoItems.filter((item) => item.category === activeCategory);

  // Open lightbox handler
  const handleOpenLightbox = (item, event) => {
    activeTriggerRef.current = event?.currentTarget || null;
    setSelectedPhoto(item);
    setPhotoError(false);
  };

  // Close lightbox handler
  const handleCloseLightbox = useCallback(() => {
    setSelectedPhoto(null);
    setPhotoError(false);
    // Return focus to the trigger card for accessibility
    if (activeTriggerRef.current) {
      activeTriggerRef.current.focus();
    }
  }, []);

  // Navigate to previous photo
  const handlePrevPhoto = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (!selectedPhoto || filteredItems.length === 0) return;
      const currentIndex = filteredItems.findIndex((item) => item.id === selectedPhoto.id);
      if (currentIndex === -1) {
        setSelectedPhoto(filteredItems[0]);
        setPhotoError(false);
        return;
      }
      const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      setSelectedPhoto(filteredItems[prevIndex]);
      setPhotoError(false);
    },
    [selectedPhoto, filteredItems]
  );

  // Navigate to next photo
  const handleNextPhoto = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      if (!selectedPhoto || filteredItems.length === 0) return;
      const currentIndex = filteredItems.findIndex((item) => item.id === selectedPhoto.id);
      if (currentIndex === -1) {
        setSelectedPhoto(filteredItems[0]);
        setPhotoError(false);
        return;
      }
      const nextIndex = (currentIndex + 1) % filteredItems.length;
      setSelectedPhoto(filteredItems[nextIndex]);
      setPhotoError(false);
    },
    [selectedPhoto, filteredItems]
  );

  // Category filter switch handler
  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
    setSelectedPhoto(null);
  };

  // Prevent background scrolling and support keyboard navigation (Escape, Left Arrow, Right Arrow)
  useEffect(() => {
    if (!selectedPhoto) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto();
      } else if (e.key === 'ArrowRight') {
        handleNextPhoto();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto, handleCloseLightbox, handlePrevPhoto, handleNextPhoto]);

  return (
    <section id="photo-editing" className="section photography-section">
      <div className="container photography-container">
        {/* Editorial Section Header */}
        <div className="section-header-compact">
          <div className="section-header-left">
            <div className="eyebrow">
              <span>PHOTO EDITING</span>
            </div>
            <h2 className="section-title">
              FRAMES,<br />
              <span className="text-accent">REFINED.</span>
            </h2>
            <p className="section-subtitle">
              A selection of photographs transformed through color, light, composition and detail.
            </p>
          </div>

          {/* Minimalist Filter Tabs */}
          <div className="photography-filters" role="tablist" aria-label="Photography categories">
            {photographyCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stepped Photography Gallery */}
        <div key={activeCategory} className="photography-gallery filter-fade-in">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`photo-card photo-card-${item.aspect} photo-row-${item.row}`}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Open ${item.title} in full screen viewer (${item.categoryLabel})`}
              onClick={(e) => handleOpenLightbox(item, e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenLightbox(item, e);
                }
              }}
            >
              <div className={`photo-frame photo-frame-${item.aspect} photo-frame-row-${item.row}`}>
                {item.image ? (
                  <img
                    src={getImageSrc(item.image)}
                    alt={item.title}
                    className={`photo-img photo-img-${item.aspect}`}
                    style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : null}

                {/* Ambient Visual Placeholder */}
                <div className="photo-placeholder">
                  <div className="photo-placeholder-top">
                    <span className="photo-cat-badge">{item.categoryLabel}</span>
                  </div>
                  <div className="photo-placeholder-center">
                    <span className="photo-placeholder-title">{item.title}</span>
                    <span className="photo-placeholder-tag">{item.tag}</span>
                  </div>
                </div>

                {/* Editorial Caption Overlay */}
                <div className="photo-overlay">
                  <div className="photo-overlay-top">
                    <span className="photo-overlay-expand-btn" aria-hidden="true" title="View fullscreen">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                        <line x1="21" y1="3" x2="14" y2="10" />
                        <line x1="3" y1="21" x2="10" y2="14" />
                      </svg>
                    </span>
                  </div>
                  <div className="photo-overlay-content">
                    <span className="photo-overlay-category">{item.categoryLabel}</span>
                    <h3 className="photo-overlay-title">{item.title}</h3>
                    <span className="photo-overlay-tag">{item.tag}</span>
                  </div>
                </div>

                {/* Fine Corner Accents */}
                <span className="photo-corner photo-corner-tl" aria-hidden="true"></span>
                <span className="photo-corner photo-corner-tr" aria-hidden="true"></span>
                <span className="photo-corner photo-corner-bl" aria-hidden="true"></span>
                <span className="photo-corner photo-corner-br" aria-hidden="true"></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immersive Photo Lightbox Modal - Pure Photo Display */}
      {selectedPhoto && (
        <div
          className="photo-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseLightbox();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedPhoto.title} photo viewer`}
        >
          {/* Discreet Circular Close Button in Top-Right Corner */}
          <button
            type="button"
            className="photo-modal-close-btn"
            onClick={handleCloseLightbox}
            aria-label="Close photo viewer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Lightbox Viewer Stage - Centered Frame with Flanking Navigation Buttons */}
          <div
            className="photo-modal-stage"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCloseLightbox();
              }
            }}
          >
            {/* Previous Button (Left Side) */}
            <button
              type="button"
              className="photo-modal-nav-btn photo-modal-nav-prev"
              onClick={handlePrevPhoto}
              aria-label="Previous photo"
              title="Previous photo (←)"
              disabled={filteredItems.length <= 1}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>

            {/* Modal Main Content Container - Photo Frame Only */}
            <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="photo-modal-media-wrapper">
                {photoError ? (
                  <div className="photo-modal-error-fallback" role="alert">
                    <div className="photo-error-icon" aria-hidden="true">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    </div>
                    <p className="photo-error-text">Failed to load photo</p>
                    <p className="photo-error-subtext">The image file could not be displayed.</p>
                  </div>
                ) : (
                  <img
                    key={selectedPhoto.id}
                    src={getImageSrc(selectedPhoto.image)}
                    alt={selectedPhoto.title}
                    className="photo-modal-image"
                    onError={() => setPhotoError(true)}
                  />
                )}
              </div>
            </div>

            {/* Next Button (Right Side) */}
            <button
              type="button"
              className="photo-modal-nav-btn photo-modal-nav-next"
              onClick={handleNextPhoto}
              aria-label="Next photo"
              title="Next photo (→)"
              disabled={filteredItems.length <= 1}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Photography;
