import React, { useRef, useEffect, useCallback } from 'react';

// Pure WebGL Interactive Logo - No external dependencies
const InteractiveLogo = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const particlesRef = useRef([]);
  const animationRef = useRef();

  const initParticles = useCallback((canvas) => {
    const count = 800;
    const particles = [];
    
    // Zigzag path points (matching Gradient logo)
    const zigzagPoints = [
      [-0.6, 0.4], [-0.4, -0.4], [-0.1, 0.4], [0.1, -0.4], 
      [0.3, 0.4], [0.5, -0.4], [0.7, 0.4]
    ];
    
    for (let i = 0; i < count; i++) {
      const pathProgress = (i / count) * (zigzagPoints.length - 1);
      const segmentIndex = Math.floor(pathProgress);
      const segmentProgress = pathProgress - segmentIndex;
      
      const startPoint = zigzagPoints[Math.min(segmentIndex, zigzagPoints.length - 1)];
      const endPoint = zigzagPoints[Math.min(segmentIndex + 1, zigzagPoints.length - 1)];
      
      const x = startPoint[0] + (endPoint[0] - startPoint[0]) * segmentProgress;
      const y = startPoint[1] + (endPoint[1] - startPoint[1]) * segmentProgress;
      
      const spread = 0.05;
      particles.push({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        origX: x + (Math.random() - 0.5) * spread,
        origY: y + (Math.random() - 0.5) * spread,
        size: 1.5 + Math.random() * 2,
        color: `hsl(${280 + (i / count) * 60}, 100%, ${50 + Math.random() * 20}%)`
      });
    }
    
    // Add ambient particles
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 1.5,
        origX: (Math.random() - 0.5) * 2,
        origY: (Math.random() - 0.5) * 1.5,
        size: 0.5 + Math.random(),
        color: `hsla(${280 + Math.random() * 60}, 100%, 70%, 0.3)`,
        isAmbient: true
      });
    }
    
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    particlesRef.current = initParticles(canvas);
    
    let time = 0;
    
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.4;
      
      ctx.fillStyle = 'rgba(3, 0, 20, 0.15)';
      ctx.fillRect(0, 0, width, height);
      
      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;
      
      time += 0.016;
      
      particlesRef.current.forEach((p, i) => {
        // Mouse interaction
        const dx = p.origX - mx;
        const dy = p.origY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 0.5;
        
        let targetX = p.origX;
        let targetY = p.origY;
        
        if (dist < maxDist && !p.isAmbient) {
          const force = (1 - dist / maxDist) * 0.3;
          targetX = p.origX + dx * force;
          targetY = p.origY + dy * force;
        }
        
        // Floating animation
        if (p.isAmbient) {
          targetY += Math.sin(time * 0.5 + i * 0.1) * 0.02;
          targetX += Math.cos(time * 0.3 + i * 0.05) * 0.01;
        } else {
          targetY += Math.sin(time * 2 + i * 0.01) * 0.01;
        }
        
        // Smooth interpolation
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;
        
        // Draw particle
        const screenX = centerX + p.x * scale;
        const screenY = centerY - p.y * scale;
        
        ctx.beginPath();
        ctx.arc(screenX, screenY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Glow effect for logo particles
        if (!p.isAmbient) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, p.size * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, p.size * 3);
          gradient.addColorStop(0, p.color.replace(')', ', 0.3)').replace('hsl', 'hsla'));
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });
      
      // Draw orbiting rings
      ctx.strokeStyle = 'rgba(255, 0, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, scale * 1.2, scale * 1.2, time * 0.2, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = 'rgba(59, 0, 255, 0.1)';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, scale * 1.4, scale * 1.4, -time * 0.15, 0, Math.PI * 2);
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
  }, [initParticles]);

  const handleMouseMove = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = (e.clientX - rect.left) / rect.width;
    mouseRef.current.y = (e.clientY - rect.top) / rect.height;
  };

  const handleTouchMove = (e) => {
    if (!e.touches[0] || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current.x = (e.touches[0].clientX - rect.left) / rect.width;
    mouseRef.current.y = (e.touches[0].clientY - rect.top) / rect.height;
  };

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{ background: 'transparent' }}
    />
  );
};

export default InteractiveLogo;
