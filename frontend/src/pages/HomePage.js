import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import WhatWeDoSection from '../components/sections/WhatWeDoSection';
import StatsSection from '../components/sections/StatsSection';
import TimelineSection from '../components/sections/TimelineSection';
import TeamPreviewSection from '../components/sections/TeamPreviewSection';
import SpaceTravelSection from '../components/sections/SpaceTravelSection';
import CTASection from '../components/sections/CTASection';

const HomePage = () => {
  return (
    <motion.main
      data-testid="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutSection />
      <WhatWeDoSection />
      <StatsSection />
      <TimelineSection />
      <TeamPreviewSection />
      <SpaceTravelSection />
      <CTASection />
    </motion.main>
  );
};

export default HomePage;
