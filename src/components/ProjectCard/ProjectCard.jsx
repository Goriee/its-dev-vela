import React, { useState } from 'react';

const ProjectCard = ({ project, translations }) => {
  const [isZooming, setIsZooming] = useState(false);
  
  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const img = container.querySelector('img');
    if (!img) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distanceFromCenter = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    );
    const maxDistance = Math.sqrt(
      Math.pow(centerX, 2) + Math.pow(centerY, 2)
    );
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
    
    const zoomLevel = 1 + (normalizedDistance * 0.6) * 0.5 + 0.2;
    
    img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    img.style.transform = `scale(${zoomLevel})`;
    img.style.transition = 'transform 0.08s ease-out';
    setIsZooming(true);
  };

  const handleMouseLeave = (e) => {
    const img = e.currentTarget.querySelector('img');
    if (img) {
      img.style.transform = 'scale(1)';
      img.style.transformOrigin = 'center center';
      img.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
    }
    setIsZooming(false);
  };

  const title = translations[project.titleKey];
  const description = translations[project.descKey];

  return (
    <article className="project">
      <div
        className="project__img-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-zooming={isZooming}
      >
        <a 
          href={project.image} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="project__img-link"
          aria-label={`View ${title} screenshot`}
        >
          <img
            src={project.image}
            alt={`Screenshot of ${title}`}
            className="project__img"
            loading="lazy"
            width="400"
            height="233"
          />
        </a>
      </div>
      <div className="project__info">
        <h3 className="project__title">{title}</h3>
        <p className="project__desc">
          {description}
          <br />
          <strong>GitHub:</strong>{' '}
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            {project.github}
          </a>
        </p>
        <a
          href={project.link}
          className="project__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${title} on GitHub`}
        >
          {translations.viewProject}
        </a>
      </div>
    </article>
  );
};

export default ProjectCard;
