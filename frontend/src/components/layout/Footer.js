import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Instagram, Linkedin, Twitter, ArrowUpRight, Cpu, Network, Database, Bot, Code } from 'lucide-react';
import { siteConfig } from '../../data/content';

// SVG Tech Logos
const TechLogos = {
  PyTorch: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#EE4C2C]">
      <path d="M12 2c-4 0-6 3-6 7 0 3 2.5 5.5 4 8l2 5 2-5c1.5-2.5 4-5 4-8 0-4-2-7-6-7z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  ),
  TensorFlow: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#FF6F00]">
      <path d="M4 4h16v4H4z" />
      <path d="M10 8h4v12h-4z" />
      <path d="M14 12h5v4h-5z" />
    </svg>
  ),
  OpenCV: () => (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
      <circle cx="12" cy="7" r="4" stroke="#FF0000" />
      <circle cx="7" cy="15" r="4" stroke="#00FF00" />
      <circle cx="17" cy="15" r="4" stroke="#0000FF" />
    </svg>
  ),
  Python: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#3776AB]">
      <path d="M12 2C7.58 2 4 5.58 4 10v2h8v2H8v6h4c4.42 0 8-3.58 8-8v-2H12v-2h4V4H12z" />
      <circle cx="9" cy="5" r="1" fill="currentColor" />
      <circle cx="15" cy="19" r="1" fill="currentColor" />
    </svg>
  ),
  HuggingFace: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-[#FFD21E]">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14h8" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="15" cy="9" r="1" fill="currentColor" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
    </svg>
  )
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px" });

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: siteConfig.social.instagram },
    { name: 'LinkedIn', icon: Linkedin, url: siteConfig.social.linkedin },
    { name: 'X', icon: Twitter, url: siteConfig.social.twitter }
  ];

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Events', path: '/events' },
    { name: 'Join Us', path: '/contact' }
  ];

  const balancedPool = useMemo(() => {
    const basePool = [
      { icon: <Cpu className="w-8 h-8 text-violet-400" /> },
      { icon: <Network className="w-8 h-8 text-blue-400" /> },
      { icon: <Database className="w-8 h-8 text-fuchsia-400" /> },
      { icon: <Bot className="w-8 h-8 text-emerald-400" /> },
      { icon: <Code className="w-8 h-8 text-cyan-400" /> },
      { icon: <TechLogos.PyTorch /> },
      { icon: <TechLogos.TensorFlow /> },
      { icon: <TechLogos.OpenCV /> },
      { icon: <TechLogos.Python /> },
      { icon: <TechLogos.HuggingFace /> },
    ];
    return [...basePool, ...basePool, ...basePool];
  }, []);

  // Falling Tokens Generation
  const fallingChips = useMemo(() => {
    return balancedPool.map((chip, i) => {
      const sizeClass = Math.random() > 0.5 ? 'w-20 h-20' : 'w-16 h-16';
      
      return {
        ...chip,
        id: i,
        sizeClass,
        // Scatter evenly across the width
        left: `${2 + Math.random() * 90}%`, 
        // Settle randomly near the bottom instead of floating in the middle
        bottom: `${Math.random() * 20}%`, 
        rotation: -45 + Math.random() * 90,
        // Randomize the delay so they shower down at different times
        delay: Math.random() * 1.5,
      };
    });
  }, [balancedPool]);

  return (
    <footer ref={containerRef} data-testid="footer" className="relative z-10 border-t border-white/10 overflow-hidden bg-[#030014] min-h-[400px] flex flex-col justify-end">
      
      {/* --- THE FALLING CHIPS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {fallingChips.map((chip) => (
          <motion.div
            key={chip.id}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
            // Start high above the footer and rotated
            initial={{ y: -800, opacity: 0, rotate: chip.rotation - 90 }}
            // Drop to their final resting spot with a spring bounce
            animate={isInView ? {
              y: 0,
              opacity: 1,
              rotate: chip.rotation
            } : {}}
            transition={{
              type: "spring",
              bounce: 0.3 + Math.random() * 0.3, // Gives a slight realistic bounce when hitting the bottom
              duration: 1.5 + Math.random() * 1.5,
              delay: chip.delay,
            }}
            style={{ 
              position: 'absolute', 
              left: chip.left, 
              bottom: chip.bottom // Positioned from the bottom now
            }}
            className={`${chip.sizeClass} rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center cursor-grab pointer-events-auto border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:border-[#7C3AED]/50 hover:bg-white/10 transition-colors group`}
          >
            {chip.icon}
          </motion.div>
        ))}
      </div>

      {/* --- FOOTER CONTENT --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 relative z-10 w-full pointer-events-none">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 pointer-events-auto">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <h3 className="font-heading font-bold text-3xl md:text-4xl gradient-text drop-shadow-lg">
                Gradient
              </h3>
            </Link>
            <p className="text-white/80 max-w-md leading-relaxed mb-8 drop-shadow-md">
              {siteConfig.description}
            </p>
            
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-${social.name.toLowerCase()}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full bg-[#030014]/50 border border-white/20 flex items-center justify-center group transition-all duration-300 hover:border-[#7C3AED]/80 backdrop-blur-md shadow-lg"
                >
                  <social.icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] text-white/60 mb-6 drop-shadow-md">
              Navigation
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center gap-2 group font-medium drop-shadow-md"
                  >
                    {link.name}
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] text-white/60 mb-6 drop-shadow-md">
              Location
            </h4>
            <address className="not-italic text-white/80 leading-relaxed font-medium drop-shadow-md">
              B.M.S. College of Engineering<br />
              Bull Temple Road<br />
              Bangalore, Karnataka<br />
              India - 560019
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 pointer-events-auto rounded-lg p-2 relative z-20">
          <p className="text-white/60 text-sm font-medium">
            © {currentYear} Gradient. All rights reserved.
          </p>
          <p className="text-white/60 text-sm font-mono font-semibold tracking-wider">
            Redefining Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;