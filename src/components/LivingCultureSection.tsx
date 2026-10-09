'use client';

import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';
import InteractiveSakuraTree from './InteractiveSakuraTree';
import SumoRingInteractive from './SumoRingInteractive';

interface LivingCultureSectionProps {
  grammarActive: boolean;
  onShakeSakura: (x: number, y: number) => void;
  ambientSakura: boolean;
  onToggleAmbientSakura: () => void;
}

export default function LivingCultureSection({
  grammarActive,
  onShakeSakura,
  ambientSakura,
  onToggleAmbientSakura,
}: LivingCultureSectionProps) {
  const { content, language } = useSiteContent();
  const isEs = language === 'es';

  return (
    <section id="culture" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>
              {isEs
                ? 'Requisitos de Rúbrica 6 y 7 • Tradiciones y Festivales'
                : 'Rubric Requirements 6 & 7 • Traditions & Festivals'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {isEs ? 'Cultura Viva y Tradición' : 'Living Culture & Heritage'}{' '}
            <span className="text-pink-400 text-2xl font-normal">伝統</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          {isEs
            ? 'Ve más allá de los rascacielos iluminados para conectar con el alma espiritual de Tokio: picnics bajo los cerezos en flor, combates atronadores de Sumo y ancestrales procesiones sintoístas.'
            : 'Step beyond the neon skyscrapers into Tokyo\'s spiritual roots: spring cherry blossom picnics, thundering Sumo bouts, and ancient Shinto processions.'}
        </p>
      </div>

      {/* Feature 1: Interactive Sakura Blossom Tree */}
      <InteractiveSakuraTree
        onShake={onShakeSakura}
        ambient={ambientSakura}
        onToggleAmbient={onToggleAmbientSakura}
      />

      {/* Feature 2: Interactive Sumo Wrestling Arena Simulation */}
      <SumoRingInteractive />

      {/* Feature 3: Grand Festival Showcase (Kanda Matsuri) */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800 hover:border-pink-500/30 transition mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 h-64 rounded-2xl overflow-hidden relative shadow-lg">
          <img
            src={content.traditions[2].image}
            alt={content.traditions[2].name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-mono text-pink-400 bg-black/60 px-2 py-0.5 rounded">
              {isEs ? 'Gran Festival Sintoísta (祭)' : 'Major Shinto Festival (祭)'}
            </span>
            <h4 className="text-xl font-bold text-white mt-1">{content.traditions[2].name}</h4>
          </div>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono">
            <Calendar className="w-4 h-4" />
            <span>
              {isEs
                ? 'Celebrado en Años Impares a Mediados de Mayo • Santuario Kanda Myojin'
                : 'Celebrated Biennially in Mid-May • Kanda Myojin Shrine'}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white">
            {isEs
              ? 'La Gran Procesión Histórica de Kanda Matsuri'
              : 'The Historic Kanda Matsuri Grand Procession'}
          </h3>
          <EditableText
            id="kanda_desc"
            defaultText={content.traditions[2].description}
            className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
          />
          <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 text-xs text-neutral-300">
            <strong>{isEs ? 'Puntos Clave:' : 'Key Highlights:'}</strong>{' '}
            {isEs
              ? 'Más de 200 santuarios portátiles mikoshi transportados por miles de feligreses con indumentaria de la época Edo para otorgar prosperidad a la ciudad.'
              : 'Over 200 portable mikoshi shrines carried by thousands of parishioners in historical Edo garments to bring blessings to the metropolis.'}
          </div>
        </div>
      </div>
    </section>
  );
}
