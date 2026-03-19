import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Zap, Network, MicVocal, TrendingUp, UsersRound } from 'lucide-react';
import NeuralNetworkBackground from "../background/NeuralNetworkBackground";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    id: "01",
    title: "Technical Workshops",
    category: "Deep Dive",
    description: "Hands-on sessions diving into neural architectures, LLMs, and real-world ML engineering.",
    icon: Cpu,
    color: "#00f0ff" // Cyan
  },
  {
    id: "02",
    title: "Hackathons",
    category: "Competition",
    description: "24-hour high-octane sprints to build, deploy, and scale intelligent systems under pressure.",
    icon: Zap,
    color: "#ff00ff" // Fuchsia
  },
  {
    id: "03",
    title: "Technical Events",
    category: "Innovation",
    description: "Interactive challenges, datathons, and tech-expos pushing the boundaries of applied AI.",
    icon: Network,
    color: "#7C3AED" // Deep Purple
  },
  {
    id: "04",
    title: "Guest Lectures",
    category: "Insights",
    description: "Unfiltered insights and architectural breakdowns from industry-leading AI researchers.",
    icon: MicVocal,
    color: "#FF9D00" // Neon Gold
  },
  {
    id: "05",
    title: "Placement Talks",
    category: "Career",
    description: "Strategic roadmaps and insider knowledge to crack top-tier AI/ML engineering roles.",
    icon: TrendingUp,
    color: "#00FF9D" // Emerald
  },
  {
    id: "06",
    title: "Networking",
    category: "Community",
    description: "Connect and collaborate with a high-caliber collective of builders, researchers, and innovators.",
    icon: UsersRound,
    color: "#3b00ff" // Electric Blue
  }
];

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const numbers = gsap.utils.toArray(".parallax-number");
      
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

      // Parallax effect for the background numbers
      numbers.forEach((num) => {
        gsap.to(num, {
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

      // Growing progress line
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

      // Slow pan for the starfield
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
    <div ref={sectionRef} data-testid="horizontal-whatwedo" className="bg-[#030014] text-white">
      <div ref={triggerRef} className="h-screen w-full relative overflow-hidden flex flex-col justify-center">
        
        {/* Background Layers */}
        <NeuralNetworkBackground opacity={0.3} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 to-[#030014] opacity-80 mix-blend-overlay" />
        
        <div className="starfield absolute inset-0 w-[200vw] h-full opacity-10 pointer-events-none will-change-transform" 
             style={{ 
               backgroundImage: 'radial-gradient(white 2px, transparent 2px)', 
               backgroundSize: '60px 60px' 
             }} 
        />
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#030014_90%)] z-20 pointer-events-none opacity-90" />

        {/* Introduction Text (Fades out as you scroll) */}
        <div className="absolute top-20 left-10 md:left-24 z-30 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            Our Initiatives
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight leading-[1.1]">
            Building the future, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#3b00ff]">
              one event at a time.
            </span>
          </h2>
        </div>

        {/* The Horizontal Track */}
        <div 
          ref={trackRef} 
          className="flex relative z-10 h-[60vh] items-center will-change-transform mt-20"
          style={{ width: `${pillars.length * 50 + 50}vw` }}
        >
          {/* Track Lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
          <div className="progress-line absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#3b00ff] shadow-[0_0_20px_rgba(255,0,255,0.5)] -z-10 will-change-transform" />

          {pillars.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div key={index} className="timeline-panel relative w-[85vw] md:w-[50vw] h-full flex items-center justify-center px-6 md:px-12 flex-shrink-0">
                
                {/* Massive Parallax Number */}
                <div 
                  className="parallax-number absolute top-1/4 left-10 text-[10rem] md:text-[16rem] font-bold text-white/5 select-none font-mono will-change-transform pointer-events-none"
                  style={{ transform: 'translateZ(-50px)' }}
                >
                  {item.id}
                </div>

                {/* --- SIZING ADJUSTED HERE: max-w-[550px] --- */}
                <div className="timeline-card relative group z-10 w-full max-w-[550px]">
                  {/* Timeline Nodes (Dots on the line) */}
                  <div 
                    className="absolute -top-[calc(50vh-50%+2rem)] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-30 hidden md:block transition-all duration-300 group-hover:scale-150" 
                    style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}` }}
                  />
                  <div 
                    className="absolute -top-[calc(50vh-50%)] left-1/2 -translate-x-1/2 h-[calc(50vh-50%)] w-[1px] hidden md:block opacity-50" 
                    style={{ background: `linear-gradient(to bottom, transparent, ${item.color})` }}
                  />

                  {/* The Glassmorphism Card (PADDING ADJUSTED: md:p-12) */}
                  <div 
                    className="relative p-8 md:p-12 backdrop-blur-xl bg-[#0A0A0F]/60 border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-[#12121a]/80"
                    style={{ '--hover-border-color': item.color }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${item.color}50`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}
                  >
                    
                    {/* Glowing background orb behind icon */}
                    <div 
                      className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                      style={{ background: item.color }}
                    />

                    {/* Icon Header */}
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      
                      {/* --- ICON SIZING ADJUSTED HERE: w-16 h-16 and w-8 h-8 --- */}
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                        style={{ 
                          background: `linear-gradient(135deg, ${item.color}15 0%, transparent 100%)`,
                          border: `1px solid ${item.color}30`
                        }}
                      >
                        <Icon className="w-8 h-8" style={{ color: item.color }} />
                      </div>

                      {/* Category Pill */}
                      <span 
                        className="text-sm font-mono tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/10"
                        style={{ color: item.color, backgroundColor: `${item.color}10` }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* --- TEXT SIZING ADJUSTED HERE: text-3xl md:text-4xl --- */}
                    <h3 className="text-3xl md:text-4xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 relative z-10">
                      {item.title}
                    </h3>

                    {/* --- TEXT SIZING ADJUSTED HERE: text-base md:text-lg --- */}
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed font-light pl-5 relative z-10" style={{ borderLeft: `2px solid ${item.color}40` }}>
                      {item.description}
                    </p>
                    
                    {/* Bottom Gradient Line Effect */}
                    <div 
                      className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-in-out"
                      style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                    />

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;