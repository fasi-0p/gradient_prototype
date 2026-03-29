import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Instagram, Linkedin, Twitter, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/content';
import PageTransition from '../components/ui/PageTransition';
import NeuralNetworkBackground from "@/components/background/NeuralNetworkBackground";

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
  }
];

const SYS_FONT = 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
const MONO_FONT = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

const ContactPage = () => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <PageTransition variant="slideUp">
      <main
        data-testid="contact-page"
        className="min-h-screen relative pt-20 md:pt-0"
        style={{ 
          backgroundColor: '#0A0A0F', 
          color: '#ffffff',
          fontFamily: SYS_FONT
        }}
      >
        {/* ── BACKGROUND (TeamPage style) ── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <NeuralNetworkBackground opacity={0.3} />
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
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10,10,15,0.4), rgba(10,10,15,0.8), #0A0A0F)",
            }}
          />
        </div>

        <div className="relative z-10 w-full">
          {/* Hero */}
          <section ref={heroRef} className="min-h-screen flex items-center relative overflow-hidden px-6 md:px-12 lg:px-24 py-24">
            <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-transparent to-transparent" />
            
            <div className="max-w-7xl mx-auto relative z-10 w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
                className="mb-12"
              >
                <Link
                  to="/"
                  data-testid="contact-back-home"
                  className="inline-flex items-center gap-2 transition-colors text-sm uppercase group"
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: MONO_FONT, letterSpacing: '0.2em' }}
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span style={{ color: '#3B82F6' }} className="group-hover:text-[#3B82F6]">Back to Base</span>
                </Link>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left content */}
                <div>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    className="text-xs uppercase tracking-[0.2em]"
                    style={{ color: '#8B5CFB', fontFamily: MONO_FONT }}
                  >
                    Connect With Us
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="font-black text-6xl md:text-8xl tracking-tighter leading-none mt-4 mb-8"
                  >
                    LET'S{' '}
                    <span 
                      style={{ 
                        background: 'linear-gradient(to right, #8B5CFB, #3B82F6)', 
                        WebkitBackgroundClip: 'text', 
                        WebkitTextFillColor: 'transparent' 
                      }}
                    >
                      CONNECT
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="text-white/60 text-lg mb-12 max-w-lg"
                  >
                    Ready to join BMSCE's most innovative AI/ML community? 
                    Reach out through any of our social platforms.
                  </motion.p>

                  {/* Location */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 }}
                    className="flex items-start gap-4 p-6 rounded-2xl"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                      backdropFilter: 'blur(10px)', 
                      border: '1px solid rgba(255, 255, 255, 0.05)' 
                    }}
                  >
                    <a 
                      href="https://www.google.com/maps/dir//BMS+College+of+Engineering,+Bull+Temple+Rd,+Basavanagudi,+Bengaluru,+Karnataka+560004/@12.9322767,77.5734042,15z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x3bae158b11e34d2f:0x5f4adbdbab8bd80f!2m2!1d77.5668099!2d12.9416151?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 items-start group"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#8B5CFB]/10 flex items-center justify-center shrink-0 border border-[#8B5CFB]/20 group-hover:bg-[#8B5CFB]/20 transition">
                        <MapPin className="w-5 h-5 text-[#8B5CFB]" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-1 text-white group-hover:underline">
                          Our Location
                        </h3>

                        <address 
                          className="not-italic text-white/50 text-sm leading-relaxed"
                          style={{ fontFamily: MONO_FONT }}
                        >
                          B.M.S. College of Engineering<br />
                          Bull Temple Road, Basavanagudi<br />
                          Bangalore, Karnataka 560019
                        </address>
                      </div>
                    </a>
                  </motion.div>
                </div>

                {/* Social links */}
                <div className="space-y-4">
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
                      className="group flex items-center gap-6 p-6 rounded-2xl transition-all duration-300 relative overflow-hidden"
                      style={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                        backdropFilter: 'blur(10px)', 
                        border: '1px solid rgba(255, 255, 255, 0.05)' 
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 relative z-10"
                        style={{ background: `${social.color}15`, border: `1px solid ${social.color}30` }}
                      >
                        <social.icon className="w-6 h-6" style={{ color: social.color }} />
                      </div>
                      
                      <div className="flex-1 relative z-10">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-[1.1rem] text-white">{social.name}</h3>
                          <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/80 transition-colors" />
                        </div>
                        <p className="text-[#3B82F6]/80 text-xs mb-1 uppercase tracking-wider" style={{ fontFamily: MONO_FONT }}>
                          {social.handle}
                        </p>
                        <p className="text-white/40 text-sm">{social.description}</p>
                      </div>
                    </motion.a>
                  ))}

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                    className="pt-8 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6 justify-center sm:justify-start"
                  >
                    <p className="text-white/40 text-sm">
                      Want to collaborate or sponsor an event?
                    </p>
                    <a
                      href="mailto:gradient.mel@bmsce.ac.in"
                      data-testid="contact-email"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm hover:scale-105"
                      style={{
                        background: 'linear-gradient(to right, #8B5CFB, #3B82F6)',
                        color: '#fff',
                        boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.5)'
                      }}
                    >
                      <Mail className="w-4 h-4" />
                      <span>Email Us</span>
                    </a>
                  </motion.div>
                </div>
              </div>
              
              {/* Bottom footer */}
              <div 
                className="mt-24 pt-8 border-t border-white/10 flex justify-between text-white/20 text-xs"
                style={{ fontFamily: MONO_FONT }}
              >
              </div>

            </div>
          </section>

        </div>
      </main>
    </PageTransition>
  );
};

export default ContactPage;