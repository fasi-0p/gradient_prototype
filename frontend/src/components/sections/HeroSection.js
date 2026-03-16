import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ---------------- NEURAL NETWORK BACKGROUND ---------------- */

const NeuralNetworkBackground = ({ mouseRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const connectionDistance = 150;
    const mouseConnectionDistance = 120;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fill();
      }
    }

    let smoothMouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const init = () => {
      resizeCanvas();
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseX = mouseRef.current.x * canvas.width;
      const mouseY = mouseRef.current.y * canvas.height;

      // smoothing (perfect sensitivity)
      smoothMouse.x += (mouseX - smoothMouse.x) * 0.05;
      smoothMouse.y += (mouseY - smoothMouse.y) * 0.05;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const opacity = 1 - dist / connectionDistance;

            ctx.strokeStyle = `rgba(217,70,239,${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const mdx = p.x - smoothMouse.x;
        const mdy = p.y - smoothMouse.y;
        const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mouseDist < mouseConnectionDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(smoothMouse.x, smoothMouse.y);

          const opacity = 1 - mouseDist / mouseConnectionDistance;

          ctx.strokeStyle = `rgba(6,182,212,${opacity * 0.5})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60"
    />
  );
};

/* ---------------- HERO SECTION ---------------- */

const HeroSection = () => {
  const containerRef = useRef(null);
  const textContainerRef = useRef(null);
  const otherElementsRef = useRef([]);

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  /* Mouse tracking */
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      mouseRef.current = { x, y };

      setMousePos({
        x: x * 100,
        y: y * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* GSAP Scroll Animation */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        otherElementsRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        0
      );

      tl.to(
        textContainerRef.current,
        {
          scale: 12,
          opacity: 0,
          transformOrigin: "center center",
          duration: 1.2,
          ease: "power3.in",
          force3D: true,
        },
        0
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030014]"
    >
      {/* Cursor gradient */}
      <div
        className="absolute inset-0 z-0 opacity-60 pointer-events-none"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}% ${mousePos.y}%, rgba(255,0,255,0.15), rgba(59,0,255,0.05), transparent 80%)`,
        }}
      />

      {/* Neural network */}
      <NeuralNetworkBackground mouseRef={mouseRef} />

      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/30 via-transparent to-[#030014] z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <div ref={textContainerRef} className="relative z-10 will-change-transform">
          <h1 className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] tracking-tighter leading-[0.85] mb-6 flex justify-center">
            <span className="gradient-text glow-text">{siteConfig.name}</span>
          </h1>
        </div>

        <div
          ref={(el) => {
            if (el && !otherElementsRef.current.includes(el))
              otherElementsRef.current.push(el);
          }}
        >
          <p className="font-heading text-xl md:text-2xl lg:text-3xl text-white/80 mb-4">
            {siteConfig.tagline}
          </p>

          <p className="text-white/50 max-w-2xl mx-auto mb-12 text-base md:text-lg">
            Pioneering the future through AI and Machine Learning innovation at
            B.M.S. College of Engineering.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/about"
              className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10">Explore Our Club</span>

              <div className="absolute inset-0 bg-gradient-to-r from-[#ff00ff] to-[#3b00ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
        onClick={scrollToContent}
      >
        <span className="font-mono text-xs uppercase tracking-widest">
          Scroll
        </span>

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