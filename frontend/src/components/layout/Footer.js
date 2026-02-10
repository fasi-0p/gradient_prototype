import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../data/content';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    { name: 'Connect', path: '/contact' }
  ];

  return (
    <footer data-testid="footer" className="relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <h3 className="font-heading font-bold text-3xl md:text-4xl gradient-text">
                Gradient
              </h3>
            </Link>
            <p className="text-white/60 max-w-md leading-relaxed mb-8">
              {siteConfig.description}
            </p>
            
            {/* Social Links */}
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
                  className="w-12 h-12 rounded-full glass flex items-center justify-center group transition-all duration-300 hover:border-[#ff00ff]/50"
                >
                  <social.icon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] text-white/40 mb-6">
              Navigation
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
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
            <h4 className="font-heading font-semibold text-sm uppercase tracking-[0.2em] text-white/40 mb-6">
              Location
            </h4>
            <address className="not-italic text-white/60 leading-relaxed">
              B.M.S. College of Engineering<br />
              Bull Temple Road<br />
              Bangalore, Karnataka<br />
              India - 560019
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Gradient. All rights reserved.
          </p>
          <p className="text-white/40 text-sm font-mono">
            Redefining Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
