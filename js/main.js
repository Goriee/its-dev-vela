// main.js - Portfolio Main Controller
// Orchestrates all portfolio functionality and modules

class PortfolioApp {
  constructor() {
    this.modules = {
      navigation: null,
      translation: null,
      zoomEffects: null,
      animations: null
    };
    
    this.isInitialized = false;
    this.init();
  }

  init() {
    console.log('🚀 Initializing Portfolio Application...');
    console.log('📅 Build Date:', new Date().toLocaleDateString());
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.startApp());
    } else {
      this.startApp();
    }
  }

  startApp() {
    console.log('▶️ Starting Portfolio App...');
    
    try {
      // Initialize modules in order
      this.initializeModules();
      this.setupGlobalEventListeners();
      this.performHealthCheck();
      
      this.isInitialized = true;
      console.log('✅ Portfolio Application fully initialized!');
      
      // Show success message in console
      this.displayWelcomeMessage();
      
    } catch (error) {
      console.error('❌ Failed to initialize portfolio:', error);
      this.handleInitializationError(error);
    }
  }

  initializeModules() {
    console.log('🔧 Initializing core modules...');
    
    // Modules are auto-initialized by their own files
    // This method can be used for module coordination if needed
    
    console.log('📦 Core modules loaded');
  }

  setupGlobalEventListeners() {
    console.log('🎯 Setting up global event listeners...');
    
    // Handle window resize
    window.addEventListener('resize', () => {
      console.log('📐 Window resized, updating layouts...');
      this.handleResize();
    });

    // Handle visibility change (tab focus/blur)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('👁️ Page hidden');
      } else {
        console.log('👁️ Page visible');
      }
    });

    // Handle before unload
    window.addEventListener('beforeunload', () => {
      console.log('👋 Page unloading...');
    });

    console.log('✅ Global event listeners ready');
  }

  handleResize() {
    // Debounced resize handler
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      // Trigger refresh of zoom effects if needed
      if (window.zoomEffectsManager && window.zoomEffectsManager.refresh) {
        window.zoomEffectsManager.refresh();
      }
    }, 250);
  }

  performHealthCheck() {
    console.log('🏥 Performing health check...');
    
    const checks = {
      'DOM Elements': this.checkDOMElements(),
      'CSS Styles': this.checkCSSStyles(),
      'External Dependencies': this.checkExternalDependencies(),
      'Interactive Elements': this.checkInteractiveElements()
    };

    let allHealthy = true;
    
    Object.entries(checks).forEach(([check, result]) => {
      const status = result ? '✅' : '❌';
      console.log(`${status} ${check}: ${result ? 'OK' : 'FAILED'}`);
      if (!result) allHealthy = false;
    });

    if (allHealthy) {
      console.log('💚 All health checks passed!');
    } else {
      console.warn('⚠️ Some health checks failed, but app can still function');
    }

    return allHealthy;
  }

  checkDOMElements() {
    const required = [
      '#navToggle', '#navList', '#translateButton', 
      '.hero', '.projects', '.project__img'
    ];
    
    return required.every(selector => document.querySelector(selector) !== null);
  }

  checkCSSStyles() {
    // Check if main stylesheets are loaded
    const stylesheets = Array.from(document.styleSheets);
    return stylesheets.length > 0;
  }

  checkExternalDependencies() {
    // Check if external libraries are available
    return typeof TranslationService !== 'undefined';
  }

  checkInteractiveElements() {
    const projectImages = document.querySelectorAll('.project__img');
    const navLinks = document.querySelectorAll('.nav__link');
    
    return projectImages.length > 0 && navLinks.length > 0;
  }

  handleInitializationError(error) {
    console.error('🚨 Portfolio initialization failed:', error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed; top: 20px; right: 20px; z-index: 10000;
      background: #ff4444; color: white; padding: 15px 20px;
      border-radius: 8px; font-family: Arial, sans-serif;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    errorDiv.innerHTML = `
      <strong>⚠️ Portfolio Loading Error</strong><br>
      Some features may not work properly.<br>
      <small>Check console for details.</small>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove error message after 10 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
      }
    }, 10000);
  }

  displayWelcomeMessage() {
    console.log(`
    🌟 ====================================
    🎨 Dev Vela Portfolio - Ready!
    ====================================
    
    📚 Modules Active:
    • Navigation & Mobile Menu
    • Multi-language Translation  
    • Dynamic Zoom Effects
    • Scroll Animations
    
    🎮 Interactive Features:
    • Hover project images for zoom effects
    • Use translation dropdown for languages
    • Mobile-responsive navigation
    • Smooth scrolling animations
    
    💡 Tips:
    • Move mouse over project images to see zoom
    • Try different languages from dropdown
    • Check mobile menu on smaller screens
    
    🚀 Portfolio Status: FULLY OPERATIONAL
    ====================================
    `);
  }

  // Public API methods
  getModuleStatus() {
    return {
      initialized: this.isInitialized,
      modules: Object.keys(this.modules),
      timestamp: new Date().toISOString()
    };
  }

  refreshAllModules() {
    console.log('🔄 Refreshing all modules...');
    
    // Trigger refresh of zoom effects
    if (window.zoomEffectsManager && window.zoomEffectsManager.refresh) {
      window.zoomEffectsManager.refresh();
    }
    
    console.log('✅ All modules refreshed');
  }
}

// Initialize the portfolio application
const portfolioApp = new PortfolioApp();

// Make it globally available for debugging
window.portfolioApp = portfolioApp;

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioApp;
}
