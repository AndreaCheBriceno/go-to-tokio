'use client';

import React from 'react';
import { Sparkles, MapPin, Compass, Train, Clock } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';
import GrammarBadge from './GrammarBadge';

interface DayTripSectionProps {
  grammarActive: boolean;
}

export default function DayTripSection({ grammarActive }: DayTripSectionProps) {
  const { content } = useSiteContent();

  return (
    <section id="daytrip" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Rubric Requirement 8 • Recommended Day Excursion</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Day Trip: Historic Kamakura <span className="text-teal-400 text-2xl font-normal">鎌倉</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          A peaceful coastal sanctuary just 55 minutes south of Tokyo by direct train, famous for samurai heritage and monumental bronze artistry.
        </p>
      </div>

      {/* Main Showcase Banner */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-teal-500/30 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
        {/* Left Visual */}
        <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden">
          <img
            src={content.dayTrip.image}
            alt="Great Buddha of Kamakura"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#121622]" />
          <div className="absolute bottom-5 left-5 right-5">
            <span className="text-xs font-mono uppercase bg-teal-600/80 text-white px-3 py-1 rounded-full font-bold">
              Kanagawa Prefecture (神奈川)
            </span>
            <h3 className="text-2xl font-black text-white mt-2">
              The Great Buddha of Kotoku-in (高徳院の大仏)
            </h3>
          </div>
        </div>

        {/* Right Information & Timeline */}
        <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Transit Route Pill */}
            <div className="flex items-center gap-3 p-3 bg-neutral-900/80 rounded-2xl border border-neutral-800 text-xs">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                <Train className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <span className="text-neutral-400 block font-mono text-[10px]">Access Route:</span>
                <span className="text-white font-semibold">Tokyo Station → Kamakura Station (55 mins)</span>
              </div>
              <span className="text-teal-400 font-mono text-[11px] font-bold">JR Yokosuka Line</span>
            </div>

            {grammarActive ? (
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                For travelers seeking a break from the metropolis, Kamakura provides a quiet,{' '}
                <GrammarBadge type="compound" active={grammarActive}>
                  slow-paced
                </GrammarBadge>{' '}
                coastal escape. Surrounded by forested hills and the Pacific Ocean, this historic town served as the samurai capital of Japan in the 12th century.
              </p>
            ) : (
              <EditableText
                id="kamakura_desc"
                defaultText={content.dayTrip.description}
                className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
              />
            )}

            {/* Highlights List */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase font-mono tracking-wider text-teal-400 block font-bold">
                Must-Visit Highlights:
              </span>
              <ul className="space-y-2">
                {content.dayTrip.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-neutral-300 bg-neutral-900/50 p-2.5 rounded-xl border border-neutral-800/80"
                  >
                    <Compass className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800/80 text-[11px] text-neutral-400 flex justify-between items-center">
            <span>Recommended Duration: Full-day trip</span>
            <span className="text-teal-400 font-mono">Fare: ~¥950 each way</span>
          </div>
        </div>
      </div>
    </section>
  );
}
