// import React, { useRef } from 'react';
// import { motion, useInView, useScroll, useTransform } from 'framer-motion';
// import { timeline } from '../../data/content';

// const TimelineItem = ({ item, index, isInView, isLeft }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
//       animate={isInView ? { opacity: 1, x: 0 } : {}}
//       transition={{ duration: 0.8, delay: 0.2 * index }}
//       className={`relative flex ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8`}
//       data-testid={`timeline-${item.year}`}
//     >
//       {/* Content */}
//       <div className={`flex-1 ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
//         <div className={`glass p-8 rounded-2xl hover:bg-white/5 transition-all duration-500 ${isLeft ? 'lg:ml-auto' : 'lg:mr-auto'} max-w-lg`}>
//           {/* Year badge */}
//           <div className={`inline-flex items-center gap-2 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
//             <span className="font-heading font-black text-3xl md:text-4xl gradient-text">
//               {item.year}
//             </span>
//             <div className="w-8 h-[2px] bg-gradient-to-r from-[#ff00ff] to-[#3b00ff]" />
//           </div>

//           {/* Title */}
//           <h3 className="font-heading font-semibold text-xl md:text-2xl mb-3">
//             {item.title}
//           </h3>

//           {/* Description */}
//           <p className="text-white/50 leading-relaxed mb-4">
//             {item.description}
//           </p>

//           {/* Highlight */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff00ff]/10 border border-[#ff00ff]/20">
//             <span className="w-2 h-2 rounded-full bg-[#ff00ff] animate-pulse" />
//             <span className="font-mono text-xs uppercase tracking-wider text-[#ff00ff]">
//               {item.highlight}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Center dot */}
//       <div className="hidden lg:flex items-center justify-center w-16 shrink-0">
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={isInView ? { scale: 1 } : {}}
//           transition={{ duration: 0.4, delay: 0.3 + 0.2 * index }}
//           className="relative"
//         >
//           <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#3b00ff]" />
//           <div className="absolute inset-0 w-4 h-4 rounded-full bg-[#ff00ff] animate-ping opacity-20" />
//         </motion.div>
//       </div>

//       {/* Empty space for alternating layout */}
//       <div className="flex-1 hidden lg:block" />
//     </motion.div>
//   );
// };

// const TimelineSection = () => {
//   const ref = useRef(null);
//   const containerRef = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });
  
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start end", "end start"]
//   });

//   const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

//   return (
//     <section
//       ref={ref}
//       data-testid="timeline-section"
//       className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
//     >
//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Section label */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6 }}
//           className="mb-8"
//         >
//           <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff00ff]">
//             04 / Our Journey
//           </span>
//         </motion.div>

//         {/* Heading */}
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8, delay: 0.1 }}
//           className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-16 text-center"
//         >
//           From{' '}
//           <span className="gradient-text">Roots</span>
//           {' '}to{' '}
//           <span className="gradient-text">Stars</span>
//         </motion.h2>

//         {/* Timeline */}
//         <div ref={containerRef} className="relative">
//           {/* Center line */}
//           <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
//             <div className="h-full w-full bg-white/10" />
//             <motion.div
//               className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#ff00ff] to-[#3b00ff]"
//               style={{ height: lineHeight }}
//             />
//           </div>

//           {/* Timeline items */}
//           <div className="space-y-12 lg:space-y-24">
//             {timeline.map((item, index) => (
//               <TimelineItem
//                 key={item.year}
//                 item={item}
//                 index={index}
//                 isInView={isInView}
//                 isLeft={index % 2 === 0}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TimelineSection;



// //pew pew
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: "2024",
    title: "Gradient Hack 1.0",
    category: "System Shock",
    desc: "24-hour high-intensity AI engineering sprint pushing real-world builds. We broke the barrier between theory and deployment.",
  },
  {
    year: "2023",
    title: "Transformers Deep Dive",
    category: "Architecture",
    desc: "Architectural breakdown of GPT-class intelligence systems. Unraveling the attention mechanisms that define modern AI.",
  },
  {
    year: "2022",
    title: "Gradient Inception",
    category: "The Origin",
    desc: "Birth of a research-first AI/ML engineering collective at BMSCE. The moment the static turned into a signal.",
  },
  {
    year: "2021",
    title: "The Precursor",
    category: "Legacy",
    desc: "Foundational experiments in neural networks. The quiet before the storm.",
  },
];

