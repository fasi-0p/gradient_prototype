import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidEther from '../three/LiquidEther';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const otherElementsRef = useRef([]);

  /* GSAP Scroll Animation */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        otherElementsRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        textContainerRef.current,
        {
          scale: 12,
          opacity: 0,
          transformOrigin: "center center",
          duration: 1.2,
          ease: "power3.in",
          force3D: true,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    if (window.lenis) {
      window.lenis.scrollTo("#about-section", { duration: 1.5 });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0F]"
    >
      {/* High-Performance Interactive Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <LiquidEther
          colors={['#7C3AED', '#3B82F6', '#A855F7']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/30 via-transparent to-[#0A0A0F] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        
        <div
          ref={textContainerRef}
          className="relative z-10 will-change-transform"
        >
          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] tracking-tighter leading-[0.85] mb-6 flex justify-center">
            <span className="gradient-text glow-text">
              {siteConfig.name}
            </span>
          </h1>
        </div>

        <div
          ref={(el) => {
            if (el && !otherElementsRef.current.includes(el))
              otherElementsRef.current.push(el);
          }}
        >
          <p className="font-heading text-xl md:text-2xl lg:text-3xl text-white/80 mb-4">
            {siteConfig.tagline}
          </p>

          <p className="text-white/50 max-w-2xl mx-auto mb-12 text-base md:text-lg">
            Pioneering the future through AI and Machine Learning innovation at
            B.M.S. College of Engineering.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            <Link
              to="/about"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10">Explore Our Club</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
        ref={(el) => {
          if (el && !otherElementsRef.current.includes(el))
            otherElementsRef.current.push(el);
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
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
