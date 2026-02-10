import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = (options = {}) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with smooth, buttery settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      ...options
    });

    lenisRef.current = lenis;

    // Animation loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis to window for external access (GSAP integration, etc.)
    window.lenis = lenis;

    // Add class to html for CSS hooks
    document.documentElement.classList.add('lenis');

    return () => {
      lenis.destroy();
      window.lenis = null;
      document.documentElement.classList.remove('lenis');
    };
  }, []);

  return lenisRef;
};

// Hook for scroll-to functionality
export const useScrollTo = () => {
  const scrollTo = (target, options = {}) => {
    if (window.lenis) {
      window.lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options
      });
    } else {
      // Fallback
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return scrollTo;
};

export default useLenis;
