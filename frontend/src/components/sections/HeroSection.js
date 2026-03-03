import React, { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/content';
import InteractiveGradientLogo from '../three/InteractiveGradientLogo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const otherElementsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1400",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Fade out everything except heading
      tl.to(otherElementsRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      }, 0);

      // Safe zoom (no percent shifting, no extreme scale)
      tl.to(textContainerRef.current, {
        scale: 60, // Reduced from 100
        transformOrigin: "center center",
        duration: 1.6,
        ease: "expo.in",
        force3D: false
      }, 0);

      // Fade heading out near end
      tl.to(textContainerRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "none"
      }, 1.4);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    if (window.lenis) {
      window.lenis.scrollTo('#about-section', { duration: 1.5 });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <div
        className="absolute inset-0 z-0"
        ref={el => {
          if (el && !otherElementsRef.current.includes(el)) {
            otherElementsRef.current.push(el);
          }
        }}
      >
        <InteractiveGradientLogo
          className="w-full h-full"
          particleCount={1200}
          interactionRadius={0.5}
          returnSpeed={0.06}
          showGlow={true}
          logoScale={1.1}
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/30 via-transparent to-[#030014] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030014_80%)] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto pointer-events-none flex flex-col items-center">

        {/* Heading wrapper (stabilized compositing) */}
        <div
          ref={textContainerRef}
          className="relative z-10"
          style={{
            transformOrigin: "center center",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased"
          }}
        >
          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] tracking-tighter leading-[0.85] mb-6 flex justify-center">
            <span className="gradient-text glow-text">
              {siteConfig.name}
            </span>
          </h1>
        </div>

        {/* Tagline + CTA */}
        <div
          ref={el => {
            if (el && !otherElementsRef.current.includes(el)) {
              otherElementsRef.current.push(el);
            }
          }}
        >
          <p className="font-heading text-xl md:text-2xl lg:text-3xl text-white/80 mb-4">
            {siteConfig.tagline}
          </p>

          <p className="text-white/50 max-w-2xl mx-auto mb-12 text-base md:text-lg">
            Pioneering the future through AI and Machine Learning innovation at B.M.S. College of Engineering.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
            <Link
              to="/about"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10">Explore Our Club</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff00ff] to-[#3b00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
                Explore Our Club
              </span>
            </Link>

            <Link
              to="/events"
              className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-md"
            >
              View Events
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={el => {
          if (el && !otherElementsRef.current.includes(el)) {
            otherElementsRef.current.push(el);
          }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors cursor-pointer pointer-events-auto"
        onClick={scrollToContent}
      >
        <span className="font-mono text-xs uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;