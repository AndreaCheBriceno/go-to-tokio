'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Swords, Trophy } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

type BoutStage = 'ready' | 'charge' | 'grapple' | 'finish';
type Winner = 'east' | 'west' | null;
type Kimarite = 'oshidashi' | 'yorikiri' | 'uwatenage';

const KIMARITES: Kimarite[] = ['oshidashi', 'yorikiri', 'uwatenage'];

export default function SumoRingInteractive() {
  const { language } = useSiteContent();
  const isEs = language === 'es';

  const [stage, setStage] = useState<BoutStage>('ready');
  const [winner, setWinner] = useState<Winner>(null);
  const [kimarite, setKimarite] = useState<Kimarite>('oshidashi');
  const [clashCount, setClashCount] = useState(0);

  // SVG group refs for manual rAF animation
  const eastRef = useRef<SVGGElement>(null);
  const westRef = useRef<SVGGElement>(null);
  const gyojiRef = useRef<SVGGElement>(null);
  
  const eastLegF = useRef<SVGGElement>(null);
  const eastLegB = useRef<SVGGElement>(null);
  const eastArmF = useRef<SVGGElement>(null);
  
  const westLegF = useRef<SVGGElement>(null);
  const westLegB = useRef<SVGGElement>(null);
  const westArmF = useRef<SVGGElement>(null);
  
  const saltEast = useRef<SVGCircleElement>(null);
  const saltWest = useRef<SVGCircleElement>(null);

  const reqRef = useRef<number | undefined>(undefined);
  const startTime = useRef<number>(0);
  
  const animState = useRef({
    active: false,
    winner: null as Winner,
    stage: 'ready' as BoutStage,
    startX: { east: 100, west: 700 }
  });

  const startBout = () => {
    if (animState.current.active) return;
    
    const win = Math.random() > 0.5 ? 'east' : 'west';
    const randomKimarite = KIMARITES[Math.floor(Math.random() * KIMARITES.length)];
    
    setWinner(null);
    setStage('charge'); // visually implies started
    
    animState.current = {
      active: true,
      winner: win as Winner,
      stage: 'charge',
      startX: { east: 100, west: 700 }
    };
    
    startTime.current = performance.now();
    reqRef.current = requestAnimationFrame(animate);
  };

  const resetBout = () => {
    cancelAnimationFrame(reqRef.current!);
    animState.current.active = false;
    animState.current.stage = 'ready';
    setStage('ready');
    setWinner(null);
    
    // reset transforms
    if (eastRef.current) eastRef.current.setAttribute('transform', `translate(100 200)`);
    if (westRef.current) westRef.current.setAttribute('transform', `translate(700 200)`);
    
    [eastLegF, eastLegB, eastArmF, westLegF, westLegB, westArmF].forEach(r => {
      if (r.current) r.current.setAttribute('transform', 'rotate(0)');
    });
    if (gyojiRef.current) gyojiRef.current.setAttribute('transform', 'translate(400 100)');
    if (saltEast.current) saltEast.current.setAttribute('opacity', '0');
    if (saltWest.current) saltWest.current.setAttribute('opacity', '0');
  };

  useEffect(() => {
    resetBout();
    return () => cancelAnimationFrame(reqRef.current!);
  }, []);

  const animate = (time: number) => {
    if (!animState.current.active) return;
    
    const elapsed = (time - startTime.current) / 1000;
    let ex = 100, ey = 200, erot = 0;
    let wx = 700, wy = 200, wrot = 0;
    
    let elf = 0, elb = 0, eaf = 0;
    let wlf = 0, wlb = 0, waf = 0;
    let saltO = 0, saltEx = 0, saltEy = 0, saltWx = 0, saltWy = 0;
    
    let gx = 400, gy = 100;

    if (elapsed < 3) {
      // Phase 1: Ritual (~3s)
      if (elapsed < 1) {
        // Stomp 1
        const p = elapsed;
        elf = Math.sin(p * Math.PI) * -45;
        eaf = Math.sin(p * Math.PI) * -30;
        ey = 200 - Math.sin(p * Math.PI) * 20;
        
        wlf = Math.sin(p * Math.PI) * -45;
        waf = Math.sin(p * Math.PI) * -30;
        wy = 200 - Math.sin(p * Math.PI) * 20;
      } else if (elapsed < 2) {
        // Stomp 2
        const p = elapsed - 1;
        elb = Math.sin(p * Math.PI) * 45;
        eaf = Math.sin(p * Math.PI) * -30;
        ey = 200 - Math.sin(p * Math.PI) * 20;
        
        wlb = Math.sin(p * Math.PI) * 45;
        waf = Math.sin(p * Math.PI) * -30;
        wy = 200 - Math.sin(p * Math.PI) * 20;
      } else {
        // Salt throw
        const p = elapsed - 2;
        eaf = Math.sin(p * Math.PI) * -80;
        waf = Math.sin(p * Math.PI) * -80;
        if (p > 0.3 && p < 0.8) {
          saltO = 1;
          saltEx = p * 100;
          saltEy = -p * 150 + (p*p)*200;
          saltWx = -p * 100;
          saltWy = -p * 150 + (p*p)*200;
        }
      }
    } else if (elapsed < 4) {
      // Phase 2: Charge (3 to 4s)
      const p = elapsed - 3;
      const ease = p * p; // accelerate
      ex = 100 + 250 * ease; // to 350
      wx = 700 - 250 * ease; // to 450
      eaf = 45; // arms forward
      waf = 45;
      ey = 220;
      wy = 220;
      gy = 70; // gyoji steps back
    } else if (elapsed < 10) {
      // Phase 3: Struggle (4 to 10s)
      const p = (elapsed - 4) / 6;
      const drift = animState.current.winner === 'east' ? 200 * p : -200 * p;
      const osc = Math.sin((elapsed - 4) * 15) * 20;
      ex = 350 + drift + osc;
      wx = 450 + drift + osc;
      ey = 220 + Math.sin(elapsed * 20) * 5;
      wy = 220 + Math.cos(elapsed * 20) * 5;
      eaf = 45 + Math.sin(elapsed * 10) * 10;
      waf = 45 + Math.cos(elapsed * 10) * 10;
      gy = 70;
      gx = 400 + drift * 0.5;
    } else if (elapsed < 13) {
      // Phase 4: Finish (10 to 13s)
      const p = Math.min((elapsed - 10) / 1.5, 1); // finishes over 1.5s
      const drift = animState.current.winner === 'east' ? 200 : -200;
      const baseXEast = 350 + drift;
      const baseXWest = 450 + drift;
      
      if (animState.current.winner === 'east') {
        ex = baseXEast + 50 * p;
        wx = baseXWest + 150 * p; // pushed out fast
        wrot = p * 90;
        wy = 220 + p * 100; // falling down
      } else {
        ex = baseXEast - 150 * p;
        wx = baseXWest - 50 * p;
        erot = -p * 90;
        ey = 220 + p * 100;
      }
      eaf = 45;
      waf = 45;
      gy = 70;
      gx = 400 + drift * 0.5;
    } else {
      // Done
      animState.current.active = false;
      animState.current.stage = 'finish';
      setWinner(animState.current.winner);
      
      // We know kimarite needs to be randomly set, but we generated it initially
      // Let's rely on React state for the banner
      setStage('finish');
      setClashCount(c => c + 1);
      return; // Stop animation loop
    }

    // Apply transforms
    if (eastRef.current) eastRef.current.setAttribute('transform', `translate(${ex} ${ey}) rotate(${erot})`);
    if (westRef.current) westRef.current.setAttribute('transform', `translate(${wx} ${wy}) rotate(${wrot})`);
    if (gyojiRef.current) gyojiRef.current.setAttribute('transform', `translate(${gx} ${gy})`);
    
    if (eastLegF.current) eastLegF.current.setAttribute('transform', `rotate(${elf})`);
    if (eastLegB.current) eastLegB.current.setAttribute('transform', `rotate(${elb})`);
    if (eastArmF.current) eastArmF.current.setAttribute('transform', `rotate(${eaf})`);
    
    if (westLegF.current) westLegF.current.setAttribute('transform', `rotate(${wlf})`);
    if (westLegB.current) westLegB.current.setAttribute('transform', `rotate(${wlb})`);
    if (westArmF.current) westArmF.current.setAttribute('transform', `rotate(${waf})`);
    
    if (saltEast.current) {
      saltEast.current.setAttribute('opacity', saltO.toString());
      saltEast.current.setAttribute('cx', saltEx.toString());
      saltEast.current.setAttribute('cy', saltEy.toString());
    }
    if (saltWest.current) {
      saltWest.current.setAttribute('opacity', saltO.toString());
      saltWest.current.setAttribute('cx', saltWx.toString());
      saltWest.current.setAttribute('cy', saltWy.toString());
    }

    reqRef.current = requestAnimationFrame(animate);
  };

  // Intersection observer for auto-start
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && stage === 'ready' && !animState.current.active) {
          startBout();
        }
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [stage]);

  const getKimariteLabel = (k: Kimarite) => {
    switch (k) {
      case 'oshidashi': return isEs ? 'Empujón frontal (Oshidashi)' : 'Frontal push out (Oshidashi)';
      case 'yorikiri': return isEs ? 'Fuerza frontal (Yorikiri)' : 'Frontal force out (Yorikiri)';
      case 'uwatenage': return isEs ? 'Proyección por encima (Uwatenage)' : 'Overarm throw (Uwatenage)';
    }
  };

  return (
    <div ref={containerRef} className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/30 overflow-hidden shadow-[0_0_35px_rgba(255,183,3,0.15)] my-8 bg-zinc-950">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Swords className="w-4 h-4 text-amber-400" />
            <span>{isEs ? 'Simulación Cultural Interactiva' : 'Interactive Cultural Simulation'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            {isEs ? 'Gran Torneo de Sumo' : 'Grand Sumo Tournament'} <span className="text-amber-300 text-base font-normal">大相撲</span>
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
                {stage === 'finish' ? (isEs ? '¡Otra pelea!' : 'Fight again!') : (isEs ? '¡Iniciar Combate!' : 'Start Bout!')}
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

      {/* Sumo Ring SVG Canvas */}
      <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#1a1a1a] border-2 border-amber-900/50">
        <svg viewBox="0 0 800 400" className="w-full h-auto block" style={{ aspectRatio: '2/1' }}>
          <defs>
            <radialGradient id="dohyoGrad" cx="50%" cy="50%" r="50%">
              <stop offset="80%" stopColor="#d2b48c" />
              <stop offset="100%" stopColor="#b89a6c" />
            </radialGradient>
          </defs>

          {/* Dohyo (ring) */}
          <ellipse cx="400" cy="200" rx="350" ry="150" fill="url(#dohyoGrad)" />
          {/* Tawara (rice straw bales) */}
          <ellipse cx="400" cy="200" rx="350" ry="150" fill="none" stroke="#8b4513" strokeWidth="12" strokeDasharray="40 10" />
          
          {/* Shikiri-sen (starting lines) */}
          <rect x="370" y="190" width="10" height="50" fill="white" />
          <rect x="420" y="190" width="10" height="50" fill="white" />

          {/* Gyoji (Referee) */}
          <g ref={gyojiRef} transform="translate(400 100)">
            <rect x="-15" y="-20" width="30" height="50" fill="#4B0082" />
            <circle cx="0" cy="-30" r="15" fill="#FFDEAD" />
            <path d="M-10 -30 Q0 -25 10 -30" stroke="black" strokeWidth="2" fill="none" />
            {/* Gunbai */}
            <g transform="translate(15, -10)">
              <line x1="0" y1="0" x2="20" y2="0" stroke="#8B4513" strokeWidth="4" />
              <path d="M20 -10 Q35 -10 35 10 Q20 10 20 0 Z" fill="#D2B48C" stroke="black" />
            </g>
          </g>

          {/* East Rikishi */}
          <g ref={eastRef} transform="translate(100 200)">
            {/* Shadows/Salt */}
            <ellipse cx="0" cy="80" rx="40" ry="15" fill="black" opacity="0.3" />
            <circle ref={saltEast} cx="0" cy="0" r="15" fill="white" opacity="0" filter="blur(2px)" />

            {/* Back Arm */}
            <g transform="translate(0, -10)"><path d="M 0 0 L 20 20 L 40 10" stroke="#deb887" strokeWidth="16" strokeLinecap="round" fill="none" /></g>
            
            {/* Back Leg */}
            <g transform="translate(0, 30)">
              <g ref={eastLegB}>
                <path d="M 0 0 L -15 30 L -5 50" stroke="#deb887" strokeWidth="18" strokeLinecap="round" fill="none" />
              </g>
            </g>
            
            {/* Body */}
            <ellipse cx="0" cy="0" rx="40" ry="45" fill="#f5deb3" />
            <circle cx="15" cy="-55" r="22" fill="#f5deb3" />
            
            {/* Face details */}
            <path d="M 10 -75 Q 25 -85 30 -65 Z" fill="black" /> {/* Hair */}
            <path d="M -5 -70 Q 5 -80 15 -70 Z" fill="black" /> {/* Chonmage base */}
            <circle cx="25" cy="-60" r="2" fill="black" /> {/* Eye */}
            
            {/* Mawashi */}
            <path d="M -15 30 L 35 30 L 35 50 L -15 50 Z" fill="#0ea5e9" />
            <path d="M 10 35 L 10 70" stroke="#0ea5e9" strokeWidth="8" strokeLinecap="round" />
            
            {/* Front Leg */}
            <g transform="translate(0, 30)">
              <g ref={eastLegF}>
                <path d="M 0 0 L 15 30 L 25 50" stroke="#f5deb3" strokeWidth="18" strokeLinecap="round" fill="none" />
              </g>
            </g>

            {/* Front Arm */}
            <g transform="translate(0, -10)">
              <g ref={eastArmF}>
                <path d="M 0 0 L 25 25 L 50 15" stroke="#f5deb3" strokeWidth="16" strokeLinecap="round" fill="none" />
              </g>
            </g>
            
            {/* Label */}
            <text x="0" y="-95" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">{isEs ? 'Este' : 'East'}</text>
          </g>

          {/* West Rikishi */}
          <g ref={westRef} transform="translate(700 200)">
            <g transform="scale(-1, 1)">
              {/* Shadows/Salt */}
              <ellipse cx="0" cy="80" rx="40" ry="15" fill="black" opacity="0.3" />
              <circle ref={saltWest} cx="0" cy="0" r="15" fill="white" opacity="0" filter="blur(2px)" />

              {/* Back Arm */}
              <g transform="translate(0, -10)"><path d="M 0 0 L 20 20 L 40 10" stroke="#eecfa1" strokeWidth="16" strokeLinecap="round" fill="none" /></g>
              
              {/* Back Leg */}
              <g transform="translate(0, 30)">
                <g ref={westLegB}>
                  <path d="M 0 0 L -15 30 L -5 50" stroke="#eecfa1" strokeWidth="18" strokeLinecap="round" fill="none" />
                </g>
              </g>
              
              {/* Body */}
              <ellipse cx="0" cy="0" rx="40" ry="45" fill="#ffdead" />
              <circle cx="15" cy="-55" r="22" fill="#ffdead" />
              
              {/* Face details */}
              <path d="M 10 -75 Q 25 -85 30 -65 Z" fill="black" />
              <path d="M -5 -70 Q 5 -80 15 -70 Z" fill="black" />
              <circle cx="25" cy="-60" r="2" fill="black" />
              
              {/* Mawashi */}
              <path d="M -15 30 L 35 30 L 35 50 L -15 50 Z" fill="#ef4444" />
              <path d="M 10 35 L 10 70" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
              
              {/* Front Leg */}
              <g transform="translate(0, 30)">
                <g ref={westLegF}>
                  <path d="M 0 0 L 15 30 L 25 50" stroke="#ffdead" strokeWidth="18" strokeLinecap="round" fill="none" />
                </g>
              </g>

              {/* Front Arm */}
              <g transform="translate(0, -10)">
                <g ref={westArmF}>
                  <path d="M 0 0 L 25 25 L 50 15" stroke="#ffdead" strokeWidth="16" strokeLinecap="round" fill="none" />
                </g>
              </g>
            </g>
            
            {/* Label (outside scale so it isn't backwards) */}
            <text x="0" y="-95" fill="#f87171" fontSize="16" fontWeight="bold" textAnchor="middle">{isEs ? 'Oeste' : 'West'}</text>
          </g>

        </svg>

        {/* Overlays */}
        {stage === 'finish' && winner && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-40 flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-500">
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
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-xs text-neutral-500">
        {isEs ? 'Combates:' : 'Bouts:'} {clashCount}
      </div>
    </div>
  );
}
