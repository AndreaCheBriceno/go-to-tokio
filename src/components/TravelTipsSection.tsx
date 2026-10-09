'use client';

import React from 'react';
import { Sparkles, Coins, Trash2, Wifi, VolumeX, UtensilsCrossed, AlertCircle } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

const ICON_MAP: Record<string, React.ReactNode> = {
  Coins: <Coins className="w-5 h-5 text-amber-400" />,
  Trash2: <Trash2 className="w-5 h-5 text-emerald-400" />,
  Wifi: <Wifi className="w-5 h-5 text-cyan-400" />,
  VolumeX: <VolumeX className="w-5 h-5 text-purple-400" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5 text-pink-400" />,
};

export default function TravelTipsSection() {
  const { content, language } = useSiteContent();
  const isEs = language === 'es';

  return (
    <section id="tips" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              {isEs
                ? 'Consejos de Viaje'
                : 'Travel Tips'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {isEs ? '5 Consejos Esenciales de Viaje' : '5 Essential Travel Tips'}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          {isEs
            ? 'Muévete por Tokio como un habitante local. Cada consejo combina recomendaciones prácticas con consejos de viaje.'
            : 'Navigate Tokyo with the poise of a local. Every tip pairs practical travel advice with helpful tips.'}
        </p>
      </div>

      {/* Grid of 5 Travel Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.travelTips.map((tip) => (
          <div
            key={tip.id}
            className="glass-panel rounded-3xl p-6 border border-neutral-800 hover:border-amber-500/40 transition flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  {ICON_MAP[tip.icon] || <AlertCircle className="w-5 h-5 text-amber-400" />}
                </div>
                <span className="text-xs font-mono font-bold text-neutral-400 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800">
                  {isEs ? `Consejo #${tip.number}` : `Tip #${tip.number}`}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-amber-300 transition">
                {tip.title}
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                {tip.practicalTip}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
