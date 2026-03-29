import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "@/index.css"

gsap.registerPlugin(ScrollTrigger);

const SpaceTravelSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1, 
          pin: true,
          anticipatePin: 1,
        },
      });

      // ----------------------------------------------------
      // PHASE 1: MECHANICAL ASSEMBLY (0% - 20%)
      // ----------------------------------------------------
      tl.fromTo(".ring-outer", { z: 1000, opacity: 0 }, { z: 0, opacity: 1, duration: 5, ease: "power2.out" })
        .fromTo(".ring-mid", { z: 2000, opacity: 0, rotation: 180 }, { z: 0, opacity: 1, rotation: 0, duration: 5, ease: "power2.out" }, "<0.2")
        .fromTo(".ring-inner", { z: 500, opacity: 0 }, { z: 0, opacity: 1, duration: 5, ease: "power2.out" }, "<0.2")
        .to(".hud.status", { opacity: 1, textContent: "", duration: 1 }, "-=1");

      // ----------------------------------------------------
      // PHASE 2: CHARGE & LOCK (20% - 50%)
      // ----------------------------------------------------
      tl.to(".ring-outer", { rotation: 360, duration: 20, ease: "none" })
        .to(".ring-mid", { rotation: -360, duration: 20, ease: "none" }, "<")
        .to(".gate-core", { opacity: 1, scale: 2, duration: 10, ease: "power2.in" }, "<")
        .to(".plasma-tunnel", { opacity: 0.5, scale: 1.5, duration: 20 }, "<")
        .to(".hud.status", { opacity: 0, duration: 1 }, "<")
        .to(".hud.velocity", { opacity: 1, duration: 1 }, "-=5");

      // ----------------------------------------------------
      // PHASE 3: HYPERSPACE (50% - 85%)
      // ----------------------------------------------------
      tl.to(".gate-container", { z: 500, duration: 15, ease: "power2.in" })
      .to(".warp-lines", { opacity: 0.8, scaleY: 5, duration: 10 }, "<")
      .to(".glitch-layer", { opacity: 0.5, duration: 15 }, "<")
      .to(".space-section", { 
         x: 10, y: 10, 
         rotation: 1, 
         repeat: 30, 
         yoyo: true, 
         duration: 0.05 
      }, "<");

      // ----------------------------------------------------
      // PHASE 4: THE BREACH (85% - 100%)
      // ----------------------------------------------------
      tl.to(".gate-container", { scale: 50, z: 1500, opacity: 0, duration: 3, ease: "expo.in" })
      .to(".shockwave", { width: "300vw", height: "300vw", borderWidth: "0px", opacity: 1, duration: 2, ease: "power2.out" }, "<0.1")
      .to(".invert-flash", { opacity: 1, duration: 0.1 }, "<")
      .to(".invert-flash", { opacity: 0, duration: 0.2 }, "+=0.1")
      // Reveal "Hyperspace Exit" text
      .to(".hud.exit", { opacity: 1, scale: 1.5, duration: 0.5 }, "-=0.2")
      .to(".space-section", { opacity: 0, duration: 1 }, "+=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="space-section">
      
      {/* 3D GATE OBJECT */}
      <div className="gate-container">
        <div className="gate-ring ring-outer"></div>
        <div className="gate-ring ring-mid"></div>
        <div className="gate-ring ring-inner"></div>
        <div className="gate-core"></div>
      </div>

      {/* ATMOSPHERE LAYERS */}
      <div className="plasma-tunnel"></div>
      <div className="warp-lines"></div>
      <div className="glitch-layer"></div>

      {/* IMPACT EFFECTS */}
      <div className="shockwave"></div>
      <div className="invert-flash"></div>

      {/* HUD TEXT */}
      <div className="hud status" style={{ top: '80%', left: '50%', transform: 'translateX(-50%)' }}></div>
      <div className="hud velocity" style={{ top: '80%', left: '50%', transform: 'translateX(-50%)', color: '#7C3AED' }}></div>
      
      {/* FIXED: Text wrapping, Safe Centering, and Clamped Size */}
      <div 
        className="hud exit" 
        style={{ 
          top: '50%', 
          left: '0', // Start from left 0
          width: '100%', // Span full width
          transform: 'translateY(-50%)', // Only translate Y to avoid GSAP scale conflicts
          fontSize: 'clamp(2rem, 6vw, 4rem)', // Generous scaling
          fontWeight: '900',
          textAlign: 'center',
          lineHeight: '1.1',
          padding: '0 20px', // Prevent kissing the absolute edges
          boxSizing: 'border-box'
        }}
      >
        Pioneering <br className="md:hidden" /> Future
      </div>

    </section>
  );
};

export default SpaceTravelSection;