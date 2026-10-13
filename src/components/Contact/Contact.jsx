import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import contact from '../../data/contact';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: contact.services[0] || 'PHOTO EDITING',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Vite environment variables for EmailJS
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_q9d8ezb';
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_x8kfjbr';
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

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

    // Phone number is optional. If provided, validate international format and length.
    if (formData.phone && formData.phone.trim()) {
      const trimmedPhone = formData.phone.trim();
      const phoneRegex = /^[+]?[\d\s().-]{6,25}$/;
      const digitsOnly = trimmedPhone.replace(/\D/g, '');
      if (!phoneRegex.test(trimmedPhone) || digitsOnly.length < 6 || digitsOnly.length > 15) {
        newErrors.phone = 'Please enter a valid phone number.';
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

    // Map form fields to template variables:
    // Name -> name
    // Email -> email
    // Phone -> phone
    // Project Type -> project_type
    // Message -> message
    // Reply-To -> reply_to (for Gmail reply configuration)
    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: (formData.phone || '').trim(),
      project_type: formData.projectType,
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
        // Save submitted values for display in the success message
        setSubmittedData({ ...formData });

        // Clear the form only after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: contact.services[0] || 'PHOTO EDITING',
          message: ''
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
      projectType: contact.services[0] || 'PHOTO EDITING',
      message: ''
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
          {/* Left Column: Editorial Statement, Services & Availability */}
          <div className="contact-info">
            <div className="eyebrow">
              <span className="badge-dot" aria-hidden="true"></span>
              <span>{contact.eyebrow}</span>
            </div>

            <h2 className="contact-title">
              LET'S CREATE SOMETHING <span className="text-accent">WORTH REMEMBERING.</span>
            </h2>

            <p className="contact-description">
              {contact.description}
            </p>

            {/* Services Capabilities List */}
            <div className="contact-services-block">
              <div className="contact-block-header">
                <span className="block-label">WHAT I CAN HELP WITH</span>
                <span className="block-line" aria-hidden="true"></span>
              </div>
              <ul className="contact-services-list" aria-label="Services offered">
                {contact.services.map((service, index) => (
                  <li key={service} className="contact-service-item">
                    <span className="service-index" aria-hidden="true">0{index + 1}</span>
                    <span className="service-name">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

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
          </div>

          {/* Right Column: Project Enquiry Form */}
          <div className="contact-form-column">
            <div className="contact-card">
              {/* Card Header Meta */}
              <div className="contact-card-top">
                <span className="card-meta-tag">ENQUIRY / 01</span>
                <span className="card-meta-status">OPEN FOR SELECT WORK</span>
              </div>

              {!isSubmitted ? (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
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

                  {/* Phone Number Input */}
                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
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

                  {/* Project Type Dropdown */}
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
                        className="form-select"
                        disabled={isLoading}
                        required
                      >
                        {contact.services.map((service) => (
                          <option key={service} value={service}>
                            {service}
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
                    Thanks <strong className="text-primary">{submittedData?.name || 'for reaching out'}</strong> — your message has been sent directly to Siva. I'll review your project details and reply to <strong>{submittedData?.email}</strong> shortly.
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
