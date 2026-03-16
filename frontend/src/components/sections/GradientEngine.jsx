"use client";
import React from "react";
import { motion } from "framer-motion";

const GradientEngine = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="engine-bg absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#7C3AED]/10 to-[#0A0A0F] bg-[length:100%_200%]" />
      {/* ✨ Reduced Particle Field (Canvas API recommended for production) */}
      <canvas className="absolute inset-0" width={window.innerWidth} height={window.innerHeight} style={{ pointerEvents: 'none', zIndex: 1 }}></canvas>
      {/* If you want, use a simple animated Canvas for particles instead of divs for much better perf */}
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="engine-content relative z-10"
      >
        <h2 className="font-heading text-4xl gradient-text">The Gradient Engine</h2>
        <p className="mt-2 text-white/70">Smooth power meets creative AI community. (Optimized!)</p>
      </motion.div>
      {/* Logo/Glow layers removed for performance; restore if needed! */}
    </section>
  );
};

export default GradientEngine;