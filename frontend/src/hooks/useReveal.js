import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll-reveal hook using IntersectionObserver
 * Replaces framer-motion useInView + GSAP ScrollTrigger for simple reveals
 * 
 * Usage:
 *   const ref = useReveal();
 *   <div ref={ref} className="reveal">Content</div>
 * 
 * The element gets class "revealed" when it enters the viewport.
 */
export const useReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          if (options.once !== false) {
            observer.unobserve(el);
          }
        } else if (options.once === false) {
          el.classList.remove('revealed');
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px 0px -50px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return ref;
};

/**
 * Reveal multiple children with stagger effect
 * Adds --i CSS custom property to each child for stagger delay
 */
export const useRevealStagger = (childSelector = '.reveal', options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    children.forEach((child, i) => {
      child.style.setProperty('--i', i);
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child) => child.classList.add('revealed'));
          if (options.once !== false) {
            observer.unobserve(container);
          }
        } else if (options.once === false) {
          children.forEach((child) => child.classList.remove('revealed'));
        }
      },
      {
        threshold: options.threshold ?? 0.1,
        rootMargin: options.rootMargin ?? '0px 0px -30px 0px',
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [childSelector, options.threshold, options.rootMargin, options.once]);

  return ref;
};

export default useReveal;