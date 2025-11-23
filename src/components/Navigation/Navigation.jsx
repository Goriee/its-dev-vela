import React from 'react';
import { NAV_ITEMS } from '../../constants/data';

const Navigation = ({ 
  isOpen, 
  isScrolled, 
  onToggle, 
  onNavigate, 
  navToggleRef, 
  navListRef,
  translations,
  children 
}) => {
  return (
    <nav className={`nav ${isScrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <div className="nav__container">
        <div className="nav__left">
          <button
            className={`nav__toggle ${isOpen ? 'active' : ''}`}
            ref={navToggleRef}
            onClick={onToggle}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span className="nav__toggle-line" />
            <span className="nav__toggle-line" />
            <span className="nav__toggle-line" />
          </button>
          <div className="nav__logo">
            <span className="logo-text">Dev Vela</span>
          </div>
        </div>

        <div className="nav__center">
          <div className="nav__logo nav__logo--mobile">
            <span className="logo-text">Dev Vela</span>
          </div>
          <ul className={`nav__list ${isOpen ? 'active' : ''}`} ref={navListRef}>
            {NAV_ITEMS.map(({ id, labelKey }) => (
              <li key={id} className="nav__item">
                <a 
                  className="nav__link" 
                  href={`#${id}`} 
                  onClick={(e) => onNavigate(e, `#${id}`)}
                >
                  {translations[labelKey]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav__right">
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
