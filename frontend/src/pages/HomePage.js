import React, { Suspense, lazy } from 'react';
import PageTransition from '../components/ui/PageTransition';
import HeroSection from '../components/sections/HeroSection';

// Lazy load everything below the fold so the main thread doesn't choke on load
const AboutSection = lazy(() => import('../components/sections/AboutSection'));
const WhatWeDoSection = lazy(() => import('../components/sections/WhatWeDoSection'));
const StatsSection = lazy(() => import('../components/sections/StatsSection'));
const TimelineSection = lazy(() => import('../components/sections/TimelineSection'));
const TeamPreviewSection = lazy(() => import('../components/sections/TeamPreviewSection'));
const SpaceTravelSection = lazy(() => import('../components/sections/SpaceTravelSection'));
const CTASection = lazy(() => import('../components/sections/CTASection'));

const HomePage = () => {
  return (
    <PageTransition variant="fade">
      <main data-testid="home-page" className="bg-[#0A0A0F]">
        <HeroSection />
        
        {/* Suspense keeps the layout stable while other components load in the background */}
        <Suspense fallback={<div className="h-screen w-full bg-[#0A0A0F]" />}>
          <AboutSection />
          {/* <WhatWeDoSection /> */}
          <StatsSection />
          <TimelineSection />
          <TeamPreviewSection />
          <SpaceTravelSection />
          <CTASection />
        </Suspense>
      </main>
    </PageTransition>
  );
};

export default HomePage;