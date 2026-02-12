import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Instagram, Linkedin, Twitter, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/content';
import PageTransition from '../components/ui/PageTransition';

const socialLinks = [
  { 
    name: 'Instagram', 
    icon: Instagram, 
    url: siteConfig.social.instagram, 
    color: '#E1306C',
    handle: '@gradient.bmsce',
    description: 'Follow us for updates and behind-the-scenes'
  },
  { 
    name: 'LinkedIn', 
    icon: Linkedin, 
    url: siteConfig.social.linkedin, 
    color: '#0077B5',
    handle: 'Gradient BMSCE',
    description: 'Connect with us professionally'
  },
  { 
    name: 'X (Twitter)', 
    icon: Twitter, 
    url: siteConfig.social.twitter, 
    color: '#ffffff',
    handle: '@gradient_bmsce',
    description: 'Stay updated with our latest news'
  }
];

const ContactPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <PageTransition variant="slideUp">
      <main
        data-testid="contact-page"
        className="pt-20 md:pt-0"
      >
      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12 lg:px-24 py-24">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#ff00ff]/10 to-[#3b00ff]/10 blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            className="mb-12"
          >
            <Link
              to="/"
              data-testid="contact-back-home"
              className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors font-mono text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                className="font-mono text-xs uppercase tracking-[0.2em] text-[#ff00ff]"
              >
                Connect With Us
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="font-heading font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[0.9] mt-4 mb-6"
              >
                Let's{' '}
                <span className="gradient-text">Connect</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-white/60 text-lg mb-8"
              >
                Ready to join BMSCE's most innovative AI/ML community? 
                Reach out through any of our social platforms.
              </motion.p>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4 p-6 glass rounded-2xl"
              >
                <div className="w-12 h-12 rounded-xl bg-[#ff00ff]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#ff00ff]" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-1">Our Location</h3>
                  <address className="not-italic text-white/50 leading-relaxed">
                    B.M.S. College of Engineering<br />
                    Bull Temple Road, Basavanagudi<br />
                    Bangalore, Karnataka 560019
                  </address>
                </div>
              </motion.div>
            </div>

            {/* Social links */}
            <div className="space-y-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`contact-${social.name.toLowerCase().replace(/[^a-z]/g, '')}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-center gap-6 p-6 glass rounded-2xl hover:bg-white/5 transition-all duration-300"
                >
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${social.color}20` }}
                  >
                    <social.icon className="w-8 h-8" style={{ color: social.color }} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-semibold text-lg">{social.name}</h3>
                      <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
                    </div>
                    <p className="text-white/40 font-mono text-sm mb-1">{social.handle}</p>
                    <p className="text-white/50 text-sm">{social.description}</p>
                  </div>
                </motion.a>
              ))}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="pt-6 text-center"
              >
                <p className="text-white/40 text-sm mb-4">
                  Want to collaborate or sponsor an event?
                </p>
                <a
                  href="mailto:gradient.mel@bmsce.ac.in"
                  data-testid="contact-email"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff00ff] to-[#3b00ff] rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </PageTransition>
  );
};

export default ContactPage;
