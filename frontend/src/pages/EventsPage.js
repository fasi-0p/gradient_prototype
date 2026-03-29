import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import NeuralNetworkBackground from '../components/background/NeuralNetworkBackground';

const eventCategories = [
  { id: 'all', label: 'All Events' },
  { id: 'utsav', label: 'Utsav Ananta' },
  { id: 'phaseshift', label: 'PhaseShift' },
  { id: 'gradientweek', label: 'Gradient Week' },
  { id: 'standalone', label: 'Standalone' }
];

const allEvents=[
  // UTSAV 2025
  { id: 1, title: "Jokes on You Again", category: "utsav", year: 2025, description: "", image: "https://gradient-content-server.vercel.app/content/utsav25/JOY.png" },
  { id: 2, title: "Uncharted 3: Lost Voyage", category: "utsav", year: 2025, description: "", image: "https://gradient-content-server.vercel.app/content/utsav25/UNC.png" },
  { id: 3, title: "Sync or Sink", category: "utsav", year: 2025, description: "", image: "https://gradient-content-server.vercel.app/content/utsav25/SOS.png" },

  // UTSAV 2024
  { id: 5, title: "Jokes on You Too Standup Comedy Event", category: "utsav", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/jok2.webp" },
  { id: 6, title: "Uncharted 2.0", category: "utsav", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/unc2.webp" },
  { id: 7, title: "Time Rift", category: "utsav", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/tmr.webp" },

  // PHASESHIFT 2025
  { id: 8, title: "Fortune 404", category: "phaseshift", year: 2025, description: "", image: "https://gradient-content-server.vercel.app/content/ps25/f404poster.png" },
  { id: 9, title: "AI Unplugged", category: "phaseshift", year: 2025, description: "", image: "https://gradient-content-server.vercel.app/content/ps25/aiunplugposter.png" },

  // PHASESHIFT 2024
  { id: 10, title: "Maze Maniac Resurrected", category: "phaseshift", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/mmrlogo.webp" },
  { id: 11, title: "Cipher Secrets", category: "phaseshift", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/ciphersec.webp" },
  { id: 12, title: "Retro Design 2.0", category: "phaseshift", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/rd2.webp" },

  // PHASESHIFT 2023
  { id: 13, title: "Maze Maniac 2.0", category: "phaseshift", year: 2023, description: "", image: "https://gradient-content-server.vercel.app/content/posters/mmr2.webp" },
  { id: 14, title: "Retro Design", category: "phaseshift", year: 2023, description: "", image: "https://gradient-content-server.vercel.app/content/posters/rd1.webp" },
  { id: 15, title: "Datathon Hackathon", category: "phaseshift", year: 2023, description: "", image: "https://gradient-content-server.vercel.app/content/posters/datathon.webp" },
  { id: 16, title: "Workshop on LLM and LangChain", category: "phaseshift", year: 2023, description: "", image: "https://gradient-content-server.vercel.app/content/posters/pswork1.webp" },

  // GRADIENT WEEK 2025
  { id: 17, title: "Impact AI 2.0 24hr Hackathon", category: "gradientweek", year: 2025, description: "", image: "https://gradient-week.vercel.app/posters/gw/impact2.webp" },
  { id: 18, title: "Parallel Fusion", category: "gradientweek", year: 2025, description: "", image: "https://gradient-week.vercel.app/posters/gw/pf.webp" },
  { id: 19, title: "AI Agents Hands on Workshop", category: "gradientweek", year: 2025, description: "", image: "https://gradient-content-server.vercel.app/content/posters/gw/aiwork.webp" },
  { id: 21, title: "Cultural Evening", category: "gradientweek", year: 2025, description: "", image: "https://gradient-content-server.vercel.app/content/gallery/recap/cult/1.webp" },

  // GRADIENT WEEK 2024
  { id: 22, title: "Impact AI 24hr Hackathon", category: "gradientweek", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/impact1.webp" },
  { id: 23, title: "RAG Chatbots Demystified Workshop", category: "gradientweek", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/ragchat.webp" },
  { id: 24, title: "Data Unlocked Workshop", category: "gradientweek", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/datau.jpg" },
  { id: 25, title: "Cipher Strike Event", category: "gradientweek", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/cipherstri.webp" },

  // STANDALONE 2025
  { id: 26, title: "AI AMPED Workshop", category: "standalone", year: 2025, description: "", image: "https://gradient-content-server.vercel.app/content/gallery/sa/2025/Ai%20amped.webp" },

  // STANDALONE 2024
  { id: 27, title: "Gradient AI Hackathon", category: "standalone", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/hacka24.webp" },
  { id: 28, title: "Evengers - Auction Wars", category: "standalone", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/evauc.webp" },
  { id: 29, title: "Talk on Introduction to AI and Business Intelligence", category: "standalone", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/busi.webp" },
  { id: 30, title: "Bingo Blitz", category: "standalone", year: 2024, description: "", image: "https://gradient-content-server.vercel.app/content/posters/bingo.webp" },

  // STANDALONE 2023
  { id: 31, title: "Talk on AI", category: "standalone", year: 2023, description: "", image: "https://gradient-content-server.vercel.app/content/posters/krishnaik.webp" },
  { id: 32, title: "Time-Traveler's Quest", category: "standalone", year: 2023, description: "", image: "https://gradient-content-server.vercel.app/content/posters/ttq.webp" },
  { id: 33, title: "Talk on Emerging & Converging Technologies", category: "standalone", year: 2023, description: "", image: "https://gradient-content-server.vercel.app/content/posters/ect.webp" }
];

const EventCard = ({ event, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
      data-testid={`event-card-${event.id}`}
    >
      <div 
        className="relative h-full rounded-2xl overflow-hidden"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.03)', 
          backdropFilter: 'blur(10px)', 
          border: '1px solid rgba(255, 255, 255, 0.05)' 
        }}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
          
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span 
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
              className={`px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                event.status === 'completed' 
                  ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30'
                  : 'bg-[#ffcc00]/20 text-[#ffcc00] border border-[#ffcc00]/30'
              }`}
            >
              {event.status}
            </span>
          </div>

          {/* Year badge */}
          <div className="absolute bottom-4 left-4">
            <span 
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
              className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs text-white"
            >
              {event.year}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 
            className="font-semibold text-xl mb-2 transition-colors"
            style={{ color: '#ffffff', fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif' }}
          >
            {event.title}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            {event.description}
          </p>

          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors text-sm font-medium"
              style={{ color: '#3B82F6' }}
            >
              <span>Visit Event</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredEvents = activeCategory === 'all' 
    ? allEvents 
    : allEvents.filter(e => e.category === activeCategory);

  return (
    <PageTransition variant="slideUp">
      <main
        data-testid="events-page"
        className="min-h-screen relative pt-20 md:pt-0"
        style={{ 
          backgroundColor: '#0A0A0F', 
          color: '#ffffff',
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        {/* ── BACKGROUND (TeamPage style) ── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <NeuralNetworkBackground opacity={0.3} />
          
          {/* Subtle Grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.02,
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
            }}
          />
          
          {/* Central Blue Radial Glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              height: 400,
              background: "rgba(59,130,246,0.10)",
              filter: "blur(100px)",
              borderRadius: "50%",
            }}
          />
          
          {/* Vertical Theme Gradients */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10,10,15,0.4), rgba(10,10,15,0.8), #0A0A0F)",
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Hero */}
          <section ref={heroRef} className="min-h-[50vh] flex items-center relative overflow-hidden px-6 md:px-12 lg:px-24 py-24">
            <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-transparent to-transparent" />
            
            <div className="max-w-7xl mx-auto relative w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                className="mb-12"
              >
                <Link
                  to="/"
                  data-testid="events-back-home"
                  className="inline-flex items-center gap-2 transition-colors text-sm uppercase group"
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', letterSpacing: '0.2em' }}
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span style={{ color: '#3B82F6' }} className="group-hover:text-[#3B82F6]">Back to Base</span>
                </Link>
              </motion.div>

              <div className="flex flex-col items-center text-center mb-6 border-b border-white/10 pb-6">
                <div>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    className="text-xs uppercase tracking-[0.2em]"
                    style={{ color: '#8B5CFB', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
                  >
                    Event Hub
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="font-black text-6xl md:text-8xl tracking-tighter leading-none mt-4 mb-2"
                  >
                    OUR{' '}
                    <span 
                      style={{ 
                        background: 'linear-gradient(to right, #8B5CFB, #3B82F6)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent' 
                      }}
                    >
                      EVENTS
                    </span>
                  </motion.h1>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg max-w-3xl mx-auto text-center mt-4"
              >
                Explore our dynamic collection of workshops, hackathons, and technical showcases that define Gradient's commitment to innovation.
              </motion.p>
            </div>
          </section>

          {/* Filter tabs */}
          <section className="px-6 md:px-12 lg:px-24 mb-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                {eventCategories.map((cat) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid={`filter-${cat.id}`}
                    className="px-4 py-2 rounded-full font-medium text-sm transition-all duration-300"
                    style={{ 
                      backgroundColor: activeCategory === cat.id ? 'transparent' : 'rgba(255,255,255,0.05)',
                      backgroundImage: activeCategory === cat.id ? 'linear-gradient(to right, #8B5CFB, #3B82F6)' : 'none',
                      color: activeCategory === cat.id ? '#ffffff' : 'rgba(255,255,255,0.6)',
                      border: activeCategory === cat.id ? 'none' : '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {cat.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          {/* Events grid */}
          <section className="px-6 md:px-12 lg:px-24 pb-24">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredEvents.length === 0 && (
                <div className="text-center py-24">
                  <p className="text-white/40 text-lg">No events found in this category.</p>
                </div>
              )}

              {/* Added bottom footer style resembling Team Page */}
              <div 
                className="mt-32 pt-8 border-t border-white/10 flex justify-between text-white/20 text-xs"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
              >
                <span>GRADIENT AI/ML</span>
                <span>EVENT_DATA_NODE</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </PageTransition>
  );
};

export default EventsPage;