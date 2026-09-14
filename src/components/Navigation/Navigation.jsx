import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NAV_ITEMS, RESUME_URL } from '../../constants/data';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

const Navigation = ({ 
  isOpen, 
  isScrolled, 
  activeSection,
  onToggle, 
  onNavigate, 
  navToggleRef, 
  navListRef,
  translations,
  theme,
  onToggleTheme,
  children 
}) => {
  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onToggle();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onToggle]);

  return (
    <nav 
      className={`nav ${isScrolled ? 'nav--scrolled' : ''}`} 
      aria-label="Main navigation"
    >
      <div className="nav__container">
        <div className="nav__brand">
          <a 
            href="#hero" 
            className="nav__logo" 
            onClick={(e) => onNavigate(e, '#hero')}
            aria-label="Dev Vela Homepage"
          >
            <span className="nav__logo-avatar" aria-hidden="true">DV</span>
            <span className="nav__logo-text">Dev Vela</span>
            <span className="nav__status-dot" title="Available for work" aria-hidden="true" />
          </a>
        </div>

        <div className="nav__desktop">
          <ul className="nav__list">
            {NAV_ITEMS.map(({ id, labelKey }) => {
              const isActive = activeSection === id;
              return (
                <li key={id} className="nav__item">
                  <a 
                    className={`nav__link ${isActive ? 'nav__link--active' : ''}`} 
                    href={`#${id}`} 
                    onClick={(e) => onNavigate(e, `#${id}`)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {translations[labelKey]}
                    {isActive && <span className="nav__active-pill" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
            <li className="nav__item">
              <a 
                className="nav__link nav__link--resume" 
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Resume / CV"
              >
                {translations.resume || 'Resume'}
              </a>
            </li>
          </ul>
        </div>

        <div className="nav__controls">
          {children}
          
          <ThemeToggle
            theme={theme}
            onToggle={onToggleTheme}
            label={translations.themeToggle}
          />

          <button
            type="button"
            className={`nav__toggle-btn ${isOpen ? 'nav__toggle-btn--open' : ''}`}
            ref={navToggleRef}
            onClick={onToggle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
            <span className="nav__toggle-bar" />
          </button>
        </div>
      </div>

      <div 
        id="mobile-navigation"
        className={`nav__drawer ${isOpen ? 'nav__drawer--open' : ''}`} 
        ref={navListRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="nav__drawer-inner">
          <ul className="nav__drawer-list">
            {NAV_ITEMS.map(({ id, labelKey }) => {
              const isActive = activeSection === id;
              return (
                <li key={id} className="nav__drawer-item">
                  <a 
                    className={`nav__drawer-link ${isActive ? 'nav__drawer-link--active' : ''}`} 
                    href={`#${id}`} 
                    onClick={(e) => onNavigate(e, `#${id}`)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {translations[labelKey]}
                  </a>
                </li>
              );
            })}
            <li className="nav__drawer-item">
              <a 
                className="nav__drawer-link nav__drawer-link--resume" 
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Resume / CV"
              >
                {translations.resume || 'Resume'}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isScrolled: PropTypes.bool.isRequired,
  activeSection: PropTypes.string,
  onToggle: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  navToggleRef: PropTypes.object,
  navListRef: PropTypes.object,
  translations: PropTypes.object.isRequired,
  theme: PropTypes.oneOf(['dark', 'light']).isRequired,
  onToggleTheme: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Navigation;
