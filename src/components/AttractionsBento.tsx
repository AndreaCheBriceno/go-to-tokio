'use client';

import React from 'react';
import { Sparkles, MapPin, Tag } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';
import GrammarBadge from './GrammarBadge';

interface AttractionsBentoProps {
  grammarActive: boolean;
}

export default function AttractionsBento({ grammarActive }: AttractionsBentoProps) {
  const { content } = useSiteContent();

  return (
    <section id="attractions" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Rubric Requirement 4 • Core Travel Destination Guide</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Top 5 Must-See Attractions <span className="text-cyan-400 text-2xl font-normal">名所</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          Explore the contrasting faces of Tokyo: ancient 7th-century shrines, neon pedestrian scrambles, soaring towers, and subculture meccas.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Attraction 1: Senso-ji Temple (Large Card, spans 7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-red-500/40 transition group flex flex-col justify-between">
          <div className="relative h-72 sm:h-80 overflow-hidden">
            <img
              src={content.attractions[0].image}
              alt={content.attractions[0].name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-red-600/80 backdrop-blur-md text-white font-mono text-xs font-bold shadow-lg">
                #1 Ancient Heritage
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-neutral-200 text-xs border border-white/10">
                {content.attractions[0].district}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-red-400 text-xs font-mono font-bold block">
                {content.attractions[0].japanese}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {content.attractions[0].name}
              </h3>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <EditableText
              id="sensoji_desc"
              defaultText={content.attractions[0].description}
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
            />

            <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800/80">
              {content.attractions[0].highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 text-xs border border-neutral-800 flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-red-400" />
                  <span>{h}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Attraction 2: Shibuya Crossing (Spans 5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-cyan-500/40 transition group flex flex-col justify-between">
          <div className="relative h-64 sm:h-72 overflow-hidden">
            <img
              src={content.attractions[1].image}
              alt={content.attractions[1].name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-600/80 backdrop-blur-md text-white font-mono text-xs font-bold shadow-lg">
                #2 Urban Center
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-cyan-400 text-xs font-mono font-bold block">
                {content.attractions[1].japanese}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {content.attractions[1].name}
              </h3>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {grammarActive ? (
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                The beating heart of modern Tokyo with famous neon-lit crosswalks. Globally recognized as{' '}
                <GrammarBadge type="superlative" active={grammarActive}>
                  the busiest
                </GrammarBadge>{' '}
                pedestrian intersection in the world, where thousands cross together under massive video billboards.
              </p>
            ) : (
              <EditableText
                id="shibuya_desc"
                defaultText={content.attractions[1].description}
                className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
              />
            )}

            <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800/80">
              {content.attractions[1].highlights.map((h, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 text-xs border border-neutral-800 flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-cyan-400" />
                  <span>{h}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Attraction 3: Tokyo Skytree (Spans 4 cols) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-purple-500/40 transition group flex flex-col justify-between">
          <div className="relative h-60 overflow-hidden">
            <img
              src={content.attractions[2].image}
              alt={content.attractions[2].name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-purple-600/80 backdrop-blur-md text-white font-mono text-xs font-bold">
                #3 Panoramic View
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-purple-400 text-xs font-mono font-bold block">
                {content.attractions[2].japanese}
              </span>
              <h3 className="text-xl font-black text-white">{content.attractions[2].name}</h3>
            </div>
          </div>

          <div className="p-5 space-y-3">
            {grammarActive ? (
              <p className="text-xs text-neutral-300 leading-relaxed">
                Rising 634 meters above the metropolis, its glass decks offer{' '}
                <GrammarBadge type="superlative" active={grammarActive}>
                  the most impressive
                </GrammarBadge>{' '}
                360-degree views of the entire region, with Mount Fuji visible on clear days.
              </p>
            ) : (
              <EditableText
                id="skytree_desc"
                defaultText={content.attractions[2].description}
                className="text-xs text-neutral-300 leading-relaxed"
              />
            )}

            <div className="pt-2 border-t border-neutral-800 flex flex-wrap gap-1.5">
              {content.attractions[2].highlights.map((h, i) => (
                <span key={i} className="text-[11px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Attraction 4: Akihabara Electric Town (Spans 4 cols) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-pink-500/40 transition group flex flex-col justify-between">
          <div className="relative h-60 overflow-hidden">
            <img
              src={content.attractions[3].image}
              alt={content.attractions[3].name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-pink-600/80 backdrop-blur-md text-white font-mono text-xs font-bold">
                #4 Anime &amp; Tech
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-pink-400 text-xs font-mono font-bold block">
                {content.attractions[3].japanese}
              </span>
              <h3 className="text-xl font-black text-white">{content.attractions[3].name}</h3>
            </div>
          </div>

          <div className="p-5 space-y-3">
            {grammarActive ? (
              <p className="text-xs text-neutral-300 leading-relaxed">
                The global center of electronics, anime, gaming, and manga culture. Akihabara represents Tokyo&apos;s{' '}
                <GrammarBadge type="compound" active={grammarActive}>
                  high-tech
                </GrammarBadge>{' '}
                identity with multi-floor arcades and electronics superstores.
              </p>
            ) : (
              <EditableText
                id="akihabara_desc"
                defaultText={content.attractions[3].description}
                className="text-xs text-neutral-300 leading-relaxed"
              />
            )}

            <div className="pt-2 border-t border-neutral-800 flex flex-wrap gap-1.5">
              {content.attractions[3].highlights.map((h, i) => (
                <span key={i} className="text-[11px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Attraction 5: Meiji Jingu Shrine (Spans 4 cols) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl overflow-hidden border border-neutral-800 hover:border-emerald-500/40 transition group flex flex-col justify-between">
          <div className="relative h-60 overflow-hidden">
            <img
              src={content.attractions[4].image}
              alt={content.attractions[4].name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-emerald-600/80 backdrop-blur-md text-white font-mono text-xs font-bold">
                #5 Sacred Forest
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-emerald-400 text-xs font-mono font-bold block">
                {content.attractions[4].japanese}
              </span>
              <h3 className="text-xl font-black text-white">{content.attractions[4].name}</h3>
            </div>
          </div>

          <div className="p-5 space-y-3">
            <EditableText
              id="meiji_desc"
              defaultText={content.attractions[4].description}
              className="text-xs text-neutral-300 leading-relaxed"
            />

            <div className="pt-2 border-t border-neutral-800 flex flex-wrap gap-1.5">
              {content.attractions[4].highlights.map((h, i) => (
                <span key={i} className="text-[11px] bg-neutral-900 text-neutral-300 px-2 py-0.5 rounded">
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
