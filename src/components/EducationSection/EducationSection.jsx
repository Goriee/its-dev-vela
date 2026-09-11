import React from 'react';
import PropTypes from 'prop-types';
import { EDUCATION_DATA } from '../../constants/data';

const EducationSection = ({ translations }) => {
  return (
    <section id="education" className="education" aria-labelledby="education-heading">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Academic Path</span>
          <h2 id="education-heading" className="section-title">
            {translations.educationHeading}
          </h2>
          <p className="section-subtitle">
            {translations.educationSubheading}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="education__timeline">
          <div className="education__timeline-line" aria-hidden="true" />

          <ol className="education__timeline-list">
            {EDUCATION_DATA.map(({ year, index, status, badge }) => {
              const eduItem = translations.educationItems?.[index] || {
                degree: 'Academic Degree',
                school: 'Institution'
              };

              return (
                <li key={index} className="education__item">
                  {/* Timeline Marker Node */}
                  <div className="education__node" aria-hidden="true">
                    <span className="education__node-inner" />
                  </div>

                  {/* Card Content */}
                  <div className="education__card">
                    <div className="education__card-header">
                      <time className="education__year-badge">{year}</time>
                      <div className="education__badges">
                        <span className="tag-chip tag-chip--subtle">{badge}</span>
                        <span className={`education__status-pill ${status === 'In Progress' ? 'education__status-pill--active' : ''}`}>
                          {status}
                        </span>
                      </div>
                    </div>

                    <h3 className="education__degree">{eduItem.degree}</h3>
                    <p className="education__school">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                      <span>{eduItem.school}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

EducationSection.propTypes = {
  translations: PropTypes.object.isRequired
};

export default EducationSection;
