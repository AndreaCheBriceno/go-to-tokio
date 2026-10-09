'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, RotateCcw, Swords, Trophy } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

type BoutStage = 'ready' | 'charge' | 'grapple' | 'finish';
type Winner = 'east' | 'west' | null;
type Kimarite = 'oshidashi' | 'yorikiri' | 'uwatenage';

const KIMARITES: Kimarite[] = ['oshidashi', 'yorikiri', 'uwatenage'];

export default function SumoRingInteractive() {
  const { language } = useSiteContent();
  const isEs = language === 'es';
  const prefersReducedMotion = useReducedMotion();

  const [stage, setStage] = useState<BoutStage>('ready');
  const [winner, setWinner] = useState<Winner>(null);
  const [kimarite, setKimarite] = useState<Kimarite>('oshidashi');
  const [clashCount, setClashCount] = useState(0);

  const startBout = () => {
    if (stage !== 'ready' && stage !== 'finish') return;

    setWinner(null);
    setStage('charge');

    setTimeout(() => {
      setStage('grapple');
      setClashCount((c) => c + 1);

      setTimeout(() => {
        const win = Math.random() > 0.5 ? 'east' : 'west';
        const randomKimarite = KIMARITES[Math.floor(Math.random() * KIMARITES.length)];
        setWinner(win);
        setKimarite(randomKimarite);
        setStage('finish');
      }, prefersReducedMotion ? 500 : 3000);
    }, prefersReducedMotion ? 200 : 1200);
  };

  const resetBout = () => {
    setStage('ready');
    setWinner(null);
  };

  const getKimariteLabel = (k: Kimarite) => {
    switch (k) {
      case 'oshidashi': return isEs ? 'Empujón frontal (Oshidashi)' : 'Frontal push out (Oshidashi)';
      case 'yorikiri': return isEs ? 'Fuerza frontal (Yorikiri)' : 'Frontal force out (Yorikiri)';
      case 'uwatenage': return isEs ? 'Proyección por encima (Uwatenage)' : 'Overarm throw (Uwatenage)';
    }
  };

  const eastX = stage === 'ready' ? -80 : stage === 'charge' ? -40 : stage === 'grapple' ? -20 : winner === 'east' ? 0 : -100;
  const westX = stage === 'ready' ? 80 : stage === 'charge' ? 40 : stage === 'grapple' ? 20 : winner === 'west' ? 0 : 100;

  const eastAnimate = {
    x: prefersReducedMotion ? (winner === 'west' ? -100 : winner === 'east' ? 0 : -30) : eastX,
    y: stage === 'grapple' && !prefersReducedMotion ? [0, -10, 0] : 0,
    rotate: stage === 'finish' && winner === 'west' ? -90 : 0,
    opacity: stage === 'finish' && winner === 'west' ? 0.5 : 1
  };

  const westAnimate = {
    x: prefersReducedMotion ? (winner === 'east' ? 100 : winner === 'west' ? 0 : 30) : westX,
    y: stage === 'grapple' && !prefersReducedMotion ? [0, -10, 0] : 0,
    rotate: stage === 'finish' && winner === 'east' ? 90 : 0,
    opacity: stage === 'finish' && winner === 'east' ? 0.5 : 1
  };
  
  const gyojiAnimate = {
    rotate: stage === 'finish' ? (winner === 'east' ? -30 : 30) : 0,
    x: stage === 'finish' ? (winner === 'east' ? -20 : 20) : 0
  };

  return (
    <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 overflow-hidden shadow-[0_0_35px_rgba(255,183,3,0.15)] my-8 bg-zinc-950">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Swords className="w-4 h-4 text-amber-400" />
            <span>{isEs ? 'Simulación Cultural Interactiva' : 'Interactive Cultural Simulation'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            {isEs ? 'Gran Torneo de Sumo' : 'Grand Sumo Tournament'}{' '}
            <span className="text-amber-300 text-base font-normal">大相撲</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {stage === 'ready' || stage === 'finish' ? (
            <button
              onClick={startBout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-sm shadow-[0_0_20px_rgba(255,183,3,0.4)] transition transform hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>
                {stage === 'finish'
                  ? isEs ? '¡Otra pelea!' : 'Fight again!'
                  : isEs ? '¡Iniciar Combate!' : 'Start Bout!'}
              </span>
            </button>
          ) : (
            <button
              disabled
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/40 text-amber-200 font-bold text-sm animate-pulse cursor-not-allowed"
            >
              <Swords className="w-4 h-4 animate-spin" />
              <span>{isEs ? '¡Combate en Curso!' : 'Bout in Progress!'}</span>
            </button>
          )}

          {stage === 'finish' && (
            <button
              onClick={resetBout}
              className="p-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-600 transition"
              title={isEs ? 'Reiniciar' : 'Reset'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sumo Ring Canvas */}
      <div className="relative w-full max-w-3xl mx-auto h-80 sm:h-96 rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 border-2 border-amber-900/50">
        
        {/* Background / Dohyo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-900 to-black">
          {/* Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-[#d2b48c] rounded-[100%] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] border-8 border-dashed border-[#8b4513] opacity-80 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-zinc-800/50" />
          {/* Shikiri-sen */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8">
            <div className="w-2 h-12 bg-white/80 rounded-sm" />
            <div className="w-2 h-12 bg-white/80 rounded-sm" />
          </div>
        </div>

        {/* Action Area */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          
          {/* Gyoji (Referee) */}
          <motion.div 
            className="absolute top-[20%] left-1/2 -ml-8"
            animate={gyojiAnimate}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <svg width="64" height="64" viewBox="0 0 100 100">
              <rect x="35" y="40" width="30" height="50" fill="#4B0082" />
              <circle cx="50" cy="30" r="15" fill="#FFDEAD" />
              <path d="M40 30 Q50 35 60 30" stroke="black" strokeWidth="2" fill="none" />
              <circle cx="45" cy="25" r="2" fill="black" />
              <circle cx="55" cy="25" r="2" fill="black" />
              {/* Gunbai */}
              <g transform="translate(60, 45)">
                <line x1="0" y1="0" x2="20" y2="0" stroke="#8B4513" strokeWidth="4" />
                <path d="M20 -10 Q35 -10 35 10 Q20 10 20 0 Z" fill="#D2B48C" stroke="black" strokeWidth="1" />
              </g>
            </svg>
          </motion.div>

          {/* East Rikishi */}
          <motion.div
            className="absolute"
            animate={eastAnimate}
            transition={
              stage === 'grapple'
                ? { repeat: Infinity, duration: 0.3, repeatType: 'reverse' }
                : { type: 'spring', stiffness: stage === 'charge' ? 300 : 100, damping: 20 }
            }
          >
            <svg width="100" height="120" viewBox="0 0 100 120" className="drop-shadow-2xl">
              <g>
                <circle cx="50" cy="30" r="18" fill="#F5DEB3" />
                {/* Chonmage */}
                <path d="M45 12 Q50 0 55 12 L50 20 Z" fill="black" />
                <ellipse cx="50" cy="18" rx="12" ry="8" fill="black" />
                {/* Face */}
                <line x1="42" y1="28" x2="48" y2="30" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <line x1="58" y1="28" x2="52" y2="30" stroke="black" strokeWidth="2" strokeLinecap="round" />
                {/* Body */}
                <ellipse cx="50" cy="70" rx="35" ry="30" fill="#F5DEB3" />
                {/* Mawashi */}
                <rect x="20" y="80" width="60" height="20" rx="4" fill="#0ea5e9" />
                <path d="M40 100 L45 115 L55 115 L60 100 Z" fill="#0ea5e9" />
                {/* Arms */}
                <path d={stage === 'grapple' ? "M 15 60 Q 50 70 70 50" : "M 15 60 Q 25 80 40 70"} stroke="#F5DEB3" strokeWidth="14" strokeLinecap="round" fill="none" />
                <path d={stage === 'grapple' ? "M 85 60 Q 50 70 30 50" : "M 85 60 Q 75 80 60 70"} stroke="#F5DEB3" strokeWidth="14" strokeLinecap="round" fill="none" />
              </g>
            </svg>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-sky-400 bg-black/60 px-2 py-0.5 rounded-full whitespace-nowrap">
              {isEs ? 'Este' : 'East'}
            </div>
          </motion.div>

          {/* West Rikishi */}
          <motion.div
            className="absolute scale-x-[-1]"
            animate={westAnimate}
            transition={
              stage === 'grapple'
                ? { repeat: Infinity, duration: 0.3, repeatType: 'reverse', delay: 0.1 }
                : { type: 'spring', stiffness: stage === 'charge' ? 300 : 100, damping: 20 }
            }
          >
            <svg width="100" height="120" viewBox="0 0 100 120" className="drop-shadow-2xl">
              <g>
                <circle cx="50" cy="30" r="18" fill="#FFDEAD" />
                {/* Chonmage */}
                <path d="M45 12 Q50 0 55 12 L50 20 Z" fill="black" />
                <ellipse cx="50" cy="18" rx="12" ry="8" fill="black" />
                {/* Face */}
                <line x1="42" y1="28" x2="48" y2="30" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <line x1="58" y1="28" x2="52" y2="30" stroke="black" strokeWidth="2" strokeLinecap="round" />
                {/* Body */}
                <ellipse cx="50" cy="70" rx="35" ry="30" fill="#FFDEAD" />
                {/* Mawashi */}
                <rect x="20" y="80" width="60" height="20" rx="4" fill="#ef4444" />
                <path d="M40 100 L45 115 L55 115 L60 100 Z" fill="#ef4444" />
                {/* Arms */}
                <path d={stage === 'grapple' ? "M 15 60 Q 50 70 70 50" : "M 15 60 Q 25 80 40 70"} stroke="#FFDEAD" strokeWidth="14" strokeLinecap="round" fill="none" />
                <path d={stage === 'grapple' ? "M 85 60 Q 50 70 30 50" : "M 85 60 Q 75 80 60 70"} stroke="#FFDEAD" strokeWidth="14" strokeLinecap="round" fill="none" />
              </g>
            </svg>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-400 bg-black/60 px-2 py-0.5 rounded-full whitespace-nowrap scale-x-[-1]">
              {isEs ? 'Oeste' : 'West'}
            </div>
          </motion.div>

        </div>

        {/* Overlays */}
        <AnimatePresence>
          {stage === 'grapple' && !prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="text-3xl font-black text-amber-300 drop-shadow-[0_0_15px_#ffb703]">
                💥 {isEs ? '¡EMPUJE!' : 'NOKOTTA!'}
              </div>
            </motion.div>
          )}

          {stage === 'finish' && winner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center p-4 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(255,183,3,0.5)]">
                <Trophy className="w-8 h-8 text-amber-400" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-white mb-2">
                {winner === 'east'
                  ? (isEs ? '¡Gana el Este!' : 'East Wins!')
                  : (isEs ? '¡Gana el Oeste!' : 'West Wins!')}
              </h4>
              <p className="text-lg text-amber-300 font-bold mb-6 bg-black/50 px-4 py-1 rounded-lg border border-amber-500/30">
                {getKimariteLabel(kimarite)}
              </p>
              <button
                onClick={startBout}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-sm uppercase tracking-wider shadow-lg hover:brightness-110 transition"
              >
                {isEs ? 'Otra pelea' : 'Fight again'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 text-center text-xs text-neutral-500">
        {isEs ? 'Combates:' : 'Bouts:'} {clashCount}
      </div>
    </div>
  );
}
