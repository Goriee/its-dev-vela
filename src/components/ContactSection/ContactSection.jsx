import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../constants/data';

const ContactSection = ({ translations, onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_INFO.email);
    setEmailCopied(true);
    onShowToast?.(translations.emailCopied || 'Email copied to clipboard!');
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      onShowToast?.(translations.validationError || 'Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    const accessKey = import.meta.env?.VITE_WEB3FORMS_KEY;

    try {
      if (accessKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Portfolio Inquiry from ${formData.name}`,
            from_name: formData.name
          })
        });

        const data = await response.json();
        if (data.success) {
          setIsSuccess(true);
          setFormData({ name: '', email: '', message: '' });
          onShowToast?.(translations.messageSent || 'Message sent successfully!', 'success');
          setTimeout(() => setIsSuccess(false), 5000);
          return;
        }
      }

      // If no API key is present or API responded with fallback, open mailto intent
      const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`
      )}`;

      window.open(mailtoUrl, '_blank');
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      onShowToast?.(translations.messageSent || 'Delivering via your email application...', 'success');
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error('Contact submission fallback:', err);
      const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `${formData.message}\n\n---\nFrom: ${formData.name}\nEmail: ${formData.email}`
      )}`;
      window.open(mailtoUrl, '_blank');
      onShowToast?.('Opening your email app to send...', 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <div className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">Get In Touch</span>
          <h2 id="contact-heading" className="section-title">
            {translations.contactHeading}
          </h2>
          <p className="section-subtitle">
            {translations.contactSubheading}
          </p>
        </div>

        <div className="contact__layout">
          <div className="contact__info-card">
            <h3 className="contact__info-title">{translations.directContact}</h3>
            <p className="contact__info-desc">{translations.responseTime}</p>

            <div className="contact__details">
              <div className="contact__detail-item">
                <span className="contact__detail-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <div className="contact__detail-text">
                  <span className="contact__detail-label">{translations.emailLabel}</span>
                  <div className="contact__email-row">
                    <a href={`mailto:${CONTACT_INFO.email}`} className="contact__email-link">
                      {CONTACT_INFO.email}
                    </a>
                    <button
                      type="button"
                      className="contact__copy-btn"
                      onClick={handleCopyEmail}
                      aria-label="Copy email address"
                      title="Copy email"
                    >
                      {emailCopied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="contact__detail-item">
                <span className="contact__detail-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div className="contact__detail-text">
                  <span className="contact__detail-label">Location & Time</span>
                  <span className="contact__detail-value">{CONTACT_INFO.location} ({CONTACT_INFO.timezone})</span>
                </div>
              </div>

              <div className="contact__detail-item">
                <span className="contact__detail-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>
                <div className="contact__detail-text">
                  <span className="contact__detail-label">Status</span>
                  <span className="contact__detail-value">{CONTACT_INFO.availability}</span>
                </div>
              </div>
            </div>

            <div className="contact__socials">
              <span className="contact__socials-label">Social Platforms</span>
              <div className="contact__socials-list">
                {SOCIAL_LINKS.map(({ id, url, label, handle }) => (
                  <a
                    key={id}
                    href={url}
                    className="contact__social-chip"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{label}</span>
                    <span className="contact__social-handle">{handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="contact__form-card">
            <form 
              className="contact__form" 
              onSubmit={handleSubmit} 
              aria-label="Contact Dev Vela"
              noValidate
            >
              {isSuccess && (
                <div className="contact__success-banner" role="alert">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{translations.messageSent}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  {translations.nameLabel} <span className="form-required" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                  placeholder={translations.namePlaceholder || 'Your Name'}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <span id="name-error" className="form-error" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  {translations.emailLabel} <span className="form-required" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                  placeholder={translations.emailPlaceholder || 'your.email@example.com'}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="form-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  {translations.messageLabel} <span className="form-required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`form-textarea ${errors.message ? 'form-input--error' : ''}`}
                  placeholder={translations.messagePlaceholder || 'Tell me about your project...'}
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span id="message-error" className="form-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn--primary contact__submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    <span>{translations.sending}</span>
                  </>
                ) : (
                  <>
                    <span>{translations.sendButton}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

ContactSection.propTypes = {
  translations: PropTypes.object.isRequired,
  onShowToast: PropTypes.func
};

export default ContactSection;
