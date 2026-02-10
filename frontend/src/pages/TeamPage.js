import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';

// Domain-specific animations
const domainAnimations = {
  coordinator: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },
  tech: {
    animate: { rotate: [0, 360] },
    transition: { duration: 20, repeat: Infinity, ease: "linear" }
  },
  design: {
    animate: { borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"] },
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
  },
  logistics: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  },
  content: {
    animate: { scaleX: [0, 1, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
  },
  outreach: {
    animate: { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};

// Team data with domains
const teamDomains = [
  {
    id: "faculty",
    title: "Faculty Coordinator",
    animation: "coordinator",
    color: "#ff00ff",
    members: [
      { name: "Dr. Faculty Name", role: "Faculty Advisor", image: null }
    ]
  },
  {
    id: "president",
    title: "President",
    animation: "coordinator",
    color: "#ff00ff",
    members: [
      { name: "President Name", role: "President", image: null }
    ]
  },
  {
    id: "tech",
    title: "Tech Heads",
    animation: "tech",
    color: "#3b00ff",
    members: [
      { name: "Pranav Veeraghanta", role: "Technical Head", image: null, link: "https://beyondmebtw.com/" }
    ]
  },
  {
    id: "design",
    title: "Design Heads",
    animation: "design",
    color: "#00f0ff",
    members: [
      { name: "Vinay Yele", role: "Design Head", image: null, link: "https://vinayyele.live/" }
    ]
  },
  {
    id: "logistics",
    title: "Logistics Heads",
    animation: "logistics",
    color: "#ff6b00",
    members: [
      { name: "Logistics Head 1", role: "Logistics Head", image: null },
      { name: "Logistics Head 2", role: "Logistics Head", image: null }
    ]
  },
  {
    id: "content",
    title: "Content Heads",
    animation: "content",
    color: "#00ff88",
    members: [
      { name: "Content Head 1", role: "Content Head", image: null },
      { name: "Content Head 2", role: "Content Head", image: null }
    ]
  },
  {
    id: "outreach",
    title: "Outreach Heads",
    animation: "outreach",
    color: "#ffcc00",
    members: [
      { name: "Outreach Head 1", role: "Outreach Head", image: null },
      { name: "Outreach Head 2", role: "Outreach Head", image: null }
    ]
  }
];

// Animated decoration for each domain
const DomainDecoration = ({ animation, color }) => {
  const animConfig = domainAnimations[animation] || domainAnimations.coordinator;
  
  return (
    <motion.div
      className="absolute -top-4 -right-4 w-24 h-24 opacity-30 pointer-events-none"
      animate={animConfig.animate}
      transition={animConfig.transition}
    >
      {animation === 'tech' && (
        <div className="w-full h-full border-2 rounded-full" style={{ borderColor: color }} />
      )}
      {animation === 'design' && (
        <motion.div 
          className="w-full h-full" 
          style={{ background: color }}
          animate={animConfig.animate}
          transition={animConfig.transition}
        />
      )}
      {animation === 'coordinator' && (
        <motion.div 
          className="w-full h-full rounded-full"
          style={{ background: `${color}40` }}
          animate={animConfig.animate}
          transition={animConfig.transition}
        />
      )}
      {animation === 'logistics' && (
        <div className="flex gap-1 h-full items-end">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t"
              style={{ 
                background: color,
                height: `${20 + i * 15}%`
              }}
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}
      {animation === 'content' && (
        <div className="w-full h-full flex items-center">
          <motion.div
            className="h-1 rounded-full"
            style={{ background: color }}
            animate={{ width: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      )}
      {animation === 'outreach' && (
        <div className="w-full h-full relative">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-2"
              style={{ 
                borderColor: color,
                width: `${60 + i * 20}%`,
                height: `${60 + i * 20}%`,
                top: `${20 - i * 10}%`,
                left: `${20 - i * 10}%`
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

const MemberCard = ({ member, domainColor, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative p-6 glass rounded-2xl hover:bg-white/5 transition-all duration-500">
        {/* Avatar */}
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-heading font-bold"
          style={{ 
            background: `linear-gradient(135deg, ${domainColor}40, ${domainColor}20)`,
            border: `2px solid ${domainColor}40`
          }}
        >
          {member.name.charAt(0)}
        </div>

        {/* Name */}
        <h4 className="font-heading font-semibold text-lg text-center mb-1 group-hover:text-white transition-colors">
          {member.name}
        </h4>

        {/* Role */}
        <p className="text-white/50 text-sm text-center mb-4">{member.role}</p>

        {/* Link */}
        {member.link && (
          <a
            href={member.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider hover:text-white transition-colors"
            style={{ color: domainColor }}
          >
            <span>Portfolio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const DomainSection = ({ domain, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative py-16"
      data-testid={`team-domain-${domain.id}`}
    >
      {/* Domain header */}
      <div className="relative mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          {/* Animated icon */}
          <div className="relative w-12 h-12">
            <DomainDecoration animation={domain.animation} color={domain.color} />
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${domain.color}20` }}
            >
              <span className="font-heading font-bold" style={{ color: domain.color }}>
                {domain.title.charAt(0)}
              </span>
            </div>
          </div>
          
          <div>
            <h3 
              className="font-heading font-bold text-2xl md:text-3xl"
              style={{ color: domain.color }}
            >
              {domain.title}
            </h3>
            <div className="h-1 w-16 rounded-full mt-2" style={{ background: domain.color }} />
          </div>
        </motion.div>
      </div>

      {/* Members grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {domain.members.map((member, memberIndex) => (
          <MemberCard
            key={member.name}
            member={member}
            domainColor={domain.color}
            index={memberIndex}
          />
        ))}
      </div>
    </motion.section>
  );
};

const TeamPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <motion.main
      data-testid="team-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 md:pt-0"
    >
      {/* Hero */}
      <section ref={heroRef} className="min-h-[60vh] flex items-center relative overflow-hidden px-6 md:px-12 lg:px-24 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#3b00ff]/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            className="mb-12"
          >
            <Link
              to="/"
              data-testid="team-back-home"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors font-mono text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff00ff]"
          >
            The Team
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.9] mt-4 mb-6"
          >
            Meet the{' '}
            <span className="gradient-text">Minds</span>
            <br />
            Behind Gradient
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl"
          >
            A diverse team of passionate individuals driving innovation in AI and ML. 
            Each domain brings unique skills and perspectives to make Gradient extraordinary.
          </motion.p>
        </div>
      </section>

      {/* Team sections by domain */}
      <div className="px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-7xl mx-auto">
          {teamDomains.map((domain, index) => (
            <DomainSection key={domain.id} domain={domain} index={index} />
          ))}
        </div>
      </div>
    </motion.main>
  );
};

export default TeamPage;
