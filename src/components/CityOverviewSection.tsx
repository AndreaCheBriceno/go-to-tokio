'use client';

import React from 'react';
import { Sparkles, Building2, Map, ShieldCheck, Zap } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';
import TokyoCinematicBackdrop from './TokyoCinematicBackdrop';

export default function CityOverviewSection() {
  const { content, language } = useSiteContent();
  const isEs = language === 'es';

  return (
    <section id="overview" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>
              {isEs
                ? 'Perfil y Demografía de la Ciudad'
                : 'City Profile & Demographics'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {isEs ? 'Resumen de la Metrópolis' : 'Metropolis Overview'}{' '}
            <span className="text-pink-400 text-2xl font-normal">🗼</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          {isEs
            ? 'Una capital mundial densamente poblada pero excepcionalmente pacífica y segura.'
            : 'A densely-populated yet exceptionally peaceful world capital.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
        
        {/* Tokyo Cinematic Backdrop placed as absolute behind the cards */}
        <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden opacity-50 pointer-events-none">
          <TokyoCinematicBackdrop />
        </div>

        {/* Main Narrative Card */}
        <div className="lg:col-span-7 z-10 glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800 flex flex-col justify-between space-y-6 bg-black/60 backdrop-blur-md">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase">
              <Building2 className="w-4 h-4" />
              <span>{isEs ? 'Perfil de la Capital' : 'Capital City Profile'}</span>
            </div>

            <h3 className="text-2xl font-bold text-white">
              {isEs
                ? 'El Corazón Político, Económico y Cultural de Japón'
                : 'The Political, Economic & Cultural Heart of Japan'}
            </h3>

            <EditableText
              id="city_overview"
              defaultText={content.overview.description}
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
            />
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-800/80 text-xs">
            <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="font-bold text-white block">
                {isEs ? 'Top en Seguridad' : 'Ranked Safest'}
              </span>
              <span className="text-[11px] text-neutral-400">
                {isEs ? 'Índice Global Seguro' : 'Global Metro Index'}
              </span>
            </div>
            <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <Zap className="w-4 h-4 text-cyan-400 mb-1" />
              <span className="font-bold text-white block">
                {isEs ? 'Ultra Rápida' : 'Hyper-Fast'}
              </span>
              <span className="text-[11px] text-neutral-400">
                {isEs ? 'Puntualidad' : 'Sub-minute transit'}
              </span>
            </div>
            <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 col-span-2 sm:col-span-1">
              <Map className="w-4 h-4 text-pink-400 mb-1" />
              <span className="font-bold text-white block">
                {isEs ? '23 Distritos' : '23 Special Wards'}
              </span>
              <span className="text-[11px] text-neutral-400">
                {isEs ? 'Identidades' : 'Distinct vibes'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="lg:col-span-5 z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.overview.stats.map((s, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-5 border border-neutral-800 hover:border-pink-500/30 transition flex flex-col justify-between gap-3 bg-black/60 backdrop-blur-md"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">{s.label}</span>
              <span className="text-xl sm:text-2xl font-extrabold leading-tight text-white">{s.value}</span>
              <span className="text-xs font-semibold text-pink-400/90">{s.highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
