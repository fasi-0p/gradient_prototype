import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { timeline } from '../../data/content';

const TimelineItem = ({ item, index, isInView, isLeft }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 * index }}
      className={`relative flex ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
      data-testid={`timeline-${item.year}`}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
        <div className={`glass p-8 rounded-2xl hover:bg-white/5 transition-all duration-500 ${isLeft ? 'lg:ml-auto' : 'lg:mr-auto'} max-w-lg`}>
          {/* Year badge */}
          <div className={`inline-flex items-center gap-2 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
            <span className="font-heading font-black text-3xl md:text-4xl gradient-text">
              {item.year}
            </span>
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#ff00ff] to-[#3b00ff]" />
          </div>

          {/* Title */}
          <h3 className="font-heading font-semibold text-xl md:text-2xl mb-3">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-white/50 leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Highlight */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff00ff]/10 border border-[#ff00ff]/20">
            <span className="w-2 h-2 rounded-full bg-[#ff00ff] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-[#ff00ff]">
              {item.highlight}
            </span>
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div className="hidden lg:flex items-center justify-center w-16 shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 + 0.2 * index }}
          className="relative"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#3b00ff]" />
          <div className="absolute inset-0 w-4 h-4 rounded-full bg-[#ff00ff] animate-ping opacity-20" />
        </motion.div>
      </div>

      {/* Empty space for alternating layout */}
      <div className="flex-1 hidden lg:block" />
    </motion.div>
  );
};

const TimelineSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      data-testid="timeline-section"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff00ff]">
            04 / Our Journey
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-16 text-center"
        >
          From{' '}
          <span className="gradient-text">Roots</span>
          {' '}to{' '}
          <span className="gradient-text">Stars</span>
        </motion.h2>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Center line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
            <div className="h-full w-full bg-white/10" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#ff00ff] to-[#3b00ff]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12 lg:space-y-24">
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={index}
                isInView={isInView}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
