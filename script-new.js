// script.js - Vela Portfolio
// Mobile navigation, translation, and scroll animations

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  const navLinks = document.querySelectorAll('.nav__link');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navToggle.classList.toggle('active');
      navList.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Translation Feature
  const translateButton = document.getElementById('translateButton');
  const translateDropdown = document.getElementById('translateDropdown');
  const translateOptions = document.querySelectorAll('.translate__option');

  if (translateButton && translateDropdown) {
    // Global callback function required by Google Translate
    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,es,zh-CN,ja,fr,de',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    };

    // Initialize Google Translate
    function initGoogleTranslate() {
      // Create Google Translate element container if it doesn't exist
      if (!document.getElementById('google_translate_element')) {
        const translateDiv = document.createElement('div');
        translateDiv.id = 'google_translate_element';
        translateDiv.style.display = 'none';
        document.body.appendChild(translateDiv);
      }

      // Load Google Translate script if not already loaded
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.head.appendChild(script);
      }
    }

    // Initialize on page load
    initGoogleTranslate();

    // Handle translate button click
    translateButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = translateButton.getAttribute('aria-expanded') === 'true';
      
      translateButton.setAttribute('aria-expanded', !isExpanded);
      translateDropdown.classList.toggle('active');
    });

    // Close translate dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!translateButton.contains(e.target) && !translateDropdown.contains(e.target)) {
        translateButton.setAttribute('aria-expanded', 'false');
        translateDropdown.classList.remove('active');
      }
    });

    // Handle translation option selection
    translateOptions.forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        const langText = option.textContent;
        
        // Update button text to show selected language
        const translateText = translateButton.querySelector('.translate__text');
        if (lang === 'en') {
          translateText.textContent = 'Translate';
        } else {
          // Extract just the language name (after the flag emoji)
          const languageName = langText.split(' ')[1];
          translateText.textContent = languageName;
        }
        
        // Perform translation
        translateToLanguage(lang);
        
        // Close dropdown
        translateButton.setAttribute('aria-expanded', 'false');
        translateDropdown.classList.remove('active');
      });
    });

    // Translation function
    function translateToLanguage(targetLang) {
      // Function to attempt translation
      function attemptTranslation() {
        const selectElement = document.querySelector('.goog-te-combo');
        
        if (selectElement) {
          // Google Translate is ready
          if (targetLang === 'en') {
            // Reset to original language
            selectElement.value = '';
          } else {
            // Set to target language
            selectElement.value = targetLang;
          }
          
          // Trigger change event
          selectElement.dispatchEvent(new Event('change'));
          return true;
        }
        return false;
      }

      // Try immediate translation
      if (!attemptTranslation()) {
        // If not ready, wait and retry
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max wait
        
        const checkInterval = setInterval(() => {
          attempts++;
          
          if (attemptTranslation() || attempts >= maxAttempts) {
            clearInterval(checkInterval);
            
            if (attempts >= maxAttempts) {
              console.log('Google Translate not available');
            }
          }
        }, 100);
      }
    }
  }

  // Scroll-triggered reveal animations
  const revealElements = document.querySelectorAll('.hero, .about, .education, .project, .contact');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
      } else {
        entry.target.classList.remove('reveal-visible');
      }
    });
  }, { threshold: 0.15 });
  
  revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Reveal animation styles are handled in CSS:
// .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s, transform 0.7s; }
// .reveal-visible { opacity: 1; transform: none; }
