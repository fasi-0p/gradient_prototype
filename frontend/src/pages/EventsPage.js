import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';

const eventCategories = [
  { id: 'all', label: 'All Events' },
  { id: 'utsav', label: 'Utsav Ananta' },
  { id: 'phaseshift', label: 'PhaseShift' },
  { id: 'gradientweek', label: 'Gradient Week' },
  { id: 'standalone', label: 'Standalone' }
];

const allEvents = [
  {
    id: 1,
    title: "Jokes on You Again",
    category: "utsav",
    year: 2025,
    description: "A fun-filled comedy and tech trivia event.",
    image: "https://gradient-content-server.vercel.app/content/utsav25/JOY.png",
    status: "completed"
  },
  {
    id: 2,
    title: "Uncharted 3: Lost Voyage",
    category: "utsav",
    year: 2025,
    description: "Digital treasure hunt with cryptic puzzles and challenges.",
    image: "https://gradient-content-server.vercel.app/content/utsav25/UNC.png",
    status: "completed",
    link: "https://uncharted3.gradientaiml.tech/"
  },
  {
    id: 3,
    title: "Sync or Sink",
    category: "utsav",
    year: 2025,
    description: "Team synchronization challenge testing coordination skills.",
    image: "https://gradient-content-server.vercel.app/content/utsav25/SOS.png",
    status: "completed"
  },
  {
    id: 4,
    title: "Gradient Week 2025",
    category: "gradientweek",
    year: 2025,
    description: "Our flagship annual Tech Innovation Week featuring hackathons, workshops, and tech showcases.",
    image: "https://gradient-content-server.vercel.app/content/gallery/special/3.webp",
    status: "completed",
    link: "https://gradientaiml.tech/gw25"
  },
  {
    id: 5,
    title: "PhaseShift Meridian 2025",
    category: "phaseshift",
    year: 2025,
    description: "BMSCE's premier technical symposium featuring innovative workshops and showcases.",
    image: "https://gradient-content-server.vercel.app/content/gallery/special/7.webp",
    status: "completed",
    link: "https://gradientaiml.tech/ps25"
  },
  {
    id: 6,
    title: "AI/ML Hackathon 2024",
    category: "standalone",
    year: 2024,
    description: "Our biggest hackathon challenging participants to build AI solutions.",
    image: "https://gradient-content-server.vercel.app/content/posters/hacka24.webp",
    status: "completed"
  }
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
      <div className="relative h-full glass rounded-2xl overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
          
          {/* Status badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider ${
              event.status === 'completed' 
                ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30'
                : 'bg-[#ffcc00]/20 text-[#ffcc00] border border-[#ffcc00]/30'
            }`}>
              {event.status}
            </span>
          </div>

          {/* Year badge */}
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs font-mono">
              {event.year}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-heading font-semibold text-xl mb-2 group-hover:text-white transition-colors">
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
              className="inline-flex items-center gap-2 text-[#ff00ff] hover:text-white transition-colors text-sm font-medium"
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
        className="pt-20 md:pt-0"
      >
      {/* Hero */}
      <section ref={heroRef} className="min-h-[50vh] flex items-center relative overflow-hidden px-6 md:px-12 lg:px-24 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#ff00ff]/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            className="mb-12"
          >
            <Link
              to="/"
              data-testid="events-back-home"
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
            Event Gallery
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-heading font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.9] mt-4 mb-6"
          >
            Our{' '}
            <span className="gradient-text">Events</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-2xl"
          >
            Explore our dynamic collection of workshops, hackathons, and technical showcases 
            that define Gradient's commitment to innovation.
          </motion.p>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="px-6 md:px-12 lg:px-24 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {eventCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`filter-${cat.id}`}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#ff00ff] to-[#3b00ff] text-white'
                    : 'glass text-white/60 hover:text-white'
                }`}
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
        </div>
      </section>
    </main>
    </PageTransition>
  );
};

export default EventsPage;
