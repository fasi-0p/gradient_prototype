import React from 'react';
import PageTransition from '../components/ui/PageTransition';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import WhatWeDoSection from '../components/sections/WhatWeDoSection';
import StatsSection from '../components/sections/StatsSection';
import TimelineSection from '../components/sections/TimelineSection';
import TeamPreviewSection from '../components/sections/TeamPreviewSection';
import SpaceTravelSection from '../components/sections/SpaceTravelSection';
import CTASection from '../components/sections/CTASection';
import GradientEngine from '../components/sections/GradientEngine';

const HomePage = () => {
  return (
    <PageTransition variant="fade">
      <main data-testid="home-page">
        <HeroSection />
        <GradientEngine />
        <AboutSection />
        <WhatWeDoSection />
        <StatsSection />
        <TimelineSection />
        <TeamPreviewSection />
        <SpaceTravelSection />
        <CTASection />
      </main>
    </PageTransition>
  );
};

export default HomePage;
