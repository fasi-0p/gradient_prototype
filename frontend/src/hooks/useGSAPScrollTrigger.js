import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP ScrollTrigger animations
 * 
 * Usage:
 * const ref = useScrollTrigger({
 *   animation: 'fadeUp',
 *   trigger: { start: 'top 80%' }
 * });
 * 
 * <div ref={ref}>Animated content</div>
 */

// Predefined animation presets
const animationPresets = {
  // Fade in from bottom
  fadeUp: {
    from: { opacity: 0, y: 60 },
    to: { opacity: 1, y: 0 }
  },
  
  // Fade in from left
  fadeLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 }
  },
  
  // Fade in from right
  fadeRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 }
  },
  
  // Scale up
  scaleUp: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 }
  },
  
  // Reveal from bottom (clip-path)
  revealUp: {
    from: { clipPath: 'inset(100% 0 0 0)' },
    to: { clipPath: 'inset(0% 0 0 0)' }
  },
  
  // Blur in
  blurIn: {
    from: { opacity: 0, filter: 'blur(10px)' },
    to: { opacity: 1, filter: 'blur(0px)' }
  },
  
  // Rotate in
  rotateIn: {
    from: { opacity: 0, rotation: -10, y: 30 },
    to: { opacity: 1, rotation: 0, y: 0 }
  },
  
  // Counter animation (for stats)
  counter: {
    from: { textContent: 0 },
    to: { textContent: 100 }
  }
};

export const useScrollTrigger = (options = {}) => {
  const elementRef = useRef(null);
  
  const {
    animation = 'fadeUp',
    duration = 1,
    ease = 'power3.out',
    delay = 0,
    trigger = {},
    customFrom = null,
    customTo = null,
    scrub = false,
    pin = false,
    markers = false,
    once = true
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Get animation preset or use custom
    const preset = animationPresets[animation] || animationPresets.fadeUp;
    const fromVars = customFrom || preset.from;
    const toVars = customTo || preset.to;

    // Set initial state
    gsap.set(element, fromVars);

    // Create ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: trigger.start || 'top 85%',
        end: trigger.end || 'bottom 20%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        scrub: scrub ? (typeof scrub === 'number' ? scrub : 1) : false,
        pin,
        markers,
        ...trigger
      }
    });

    tl.to(element, {
      ...toVars,
      duration: scrub ? 1 : duration,
      ease,
      delay
    });

    // Cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, [animation, duration, ease, delay, trigger, customFrom, customTo, scrub, pin, markers, once]);

  return elementRef;
};

/**
 * Hook for staggered scroll animations on children
 */
export const useStaggerScrollTrigger = (options = {}) => {
  const containerRef = useRef(null);
  
  const {
    childSelector = '.stagger-item',
    animation = 'fadeUp',
    stagger = 0.1,
    duration = 0.8,
    ease = 'power3.out',
    trigger = {},
    scrub = false,
    once = true
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (!children.length) return;

    const preset = animationPresets[animation] || animationPresets.fadeUp;

    // Set initial state for all children
    gsap.set(children, preset.from);

    // Create staggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: trigger.start || 'top 80%',
        end: trigger.end || 'bottom 20%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        scrub: scrub ? (typeof scrub === 'number' ? scrub : 1) : false,
        ...trigger
      }
    });

    tl.to(children, {
      ...preset.to,
      duration: scrub ? 1 : duration,
      ease,
      stagger
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) {
          st.kill();
        }
      });
    };
  }, [childSelector, animation, stagger, duration, ease, trigger, scrub, once]);

  return containerRef;
};

/**
 * Hook for parallax scroll effects
 */
export const useParallax = (speed = 0.5) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, [speed]);

  return elementRef;
};

/**
 * Hook for horizontal scroll sections
 */
export const useHorizontalScroll = (options = {}) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const totalWidth = content.scrollWidth - container.offsetWidth;

    gsap.to(content, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        ...options
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) {
          st.kill();
        }
      });
    };
  }, [options]);

  return { containerRef, contentRef };
};

/**
 * Hook for text reveal animations (character by character)
 */
export const useTextReveal = (options = {}) => {
  const textRef = useRef(null);

  const {
    type = 'words', // 'chars', 'words', 'lines'
    stagger = 0.02,
    duration = 0.8,
    ease = 'power3.out',
    trigger = {}
  } = options;

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Simple word split (for words type)
    const text = element.textContent;
    let splitHTML = '';

    if (type === 'words') {
      const words = text.split(' ');
      splitHTML = words.map(word => `<span class="gsap-word" style="display:inline-block">${word}&nbsp;</span>`).join('');
    } else if (type === 'chars') {
      const chars = text.split('');
      splitHTML = chars.map(char => `<span class="gsap-char" style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`).join('');
    } else {
      splitHTML = `<span class="gsap-line" style="display:block">${text}</span>`;
    }

    element.innerHTML = splitHTML;

    const targets = element.querySelectorAll(`.gsap-${type === 'words' ? 'word' : type === 'chars' ? 'char' : 'line'}`);

    gsap.set(targets, { opacity: 0, y: 20 });

    gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: element,
        start: trigger.start || 'top 85%',
        toggleActions: 'play none none none',
        ...trigger
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) {
          st.kill();
        }
      });
    };
  }, [type, stagger, duration, ease, trigger]);

  return textRef;
};

/**
 * Refresh ScrollTrigger (call after layout changes)
 */
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

/**
 * Kill all ScrollTriggers (cleanup)
 */
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(st => st.kill());
};

export default useScrollTrigger;
