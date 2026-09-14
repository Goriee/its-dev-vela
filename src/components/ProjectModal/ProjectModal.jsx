import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ProjectModal = ({ isOpen, onClose, project, translations }) => {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      closeButtonRef.current?.focus();
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const title = translations[project.titleKey] || project.id;
  const description = translations[project.descKey] || '';

  return (
    <div
      className="project-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        className="project-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <button
          type="button"
          ref={closeButtonRef}
          className="project-modal__close-btn"
          onClick={onClose}
          aria-label={translations.closeModal || 'Close dialog'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="project-modal__media">
          <img
            src={project.image}
            alt={`Screenshot of ${title}`}
            className="project-modal__image"
          />
        </div>

        <div className="project-modal__body">
          <div className="project-modal__header">
            <div className="project-modal__tags">
              {project.tags?.map((tag) => (
                <span key={tag} className="tag-chip">
                  {tag}
                </span>
              ))}
            </div>
            <h3 id="modal-project-title" className="project-modal__title">
              {title}
            </h3>
          </div>

          <p className="project-modal__desc">{description}</p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="project-modal__highlights">
              <h4 className="project-modal__section-heading">
                {translations.keyHighlights || 'Key Highlights'}
              </h4>
              <ul className="project-modal__highlight-list">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="project-modal__highlight-item">
                    <span className="project-modal__bullet" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="project-modal__actions">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>{translations.viewCode || 'View Code on GitHub'}</span>
            </a>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              {translations.closeModal || 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  project: PropTypes.shape({
    id: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    github: PropTypes.string,
    titleKey: PropTypes.string,
    descKey: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    highlights: PropTypes.arrayOf(PropTypes.string)
  }),
  translations: PropTypes.object.isRequired
};

export default ProjectModal;
