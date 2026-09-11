import React, { useState, useRef, useCallback } from 'react';
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
import ProjectModal from './components/ProjectModal/ProjectModal';
import ContactSection from './components/ContactSection/ContactSection';
import Footer from './components/Footer/Footer';
import Toast from './components/Toast/Toast';

// Constants
import { TRANSLATIONS } from './constants/translations';

// Custom Hooks
import {
  useTheme,
  useScrollSpy,
  useClickOutside,
  useScrollDetection,
  useScrollReveal,
  useSmoothScroll,
  useBodyScrollLock,
  useDocumentTitle
} from './hooks';

const SECTION_IDS = ['hero', 'about', 'projects', 'education', 'contact'];

const Portfolio = () => {
  // Theme management hook
  const { theme, toggleTheme } = useTheme('dark');

  // State
  const [navOpen, setNavOpen] = useState(false);
  const [translateOpen, setTranslateOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [modalProject, setModalProject] = useState(null);
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Refs
  const navToggleRef = useRef(null);
  const navListRef = useRef(null);
  const translateButtonRef = useRef(null);
  const translateDropdownRef = useRef(null);

  // Current translations
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // Custom hooks
  const isScrolled = useScrollDetection(60);
  const activeSection = useScrollSpy(SECTION_IDS, 100);
  const scrollTo = useSmoothScroll();
  
  useDocumentTitle(t.title);
  useBodyScrollLock(navOpen || !!modalProject);
  useScrollReveal('.about__card, .project-card, .education__item, .contact__info-card, .contact__form-card');

  // Click outside handlers
  useClickOutside([navToggleRef, navListRef], () => {
    if (navOpen) setNavOpen(false);
  });

  useClickOutside([translateButtonRef, translateDropdownRef], () => {
    if (translateOpen) setTranslateOpen(false);
  });

  // Navigation handlers
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

  const handleSmoothScroll = (e, targetId) => {
    scrollTo(targetId, handleNavClose)(e);
  };

  // Toast helper
  const showToast = useCallback((message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  }, []);

  const closeToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  // Modal handlers
  const handleOpenModal = useCallback((project) => {
    setModalProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalProject(null);
  }, []);

  return (
    <>
      <a href="#projects" className="skip-link">
        Skip to main content
      </a>
      <header role="banner">
        <Navigation
          isOpen={navOpen}
          isScrolled={isScrolled}
          activeSection={activeSection}
          onToggle={handleNavToggle}
          onNavigate={handleSmoothScroll}
          navToggleRef={navToggleRef}
          navListRef={navListRef}
          translations={t}
          theme={theme}
          onToggleTheme={toggleTheme}
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
          onCopyEmail={showToast}
        />
        <AboutSection translations={t} />
        <ProjectsSection 
          translations={t} 
          onOpenModal={handleOpenModal}
        />
        <EducationSection translations={t} />
        <ContactSection 
          translations={t} 
          onShowToast={showToast}
        />
      </main>

      <Footer translations={t} />

      {/* Interactive Project Quick View Modal */}
      <ProjectModal
        isOpen={!!modalProject}
        project={modalProject}
        onClose={handleCloseModal}
        translations={t}
      />

      {/* Accessible Toast Notification */}
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />
    </>
  );
};

export default Portfolio;
