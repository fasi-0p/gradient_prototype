import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';

const TeamPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamImages = [
    "https://gradient-content-server.vercel.app/content/core26/Group.JPG",
    "https://gradient-content-server.vercel.app/content/core25.jpeg",
  ];

  return (
    <section
      ref={ref}
      data-testid="team-preview-section"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3b00ff]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text content */}
          <div>
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              {/* <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff00ff]">
                05 / The Team
              </span> */}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6"
            >
              Meet the{' '}
              <span className="gradient-text">Minds</span>
              {' '}Behind Gradient
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg leading-relaxed mb-8"
            >
              A diverse team of passionate individuals driving innovation in AI and ML. 
              From tech wizards to creative minds, meet the people making it all happen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                to="/team"
                data-testid="team-cta"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300"
              >
                <Users className="w-5 h-5" />
                <span>View Full Team</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Team stat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff00ff] to-[#3b00ff] border-2 border-[#030014]"
                  />
                ))}
              </div>
              <span className="text-white/40 font-mono text-sm">
                200+ Community Members
              </span>
            </motion.div>
          </div>

          {/* Image grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {teamImages.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className={`relative aspect-[4/5] rounded-2xl overflow-hidden ${index === 1 ? 'translate-y-8' : ''}`}
                >
                  <img
                    src={img}
                    alt={`Gradient Team ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-r from-[#ff00ff]/30 to-[#3b00ff]/30 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamPreviewSection;
