import React from 'react';
import { PROJECT_DATA } from '../../constants/data';
import ProjectCard from '../ProjectCard/ProjectCard';

const ProjectsSection = ({ translations }) => {
  return (
    <section id="projects" className="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="projects__heading">
        {translations.projectsHeading}
      </h2>
      <div className="projects__list">
        {PROJECT_DATA.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            translations={translations}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
