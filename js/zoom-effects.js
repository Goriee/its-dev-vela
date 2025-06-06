// zoom-effects.js - Dynamic Mouse-Tracking Zoom System
// Handles real-time zoom effects that follow cursor movement like a magnifying glass

class ZoomEffectsManager {
  constructor() {
    this.isInitialized = false;
    this.projectImages = [];
    this.init();
  }

  init() {
    console.log('🔍 Initializing Zoom Effects Manager...');
    this.addZoomStyles();
    this.initDynamicImageZoom();
    this.isInitialized = true;
    console.log('✅ Zoom Effects Manager initialized');
  }

  addZoomStyles() {
    // Add zoom animation keyframes if not already present
    if (!document.querySelector('#zoomAnimations')) {
      const style = document.createElement('style');
      style.id = 'zoomAnimations';
      style.textContent = `
        @keyframes crosshairPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes zoomRipple {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        .zoom-crosshair {
          animation: crosshairPulse 2s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }
  }

  initDynamicImageZoom() {
    console.log('🔍 Setting up dynamic zoom system...');
    this.projectImages = document.querySelectorAll('.project__img');
    console.log(`📸 Found ${this.projectImages.length} project images`);
    
    this.projectImages.forEach((img, index) => {
      this.setupImageZoom(img, index);
    });
    
    console.log('🚀 Dynamic zoom system ready!');
  }

  setupImageZoom(img, index) {
    const container = img.closest('.project__img-container');
    
    if (!container) {
      console.warn(`❌ No container found for image ${index + 1}`);
      return;
    }
    
    console.log(`✅ Setting up enhanced zoom for image ${index + 1}`);
    
    // Create zoom elements
    const { crosshair, zoomIndicator } = this.createZoomElements(container);
      // Zoom state for contained effect
    let isZooming = false;
    let zoomLevel = 1;
    const minZoom = 1;
    const maxZoom = 1.6; // Reduced max zoom for contained effect
    
    // Event handlers
    const handleMouseMove = (e) => this.handleMouseMove(e, container, img, crosshair, zoomIndicator, minZoom, maxZoom);
    const handleMouseEnter = (e) => this.handleMouseEnter(e, container, img, handleMouseMove);
    const handleMouseLeave = () => this.handleMouseLeave(container, img, crosshair, zoomIndicator, handleMouseMove);
    const handleWheel = (e) => this.handleWheel(e, img, zoomIndicator, minZoom, maxZoom);
    
    // Add event listeners
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    console.log(`🎉 Enhanced zoom setup complete for image ${index + 1}`);
  }

  createZoomElements(container) {
    // Create dynamic crosshair with pulsing effect
    const crosshair = document.createElement('div');
    crosshair.className = 'zoom-crosshair';
    crosshair.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background: #64ffda;
      border-radius: 50%;
      pointer-events: none;
      z-index: 7;
      opacity: 0;
      transition: opacity 0.2s ease;
      box-shadow: 0 0 12px #64ffda, 0 0 20px rgba(100, 255, 218, 0.4);
    `;
    container.appendChild(crosshair);
    
    // Create zoom level indicator
    const zoomIndicator = document.createElement('div');
    zoomIndicator.className = 'zoom-indicator';
    zoomIndicator.style.cssText = `
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #64ffda;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 8;
      border: 1px solid rgba(100, 255, 218, 0.3);
      backdrop-filter: blur(5px);
    `;
    zoomIndicator.textContent = '1.0x';
    container.appendChild(zoomIndicator);
    
    return { crosshair, zoomIndicator };
  }

  createRipple(container, x, y) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      border: 2px solid #64ffda;
      border-radius: 50%;
      pointer-events: none;
      z-index: 6;
      left: ${x - 10}px;
      top: ${y - 10}px;
      animation: zoomRipple 0.6s ease-out forwards;
    `;
    container.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  handleMouseMove(e, container, img, crosshair, zoomIndicator, minZoom, maxZoom) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentages for transform origin
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
      // Calculate dynamic zoom level based on distance from center (contained effect)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
    
    // Subtle zoom level that stays contained (closer to edge = slight zoom)
    const zoomLevel = minZoom + (normalizedDistance * (maxZoom - minZoom)) * 0.5 + 0.2;
      // Apply zoom with dynamic transform origin
    img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    img.style.transform = `scale(${zoomLevel})`;
    
    // Position crosshair at mouse location
    crosshair.style.left = `${x - 4}px`;
    crosshair.style.top = `${y - 4}px`;
    crosshair.style.opacity = '1';
    
    // Update zoom level indicator
    zoomIndicator.style.opacity = '1';
    zoomIndicator.textContent = `${zoomLevel.toFixed(1)}x`;
    
    // Add subtle glow effect
    container.style.boxShadow = `0 0 30px rgba(100, 255, 218, ${0.2 + normalizedDistance * 0.3})`;
      // Debug: Log zoom info every 10th move to avoid spam
    if (Math.random() < 0.1) {
      console.log(`🎯 Contained Zoom: ${xPercent.toFixed(1)}%, ${yPercent.toFixed(1)}% | Level: ${zoomLevel.toFixed(2)}x | Stays in bounds!`);
    }
  }  handleMouseEnter(e, container, img, handleMouseMove) {
    console.log('🖱️ Mouse entered with contained zoom');
    img.style.transition = 'transform 0.08s ease-out';
    container.style.transition = 'box-shadow 0.3s ease';
    
    // Create entry ripple effect
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.createRipple(container, x, y);
    
    container.addEventListener('mousemove', handleMouseMove);
  }  handleMouseLeave(container, img, crosshair, zoomIndicator, handleMouseMove) {
    console.log('🖱️ Mouse left with smooth contained zoom exit');
    img.style.transform = 'scale(1)';
    img.style.transformOrigin = 'center center';
    img.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
    container.style.boxShadow = 'none';
    container.style.transition = 'box-shadow 0.4s ease';
    crosshair.style.opacity = '0';
    zoomIndicator.style.opacity = '0';
    
    container.removeEventListener('mousemove', handleMouseMove);
  }

  handleWheel(e, img, zoomIndicator, minZoom, maxZoom) {
    e.preventDefault();
    
    // Get current zoom level from transform
    const currentTransform = img.style.transform;
    let currentZoom = 1;
    
    if (currentTransform && currentTransform.includes('scale')) {
      const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
      if (scaleMatch) {
        currentZoom = parseFloat(scaleMatch[1]);
      }
    }
    
    // Calculate new zoom level
    const delta = e.deltaY * -0.001;
    const newZoom = Math.max(minZoom, Math.min(maxZoom, currentZoom + delta));
    
    // Apply new zoom
    img.style.transform = img.style.transform.replace(/scale\([^)]+\)/, `scale(${newZoom})`);
    zoomIndicator.style.opacity = '1';
    zoomIndicator.textContent = `${newZoom.toFixed(1)}x`;
    
    console.log(`🎡 Wheel zoom: ${newZoom.toFixed(2)}x`);
  }

  // Public method to refresh zoom if images are dynamically added
  refresh() {
    console.log('🔄 Refreshing zoom effects...');
    this.initDynamicImageZoom();
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ZoomEffectsManager());
} else {
  new ZoomEffectsManager();
}
