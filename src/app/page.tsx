'use client';

import React, { useState, useRef } from 'react';
import { ContentProvider } from '../context/ContentContext';
import LaserPointer from '../components/LaserPointer';
import SakuraPetalsOverlay, { SakuraOverlayRef } from '../components/SakuraPetalsOverlay';
import TriptychBrochureModal from '../components/TriptychBrochureModal';
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
import GrammarReferenceSection from '../components/GrammarReferenceSection';

export default function HomePage() {
  const [laserActive, setLaserActive] = useState(false);
  const [grammarActive, setGrammarActive] = useState(true); // Active by default for teacher presentation!
  const [ambientSakura, setAmbientSakura] = useState(true);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const sakuraRef = useRef<SakuraOverlayRef | null>(null);

  const handleTreeShake = (originX: number, originY: number) => {
    sakuraRef.current?.burst(originX, originY, 65);
  };

  return (
    <ContentProvider>
      <div className="relative min-h-screen bg-[#090b10] text-[#e2e8f0] overflow-x-hidden">
        {/* Interactive Laser Presentation Pointer (Toggleable) */}
        <LaserPointer
          active={laserActive}
          onToggle={() => setLaserActive((prev) => !prev)}
        />

        {/* Ambient & Interactive Burst Sakura Petals Canvas */}
        <SakuraPetalsOverlay ref={sakuraRef} ambient={ambientSakura} />

        {/* 3-Fold Brochure (Tríptico Digital) Modal Viewer */}
        <TriptychBrochureModal
          isOpen={brochureOpen}
          onClose={() => setBrochureOpen(false)}
        />

        {/* Sticky Header with Laser, Grammar & Supabase Edit Controls */}
        <Navigation
          laserActive={laserActive}
          onToggleLaser={() => setLaserActive((prev) => !prev)}
          grammarActive={grammarActive}
          onToggleGrammar={() => setGrammarActive((prev) => !prev)}
          ambientSakura={ambientSakura}
          onToggleAmbientSakura={() => setAmbientSakura((prev) => !prev)}
          onOpenBrochure={() => setBrochureOpen(true)}
        />

        {/* Main Content Flow */}
        <main className="relative z-10">
          <HeroSection
            grammarActive={grammarActive}
            onOpenBrochure={() => setBrochureOpen(true)}
            onToggleLaser={() => setLaserActive(true)}
          />

          <CityOverviewSection grammarActive={grammarActive} />

          <AttractionsBento grammarActive={grammarActive} />

          <TransitSection grammarActive={grammarActive} />

          <GastronomySection grammarActive={grammarActive} />

          <LivingCultureSection
            grammarActive={grammarActive}
            onShakeSakura={handleTreeShake}
            ambientSakura={ambientSakura}
            onToggleAmbientSakura={() => setAmbientSakura((prev) => !prev)}
          />

          <TravelTipsSection grammarActive={grammarActive} />

          <ProblemSolverSection />

          <DayTripSection grammarActive={grammarActive} />

          <GrammarReferenceSection />
        </main>
      </div>
    </ContentProvider>
  );
}
