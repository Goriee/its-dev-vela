import React, { useState } from 'react';

const ContactSection = ({ translations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    // You could integrate with an API, email service, etc.
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="contact__heading">
        {translations.contactHeading}
      </h2>
      <div className="contact__box">
        <form 
          className="contact__form" 
          onSubmit={handleSubmit} 
          aria-label="Contact form"
          noValidate
        >
          <label htmlFor="name" className="contact__label">
            {translations.nameLabel}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="contact__input"
            value={formData.name}
            onChange={handleChange}
            required
            aria-required="true"
          />

          <label htmlFor="email" className="contact__label">
            {translations.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="contact__input"
            value={formData.email}
            onChange={handleChange}
            required
            aria-required="true"
          />

          <label htmlFor="message" className="contact__label">
            {translations.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            className="contact__input"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            aria-required="true"
          />

          <button type="submit" className="contact__submit">
            {translations.sendButton}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
