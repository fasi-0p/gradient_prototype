import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, Github, Linkedin, Cpu, PenTool, Truck, Megaphone, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';

/* ---------------- DATA ---------------- */

const teamData = [
  {
    title: "Club Coordinators",
    sector: "SECTOR 01",
    icon: Users,
    color: "#d946ef",
    members: [
      { name: "S Sanjana", role: "", image: "https://gradient-content-server.vercel.app/content/core26/Sanjana.JPG", github: "https://github.com/SSanjana-17", linkedin: "https://www.linkedin.com/in/s-sanjana-816788292" },
      { name: "Divyam Jain", role: "OPERATIONS LEAD", image: "https://gradient-content-server.vercel.app/content/core26/Divyam.JPG", linkedin: "https://www.linkedin.com/in/divyamjainn" },
    ],
  },
  {
    title: "Technical Heads",
    sector: "SECTOR 02",
    icon: Cpu,
    color: "#06b6d4",
    members: [
      { name: "Rahul", role: "ARCHITECT", image: "https://gradient-content-server.vercel.app/content/core26/Rahul.JPG", github: "https://github.com/RahulH007", linkedin: "https://www.linkedin.com/in/rahulhongekar" },
      { name: "Fasi Owaiz Ahmed", role: "FULL STACK", image: "https://gradient-content-server.vercel.app/content/core26/Fasi.JPG", github: "https://github.com/fasi-0p", linkedin: "https://linkedin.com/in/fasii" },
    ],
  },
  {
    title: "Logistics Heads",
    sector: "SECTOR 03",
    icon: Truck,
    color: "#f97316",
    members: [
      { name: "Channabasavanna", role: "RESOURCE MANAGER", image: "https://gradient-content-server.vercel.app/content/core26/Channabasavanna.JPG", linkedin: "https://www.linkedin.com/in/channabasavanna-mb-923aa92b7/" },
      { name: "Saachi", role: "DEPLOYMENT", image: "https://gradient-content-server.vercel.app/content/core26/Saachi.JPG" },
      { name: "Sneha", role: "INVENTORY", image: "https://gradient-content-server.vercel.app/content/core26/Sneha.JPG" },
    ],
  },
  {
    title: "Multimedia Heads",
    sector: "SECTOR 04",
    icon: PenTool,
    color: "#8b5cf6",
    members: [
      { name: "Shriyans", role: "VISUAL DIRECTOR", image: "https://gradient-content-server.vercel.app/content/core26/Shriyans.JPG", github: "https://github.com/MrPhantom2325", linkedin: "https://www.linkedin.com/in/shriyans-nayak-a38a02325" },
      { name: "Smaya", role: "UI/UX DESIGNER", image: "https://gradient-content-server.vercel.app/content/core26/Smaya.JPG", github: "https://github.com/smayamaben-01", linkedin: "https://www.linkedin.com/in/smaya-maben-a99580360" },
      { name: "Pooja", role: "MOTION ARTIST", image: "https://gradient-content-server.vercel.app/content/core26/Pooja.JPG", github: "https://github.com/pooja0606", linkedin: "https://www.linkedin.com/in/pooja-b-l-1312a1348" },
    ],
  },
  {
    title: "Sponsorship & Marketing",
    sector: "SECTOR 05",
    icon: Megaphone,
    color: "#eab308",
    members: [
      { name: "Krish", role: "BRAND LEAD", image: "https://gradient-content-server.vercel.app/content/core26/Krish.JPG", github: "https://github.com/Krishparmar10", linkedin: "https://www.linkedin.com/in/krish-n-jain-992066311" },
      { name: "Suniksha", role: "OUTREACH", image: "https://gradient-content-server.vercel.app/content/core26/Suniskha.JPG" },
    ],
  },
];

/* ---------------- GLITCH TEXT ---------------- */

