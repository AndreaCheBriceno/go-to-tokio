'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Swords, Trophy } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

type BoutStage = 'ready' | 'charge' | 'grapple' | 'finish';

export default function SumoRingInteractive() {
  const { language } = useSiteContent();
  const isEs = language === 'es';

  const [stage, setStage] = useState<BoutStage>('ready');
  const [winner, setWinner] = useState<'east' | 'west' | null>(null);
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
        setWinner(win);
        setStage('finish');
      }, 2200);
    }, 1000);
  };

  const resetBout = () => {
    setStage('ready');
    setWinner(null);
  };

  return (
    <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 overflow-hidden shadow-[0_0_35px_rgba(255,183,3,0.15)] my-8">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Swords className="w-4 h-4 text-amber-400" />
            <span>
              {isEs
                ? 'Simulación Cultural Interactiva • Ryogoku Kokugikan'
                : 'Interactive Cultural Simulation • Ryogoku Kokugikan'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            {isEs ? 'Gran Torneo Oficial de Sumo' : 'Grand Sumo Tournament Bout'}{' '}
            <span className="text-amber-300 text-base font-normal">大相撲 (本場所)</span>
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
                  ? isEs ? '¡Revancha! (もう一度)' : 'Rematch! (もう一度)'
                  : isEs ? '¡Iniciar Combate! (はっけよい!)' : 'Start Bout! (はっけよい!)'}
              </span>
            </button>
          ) : (
            <button
              disabled
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/40 text-amber-200 font-bold text-sm animate-pulse cursor-not-allowed"
            >
              <Swords className="w-4 h-4 animate-spin" />
              <span>{isEs ? '¡Combate en Curso! (残った!)' : 'Bout in Progress! (残った!)'}</span>
            </button>
          )}

          {stage === 'finish' && (
            <button
              onClick={resetBout}
              className="p-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-600 transition"
              title={isEs ? 'Reiniciar Arena' : 'Reset Ring'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-neutral-300 mb-6">
        {isEs
          ? 'El sumo es el deporte nacional sagrado y ritual sintoísta milenario de Japón con más de 1,500 años de historia. Los luchadores purifican el círculo de arena sagrado (Dohyo) arrojando sal antes de lanzarse a toda velocidad. ¡Inicia un combate interactivo a continuación!'
          : 'Sumo is Japan’s ancient national sport and Shinto sacred ritual dating back 1,500 years. Wrestlers purify the sand ring (Dohyo) by tossing sacred salt before charging at explosive speed. Experience an interactive bout below!'}
      </p>

      {/* The Sumo Arena Ring (Dohyo) */}
      <div className="relative w-full max-w-2xl mx-auto h-72 sm:h-84 bg-gradient-to-b from-[#2a221b] to-[#1a1410] rounded-2xl border-4 border-[#8c6b45] p-4 flex flex-col justify-between overflow-hidden shadow-inner">
        {/* Shinto Straw Bale Ring (Tawara) */}
        <div className="absolute inset-4 m-auto w-64 sm:w-80 h-48 sm:h-60 rounded-full border-4 border-dashed border-[#cbb382] bg-[#3a2f24]/80 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-12">
            <div className="w-1.5 h-10 bg-white/70 rounded-full shadow-sm" />
            <div className="w-1.5 h-10 bg-white/70 rounded-full shadow-sm" />
          </div>
        </div>

        {/* Top Arena Banner */}
        <div className="relative z-10 flex justify-between items-center text-xs font-mono px-3 py-1 bg-black/50 backdrop-blur rounded-lg border border-amber-500/20 text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="font-bold text-blue-400">{isEs ? 'Este: Hakuho (白鵬)' : 'East: Hakuho (白鵬)'}</span>
          </div>
          <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
            {stage === 'ready' && (isEs ? 'Purificación con Sal (塩まき)' : 'Ritual Purification (塩まき)')}
            {stage === 'charge' && (isEs ? '¡CARGA TACHI-AI! (立ち合い)' : 'TACHI-AI! CHARGE! (立ち合い)')}
            {stage === 'grapple' && (isEs ? '¡NOKOTTA! ¡EMPUJE! (残った!)' : 'NOKOTTA! NOKOTTA! (残った!)')}
            {stage === 'finish' &&
              (isEs
                ? `¡VICTORIA: ${winner === 'east' ? 'ESTE (HAKUHO)' : 'OESTE (TERUNOFUJI)'}!`
                : `VICTORY: ${winner === 'east' ? 'EAST (HAKUHO)' : 'WEST (TERUNOFUJI)'}!`)}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-red-400">{isEs ? 'Oeste: Terunofuji (照ノ富士)' : 'West: Terunofuji (照ノ富士)'}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          </div>
        </div>

        {/* Animated Wrestlers */}
        <div className="relative flex-1 flex items-center justify-center">
          {stage === 'grapple' && (
            <div className="absolute z-20 inset-0 m-auto w-24 h-24 flex items-center justify-center animate-ping pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-amber-400/50 blur-sm border-2 border-white" />
            </div>
          )}

          {stage === 'grapple' && (
            <div className="absolute z-30 inset-0 m-auto flex items-center justify-center pointer-events-none">
              <span className="text-2xl sm:text-3xl font-black text-amber-300 drop-shadow-[0_0_15px_#ffb703] animate-bounce">
                💥 DOSSU! (ドスッ!)
              </span>
            </div>
          )}

          {/* East Wrestler */}
          <div
            className={`absolute transition-all duration-700 ease-out flex flex-col items-center select-none ${
              stage === 'ready'
                ? 'left-12 sm:left-20 translate-y-0'
                : stage === 'charge'
                ? 'left-1/3 sm:left-40 scale-105'
                : stage === 'grapple'
                ? 'left-1/2 -translate-x-12 sm:-translate-x-14 scale-110 animate-pulse'
                : winner === 'east'
                ? 'left-1/2 -translate-x-8 scale-115'
                : 'left-4 sm:left-8 translate-y-6 rotate-12 opacity-80'
            }`}
          >
            <svg viewBox="0 0 100 110" className="w-20 sm:w-26 h-22 sm:h-28 drop-shadow-xl">
              <ellipse cx="50" cy="18" rx="8" ry="6" fill="#111" />
              <rect x="47" y="10" width="6" height="8" rx="3" fill="#111" />
              <circle cx="50" cy="30" r="16" fill="#f8c8a0" />
              <line x1="42" y1="28" x2="48" y2="30" stroke="#111" strokeWidth="2" strokeLinecap="round" />
              <line x1="58" y1="28" x2="52" y2="30" stroke="#111" strokeWidth="2" strokeLinecap="round" />
              <path d="M 46 38 Q 50 36 54 38" stroke="#111" strokeWidth="2" fill="none" />
              <ellipse cx="50" cy="62" rx="28" ry="24" fill="#f8c8a0" />
              <path
                d={stage === 'grapple' ? 'M 22 55 Q 50 65 65 52' : 'M 22 55 Q 35 75 45 65'}
                stroke="#f8c8a0"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={stage === 'grapple' ? 'M 78 55 Q 50 65 35 52' : 'M 78 55 Q 65 75 55 65'}
                stroke="#f8c8a0"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              <rect x="30" y="70" width="40" height="15" rx="3" fill="#1e3a8a" />
              <rect x="45" y="80" width="10" height="14" fill="#1e3a8a" />
              <ellipse cx="38" cy="95" rx="9" ry="12" fill="#f8c8a0" />
              <ellipse cx="62" cy="95" rx="9" ry="12" fill="#f8c8a0" />
            </svg>
            <span className="text-[10px] font-bold text-blue-400 bg-black/60 px-2 py-0.5 rounded-full mt-1">
              Hakuho (東)
            </span>
          </div>

          {/* West Wrestler */}
          <div
            className={`absolute transition-all duration-700 ease-out flex flex-col items-center select-none ${
              stage === 'ready'
                ? 'right-12 sm:right-20 translate-y-0 scale-x-[-1]'
                : stage === 'charge'
                ? 'right-1/3 sm:right-40 scale-x-[-1] scale-105'
                : stage === 'grapple'
                ? 'right-1/2 translate-x-12 sm:translate-x-14 scale-x-[-1] scale-110 animate-pulse'
                : winner === 'west'
                ? 'right-1/2 translate-x-8 scale-x-[-1] scale-115'
                : 'right-4 sm:right-8 translate-y-6 -rotate-12 opacity-80 scale-x-[-1]'
            }`}
          >
            <svg viewBox="0 0 100 110" className="w-20 sm:w-26 h-22 sm:h-28 drop-shadow-xl">
              <ellipse cx="50" cy="18" rx="8" ry="6" fill="#111" />
              <rect x="47" y="10" width="6" height="8" rx="3" fill="#111" />
              <circle cx="50" cy="30" r="16" fill="#f2ba8b" />
              <line x1="42" y1="28" x2="48" y2="30" stroke="#111" strokeWidth="2" strokeLinecap="round" />
              <line x1="58" y1="28" x2="52" y2="30" stroke="#111" strokeWidth="2" strokeLinecap="round" />
              <path d="M 46 38 Q 50 36 54 38" stroke="#111" strokeWidth="2" fill="none" />
              <ellipse cx="50" cy="62" rx="28" ry="24" fill="#f2ba8b" />
              <path
                d={stage === 'grapple' ? 'M 22 55 Q 50 65 65 52' : 'M 22 55 Q 35 75 45 65'}
                stroke="#f2ba8b"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={stage === 'grapple' ? 'M 78 55 Q 50 65 35 52' : 'M 78 55 Q 65 75 55 65'}
                stroke="#f2ba8b"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              <rect x="30" y="70" width="40" height="15" rx="3" fill="#dc2626" />
              <rect x="45" y="80" width="10" height="14" fill="#dc2626" />
              <ellipse cx="38" cy="95" rx="9" ry="12" fill="#f2ba8b" />
              <ellipse cx="62" cy="95" rx="9" ry="12" fill="#f2ba8b" />
            </svg>
            <span className="text-[10px] font-bold text-red-400 bg-black/60 px-2 py-0.5 rounded-full mt-1 scale-x-[-1]">
              Terunofuji (西)
            </span>
          </div>
        </div>

        {/* Victory Celebration Overlay */}
        {stage === 'finish' && winner && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-40 flex flex-col items-center justify-center p-4 text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(255,183,3,0.5)]">
              <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              {winner === 'east'
                ? isEs ? '¡Hakuho Gana por Yorikiri! (白鵬の勝ち)' : 'Hakuho Wins by Yorikiri! (白鵬の勝ち)'
                : isEs ? '¡Terunofuji Gana por Oshidashi! (照ノ富士の勝ち)' : 'Terunofuji Wins by Oshidashi! (照ノ富士の勝ち)'}
            </h4>
            <p className="text-xs sm:text-sm text-amber-200 mt-1 max-w-md">
              {isEs
                ? 'El árbitro sagrado (Gyoji) apunta con su abanico ceremonial (Gunbai) al vencedor. Los torneos de Tokio honran las tradiciones de pureza de hace más de quince siglos.'
                : 'The referee (Gyoji) points the sacred war fan (Gunbai) to the winner! The tournament honors ancient Shinto traditions dating back more than 15 centuries.'}
            </p>
            <button
              onClick={startBout}
              className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition"
            >
              {isEs ? 'Iniciar Otro Combate' : 'Start Another Bout'}
            </button>
          </div>
        )}

        {/* Bottom Arena Footer */}
        <div className="relative z-10 flex justify-between items-center text-[10px] text-neutral-400 border-t border-amber-500/10 pt-1">
          <span>{isEs ? 'Purificación: Bendiciones sintoístas' : 'Purification Salt: Purified with Shinto blessings'}</span>
          <span>
            {isEs ? 'Combates en esta sesión:' : 'Bouts Fought in Session:'}{' '}
            <strong className="text-amber-400">{clashCount}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
