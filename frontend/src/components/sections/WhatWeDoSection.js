import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Trophy, Sparkles, Mic2, Briefcase, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    id: "workshops",
    title: "Technical Workshops",
    description: "Hands-on workshops and seminars on cutting-edge AI and ML technologies",
    icon: Code,
    color: "#ff00ff"
  },
  {
    id: "hackathons",
    title: "Hackathons",
    description: "Competitive coding events and AI project challenges",
    icon: Trophy,
    color: "#3b00ff"
  },
  {
    id: "events",
    title: "Technical Events",
    description: "Collaborative, fun and innovative events with real-world applications",
    icon: Sparkles,
    color: "#00f0ff"
  },
  {
    id: "lectures",
    title: "Guest Lectures",
    description: "Industry experts sharing insights and experiences",
    icon: Mic2,
    color: "#ff6b00"
  },
  {
    id: "placement",
    title: "Placement Talks",
    description: "Educating students on the ever-changing landscape of placements",
    icon: Briefcase,
    color: "#00ff88"
  },
  {
    id: "networking",
    title: "Networking",
    description: "Building connections within the AI community",
    icon: Users,
    color: "#ffcc00"
  }
];

const PillarCard = ({ pillar, index, isInView }) => {
  const Icon = pillar.icon;
  
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative pillar-card opacity-0"
      data-testid={`pillar-${pillar.id}`}
    >
      <div className="relative h-full p-8 rounded-2xl glass hover:bg-white/5 transition-all duration-500">
        {/* Icon */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${pillar.color}20` }}
        >
          <Icon className="w-7 h-7" style={{ color: pillar.color }} />
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-xl mb-3 group-hover:text-white transition-colors">
          {pillar.title}
        </h3>

        {/* Description */}
        <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors">
          {pillar.description}
        </p>

        {/* Hover gradient border */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${pillar.color}20 0%, transparent 50%)`,
          }}
        />
      </div>
    </motion.div>
  );
};

const WhatWeDoSection = () => {
  const ref = useRef(null);
  const cardsContainerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // GSAP ScrollTrigger for staggered card reveals
  useEffect(() => {
    if (!cardsContainerRef.current) return;

    const cards = cardsContainerRef.current.querySelectorAll('.pillar-card');
    
    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { 
          y: 60,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      data-testid="whatwedo-section"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ff00ff]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff00ff]">
            02 / What We Do
          </span> */}
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-16 max-w-3xl"
        >
          Building the future,{' '}
          <span className="gradient-text">one event at a time</span>
        </motion.h2>

        {/* Pillars grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <PillarCard 
              key={pillar.id} 
              pillar={pillar} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
