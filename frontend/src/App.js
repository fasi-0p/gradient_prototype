import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

// Hooks
import useLenis from "./hooks/useLenis";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/layout/Loader";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import EventsPage from "./pages/EventsPage";
import ContactPage from "./pages/ContactPage";

// Animated routes wrapper
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </AnimatePresence>
  );
};

// Scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Use Lenis for smooth scroll to top
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};

// Main App content (needs to be inside BrowserRouter for hooks)
const AppContent = ({ isLoading }) => {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <>
      <ScrollToTop />
      
      {/* Navigation */}
      {!isLoading && <Navbar  />}

      {/* Main content */}
      <AnimatedRoutes />

      {/* Footer */}
      {!isLoading && <Footer />}
    </>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
    document.body.classList.remove('loading-active');
  }, []);

  useEffect(() => {
    document.body.classList.add('loading-active');
  }, []);

  return (
    <div className="App min-h-screen text-white">
      <div className="global-bg" />
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Loader */}
      {isLoading && <Loader onComplete={handleLoadComplete} />}

      <BrowserRouter>
        <AppContent isLoading={isLoading} />
      </BrowserRouter>
    </div>
  );
}

export default App;
