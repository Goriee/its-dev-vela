import React from 'react';
import { LANGUAGE_OPTIONS } from '../../constants/translations';

const LanguageSelector = ({ 
  isOpen, 
  currentLang, 
  onToggle, 
  onLanguageChange, 
  buttonRef, 
  dropdownRef 
}) => {
  const getCurrentLanguageName = () => {
    const lang = LANGUAGE_OPTIONS.find(l => l.code === currentLang);
    return lang?.name || 'Translate';
  };

  return (
    <div className="translate-container">
      <button
        className="translate__button"
        ref={buttonRef}
        onClick={onToggle}
        aria-label="Translate this page"
        aria-expanded={isOpen}
      >
        <i className="bx bx-globe" />
        <span className="translate__text">{getCurrentLanguageName()}</span>
        <i className="bx bx-chevron-down translate__arrow" />
      </button>
      <div
        className={`translate__dropdown ${isOpen ? 'active' : ''}`}
        ref={dropdownRef}
      >
        {LANGUAGE_OPTIONS.map(({ code, flag, name }) => (
          <button
            key={code}
            className="translate__option"
            onClick={() => onLanguageChange(code)}
            aria-current={currentLang === code ? 'true' : undefined}
          >
            {flag} {name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
