'use client';

import React from 'react';
import { MapPin, Users, Sun, Calendar, Sparkles, ArrowRight, BookOpen, MousePointer2 } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';
import GrammarBadge from './GrammarBadge';

interface HeroSectionProps {
  grammarActive: boolean;
  onOpenBrochure: () => void;
  onToggleLaser: () => void;
}

export default function HeroSection({
  grammarActive,
  onOpenBrochure,
  onToggleLaser,
}: HeroSectionProps) {
  const { content } = useSiteContent();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-12 pb-20 overflow-hidden">
      {/* Background Neon Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-cyan-500/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Academic Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-pink-500/30 text-xs text-pink-300 mb-6 shadow-[0_0_15px_rgba(255,42,133,0.2)]">
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        <span className="font-mono">{content.hero.badge}</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase max-w-5xl leading-tight">
        <EditableText
          id="hero_title"
          defaultText={content.hero.headline}
          className="text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-pink-300"
          as="span"
        />
      </h1>

      {/* Japanese Subheading Tag */}
      <div className="flex items-center justify-center gap-3 my-3">
        <span className="h-px w-12 bg-pink-500/50" />
        <span className="text-xs sm:text-sm font-mono tracking-widest text-pink-400 font-bold uppercase">
          東京 • 日本の首都 • NEO-EDO PLATFORM
        </span>
        <span className="h-px w-12 bg-pink-500/50" />
      </div>

      {/* Descriptive Copy with Grammar highlights */}
      <div className="max-w-2xl mx-auto text-neutral-300 text-sm sm:text-lg mt-3 mb-8 leading-relaxed">
        {grammarActive ? (
          <p>
            Welcome to Japan&apos;s vibrant capital — a{' '}
            <GrammarBadge type="compound" active={grammarActive}>
              world-famous
            </GrammarBadge>
            ,{' '}
            <GrammarBadge type="compound" active={grammarActive}>
              high-tech
            </GrammarBadge>{' '}
            metropolis where ancient tradition meets the future!
          </p>
        ) : (
          <EditableText
            id="hero_subtitle"
            defaultText={content.hero.subheadline}
            className="text-neutral-300"
            as="p"
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
        <a
          href="#attractions"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,42,133,0.4)] transition transform hover:scale-105 active:scale-95"
        >
          <span>Explore 5 Attractions</span>
          <ArrowRight className="w-4 h-4" />
        </a>

        <button
          onClick={onOpenBrochure}
          className="px-6 py-3 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 border border-neutral-700 hover:border-pink-500/50 shadow-md transition"
        >
          <BookOpen className="w-4 h-4 text-pink-400" />
          <span>View 3-Fold Brochure (Tríptico)</span>
        </button>

        <button
          onClick={onToggleLaser}
          className="px-5 py-3 rounded-full bg-red-950/40 hover:bg-red-900/40 text-red-300 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 border border-red-500/40 shadow-[0_0_15px_rgba(255,0,85,0.2)] transition"
        >
          <MousePointer2 className="w-4 h-4 text-red-400" />
          <span>Laser Mode for Class</span>
        </button>
      </div>

      {/* City Profile Metrics Bar (Rubric Requirement 1: City name, location, population) */}
      <div className="w-full max-w-5xl glass-panel-glow rounded-3xl p-5 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-left border border-cyan-500/30">
        <div className="flex items-start gap-3 p-2">
          <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 border border-pink-500/30">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-neutral-400 uppercase block">Location</span>
            <span className="text-sm sm:text-base font-bold text-white block">Honshu Island</span>
            <span className="text-[11px] text-pink-300/80">Kanto Eastern Coast</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-2">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-neutral-400 uppercase block">City Population</span>
            <span className="text-sm sm:text-base font-bold text-white block">14+ Million</span>
            <span className="text-[11px] text-cyan-300/80">Central Wards Area</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-2">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-neutral-400 uppercase block">Metro Population</span>
            <span className="text-sm sm:text-base font-bold text-white block">37+ Million</span>
            <span className="text-[11px] text-purple-300/80">Greater Tokyo Region</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-2">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono text-neutral-400 uppercase block">Best Seasons</span>
            <span className="text-sm sm:text-base font-bold text-white block">Spring &amp; Autumn</span>
            <span className="text-[11px] text-amber-300/80">Sakura &amp; Autumn Leaves</span>
          </div>
        </div>
      </div>
    </section>
  );
}
