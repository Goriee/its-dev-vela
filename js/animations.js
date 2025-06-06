// animations.js - Scroll Animations & Reveal Effects
// Handles intersection observer animations and scroll-triggered reveals

class AnimationsManager {
  constructor() {
    this.revealElements = [];
    this.observer = null;
    this.init();
  }

  init() {
    console.log('✨ Initializing Animations Manager...');
    this.setupScrollRevealAnimations();
    console.log('✅ Animations Manager initialized');
  }

  setupScrollRevealAnimations() {
    // Select elements to animate on scroll
    this.revealElements = document.querySelectorAll('.hero, .about, .education, .project, .contact');
    
    console.log(`🎬 Found ${this.revealElements.length} elements for scroll animation`);
    
    // Create intersection observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          console.log(`👁️ Element revealed: ${entry.target.className}`);
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Add reveal class and observe elements
    this.revealElements.forEach(el => {
      el.classList.add('reveal');
      this.observer.observe(el);
    });

    console.log(`🔍 Observing ${this.revealElements.length} elements for scroll reveals`);
  }

  // Method to add new elements to animation system
  addElement(element) {
    if (element && !element.classList.contains('reveal')) {
      element.classList.add('reveal');
      this.observer.observe(element);
      console.log('➕ Added new element to animation system');
    }
  }

  // Method to remove element from animation system
  removeElement(element) {
    if (element) {
      this.observer.unobserve(element);
      element.classList.remove('reveal', 'reveal-visible');
      console.log('➖ Removed element from animation system');
    }
  }

  // Method to pause/resume animations
  toggleAnimations(enabled = true) {
    if (enabled) {
      this.revealElements.forEach(el => this.observer.observe(el));
      console.log('▶️ Animations enabled');
    } else {
      this.revealElements.forEach(el => this.observer.unobserve(el));
      console.log('⏸️ Animations paused');
    }
  }

  // Method to trigger immediate reveal of all elements
  revealAll() {
    this.revealElements.forEach(el => {
      el.classList.add('reveal-visible');
    });
    console.log('🌟 All elements revealed immediately');
  }

  // Method to reset all animations
  resetAll() {
    this.revealElements.forEach(el => {
      el.classList.remove('reveal-visible');
    });
    console.log('🔄 All animations reset');
  }

  // Method to update observer settings
  updateObserverSettings(options = {}) {
    const defaultOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const newOptions = { ...defaultOptions, ...options };
    
    // Disconnect old observer
    if (this.observer) {
      this.observer.disconnect();
    }
    
    // Create new observer with updated settings
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        } else {
          entry.target.classList.remove('reveal-visible');
        }
      });
    }, newOptions);
    
    // Re-observe all elements
    this.revealElements.forEach(el => this.observer.observe(el));
    
    console.log('⚙️ Observer settings updated:', newOptions);
  }

  // Cleanup method
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    
    this.revealElements.forEach(el => {
      el.classList.remove('reveal', 'reveal-visible');
    });
    
    console.log('🗑️ Animations Manager destroyed');
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new AnimationsManager());
} else {
  new AnimationsManager();
}
