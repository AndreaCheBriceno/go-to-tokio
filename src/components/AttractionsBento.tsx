/* eslint-disable */
'use client';

import React, { useState } from 'react';
import { Sparkles, Tag, ChevronDown } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';
import { motion, AnimatePresence } from 'framer-motion';

export default function AttractionsBento() {
  const { content, language } = useSiteContent();
  const isEs = language === 'es';
  const [openIndex, setOpenIndex] = useState<number>(0);

  const ordinalsEn = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
  const ordinalsEs = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto'];
  const ordinals = isEs ? ordinalsEs : ordinalsEn;

  return (
    <section id="attractions" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>
              {isEs
                ? 'Guía Principal de 5 Destinos'
                : 'Core Travel Destination Guide'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {isEs ? '5 Atracciones Imperdibles' : 'Top 5 Must-See Attractions'}{' '}
            <span className="text-cyan-400 text-2xl font-normal">🗼</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          {isEs
            ? 'Explora las caras contrastantes de Tokio: templos milenarios del siglo VII, cruces peatonales iluminados por neón, torres colosales y mecas de la cultura pop.'
            : 'Explore the contrasting faces of Tokyo: ancient 7th-century shrines, neon pedestrian scrambles, soaring towers, and subculture meccas.'}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {content.attractions.slice(0, 5).map((attraction, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              layout
              key={attraction.name}
              className="glass-panel rounded-3xl overflow-hidden border border-neutral-800 cursor-pointer"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
            >
              <motion.div layout className="p-5 flex items-center justify-between bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-600/80 text-white font-mono text-xs font-bold shadow-lg">
                    {ordinals[i]}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">{attraction.name}</h3>
                  <span className="text-cyan-400 text-xs font-mono font-bold hidden sm:block">
                    {attraction.japanese}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-neutral-400" />
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-1/2 h-64 md:h-80 relative rounded-2xl overflow-hidden shrink-0">
                        <img
                          src={attraction.image}
                          alt={attraction.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                           <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-neutral-200 text-xs border border-white/10">
                            {attraction.district}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center space-y-4">
                        <EditableText
                          id={"attraction_desc_" + i}
                          defaultText={attraction.description}
                          className="text-sm sm:text-base text-neutral-300 leading-relaxed"
                        />
                        
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-800/80">
                          {attraction.highlights.map((h, hidx) => (
                            <span
                              key={hidx}
                              className="px-2.5 py-1 rounded-lg bg-neutral-900 text-neutral-300 text-xs border border-neutral-800 flex items-center gap-1.5"
                            >
                              <Tag className="w-3 h-3 text-cyan-400" />
                              <span>{h}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
