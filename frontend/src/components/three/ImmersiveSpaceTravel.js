import React, { useRef, useEffect, useCallback } from 'react';

// Epic Immersive Space Travel - Pure Canvas/WebGL Implementation
const ImmersiveSpaceTravel = ({ speed = 1, className = '' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const starsRef = useRef([]);
  const speedLinesRef = useRef([]);
  const nebulaRef = useRef([]);
  const galaxyRef = useRef([]);

  const initScene = useCallback(() => {
    // Star layers with different depths
    const stars = [];
    const layers = [
      { count: 500, speed: 0.3, size: 1, depth: 1 },
      { count: 400, speed: 0.5, size: 1.5, depth: 2 },
      { count: 300, speed: 0.7, size: 2, depth: 3 },
      { count: 200, speed: 1, size: 2.5, depth: 4 },
      { count: 100, speed: 1.5, size: 3, depth: 5 }
    ];
    
    layers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.05 + Math.random() * 0.95;
        stars.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          z: Math.random(),
          speed: layer.speed * (0.5 + Math.random() * 0.5),
          size: layer.size * (0.5 + Math.random() * 0.5),
          brightness: 0.3 + Math.random() * 0.7,
          color: Math.random() > 0.9 ? 
            `hsl(${280 + Math.random() * 60}, 100%, 70%)` : 
            `hsl(0, 0%, ${70 + Math.random() * 30}%)`
        });
      }
    });
    
    // Speed lines
    const speedLines = [];
    for (let i = 0; i < 100; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.1 + Math.random() * 0.7;
      speedLines.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: Math.random(),
        length: 0.02 + Math.random() * 0.05,
        speed: 0.5 + Math.random() * 0.5,
        color: Math.random() > 0.5 ? '#ff00ff' : '#3b00ff'
      });
    }
    
    // Nebula clouds
    const nebula = [];
    for (let i = 0; i < 15; i++) {
      nebula.push({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 1.5,
        z: Math.random(),
        size: 0.1 + Math.random() * 0.3,
        color: Math.random() > 0.5 ? 'rgba(255, 0, 255, 0.03)' : 'rgba(59, 0, 255, 0.03)',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.5
      });
    }
    
    // Spiral galaxy
    const galaxy = [];
    const arms = 3;
    const pointsPerArm = 150;
    for (let arm = 0; arm < arms; arm++) {
      for (let i = 0; i < pointsPerArm; i++) {
        const progress = i / pointsPerArm;
        const angle = arm * (Math.PI * 2 / arms) + progress * Math.PI * 2;
        const radius = progress * 0.3;
        const spread = 0.02 * progress;
        galaxy.push({
          x: Math.cos(angle) * radius + (Math.random() - 0.5) * spread,
          y: Math.sin(angle) * radius + (Math.random() - 0.5) * spread,
          z: 0.5,
          size: 1 + progress * 2,
          brightness: 0.5 + progress * 0.5
        });
      }
    }
    
    return { stars, speedLines, nebula, galaxy };
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
    
    const scene = initScene();
    starsRef.current = scene.stars;
    speedLinesRef.current = scene.speedLines;
    nebulaRef.current = scene.nebula;
    galaxyRef.current = scene.galaxy;
    
    let time = 0;
    let galaxyZ = 0.5;
    
    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Clear with slight trail
      ctx.fillStyle = 'rgba(3, 0, 20, 0.2)';
      ctx.fillRect(0, 0, width, height);
      
      time += 0.016;
      const currentSpeed = speed;
      
      // Draw nebula clouds
      nebulaRef.current.forEach(n => {
        n.z += currentSpeed * 0.005;
        n.rotation += n.rotationSpeed * 0.01;
        
        if (n.z > 1) {
          n.z = 0;
          n.x = (Math.random() - 0.5) * 2;
          n.y = (Math.random() - 0.5) * 1.5;
        }
        
        const scale = 0.5 + n.z * 2;
        const screenX = centerX + n.x * width * scale;
        const screenY = centerY + n.y * height * scale;
        const size = n.size * Math.min(width, height) * scale;
        
        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(n.rotation);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        gradient.addColorStop(0, n.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(-size, -size, size * 2, size * 2);
        
        ctx.restore();
      });
      
      // Draw spiral galaxy
      galaxyZ += currentSpeed * 0.003;
      if (galaxyZ > 1.5) galaxyZ = -0.5;
      
      const galaxyScale = 0.5 + Math.max(0, galaxyZ) * 1.5;
      const galaxyOpacity = Math.max(0, Math.min(1, 1 - Math.abs(galaxyZ - 0.5)));
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.1);
      
      galaxyRef.current.forEach(g => {
        const screenX = g.x * width * 0.5 * galaxyScale;
        const screenY = g.y * height * 0.5 * galaxyScale;
        
        ctx.beginPath();
        ctx.arc(screenX, screenY, g.size * galaxyScale, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(280, 100%, 70%, ${g.brightness * galaxyOpacity * 0.5})`;
        ctx.fill();
      });
      
      ctx.restore();
      
      // Draw stars (depth-sorted)
      starsRef.current.forEach(star => {
        star.z += currentSpeed * star.speed * 0.008;
        
        if (star.z > 1) {
          star.z = 0;
          const angle = Math.random() * Math.PI * 2;
          const radius = 0.05 + Math.random() * 0.95;
          star.x = Math.cos(angle) * radius;
          star.y = Math.sin(angle) * radius;
        }
        
        // Perspective projection
        const scale = 0.5 + star.z * 3;
        const screenX = centerX + star.x * width * scale;
        const screenY = centerY + star.y * height * scale;
        const size = star.size * (0.5 + star.z * 2);
        const opacity = Math.min(1, star.z * 2) * star.brightness;
        
        // Star core
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = star.color.includes('hsl') ? 
          star.color.replace(')', `, ${opacity})`).replace('hsl', 'hsla') :
          `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
        
        // Glow for bright stars
        if (star.z > 0.7 && star.brightness > 0.7) {
          const glowGradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 4);
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.3})`);
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.fillRect(screenX - size * 4, screenY - size * 4, size * 8, size * 8);
        }
      });
      
      // Draw speed lines
      speedLinesRef.current.forEach(line => {
        line.z += currentSpeed * line.speed * 0.012;
        
        if (line.z > 1) {
          line.z = 0;
          const angle = Math.random() * Math.PI * 2;
          const radius = 0.1 + Math.random() * 0.7;
          line.x = Math.cos(angle) * radius;
          line.y = Math.sin(angle) * radius;
        }
        
        const scale = 0.5 + line.z * 3;
        const screenX = centerX + line.x * width * scale;
        const screenY = centerY + line.y * height * scale;
        
        const lineLength = line.length * width * scale * currentSpeed;
        const angle = Math.atan2(line.y, line.x);
        
        const endX = screenX - Math.cos(angle) * lineLength;
        const endY = screenY - Math.sin(angle) * lineLength;
        
        const opacity = Math.min(1, line.z * 2) * 0.6;
        
        const gradient = ctx.createLinearGradient(screenX, screenY, endX, endY);
        gradient.addColorStop(0, line.color.replace(')', `, ${opacity})`).replace('#', 'rgba(').replace('ff00ff', '255, 0, 255').replace('3b00ff', '59, 0, 255'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.moveTo(screenX, screenY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + line.z * 2;
        ctx.stroke();
      });
      
      // Central vortex rings
      for (let i = 0; i < 5; i++) {
        const ringRadius = (50 + i * 40) * (1 + Math.sin(time * 2 + i) * 0.1);
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = i % 2 === 0 ? 
          `rgba(255, 0, 255, ${0.1 - i * 0.015})` : 
          `rgba(59, 0, 255, ${0.1 - i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, initScene]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ background: '#030014' }}
    />
  );
};

export default ImmersiveSpaceTravel;
