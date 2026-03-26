import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import NeuralNetworkBackground from "../background/NeuralNetworkBackground";

const TeamPreviewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Just the single primary team image
  const teamImage = "https://gradient-content-server.vercel.app/content/core26/Group.JPG";

  const gradientTextStyle = {
    background: 'linear-gradient(to right, #8B5CFB, #3B82F6, #A855F7)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Shared Neural Background */}
      <NeuralNetworkBackground opacity={0.3} />

      {/* Replicated Background Theme Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
        {/* Solid Blue Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#3b82f6]/10 blur-[100px] rounded-full" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Side Text Content */}
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
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CFB] to-[#3B82F6] border-2 border-[#030014]"
                  />
                ))}
              </div>
              <span className="text-white/40 font-mono text-sm">300+ Community Members</span>
            </div>
          </div>

          {/* Right Side Single Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md mx-auto lg:ml-auto"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-[#3B82F6]/10 border border-white/5">
              <img 
                src={teamImage} 
                alt="Gradient Team" 
                className="w-full h-full object-cover" 
              />
              {/* Fade out the bottom of the image into the background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TeamPreviewSection;