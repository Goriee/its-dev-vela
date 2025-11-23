import React from 'react';
import { EDUCATION_DATA } from '../../constants/data';

const EducationSection = ({ translations }) => {
  return (
    <section id="education" className="education" aria-labelledby="education-heading">
      <h2 id="education-heading" className="education__heading">
        {translations.educationHeading}
      </h2>
      <div className="education__list">
        {EDUCATION_DATA.map(({ year, index }) => {
          const eduItem = translations.educationItems[index];
          return (
            <div key={index} className="education__item">
              <time className="education__year">{year}</time>
              <div className="education__details">
                <span className="education__degree">{eduItem.degree}</span>
                <br />
                <span className="education__school">{eduItem.school}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EducationSection;
