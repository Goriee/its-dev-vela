import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing dark and light theme
 */
export const useTheme = (defaultTheme = 'dark') => {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    } catch {
      // Fallback
    }
    return defaultTheme;
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Storage might be disabled
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme, isDark: theme === 'dark' };
};

/**
 * Custom hook for active section scrollspy
 */
export const useScrollSpy = (sectionIds, offset = 120) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }

      if (window.scrollY < 100 && sectionIds.length > 0) {
        setActiveSection(sectionIds[0]);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};

/**
 * Custom hook for handling click outside of referenced elements
 */
export const useClickOutside = (refs, callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      const isOutside = refs.every(ref => 
        ref.current && !ref.current.contains(event.target)
      );
      
      if (isOutside) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [refs, callback]);
};

/**
 * Custom hook for scroll detection
 */
export const useScrollDetection = (threshold = 80) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};

/**
 * Custom hook for scroll reveal animations with Intersection Observer
 */
export const useScrollReveal = (selectors, options = {}) => {
  useEffect(() => {
    // Respect user's reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(selectors).forEach(el => {
        el.classList.add('reveal-visible');
      });
      return;
    }

    const defaultOptions = {
      threshold: 0.05,
      rootMargin: '100px 0px 50px 0px',
      ...options
    };

    const elements = document.querySelectorAll(selectors);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, defaultOptions);

    elements.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [selectors, options]);
};

/**
 * Custom hook for smooth scrolling to sections
 */
export const useSmoothScroll = () => {
  const scrollTo = useCallback((targetId, callback) => {
    return (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      const target = document.querySelector(targetId);
      if (target) {
        const navOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        callback?.();
      }
    };
  }, []);

  return scrollTo;
};

/**
 * Custom hook for managing body scroll lock
 */
export const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isLocked]);
};

/**
 * Custom hook for document title management
 */
export const useDocumentTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);
};
