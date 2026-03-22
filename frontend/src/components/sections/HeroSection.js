// import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowDown } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { siteConfig } from '../../data/content';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import LiquidEther from '../three/LiquidEther';

// gsap.registerPlugin(ScrollTrigger);

// const HeroSection = () => {
//   const containerRef = useRef(null);
//   const textContainerRef = useRef(null);
//   const otherElementsRef = useRef([]);

//   /* GSAP Scroll Animation */

//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: "+=1200",
//           scrub: 1,
//           pin: true,
//           anticipatePin: 1,
//         },
//       });

//       tl.to(
//         otherElementsRef.current,
//         {
//           opacity: 0,
//           duration: 0.4,
//           ease: "power2.inOut",
//         },
//         0
//       );

//       tl.to(
//         textContainerRef.current,
//         {
//           scale: 12,
//           opacity: 0,
//           transformOrigin: "center center",
//           duration: 1.2,
//           ease: "power3.in",
//           force3D: true,
//         },
//         0
//       );
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   const scrollToContent = () => {
//     if (window.lenis) {
//       window.lenis.scrollTo("#about-section", { duration: 1.5 });
//     } else {
//       window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
//     }
//   };

//   return (
//     <section
//       ref={containerRef}
//       data-testid="hero-section"
//       className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0F]"
//     >
//       {/* High-Performance Interactive Background */}
//       <div className="absolute inset-0 z-0 opacity-60">
//         <LiquidEther
//           colors={['#7C3AED', '#3B82F6', '#A855F7']}
//           mouseForce={20}
//           cursorSize={100}
//           isViscous
//           viscous={30}
//           iterationsViscous={32}
//           iterationsPoisson={32}
//           resolution={0.5}
//           isBounce={false}
//           autoDemo
//           autoSpeed={0.5}
//           autoIntensity={2.2}
//           takeoverDuration={0.25}
//           autoResumeDelay={3000}
//           autoRampDuration={0.6}
//         />
//       </div>

//       <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/30 via-transparent to-[#0A0A0F] z-10 pointer-events-none" />

//       {/* Content */}
//       <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        
//         <div
//           ref={textContainerRef}
//           className="relative z-10 will-change-transform"
//         >
//           <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] tracking-tighter leading-[0.85] mb-6 flex justify-center">
//             <span className="gradient-text glow-text">
//               {siteConfig.name}
//             </span>
//           </h1>
//         </div>

//         <div
//           ref={(el) => {
//             if (el && !otherElementsRef.current.includes(el))
//               otherElementsRef.current.push(el);
//           }}
//         >
//           <p className="font-heading text-xl md:text-2xl lg:text-3xl text-white/80 mb-4">
//             {siteConfig.tagline}
//           </p>

//           <p className="text-white/50 max-w-2xl mx-auto mb-12 text-base md:text-lg">
//             Pioneering the future through AI and Machine Learning innovation at
//             B.M.S. College of Engineering.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
//             <Link
//               to="/about"
//               className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
//             >
//               <span className="relative z-10">Explore Our Club</span>
//               <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
//                 Explore Our Club
//               </span>

//             </Link>

//             <Link
//               to="/events"
//               className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-md"
//             >
//               View Events
//             </Link>

//           </div>
//         </div>
//       </div>

//       {/* Scroll indicator */}

//       <div
//         ref={(el) => {
//           if (el && !otherElementsRef.current.includes(el))
//             otherElementsRef.current.push(el);
//         }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
//         onClick={scrollToContent}
//       >

//         {/* <span className="font-mono text-xs uppercase tracking-widest">
//           Scroll
//         </span> */}

//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//         >
//           <ArrowDown className="w-5 h-5" />
//         </motion.div>

//       </div>
//     </section>
//   );
// };

// export default HeroSection;
import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- ULTRA-LIGHTWEIGHT NEURAL CANVAS COMPONENT ---
// We define this right here so you don't need any extra files.
const NeuralNetBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Detect mobile to dynamically scale down complexity for performance
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 40 : 90;
    const CONNECTION_DISTANCE = isMobile ? 100 : 150;
    const MOUSE_RADIUS = isMobile ? 120 : 200;

    let mouse = { x: -1000, y: -1000 };
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Slow organic drift
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }

    // Populate network
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    // Interactive Mouse Tracking
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    // Listeners (passive: true helps mobile scrolling performance)
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', (e) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.update();

        // Draw individual nodes
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124, 58, 237, 0.4)'; // Subtle Violet node
        ctx.fill();

        // 1. Connect node to mouse (Synaptic firing)
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < MOUSE_RADIUS) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = 1 - (distMouse / MOUSE_RADIUS);
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.6})`; // Bright blue connection
          ctx.lineWidth = 1;
          ctx.stroke();

          // Gravity effect: Nodes gently pull toward the cursor
          p.x -= dxMouse * 0.02;
          p.y -= dyMouse * 0.02;
        }

        // 2. Connect node to other nodes (The Network)
        for (let j = i + 1; j < particles.length; j++) {
          let p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 1 - (dist / CONNECTION_DISTANCE);
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.2})`; // Faint purple web
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
// --------------------------------------------------------

const HeroSection = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const otherElementsRef = useRef([]);

  /* GSAP Scroll Animation (Optimized to fix lag) */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        otherElementsRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.inOut",
          stagger: 0.05,
        },
        0
      );

      // We use scale: 5 with blur instead of scale: 12. 
      // It looks identically massive but stops the browser from choking on font rasterization.
      tl.to(
        textContainerRef.current,
        {
          scale: 5,
          opacity: 0,
          y: -100,
          filter: "blur(12px)", 
          transformOrigin: "center center",
          duration: 1.2,
          ease: "power3.in",
          force3D: true,
        },
        0.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    if (window.lenis) {
      window.lenis.scrollTo("#about-section", { duration: 1.5 });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0F]"
    >
      {/* High-Performance Interactive Neural Background */}
      <div className="absolute inset-0 z-0">
        <NeuralNetBackground />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/20 via-transparent to-[#0A0A0F] z-10 pointer-events-none" />

      {/* Content */}
      {/* pointer-events-none allows the mouse to interact with the canvas behind the text */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center pointer-events-none">
        
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          ref={textContainerRef}
          className="relative z-10 will-change-transform"
        >
          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] tracking-tighter leading-[0.85] mb-6 flex justify-center">
            <span className="gradient-text glow-text drop-shadow-[0_0_20px_rgba(124,58,237,0.3)]">
              {siteConfig.name}
            </span>
          </h1>
        </motion.div>

        <div
          ref={(el) => {
            if (el && !otherElementsRef.current.includes(el))
              otherElementsRef.current.push(el);
          }}
          className="pointer-events-auto"
        >
          <p className="font-heading text-xl md:text-2xl lg:text-3xl text-white/80 mb-4 drop-shadow-md">
            {siteConfig.tagline}
          </p>

          <p className="text-white/50 max-w-2xl mx-auto mb-12 text-base md:text-lg">
            Pioneering the future through AI and Machine Learning innovation at
            B.M.S. College of Engineering.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            <Link
              to="/about"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(124,58,237,0.2)]"
            >
              <span className="relative z-10">Explore Our Club</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold">
                Explore Our Club
              </span>
            </Link>

            <Link
              to="/events"
              className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300 font-medium backdrop-blur-md"
            >
              View Events
            </Link>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={(el) => {
          if (el && !otherElementsRef.current.includes(el))
            otherElementsRef.current.push(el);
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors cursor-pointer pointer-events-auto"
        onClick={scrollToContent}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;