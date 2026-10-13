/**
 * Smoothly scrolls to a section so its heading appears immediately
 * below the fixed/sticky navbar with a small intentional gap (~24px),
 * matching the layout in reference designs without excessive top blank space.
 *
 * @param {string} hashOrId - Target anchor id, e.g. '#photo-editing' or 'photo-editing'
 * @param {boolean} smooth - Whether to animate smoothly or jump instantly
 */
export const scrollToSection = (hashOrId, smooth = true) => {
  if (!hashOrId) {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'instant' });
    return;
  }

  const targetId = hashOrId.replace(/^#\/?/, '').replace('/', '');
  if (!targetId || targetId === 'home') {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'instant' });
    return;
  }

  const targetElem = document.getElementById(targetId);
  if (!targetElem) return;

  const navbar = document.querySelector('.navbar');
  const navHeight = navbar ? navbar.offsetHeight : 56;

  // Target the primary heading / eyebrow or first content container within the section
  const contentHeader = targetElem.querySelector(
    '.eyebrow, .section-header-compact, .section-header, .about-container, .contact-grid, .container'
  );
  const targetAnchor = contentHeader || targetElem;
  const targetRect = targetAnchor.getBoundingClientRect();
  const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

  // Position the heading/eyebrow ~24px below the bottom of the navbar
  const targetY = Math.max(0, Math.round(currentScrollY + targetRect.top - navHeight - 24));

  window.scrollTo({
    top: targetY,
    behavior: smooth ? 'smooth' : 'instant'
  });
};
