import React from 'react';
import PropTypes from 'prop-types';
import { LANGUAGE_OPTIONS } from '../../constants/translations';

const LanguageSelector = ({ 
  isOpen, 
  currentLang, 
  onToggle, 
  onLanguageChange, 
  buttonRef, 
  dropdownRef 
}) => {
  const currentLangObj = LANGUAGE_OPTIONS.find(l => l.code === currentLang) || LANGUAGE_OPTIONS[0];

  return (
    <div className="translate-container">
      <button
        type="button"
        className="translate__button"
        ref={buttonRef}
        onClick={onToggle}
        aria-label={`Select language (currently ${currentLangObj.name})`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="translate__globe" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        </span>
        <span className="translate__current-flag" aria-hidden="true">{currentLangObj.flag}</span>
        <span className="translate__text">{currentLangObj.name}</span>
        <span className={`translate__arrow ${isOpen ? 'translate__arrow--open' : ''}`} aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </span>
      </button>

      <div
        className={`translate__dropdown ${isOpen ? 'translate__dropdown--open' : ''}`}
        ref={dropdownRef}
        role="listbox"
        aria-label="Languages"
      >
        {LANGUAGE_OPTIONS.map(({ code, flag, name }) => {
          const isSelected = currentLang === code;
          return (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={isSelected}
              className={`translate__option ${isSelected ? 'translate__option--selected' : ''}`}
              onClick={() => onLanguageChange(code)}
            >
              <span className="translate__option-flag" aria-hidden="true">{flag}</span>
              <span className="translate__option-name">{name}</span>
              {isSelected && (
                <span className="translate__check" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

LanguageSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  currentLang: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  buttonRef: PropTypes.object,
  dropdownRef: PropTypes.object
};

export default LanguageSelector;