const CinematicTimeline = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const years = gsap.utils.toArray(".parallax-year");
      
      const totalWidth = track.offsetWidth - window.innerWidth;

      // 1. Main Horizontal Scroll
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 2. Parallax Effect for Years
      years.forEach((year) => {
        gsap.to(year, {
          x: 150,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${totalWidth}`,
            scrub: 1,
          }
        });
      });

      // 3. Connecting Line Animation
      gsap.fromTo(".progress-line", 
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${totalWidth}`,
            scrub: 1,
          }
        }
      );

      // 4. Starfield Parallax
      gsap.to(".starfield", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Main container with the new gradient theme background
    <div ref={sectionRef} className="bg-gradient-to-b from-[#130026] to-[#05001a] text-white">
      
      <div ref={triggerRef} className="h-screen w-full relative overflow-hidden flex flex-col justify-center">
        
        {/* === ATMOSPHERE LAYERS === */}
        
        {/* 1. Deep Theme Background (Static Layer) */}
        {/* Adds a richer purple layer on top of the base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2e026d] to-[#0f0229] opacity-60 mix-blend-overlay" />
        
        {/* 2. Starfield (Parallax) - Kept for cinematic effect */}
        <div className="starfield absolute inset-0 w-[200vw] h-full opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(white 2px, transparent 2px)', 
               backgroundSize: '50px 50px' 
             }} 
        />
        
        {/* 3. Vignette (Cinematic border) - Adjusted to match the new purple/dark theme */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#05001a_80%)] z-20 pointer-events-none opacity-80" />

        {/* === THE TRACK === */}
        <div 
          ref={trackRef} 
          className="flex relative z-10 h-[60vh] items-center"
          style={{ width: `${timelineData.length * 60 + 50}vw` }}
        >
          
          {/* Connecting Lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10" />
          <div className="progress-line absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 shadow-[0_0_20px_rgba(167,139,250,0.8)] -z-10" />

          {/* Cards Loop */}
          {timelineData.map((item, index) => (
            <div 
              key={index} 
              className="timeline-panel relative w-[60vw] h-full flex items-center justify-center px-10 flex-shrink-0"
            >
              
              {/* PARALLAX LAYER: Giant Year */}
              <div 
                className="parallax-year absolute top-1/4 left-10 text-[12rem] md:text-[20rem] font-bold text-white/5 select-none font-mono"
                style={{ transform: 'translateZ(-50px)' }}
              >
                {item.year}
              </div>

              {/* FOREGROUND LAYER: Glass Card */}
              <div className="timeline-card relative group">
                
                {/* Connecting Dot & Line */}
                <div className="absolute -top-[calc(50vh-50%+2rem)] left-1/2 -translate-x-1/2 w-4 h-4 bg-violet-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,1)] z-30 hidden md:block" />
                <div className="absolute -top-[calc(50vh-50%)] left-1/2 -translate-x-1/2 h-[calc(50vh-50%)] w-[1px] bg-gradient-to-b from-transparent to-violet-500/50 hidden md:block" />

                {/* The Card Itself */}
                <div className="
                  w-[85vw] md:w-[35vw] 
                  p-8 md:p-12 
                  backdrop-blur-md bg-white/5 border border-white/10 
                  rounded-2xl 
                  transition-all duration-500 hover:bg-white/10 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]
                ">
                  
                  {/* Category Tag */}
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-violet-300 text-xs font-mono tracking-widest uppercase">
                      {item.category} // {item.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-lg leading-relaxed font-light border-l-2 border-violet-500/20 pl-6">
                    {item.desc}
                  </p>
                  
                  {/* Decorative Tech UI */}
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <path d="M0 0 H40 V40" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="absolute bottom-4 right-4 text-[10px] text-gray-500 font-mono">
                    COORD: {index * 124}.882
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CinematicTimeline;
