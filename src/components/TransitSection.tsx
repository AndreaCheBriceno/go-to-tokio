'use client';

import React from 'react';
import { Plane, Compass, Sun, Sparkles, Navigation } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';
import GrammarBadge from './GrammarBadge';
import TrainSimulationMap from './TrainSimulationMap';

interface TransitSectionProps {
  grammarActive: boolean;
}

export default function TransitSection({ grammarActive }: TransitSectionProps) {
  const { content } = useSiteContent();

  return (
    <section id="transit" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Rubric Requirements 2 &amp; 3 • Climate, Access &amp; Mobility</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Getting There &amp; Around <span className="text-emerald-400 text-2xl font-normal">交通</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          How to land, ride, and navigate Tokyo&apos;s hyper-efficient urban grid, complete with live train line simulation and climate insights.
        </p>
      </div>

      {/* 2 Cards: Climate & Airport Entry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Climate & Best Seasons */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800 hover:border-amber-500/30 transition flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-amber-400 mb-3">
              <Sun className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Subtropical Climate &amp; Seasons</h3>
            </div>
            <EditableText
              id="climate_info"
              defaultText={content.travelEssentials.climateText}
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
            />
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between text-xs text-neutral-400">
            <span>Peak: Spring Sakura (Late Mar - Apr)</span>
            <span className="text-amber-400">Autumn Foliage (Oct - Nov)</span>
          </div>
        </div>

        {/* Airport Arrival */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800 hover:border-cyan-500/30 transition flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-cyan-400 mb-3">
              <Plane className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Arriving in Tokyo (HND &amp; NRT)</h3>
            </div>
            <EditableText
              id="transit_info"
              defaultText={content.travelEssentials.airportsText}
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
            />
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between text-xs text-neutral-400">
            <span>Haneda (HND): ~15 mins to city</span>
            <span className="text-cyan-400">Narita (NRT): ~50 mins by Narita Express</span>
          </div>
        </div>
      </div>

      {/* Interactive Train Line Loop & Simulation */}
      <TrainSimulationMap />
    </section>
  );
}
