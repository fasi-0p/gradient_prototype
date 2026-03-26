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

  const gradientTextStyle = {
    background: 'linear-gradient(to right, #8B5CFB, #3B82F6, #A855F7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden bg-[#0F172A]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8B5CFB]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="mb-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8B5CFB]">
                Collaborators
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-6 text-white"
            >
              Meet the <span style={gradientTextStyle}>Minds</span> Behind Gradient
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="text-white/60 text-lg leading-relaxed mb-8"
            >
              A diverse team of passionate individuals driving innovation in AI and ML. 
              From tech wizards to creative minds, meet the people making it all happen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              {/* FIXED BUTTON HERE */}
              <Link
                to="/team"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-[#8B5CFB] hover:border-[#8B5CFB] transition-all duration-300 shadow-xl hover:shadow-[#8B5CFB]/20 backdrop-blur-md"
              >
                <Users className="w-5 h-5 text-[#3B82F6] group-hover:text-white transition-colors" />
                <span>View Full Team</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Avatars */}
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CFB] to-[#3B82F6] border-2 border-[#0F172A]"
                  />
                ))}
              </div>
              <span className="text-white/40 font-mono text-sm">300+ Community Members</span>
            </div>
          </div>

          {/* Right Side Images */}
          <div className="relative grid grid-cols-2 gap-4">
            {teamImages.map((img, index) => (
              <div key={index} className={`relative aspect-[4/5] rounded-2xl overflow-hidden ${index === 1 ? 'translate-y-8' : ''}`}>
                <img src={img} alt="Team" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent opacity-60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPreviewSection;