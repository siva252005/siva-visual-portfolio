import React, { useState } from 'react';
import { photographyCategories, photoItems } from '../../data/photography';

function Photography() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems =
    activeCategory === 'all'
      ? photoItems
      : photoItems.filter((item) => item.category === activeCategory);

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
                onClick={() => setActiveCategory(cat.id)}
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
              aria-label={`${item.title} - ${item.categoryLabel}`}
            >
              <div className={`photo-frame photo-frame-${item.aspect} photo-frame-row-${item.row}`}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`photo-img photo-img-${item.aspect}`}
                    style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                    loading="lazy"
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
    </section>
  );
}

export default Photography;
