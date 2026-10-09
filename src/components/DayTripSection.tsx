/* eslint-disable */
'use client';

import React, { useState } from 'react';
import { Sparkles, Compass, Train, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';

export default function DayTripSection() {
  const { content, language } = useSiteContent();
  const isEs = language === 'es';
  
  const images = [
    '/images/kamakura/buddha.jpg',
    '/images/kamakura/hokokuji.jpg',
    '/images/kamakura/yuigahama.jpg'
  ];
  
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="daytrip" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>
              {isEs
                ? 'Excursión de 1 Día Recomendada'
                : 'Recommended Day Excursion'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {isEs ? 'Excursión: Kamakura Histórico' : 'Day Trip: Historic Kamakura'}{' '}
            <span className="text-teal-400 text-2xl font-normal">🌊</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          {isEs
            ? 'Un pacífico santuario costero a solo 55 minutos al sur de Tokio en tren directo, célebre por su legado samurai y su monumental Buda de bronce.'
            : 'A peaceful coastal sanctuary just 55 minutes south of Tokyo by direct train, famous for samurai heritage and monumental bronze artistry.'}
        </p>
      </div>

      {/* Main Showcase Banner */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-teal-500/30 grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
        {/* Left Visual - Small Gallery */}
        <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden group">
          <img
            src={images[currentImage]}
            alt="Kamakura"
            className="w-full h-full object-cover transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#121622]" />
          
          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition">
            <ChevronLeft />
          </button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition">
            <ChevronRight />
          </button>
          
          <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
            <div>
              <span className="text-xs font-mono uppercase bg-teal-600/80 text-white px-3 py-1 rounded-full font-bold">
                {isEs ? 'Prefectura de Kanagawa' : 'Kanagawa Prefecture'}
              </span>
              <h3 className="text-2xl font-black text-white mt-2">
                {currentImage === 0 && (isEs ? 'El Gran Buda de Kotoku-in' : 'The Great Buddha of Kotoku-in')}
                {currentImage === 1 && (isEs ? 'Bosque de Bambú Hokokuji' : 'Hokokuji Bamboo Grove')}
                {currentImage === 2 && (isEs ? 'Playa Yuigahama' : 'Yuigahama Beach')}
              </h3>
            </div>
            <div className="flex gap-1.5 pb-2 pr-2">
              {images.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${currentImage === i ? 'bg-white' : 'bg-white/30'}`} />
              ))}
            </div>
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
                <span className="text-neutral-400 block font-mono text-[10px]">
                  {isEs ? 'Ruta de Acceso:' : 'Access Route:'}
                </span>
                <span className="text-white font-semibold">
                  {isEs ? 'Estación de Tokio ➔ Estación de Kamakura (55 mins)' : 'Tokyo Station ➔ Kamakura Station (55 mins)'}
                </span>
              </div>
              <span className="text-teal-400 font-mono text-[11px] font-bold">JR Yokosuka Line</span>
            </div>

            <EditableText
              id="kamakura_desc"
              defaultText={content.dayTrip.description}
              className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
            />

            {/* Highlights List */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase font-mono tracking-wider text-teal-400 block font-bold">
                {isEs ? 'Lugares Destacados:' : 'Must-Visit Highlights:'}
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
            <span>{isEs ? 'Duración recomendada: Excursión de día completo' : 'Recommended Duration: Full-day trip'}</span>
            <span className="text-teal-400 font-mono">{isEs ? 'Tarifa: ~¥950 por trayecto' : 'Fare: ~¥950 each way'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

