import React, { useRef, useEffect, useCallback, useState } from 'react';

/**
 * Interactive Gradient Logo Component
 * 
 * Creates an interactive particle-based logo that responds to cursor/touch
 * Based on the Gradient club's zigzag logo design
 * 
 * Props:
 * - className: Additional CSS classes
 * - particleCount: Number of particles (default: 1000)
 * - interactionRadius: Radius of mouse interaction effect (default: 0.4)
 * - returnSpeed: Speed at which particles return to position (default: 0.08)
 * - showGlow: Whether to show glow effects (default: true)
 * - logoScale: Scale of the logo (default: 1)
 */
const InteractiveGradientLogo = ({ 
  className = '',
  particleCount = 1000,
  interactionRadius = 0.4,
  returnSpeed = 0.08,
  showGlow = true,
  logoScale = 1
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, isActive: false });
  const particlesRef = useRef([]);
  const animationRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate particles along the zigzag logo path
  const initParticles = useCallback(() => {
    const particles = [];
    
    // Zigzag path points - matching the Gradient logo shape
    // The logo has 4 peaks going up-down-up-down-up pattern
    const zigzagPoints = [
      // First stroke (going down-right)
      { x: -0.55, y: 0.45 },
      { x: -0.40, y: -0.45 },
      // Second stroke (going up-right)  
      { x: -0.25, y: 0.35 },
      // Third stroke (going down-right)
      { x: -0.05, y: -0.40 },
      // Fourth stroke (going up-right)
      { x: 0.15, y: 0.40 },
      // Fifth stroke (going down-right)
      { x: 0.35, y: -0.35 },
      // Sixth stroke (going up-right)
      { x: 0.55, y: 0.45 },
      // Seventh stroke (going down)
      { x: 0.70, y: -0.30 }
    ];

    // Create particles along the path with thickness
    const mainParticleCount = Math.floor(particleCount * 0.85);
    const strokeWidth = 0.08; // Thickness of the stroke

    for (let i = 0; i < mainParticleCount; i++) {
      // Progress along the entire path
      const pathProgress = i / mainParticleCount;
      const totalSegments = zigzagPoints.length - 1;
      const segmentFloat = pathProgress * totalSegments;
      const segmentIndex = Math.min(Math.floor(segmentFloat), totalSegments - 1);
      const segmentProgress = segmentFloat - segmentIndex;

      const startPoint = zigzagPoints[segmentIndex];
      const endPoint = zigzagPoints[segmentIndex + 1];

      // Interpolate position along segment
      const baseX = startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
      const baseY = startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;

      // Add perpendicular offset for stroke width
      const dx = endPoint.x - startPoint.x;
      const dy = endPoint.y - startPoint.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const perpX = -dy / len;
      const perpY = dx / len;

      // Random offset within stroke width
      const offset = (Math.random() - 0.5) * strokeWidth;
      const x = baseX + perpX * offset;
      const y = baseY + perpY * offset;

      // Color gradient from magenta (#ff00ff) to blue (#3b00ff)
      const hue = 280 + pathProgress * 60; // 280 (magenta) to 340 (blue-ish)
      const saturation = 100;
      const lightness = 50 + Math.random() * 20;

      particles.push({
        x,
        y,
        origX: x,
        origY: y,
        vx: 0,
        vy: 0,
        size: 1.5 + Math.random() * 2.5,
        color: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        hue,
        brightness: 0.7 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2 // For subtle animation
      });
    }

    // Add ambient floating particles around the logo
    const ambientCount = particleCount - mainParticleCount;
    for (let i = 0; i < ambientCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.3 + Math.random() * 0.6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * 0.7; // Slightly flattened

      particles.push({
        x,
        y,
        origX: x,
        origY: y,
        vx: 0,
        vy: 0,
        size: 0.5 + Math.random() * 1,
        color: `hsla(${280 + Math.random() * 60}, 100%, 70%, 0.4)`,
        hue: 280 + Math.random() * 60,
        brightness: 0.3 + Math.random() * 0.3,
        isAmbient: true,
        floatSpeed: 0.5 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2
      });
    }

    return particles;
  }, [particleCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    particlesRef.current = initParticles();
    setIsLoaded(true);

    let time = 0;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.45 * logoScale;

      // Clear with trail effect
      ctx.fillStyle = 'rgba(3, 0, 20, 0.12)';
      ctx.fillRect(0, 0, width, height);

      // Get normalized mouse position (-1 to 1)
      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;
      const isActive = mouseRef.current.isActive;

      time += 0.016;

      // Update and draw particles
      particlesRef.current.forEach((p, i) => {
        let targetX = p.origX;
        let targetY = p.origY;

        // Mouse/touch interaction
        if (isActive) {
          const dx = p.origX - mx;
          const dy = p.origY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < interactionRadius) {
            // Push particles away from cursor with smooth falloff
            const force = Math.pow(1 - dist / interactionRadius, 2) * 0.35;
            targetX = p.origX + dx * force;
            targetY = p.origY + dy * force;
          }
        }

        // Ambient particles float
        if (p.isAmbient) {
          targetY += Math.sin(time * p.floatSpeed + p.floatOffset) * 0.03;
          targetX += Math.cos(time * p.floatSpeed * 0.7 + p.floatOffset) * 0.02;
        } else {
          // Subtle breathing animation for logo particles
          const breathe = Math.sin(time * 1.5 + p.phase) * 0.005;
          targetY += breathe;
        }

        // Smooth spring physics
        const springStrength = returnSpeed;
        const damping = 0.85;
        
        p.vx += (targetX - p.x) * springStrength;
        p.vy += (targetY - p.y) * springStrength;
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        // Calculate screen position
        const screenX = centerX + p.x * scale;
        const screenY = centerY - p.y * scale;

        // Calculate dynamic brightness based on movement
        const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const dynamicBrightness = Math.min(1, p.brightness + velocity * 5);

        // Draw particle
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size, 0, Math.PI * 2);
        
        if (p.isAmbient) {
          ctx.fillStyle = p.color;
        } else {
          ctx.fillStyle = `hsla(${p.hue}, 100%, ${50 + dynamicBrightness * 20}%, ${dynamicBrightness})`;
        }
        ctx.fill();

        // Glow effect for main logo particles
        if (showGlow && !p.isAmbient && dynamicBrightness > 0.6) {
          const glowSize = p.size * (2 + velocity * 10);
          const gradient = ctx.createRadialGradient(
            screenX, screenY, 0,
            screenX, screenY, glowSize
          );
          gradient.addColorStop(0, `hsla(${p.hue}, 100%, 60%, ${dynamicBrightness * 0.3})`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fillRect(screenX - glowSize, screenY - glowSize, glowSize * 2, glowSize * 2);
        }
      });

      // Draw subtle orbital rings
      ctx.strokeStyle = 'rgba(255, 0, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, scale * 1.1, scale * 0.9, time * 0.1, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(59, 0, 255, 0.05)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, scale * 1.3, scale * 1.0, -time * 0.08, 0, Math.PI * 2);
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initParticles, interactionRadius, returnSpeed, showGlow, logoScale]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = (e.clientX - rect.left) / rect.width;
    mouseRef.current.y = (e.clientY - rect.top) / rect.height;
    mouseRef.current.isActive = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0] || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = (e.touches[0].clientX - rect.left) / rect.width;
    mouseRef.current.y = (e.touches[0].clientY - rect.top) / rect.height;
    mouseRef.current.isActive = true;
  };

  const handleTouchEnd = () => {
    mouseRef.current.isActive = false;
  };

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ background: 'transparent', touchAction: 'none' }}
    />
  );
};

export default InteractiveGradientLogo;
