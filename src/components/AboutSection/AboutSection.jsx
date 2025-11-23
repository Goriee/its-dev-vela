import React from 'react';
import profileImg from '../../assets/profile.jpg';

const AboutSection = ({ translations }) => {
  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <h2 id="about-heading" className="about__heading">
        {translations.aboutHeading}
      </h2>
      <div className="about__content">
        <img
          src={profileImg}
          alt="Portrait of Dev Vela"
          className="about__img"
          loading="lazy"
          width="320"
          height="320"
        />
        <div className="about__text">
          <p>{translations.aboutText}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
