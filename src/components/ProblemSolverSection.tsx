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

      {/* 2 Problem Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
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

              {/* Visual SVG */}
              <div className="h-32 w-full flex items-center justify-center bg-neutral-900 rounded-2xl border border-neutral-800">
                {idx === 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500"><path d="M12 2v20"/><path d="m3 11 9-9 9 9"/><path d="M3 15h18"/><path d="M3 7h18"/></svg>
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
      
      {/* Subway simulation */}
      <div className="mt-12 w-full">
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
    </section>
  );
}
