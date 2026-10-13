import React, { useState, useEffect, useRef } from 'react';
import videos from '../../data/videos';

function VideoCard({
  item,
  onOpenModal,
  isUnmuted,
  onToggleMute,
  isModalOpen,
  getVideoSrc,
  isDuplicate = false,
}) {
  const [videoError, setVideoError] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const videoSrc = getVideoSrc(item.video);

  // Synchronize muted attribute directly on the HTMLMediaElement
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = !isUnmuted;
      videoRef.current.muted = !isUnmuted;
    }
  }, [isUnmuted]);

  // Performance: Play video only when intersecting the viewport, pause when scrolled far out or when modal is open
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (isModalOpen) {
      video.pause();
      return;
    }

    video.muted = !isUnmuted;

    if (typeof IntersectionObserver === 'undefined') {
      video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = !isUnmuted;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.01, rootMargin: '100px 200px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [isModalOpen, isUnmuted, videoSrc]);

  return (
    <div
      ref={containerRef}
      className="video-card video-card-interactive"
      role="button"
      tabIndex={isDuplicate ? -1 : 0}
      aria-hidden={isDuplicate ? 'true' : undefined}
      onClick={() => onOpenModal(item)}
      onKeyDown={(e) => {
        if (!isDuplicate && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onOpenModal(item);
        }
      }}
      aria-label={`Open ${item.title} video player with sound`}
    >
      <div className="video-card-frame">
        {videoError ? (
          item.thumbnail || item.poster ? (
            <img
              src={item.thumbnail || item.poster}
              alt={item.title}
              className="video-card-preview"
            />
          ) : (
            <div className="video-card-error-fallback" role="alert">
              <div className="video-error-icon" aria-hidden="true">
                <svg
                  width="28"
                  height="28"
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
              <p className="video-error-text">Video unavailable</p>
              <p className="video-error-subtext">Could not load video source</p>
            </div>
          )
        ) : (
          <>
            <video
              ref={videoRef}
              className="video-card-preview"
              muted={!isUnmuted}
              loop
              playsInline
              preload="metadata"
              poster={item.thumbnail || item.poster || undefined}
              onError={() => setVideoError(true)}
            >
              <source
                src={videoSrc}
                type={videoSrc && videoSrc.toLowerCase().endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}
              />
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Separate Mute/Unmute Button (Top-Right) */}
            <button
              type="button"
              className="video-preview-mute-btn"
              tabIndex={isDuplicate ? -1 : 0}
              onClick={(e) => onToggleMute(e, item.id)}
              aria-label={!isUnmuted ? `Unmute preview for ${item.title}` : `Mute preview for ${item.title}`}
              title={!isUnmuted ? 'Unmute preview' : 'Mute preview'}
            >
              {!isUnmuted ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            {/* Subtle Overlay near bottom: Speaker icon and 'Tap for sound' */}
            <button
              type="button"
              className={`video-preview-sound-pill ${isUnmuted ? 'is-active' : ''}`}
              tabIndex={isDuplicate ? -1 : 0}
              onClick={(e) => onToggleMute(e, item.id)}
              aria-label={!isUnmuted ? `Tap for sound: ${item.title}` : `Sound active for ${item.title}. Tap to mute`}
            >
              <span className="sound-pill-icon" aria-hidden="true">
                {!isUnmuted ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </span>
              <span className="sound-pill-text">
                {!isUnmuted ? 'Tap for sound' : 'Sound active'}
              </span>
            </button>
          </>
        )}

        {/* Cinematic Corner Accents */}
        <div className="video-corner video-corner-tl" aria-hidden="true" />
        <div className="video-corner video-corner-tr" aria-hidden="true" />
        <div className="video-corner video-corner-bl" aria-hidden="true" />
        <div className="video-corner video-corner-br" aria-hidden="true" />
      </div>

      {/* Video Title Below */}
      <h3 className="video-card-title">{item.title}</h3>
    </div>
  );
}

function VideoEditing() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [activeAudioId, setActiveAudioId] = useState(null);

  const modalVideoRef = useRef(null);

  // Resolve Vite public path
  const getVideoSrc = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  };

  // Toggle audio on preview without opening modal
  const handleToggleMute = (e, id) => {
    e.stopPropagation();
    setActiveAudioId((prev) => (prev === id ? null : id));
  };

  // Open modal handler for a specific video
  const handleOpenModal = (item) => {
    if (!item) return;
    setActiveAudioId(null);
    setSelectedVideo(item);
    setModalError(false);
    setIsModalOpen(true);
  };

  // Close modal handler
  const handleCloseModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    setIsModalOpen(false);
    setSelectedVideo(null);
    setModalError(false);
    setActiveAudioId(null);
  };

  // Prevent background scrolling and support Escape key
  useEffect(() => {
    if (!isModalOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  // Autoplay with sound in modal once opened
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current && selectedVideo) {
      modalVideoRef.current.muted = false;
      modalVideoRef.current.currentTime = 0;
      const playPromise = modalVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay with sound prevented by browser policy:', err);
          if (modalVideoRef.current) {
            modalVideoRef.current.muted = true;
            modalVideoRef.current.play().catch(() => {});
          }
        });
      }
    }
  }, [isModalOpen, selectedVideo]);

  return (
    <section id="video" className="section video-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <span>VIDEO EDITING</span>
          </div>
          <h2 className="section-title">
            MOTION,<br />
            CUT INTO<br />
            <span className="text-accent">STORY.</span>
          </h2>
          <p className="section-subtitle">
            Visual edits and motion stories shaped through rhythm, color and sound.
          </p>
        </div>
      </div>

      {/* Continuous Horizontal Video Marquee */}
      <div className="video-loop-container">
        {videos && videos.length > 0 ? (
          <div className={`video-loop-track ${isModalOpen ? 'is-paused' : ''}`}>
            {/* Group 1 (Primary - in keyboard tab order) */}
            <div className="video-loop-group">
              {videos.map((item) => (
                <VideoCard
                  key={`g1-${item.id}`}
                  item={item}
                  onOpenModal={handleOpenModal}
                  isUnmuted={activeAudioId === item.id}
                  onToggleMute={handleToggleMute}
                  isModalOpen={isModalOpen}
                  getVideoSrc={getVideoSrc}
                  isDuplicate={false}
                />
              ))}
            </div>

            {/* Group 2 (Seamless loop continuation) */}
            <div className="video-loop-group" aria-hidden="true">
              {videos.map((item) => (
                <VideoCard
                  key={`g2-${item.id}`}
                  item={item}
                  onOpenModal={handleOpenModal}
                  isUnmuted={activeAudioId === item.id}
                  onToggleMute={handleToggleMute}
                  isModalOpen={isModalOpen}
                  getVideoSrc={getVideoSrc}
                  isDuplicate={true}
                />
              ))}
            </div>

            {/* Group 3 (Buffer for ultrawide displays) */}
            <div className="video-loop-group" aria-hidden="true">
              {videos.map((item) => (
                <VideoCard
                  key={`g3-${item.id}`}
                  item={item}
                  onOpenModal={handleOpenModal}
                  isUnmuted={activeAudioId === item.id}
                  onToggleMute={handleToggleMute}
                  isModalOpen={isModalOpen}
                  getVideoSrc={getVideoSrc}
                  isDuplicate={true}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="container video-coming-soon-container">
            <div className="video-coming-soon-card">
              <div className="video-coming-soon-badge">
                <span className="video-badge-dot" aria-hidden="true" />
                <span>COMING SOON</span>
              </div>
              <h3 className="video-coming-soon-heading">Videos coming soon</h3>
              <p className="video-coming-soon-text">
                Selected video edits, vertical cuts, and post-production sequences are currently being prepared.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Video Player Modal with Sound and Native Controls */}
      {isModalOpen && selectedVideo && (
        <div
          className="video-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedVideo.title} video player`}
        >
          {/* Circular Close Button in Top-Right Corner */}
          <button
            type="button"
            className="video-modal-close-btn"
            onClick={handleCloseModal}
            aria-label="Close video player"
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

          {/* Modal Content / Video Container */}
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            {modalError ? (
              <div className="video-modal-error-fallback" role="alert">
                <div className="video-error-icon" aria-hidden="true">
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
                <p className="video-error-text">Failed to load video</p>
                <p className="video-error-subtext">The video file could not be played.</p>
              </div>
            ) : (
              <div className="video-modal-player-wrapper">
                <video
                  ref={modalVideoRef}
                  className="video-modal-player"
                  controls
                  playsInline
                  preload="auto"
                  poster={selectedVideo.thumbnail || selectedVideo.poster || undefined}
                  onError={() => setModalError(true)}
                >
                  <source
                    src={getVideoSrc(selectedVideo.video)}
                    type={selectedVideo.video && selectedVideo.video.toLowerCase().endsWith('.mov') ? 'video/quicktime' : 'video/mp4'}
                    onError={() => setModalError(true)}
                  />
                  <source
                    src={getVideoSrc(selectedVideo.video)}
                    type="video/mp4"
                    onError={() => setModalError(true)}
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default VideoEditing;
