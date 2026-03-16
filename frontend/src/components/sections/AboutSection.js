import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { siteConfig } from '../../data/content';
import GradientLogo from "../three/GradientLogo";
import NeuralNetworkBackground from "../background/NeuralNetworkBackground";

const AboutSection = () => {
  const ref = useRef(null);
  const visualRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="about-section"
      data-testid="about-section"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
    >

      {/* Shared Neural Background */}
      <NeuralNetworkBackground opacity={0.4} />

      <div className="max-w-7xl mx-auto relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Text Column */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6"
            >
              Who Are <span className="gradient-text">We?</span>
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

          {/* Visual */}
          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mx-auto aspect-square rounded-3xl overflow-hidden glass gradient-border"
            style={{ width: '420px', height: '420px', maxWidth: '100%' }}
          >

            <div className="absolute inset-0 bg-gradient-to-br from-[#ff00ff]/10 to-[#3b00ff]/10" />

            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <GradientLogo />
            </div>

            <div className="absolute -inset-4 bg-gradient-to-r from-[#ff00ff]/20 to-[#3b00ff]/20 rounded-3xl blur-3xl -z-10 pointer-events-none" />

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;