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
          end: "+=15000",
          scrub: 1, 
          pin: true,
          anticipatePin: 1,
        },
      });

      // ----------------------------------------------------
      // PHASE 1: MECHANICAL ASSEMBLY (0% - 20%)
      // ----------------------------------------------------
      // Rings fly in from BEHIND camera to form the gate
      tl.fromTo(".ring-outer", { z: 1000, opacity: 0 }, { z: 0, opacity: 1, duration: 5, ease: "power2.out" })
        .fromTo(".ring-mid", { z: 2000, opacity: 0, rotation: 180 }, { z: 0, opacity: 1, rotation: 0, duration: 5, ease: "power2.out" }, "<0.2")
        .fromTo(".ring-inner", { z: 500, opacity: 0 }, { z: 0, opacity: 1, duration: 5, ease: "power2.out" }, "<0.2")
        
        // HUD Text: "SYSTEM ONLINE"
        .to(".hud.status", { opacity: 1, textContent: "SYSTEM ONLINE", duration: 1 }, "-=1");

      // ----------------------------------------------------
      // PHASE 2: CHARGE & LOCK (20% - 50%)
      // ----------------------------------------------------
      // Rings spin up, core ignites, camera shake begins
      tl.to(".ring-outer", { rotation: 360, duration: 20, ease: "none" })
        .to(".ring-mid", { rotation: -360, duration: 20, ease: "none" }, "<")
        .to(".gate-core", { opacity: 1, scale: 2, duration: 10, ease: "power2.in" }, "<")
        
        // Plasma tunnel fades in (Atmosphere)
        .to(".plasma-tunnel", { opacity: 0.5, scale: 1.5, duration: 20 }, "<")
        
        // HUD Update
        .to(".hud.status", { opacity: 0, duration: 1 }, "<")
        .to(".hud.velocity", { opacity: 1, duration: 1 }, "-=5");

      // ----------------------------------------------------
      // PHASE 3: HYPERSPACE (50% - 85%)
      // ----------------------------------------------------
      // The "Stretch". Stars turn to lines. Gate pulls you in.
      
      // 1. Move gate closer
      tl.to(".gate-container", { z: 500, duration: 15, ease: "power2.in" })
      
      // 2. Warp Lines appear (Speed effect)
      .to(".warp-lines", { opacity: 0.8, scaleY: 5, duration: 10 }, "<")
      
      // 3. Digital Noise/Glitch (Reality breaking)
      .to(".glitch-layer", { opacity: 0.5, duration: 15 }, "<")
      
      // 4. Intense Shake
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
      // FLY THROUGH. CRASH. IMPACT.
      
      // 1. Expand gate past camera (Fly through)
      tl.to(".gate-container", { scale: 50, z: 1500, opacity: 0, duration: 3, ease: "expo.in" })
      
      // 2. Shockwave explosion
      .to(".shockwave", { width: "300vw", height: "300vw", borderWidth: "0px", opacity: 1, duration: 2, ease: "power2.out" }, "<0.1")
      
      // 3. INVERT COLORS FLASH (The "Impact")
      .to(".invert-flash", { opacity: 1, duration: 0.1 }, "<")
      .to(".invert-flash", { opacity: 0, duration: 0.2 }, "+=0.1")
      
      // 4. Reveal "Hyperspace Exit" text
      .to(".hud.exit", { opacity: 1, scale: 1.5, duration: 0.5 }, "-=0.2")
      
      // 5. Clear screen for next section
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
      <div className="hud status" style={{ top: '80%', left: '50%', transform: 'translateX(-50%)' }}></div>{/*INITIALIZING... , MAX VELOCITY,BREACH CONFIRMED */}
      <div className="hud velocity" style={{ top: '80%', left: '50%', transform: 'translateX(-50%)', color: '#ff00ff' }}></div>
      <div className="hud exit" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '3rem', fontWeight: 'bold' }}>Pioneering Future</div>

    </section>
  );
};

export default SpaceTravelSection;

// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "@/index.css"; 

// gsap.registerPlugin(ScrollTrigger);

// const SpaceTravelSection = () => {
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
      
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=6000", 
//           pin: true,
//           scrub: false, 
//           toggleActions: "play none none reverse",
//         },
//       });

//       // ----------------------------------------------------
//       // PHASE 1: HEAVY ASSEMBLY (0s - 1.5s)
//       // ----------------------------------------------------
//       tl.fromTo(".ring-outer", { z: 1000, opacity: 0 }, { z: 0, opacity: 1, duration: 1.5, ease: "power3.out" })
//         .fromTo(".ring-mid", { z: 2000, opacity: 0, rotation: 180 }, { z: 0, opacity: 1, rotation: 0, duration: 1.5, ease: "power3.out" }, "<0.2")
//         .fromTo(".ring-inner", { z: 500, opacity: 0 }, { z: 0, opacity: 1, duration: 1.5, ease: "power3.out" }, "<0.2")
//         .to(".hud.status", { opacity: 1, textContent: "SYSTEM ONLINE", duration: 1 }, "-=0.5");

