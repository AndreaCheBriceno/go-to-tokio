'use client';

import React, { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';
import { PACIFIC_MAP as MAP } from '../lib/pacificMap';

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

const SEASON_MS = 6500;
const FLIGHT_START = 0.05;
const FLIGHT_END = 0.85;

type Pt = { x: number; y: number };
// Real projected coordinates (Pacific-centered map): Mexico City on the right, Tokyo on the left
const MEX: Pt = { x: MAP.mex[0], y: MAP.mex[1] };
const TYO: Pt = { x: MAP.tyo[0], y: MAP.tyo[1] };
// Control point lifts the arc over the north Pacific (great-circle look)
const CTRL: Pt = { x: (MEX.x + TYO.x) / 2, y: Math.min(MEX.y, TYO.y) - 130 };

function bezier(t: number, a: Pt, c: Pt, b: Pt) {
  const k = Math.max(0, Math.min(1, t));
  const u = 1 - k;
  const x = u * u * a.x + 2 * u * k * c.x + k * k * b.x;
  const y = u * u * a.y + 2 * u * k * c.y + k * k * b.y;
  const dx = 2 * u * (c.x - a.x) + 2 * k * (b.x - c.x);
  const dy = 2 * u * (c.y - a.y) + 2 * k * (b.y - c.y);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

// Approximate arc length for the dash trail
const ARC_LEN = (() => {
  let len = 0;
  let prev = MEX;
  for (let i = 1; i <= 60; i++) {
    const p = bezier(i / 60, MEX, CTRL, TYO);
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return len;
})();

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function FlightSeasonsAnimation({ className = '' }: { className?: string }) {
  const { language } = useSiteContent();
  const isEs = language === 'es';

  const [seasonIndex, setSeasonIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [flight, setFlight] = useState({ x: MEX.x, y: MEX.y, angle: 180, progress: 0, cycle: 0, arrived: false });

  const season = SEASONS[seasonIndex];
  const origin = season.outbound ? MEX : TYO;
  const dest = season.outbound ? TYO : MEX;
  const pathD = `M ${origin.x} ${origin.y} Q ${CTRL.x} ${CTRL.y} ${dest.x} ${dest.y}`;

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;
    const cur = SEASONS[seasonIndex];
    const a = cur.outbound ? MEX : TYO;
    const b = cur.outbound ? TYO : MEX;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (paused) {
        last = now;
        return;
      }
      elapsed += Math.min(100, now - last);
      last = now;
      if (elapsed >= SEASON_MS) {
        setSeasonIndex((i) => (i + 1) % SEASONS.length);
        return;
      }
      const f = elapsed / SEASON_MS;
      let p = 0;
      if (f > FLIGHT_START && f < FLIGHT_END) p = ease((f - FLIGHT_START) / (FLIGHT_END - FLIGHT_START));
      else if (f >= FLIGHT_END) p = 1;
      const pos = bezier(p, a, CTRL, b);
      setFlight({ x: pos.x, y: pos.y, angle: pos.angle, progress: p, cycle: f, arrived: f >= FLIGHT_END });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused, seasonIndex]);

  const caption = season.outbound
    ? (isEs ? `${season.es}: vuelo de México a Tokio` : `${season.en}: flight from Mexico to Tokyo`)
    : (isEs ? `${season.es}: vuelo de regreso de Tokio a México` : `${season.en}: return flight from Tokyo to Mexico`);
  const sub = season.outbound
    ? (isEs ? '¡La mejor época para visitar Japón!' : 'The best time to visit Japan!')
    : (isEs ? 'Temporada baja: es hora de volver a casa' : 'Low season: time to go home');

  return (
    <div className={`relative rounded-3xl border border-neutral-800 bg-[#070a12] overflow-hidden shadow-2xl ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-4 pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-2xl border border-neutral-800">
          {SEASONS.map((s, i) => {
            const on = i === seasonIndex;
            return (
              <button
                key={s.id}
                onClick={() => setSeasonIndex(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${on ? 'text-slate-950 shadow-lg' : 'text-neutral-400 hover:text-white'}`}
                style={{ backgroundColor: on ? s.accent : 'transparent' }}
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
          aria-label={paused ? 'Play' : 'Pause'}
        >
          {paused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
          <span className="hidden sm:inline">{paused ? (isEs ? 'Reanudar' : 'Resume') : (isEs ? 'Pausar' : 'Pause')}</span>
        </button>
      </div>

      <div className="w-full h-1 bg-neutral-950 overflow-hidden">
        <div className="h-full" style={{ width: `${flight.cycle * 100}%`, backgroundColor: season.accent, boxShadow: `0 0 10px ${season.accent}` }} />
      </div>

      <svg viewBox={`0 0 ${MAP.W} ${MAP.H}`} className="w-full h-auto block select-none" role="img" aria-label={caption}>
        <defs>
          <filter id="fl-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="fl-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a1426" />
            <stop offset="100%" stopColor="#050913" />
          </linearGradient>
        </defs>

        <rect width={MAP.W} height={MAP.H} fill="url(#fl-sea)" />
        <path d={MAP.graticule} fill="none" stroke="#38bdf8" strokeOpacity="0.1" strokeWidth="0.8" />

        {/* Real coastlines (Natural Earth) */}
        <path d={MAP.land} fill="#141d30" stroke="#2a3a57" strokeWidth="0.8" strokeLinejoin="round" />
        <path d={MAP.mexico} fill="#10303a" stroke="#22d3ee" strokeWidth="1.6" strokeLinejoin="round" filter="url(#fl-glow)" />
        <path d={MAP.japan} fill="#1a1d33" stroke={season.accent} strokeWidth="1.8" strokeLinejoin="round" filter="url(#fl-glow)" />

        <text x={MAP.W / 2} y={MAP.H - 28} textAnchor="middle" fill="#3b4a66" fontSize="13" letterSpacing="8" fontWeight="bold">
          {isEs ? 'OCÉANO PACÍFICO' : 'PACIFIC OCEAN'}
        </text>

        {/* Route guide + glowing trail */}
        <path d={`M ${MEX.x} ${MEX.y} Q ${CTRL.x} ${CTRL.y} ${TYO.x} ${TYO.y}`} fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4 8" />
        <path
          d={pathD}
          fill="none"
          stroke={season.accent}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={ARC_LEN}
          strokeDashoffset={ARC_LEN * (1 - flight.progress)}
          filter="url(#fl-glow)"
        />

        {/* Mexico City pin */}
        <g transform={`translate(${MEX.x} ${MEX.y})`}>
          {flight.arrived && !season.outbound && <circle r="16" fill="none" stroke="#22d3ee" strokeWidth="2" className="animate-ping" />}
          <circle r="7" fill="#22d3ee" stroke="#fff" strokeWidth="2" />
          <text y="30" textAnchor="middle" fill="#22d3ee" fontSize="15" fontWeight="900" letterSpacing="1">{isEs ? 'MÉXICO' : 'MEXICO'}</text>
          <text y="45" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">CDMX</text>
        </g>

        {/* Tokyo pin */}
        <g transform={`translate(${TYO.x} ${TYO.y})`}>
          {flight.arrived && season.outbound && <circle r="18" fill="none" stroke={season.accent} strokeWidth="2.5" className="animate-ping" />}
          <circle r="8" fill={season.accent} stroke="#fff" strokeWidth="2" />
          <text y="-32" textAnchor="middle" fill={season.accent} fontSize="16" fontWeight="900" letterSpacing="1">{isEs ? 'TOKIO' : 'TOKYO'}</text>          <text y="32" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">HND / NRT</text>
        </g>

        {/* Plane */}
        <g transform={`translate(${flight.x} ${flight.y}) rotate(${flight.angle}) scale(1.5)`} filter="url(#fl-glow)">
          <path
            d="M 22 0 L 6 -3 L -4 -20 L -9 -20 L -5 -3 L -14 -2 L -18 -8 L -21 -8 L -18 0 L -21 8 L -18 8 L -14 2 L -5 3 L -9 20 L -4 20 L 6 3 Z"
            fill="#fff"
            stroke={season.accent}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="0" r="2" fill="#0f172a" />
        </g>
      </svg>

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
        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700 text-neutral-300 self-start sm:self-auto">
          {season.outbound ? 'MEX ➔ TYO' : 'TYO ➔ MEX'}
        </span>
      </div>
    </div>
  );
}
