import React, { useEffect, useRef, useState } from "react";
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
  
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const numbers = gsap.utils.toArray(".parallax-number");
        const totalWidth = track.offsetWidth - window.innerWidth;

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
      });

      mm.add("(max-width: 767px)", () => {
        const panels = gsap.utils.toArray(".timeline-panel");

        panels.forEach((panel) => {
          gsap.fromTo(panel,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom-=80",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        gsap.to(".starfield", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div ref={sectionRef} data-testid="horizontal-whatwedo" className="bg-[#030014] text-white">
      <div 
        ref={triggerRef} 
        className="w-full relative overflow-hidden flex flex-col justify-start md:justify-center min-h-screen md:h-screen pt-32 pb-24 md:pt-0 md:pb-0"
      >
        
        {/* Background Layers */}
        <NeuralNetworkBackground opacity={0.3} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 to-[#030014] opacity-80 md:mix-blend-overlay" />
        
        <div className="starfield absolute inset-0 w-[200vw] md:h-full opacity-10 pointer-events-none md:will-change-transform" 
             style={{ 
               backgroundImage: 'radial-gradient(white 2px, transparent 2px)', 
               backgroundSize: '60px 60px' 
             }} 
        />
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#030014_90%)] z-20 pointer-events-none opacity-90" />

        {/* Introduction Text */}
        <div className="relative md:absolute md:top-20 md:left-24 z-30 pointer-events-none px-6 mb-12 md:mb-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00f0ff] uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            Our Initiatives
          </div>
          <h2 className="font-heading font-bold text-4xl md:text-5xl tracking-tight leading-[1.1]">
            Building the future, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#3b00ff]">
              one event at a time.
            </span>
          </h2>
        </div>

        {/* Dynamic Track: Fixed gap to 0 so cards don't auto-space */}
        <div 
          ref={trackRef} 
          className="flex flex-col md:flex-row relative z-10 w-full md:h-[60vh] items-center md:will-change-transform gap-0"
          style={isMobile ? { width: '100%'} : { width: `${pillars.length * 50 + 50}vw` }}
        >
          {/* Desktop Horizontal Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10" />
          <div className="progress-line hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#ff00ff] to-[#3b00ff] md:shadow-[0_0_20px_rgba(255,0,255,0.5)] -z-10 md:will-change-transform" />

          {/* Mobile Vertical Spine Line */}
          <div className="md:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#00f0ff] via-[#ff00ff] to-[#3b00ff] opacity-40 z-0" />

          {pillars.map((item, index) => {
            const Icon = item.icon;
            
            return (
              /* FIXED: Added `h-auto md:h-full` and a strong `-mt-12` pull */
              <div key={index} className="timeline-panel relative w-full px-6 md:px-12 md:w-[50vw] h-auto md:h-full flex items-center justify-center flex-shrink-0 -mt-12 md:mt-0 first:mt-0">
                
                {/* Parallax Number */}
                <div 
                  className="parallax-number absolute -top-4 left-2 md:top-1/4 md:left-10 text-[7rem] md:text-[16rem] font-bold text-white/5 select-none font-mono md:will-change-transform pointer-events-none z-0 leading-none"
                  style={{ transform: 'translateZ(-50px)' }}
                >
                  {item.id}
                </div>

                <div className="timeline-card relative group z-10 w-full max-w-[550px] mb-8 md:mb-0">
                  
                  {/* Timeline Nodes */}
                  <div 
                    className="absolute -top-8 md:-top-[calc(50vh-50%+2rem)] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-30 transition-all duration-300 group-hover:scale-150" 
                    style={{ backgroundColor: item.color, boxShadow: `0 0 15px ${item.color}` }}
                  />
                  
                  {/* Desktop Drop Line */}
                  <div 
                    className="absolute -top-[calc(50vh-50%)] left-1/2 -translate-x-1/2 h-[calc(50vh-50%)] w-[1px] hidden md:block opacity-50" 
                    style={{ background: `linear-gradient(to bottom, transparent, ${item.color})` }}
                  />

                  {/* Glassmorphism Card */}
                  <div 
                    className="relative py-6 px-6 md:p-12 backdrop-blur-none md:backdrop-blur-xl bg-[#0A0A0F] md:bg-[#0A0A0F]/60 border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-[#12121a]/80 shadow-2xl md:shadow-none"
                    style={{ '--hover-border-color': item.color }}
                    onMouseEnter={(e) => { if (!isMobile) e.currentTarget.style.borderColor = `${item.color}50` }}
                    onMouseLeave={(e) => { if (!isMobile) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)' }}
                  >
                    
                    <div 
                      className="absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 rounded-full blur-[30px] md:blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                      style={{ background: item.color }}
                    />

                    <div className="flex items-center justify-between mb-4 md:mb-8 relative z-10">
                      <div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                        style={{ 
                          background: `linear-gradient(135deg, ${item.color}15 0%, transparent 100%)`,
                          border: `1px solid ${item.color}30`
                        }}
                      >
                        <Icon className="w-7 h-7 md:w-8 md:h-8" style={{ color: item.color }} />
                      </div>

                      <span 
                        className="text-xs md:text-sm font-mono tracking-widest uppercase px-3 md:px-4 py-1.5 rounded-full border border-white/10"
                        style={{ color: item.color, backgroundColor: `${item.color}10` }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 relative z-10">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm md:text-lg leading-relaxed font-light pl-4 md:pl-5 relative z-10" style={{ borderLeft: `2px solid ${item.color}40` }}>
                      {item.description}
                    </p>
                    
                    <div 
                      className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-700 ease-in-out hidden md:block"
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