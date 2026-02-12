import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { stats } from '../../data/content';

// Animated counter component
const AnimatedCounter = ({ value, prefix = '', suffix = '', isInView }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime;
    const duration = 2000;
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * numericValue);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, numericValue]);

  // Extract suffix from original value (like + or L+)
  const valueSuffix = value.replace(/[0-9]/g, '');

  return (
    <span className="tabular-nums">
      {prefix}{displayValue}{valueSuffix}
    </span>
  );
};

const StatCard = ({ stat, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 * index }}
      className="relative group"
      data-testid={`stat-${index}`}
    >
      <div className="text-center p-8">
        {/* Value */}
        <div className="font-heading font-black text-5xl md:text-6xl lg:text-7xl gradient-text mb-3">
          {/* {stat.prefix && <span>{stat.prefix}</span>} */}
          <AnimatedCounter 
            value={stat.value} 
            prefix={stat.prefix || ''} 
            isInView={isInView}
          />
        </div>
        
        {/* Label */}
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">
          {stat.label}
        </p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 + 0.15 * index }}
          className="h-[1px] w-16 mx-auto mt-6 bg-gradient-to-r from-transparent via-[#ff00ff]/50 to-transparent"
        />
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      data-testid="stats-section"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#ff00ff]/10 via-[#3b00ff]/10 to-[#ff00ff]/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff00ff]">
            03 / Impact
          </span> */}
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-16 text-center"
        >
          Our{' '}
          <span className="gradient-text">Achievements</span>
        </motion.h2>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard 
              key={stat.label} 
              stat={stat} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
