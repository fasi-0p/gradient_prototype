import React, { useRef, useEffect, useState } from 'react'; 
import { motion, useInView } from 'framer-motion';
import NeuralNetworkBackground from "../background/NeuralNetworkBackground";

// The stats array as you provided
export const stats = [
  { value: "60+", label: "Events Conducted", suffix: "" },
  { value: "3750+", label: "Participants", suffix: "" },
  { value: "300+", label: "Community Members", suffix: "" },
];

/* Animated counter */
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

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * numericValue);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, numericValue]);

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
      className="relative group w-full"
      data-testid={`stat-${index}`}
    >
      <div className="text-center p-8">

        {/* Removed gradient-text and added inline blue color */}
        <div 
          className="font-heading font-black text-5xl md:text-6xl lg:text-7xl mb-3"
          style={{ color: '#3b82f6' }}
        >
          <AnimatedCounter 
            value={stat.value} 
            prefix={stat.prefix || ''} 
            isInView={isInView}
          />
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.15em] text-white/50">
          {stat.label}
        </p>

        {/* Updated the via color for the underline to match the new hex */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 + 0.15 * index }}
          className="h-[1px] w-16 mx-auto mt-6 bg-gradient-to-r from-transparent via-[#3b82f6]/50 to-transparent"
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

      {/* Shared Neural Background */}
      <NeuralNetworkBackground opacity={0.3} />

      {/* Background elements */}
      <div className="absolute inset-0">

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

        {/* Changed the glowing orb background to use the solid blue hex with low opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#3b82f6]/10 blur-[100px] rounded-full" />

      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-16 text-center"
        >
          {/* Replaced gradient text with inline blue color */}
          Our <span style={{ color: '#3b82f6' }}>Achievements</span>
        </motion.h2>

        {/* FIXED: Changed to grid-cols-1 for mobile, md:grid-cols-3 for desktop. Added max-w-5xl mx-auto to perfectly center the block. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center justify-center">
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