//       // ----------------------------------------------------
//       // PHASE 2: TURBINE CHARGE (1.5s - 4.0s)
//       // ----------------------------------------------------
//       tl.to(".ring-outer", { rotation: 360, duration: 2.5, ease: "expo.in" })
//         .to(".ring-mid", { rotation: -360, duration: 2.5, ease: "expo.in" }, "<")
//         .to(".gate-core", { opacity: 1, scale: 4, duration: 2.5, ease: "expo.in" }, "<")
//         .to(".plasma-tunnel", { opacity: 0.6, scale: 1.2, duration: 2.5, ease: "power2.in" }, "<")
//         .to(".hud.status", { opacity: 0, duration: 0.2 }, "<")
//         .to(".hud.velocity", { opacity: 1, duration: 0.5 }, "-=1.0");

//       // ----------------------------------------------------
//       // PHASE 3: THE HYPER-TUNNEL (4.0s - 7.5s)
//       // ----------------------------------------------------
//       tl.to(".gate-container", { z: 500, duration: 3.5, ease: "none" })
//         .to(".warp-lines", { opacity: 1, scaleY: 10, duration: 2.0, ease: "power2.in" }, "<")
//         .to(".glitch-layer", { opacity: 1, duration: 3.5, ease: "power1.in" }, "<")
//         .to(".space-section", { x: 2, y: 2, rotation: 0.5, repeat: 35, yoyo: true, duration: 0.1 }, "<")
//         .to(".space-section", { x: 20, y: 20, rotation: 2, repeat: 10, yoyo: true, duration: 0.05 }, "-=0.5");

//       // ----------------------------------------------------
//       // PHASE 4: THE LONG BREACH (7.5s - 13.0s) -- EXTENDED GREEN PHASE
//       // ----------------------------------------------------
//       // Total Duration: ~5.5 Seconds of visual intensity
      
//       // 1. Slow Motion Gate Swallow
//       // We slow this down so you are "inside" the gate structure longer
//       tl.to(".gate-container", { scale: 150, z: 2500, opacity: 0, duration: 5.0, ease: "expo.in" })
      
//       // 2. Shockwave (Slow expansion)
//       .to(".shockwave", { width: "300vw", height: "300vw", borderWidth: "0px", opacity: 1, duration: 3.0, ease: "power2.out" }, "-=4.5")
      
//       // 3. THE "GREEN SCREEN" (Inversion) SEQUENCE
//       // Instead of a flicker, we hold the inverted state.
      
//       // Hit 1: Hard Invert (Green/Negative World) - Hold for 0.8s
//       .to(".invert-flash", { opacity: 1, duration: 0.1, ease: "steps(1)" }, "-=3.5") 
//       .to(".invert-flash", { opacity: 1, duration: 0.8 }, ">") // STAY GREEN
      
//       // Hit 2: Flicker Reality (Rapid Strobe)
//       .to(".invert-flash", { opacity: 0, duration: 0.1 }, ">")
//       .to(".invert-flash", { opacity: 1, duration: 0.1 }, ">")
//       .to(".invert-flash", { opacity: 0, duration: 0.1 }, ">")
//       .to(".invert-flash", { opacity: 1, duration: 0.2 }, ">")
      
//       // Hit 3: Final Sustained Inversion (The Crash) - Hold for 1.2s
//       .to(".invert-flash", { opacity: 1, duration: 1.2 }, ">") // LONG GREEN HOLD
      
//       // 4. Reveal Text inside the chaos
//       .to(".hud.exit", { opacity: 1, scale: 2, duration: 0.5, color: "black" }, "-=2.0") // Text appears black on green
      
//       // 5. Final Fade Out
//       // Fade the inversion out slowly to reveal white, then transparent
//       .to(".invert-flash", { opacity: 0, duration: 1.0 }, ">")
//       .to(".space-section", { backgroundColor: "white", duration: 0.5 }, "-=0.5")
//       .to(".space-section", { opacity: 0, duration: 2.0 }, ">");

//     }, sectionRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section ref={sectionRef} className="space-section">
      
//       <div className="gate-container">
//         <div className="gate-ring ring-outer"></div>
//         <div className="gate-ring ring-mid"></div>
//         <div className="gate-ring ring-inner"></div>
//         <div className="gate-core"></div>
//       </div>

//       <div className="plasma-tunnel"></div>
//       <div className="warp-lines"></div>
//       <div className="glitch-layer"></div>

//       <div className="shockwave"></div>
//       {/* This layer creates the Green/Negative effect */}
//       <div className="invert-flash"></div>

//       <div className="hud status" style={{ top: '80%', left: '50%', transform: 'translateX(-50%)' }}>SEQUENCE START</div>
//       <div className="hud velocity" style={{ top: '80%', left: '50%', transform: 'translateX(-50%)', color: '#ff00ff' }}>TERMINAL VELOCITY</div>
//       <div className="hud exit" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '5rem', fontWeight: '900', mixBlendMode: 'difference' }}>BREACH</div>

//     </section>
//   );
// };

// export default SpaceTravelSection;