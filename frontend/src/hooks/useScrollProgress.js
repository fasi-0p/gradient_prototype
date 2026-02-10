import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setProgress(Math.min(1, Math.max(0, currentProgress)));
      setScrollY(window.scrollY);
    };

    // Use lenis scroll if available
    if (window.lenis) {
      window.lenis.on('scroll', ({ progress: lenisProgress, scroll }) => {
        setProgress(lenisProgress);
        setScrollY(scroll);
      });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (window.lenis) {
        window.lenis.off('scroll');
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { progress, scrollY };
};

export default useScrollProgress;
