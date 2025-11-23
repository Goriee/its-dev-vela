import React from 'react';

const Footer = ({ translations }) => {
  return (
    <footer className="footer" role="contentinfo">
      <p className="footer__text">{translations.footerText}</p>
      <ul className="footer__social" role="list">
        <li>
          <a 
            href="https://github.com/Goriee" 
            className="footer__link" 
            aria-label="GitHub Profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span aria-hidden="true">🐙</span>
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className="footer__link" 
            aria-label="LinkedIn Profile"
          >
            <span aria-hidden="true">💼</span>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
