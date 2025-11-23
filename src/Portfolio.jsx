import React, { useState, useRef } from 'react';
import '../styles/style-base.css';
import '../styles/style-layout.css';
import '../styles/style-components.css';
import '../styles/style-animations.css';
import '../styles/style-responsive.css';

// Components
import Navigation from './components/Navigation/Navigation';
import LanguageSelector from './components/LanguageSelector/LanguageSelector';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import EducationSection from './components/EducationSection/EducationSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';

// Constants
import { TRANSLATIONS } from './constants/translations';

// Custom Hooks
import {
  useClickOutside,
  useScrollDetection,
  useScrollReveal,
  useSmoothScroll,
  useBodyScrollLock,
  useDocumentTitle
} from './hooks';

const Portfolio = () => {
  // State
  const [navOpen, setNavOpen] = useState(false);
  const [translateOpen, setTranslateOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  // Refs
  const navToggleRef = useRef(null);
  const navListRef = useRef(null);
  const translateButtonRef = useRef(null);
  const translateDropdownRef = useRef(null);

  // Get current translations
  const t = TRANSLATIONS[currentLang];

  // Custom hooks
  const isScrolled = useScrollDetection(100);
  const scrollTo = useSmoothScroll();
  
  useDocumentTitle(t.title);
  useBodyScrollLock(navOpen);
  useScrollReveal('.hero, .about, .education, .project, .contact');

  // Click outside handlers
  useClickOutside([navToggleRef, navListRef], () => {
    if (navOpen) setNavOpen(false);
  });

  useClickOutside([translateButtonRef, translateDropdownRef], () => {
    if (translateOpen) setTranslateOpen(false);
  });

  // Handlers
  const handleNavToggle = () => setNavOpen(prev => !prev);
  
  const handleNavClose = () => setNavOpen(false);

  const handleTranslateToggle = (e) => {
    e.stopPropagation();
    setTranslateOpen(prev => !prev);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setTranslateOpen(false);
  };

  const handleNavigate = scrollTo;

  const handleSmoothScroll = (e, targetId) => {
    scrollTo(targetId, handleNavClose)(e);
  };

  return (
    <>
      <header className="header" role="banner">
        <Navigation
          isOpen={navOpen}
          isScrolled={isScrolled}
          onToggle={handleNavToggle}
          onNavigate={handleSmoothScroll}
          navToggleRef={navToggleRef}
          navListRef={navListRef}
          translations={t}
        >
          <LanguageSelector
            isOpen={translateOpen}
            currentLang={currentLang}
            onToggle={handleTranslateToggle}
            onLanguageChange={handleLanguageChange}
            buttonRef={translateButtonRef}
            dropdownRef={translateDropdownRef}
          />
        </Navigation>
      </header>

      <main id="main-content">
        <HeroSection 
          translations={t} 
          onNavigate={handleSmoothScroll} 
        />
        <AboutSection translations={t} />
        <EducationSection translations={t} />
        <ProjectsSection translations={t} />
        <ContactSection translations={t} />
      </main>

      <Footer translations={t} />
    </>
  );
};

export default Portfolio;
