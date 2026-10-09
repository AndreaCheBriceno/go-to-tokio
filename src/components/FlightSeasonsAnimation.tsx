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

const SEASON_MS = 8000;
const FLIGHT_START = 0.08;
const FLIGHT_END = 0.82;

// Route in SVG units (viewBox 920 x 460)
const MEX = { x: 172, y: 298 };
const TYO = { x: 772, y: 222 };
const CTRL = { x: 472, y: 70 };
const PATH_FWD = `M ${MEX.x} ${MEX.y} Q ${CTRL.x} ${CTRL.y} ${TYO.x} ${TYO.y}`;
const PATH_REV = `M ${TYO.x} ${TYO.y} Q ${CTRL.x} ${CTRL.y} ${MEX.x} ${MEX.y}`;

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function FlightSeasonsAnimation({ className = '' }: { className?: string }) {
  const { language } = useSiteContent();
  const isEs = language === 'es';

  const [idx, setIdx] = useState(0);
  const [arrived, setArrived] = useState(false);
  const [paused, setPaused] = useState(false);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const trailRef = useRef<SVGPathElement | null>(null);
  const planeRef = useRef<SVGGElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(true);
  const idxRef = useRef(0);
  const elapsedRef = useRef(0);
  const arrivedRef = useRef(false);
  const reducedRef = useRef(false);

  const season = SEASONS[idx];

  const setPlane = (p: number) => {
    const path = pathRef.current;
    const plane = planeRef.current;
    const trail = trailRef.current;
    if (!path || !plane || !trail) return;
    const len = path.getTotalLength();
    const at = Math.max(0, Math.min(len, p * len));
    const pt = path.getPointAtLength(at);
    const a = path.getPointAtLength(Math.max(0, at - 1));
    const b = path.getPointAtLength(Math.min(len, at + 1));
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    plane.setAttribute('transform', `translate(${pt.x} ${pt.y}) rotate(${angle}) scale(1.7)`);
    trail.style.strokeDasharray = `${len}`;
    trail.style.strokeDashoffset = `${len * (1 - p)}`;
  };

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Restart the flight whenever the season changes
  useEffect(() => {
    idxRef.current = idx;
    elapsedRef.current = 0;
    arrivedRef.current = false;
    setArrived(false);
    // path "d" updates on render; set start position on next frame
    const id = requestAnimationFrame(() => setPlane(reducedRef.current ? 1 : 0));
    return () => cancelAnimationFrame(id);
  }, [idx]);

  useEffect(() => {
    let raf = 0;
    let last: number | null = null;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (paused || !visibleRef.current || reducedRef.current) { last = null; return; }
      if (last === null) last = now;
      const dt = Math.min(64, now - last);
      last = now;
      elapsedRef.current += dt;
      const f = elapsedRef.current / SEASON_MS;
      if (f >= 1) {
        setIdx((i) => (i + 1) % SEASONS.length);
        elapsedRef.current = 0;
        return;
      }
      const p = f <= FLIGHT_START ? 0 : f >= FLIGHT_END ? 1 : ease((f - FLIGHT_START) / (FLIGHT_END - FLIGHT_START));
      setPlane(p);
      const arr = f >= FLIGHT_END;
      if (arr !== arrivedRef.current) { arrivedRef.current = arr; setArrived(arr); }
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${f})`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const selectSeason = (i: number) => { setIdx(i); };

  const caption = season.outbound
    ? (isEs ? `${season.es}: el avión viaja de México a Tokio` : `${season.en}: the plane flies from Mexico to Tokyo`)
    : (isEs ? `${season.es}: el avión regresa de Tokio a México` : `${season.en}: the plane flies back from Tokyo to Mexico`);
  const sub = season.outbound
    ? (isEs ? '¡Mejor época para visitar Tokio!' : 'Best time to visit Tokyo!')
    : (isEs ? 'Temporada baja: hora de volver a casa' : 'Low season: time to go home');

  const dest = season.outbound ? TYO : MEX;

  return (
    <div ref={wrapRef} className={`relative rounded-3xl border border-neutral-800 bg-[#070a12] overflow-hidden ${className}`}>
      {/* Header: seasons */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4">
        <div className="flex items-center bg-black/50 p-1 rounded-2xl border border-neutral-800">
          {SEASONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => selectSeason(i)}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1"
              style={i === idx ? { background: s.accent, color: '#0b0f19' } : { color: '#94a3b8' }}
              aria-label={isEs ? s.es : s.en}
            >
              <span>{s.emoji}</span>
              <span className="hidden sm:inline">{isEs ? s.es : s.en}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setPaused((p) => !p)}
          className="p-2 rounded-xl border border-neutral-800 bg-black/50 text-neutral-300 hover:text-white cursor-pointer"
          aria-label={paused ? 'Play' : 'Pause'}
        >
          {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </button>
      </div>

      {/* Season progress */}
      <div className="mt-3 h-0.5 bg-neutral-900">
        <div
          ref={progressRef}
          className="h-full origin-left"
          style={{ background: season.accent, transform: 'scaleX(0)', willChange: 'transform' }}
        />
      </div>

      {/* Map */}
      <div className="relative">
        {/* seasonal particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={`${season.id}-${i}`}
              className="absolute text-sm opacity-0 flight-fall"
              style={{
                left: `${(i * 11 + 6) % 94}%`,
                top: '-8%',
                animationDelay: `${i * 0.9}s`,
                animationDuration: `${7 + (i % 3)}s`,
              }}
            >
              {season.emoji}
            </span>
          ))}
        </div>

        <svg viewBox="0 0 920 460" className="w-full h-auto block" role="img" aria-label={caption}>
          <defs>
            <filter id="fs-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* sea grid */}
          <g stroke="#38bdf8" strokeOpacity="0.12" strokeDasharray="3 6">
            {[110, 210, 310, 410].map((y) => <line key={y} x1="0" x2="920" y1={y} y2={y} />)}
            {[230, 460, 690].map((x) => <line key={x} y1="0" y2="460" x1={x} x2={x} />)}
          </g>
          <text x="460" y="420" textAnchor="middle" fill="#475569" fontSize="12" letterSpacing="6">
            {isEs ? 'OCÉANO PACÍFICO' : 'PACIFIC OCEAN'}
          </text>

          {/* Mexico */}
          <g filter="url(#fs-glow)" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.6" strokeLinejoin="round">
            <path d="M 82 188 C 76 200, 80 230, 92 260 C 100 278, 108 296, 114 306 C 117 304, 113 286, 106 266 C 97 238, 92 210, 89 188 Z" />
            <path d="M 96 196 L 128 194 L 158 206 L 178 214 L 198 228 L 194 254 L 202 280 L 214 298 L 236 286 L 258 282 L 272 290 L 268 310 L 250 314 L 236 312 L 224 338 L 206 346 L 185 334 L 165 316 L 148 296 L 132 270 L 118 242 L 108 220 L 96 196 Z" />
          </g>
          {/* Japan */}
          <g filter="url(#fs-glow)" fill="#0f172a" stroke={season.accent} strokeWidth="1.6" strokeLinejoin="round">
            <path d="M 792 104 C 818 96, 836 106, 842 120 C 836 134, 816 138, 800 146 C 785 142, 775 130, 775 122 C 775 114, 784 108, 792 104 Z" />
            <path d="M 778 150 C 788 175, 788 200, 780 218 C 778 230, 768 236, 758 244 C 746 254, 736 270, 724 266 C 704 264, 684 270, 668 274 C 680 254, 708 244, 730 228 C 734 210, 744 204, 742 218 C 752 216, 766 190, 774 166, 778 150 Z" />
            <path d="M 698 276 C 715 272, 732 276, 734 288 C 728 298, 712 300, 700 296 C 692 290, 692 280, 698 276 Z" />
            <path d="M 650 290 C 664 282, 680 290, 678 306 C 670 322, 654 322, 646 308 C 642 300, 644 294, 650 290 Z" />
          </g>

          {/* faint full route + animated trail */}
          <path d={PATH_FWD} fill="none" stroke="#94a3b8" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 8" />
          <path
            ref={trailRef}
            d={season.outbound ? PATH_FWD : PATH_REV}
            fill="none"
            stroke={season.accent}
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#fs-glow)"
          />
          {/* measuring path (invisible) */}
          <path ref={pathRef} d={season.outbound ? PATH_FWD : PATH_REV} fill="none" stroke="none" />

          {/* endpoints */}
          {[{ p: MEX, label: isEs ? 'MÉXICO' : 'MEXICO', color: '#22d3ee', anchor: 'middle' as const }, { p: TYO, label: isEs ? 'TOKIO · JAPÓN' : 'TOKYO · JAPAN', color: season.accent, anchor: 'middle' as const }].map((e) => (
            <g key={e.label} transform={`translate(${e.p.x} ${e.p.y})`}>
              {arrived && e.p === dest && (
                <circle r="14" fill="none" stroke={e.color} strokeWidth="2" className="flight-pulse" />
              )}
              <circle r="6" fill={e.color} stroke="#fff" strokeWidth="1.5" />
              <text y="30" textAnchor={e.anchor} fill={e.color} fontSize="15" fontWeight="800" letterSpacing="1">
                {e.label}
              </text>
            </g>
          ))}

          {/* plane (top view, nose points to +x) */}
          <g ref={planeRef} transform={`translate(${MEX.x} ${MEX.y}) scale(1.7)`}>
            <path
              d="M 22 0 L 6 -3 L -4 -20 L -9 -20 L -5 -3 L -14 -2 L -18 -8 L -21 -8 L -18 0 L -21 8 L -18 8 L -14 2 L -5 3 L -9 20 L -4 20 L 6 3 Z"
              fill="#ffffff"
              stroke={season.accent}
              strokeWidth="1.4"
              filter="url(#fs-glow)"
            />
          </g>
        </svg>
      </div>

      {/* Caption */}
      <div className="px-4 pb-4 pt-1" aria-live="polite">
        <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-white">
          <span style={{ color: season.accent }}>{season.emoji}</span>
          <span>{caption}</span>
        </div>
        <div className="text-xs text-neutral-400 mt-0.5">
          {isEs ? season.months.es : season.months.en} · {sub}
        </div>
      </div>

      <style>{`
        @keyframes flight-fall {
          0% { transform: translate3d(0,0,0) rotate(0deg); opacity: 0; }
          15% { opacity: .8; }
          100% { transform: translate3d(40px, 330px, 0) rotate(200deg); opacity: 0; }
        }
        .flight-fall { animation-name: flight-fall; animation-iteration-count: infinite; animation-timing-function: linear; }
        @keyframes flight-pulse {
          0% { transform: scale(1); opacity: .9; }
          100% { transform: scale(3); opacity: 0; }
        }
        .flight-pulse { animation: flight-pulse 1.4s ease-out infinite; transform-box: fill-box; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .flight-fall, .flight-pulse { animation: none; } }
      `}</style>
    </div>
  );
}
