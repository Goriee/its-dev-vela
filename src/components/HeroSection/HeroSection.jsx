import React, { useState, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { SOCIAL_LINKS, TECH_STACK, CONTACT_INFO, RESUME_URL } from '../../constants/data';
import ModelViewerSkeleton from '../ModelViewer3D/ModelViewerSkeleton';

const ModelViewer3D = lazy(() => import('../ModelViewer3D/ModelViewer3D'));

// Inline SVGs for social platforms
const SocialIcon = ({ id }) => {
  switch (id) {
    case 'github':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      );
    case 'twitter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    default:
      return null;
  }
};

SocialIcon.propTypes = {
  id: PropTypes.string.isRequired
};

const HeroSection = ({ 
  translations, 
  onNavigate,
  onCopyEmail 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(CONTACT_INFO.email);
    setCopied(true);
    onCopyEmail?.(translations.emailCopied || 'Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__ambient-glow" aria-hidden="true" />
      <div className="hero__grid-pattern" aria-hidden="true" />

      {/* 3D Model in the background */}
      <div className="hero__model-bg" aria-label="Interactive 3D Experience">
        <Suspense fallback={<ModelViewerSkeleton />}>
          <ModelViewer3D modelUrl="/models/mymodel.glb" />
        </Suspense>
      </div>

      <div className="hero__container">
        <div className="hero__content-col">
          <div className="hero__badge">
            <span className="hero__badge-pulse" aria-hidden="true" />
            <span className="hero__badge-text">{translations.availableBadge}</span>
          </div>

          <div className="hero__heading-group">
            <p className="hero__greeting">Hello, I&apos;m</p>
            <h1 id="hero-title" className="hero__title">
              <span className="hero__title-accent">Dev Vela</span>
            </h1>
            <p className="hero__subtitle">{translations.heroSubtitle}</p>
          </div>

          <p className="hero__desc">{translations.heroDesc}</p>

          <div className="hero__actions">
            <a
              href="#projects"
              className="btn btn--primary hero__cta-primary"
              onClick={(e) => onNavigate(e, '#projects')}
            >
              <span>{translations.viewWork}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary hero__cta-resume"
              aria-label="View Resume / Curriculum Vitae"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>{translations.resume || 'Resume / CV'}</span>
            </a>

            <button
              type="button"
              className="btn btn--secondary hero__cta-secondary hero__cta-copy"
              onClick={handleCopy}
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  <span>{translations.copyEmail}</span>
                </>
              )}
            </button>
          </div>

          <div className="hero__social" aria-label="Social profiles">
            <ul className="hero__social-list">
              {SOCIAL_LINKS.map(({ id, url, label }) => (
                <li key={id} className="hero__social-item">
                  <a
                    href={url}
                    className="hero__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                  >
                    <SocialIcon id={id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__tech-strip" aria-label="Core technologies">
            <span className="hero__tech-label">Core Technologies:</span>
            <div className="hero__tech-list">
              {TECH_STACK.slice(0, 7).map(({ name }) => (
                <span key={name} className="hero__tech-pill">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  translations: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired,
  onCopyEmail: PropTypes.func
};

export default HeroSection;
