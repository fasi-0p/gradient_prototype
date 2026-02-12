"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GradientEngine = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      /* ---------------- CONTENT SCALE (GROW → SHRINK) ---------------- */

      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      contentTl
        .to(".engine-content", {
          scale: 1.12,
          opacity: 0.65,
          ease: "none",
        })
        .to(".engine-content", {
          scale: 1,
          opacity: 1,
          ease: "none",
        });

      /* ---------------- GLOW BREATHING ---------------- */

      const glowTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      glowTl
        .to(".engine-glow", {
          scale: 1.6,
          opacity: 0.4,
          ease: "none",
        })
        .to(".engine-glow", {
          scale: 1,
          opacity: 0.7,
          ease: "none",
        });

      /* ---------------- BACKGROUND DRIFT ---------------- */

      gsap.to(".engine-bg", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ---------------- DEPTH PARALLAX ---------------- */

      gsap.to(".engine-layer-1", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".engine-layer-2", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ---------------- LOGO ENERGY PULSE ---------------- */

      gsap.to(".engine-logo", {
        scale: 1.8,
        filter: "brightness(1.4)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[160vh] flex items-center justify-center overflow-hidden"
    >
      
      {/* Background */}
      <div className="engine-bg absolute inset-0 bg-gradient-to-b from-black via-violet-950/30 to-black bg-[length:100%_200%]" />

      {/* ✨ PARTICLE FIELD ✨ */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(500)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Depth Layers */}
      <div className="engine-layer-1 absolute w-[700px] h-[700px] rounded-full bg-violet-600/10 blur-[160px]" />
      <div className="engine-layer-2 absolute w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

      {/* Glow */}
      <div className="engine-glow absolute w-[500px] h-[500px] rounded-full bg-violet-600/30 blur-[140px]" />

      {/* Logo */}
      <img
        src="/logo.webp"
        alt="Gradient Logo"
        className="engine-logo absolute w-64"
      />

      {/* Content */}
      <div className="engine-content relative z-10 text-center px-6">
        
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white"
        >
          ENTER THE ENGINE 
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-6 text-gray-400 text-lg"
        >
          Intelligence Redefined.
        </motion.p>

      </div>
    </section>
  );
};

export default GradientEngine;
