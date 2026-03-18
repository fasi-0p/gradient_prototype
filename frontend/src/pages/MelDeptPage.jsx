import { useEffect, useRef } from "react";
import PageTransition from "../components/ui/PageTransition";
import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  Trophy, 
  BrainCircuit, 
  ScanEye, 
  MessageSquareCode,
  Instagram,
  Linkedin,
  Github,
  Mail,
  MapPin
} from "lucide-react";

// inline styles obv
const S = {
  page: { background:"#030014", color:"#fff", fontFamily:'"DM Sans",sans-serif', overflowX:"hidden", width:"100%", minHeight:"100vh", position:"relative" },
  canvas: { position:"fixed", inset:0, zIndex:0, pointerEvents:"none" },
  grid: { position:"fixed", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize:"60px 60px" },
  cursorGlow: { position:"fixed", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,0,255,0.06) 0%,transparent 70%)", pointerEvents:"none", zIndex:0, transform:"translate(-50%,-50%)", transition:"left 0.3s ease,top 0.3s ease" },
  z1: { position:"relative", zIndex:1 },

  // hero
  hero: { minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"120px clamp(1.5rem,6vw,6rem) 80px", position:"relative", overflow:"hidden" },
  orb: (s) => ({ position:"absolute", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none", ...s }),
  badge: { display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.4rem 1rem", border:"1px solid rgba(0,240,255,0.3)", borderRadius:100, background:"rgba(0,240,255,0.05)", fontSize:"0.75rem", letterSpacing:"0.12em", textTransform:"uppercase", color:"#00f0ff", marginBottom:"2rem" },
  badgeDot: { width:6, height:6, borderRadius:"50%", background:"#00f0ff", boxShadow:"0 0 8px #00f0ff" },
  heroTitle: { fontFamily:'"Syne",sans-serif', fontSize:"clamp(2.8rem,7vw,6rem)", fontWeight:700, lineHeight:1, letterSpacing:"-0.03em", marginBottom:"1.5rem" },
  heroSub: { maxWidth:620, color:"rgba(255,255,255,0.55)", fontSize:"clamp(1rem,2vw,1.2rem)", fontWeight:300, margin:"0 auto 2.5rem" },
  heroButtons: { display:"flex", flexWrap:"wrap", gap:"1rem", justifyContent:"center" },
  heroScroll: { position:"absolute", bottom:"2rem", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem", color:"rgba(255,255,255,0.3)", fontSize:"0.7rem", letterSpacing:"0.15em", textTransform:"uppercase" },
  scrollLine: { width:1, height:50, background:"linear-gradient(to bottom,rgba(0,240,255,0.6),transparent)" },
  btnPrimary: { display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.85rem 2rem", background:"linear-gradient(135deg,#ff00ff,#3b00ff)", color:"#fff", borderRadius:8, fontWeight:600, fontSize:"0.95rem", textDecoration:"none", boxShadow:"0 0 30px rgba(255,0,255,0.3)", transition:"transform 0.25s,box-shadow 0.25s" },
  btnSecondary: { display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.85rem 2rem", background:"transparent", color:"#fff", borderRadius:8, fontWeight:500, fontSize:"0.95rem", textDecoration:"none", border:"1px solid rgba(255,255,255,0.08)", transition:"border-color 0.25s,background 0.25s,transform 0.25s" },

  // section
  section: (extra) => ({ padding:"clamp(5rem,10vh,8rem) clamp(1.5rem,6vw,6rem)", position:"relative", zIndex:1, ...extra }),
  sectionLabel: { display:"inline-flex", alignItems:"center", gap:"0.75rem", fontSize:"1rem", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"#00f0ff", marginBottom:"1rem" },
  sectionTitle: { fontFamily:'"Syne",sans-serif', fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700, letterSpacing:"-0.01em", lineHeight:1.3, marginBottom:"1rem" },
  sectionSub: { color:"rgba(255,255,255,0.5)", fontSize:"1rem", maxWidth:500, fontWeight:300 },
  sectionHeader: (extra) => ({ marginBottom:"4rem", ...extra }),
  gradText: { background:"linear-gradient(135deg,#ff00ff,#00f0ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" },
  divider: { height:1, background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)", margin:"0 clamp(1.5rem,6vw,6rem)", position:"relative", zIndex:1 },

  // glass
  glass: (extra) => ({ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)", position:"relative", overflow:"hidden", transition:"border-color 0.3s,transform 0.3s,box-shadow 0.3s", ...extra }),

  // stats
  statsGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"1.5rem" },
  statCard: { padding:"2rem 1.5rem", textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center" },
  statNum: (g) => ({ fontFamily:'"Syne",sans-serif', fontSize:"2.8rem", fontWeight:800, letterSpacing:"-0.04em", lineHeight:1, marginBottom:"0.4rem", background:g, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }),
  statLabel: { fontSize:"0.85rem", color:"rgba(255,255,255,0.45)", letterSpacing:"0.05em" },

  // achievement
  achievementCard: { maxWidth:900, margin:"0 auto", padding:"3rem 3.5rem", textAlign:"center", borderRadius:24, background:"rgba(255,0,255,0.04)", border:"1px solid rgba(255,0,255,0.2)", position:"relative", overflow:"hidden" },
  trophyIcon: { width:800, height:400, objectFit:"cover", borderRadius:20, display:"block", margin:"0 auto 1.75rem auto", border:"1px solid rgba(255,255,255,0.12)", boxShadow:"0 0 40px rgba(255,0,255,0.15),0 8px 32px rgba(0,0,0,0.4)", maxWidth:"100%" },
  achieveLabel: { display:"inline-block", padding:"0.3rem 1rem", background:"linear-gradient(135deg,rgba(255,0,255,0.2),rgba(59,0,255,0.2))", border:"1px solid rgba(255,0,255,0.3)", borderRadius:100, fontSize:"0.75rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"#ff00ff", marginBottom:"1.5rem" },
  achieveTitle: { fontFamily:'"Syne",sans-serif', fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:700, marginBottom:"0.5rem", background:"linear-gradient(135deg,#ffd700,#ff8c00,#ff00ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" },
  achieveSub: { fontSize:"1.1rem", color:"rgba(255,255,255,0.6)", marginBottom:"1.5rem", fontWeight:300 },
  achieveDesc: { fontSize:"0.95rem", color:"rgba(255,255,255,0.5)", maxWidth:600, margin:"0 auto 2rem", lineHeight:1.7 },
  achieveTags: { display:"flex", flexWrap:"wrap", gap:"0.75rem", justifyContent:"center", marginTop:"2rem" },
  tag: (hi) => hi
    ? { padding:"0.35rem 0.9rem", borderRadius:100, fontSize:"0.78rem", fontWeight:500, border:"1px solid rgba(0,240,255,0.3)", color:"#00f0ff", background:"rgba(0,240,255,0.05)" }
    : { padding:"0.35rem 0.9rem", borderRadius:100, fontSize:"0.78rem", fontWeight:500, border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.7)", background:"rgba(255,255,255,0.04)" },

  // grids
  researchGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.5rem" },
  facilitiesGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"1.5rem" },
  facilityImg: { width:"100%", height:220, objectFit:"cover", display:"block", borderRadius:"16px 16px 0 0" },

  // infra
  infraLayout: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", alignItems:"start" },
  infraPanel: { padding:"2.5rem" },
  hwItem: (last) => ({ display:"flex", gap:"1rem", marginBottom: last?"0":"1.5rem", paddingBottom: last?"0":"1.5rem", borderBottom: last?"none":"1px solid rgba(255,255,255,0.04)" }),
  hwDot: (c) => ({ width:10, height:10, borderRadius:"50%", marginTop:6, flexShrink:0, background:c, boxShadow:`0 0 8px ${c}` }),
  hwName: { fontWeight:600, fontSize:"0.95rem", marginBottom:"0.25rem" },
  hwSpec: { fontSize:"0.8rem", color:"rgba(255,255,255,0.4)", lineHeight:1.6 },

  // team
  teamLayout: { display:"grid", gap:"3rem" },
  groupTitle: { fontFamily:'"Syne",sans-serif', fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.35)", marginBottom:"1.5rem" },
  facultyGrid: { display:"flex", flexWrap:"wrap", gap:"1rem" },
  facultyCard: { padding:"1.25rem 1.75rem", borderRadius:12, display:"flex", alignItems:"center", gap:"1rem" },
  avatar: (g) => ({ width:44, height:44, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:'"Syne",sans-serif', fontWeight:700, fontSize:"1.1rem", flexShrink:0, background:g, overflow: "hidden" }),
  facultyName: { fontWeight:600, fontSize:"0.95rem" },
  facultyRole: { fontSize:"0.78rem", color:"rgba(255,255,255,0.4)" },
  studentsGrid: { display:"flex", flexWrap:"wrap", gap:"0.75rem" },
  chip: { display:"inline-flex", alignItems:"center", gap:"0.6rem", padding:"0.5rem 1rem", border:"1px solid rgba(255,255,255,0.08)", borderRadius:100, fontSize:"0.85rem", color:"rgba(255,255,255,0.75)", background:"rgba(255,255,255,0.03)" },
  chipDot: (c="#ff00ff") => ({ width:5, height:5, borderRadius:"50%", background:c, boxShadow:`0 0 6px ${c}` }),

  // footer
  footer: { padding:"3rem clamp(1.5rem,6vw,6rem)", borderTop:"1px solid rgba(255,255,255,0.08)", background:"rgba(0,0,0,0.3)", position:"relative", zIndex:1 },
  footerMain: { display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.5fr", gap:"3rem", marginBottom:"3rem" },
  footerLogo: { fontFamily:'"Syne",sans-serif', fontWeight:800, fontSize:"1.3rem", background:"linear-gradient(135deg,#ff00ff,#00f0ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", display:"block", marginBottom:"0.75rem" },
  footerBottom: { borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:"2rem", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"1rem", fontSize:"0.8rem", color:"rgba(255,255,255,0.3)" },
};

/* ─────────────────────────────────────────
   INJECT FONTS + KEYFRAMES (once)
───────────────────────────────────────── */
function useStyles() {
  useEffect(() => {
    if (!document.getElementById("mel-fonts")) {
      const l = document.createElement("link");
      l.id = "mel-fonts"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap";
      document.head.appendChild(l);
    }
    if (!document.getElementById("mel-css")) {
      const s = document.createElement("style");
      s.id = "mel-css";
      s.textContent = `
        .mel-fade0{animation:mel-fu 0.8s 0.0s ease both}
        .mel-fade1{animation:mel-fu 0.8s 0.1s ease both}
        .mel-fade2{animation:mel-fu 0.8s 0.2s ease both}
        .mel-fade3{animation:mel-fu 0.8s 0.3s ease both}
        .mel-fade4{animation:mel-fu 0.8s 0.4s ease both}
        .mel-fade10{animation:mel-fu 1s 1.0s ease both}
        @keyframes mel-fu{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        .mel-orb1{animation:mel-drift 8s ease-in-out infinite alternate}
        .mel-orb2{animation:mel-drift 8s ease-in-out infinite alternate;animation-delay:-4s}
        .mel-orb3{animation:mel-drift 8s ease-in-out infinite alternate;animation-delay:-2s}
        @keyframes mel-drift{from{transform:translate(0,0) scale(1)}to{transform:translate(30px,20px) scale(1.05)}}
        .mel-line2{background:linear-gradient(135deg,#ff00ff 0%,#00f0ff 50%,#3b00ff 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:mel-gshift 4s linear infinite,mel-fu 0.8s 0.2s ease both}
        @keyframes mel-gshift{0%{background-position:0% center}100%{background-position:200% center}}
        .mel-bdot{animation:mel-pulse 2s ease-in-out infinite}
        @keyframes mel-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
        .mel-sline{animation:mel-sl 2s ease-in-out infinite}
        @keyframes mel-sl{0%,100%{opacity:.3}50%{opacity:1}}
        .mel-reveal{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}
        .mel-reveal.mel-vis{opacity:1;transform:none}
        .mel-glass:hover{border-color:rgba(0,240,255,0.25)!important;transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,.5),0 0 40px rgba(0,240,255,.08)}
        .mel-infra-h{font-family:"Syne",sans-serif;font-weight:600;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,0.08);color:#00f0ff;letter-spacing:.05em;text-transform:uppercase;font-size:.8rem}
        @media(max-width:900px){.mel-infra-grid{grid-template-columns:1fr!important}.mel-footer-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:700px){.mel-footer-grid{grid-template-columns:1fr!important;gap:2rem!important}.mel-trophy{width:100%!important;height:auto!important}.mel-achieve-card{padding:2rem 1.5rem!important}.mel-infra-panel{padding:1.5rem!important}}
      `;
      document.head.appendChild(s);
    }
  }, []);
}

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useScrollToTop() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
}

function useParticleCanvas(ref) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], animId;
    const COLORS = ["rgba(255,0,255,","rgba(0,240,255,","rgba(59,0,255,","rgba(150,0,255,"];
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const mk = () => ({ x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, r:Math.random()*1.5+.3, a:Math.random()*.6+.1, color:COLORS[Math.floor(Math.random()*COLORS.length)], life:0, maxLife:Math.random()*300+200 });
    for (let i=0;i<120;i++) particles.push(mk());
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      particles.forEach((p,i) => {
        p.x+=p.vx; p.y+=p.vy; p.life++;
        if (p.life>p.maxLife||p.x<0||p.x>W||p.y<0||p.y>H) { particles[i]=mk(); return; }
        const fade=Math.sin((p.life/p.maxLife)*Math.PI);
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color+p.a*fade+")"; ctx.fill();
      });
      animId=requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [ref]);
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".mel-reveal");
    const io = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("mel-vis"); }), { threshold:0.12 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function useCounters() {
  useEffect(() => {
    const els = document.querySelectorAll(".mel-stat-num[data-target]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el=e.target, target=parseInt(el.getAttribute("data-target"));
        let t0=0;
        const step=ts => { if(!t0)t0=ts; const p=Math.min((ts-t0)/1800,1),ease=1-Math.pow(1-p,3); el.textContent=Math.floor(ease*target)+"+"; if(p<1)requestAnimationFrame(step); else el.textContent=target+"+"; };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold:0.5 });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);
}

function useCursorGlow() {
  useEffect(() => {
    const el = document.getElementById("mel-cursor");
    const h = e => { if(el){el.style.left=e.clientX+"px";el.style.top=e.clientY+"px";} };
    document.addEventListener("mousemove", h);
    return () => document.removeEventListener("mousemove", h);
  }, []);
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function MelDeptPage() {
  const canvasRef = useRef(null);
  useStyles();
  useScrollToTop();
  useParticleCanvas(canvasRef);
  useScrollReveal();
  useCounters();
  useCursorGlow();

  // Safely passing solid colors to lucide-react to guarantee rendering
  const stats = [
    { icon: <BookOpen size={36} color="#ff00ff" />,    target:10,  label:"Research Papers",      g:"linear-gradient(135deg,#ff00ff,#00f0ff)", d:"0s" },
    { icon: <Users size={36} color="#00f0ff" />,       target:25,  label:"Faculty Members",      g:"linear-gradient(135deg,#00f0ff,#3b00ff)", d:"0.1s" },
    { icon: <GraduationCap size={36} color="#ffd700" />, target:200, label:"Students Placed",    g:"linear-gradient(135deg,#ffd700,#ff00ff)", d:"0.2s" },
    { icon: <Trophy size={36} color="#3b00ff" />,      target:100, label:"Student Achievements", g:"linear-gradient(135deg,#3b00ff,#ff00ff)", d:"0.3s" },
  ];

  const hw = [
    { c:"#ff00ff", name:"Nvidia DGX A100 Server",      spec:"320GB GPU memory, 2 AMD 128-core CPUs, 1TB RAM, 600 GB/s NVSwitch." },
    { c:"#00f0ff", name:"HP Elite 800 G9",             spec:"Windows 11 Pro, Intel Core i7-12700, 32GB memory." },
    { c:"#a78bff", name:"HP Elite 600 G9",             spec:"Intel Core i7-10700 @ 2.90GHz, 16GB RAM." },
    { c:"#ffd700", name:"HP ProDesk 400 G7",           spec:"Intel Core i7-10700 @ 2.90GHz, 16GB RAM." },
    { c:"#ff00ff", name:"Lenovo P520 Workstation",     spec:"Xeon W-2295 18-Core, 128GB RAM, Nvidia RTX A5000." },
    { c:"#00f0ff", name:'Sense Interactive Panel 86"', spec:"Intel i5-8500 @ 3.00GHz, 8GB DDR4 RAM." },
  ];

  const services = ["Access to cutting-edge AI technology and infrastructure","Project-based collaboration and industry support","AI model development and deployment services","Performance optimization and scalability consulting","Large-scale data processing and analysis","Research mentorship and publication support"];
  
  // NOTE: Double backslashes used below so JS treats them as standard backslashes in the string.
  const faculty  = [
    { i:"M", g:"linear-gradient(135deg,#ff00ff,#3b00ff)", name:"Dr. Monika Puttaramaiah", img:"https://gradient-content-server.vercel.app/content/faculties/Dr.Monika.png"},
    { i:"S", g:"linear-gradient(135deg,#00f0ff,#3b00ff)", name:"Prof. Soniya L", img:"https://gradient-content-server.vercel.app/content/faculties/Prof.Soniya.png"}
  ];
  
  const students = ["Pranav Veeraghanta","Likith Chowdary","Rishi","S Sanjana","Sri Sowmi","Vikhyat","Abhinav"];
  const gradTeam = [{ name:"Pranav Veeraghanta · Tech Head", c:"#00f0ff" },{ name:"Vinay Yele · Design Head", c:"#00f0ff" }];

  return (
    <PageTransition variant="slideUp">
      <div style={S.page}>
        <canvas ref={canvasRef} style={S.canvas} />
        <div style={S.grid} />
        <div id="mel-cursor" style={S.cursorGlow} />

        {/* ── HERO ── */}
        <section style={S.hero}>
          <div className="mel-orb1" style={S.orb({ width:600,height:600,background:"radial-gradient(circle,rgba(255,0,255,0.18) 0%,transparent 70%)",top:-200,left:-200 })} />
          <div className="mel-orb2" style={S.orb({ width:500,height:500,background:"radial-gradient(circle,rgba(0,240,255,0.15) 0%,transparent 70%)",bottom:-150,right:-150 })} />
          <div className="mel-orb3" style={S.orb({ width:400,height:400,background:"radial-gradient(circle,rgba(59,0,255,0.2) 0%,transparent 70%)",top:"40%",left:"50%",transform:"translate(-50%,-50%)" })} />

          <div className="mel-fade0" style={S.badge}>
            <span className="mel-bdot" style={S.badgeDot} />
            BMSCE · Bengaluru · AI Research
          </div>

          <h1 className="mel-fade1" style={S.heroTitle}>
            <span style={{ color:"#fff" }}>Department of</span><br />
            <span className="mel-line2">Machine Learning</span>
          </h1>

          <p className="mel-fade2" style={S.heroSub}>
            Pioneering research and innovation in Artificial Intelligence and Machine Learning. Building the future, one model at a time.
          </p>

          <div className="mel-fade4" style={S.heroButtons}>
            <a href="#research"      style={S.btnPrimary}>  <span>Explore Research</span><span>→</span></a>
            <a href="#achievements" style={S.btnSecondary}>Our Achievements ↓</a>
          </div>

          <div className="mel-fade10" style={S.heroScroll}>
            <div className="mel-sline" style={S.scrollLine} />
            <span>Scroll</span>
          </div>
        </section>

        {/* ── STATS ── */}
        <section id="stats" style={S.section()}>
          <div style={S.statsGrid}>
            {stats.map(st => (
              <div key={st.label} className="mel-reveal mel-glass" style={{ ...S.glass(S.statCard), ...(st.d?{transitionDelay:st.d}:{}) }}>
                <div style={{ marginBottom:"1rem" }}>{st.icon}</div>
                <div className="mel-stat-num" data-target={st.target} style={S.statNum(st.g)}>0+</div>
                <div style={S.statLabel}>{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={S.divider} />

        {/* ── ACHIEVEMENT ── */}
        <section id="achievements" style={S.section({ background:"linear-gradient(180deg,#030014 0%,rgba(10,0,30,0.8) 50%,#030014 100%)" })}>
          <div style={S.sectionHeader({ textAlign:"center" })}>
            <div style={S.sectionLabel}>Recognition</div>
            <h2 style={S.sectionTitle}>PhaseShift 2025 Champions</h2>
          </div>
          <div className="mel-reveal mel-achieve-card" style={S.achievementCard}>
            <img src="https://gradient-content-server.vercel.app/content/department/phaseShiftChampions.webp" alt="PhaseShift 2025" className="mel-trophy" style={S.trophyIcon} />
            <div style={S.achieveLabel}>PhaseShift 2025</div>
            <h2 style={S.achieveTitle}>1st Place Winner</h2>
            <p style={S.achieveSub}>Project Stalls Category Champion</p>
            <p style={S.achieveDesc}>
              In a remarkable display of innovation, the Department of Machine Learning clinched first place at PhaseShift 2025.
              As one of the newest departments at BMSCE, we outperformed departments with years — even decades more experience —
              proving that innovation, dedication, and cutting-edge expertise trump legacy every time.
            </p>
            <p style={{ fontSize:"0.8rem",color:"rgba(254,254,254,0.375)",fontStyle:"italic",marginBottom:"1.5rem" }}>"This is just the beginning"</p>
            <div style={S.achieveTags}>
              {["Innovation Award","Project Stalls","BMSCE","1st Place","PhaseShift 2025"].map((t,i)=>(
                <span key={t} style={S.tag(i%2===0)}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop:"2.5rem",paddingTop:"2rem",borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize:"0.75rem",letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(254,254,254,0.375)",marginBottom:"1rem" }}>Faculty Coordinators</p>
              <div style={{ display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center" }}>
                
                {/* ── FACULTY AVATARS UPDATED HERE ── */}
                {faculty.map(f=>(
                  <div key={f.name} className="mel-glass" style={S.glass(S.facultyCard)}>
                    <div style={S.avatar(f.g)}>
                      {f.img ? (
                        <img 
                          src={f.img} 
                          alt={f.name} 
                          style={{ width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" }} 
                        />
                      ) : (
                        f.i 
                      )}
                    </div>
                    <div style={{ display:"flex",flexDirection:"column" }}>
                      <span style={S.facultyName}>{f.name}</span>
                      <span style={S.facultyRole}>Faculty Coordinator</span>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>

        <div style={S.divider} />

        {/* ── RESEARCH ── */}
        <section id="research" style={S.section()}>
          <div style={S.sectionHeader()}>
            <div style={S.sectionLabel}>Areas of Study</div>
            <h2 style={S.sectionTitle}>Research <span style={S.gradText}>Domains</span></h2>
            <p style={S.sectionSub}>Cutting-edge research across the most impactful fields in AI and ML.</p>
          </div>
          <div style={S.researchGrid}>
            {[
              { icon: <BrainCircuit size={32} color="#ff00ff" />,      title:"Machine Learning",      desc:"Building intelligent models that learn from data. Developing novel algorithms, deep neural networks, and scalable training frameworks for real-world impact.",                                            ibg:"rgba(255,0,255,0.12)",  ib:"rgba(255,0,255,0.25)",  ac:"#ff00ff" },
              { icon: <ScanEye size={32} color="#00f0ff" />,           title:"Computer Vision",       desc:"Teaching machines to see and interpret the visual world. From object detection to semantic understanding and beyond using state-of-the-art architectures.",                                            ibg:"rgba(0,240,255,0.12)",  ib:"rgba(0,240,255,0.25)",  ac:"#00f0ff", d:"0.15s" },
              { icon: <MessageSquareCode size={32} color="#a78bff" />, title:"Natural Language Processing", desc:"Enabling machines to understand, generate, and reason with human language. Specializing in LLMs, semantic parsing, and multilingual AI systems.",                                            ibg:"rgba(59,0,255,0.12)",   ib:"rgba(59,0,255,0.25)",   ac:"#a78bff", d:"0.3s" },
            ].map(r=>(
              <div key={r.title} className="mel-reveal mel-glass" style={{ ...S.glass({ padding:"2.5rem 2rem",borderRadius:16,cursor:"pointer" }), ...(r.d?{transitionDelay:r.d}:{}) }}>
                <div style={{ width:56,height:56,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.5rem",background:r.ibg,boxShadow:`inset 0 0 0 1px ${r.ib}` }}>{r.icon}</div>
                <h3 style={{ fontFamily:'"Syne",sans-serif',fontSize:"1.25rem",fontWeight:700,marginBottom:"0.75rem" }}>{r.title}</h3>
                <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.5)",lineHeight:1.7 }}>{r.desc}</p>
                <div style={{ marginTop:"1.5rem",fontSize:"0.8rem",fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",color:r.ac }}>Explore →</div>
              </div>
            ))}
          </div>
        </section>

        <div style={S.divider} />

        {/* ── FACILITIES ── */}
        <section id="facilities" style={S.section()}>
          <div style={S.sectionHeader()}>
            <div style={S.sectionLabel}>Campus</div>
            <h2 style={S.sectionTitle}>World-Class <span style={S.gradText}>Facilities</span></h2>
            <p style={S.sectionSub}>State-of-the-art infrastructure designed for the future of AI research.</p>
          </div>
          <div style={S.facilitiesGrid}>
            {[
              { src:"https://gradient-content-server.vercel.app/content/department/class.jpeg",  alt:"Classrooms",   title:"Classrooms",   desc:"State-of-the-art classrooms equipped with advanced technology, featuring interactive panels and modern AV systems." },
              { src:"https://gradient-content-server.vercel.app/content/department/lab.webp",  alt:"Computer Labs", title:"Computer Labs", desc:"High-performance computing clusters equipped with top-tier NVIDIA GPUs, enabling demanding AI and ML workloads at scale.", d:"0.15s" },
              { src:"https://gradient-content-server.vercel.app/content/department/semh.jpeg", alt:"Seminar Hall",  title:"Seminar Hall",  desc:"A spacious, professional seminar hall with modern seating, clear acoustics, and premium ambiance.", d:"0.3s" },
            ].map(f=>(
              <div key={f.title} className="mel-reveal mel-glass" style={{ ...S.glass({ borderRadius:16,overflow:"hidden",cursor:"pointer" }), ...(f.d?{transitionDelay:f.d}:{}) }}>
                <img src={f.src} alt={f.alt} style={S.facilityImg} />
                <div style={{ padding:"1.75rem" }}>
                  <h3 style={{ fontFamily:'"Syne",sans-serif',fontSize:"1.1rem",fontWeight:700,marginBottom:"0.5rem" }}>{f.title}</h3>
                  <p style={{ fontSize:"0.875rem",color:"rgba(255,255,255,0.5)",lineHeight:1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={S.divider} />

        {/* ── INFRASTRUCTURE ── */}
        <section id="infrastructure" style={S.section({ background:"rgba(10,0,30,0.4)" })}>
          <div style={S.sectionHeader()}>
            <div style={S.sectionLabel}>B.S. Narayan Center of Excellence</div>
            <h2 style={S.sectionTitle}>Research <span style={S.gradText}>Infrastructure</span></h2>
            <p style={S.sectionSub}>State-of-the-art facility fostering dynamic industry-academic synergy for AI adoption.</p>
          </div>
          <div className="mel-infra-grid" style={S.infraLayout}>
            <div className="mel-reveal mel-glass mel-infra-panel" style={{ ...S.glass(S.infraPanel) }}>
              <h3 className="mel-infra-h">Hardware Infrastructure</h3>
              {hw.map((h,i)=>(
                <div key={h.name} style={S.hwItem(i===hw.length-1)}>
                  <div style={S.hwDot(h.c)} />
                  <div><div style={S.hwName}>{h.name}</div><div style={S.hwSpec}>{h.spec}</div></div>
                </div>
              ))}
            </div>
            <div className="mel-reveal mel-glass mel-infra-panel" style={{ ...S.glass(S.infraPanel), transitionDelay:"0.2s" }}>
              <h3 className="mel-infra-h">Services Offered</h3>
              <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:"0.75rem" }}>
                {services.map(s=>(
                  <li key={s} style={{ display:"flex",alignItems:"flex-start",gap:"0.75rem",fontSize:"0.9rem",color:"rgba(255,255,255,0.7)",padding:"0.75rem",borderRadius:10,background:"rgba(255,255,255,0.02)" }}>
                    <span style={{ color:"#00f0ff",fontWeight:700,flexShrink:0 }}>→</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <div style={S.divider} />

        {/* ── TEAM ── */}
        <section id="team" style={S.section()}>
          <div style={S.sectionHeader()}>
            <h2 style={S.sectionTitle}>The <span style={S.gradText}>Minds</span> Behind Phase Shift</h2>
            <p style={S.sectionSub}>Faculty coordinators and student contributors who make it happen.</p>
          </div>
          <div style={S.teamLayout}>
            <div className="mel-reveal">
              <p style={S.groupTitle}>Faculty Coordinators</p>
              <div style={S.facultyGrid}>
                
                {/* ── FACULTY AVATARS UPDATED HERE TOO ── */}
                {faculty.map(f=>(
                  <div key={f.name} className="mel-glass" style={S.glass(S.facultyCard)}>
                    <div style={S.avatar(f.g)}>
                      {f.img ? (
                        <img 
                          src={f.img} 
                          alt={f.name} 
                          style={{ width: "100%", height: "100%", borderRadius: "inherit", objectFit: "cover" }} 
                        />
                      ) : (
                        f.i 
                      )}
                    </div>
                    <div style={{ display:"flex",flexDirection:"column" }}>
                      <span style={S.facultyName}>{f.name}</span>
                      <span style={S.facultyRole}>Faculty Coordinator</span>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}