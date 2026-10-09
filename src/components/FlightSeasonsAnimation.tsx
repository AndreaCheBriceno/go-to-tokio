'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';

interface Season {
  id: SeasonId;
  en: string;
  es: string;
  emoji: string;
  months: { en: string; es: string };
  outbound: boolean; // true: Mexico -> Tokyo, false: Tokyo -> Mexico
  accent: string;
}

const SEASONS: Season[] = [
  { id: 'spring', en: 'Spring', es: 'Primavera', emoji: '🌸', months: { en: 'Mar – May', es: 'Mar – May' }, outbound: true, accent: '#f472b6' },
  { id: 'summer', en: 'Summer', es: 'Verano', emoji: '☀️', months: { en: 'Jun – Aug', es: 'Jun – Ago' }, outbound: false, accent: '#fbbf24' },
  { id: 'autumn', en: 'Autumn', es: 'Otoño', emoji: '🍁', months: { en: 'Sep – Nov', es: 'Sep – Nov' }, outbound: true, accent: '#fb923c' },
  { id: 'winter', en: 'Winter', es: 'Invierno', emoji: '❄️', months: { en: 'Dec – Feb', es: 'Dic – Feb' }, outbound: false, accent: '#38bdf8' },
];

const SEASON_MS = 6500; // Duration per season in ms
const FLIGHT_START = 0.05;
const FLIGHT_END = 0.85;

// Coordinates in SVG viewBox (920 x 460)
const MEX = { x: 172, y: 298 };
const TYO = { x: 772, y: 222 };
const CTRL = { x: 472, y: 70 };

