import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/content';
import InteractiveGradientLogo from '../three/InteractiveGradientLogo';

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const scrollToContent = () => {
    if (window.lenis) {
      window.lenis.scrollTo('#about-section', { duration: 1.5 });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive 3D Logo Background */}
      <div className="absolute inset-0 z-0">
        <InteractiveGradientLogo 
          className="w-full h-full" 
          particleCount={1200}
          interactionRadius={0.5}
          returnSpeed={0.06}
          showGlow={true}
          logoScale={1.1}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/30 via-transparent to-[#030014] z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030014_80%)] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto pointer-events-none">
        {/* Label */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 pointer-events-auto"
        >
          <Sparkles className="w-4 h-4 text-[#ff00ff]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">
            AI/ML Student Community
          </span>
        </motion.div> */}

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] tracking-tighter leading-[0.85] mb-6"
        >
          <span className="gradient-text glow-text">{siteConfig.name}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-heading text-xl md:text-2xl lg:text-3xl text-white/80 mb-4"
        >
          {siteConfig.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/50 max-w-2xl mx-auto mb-12 text-base md:text-lg"
        >
          Pioneering the future through AI and Machine Learning innovation at B.M.S. College of Engineering.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto"
        >
          <Link
            to="/about"
            data-testid="hero-cta-explore"
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
            data-testid="hero-cta-events"
            className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-md"
          >
            View Events
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
        data-testid="scroll-indicator"
      >
        <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Interaction hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute top-1/4 right-8 z-20 hidden lg:block"
      >
        <p className="font-mono text-xs text-white/30 writing-vertical">
          {/* Move cursor to interact */}
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
