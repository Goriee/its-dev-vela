import { useState, useEffect, useCallback } from 'react';

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
export const useScrollDetection = (threshold = 100) => {
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
    const defaultOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };

    const elements = document.querySelectorAll(selectors);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
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
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
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
    document.body.style.overflow = isLocked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
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
