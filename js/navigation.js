// navigation.js - Mobile Navigation & Smooth Scrolling
// Handles mobile menu toggle, navigation interactions, and smooth scrolling

class NavigationManager {
  constructor() {
    this.navToggle = document.getElementById('navToggle');
    this.navList = document.getElementById('navList');
    this.navLinks = document.querySelectorAll('.nav__link');
    
    this.init();
  }

  init() {
    console.log('🧭 Initializing Navigation Manager...');
    this.setupMobileNavigation();
    this.setupSmoothScrolling();
    this.setupClickOutside();
    this.setupScrollNavbarBehavior();
    console.log('✅ Navigation Manager initialized');
  }

  setupMobileNavigation() {
    if (!this.navToggle || !this.navList) return;

    // Mobile menu toggle
    this.navToggle.addEventListener('click', () => {
      const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
      
      this.navToggle.setAttribute('aria-expanded', !isExpanded);
      this.navToggle.classList.toggle('active');
      this.navList.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = this.navList.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });
  }

  setupClickOutside() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navToggle.contains(e.target) && !this.navList.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  setupSmoothScrolling() {
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
  }

  setupScrollNavbarBehavior() {
    const nav = document.querySelector('.nav');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Add scrolled class when user scrolls down more than 100px
      if (currentScrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const requestNavbarUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    // Throttled scroll listener
    window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
  }

  closeMobileMenu() {
    this.navToggle.classList.remove('active');
    this.navList.classList.remove('active');
    this.navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new NavigationManager());
} else {
  new NavigationManager();
}
