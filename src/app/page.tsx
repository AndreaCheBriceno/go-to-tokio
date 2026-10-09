'use client';

import React, { useState, useRef } from 'react';
import { ContentProvider } from '../context/ContentContext';
import SakuraPetalsOverlay, { SakuraOverlayRef } from '../components/SakuraPetalsOverlay';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import CityOverviewSection from '../components/CityOverviewSection';
import AttractionsBento from '../components/AttractionsBento';
import TransitSection from '../components/TransitSection';
import GastronomySection from '../components/GastronomySection';
import LivingCultureSection from '../components/LivingCultureSection';
import TravelTipsSection from '../components/TravelTipsSection';
import ProblemSolverSection from '../components/ProblemSolverSection';
import DayTripSection from '../components/DayTripSection';

export default function HomePage() {
  const [ambientSakura, setAmbientSakura] = useState(true);
  const sakuraRef = useRef<SakuraOverlayRef | null>(null);

  const handleTreeShake = (originX: number, originY: number) => {
    sakuraRef.current?.burst(originX, originY, 65);
  };

  return (
    <ContentProvider>
      <div className="relative min-h-screen bg-[#090b10] text-[#e2e8f0] overflow-x-hidden">
        {/* Ambient & Interactive Burst Sakura Petals Canvas */}
        <SakuraPetalsOverlay ref={sakuraRef} ambient={ambientSakura} />

        {/* Sticky Header with Controls */}
        <Navigation
          ambientSakura={ambientSakura}
          onToggleAmbientSakura={() => setAmbientSakura((prev) => !prev)}
        />

        {/* Main Content Flow */}
        <main className="relative z-10">
          <HeroSection />

          <CityOverviewSection />

          <AttractionsBento />

          <TransitSection />

          <GastronomySection />

          <LivingCultureSection
            onShakeSakura={handleTreeShake}
            ambientSakura={ambientSakura}
            onToggleAmbientSakura={() => setAmbientSakura((prev) => !prev)}
          />

          <TravelTipsSection />

          <ProblemSolverSection />

          <DayTripSection />
        </main>
      </div>
    </ContentProvider>
  );
}
