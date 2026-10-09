'use client';

import React, { useState } from 'react';
import { X, BookOpen, ChevronLeft, ChevronRight, Sparkles, Train, AlertTriangle, Coffee } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

interface TriptychBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TriptychBrochureModal({ isOpen, onClose }: TriptychBrochureModalProps) {
  const { language } = useSiteContent();
  const isEs = language === 'es';

  const [activeSide, setActiveSide] = useState<'outer' | 'inner'>('outer');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-xl flex flex-col p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-pink-500/20 border border-pink-400 flex items-center justify-center text-pink-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              {isEs
                ? 'Tríptico Digital Interactivo (Formato de Folleto)'
                : 'Interactive 3-Fold Brochure (Tríptico Digital)'}
            </h2>
            <p className="text-xs text-neutral-400">
              {isEs
                ? 'Recreación digital e interactiva del tríptico físico de Andy'
                : 'Interactive recreation of Andy\'s physical Unit 5 travel brochure format'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Side Switcher */}
          <div className="flex items-center bg-neutral-900 border border-neutral-700 p-1 rounded-xl">
            <button
              onClick={() => setActiveSide('outer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeSide === 'outer'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {isEs ? 'Cara A: Exterior (Portada y Consejos)' : 'Side A: Outer Folds (Cover & Tips)'}
            </button>
            <button
              onClick={() => setActiveSide('inner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeSide === 'inner'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {isEs ? 'Cara B: Interior (Atracciones y Comida)' : 'Side B: Inside Spread (Attractions & Food)'}
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 flex items-center justify-center transition border border-neutral-600"
            title={isEs ? 'Cerrar Tríptico' : 'Close Brochure View'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main 3-Panel Brochure Spread */}
      <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full">
        {activeSide === 'outer' ? (
          /* SIDE A: Outer Folds */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-[#161922] border-2 border-neutral-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            {/* Panel 1: Important Reminders */}
            <div className="bg-[#1c2230] rounded-2xl p-5 border border-amber-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{isEs ? 'Panel 1 del Folleto' : 'Brochure Panel 1'}</span>
                </div>
                <h3 className="text-xl font-black text-amber-300 uppercase tracking-tight mb-4">
                  {isEs ? 'RECORDATORIOS IMPORTANTES' : 'IMPORTANT REMINDERS'}
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-neutral-900/70 rounded-xl border border-neutral-800">
                    <span className="font-bold text-white block mb-1">
                      🚶 {isEs ? 'No Comer Caminando' : 'No Eating While Walking'}
                    </span>
                    <p className="text-neutral-300">
                      {isEs ? (
                        <><strong>Los lugareños dicen no comer</strong> mientras se camina por aceras concurridas. Termina la comida junto al puesto.</>
                      ) : (
                        <><strong>Locals tell people not to eat</strong> while walking on crowded sidewalks. Finish food at stalls.</>
                      )}
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-900/70 rounded-xl border border-neutral-800">
                    <span className="font-bold text-white block mb-1">
                      🛂 {isEs ? 'Seguridad del Pasaporte' : 'Passport Safety'}
                    </span>
                    <p className="text-neutral-300">
                      {isEs ? (
                        <><strong>Las webs oficiales recuerdan a los turistas mantener</strong> sus pasaportes a buen recaudo y llevar copias físicas.</>
                      ) : (
                        <><strong>Official websites remind tourists to keep</strong> their passports safe and carry physical copies.</>
                      )}
                    </p>
                  </div>

                  <div className="p-3 bg-neutral-900/70 rounded-xl border border-neutral-800">
                    <span className="font-bold text-white block mb-1">
                      🤫 {isEs ? 'Silencio en los Trenes' : 'Quiet Train Commutes'}
                    </span>
                    <p className="text-neutral-300">
                      {isEs ? (
                        <><strong>Los carteles recuerdan a los pasajeros no hablar alto</strong> en el tren ni atender llamadas telefónicas.</>
                      ) : (
                        <><strong>Station signs remind passengers not to talk loudly</strong> on the train or take phone calls.</>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800 text-[10px] text-neutral-400">
                {isEs ? 'Enfoque de gramática: Órdenes y consejos reportados impersonales' : 'Grammar focus: Impersonal reported commands & advice'}
              </div>
            </div>

            {/* Panel 2: Tourist Problem & Solution */}
            <div className="bg-[#1c2230] rounded-2xl p-5 border border-cyan-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{isEs ? 'Panel 2 del Folleto' : 'Brochure Panel 2'}</span>
                </div>
                <h3 className="text-xl font-black text-cyan-300 uppercase tracking-tight mb-4">
                  {isEs ? 'PROBLEMAS Y SOLUCIONES' : 'TOURIST PROBLEM & SOLUTION'}
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-neutral-900/70 rounded-xl border border-cyan-500/20">
                    <div className="flex items-center gap-1.5 text-red-400 font-bold mb-1">
                      <Train className="w-3.5 h-3.5" />
                      <span>{isEs ? 'Estaciones: Desorientarse' : 'Train Stations: Getting Lost'}</span>
                    </div>
                    <p className="text-neutral-300 mb-2">
                      {isEs
                        ? 'Perderse dentro de terminales laberínticas gigantes como Shinjuku o Tokyo Station.'
                        : 'Getting lost inside massive train labyrinth stations like Shinjuku or Tokyo Station.'}
                    </p>
                    <div className="text-cyan-300 bg-cyan-950/40 p-2 rounded-lg border border-cyan-500/30">
                      <strong>{isEs ? 'Solución:' : 'Solution:'}</strong>{' '}
                      {isEs
                        ? 'Seguir la señalización aérea en inglés o pedir ayuda en la caseta de la estación (Koban).'
                        : 'Follow overhead English signage or ask the station staff at the gate booth (Koban).'}
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-900/70 rounded-xl border border-orange-500/20">
                    <div className="flex items-center gap-1.5 text-orange-400 font-bold mb-1">
                      <Coffee className="w-3.5 h-3.5" />
                      <span>{isEs ? '¿Cómo Pido Comida?' : 'How Do I Order Food?'}</span>
                    </div>
                    <p className="text-neutral-300 mb-2">
                      {isEs
                        ? 'Barrera del idioma al pedir en restaurantes tradicionales con menús en kanji japonés.'
                        : 'Language barrier when ordering food at traditional local restaurants where menus are exclusively written in Japanese characters.'}
                    </p>
                    <div className="text-orange-300 bg-orange-950/40 p-2 rounded-lg border border-orange-500/30">
                      <strong>{isEs ? 'Solución:' : 'Solution:'}</strong>{' '}
                      {isEs
                        ? 'Usar apps de traducción, mirar las réplicas realistas de comida (sampuru), o señalar y decir: "Kore o kudasai" ("Esto, por favor").'
                        : 'Use instant photo translation apps, choose dishes from realistic plastic food models (sampuru), or point and say: "Kore o kudasai" ("This one, please").'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800 text-[10px] text-neutral-400">
                Frase: これをください (Ko-reh oh koo-dah-sigh)
              </div>
            </div>

            {/* Panel 3: Cover Page */}
            <div className="bg-gradient-to-b from-[#2a1324] via-[#1f1025] to-[#140b19] rounded-2xl p-6 border-2 border-pink-500/40 flex flex-col justify-between text-center relative overflow-hidden shadow-[0_0_25px_rgba(255,42,133,0.2)]">
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-mono uppercase tracking-widest border border-pink-400/40 mb-3">
                  {isEs ? 'Portada del Tríptico' : 'Brochure Cover Page'}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
                  {isEs ? 'TOKIO: EL DESTINO TURÍSTICO DEFINITIVO' : 'TOKYO: THE ULTIMATE TOURIST DESTINATION'}
                </h3>
                <div className="w-16 h-1 bg-pink-500 mx-auto my-3 rounded-full shadow-[0_0_10px_#ff2a85]" />

                <p className="text-xs sm:text-sm text-pink-100/90 leading-relaxed max-w-xs mx-auto">
                  {isEs ? (
                    <>¡Una metrópolis <strong>famosa en el mundo</strong> y de <strong>alta tecnología</strong> donde la tradición se une al futuro!</>
                  ) : (
                    <>A <strong>world-famous</strong>, <strong>high-tech</strong> metropolis where ancient tradition meets the future!</>
                  )}
                </p>

                <div className="my-6 rounded-xl overflow-hidden border border-pink-500/30 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80"
                    alt="Sensoji Pagoda and Cherry Blossoms"
                    className="w-full h-36 object-cover"
                  />
                </div>
              </div>

              <div className="relative z-10 text-[11px] text-neutral-300 font-mono">
                {isEs ? 'Proyecto: Unidad 5 — Mi Ciudad, la Mejor Ciudad' : 'Project: Unit 5 — My Town, the Best Town • Tokyo, Japan'}
              </div>
            </div>
          </div>
        ) : (
          /* SIDE B: Inside Spread */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-[#161922] border-2 border-neutral-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            {/* Panel 4: Welcome & Getting Around */}
            <div className="bg-[#1c2230] rounded-2xl p-5 border border-emerald-500/20 flex flex-col justify-between text-xs">
              <div>
                <span className="text-emerald-400 font-mono uppercase text-[10px] block mb-1">
                  {isEs ? 'Panel 4 del Folleto' : 'Brochure Panel 4'}
                </span>
                <h3 className="text-lg font-black text-white uppercase mb-3">
                  {isEs ? 'BIENVENIDA A TOKIO' : 'WELCOME TO TOKYO'}
                </h3>

                <div className="space-y-3">
                  <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
                    <span className="font-bold text-emerald-300 block mb-1">
                      {isEs ? 'RESUMEN DE LA CIUDAD' : 'CITY OVERVIEW'}
                    </span>
                    <ul className="list-disc list-inside text-neutral-300 space-y-1">
                      <li>{isEs ? 'Capital de Japón, en la isla de Honshu.' : 'Capital of Japan, located on Honshu island.'}</li>
                      <li>{isEs ? 'Población: 14M en el centro; ~37M en el Gran Tokio.' : 'Population: 14M in city center; ~37M in metro area.'}</li>
                      <li>{isEs ? 'Clima: Subtropical; ideal en primavera y otoño.' : 'Climate: Subtropical; best to visit in spring & autumn.'}</li>
                    </ul>
                  </div>

                  <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
                    <span className="font-bold text-emerald-300 block mb-1">
                      {isEs ? 'CÓMO LLEGAR Y MOVERSE' : 'GETTING THERE & AROUND'}
                    </span>
                    <ul className="list-disc list-inside text-neutral-300 space-y-1">
                      <li>{isEs ? 'Llega por los aeropuertos de Haneda o Narita.' : 'Arrive through Haneda (HND) or Narita (NRT) airports.'}</li>
                      <li>{isEs ? 'Muévete usando la línea JR Yamanote y el metro.' : 'Get around using JR Yamanote train line and Tokyo Metro.'}</li>
                    </ul>
                  </div>

                  <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
                    <span className="font-bold text-emerald-300 block mb-1">
                      {isEs ? 'DATOS CLAVE Y COMPARATIVOS' : 'KEY FACTS & COMPARATIVES'}
                    </span>
                    <ul className="list-disc list-inside text-neutral-300 space-y-1">
                      <li>{isEs ? 'Tokio es más limpio y más rápido que la mayoría de capitales.' : 'Tokyo is cleaner and faster than most capital cities.'}</li>
                      <li>{isEs ? 'El centro es más costoso que los pueblos rurales.' : 'Central Tokyo is more expensive than peaceful towns.'}</li>
                      <li>{isEs ? 'El cruce de Shibuya es el más transitado del mundo.' : 'Shibuya Crossing is the busiest pedestrian intersection.'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 5: Must-See Attractions & Day Trip */}
            <div className="bg-[#1c2230] rounded-2xl p-5 border border-purple-500/20 flex flex-col justify-between text-xs">
              <div>
                <span className="text-purple-400 font-mono uppercase text-[10px] block mb-1">
                  {isEs ? 'Panel 5 del Folleto' : 'Brochure Panel 5'}
                </span>
                <h3 className="text-lg font-black text-white uppercase mb-3">
                  {isEs ? 'ATRACCIONES IMPERDIBLES' : 'MUST-SEE ATTRACTIONS'}
                </h3>

                <div className="space-y-2 mb-3">
                  <div className="p-2 bg-neutral-900/70 rounded-lg">
                    <strong className="text-white">Senso-ji:</strong> {isEs ? 'El templo budista más antiguo en Asakusa.' : 'Tokyo\'s oldest and most iconic Buddhist temple in Asakusa.'}
                  </div>
                  <div className="p-2 bg-neutral-900/70 rounded-lg">
                    <strong className="text-white">Shibuya:</strong> {isEs ? 'El corazón moderno con cruces de neón.' : 'The beating heart of Tokyo with famous neon-lit crosswalks.'}
                  </div>
                  <div className="p-2 bg-neutral-900/70 rounded-lg">
                    <strong className="text-white">Tokyo Skytree:</strong> {isEs ? 'Las vistas más impresionantes de 360 grados.' : 'Offers the most impressive 360-degree panoramic views.'}
                  </div>
                  <div className="p-2 bg-neutral-900/70 rounded-lg">
                    <strong className="text-white">Akihabara:</strong> {isEs ? 'Centro global de anime, videojuegos y electrónica.' : 'Global center of electronics, anime, gaming, and manga culture.'}
                  </div>
                  <div className="p-2 bg-neutral-900/70 rounded-lg">
                    <strong className="text-white">Santuario Meiji:</strong> {isEs ? 'Sereno refugio boscoso sagrado sintoísta.' : 'A serene, forested retreat dedicated to Emperor Meiji.'}
                  </div>
                </div>

                <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl">
                  <span className="font-bold text-purple-300 block mb-1">
                    {isEs ? 'EXCURSIÓN: KAMAKURA' : 'RECOMMENDED DAY TRIP: KAMAKURA'}
                  </span>
                  <p className="text-neutral-300">
                    {isEs
                      ? 'Pueblo costero a 1 hora al sur, famoso por su Gran Buda de bronce, jardines Zen y playas.'
                      : 'A charming historic coastal town just one hour south by train, famous for its giant bronze Buddha statue, peaceful Zen gardens, and beaches.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Panel 6: Typical Foods & Cultural Traditions */}
            <div className="bg-[#1c2230] rounded-2xl p-5 border border-pink-500/20 flex flex-col justify-between text-xs">
              <div>
                <span className="text-pink-400 font-mono uppercase text-[10px] block mb-1">
                  {isEs ? 'Panel 6 del Folleto' : 'Brochure Panel 6'}
                </span>
                <h3 className="text-lg font-black text-white uppercase mb-3">
                  {isEs ? 'GASTRONOMÍA Y TRADICIÓN' : 'FOODS & TRADITIONS'}
                </h3>

                <div className="space-y-3">
                  <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
                    <span className="font-bold text-pink-300 block mb-1">
                      {isEs ? 'COMIDAS TÍPICAS' : 'TYPICAL FOODS'}
                    </span>
                    <ul className="space-y-1.5 text-neutral-300">
                      <li>• <strong>Nigiri Sushi:</strong> {isEs ? 'Pescado crudo fresco sobre arroz vinagrado.' : 'Fresh raw fish served over vinegared rice.'}</li>
                      <li>• <strong>Tokyo Ramen:</strong> {isEs ? 'Fideos en rico caldo a base de soja (shoyu).' : 'Thin wheat noodles served in rich soy-based broth.'}</li>
                      <li>• <strong>Monjayaki:</strong> {isEs ? 'Masa salada cocinada en tu propia mesa con espátulas.' : 'Traditional savory pan-fried batter made right at your table.'}</li>
                    </ul>
                  </div>

                  <div className="bg-neutral-900/80 p-3 rounded-xl border border-neutral-800">
                    <span className="font-bold text-pink-300 block mb-1">
                      {isEs ? 'TRADICIONES CULTURALES' : 'CULTURAL TRADITIONS'}
                    </span>
                    <ul className="space-y-1.5 text-neutral-300">
                      <li>• <strong>Hanami:</strong> {isEs ? 'Picnics bajo los cerezos en flor.' : 'Spring picnics held under blooming cherry blossom trees.'}</li>
                      <li>• <strong>Sumo:</strong> {isEs ? 'Torneos nacionales sagrados en Ryogoku.' : 'Historic national tournaments held at Ryogoku Kokugikan.'}</li>
                      <li>• <strong>Kanda Matsuri:</strong> {isEs ? 'Gran festival con más de 200 mikoshi.' : 'Grand festival with over 200 portable mikoshi shrines.'}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800 text-[10px] text-neutral-400">
                {isEs ? 'Exposición Escolar • Inglés Unidad 5' : 'Created for Unit 5 Academic English Presentation'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Switch button */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => setActiveSide(activeSide === 'outer' ? 'inner' : 'outer')}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
        >
          {activeSide === 'outer' ? (
            <>
              <span>{isEs ? 'Voltear a la Cara Interior (Lado B)' : 'Flip to Inside Spread (Side B)'}</span>
              <ChevronRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>{isEs ? 'Voltear a la Cara Exterior (Lado A)' : 'Flip to Outer Folds (Side A)'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
