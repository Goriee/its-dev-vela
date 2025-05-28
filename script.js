// script.js - Vela Portfolio
// Scroll-triggered reveals, smooth scrolling, and lazy loading will be implemented here.

document.addEventListener('DOMContentLoaded', () => {
  // Scroll-triggered reveal animations (fade in when entering, fade out when leaving viewport)
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

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Native lazy loading is handled by 'loading="lazy"' in <img> tags
  // Optionally, polyfill for older browsers (not needed for evergreen)
});

// Reveal animation styles (add to CSS):
// .reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.7s, transform 0.7s; }
// .reveal-visible { opacity: 1; transform: none; }
