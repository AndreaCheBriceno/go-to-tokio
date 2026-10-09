'use client';

import React from 'react';
import { Sparkles, Building2, Map, ShieldCheck, Zap } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';
import GrammarBadge from './GrammarBadge';

interface CityOverviewSectionProps {
  grammarActive: boolean;
}

export default function CityOverviewSection({ grammarActive }: CityOverviewSectionProps) {
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
                ? 'Requisito de Rúbrica 1 • Perfil y Demografía de la Ciudad'
                : 'Rubric Requirement 1 • City Profile & Demographics'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {isEs ? 'Resumen de la Metrópolis' : 'Metropolis Overview'}{' '}
            <span className="text-pink-400 text-2xl font-normal">都市概要</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          {isEs
            ? 'Una capital mundial densamente poblada pero excepcionalmente pacífica y segura, donde la infraestructura de punta convive con siglos de tradición Edo.'
            : 'A densely-populated yet exceptionally peaceful world capital, where cutting-edge infrastructure blends with centuries of Edo tradition.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Narrative Card */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800 flex flex-col justify-between space-y-6">
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

            {grammarActive ? (
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed space-y-3">
                {isEs ? (
                  <>
                    Tokio es la capital de Japón, ubicada en la costa oriental de la isla principal de Honshu. Es una metrópolis{' '}
                    <GrammarBadge type="compound" active={grammarActive}>
                      densely-populated (densamente poblada)
                    </GrammarBadge>
                    {' '}pero extraordinariamente organizada, hogar de más de 14 millones de personas en el centro y más de 37 millones en su área metropolitana. El centro de Tokio es{' '}
                    <GrammarBadge type="comparative" active={grammarActive}>
                      cleaner and faster than (más limpio y más rápido que)
                    </GrammarBadge>
                    {' '}la gran mayoría de las capitales mundiales.
                  </>
                ) : (
                  <>
                    Tokyo is the capital city of Japan, located on the eastern coastline of the main island of Honshu. It is a{' '}
                    <GrammarBadge type="compound" active={grammarActive}>
                      densely-populated
                    </GrammarBadge>{' '}
                    yet exceptionally organized metropolis, home to approximately 14 million people in the city center and more than 37 million residents across the broader metropolitan area. Central Tokyo is{' '}
                    <GrammarBadge type="comparative" active={grammarActive}>
                      cleaner and faster than
                    </GrammarBadge>{' '}
                    most capital cities in the world.
                  </>
                )}
              </p>
            ) : (
              <EditableText
                id="city_overview"
                defaultText={content.overview.description}
                className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
              />
            )}
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
                {isEs ? 'Puntualidad en segundos' : 'Sub-minute transit'}
              </span>
            </div>
            <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 col-span-2 sm:col-span-1">
              <Map className="w-4 h-4 text-pink-400 mb-1" />
              <span className="font-bold text-white block">
                {isEs ? '23 Distritos' : '23 Special Wards'}
              </span>
              <span className="text-[11px] text-neutral-400">
                {isEs ? 'Identidades únicas' : 'Distinct cultural vibes'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.overview.stats.map((s, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-2xl p-5 border border-neutral-800 hover:border-pink-500/30 transition flex flex-col justify-between"
            >
              <span className="text-[11px] font-mono uppercase text-neutral-400">{s.label}</span>
              <div className="my-2">
                <span className="text-2xl font-black text-white">{s.value}</span>
              </div>
              <span className="text-[11px] font-semibold text-pink-400/90">{s.highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
