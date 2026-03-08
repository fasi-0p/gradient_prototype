import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home',      path: '/' },
  { name: 'About',     path: '/about' },
  { name: 'Team',      path: '/team' },
  { name: 'Events',    path: '/events' },
  { name: 'Join Us',   path: '/contact' },
  { name: 'Mel Dept.', path: '/meldept' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    // Sync immediately on every route change — no waiting for a scroll event
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]); // re-runs on every navigation

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* ── DESKTOP NAV ── */}
      <motion.nav
        data-testid="navbar"
        initial={{ opacity: 0 }}   // ← NO y transform; avoids the fixed-bottom glitch
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={`fixed bottom-8 right-12 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
          isScrolled ? 'glass-strong shadow-lg shadow-black/20' : 'glass'
        }`}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              data-testid={`nav-${item.name.toLowerCase().replace(/\s/g, '-')}`}
              className="relative px-5 py-2.5 rounded-full transition-all duration-300"
            >
              {isActive && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 bg-gradient-to-r from-[#ff00ff] to-[#3b00ff] rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 font-medium text-sm tracking-wide transition-colors duration-300 ${
                isActive ? 'text-white' : 'text-white/70 hover:text-white'
              }`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </motion.nav>

      {/* ── MOBILE NAV ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`flex items-center justify-between px-6 py-4 transition-all duration-300 ${
            isScrolled ? 'glass-strong' : ''
          }`}
        >
          <Link to="/" className="font-heading font-bold text-xl gradient-text">
            Gradient
          </Link>
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full glass"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-strong border-t border-white/10"
            >
              <div className="flex flex-col p-6 gap-4">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s/g, '-')}`}
                        className={`block py-3 px-4 rounded-xl text-lg font-medium transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-[#ff00ff]/20 to-[#3b00ff]/20 text-white gradient-border'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;