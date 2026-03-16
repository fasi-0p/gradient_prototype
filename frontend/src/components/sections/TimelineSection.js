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

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const years = gsap.utils.toArray(".parallax-year");
      
      const totalWidth = track.offsetWidth - window.innerWidth;

      // Hardware accelerated horizontal scroll
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        force3D: true, 
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      years.forEach((year) => {
        gsap.to(year, {
          x: 150,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${totalWidth}`,
            scrub: 1,
          }
        });
      });

      gsap.fromTo(".progress-line", 
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${totalWidth}`,
            scrub: 1,
          }
        }
      );

      gsap.to(".starfield", {
        xPercent: -50,
        ease: "none",
        force3D: true,
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
    <div ref={sectionRef} data-testid="timeline-section" className="bg-gradient-to-b from-[#130026] to-[#05001a] text-white">
      <div ref={triggerRef} className="h-screen w-full relative overflow-hidden flex flex-col justify-center">
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#2e026d] to-[#0f0229] opacity-60 mix-blend-overlay" />
        
        <div className="starfield absolute inset-0 w-[200vw] h-full opacity-20 pointer-events-none will-change-transform" 
             style={{ 
               backgroundImage: 'radial-gradient(white 2px, transparent 2px)', 
               backgroundSize: '50px 50px' 
             }} 
        />
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#05001a_80%)] z-20 pointer-events-none opacity-80" />

        {/* Added will-change-transform to tell browser to prep GPU */}
        <div 
          ref={trackRef} 
          className="flex relative z-10 h-[60vh] items-center will-change-transform"
          style={{ width: `${timelineData.length * 60 + 50}vw` }}
        >
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10" />
          <div className="progress-line absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 shadow-[0_0_20px_rgba(167,139,250,0.8)] -z-10 will-change-transform" />

          {timelineData.map((item, index) => (
            <div key={index} className="timeline-panel relative w-[60vw] h-full flex items-center justify-center px-10 flex-shrink-0">
              
              <div 
                className="parallax-year absolute top-1/4 left-10 text-[12rem] md:text-[20rem] font-bold text-white/5 select-none font-mono will-change-transform"
                style={{ transform: 'translateZ(-50px)' }}
              >
                {item.year}
              </div>

              <div className="timeline-card relative group">
                <div className="absolute -top-[calc(50vh-50%+2rem)] left-1/2 -translate-x-1/2 w-4 h-4 bg-violet-500 rounded-full shadow-[0_0_15px_rgba(139,92,246,1)] z-30 hidden md:block" />
                <div className="absolute -top-[calc(50vh-50%)] left-1/2 -translate-x-1/2 h-[calc(50vh-50%)] w-[1px] bg-gradient-to-b from-transparent to-violet-500/50 hidden md:block" />

                <div className="w-[85vw] md:w-[35vw] p-8 md:p-12 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl transition-all duration-500 hover:bg-white/10 hover:border-violet-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    <span className="text-violet-300 text-xs font-mono tracking-widest uppercase">
                      {item.category} // {item.year}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-lg leading-relaxed font-light border-l-2 border-violet-500/20 pl-6">
                    {item.desc}
                  </p>
                  
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

export default TimelineSection;