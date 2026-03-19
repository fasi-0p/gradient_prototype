import React, { useEffect, useRef } from "react";

const NeuralNetworkBackground = ({ opacity = 0.5 }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    // const particleCount = window.innerWidth < 768 ? 40 : 80;
    const baseDensity = window.innerWidth * window.innerHeight;

    const particleCount =
      baseDensity < 500000 ? 60 : 
      baseDensity < 1000000 ? 100 : 
      160;
    const connectionDistance = 150;
    const mouseConnectionDistance = 120;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
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

      // smooth cursor interaction
      smoothMouse.x += (mouseX - smoothMouse.x) * 0.05;
      smoothMouse.y += (mouseY - smoothMouse.y) * 0.05;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.update();
        p.draw();

        // particle-to-particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const opacity = 1 - dist / connectionDistance;

            ctx.strokeStyle = `rgba(217,70,239,${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // particle-to-mouse connection
        const mdx = p.x - smoothMouse.x;
        const mdy = p.y - smoothMouse.y;
        const mouseDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mouseDist < mouseConnectionDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(smoothMouse.x, smoothMouse.y);

          const opacity = 1 - mouseDist / mouseConnectionDistance;

          ctx.strokeStyle = `rgba(6,182,212,${opacity * 0.45})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        opacity: opacity
      }}
    />
  );
};

export default NeuralNetworkBackground;