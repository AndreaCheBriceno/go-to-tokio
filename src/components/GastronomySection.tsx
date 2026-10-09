/* eslint-disable */
'use client';

import React, { useState } from 'react';
import { Sparkles, FlipHorizontal } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import EditableText from './EditableText';

export default function GastronomySection() {
  const { content, language } = useSiteContent();
  const isEs = language === 'es';
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="gastronomy" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>
              {isEs
                ? 'Gastronomía Auténtica de Tokio'
                : 'Authentic Tokyo Gastronomy'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {isEs ? 'Cultura Culinaria de Tokio' : 'Tokyo Food Culture'}{' '}
            <span className="text-orange-400 text-2xl font-normal">🍜</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          {isEs
            ? 'Desde los puestos callejeros de la era Edo hasta los humeantes callejones de fideos. Descubre 3 platos esenciales en nuestra galería interactiva.'
            : 'From Edo-period street fish counters to steamy noodle alleyways. Discover 3 quintessential dishes in our interactive gallery.'}
        </p>
      </div>

      {/* Foods Flip Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 perspective-1000">
        {content.gastronomy.map((food) => (
          <div 
            key={food.id || food.name} 
            className="relative h-96 w-full cursor-pointer group"
            onClick={() => toggleFlip(food.id || food.name)}
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="w-full h-full relative preserve-3d"
              initial={false}
              animate={{ rotateY: flippedCards[food.id || food.name] ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front side */}
              <div 
                className="absolute w-full h-full backface-hidden glass-panel rounded-3xl overflow-hidden border border-neutral-800"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="h-2/3 relative">
                  <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute top-4 right-4">
                     <span className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur rounded-lg text-xs text-orange-300">
                       <FlipHorizontal className="w-3 h-3" /> {isEs ? 'Voltear' : 'Flip'}
                     </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="text-orange-400 text-xs font-mono font-bold block">{food.japanese}</span>
                    <h3 className="text-2xl font-black text-white">{food.name}</h3>
                  </div>
                </div>
                <div className="h-1/3 p-4 bg-neutral-900/80">
                  <EditableText
                    id={food.id + "_desc"}
                    defaultText={food.description}
                    className="text-sm text-neutral-300 line-clamp-3"
                  />
                </div>
              </div>

              {/* Back side */}
              <div 
                className="absolute w-full h-full backface-hidden glass-panel rounded-3xl overflow-hidden border border-orange-500/30 bg-neutral-900 p-6 flex flex-col justify-center items-center text-center"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <div className="text-orange-400 mb-4">
                  <Sparkles className="w-8 h-8 mx-auto" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{isEs ? 'Dato Curioso' : 'Fun Fact'}</h4>
                <p className="text-sm text-neutral-300 mb-6 italic">
                  {food.funFact || (isEs ? 'Un plato delicioso amado por los locales y viajeros por igual. Prueba encontrar el mejor lugar escondido en la ciudad.' : 'A delicious dish loved by locals and travelers alike. Try finding the best hidden spot in the city.')}
                </p>
                <div className="mt-auto w-full">
                  <h5 className="text-xs font-bold text-orange-300 uppercase tracking-widest mb-2 border-b border-neutral-800 pb-2">
                    {isEs ? 'Mejores Zonas' : 'Best Spots'}
                  </h5>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(food.bestSpots ? food.bestSpots.split(',') : ['Shinjuku', 'Shibuya', 'Asakusa']).map((spot: string, i: number) => (
                      <span key={i} className="px-2 py-1 bg-neutral-800 text-neutral-200 text-xs rounded">
                        {spot}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                   <span className="text-[10px] text-neutral-500 uppercase tracking-widest">
                     {isEs ? 'Toca para volver' : 'Tap to return'}
                   </span>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}