function getBezier(t: number, p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const clamped = Math.max(0, Math.min(1, t));
  const u = 1 - clamped;
  const x = u * u * p0.x + 2 * u * clamped * p1.x + clamped * clamped * p2.x;
  const y = u * u * p0.y + 2 * u * clamped * p1.y + clamped * clamped * p2.y;
  const dx = 2 * u * (p1.x - p0.x) + 2 * clamped * (p2.x - p1.x);
  const dy = 2 * u * (p1.y - p0.y) + 2 * clamped * (p2.y - p1.y);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  return { x, y, angle };
}

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function FlightSeasonsAnimation({ className = '' }: { className?: string }) {
  const { language } = useSiteContent();
  const isEs = language === 'es';

  const [seasonIndex, setSeasonIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [flightState, setFlightState] = useState({
    x: MEX.x,
    y: MEX.y,
    angle: -25,
    progress: 0,
    cycleFraction: 0,
    arrived: false,
  });

  const season = SEASONS[seasonIndex];
  const origin = season.outbound ? MEX : TYO;
  const destination = season.outbound ? TYO : MEX;
  const pathD = `M ${origin.x} ${origin.y} Q ${CTRL.x} ${CTRL.y} ${destination.x} ${destination.y}`;

  // Dedicated continuous animation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsed = 0;

    const tick = (now: number) => {
      animationFrameId = requestAnimationFrame(tick);
      if (paused) {
        lastTime = now;
        return;
      }

      const delta = Math.min(100, now - lastTime);
      lastTime = now;
      elapsed += delta;

      if (elapsed >= SEASON_MS) {
        elapsed = 0;
        setSeasonIndex((prev) => (prev + 1) % SEASONS.length);
        return;
      }

      const cycleFraction = elapsed / SEASON_MS;
      let p = 0;
      if (cycleFraction > FLIGHT_START && cycleFraction < FLIGHT_END) {
        p = ease((cycleFraction - FLIGHT_START) / (FLIGHT_END - FLIGHT_START));
      } else if (cycleFraction >= FLIGHT_END) {
        p = 1;
      }

      const currentOrigin = SEASONS[seasonIndex].outbound ? MEX : TYO;
      const currentDest = SEASONS[seasonIndex].outbound ? TYO : MEX;
      const { x, y, angle } = getBezier(p, currentOrigin, CTRL, currentDest);

      setFlightState({
        x,
        y,
        angle,
        progress: p,
        cycleFraction,
        arrived: cycleFraction >= FLIGHT_END,
      });
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [paused, seasonIndex]);

  const selectSeason = (i: number) => {
    setSeasonIndex(i);
  };

  const caption = season.outbound
    ? (isEs ? `${season.es}: Vuelo hacia Tokio (México ✈️ Tokio)` : `${season.en}: Flight to Tokyo (Mexico ✈️ Tokyo)`)
    : (isEs ? `${season.es}: Vuelo de regreso a México (Tokio ✈️ México)` : `${season.en}: Return flight home (Tokyo ✈️ Mexico)`);
  
  const sub = season.outbound
    ? (isEs ? '🌸 ¡Temporada ideal para viajar a Japón!' : '🌸 Best travel season to visit Japan!')
    : (isEs ? '🏡 Temporada baja: retorno a casa' : '🏡 Low season: returning home');

  return (
    <div className={`relative rounded-3xl border border-neutral-800 bg-[#070a12] overflow-hidden shadow-2xl ${className}`}>
      {/* Header: Season Tabs & Pause/Play */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-4 pb-2 border-b border-neutral-800/80">
        <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-2xl border border-neutral-800">
          {SEASONS.map((s, i) => {
            const isSelected = i === seasonIndex;
            return (
              <button
                key={s.id}
                onClick={() => selectSeason(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isSelected ? 'shadow-lg text-slate-950 scale-105' : 'text-neutral-400 hover:text-white'
                }`}
                style={{ backgroundColor: isSelected ? s.accent : 'transparent' }}
              >
                <span>{s.emoji}</span>
                <span className="hidden sm:inline">{isEs ? s.es : s.en}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setPaused((p) => !p)}
          className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:text-white flex items-center gap-1.5 text-xs font-mono cursor-pointer transition hover:bg-neutral-800"
          aria-label={paused ? 'Resume' : 'Pause'}
        >
          {paused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
          <span className="hidden sm:inline">{paused ? (isEs ? 'Reanudar' : 'Pausar') : (isEs ? 'Pausar' : 'Pause')}</span>
        </button>
      </div>

      {/* Progress Bar of Current Season Cycle */}
      <div className="w-full h-1 bg-neutral-950 overflow-hidden">
        <div
          className="h-full transition-all duration-100 ease-linear"
          style={{
            width: `${flightState.cycleFraction * 100}%`,
            backgroundColor: season.accent,
            boxShadow: `0 0 10px ${season.accent}`,
          }}
        />
      </div>

      {/* Interactive Flight Map SVG */}
      <div className="relative w-full">
        <svg viewBox="0 0 920 460" className="w-full h-auto block select-none" role="img" aria-label={caption}>
          <defs>
            <filter id="flight-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="ocean-bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#050811" />
              <stop offset="50%" stopColor="#080e1e" />
              <stop offset="100%" stopColor="#050811" />
            </linearGradient>
          </defs>

          {/* Deep Ocean Backdrop */}
          <rect x="0" y="0" width="920" height="460" fill="url(#ocean-bg)" />

          {/* Navigational Coordinate Grid */}
          <g stroke="#38bdf8" strokeOpacity="0.12" strokeDasharray="3 6">
            <line x1="0" x2="920" y1="110" y2="110" />
            <line x1="0" x2="920" y1="210" y2="210" />
            <line x1="0" x2="920" y1="310" y2="310" />
            <line x1="0" x2="920" y1="410" y2="410" />
            <line x1="230" x2="230" y1="0" y2="460" />
            <line x1="460" x2="460" y1="0" y2="460" />
            <line x1="690" x2="690" y1="0" y2="460" />
          </g>

          <text x="460" y="420" textAnchor="middle" fill="#334155" fontSize="11" letterSpacing="6" fontWeight="bold">
            {isEs ? 'PACÍFICO • CORREDOR TRANSOCEÁNICO (11,300 KM)' : 'PACIFIC OCEAN • TRANSOCEANIC CORRIDOR (11,300 KM)'}
          </text>

          {/* Landmass: MEXICO (Left) */}
          <g filter="url(#flight-glow)" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.8" strokeLinejoin="round">
            {/* Baja California */}
            <path d="M 82 188 C 76 200, 80 230, 92 260 C 100 278, 108 296, 114 306 C 117 304, 113 286, 106 266 C 97 238, 92 210, 89 188 Z" />
            {/* Mainland Mexico */}
            <path d="M 96 196 L 128 194 L 158 206 L 178 214 L 198 228 L 194 254 L 202 280 L 214 298 L 236 286 L 258 282 L 272 290 L 268 310 L 250 314 L 236 312 L 224 338 L 206 346 L 185 334 L 165 316 L 148 296 L 132 270 L 118 242 L 108 220 L 96 196 Z" />
          </g>

          {/* Landmass: JAPAN (Right) */}
          <g filter="url(#flight-glow)" fill="#0f172a" stroke={season.accent} strokeWidth="1.8" strokeLinejoin="round">
            {/* Hokkaido */}
            <path d="M 792 104 C 818 96, 836 106, 842 120 C 836 134, 816 138, 800 146 C 785 142, 775 130, 775 122 C 775 114, 784 108, 792 104 Z" />
            {/* Honshu */}
            <path d="M 778 150 C 788 175, 788 200, 780 218 C 778 230, 768 236, 758 244 C 746 254, 736 270, 724 266 C 704 264, 684 270, 668 274 C 680 254, 708 244, 730 228 C 734 210, 744 204, 742 218 C 752 216, 766 190, 774 166, 778 150 Z" />
            {/* Shikoku */}
            <path d="M 698 276 C 715 272, 732 276, 734 288 C 728 298, 712 300, 700 296 C 692 290, 692 280, 698 276 Z" />
            {/* Kyushu */}
            <path d="M 650 290 C 664 282, 680 290, 678 306 C 670 322, 654 322, 646 308 C 642 300, 644 294, 650 290 Z" />
          </g>

          {/* Background Flight Route Guideline */}
          <path
            d={`M ${MEX.x} ${MEX.y} Q ${CTRL.x} ${CTRL.y} ${TYO.x} ${TYO.y}`}
            fill="none"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 8"
          />

          {/* Active Glowing Flight Trail following the plane */}
          <path
            d={pathD}
            fill="none"
            stroke={season.accent}
            strokeWidth="4"
            strokeDasharray="680"
            strokeDashoffset={680 * (1 - flightState.progress)}
            strokeLinecap="round"
            filter="url(#flight-glow)"
          />

          {/* MEXICO Destination/Origin Pin */}
          <g transform={`translate(${MEX.x}, ${MEX.y})`}>
            {flightState.arrived && !season.outbound && (
              <circle r="16" fill="none" stroke="#22d3ee" strokeWidth="2" className="animate-ping" />
            )}
            <circle r="7" fill="#22d3ee" stroke="#ffffff" strokeWidth="2" />
            <circle r="3" fill="#ffffff" />
            <text y="28" textAnchor="middle" fill="#22d3ee" fontSize="13" fontWeight="900" letterSpacing="1">
              🇲🇽 {isEs ? 'MÉXICO' : 'MEXICO'}
            </text>
            <text y="42" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
              CDMX (MEX)
            </text>
          </g>

          {/* TOKYO Destination/Origin Pin */}
          <g transform={`translate(${TYO.x}, ${TYO.y})`}>
            {flightState.arrived && season.outbound && (
              <circle r="18" fill="none" stroke={season.accent} strokeWidth="2.5" className="animate-ping" />
            )}
            <circle r="8" fill={season.accent} stroke="#ffffff" strokeWidth="2" />
            <circle r="3.5" fill="#ffffff" />
            <text y="30" textAnchor="middle" fill={season.accent} fontSize="14" fontWeight="900" letterSpacing="1">
              🇯🇵 {isEs ? 'TOKIO' : 'TOKYO'}
            </text>
            <text y="44" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
              HND / NRT
            </text>
          </g>

          {/* Smooth Real-Time Airplane Indicator */}
          <g
            transform={`translate(${flightState.x}, ${flightState.y}) rotate(${flightState.angle}) scale(1.65)`}
            filter="url(#flight-glow)"
          >
            {/* Jet Engine Thruster Glow */}
            <circle cx="-16" cy="0" r="4.5" fill={season.accent} opacity="0.8" />
            <polygon points="-16,-2 -26,0 -16,2" fill={season.accent} opacity="0.9" />

            {/* Aerodynamic Jet Fuselage & Wings */}
            <path
              d="M 22 0 L 6 -3 L -4 -20 L -9 -20 L -5 -3 L -14 -2 L -18 -8 L -21 -8 L -18 0 L -21 8 L -18 8 L -14 2 L -5 3 L -9 20 L -4 20 L 6 3 Z"
              fill="#ffffff"
              stroke={season.accent}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Cockpit Window */}
            <circle cx="12" cy="0" r="2" fill="#0f172a" />
          </g>
        </svg>
      </div>

      {/* Narrative Footer */}
      <div className="px-5 py-4 bg-black/40 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
            <span className="text-lg">{season.emoji}</span>
            <span>{caption}</span>
          </div>
          <div className="text-xs text-neutral-400 mt-0.5">
            {isEs ? season.months.es : season.months.en} • {sub}
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300">
            {season.outbound ? '✈️ MEX ➔ TYO' : '✈️ TYO ➔ MEX'}
          </span>
        </div>
      </div>
    </div>
  );
}
