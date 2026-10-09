'use client';

import React from 'react';
import { Plane, Sun, Sparkles } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';
import FlightSeasonsAnimation from './FlightSeasonsAnimation';

export default function TransitSection() {
  const { content, language } = useSiteContent();
  const isEs = language === 'es';

  return (
    <section id="transit" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>
              {isEs
                ? 'Clima, Acceso y Movilidad'
                : 'Climate, Access & Mobility'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {isEs ? 'Cómo Llegar y Cómo Moverse' : 'Getting There & Around'}{' '}
            <span className="text-emerald-400 text-2xl font-normal">🛫</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          {isEs
            ? 'Cómo aterrizar y el clima.'
            : 'How to land and the climate.'}
        </p>
      </div>

      {/* 2 Cards: Climate & Airport Entry */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Climate & Best Seasons */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800 hover:border-amber-500/30 transition flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-amber-400 mb-3">
              <Sun className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">
                {isEs ? 'Clima Subtropical y Estaciones' : 'Subtropical Climate & Seasons'}
              </h3>
            </div>
            <EditableText
              id="climate_info"
              defaultText={content.travelEssentials.climateText}
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
            />
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between text-xs text-neutral-400">
            <span>{isEs ? 'Pico: Sakura primaveral (Mar - Abr)' : 'Peak: Spring Sakura (Late Mar - Apr)'}</span>
            <span className="text-amber-400">{isEs ? 'Follaje otoñal (Oct - Nov)' : 'Autumn Foliage (Oct - Nov)'}</span>
          </div>
        </div>

        {/* Airport Arrival */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800 hover:border-cyan-500/30 transition flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-cyan-400 mb-3">
              <Plane className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">
                {isEs ? 'Llegar a Tokio (HND y NRT)' : 'Arriving in Tokyo (HND & NRT)'}
              </h3>
            </div>
            <EditableText
              id="transit_info"
              defaultText={content.travelEssentials.airportsText}
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
            />
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-800 flex justify-between text-xs text-neutral-400">
            <span>{isEs ? 'Haneda (HND): ~15 mins al centro' : 'Haneda (HND): ~15 mins to city'}</span>
            <span className="text-cyan-400">{isEs ? 'Narita (NRT): ~50 mins en Narita Express' : 'Narita (NRT): ~50 mins by Narita Express'}</span>
          </div>
        </div>
      </div>

      <FlightSeasonsAnimation />
    </section>
  );
}
