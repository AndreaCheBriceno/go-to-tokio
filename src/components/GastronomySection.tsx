'use client';

import React from 'react';
import { Sparkles, Utensils } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import RamenCreatorInteractive from './RamenCreatorInteractive';
import GrammarBadge from './GrammarBadge';

interface GastronomySectionProps {
  grammarActive: boolean;
}

export default function GastronomySection({ grammarActive }: GastronomySectionProps) {
  const { content } = useSiteContent();

  return (
    <section id="gastronomy" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>Rubric Requirement 5 • Authentic Tokyo Gastronomy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Tokyo Food Culture <span className="text-orange-400 text-2xl font-normal">美食</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          From Edo-period street fish counters to steamy noodle alleyways. Discover 3 quintessential dishes and build your own custom bowl in our interactive ramen studio.
        </p>
      </div>

      {/* Comparative Dining Callout */}
      <div className="bg-neutral-900/90 border border-orange-500/30 rounded-2xl p-4 mb-8 text-xs text-orange-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse shrink-0" />
          <span>
            {grammarActive ? (
              <span>
                Eating at a neighborhood ramen shop is{' '}
                <GrammarBadge type="comparative" active={grammarActive}>
                  less expensive than
                </GrammarBadge>{' '}
                reserving a dinner at a luxury sushi restaurant, but both offer an authentic taste of Japanese cuisine.
              </span>
            ) : (
              <span>Eating at a neighborhood ramen shop is <strong>less expensive than</strong> reserving a dinner at a luxury sushi restaurant, but both offer an authentic taste of Japanese cuisine.</span>
            )}
          </span>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/60 text-orange-300 shrink-0">
          Comparative Grammar
        </span>
      </div>

      {/* Interactive Ramen Creator and 3 Foods */}
      <RamenCreatorInteractive foods={content.gastronomy} />
    </section>
  );
}
