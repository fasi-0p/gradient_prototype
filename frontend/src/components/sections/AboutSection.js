import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteConfig } from '../../data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GradientLogo from "../three/GradientLogo";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const ref = useRef(null);
  const visualRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // GSAP ScrollTrigger for parallax effect on visual
  useEffect(() => {
    if (!visualRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(visualRef.current,
        { y: 50, rotate: -2 },
        {
          y: -50,
          rotate: 2,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="about-section"
      data-testid="about-section"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff00ff]">
            01 / About
          </span> */}
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6"
            >
              Who Are{' '}
              <span className="gradient-text">We?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg leading-relaxed mb-6"
            >
              Gradient is a vibrant student community that embraces the dynamic field of AI and ML. 
              We focus on fostering innovation, collaboration and knowledge sharing among aspiring 
              machine learning enthusiasts.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/60 text-lg leading-relaxed"
            >
              Our mission is to create a platform where passion for technology thrives, 
              and groundbreaking ideas flourish.
            </motion.p>

            {/* Founded badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 inline-flex items-center gap-4"
            >
              <div className="w-16 h-[1px] bg-gradient-to-r from-[#ff00ff] to-transparent" />
              <span className="font-mono text-sm text-white/40">
                Founded {siteConfig.founded} • BMSCE Bangalore
              </span>
            </motion.div>
          </div>

          {/* Visual element */}
          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden glass gradient-border">
              {/* Abstract pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff]/10 to-[#3b00ff]/10" />
              
              {/* Animated circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-48 h-48 rounded-full border border-[#ff00ff]/30"
                />
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-64 h-64 rounded-full border border-[#3b00ff]/20"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -180, -360]
                  }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute w-80 h-80 rounded-full border border-[#00f0ff]/10"
                />
              </div>

              {/* Center logo mark */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff00ff] to-[#3b00ff] opacity-80 blur-sm" />
                <div className="absolute w-20 h-20 rounded-full bg-[#030014] flex items-center justify-center">
                  <span className="font-heading font-bold text-3xl gradient-text">G</span>
                </div>
              </div> */}
              <div className="about-visual-card relative">
  
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 blur-3xl opacity-40" />

                <div className="relative z-10 w-full h-[420px]">
                    <GradientLogo />
                </div>

              </div>

            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#ff00ff]/20 to-[#3b00ff]/20 rounded-3xl blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
