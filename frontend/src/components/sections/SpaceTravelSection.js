import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import ImmersiveSpaceTravel from '../three/ImmersiveSpaceTravel';

const SpaceTravelSection = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });
  const [speed, setSpeed] = useState(0.3);
  const [phase, setPhase] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.3) {
        setSpeed(0.2 + latest * 0.5);
        setPhase(0);
      } else if (latest < 0.7) {
        setSpeed(0.4 + (latest - 0.3) * 0.8);
        setPhase(1);
      } else {
        setSpeed(0.7 + (latest - 0.7) * 2);
        setPhase(2);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 1.05]);

  const phaseContent = [
    { title: "Into the", highlight: "Void", subtitle: "Where innovation begins" },
    { title: "Through the", highlight: "Stars", subtitle: "Exploring new frontiers" },
    { title: "Beyond", highlight: "Limits", subtitle: "The future awaits" }
  ];

  const currentContent = phaseContent[phase];

  return (
    <section
      ref={containerRef}
      data-testid="space-travel-section"
      className="relative"
      style={{ height: '250vh' }}
    >
      <div 
        ref={sectionRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <motion.div 
          className="absolute inset-0"
          style={{ opacity, scale }}
        >
          {isInView && (
            <ImmersiveSpaceTravel 
              speed={speed} 
              className="w-full h-full"
            />
          )}
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center pointer-events-none">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center px-6"
          >
            <motion.div
              className="flex justify-center gap-2 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === phase 
                      ? 'bg-[#ff00ff] w-8' 
                      : 'bg-white/20 w-2'
                  }`}
                />
              ))}
            </motion.div>

            <motion.p
              className="font-mono text-xs uppercase tracking-[0.3em] text-[#ff00ff] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {currentContent.subtitle}
            </motion.p>

            <motion.h2
              className="font-heading font-black text-5xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-white">{currentContent.title}</span>
              <br />
              <span className="gradient-text glow-text">{currentContent.highlight}</span>
            </motion.h2>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="inline-flex items-center gap-4 px-6 py-3 glass rounded-full">
                <span className="font-mono text-xs text-white/40">VELOCITY</span>
                <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#ff00ff] to-[#3b00ff] rounded-full"
                    style={{ width: `${speed * 50}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="font-mono text-xs text-[#ff00ff]">
                  {Math.round(speed * 100)}%
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030014_90%)]" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#030014] to-transparent pointer-events-none z-30" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none z-30" />
      </div>
    </section>
  );
};

export default SpaceTravelSection;
