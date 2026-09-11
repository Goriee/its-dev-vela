import React from 'react';
import PropTypes from 'prop-types';
import profileImg from '../../assets/profile.jpg';

const AboutSection = ({ translations }) => {
  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Profile & Mission</span>
          <h2 id="about-heading" className="section-title">
            {translations.aboutHeading}
          </h2>
          <p className="section-subtitle">
            {translations.aboutSubheading}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="about__bento">
          {/* Main Profile & Bio Card */}
          <div className="about__card about__card--profile">
            <div className="about__profile-header">
              <div className="about__avatar-wrapper">
                <img
                  src={profileImg}
                  alt="Dev Vela portrait"
                  className="about__avatar"
                  loading="lazy"
                  width="120"
                  height="120"
                />
                <span className="about__avatar-ring" aria-hidden="true" />
              </div>
              <div className="about__profile-meta">
                <h3 className="about__name">Dev Vela</h3>
                <span className="about__role-pill">Backend & Web3 Engineer</span>
                <span className="about__location">Philippines • GMT+8</span>
              </div>
            </div>

            <p className="about__bio-text">{translations.aboutText}</p>

            {/* Quick Stats Strip */}
            <div className="about__stats-grid">
              <div className="about__stat">
                <span className="about__stat-value">{translations.yearsExperience}</span>
                <span className="about__stat-label">{translations.yearsExperienceLabel}</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-value">{translations.projectsCompleted}</span>
                <span className="about__stat-label">{translations.projectsCompletedLabel}</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-value">{translations.primaryFocus}</span>
                <span className="about__stat-label">{translations.primaryFocusLabel}</span>
              </div>
            </div>
          </div>

          {/* Pillar Card 1: Backend Architecture */}
          <div className="about__card about__card--pillar">
            <div className="about__pillar-icon about__pillar-icon--backend" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                <line x1="6" x2="6.01" y1="6" y2="6" />
                <line x1="6" x2="6.01" y1="18" y2="18" />
              </svg>
            </div>
            <h3 className="about__pillar-title">{translations.backendPillarTitle}</h3>
            <p className="about__pillar-desc">{translations.backendPillarDesc}</p>
            <div className="about__pillar-tags">
              <span className="tag-chip">Node.js</span>
              <span className="tag-chip">Express</span>
              <span className="tag-chip">MySQL / Postgres</span>
              <span className="tag-chip">REST APIs</span>
            </div>
          </div>

          {/* Pillar Card 2: Web3 & Gaming */}
          <div className="about__card about__card--pillar">
            <div className="about__pillar-icon about__pillar-icon--web3" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <h3 className="about__pillar-title">{translations.web3PillarTitle}</h3>
            <p className="about__pillar-desc">{translations.web3PillarDesc}</p>
            <div className="about__pillar-tags">
              <span className="tag-chip">Solidity Basics</span>
              <span className="tag-chip">GameFi</span>
              <span className="tag-chip">dApps</span>
              <span className="tag-chip">EVM</span>
            </div>
          </div>

          {/* Pillar Card 3: Market & Data Systems */}
          <div className="about__card about__card--pillar">
            <div className="about__pillar-icon about__pillar-icon--trading" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="20" y2="10" />
                <line x1="18" x2="18" y1="20" y2="4" />
                <line x1="6" x2="6" y1="20" y2="16" />
              </svg>
            </div>
            <h3 className="about__pillar-title">{translations.tradingPillarTitle}</h3>
            <p className="about__pillar-desc">{translations.tradingPillarDesc}</p>
            <div className="about__pillar-tags">
              <span className="tag-chip">Python</span>
              <span className="tag-chip">Web Scraping</span>
              <span className="tag-chip">Market Analysis</span>
              <span className="tag-chip">Pipelines</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutSection.propTypes = {
  translations: PropTypes.object.isRequired
};

export default AboutSection;
