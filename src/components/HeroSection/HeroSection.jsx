import React from "react";
import PropTypes from "prop-types";
import { SOCIAL_LINKS } from "../../constants/data";

const HeroTitle = ({ greeting, name, role }) => (
  <header className="hero__header">
    {greeting && <p className="hero__greeting">{greeting}</p>}
    <h1 id="hero-title" className="hero__title">
      <span className="hero__name">{name}</span>
    </h1>
    {role && <p className="hero__role">{role}</p>}
  </header>
);

const HeroSocialLinks = ({ links }) => (
  <div className="hero__social" aria-label="Social media links">
    <ul className="hero__social-list">
      {links.map(({ id, url, icon, label }) => (
        <li key={id} className="hero__social-item">
          <a
            href={url}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-link"
          >
            <i aria-hidden="true" className={`bx ${icon}`} />
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const HeroSection = ({
  translations,
  onNavigate,
  id = "hero",
  greetingText = "Hi, it’s me",
  name = "Dev Vela",
  roleText = translations?.heroSubtitle,
  descriptionText = translations?.heroDesc,
  ctaLabel = translations?.viewWork,
  ctaHref = "#projects",
  socialLinks = SOCIAL_LINKS,
}) => {
  const descriptionId = `${id}-description`;
  const ctaId = `${id}-cta`;

  const handleNavigate = (event) => {
    if (onNavigate) {
      onNavigate(event, ctaHref);
    }
  };

  return (
    <section
      id={id}
      className="hero"
      aria-labelledby="hero-title"
      aria-describedby={`${descriptionId} ${ctaId}`}
    >
      <div className="hero__inner">
        <HeroTitle greeting={greetingText} name={name} role={roleText} />

        {descriptionText && (
          <p id={descriptionId} className="hero__desc">
            {descriptionText}
          </p>
        )}

        <HeroSocialLinks links={socialLinks} />

        {ctaLabel && (
          <div className="hero__actions">
            <a
              id={ctaId}
              href={ctaHref}
              className="hero__cta"
              onClick={handleNavigate}
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

HeroTitle.propTypes = {
  greeting: PropTypes.string,
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
};

HeroSocialLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

HeroSection.propTypes = {
  translations: PropTypes.shape({
    heroSubtitle: PropTypes.string,
    heroDesc: PropTypes.string,
    viewWork: PropTypes.string,
  }),
  onNavigate: PropTypes.func,
  id: PropTypes.string,
  greetingText: PropTypes.string,
  name: PropTypes.string,
  roleText: PropTypes.string,
  descriptionText: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaHref: PropTypes.string,
  socialLinks: HeroSocialLinks.propTypes.links,
};

export default HeroSection;
