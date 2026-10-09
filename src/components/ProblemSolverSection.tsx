'use client';

import React, { useState } from 'react';
import { Sparkles, AlertTriangle, CheckCircle, Volume2 } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import EditableText from './EditableText';
import SubwayMapSimulation from './SubwayMapSimulation';

export default function ProblemSolverSection() {
  const { content, language } = useSiteContent();
  const isEs = language === 'es';

  const [playingPhrase, setPlayingPhrase] = useState(false);

  const speakJapanese = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      utterance.onstart = () => setPlayingPhrase(true);
      utterance.onend = () => setPlayingPhrase(false);
      utterance.onerror = () => setPlayingPhrase(false);
      window.speechSynthesis.speak(utterance);
    } catch {
      setPlayingPhrase(false);
    }
  };

  return (
    <section id="troubleshoot" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>
              {isEs
                ? 'Problemas del Turista y Soluciones Prácticas'
                : 'Tourist Problems & Practical Solutions'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            {isEs ? 'Solución a Problemas del Viajero' : 'Tourist Trouble-Shooter'}{' '}
            <span className="text-rose-400 text-2xl font-normal">🆘</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          {isEs
            ? 'Dos desafíos cotidianos que experimentan los turistas en Tokio, acompañados de soluciones prácticas y frases esenciales.'
            : 'Two common challenges faced by international travelers in Tokyo, paired with practical real-world solutions.'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: 2 Problem Cards (5/12 width on desktop) */}
        <div className="w-full lg:w-5/12 space-y-6 flex-shrink-0">
          {content.problemSolutions.map((item, idx) => (
            <div
              key={item.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800 hover:border-rose-500/30 transition flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <span className="text-xs font-mono uppercase text-rose-400 font-bold">
                    {item.context}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs border border-rose-500/30">
                    {isEs ? 'Caso Práctico' : 'Case Study'}
                  </span>
                </div>

                {/* Visual SVG Fallback */}
                <div className="h-40 w-full flex items-center justify-center bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden relative">
                  {idx === 0 ? (
                    <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
                      <rect width="400" height="200" fill="#2d2222" />
                      <rect x="20" y="20" width="100" height="160" fill="#3a2a2a" rx="8" />
                      <rect x="30" y="30" width="80" height="40" fill="#d97757" rx="4" />
                      <circle cx="70" cy="110" r="25" fill="#f4d03f" />
                      <circle cx="70" cy="150" r="15" fill="#e74c3c" />
                      <rect x="140" y="20" width="240" height="80" fill="#1e1e1e" rx="4" />
                      <text x="160" y="65" fill="#e74c3c" fontSize="24" fontFamily="sans-serif" fontWeight="bold">ラーメン</text>
                      <rect x="140" y="110" width="240" height="70" fill="#333" rx="4" />
                      <line x1="160" y1="130" x2="360" y2="130" stroke="#555" strokeWidth="4" />
                      <line x1="160" y1="150" x2="320" y2="150" stroke="#555" strokeWidth="4" />
                      <line x1="160" y1="170" x2="340" y2="170" stroke="#555" strokeWidth="4" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
                      <rect width="400" height="200" fill="#1c2833" />
                      <path d="M 0 160 L 400 160 L 400 200 L 0 200 Z" fill="#2c3e50" />
                      <rect x="40" y="40" width="120" height="30" fill="#f1c40f" rx="4" />
                      <rect x="180" y="40" width="180" height="30" fill="#3498db" rx="4" />
                      <circle cx="100" cy="55" r="8" fill="#000" opacity="0.5" />
                      <text x="210" y="60" fill="#fff" fontSize="14" fontFamily="sans-serif">Shinjuku Station</text>
                      <path d="M 50 140 Q 150 100 250 140 T 400 120" fill="none" stroke="#bdc3c7" strokeWidth="2" opacity="0.3" />
                      <circle cx="150" cy="160" r="6" fill="#e74c3c" />
                      <circle cx="250" cy="160" r="6" fill="#f1c40f" />
                      <circle cx="350" cy="160" r="6" fill="#2ecc71" />
                      {/* People Silhouettes */}
                      <circle cx="80" cy="140" r="5" fill="#7f8c8d" />
                      <rect x="75" y="145" width="10" height="15" fill="#7f8c8d" />
                      <circle cx="120" cy="145" r="4" fill="#95a5a6" />
                      <rect x="116" y="149" width="8" height="11" fill="#95a5a6" />
                      <circle cx="280" cy="135" r="6" fill="#7f8c8d" />
                      <rect x="274" y="141" width="12" height="19" fill="#7f8c8d" />
                    </svg>
                  )}
                </div>

                {/* The Problem */}
                <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>
                      {isEs ? `El Problema: ${item.title}` : `The Challenge: ${item.title}`}
                    </span>
                  </div>
                  <EditableText
                    id={`prob_${item.id}`}
                    defaultText={item.problem}
                    className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
                  />
                </div>

                {/* The Practical Solution */}
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isEs ? 'La Solución Práctica' : 'The Practical Solution'}</span>
                  </div>
                  <EditableText
                    id={`sol_${item.id}`}
                    defaultText={item.solution}
                    className="text-xs sm:text-sm text-neutral-300 leading-relaxed"
                  />
                </div>
              </div>

              {/* Interactive Audio Japanese Survival Phrase */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80 bg-neutral-900/80 p-4 rounded-2xl border border-neutral-700/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">
                    {isEs ? 'Frase Clave de Supervivencia:' : 'Essential Survival Phrase:'}
                  </span>
                  <button
                    onClick={() => speakJapanese(item.usefulJapanesePhrase)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition"
                    title={isEs ? 'Escuchar pronunciación' : 'Listen pronunciation'}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${playingPhrase ? 'animate-bounce text-white' : ''}`} />
                    <span>{playingPhrase ? (isEs ? 'Hablando...' : 'Speaking...') : (isEs ? 'Escuchar Audio' : 'Listen Audio')}</span>
                  </button>
                </div>

                <div className="font-bold text-white text-base sm:text-lg">
                  {item.usefulJapanesePhrase}
                </div>
                <div className="text-xs font-mono text-cyan-300 mt-0.5">
                  {item.phrasePronunciation}
                </div>
                <div className="text-xs text-neutral-400 italic mt-1">
                  &quot;{item.phraseMeaning}&quot;
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Right: Subway simulation (7/12 width on desktop, sticky) */}
        <div className="w-full lg:w-7/12 lg:sticky lg:top-24 mt-12 lg:mt-0">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            {isEs ? 'Explora las rutas del metro de Tokio' : 'Explore the Tokyo Subway Routes'}
          </h3>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto text-center mb-8">
            {isEs 
              ? 'Entender el sistema de trenes es clave para sobrevivir en la ciudad. Aquí hay una simulación rápida.' 
              : 'Understanding the train system is key to surviving the city. Here is a quick simulation.'}
          </p>
          <SubwayMapSimulation />
        </div>
      </div>
    </section>
  );
}
