import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PROJECT_DATA, PROJECT_CATEGORIES } from '../../constants/data';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectsSection = ({ translations, onOpenModal }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? PROJECT_DATA
    : PROJECT_DATA.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <div className="section-container">
        <div className="section-header">
          <span className="section-eyebrow">Portfolio</span>
          <h2 id="projects-heading" className="section-title">
            {translations.projectsHeading}
          </h2>
          <p className="section-subtitle">
            {translations.projectsSubheading}
          </p>
        </div>

        <div className="projects__filter-bar" role="tablist" aria-label="Project categories">
          {PROJECT_CATEGORIES.map(({ id, labelKey }) => {
            const isActive = activeCategory === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`projects__filter-btn ${isActive ? 'projects__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(id)}
              >
                {translations[labelKey] || id}
              </button>
            );
          })}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              translations={translations}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

ProjectsSection.propTypes = {
  translations: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired
};

export default ProjectsSection;