const GlitchText = ({ text, isHovered }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";
  useEffect(() => {
    let interval = null;
    let iteration = 0;
    if (isHovered) {
      interval = setInterval(() => {
        setDisplayText(text.split("").map((l, i) => i < iteration ? text[i] : letters[Math.floor(Math.random() * letters.length)]).join(""));
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    } else {
      setDisplayText(text);
    }
    return () => clearInterval(interval);
  }, [isHovered, text]);
  return <span className="font-mono">{displayText}</span>;
};

/* ---------------- TILT CARD ---------------- */

const TiltCard = ({ member, color, index, setHoveredCard, hoveredCard }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  const imageX = useTransform(mouseX, [-0.5, 0.5], ["-10px", "10px"]);
  const imageY = useTransform(mouseY, [-0.5, 0.5], ["-10px", "10px"]);
  
  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) / r.width);
    y.set((e.clientY - r.top - r.height / 2) / r.height);
  };
  
  const isDimmed = hoveredCard !== null && hoveredCard !== member.name;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); setHoveredCard(member.name); }}
      onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); setHoveredCard(null); }}
      className={`relative h-[380px] w-full cursor-pointer transition-all duration-500 ${isDimmed ? "blur-[2px] opacity-40 scale-95" : "opacity-100 scale-100"}`}
    >
      <div className="absolute inset-0 rounded-2xl bg-[#0a0a12] border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-300 group hover:border-opacity-100"
        style={{ borderColor: isDimmed ? "rgba(255,255,255,0.1)" : `${color}50` }}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), ${color}15, transparent 40%)` }} />
        <motion.div className="absolute top-0 left-0 w-full h-[65%] overflow-hidden rounded-t-2xl border-b border-white/5"
          style={{ x: imageX, y: imageY, translateZ: "20px" }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12] via-transparent to-transparent z-10 opacity-70" />
          <img src={member.image} alt={member.name}
            className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110 ${isDimmed ? "grayscale brightness-75 saturate-0" : "grayscale-0 brightness-100"}`} />
        </motion.div>
        <motion.div className="absolute bottom-0 left-0 w-full h-[35%] p-6 flex flex-col justify-between bg-gradient-to-t from-[#0a0a12] to-[#0a0a12]/90"
          style={{ translateZ: "40px" }}>
          <h3 className="text-xl font-bold text-white mb-1 transition-all duration-300">
            <GlitchText text={member.name} isHovered={isHovered} />
          </h3>
          <div className="flex gap-4">
            {member.github && <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white hover:scale-110 transition-all"><Github size={18} /></a>}
            {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white hover:scale-110 transition-all"><Linkedin size={18} /></a>}
          </div>
        </motion.div>
        <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `linear-gradient(to bottom left, ${color}40, transparent 50%)` }} />
      </div>
    </motion.div>
  );
};

/* ---------------- DOMAIN SECTION ---------------- */

const DomainSection = ({ section, index, hoveredCard, setHoveredCard, onIconMount }) => {
  const isEven = index % 2 === 1;
  const Icon = section.icon;

  const iconRefCallback = useCallback((node) => {
    if (node) onIconMount(index, node);
  }, [index, onIconMount]);

  return (
    <section className={`py-16 flex flex-col md:flex-row gap-12 items-start ${isEven ? "md:flex-row-reverse" : ""}`}>
      <div className={`flex flex-col gap-4 flex-shrink-0 md:w-1/3 md:sticky md:top-32 ${isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
        <div className="relative">
          <div
            ref={iconRefCallback}
            className="w-16 h-16 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            style={{ boxShadow: `0 0 20px ${section.color}20`, borderColor: `${section.color}40` }}
          >
            <Icon size={56} style={{ color: section.color }} />
          </div>
          <div className={`absolute top-full h-24 w-[1px] bg-gradient-to-b from-white/20 to-transparent hidden md:block ${isEven ? "right-8" : "left-8"}`} />
        </div>
        <div>
          <h3 className="text-6xl font-black uppercase tracking-tighter text-white leading-none mb-2">
            {section.title.split(" ")[0]} <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${section.color}, white)` }}>
              {section.title.split(" ").slice(1).join(" ")}
            </span>
          </h3>
          <p className="text-white/40 font-mono text-xs tracking-widest uppercase">{section.sector}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow w-full">
        {section.members.map((member, i) => (
          <TiltCard key={member.name} member={member} color={section.color} index={i}
            hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
        ))}
      </div>
    </section>
  );
};

/* ---------------- MAIN PAGE ---------------- */

const TeamPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const iconNodes = useRef(new Array(teamData.length).fill(null));

  const onIconMount = useCallback((index, node) => {
    iconNodes.current[index] = node;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = teamData.map(s => s.color);

    const hexToRgba = (hex, a) => {
      const h = parseInt(hex.replace("#",""), 16);
      return `rgba(${(h>>16)&255},${(h>>8)&255},${h&255},${a})`;
    };

    const lerpColor = (a, b, t) => {
      const pa = parseInt(a.replace("#",""),16), pb = parseInt(b.replace("#",""),16);
      const ar=(pa>>16)&255,ag=(pa>>8)&255,ab=pa&255;
      const br=(pb>>16)&255,bg=(pb>>8)&255,bb=pb&255;
      return `rgb(${Math.round(ar+(br-ar)*t)},${Math.round(ag+(bg-ag)*t)},${Math.round(ab+(bb-ab)*t)})`;
    };

    const draw = () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = iconNodes.current
        .map(node => {
          if (!node) return null;
          const r = node.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        })
        .filter(Boolean);

      if (pts.length < 2) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // 1. Precise Scroll Mapping (Forces completion at end of page)
      const winH = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      
      const maxScroll = Math.max(1, docH - winH);
      const scrollRatio = Math.max(0, Math.min(1, scrollY / maxScroll));

      // 2. Dynamic Draw Head Target
      // Target slides seamlessly from 50% to 95% of screen height as you scroll
      const drawHeadY = winH * (0.5 + 0.45 * scrollRatio);
      
      const startY = pts[0].y;
      const endY = pts[pts.length-1].y;

      // Ensure clip rect respects DOM bounds
      const clipY = Math.max(startY, Math.min(endY, drawHeadY));

      // 3. Draw Ghost Path
      ctx.save();
      ctx.setLineDash([5, 14]);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255,255,255,0.09)";
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i-1], c = pts[i], my = (p.y + c.y) / 2;
        ctx.bezierCurveTo(p.x, my, c.x, my, c.x, c.y);
      }
      ctx.stroke();
      ctx.restore();

      // Don't render dot/active path if user hasn't hit first trigger yet
      if (clipY <= startY + 5) { 
        rafRef.current = requestAnimationFrame(draw); 
        return; 
      }

      // 4. Clip active animated paths
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, canvas.width, clipY + 20); // +20 padding accounts for glow radius
      ctx.clip();

      ctx.setLineDash([]);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < pts.length; i++) {
        const p = pts[i-1], c = pts[i], my = (p.y + c.y) / 2;

        ctx.lineWidth = 12;
        ctx.strokeStyle = hexToRgba(COLORS[i-1], 0.1);
        ctx.shadowColor = COLORS[i-1];
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.bezierCurveTo(p.x, my, c.x, my, c.x, c.y);
        ctx.stroke();

        const grad = ctx.createLinearGradient(p.x, p.y, c.x, c.y);
        grad.addColorStop(0, COLORS[i-1]);
        grad.addColorStop(1, COLORS[i]);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = grad;
        ctx.shadowColor = COLORS[i-1];
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.bezierCurveTo(p.x, my, c.x, my, c.x, c.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      ctx.restore();

      // 5. Calculate precise dot position using Bezier Binary Search
      let si = 0;
      for (let i = 0; i < pts.length - 1; i++) {
        if (clipY >= pts[i].y && clipY <= pts[i+1].y) {
          si = i;
          break;
        }
      }
      if (clipY >= endY) si = pts.length - 2;

      const p = pts[si];
      const n = pts[si+1];
      const my = (p.y + n.y) / 2;

      // Inverse calculate 't' on the bezier curve purely based on current visible Y limit
      let t = 0.5, minT = 0, maxT = 1;
      for (let step = 0; step < 10; step++) {
        const mt = 1 - t;
        const evalY = mt*mt*mt*p.y + 3*mt*mt*t*my + 3*mt*t*t*my + t*t*t*n.y;
        if (evalY < clipY) minT = t;
        else maxT = t;
        t = (minT + maxT) / 2;
      }

      const mt = 1 - t;
      const dx = mt*mt*mt*p.x + 3*mt*mt*t*p.x + 3*mt*t*t*n.x + t*t*t*n.x;
      const dy = clipY; // The dot stays impeccably locked to the clip boundary
      const dc = lerpColor(COLORS[si], COLORS[Math.min(si+1, COLORS.length-1)], t);

      ctx.beginPath(); ctx.arc(dx, dy, 13, 0, Math.PI*2);
      ctx.strokeStyle = dc.replace("rgb(","rgba(").replace(")",",0.2)");
      ctx.lineWidth = 1; ctx.stroke();

      ctx.beginPath(); ctx.arc(dx, dy, 7, 0, Math.PI*2);
      ctx.strokeStyle = dc.replace("rgb(","rgba(").replace(")",",0.6)");
      ctx.lineWidth = 1.5; ctx.stroke();

      ctx.beginPath(); ctx.arc(dx, dy, 4, 0, Math.PI*2);
      ctx.fillStyle = dc;
      ctx.shadowColor = dc; ctx.shadowBlur = 16;
      ctx.fill(); ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 9999 }}
      />

      <PageTransition>
        <main className="min-h-screen bg-[#05001a] text-white font-sans selection:bg-white/20 relative">
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-20 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase">Return to Base</span>
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-white/10 pb-8">
              <div>
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-2">THE CORE26</h1>
              </div>
              <div className="hidden md:block text-right pb-2">
                <div className="flex items-center gap-2 text-white/60 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-24">
              {teamData.map((section, index) => (
                <DomainSection
                  key={section.title}
                  section={section}
                  index={index}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                  onIconMount={onIconMount}
                />
              ))}
            </div>

            <div className="mt-32 pt-8 border-t border-white/10 flex justify-between text-white/20 font-mono text-xs">
              <span>GRADIENT AI/ML</span>
              <span>SECURE CONNECTION</span>
            </div>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default TeamPage;