import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import contact from '../../data/contact';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    deadline: '',
    budget: '',
    message: '',
    company_website: '' // Honeypot field for spam protection
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Vite environment variables for EmailJS (preserve existing configuration)
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_q9d8ezb';
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_x8kfjbr';
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'ZizapHKoXp40xCyHs';

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    // Phone number is optional. If provided, validate Indian numbers (+91) and international formats.
    if (formData.phone && formData.phone.trim()) {
      const trimmedPhone = formData.phone.trim();
      const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$|^[+]?[\d\s().-]{7,16}$/;
      const digitsOnly = trimmedPhone.replace(/\D/g, '');
      if (!phoneRegex.test(trimmedPhone) || digitsOnly.length < 10 || digitsOnly.length > 15) {
        newErrors.phone = 'Please enter a valid phone number (e.g. +91 98765 43210).';
      }
    }

    if (!formData.projectType || !formData.projectType.trim()) {
      newErrors.projectType = 'Please select a project type.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell me a little about your project.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while already processing
    if (isLoading) return;

    // Honeypot spam check: if filled, quietly drop without alerting bot
    if (formData.company_website) {
      setIsSubmitted(true);
      return;
    }

    if (!validate()) {
      return;
    }

    // Check if EmailJS public key is set
    if (!PUBLIC_KEY || PUBLIC_KEY === 'YOUR_EMAILJS_PUBLIC_KEY') {
      setErrorMessage(
        'EmailJS Public Key is not configured yet. Please configure VITE_EMAILJS_PUBLIC_KEY in your .env file.'
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    // Map form fields to template variables (preserving existing EmailJS mapping + optional fields)
    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: (formData.phone || '').trim(),
      project_type: formData.projectType,
      deadline: (formData.deadline || '').trim(),
      budget: (formData.budget || '').trim(),
      message: formData.message.trim(),
      reply_to: formData.email.trim()
    };

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      if (response.status === 200 || response.text === 'OK') {
        setSubmittedData({ ...formData });

        // Clear form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '',
          deadline: '',
          budget: '',
          message: '',
          company_website: ''
        });
        setErrors({});
        setIsSubmitted(true);
      } else {
        throw new Error(response.text || 'Unable to complete send request.');
      }
    } catch (error) {
      console.error('EmailJS send error:', error);
      const friendlyMessage =
        error?.text ||
        error?.message ||
        'Failed to send enquiry. Please check your network connection and try again.';
      setErrorMessage(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      deadline: '',
      budget: '',
      message: '',
      company_website: ''
    });
    setErrors({});
    setIsSubmitted(false);
    setErrorMessage('');
    setSubmittedData(null);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* Asymmetric Two-Column Editorial Layout */}
        <div className="contact-grid">
          {/* Left Column: Direct Contact & Availability */}
          <div className="contact-info">
            <div className="eyebrow">
              <span className="badge-dot" aria-hidden="true"></span>
              <span>{contact.eyebrow}</span>
            </div>

            <h2 className="contact-title">
              LET&apos;S CREATE SOMETHING <span className="text-accent">WORTH REMEMBERING.</span>
            </h2>

            <p className="contact-description">
              {contact.description}
            </p>

            {/* Short Supporting Specialization Line */}
            {contact.servicesSummary && (
              <div className="contact-specialization-strip">
                <span className="specialization-text">{contact.servicesSummary}</span>
              </div>
            )}

            {/* Availability & Response Panel */}
            <div className="contact-availability-panel">
              <div className="avail-item">
                <span className="avail-label">STATUS</span>
                <span className="avail-value status-available">
                  <span className="avail-dot" aria-hidden="true"></span>
                  {contact.availability}
                </span>
              </div>

              <div className="avail-divider" aria-hidden="true"></div>

              <div className="avail-item">
                <span className="avail-label">RESPONSE</span>
                <span className="avail-value">{contact.responseTime}</span>
              </div>
            </div>

            {/* Direct Contact Options: WhatsApp, Instagram, Email */}
            <div className="contact-direct-channels">
              <span className="direct-channels-label">DIRECT CONTACT</span>
              <div className="direct-channels-grid">
                {contact.directChannels.map((channel) => (
                  <a
                    key={channel.id}
                    href={channel.url}
                    target={channel.id === 'email' ? undefined : '_blank'}
                    rel={channel.id === 'email' ? undefined : 'noopener noreferrer'}
                    className={`direct-channel-btn direct-channel-${channel.id}`}
                    aria-label={`${channel.label}: ${channel.sublabel}`}
                  >
                    <div className="channel-icon-wrap" aria-hidden="true">
                      {channel.id === 'whatsapp' && (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      )}
                      {channel.id === 'instagram' && (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                      )}
                      {channel.id === 'email' && (
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      )}
                    </div>
                    <div className="channel-text">
                      <span className="channel-label">{channel.label}</span>
                      <span className="channel-sublabel">{channel.sublabel}</span>
                    </div>
                    <span className="channel-arrow" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="contact-form-column">
            <div className="contact-card">
              {/* Card Header Meta */}
              <div className="contact-card-top">
                <span className="card-meta-tag">SEND AN ENQUIRY</span>
                <span className="card-meta-status">{contact.availability}</span>
              </div>

              {!isSubmitted ? (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  {/* Honeypot Spam Protection Field (hidden from real users) */}
                  <input
                    type="text"
                    name="company_website"
                    value={formData.company_website}
                    onChange={handleChange}
                    className="hp-field"
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  {/* Submission Error Banner */}
                  {errorMessage && (
                    <div className="form-error-banner" role="alert">
                      <div className="error-banner-content">
                        <span className="error-banner-icon" aria-hidden="true">⚠️</span>
                        <div className="error-banner-body">
                          <strong className="error-banner-title">Could not send enquiry</strong>
                          <span className="error-banner-text">{errorMessage}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-retry-dismiss"
                        onClick={() => setErrorMessage('')}
                        aria-label="Dismiss error notification"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      NAME <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name / Brand"
                      className={`form-input ${errors.name ? 'input-error' : ''}`}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      disabled={isLoading}
                      required
                    />
                    {errors.name && (
                      <span id="name-error" className="form-error-msg" role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      EMAIL <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      disabled={isLoading}
                      required
                    />
                    {errors.email && (
                      <span id="email-error" className="form-error-msg" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Phone Number Input (Accepts Indian +91 and international formats) */}
                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">
                      PHONE NUMBER <span className="form-optional-tag">(OPTIONAL)</span>
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      disabled={isLoading}
                    />
                    {errors.phone && (
                      <span id="phone-error" className="form-error-msg" role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Project Type Dropdown (Not preselected, placeholder default) */}
                  <div className="form-group">
                    <label htmlFor="contact-project-type" className="form-label">
                      PROJECT TYPE <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <div className="select-wrapper">
                      <select
                        id="contact-project-type"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className={`form-select ${!formData.projectType ? 'select-placeholder' : ''} ${errors.projectType ? 'input-error' : ''}`}
                        disabled={isLoading}
                        aria-invalid={Boolean(errors.projectType)}
                        required
                      >
                        <option value="" disabled>Select Project Type</option>
                        {contact.projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <span className="select-chevron" aria-hidden="true">▾</span>
                    </div>
                    {errors.projectType && (
                      <span className="form-error-msg" role="alert">
                        {errors.projectType}
                      </span>
                    )}
                  </div>

                  {/* Optional Fields Row: Deadline & Budget Range */}
                  <div className="form-row-2col">
                    {/* Optional Deadline */}
                    <div className="form-group">
                      <label htmlFor="contact-deadline" className="form-label">
                        DEADLINE <span className="form-optional-tag">(OPTIONAL)</span>
                      </label>
                      <input
                        type="text"
                        id="contact-deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        placeholder="e.g. Within 2 weeks"
                        className="form-input"
                        disabled={isLoading}
                      />
                    </div>

                    {/* Optional Budget Range in INR */}
                    <div className="form-group">
                      <label htmlFor="contact-budget" className="form-label">
                        BUDGET RANGE <span className="form-optional-tag">(OPTIONAL)</span>
                      </label>
                      <div className="select-wrapper">
                        <select
                          id="contact-budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={`form-select ${!formData.budget ? 'select-placeholder' : ''}`}
                          disabled={isLoading}
                        >
                          <option value="">Select Budget Range</option>
                          {contact.budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                        <span className="select-chevron" aria-hidden="true">▾</span>
                      </div>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      MESSAGE <span className="text-accent" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me a little about the project, visual direction and what you need."
                      className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      disabled={isLoading}
                      required
                    />
                    {errors.message && (
                      <span id="message-error" className="form-error-msg" role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary contact-submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="btn-spinner" aria-hidden="true"></span>
                        <span>SENDING ENQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND ENQUIRY</span>
                        <span className="btn-arrow" aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Live EmailJS Success State */
                <div className="form-success-container" role="status" aria-live="polite">
                  <div className="success-icon-badge" aria-hidden="true">
                    ✓
                  </div>
                  <h3 className="success-title">ENQUIRY SENT!</h3>
                  <p className="success-message">
                    Thanks for reaching out! I&apos;ll get back to you within 24 hours.
                  </p>

                  <div className="success-delivery-badge">
                    <span className="delivery-dot" aria-hidden="true"></span>
                    <span>ENQUIRY DELIVERED &bull; SIVA NOTIFIED</span>
                  </div>

                  {submittedData && (
                    <div className="captured-summary">
                      <div className="summary-row">
                        <span className="summary-key">SERVICE:</span>
                        <span className="summary-val">{submittedData.projectType}</span>
                      </div>
                      <div className="summary-row">
                        <span className="summary-key">EMAIL:</span>
                        <span className="summary-val">{submittedData.email}</span>
                      </div>
                      {submittedData.phone && (
                        <div className="summary-row">
                          <span className="summary-key">PHONE:</span>
                          <span className="summary-val">{submittedData.phone}</span>
                        </div>
                      )}
                      {submittedData.budget && (
                        <div className="summary-row">
                          <span className="summary-key">BUDGET:</span>
                          <span className="summary-val">{submittedData.budget}</span>
                        </div>
                      )}
                      {submittedData.deadline && (
                        <div className="summary-row">
                          <span className="summary-key">DEADLINE:</span>
                          <span className="summary-val">{submittedData.deadline}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-secondary contact-reset-btn"
                  >
                    SEND ANOTHER ENQUIRY
                  </button>
                </div>
              )}

              {/* Corner Frame Accents */}
              <span className="contact-corner contact-corner-tl" aria-hidden="true"></span>
              <span className="contact-corner contact-corner-tr" aria-hidden="true"></span>
              <span className="contact-corner contact-corner-bl" aria-hidden="true"></span>
              <span className="contact-corner contact-corner-br" aria-hidden="true"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
