import React from 'react';
import PropTypes from 'prop-types';

const ProjectCard = ({ project, translations, onOpenModal }) => {
  const title = translations[project.titleKey] || project.id;
  const description = translations[project.descKey] || '';

  return (
    <article className="project-card">
      <div className="project-card__media">
        <img
          src={project.image}
          alt={`Screenshot of ${title}`}
          className="project-card__img"
          loading="lazy"
          width="400"
          height="225"
        />
        <div className="project-card__overlay" aria-hidden="true" />
        
        <button
          type="button"
          className="project-card__quick-btn"
          onClick={() => onOpenModal(project)}
          aria-label={`${translations.quickView || 'Quick View'} - ${title}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>{translations.quickView || 'Quick View'}</span>
        </button>
      </div>

      <div className="project-card__body">
        <div className="project-card__tags">
          {project.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-chip tag-chip--subtle">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="project-card__title">
          <button
            type="button"
            className="project-card__title-btn"
            onClick={() => onOpenModal(project)}
          >
            {title}
          </button>
        </h3>

        <p className="project-card__desc">{description}</p>

        <div className="project-card__actions">
          <button
            type="button"
            className="btn-text"
            onClick={() => onOpenModal(project)}
          >
            <span>{translations.quickView || 'Details'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <a
            href={project.link}
            className="project-card__github-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} source on GitHub`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    titleKey: PropTypes.string.isRequired,
    descKey: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  translations: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired
};

export default ProjectCard;
