import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../data/content';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, url: siteConfig.social.instagram, color: '#E1306C' },
    { name: 'LinkedIn', icon: Linkedin, url: siteConfig.social.linkedin, color: '#0077B5' },
    // { name: 'X', icon: Twitter, url: siteConfig.social.twitter, color: '#ffffff' }
  ];

  return (
    <section
      ref={ref}
      data-testid="cta-section"
      className="relative py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#ff00ff]/20 to-[#3b00ff]/20 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff00ff]">
            Join Us
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight leading-[1.1] mb-6"
        >
          Ready to{' '}
          <span className="gradient-text">Redefine</span>
          <br />
          Intelligence?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          Become part of BMSCE's most innovative AI/ML community. Learn, build, and grow with us.
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`cta-social-${social.name.toLowerCase()}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-6 py-4 rounded-full glass hover:bg-white/10 transition-all duration-300"
            >
              <social.icon 
                className="w-5 h-5 transition-colors duration-300" 
                style={{ color: social.color }}
              />
              <span className="font-medium">{social.name}</span>
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </motion.a>
          ))}
        </motion.div>

        {/* Contact link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            to="/contact"
            data-testid="cta-contact"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 font-mono text-sm"
          >
            <span>Or get in touch directly</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
