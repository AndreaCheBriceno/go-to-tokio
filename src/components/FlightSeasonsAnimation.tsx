'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Plane,
  Calendar,
  Sparkles,
  Sun,
  Snowflake,
  Leaf,
  Flower2,
  Play,
  Pause,
  Compass,
  ArrowRight,
  ArrowLeft,
  Star,
  Thermometer,
  CloudRain,
  ShieldAlert,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

// Support both useSiteContent and the requested useContent hook alias
export const useContent = useSiteContent;

interface SeasonConfig {
  id: 'spring' | 'summer' | 'autumn' | 'winter';
  nameEn: string;
  nameEs: string;
  kanji: string;
  romaji: string;
  monthsEn: string;
  monthsEs: string;
  temp: string;
  rainfallEn: string;
  rainfallEs: string;
  isBestSeason: boolean;
  flightType: 'outbound' | 'return'; // outbound: MEX -> TYO; return: TYO -> MEX
  directionEn: string;
  directionEs: string;
  statusBadgeEn: string;
  statusBadgeEs: string;
  accentHex: string;
  glowHex: string;
  bgTint: string;
  narrativeEn: string;
  narrativeEs: string;
  highlightsEn: string[];
  highlightsEs: string[];
  tipEn: string;
  tipEs: string;
}

const SEASONS: SeasonConfig[] = [
  {
    id: 'spring',
    nameEn: 'Spring',
    nameEs: 'Primavera',
    kanji: '春',
    romaji: 'Haru',
    monthsEn: 'Late March – May',
    monthsEs: 'Finales de Marzo – Mayo',
    temp: '14°C – 20°C',
    rainfallEn: 'Low to Moderate · Mild sunny days',
    rainfallEs: 'Baja a moderada · Días soleados',
    isBestSeason: true,
    flightType: 'outbound',
    directionEn: 'Direct Flight: Mexico (MEX) → Tokyo (TYO)',
    directionEs: 'Vuelo Directo: México (MEX) → Tokio (TYO)',
    statusBadgeEn: 'Best season to visit!',
    statusBadgeEs: '¡Mejores temporadas para visitar!',
    accentHex: '#f472b6', // neon pink
    glowHex: 'rgba(244, 114, 182, 0.45)',
    bgTint: 'radial-gradient(ellipse at 75% 45%, rgba(244,114,182,0.18) 0%, rgba(15,23,42,0.02) 65%)',
    narrativeEn:
      'Spring is one of the two ideal windows to fly to Tokyo. The city awakens under sea-pink sakura blossoms with crisp, mild 16°C weather and clear blue skies. It offers world-class walking conditions through parks like Ueno and along the Meguro River.',
    narrativeEs:
      'La primavera es una de las dos épocas ideales para volar a Tokio. La metrópolis despierta bajo flores de cerezo (sakura) con un clima templado de 16°C y cielos despejados. Ofrece condiciones insuperables para caminar por parques como Ueno o el río Meguro.',
    highlightsEn: [
      'Peak Sakura bloom across Tokyo parks & shrines',
      'Comfortable 16°C walking weather with zero humidity',
      'Lively open-air street markets & traditional Hanami picnics',
    ],
    highlightsEs: [
      'Pico de floración Sakura en parques y templos de Tokio',
      'Clima templado de 16°C ideal para caminar sin bochorno',
      'Festivales tradicionales Hanami al aire libre bajo los cerezos',
    ],
    tipEn: 'Reserve flights and Shinjuku/Ginza hotels 4-5 months early due to global peak demand.',
    tipEs: 'Reserva vuelos y hoteles con 4-5 meses de antelación debido a la altísima demanda mundial.',
  },
  {
    id: 'summer',
    nameEn: 'Summer',
    nameEs: 'Verano',
    kanji: '夏',
    romaji: 'Natsu',
    monthsEn: 'June – August',
    monthsEs: 'Junio – Agosto',
    temp: '27°C – 34°C',
    rainfallEn: 'High · Tsuyu monsoon rains & typhoon risk',
    rainfallEs: 'Alta · Lluvias monzónicas Tsuyu y tifones',
    isBestSeason: false,
    flightType: 'return',
    directionEn: 'Return Flight: Tokyo (TYO) → Mexico (MEX)',
    directionEs: 'Vuelo de Regreso: Tokio (TYO) → México (MEX)',
    statusBadgeEn: 'Off-Peak · Return flights home',
    statusBadgeEs: 'Temporada Baja · Vuelo de retorno',
    accentHex: '#f59e0b', // amber sun
    glowHex: 'rgba(245, 158, 11, 0.4)',
    bgTint: 'radial-gradient(ellipse at 45% 40%, rgba(245,158,11,0.15) 0%, rgba(15,23,42,0.02) 65%)',
    narrativeEn:
      'Summer brings tropical temperatures, humidity over 80%, and seasonal typhoons to Tokyo. As intense muggy heat settles over the metropolis, many international travelers take return flights home. However, adventurous visitors enjoy vibrant night matsuri festivals and massive fireworks.',
    narrativeEs:
      'El verano trae calor tropical, humedad superior al 80% y lluvias monzónicas a Tokio. Ante el intenso bochorno veraniego, muchos turistas emprenden el vuelo de regreso a casa. Aun así, quienes permanecen disfrutan de animados festivales nocturnos matsuri y monumentales fuegos artificiales.',
    highlightsEn: [
      'Electrifying night festivals (matsuri) and street food stalls',
      'Massive fireworks shows over Sumida River and Tokyo Bay',
      'Rooftop beer gardens atop Shibuya & Ginza skyscrapers',
    ],
    highlightsEs: [
      'Vibrantes festivales nocturnos matsuri con comida tradicional',
      'Grandes espectáculos de fuegos artificiales en el río Sumida',
      'Terrazas de cerveza en rascacielos de Shibuya y Ginza',
    ],
    tipEn: 'Stay hydrated with Pocari Sweat from vending machines and schedule outdoor walks after sunset.',
    tipEs: 'Hidrátate en máquinas expendedoras y planifica actividades al aire libre después del atardecer.',
  },
  {
    id: 'autumn',
    nameEn: 'Autumn',
    nameEs: 'Otoño',
    kanji: '秋',
    romaji: 'Aki',
    monthsEn: 'September – November',
    monthsEs: 'Septiembre – Noviembre',
    temp: '15°C – 22°C',
    rainfallEn: 'Low · Crisp clean air & minimal rain',
    rainfallEs: 'Baja · Aire fresco y cielos cristalinos',
    isBestSeason: true,
    flightType: 'outbound',
    directionEn: 'Direct Flight: Mexico (MEX) → Tokyo (TYO)',
    directionEs: 'Vuelo Directo: México (MEX) → Tokio (TYO)',
    statusBadgeEn: 'Best season to visit!',
    statusBadgeEs: '¡Mejores temporadas para visitar!',
    accentHex: '#f97316', // neon fiery orange / momiji
    glowHex: 'rgba(249, 115, 22, 0.45)',
    bgTint: 'radial-gradient(ellipse at 75% 45%, rgba(249,115,22,0.18) 0%, rgba(15,23,42,0.02) 65%)',
    narrativeEn:
      'Autumn is the second premier travel season to fly to Tokyo. Crisp 18°C breezes and crystal-clear skies replace summer humidity. In late October and November, thousands of Japanese maples (momiji) turn fiery crimson and ginkgo avenues glow bright gold.',
    narrativeEs:
      'El otoño es la segunda temporada estelar para volar a Tokio. Brisas frescas de 18°C y cielos cristalinos sustituyen la humedad veraniega. Hacia noviembre, miles de arces japoneses (momiji) tiñen jardines de rojo escarlata y las avenidas de ginkgo resplandecen en oro.',
    highlightsEn: [
      'Breathtaking Momiji foliage at Rikugien & Shinjuku Gyoen',
      'Golden Ginkgo Avenue (Icho Namiki) in full splendor',
      'Refreshing crisp weather perfect for long metropolitan walks',
    ],
    highlightsEs: [
      'Espectacular follaje Momiji iluminado en el jardín Rikugien',
      'Avenida de Ginkgos dorados (Icho Namiki) en máximo esplendor',
      'Clima fresco inmejorable para recorrer barrios y templos',
    ],
    tipEn: 'Bring a light autumn jacket for evening strolls through illuminated illuminated Japanese gardens.',
    tipEs: 'Lleva una chaqueta ligera para pasear de noche por los jardines japoneses iluminados.',
  },
  {
    id: 'winter',
    nameEn: 'Winter',
    nameEs: 'Invierno',
    kanji: '冬',
    romaji: 'Fuyu',
    monthsEn: 'December – February',
    monthsEs: 'Diciembre – Febrero',
    temp: '4°C – 11°C',
    rainfallEn: 'Very Low · Dry winds & occasional dusting',
    rainfallEs: 'Muy baja · Vientos secos y nieve infrecuente',
    isBestSeason: false,
    flightType: 'return',
    directionEn: 'Return Flight: Tokyo (TYO) → Mexico (MEX)',
    directionEs: 'Vuelo de Regreso: Tokio (TYO) → México (MEX)',
    statusBadgeEn: 'Off-Peak · Return flights home',
    statusBadgeEs: 'Temporada Baja · Vuelo de retorno',
    accentHex: '#38bdf8', // neon cyan frost
    glowHex: 'rgba(56, 189, 248, 0.4)',
    bgTint: 'radial-gradient(ellipse at 45% 40%, rgba(56,189,248,0.15) 0%, rgba(15,23,42,0.02) 65%)',
    narrativeEn:
      'Winter brings brisk dry winds and chilly 6°C days, closing the primary tourist travel cycle with homeward return flights. While quiet and cold, winter rewards visitors with crystal-clear visibility of snow-capped Mount Fuji and futuristic neon winter illuminations.',
    narrativeEs:
      'El invierno trae vientos secos y temperaturas frías de 6°C, concluyendo el ciclo turístico principal con vuelos de regreso a casa. Pese a las bajas temperaturas, ofrece las vistas más despejadas del Monte Fuji nevado y deslumbrantes iluminaciones nocturnas.',
    highlightsEn: [
      'Unobstructed crystal-clear views of snow-capped Mount Fuji',
      'Futuristic LED illumination corridors in Shibuya and Roppongi',
      'Steaming ramen bowls and hot onsen thermal bath day trips',
    ],
    highlightsEs: [
      'Vistas diáfanas y majestuosas del Monte Fuji nevado',
      'Espectaculares corredores de iluminación LED en Roppongi y Shibuya',
      'Ramen caliente, oden humeante y baños termales onsen tradicionales',
    ],
    tipEn: 'Pack thermal base layers (Uniqlo Heattech) to comfortably explore morning outdoor shrines.',
    tipEs: 'Viste ropa interior térmica (Heattech) para disfrutar cómodamente los templos por la mañana.',
  },
];

const SEASON_DURATION_MS = 6000; // ~6 seconds per season loop

// Coordinates for Great-Circle Flight Path across the Pacific
// P0: Mexico City (CDMX) = (172, 298)
// P1: Apex Control Point (North Pacific) = (472, 80)
// P2: Tokyo Pin = (772, 222)
function computeBezierPointAndTangent(u: number) {
  const clampedU = Math.max(0, Math.min(1, u));
  const oneMinusU = 1 - clampedU;

  const x = oneMinusU * oneMinusU * 172 + 2 * oneMinusU * clampedU * 472 + clampedU * clampedU * 772;
  const y = oneMinusU * oneMinusU * 298 + 2 * oneMinusU * clampedU * 80 + clampedU * clampedU * 222;

  // Tangent vector derivative
  const dx = 2 * oneMinusU * (472 - 172) + 2 * clampedU * (772 - 472); // ~ 600
  const dy = 2 * oneMinusU * (80 - 298) + 2 * clampedU * (222 - 80);   // ~ -436*(1-u) + 284*u
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return { x, y, angle };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function FlightSeasonsAnimation({ className = '' }: { className?: string }) {
  const { language } = useContent();
  const isEs = language === 'es';

  // Animation & Loop state
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [elapsedInSeason, setElapsedInSeason] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // IntersectionObserver to pause offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Main 60fps timekeeper loop with cleanup
  useEffect(() => {
    if (!isInView || isPaused) {
      lastTimeRef.current = null;
      return;
    }

    let animationFrameId: number;

    const updateLoop = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp;
      }
      const delta = Math.min(100, timestamp - lastTimeRef.current);
      lastTimeRef.current = timestamp;

      setElapsedInSeason((prev) => {
        const next = prev + delta;
        if (next >= SEASON_DURATION_MS) {
          setSeasonIndex((curr) => (curr + 1) % SEASONS.length);
          return next - SEASON_DURATION_MS;
        }
        return next;
      });

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, isPaused]);

  const activeSeason = SEASONS[seasonIndex];
  const cycleFraction = Math.max(0, Math.min(1, elapsedInSeason / SEASON_DURATION_MS));

  // Flight stage calculation:
  // 0% - 12%: Taxi & departure preparation
  // 12% - 80%: Transpacific cruising flight (interpolating along Bezier arc)
  // 80% - 100%: Arrival at destination with celebratory beacon pulse!
  const flightProgress = useMemo(() => {
    if (prefersReducedMotion) return 1;
    if (cycleFraction < 0.12) return 0;
    if (cycleFraction > 0.8) return 1;
    const normalized = (cycleFraction - 0.12) / 0.68;
    return easeInOutCubic(normalized);
  }, [cycleFraction, prefersReducedMotion]);

  // Is flight currently arrived at destination?
  const isArrived = cycleFraction >= 0.78 || prefersReducedMotion;

  // Compute plane coordinates and tangent orientation
  const { planeX, planeY, planeAngle } = useMemo(() => {
    const isOutbound = activeSeason.flightType === 'outbound'; // MEX -> TYO

    if (isOutbound) {
      // Travels from u = 0 (CDMX) to u = 1 (TYO)
      const { x, y, angle } = computeBezierPointAndTangent(flightProgress);
      return { planeX: x, planeY: y, planeAngle: angle };
    } else {
      // Return flight: travels from u = 1 (TYO) back to u = 0 (CDMX)
      // Tangent direction is reversed (+180 deg) so nose points towards Mexico
      const u = 1 - flightProgress;
      const { x, y, angle } = computeBezierPointAndTangent(u);
      return { planeX: x, planeY: y, planeAngle: angle + 180 };
    }
  }, [activeSeason.flightType, flightProgress]);

  // Dashed route drawing progress
  const pathDashOffset = useMemo(() => {
    // Arc length is ~680px
    const totalLength = 680;
    if (prefersReducedMotion) return 0;
    if (activeSeason.flightType === 'outbound') {
      return totalLength * (1 - flightProgress);
    } else {
      return -totalLength * (1 - flightProgress);
    }
  }, [activeSeason.flightType, flightProgress, prefersReducedMotion]);

  const handleSelectSeason = (idx: number) => {
    setSeasonIndex(idx);
    setElapsedInSeason(0);
    lastTimeRef.current = null;
  };

  const handleTogglePlayPause = () => {
    setIsPaused((prev) => !prev);
    lastTimeRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      id="flight-seasons-animation"
      role="region"
      aria-label={isEs ? 'Simulación de Vuelos por Temporadas Tokio-México' : 'Tokyo-Mexico Flight Seasons Simulation'}
      className={`relative w-full max-w-7xl mx-auto my-12 px-3 sm:px-6 transition-colors duration-700 ${className}`}
    >
      {/* Dynamic Scoped CSS for hardware-accelerated transforms & particles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float-sakura {
            0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
            15% { opacity: 0.85; }
            85% { opacity: 0.85; }
            100% { transform: translate3d(90px, 120px, 0) rotate(220deg); opacity: 0; }
          }
          @keyframes float-sun-spark {
            0% { transform: translate3d(0, 0, 0) scale(0.8); opacity: 0.2; }
            50% { transform: translate3d(15px, -25px, 0) scale(1.25); opacity: 0.9; }
            100% { transform: translate3d(30px, -50px, 0) scale(0.8); opacity: 0.2; }
          }
          @keyframes float-momiji {
            0% { transform: translate3d(0, 0, 0) rotate(0deg); opacity: 0; }
            20% { opacity: 0.9; }
            80% { opacity: 0.8; }
            100% { transform: translate3d(70px, 110px, 0) rotate(-180deg); opacity: 0; }
          }
          @keyframes float-snow {
            0% { transform: translate3d(0, 0, 0); opacity: 0; }
            25% { opacity: 0.85; }
            85% { opacity: 0.8; }
            100% { transform: translate3d(-30px, 130px, 0); opacity: 0; }
          }
          @keyframes neon-pulse-beacon {
            0% { transform: scale(1); opacity: 0.9; }
            50% { transform: scale(1.6); opacity: 0.2; }
            100% { transform: scale(2.2); opacity: 0; }
          }
          @keyframes radar-sweep {
            0% { stroke-dashoffset: 40; }
            100% { stroke-dashoffset: 0; }
          }
        `,
        }}
      />

      {/* Main Glassmorphic Neon Card */}
      <div className="relative rounded-3xl border border-slate-800/90 bg-slate-950/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Dynamic Tinted Ambient Background */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out z-0"
          style={{ background: activeSeason.bgTint }}
        />

        {/* Subtle Cyber Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

        {/* Card Header & Controls */}
        <div className="relative z-10 px-5 sm:px-8 pt-6 sm:pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/60">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-cyan-400">
                TRANS-PACIFIC FLIGHT RADAR · 渡航シーズン
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>{isEs ? 'Temporadas de Vuelo a Tokio' : 'Tokyo Flight Seasons'}</span>
              <span className="text-xs sm:text-sm font-normal px-2.5 py-0.5 rounded-full border border-slate-700 bg-slate-900/80 text-slate-300">
                {activeSeason.kanji} {activeSeason.romaji}
              </span>
            </h3>
          </div>

          {/* Interactive Season Selector Tabs & Play/Pause */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 shadow-inner">
              {SEASONS.map((season, idx) => {
                const isSelected = idx === seasonIndex;
                const Icon =
                  season.id === 'spring'
                    ? Flower2
                    : season.id === 'summer'
                    ? Sun
                    : season.id === 'autumn'
                    ? Leaf
                    : Snowflake;

                return (
                  <button
                    key={season.id}
                    onClick={() => handleSelectSeason(idx)}
                    aria-label={`Select ${season.nameEn}`}
                    className={`relative px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'text-white shadow-lg'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                    style={{
                      backgroundColor: isSelected ? season.accentHex : 'transparent',
                      color: isSelected ? (season.id === 'summer' ? '#0f172a' : '#ffffff') : undefined,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{isEs ? season.nameEs : season.nameEn}</span>
                    {season.isBestSeason && (
                      <span className="text-[10px] ml-0.5 opacity-90 hidden sm:inline">★</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              onClick={handleTogglePlayPause}
              aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
              <span className="hidden sm:inline">{isPaused ? (isEs ? 'Reanudar' : 'Resume') : (isEs ? 'Pausar' : 'Pause')}</span>
            </button>
          </div>
        </div>

        {/* Active Season Cycle Progress Bar */}
        <div className="relative w-full h-1 bg-slate-900 overflow-hidden z-10">
          <div
            className="h-full transition-all duration-75 ease-linear"
            style={{
              width: `${cycleFraction * 100}%`,
              backgroundColor: activeSeason.accentHex,
              boxShadow: `0 0 10px ${activeSeason.accentHex}`,
            }}
          />
        </div>

        {/* Interactive SVG Flight Map Stage */}
        <div className="relative z-10 w-full overflow-hidden select-none bg-gradient-to-b from-[#06080e] via-[#090d16] to-[#06080e]">
          {/* Subtle Dynamic Particles Overlay */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
              {/* Spring: Sakura Petals */}
              {activeSeason.id === 'spring' && (
                <>
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={`sakura-${i}`}
                      className="absolute rounded-full"
                      style={{
                        top: `${(i * 8 + 5) % 80}%`,
                        left: `${(i * 8.5 + 10) % 90}%`,
                        width: `${8 + (i % 4) * 2}px`,
                        height: `${12 + (i % 4) * 3}px`,
                        background: 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 100%)',
                        borderRadius: '50% 10% 50% 50%',
                        filter: 'drop-shadow(0 0 4px rgba(244,114,182,0.6))',
                        animation: `float-sakura ${4.5 + (i % 3)}s linear infinite`,
                        animationDelay: `${(i * 0.4) % 3.5}s`,
                      }}
                    />
                  ))}
                </>
              )}

              {/* Summer: Golden Sun Motes */}
              {activeSeason.id === 'summer' && (
                <>
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={`sun-${i}`}
                      className="absolute rounded-full"
                      style={{
                        top: `${(i * 7 + 15) % 75}%`,
                        left: `${(i * 8 + 15) % 85}%`,
                        width: `${6 + (i % 3) * 3}px`,
                        height: `${6 + (i % 3) * 3}px`,
                        backgroundColor: '#fbbf24',
                        boxShadow: '0 0 12px #f59e0b, 0 0 20px #fbbf24',
                        animation: `float-sun-spark ${3 + (i % 3)}s ease-in-out infinite`,
                        animationDelay: `${(i * 0.35) % 3}s`,
                      }}
                    />
                  ))}
                </>
              )}

              {/* Autumn: Maple Momiji Leaves */}
              {activeSeason.id === 'autumn' && (
                <>
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={`momiji-${i}`}
                      className="absolute"
                      style={{
                        top: `${(i * 8 + 5) % 75}%`,
                        left: `${(i * 8.5 + 8) % 88}%`,
                        width: `${10 + (i % 3) * 3}px`,
                        height: `${10 + (i % 3) * 3}px`,
                        backgroundColor: i % 2 === 0 ? '#f97316' : '#ef4444',
                        clipPath: 'polygon(50% 0%, 65% 35%, 100% 35%, 75% 60%, 85% 100%, 50% 75%, 15% 100%, 25% 60%, 0% 35%, 35% 35%)',
                        filter: 'drop-shadow(0 0 5px rgba(249,115,22,0.7))',
                        animation: `float-momiji ${5 + (i % 3)}s linear infinite`,
                        animationDelay: `${(i * 0.45) % 4}s`,
                      }}
                    />
                  ))}
                </>
              )}

              {/* Winter: Snowflakes */}
              {activeSeason.id === 'winter' && (
                <>
                  {[...Array(14)].map((_, i) => (
                    <div
                      key={`snow-${i}`}
                      className="absolute rounded-full"
                      style={{
                        top: `${(i * 7 + 5) % 75}%`,
                        left: `${(i * 7.5 + 10) % 90}%`,
                        width: `${4 + (i % 4) * 2}px`,
                        height: `${4 + (i % 4) * 2}px`,
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 8px #93c5fd, 0 0 12px #38bdf8',
                        animation: `float-snow ${4.2 + (i % 3)}s linear infinite`,
                        animationDelay: `${(i * 0.38) % 4}s`,
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          )}

          {/* Code-drawn SVG Map */}
          <svg
            viewBox="0 0 920 460"
            className="w-full h-auto max-h-[500px] select-none"
            aria-hidden="true"
          >
            <defs>
              {/* Neon Glow Filters */}
              <filter id="neon-glow-general" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="tokyo-strong-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur1" />
                <feGaussianBlur stdDeviation="2" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur1" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Linear Gradients */}
              <linearGradient id="ocean-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#070a13" />
                <stop offset="50%" stopColor="#0a0f1d" />
                <stop offset="100%" stopColor="#070a13" />
              </linearGradient>

              <linearGradient id="route-gradient-outbound" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="50%" stopColor={activeSeason.accentHex} />
                <stop offset="100%" stopColor={activeSeason.accentHex} />
              </linearGradient>

              <linearGradient id="route-gradient-return" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={activeSeason.accentHex} />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#00f0ff" />
              </linearGradient>
            </defs>

            {/* Ocean Backdrop */}
            <rect x="0" y="0" width="920" height="460" fill="url(#ocean-gradient)" />

            {/* Transpacific Navigation Grid & Latitude Lines */}
            <g opacity="0.18" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="3 5">
              <path d="M 0 120 Q 460 135 920 120" />
              <path d="M 0 220 Q 460 240 920 220" />
              <path d="M 0 320 Q 460 340 920 320" />
              <path d="M 300 0 Q 310 230 300 460" />
              <path d="M 460 0 Q 470 230 460 460" />
              <path d="M 620 0 Q 630 230 620 460" />
            </g>

            {/* Ocean Typography & HUD Info */}
            <g className="font-mono select-none pointer-events-none">
              <text
                x="460"
                y="260"
                textAnchor="middle"
                className="fill-slate-700/60 text-[11px] font-bold tracking-[0.45em] uppercase"
              >
                PACIFIC OCEAN · 太平洋
              </text>
              <text
                x="460"
                y="280"
                textAnchor="middle"
                className="fill-slate-600/50 text-[9px] tracking-[0.25em]"
              >
                11,300 KM TRANS-PACIFIC AIR CORRIDOR
              </text>
            </g>

            {/* ---------------------------------------------------- */}
            {/* MEXICO OUTLINE (LEFT SIDE)                           */}
            {/* Baja California Peninsula + Mainland Mexico         */}
            {/* ---------------------------------------------------- */}
            <g id="mexico-landmass" className="transition-all duration-500">
              {/* Baja California Peninsula */}
              <path
                d="M 82 188 C 76 200, 80 230, 92 260 C 100 278, 108 296, 114 306 C 117 304, 113 286, 106 266 C 97 238, 92 210, 89 188 Z"
                fill="#0f172a"
                stroke="#00f0ff"
                strokeWidth="1.4"
                strokeLinejoin="round"
                opacity="0.85"
                filter="url(#neon-glow-general)"
              />

              {/* Mainland Mexico */}
              <path
                d="M 96 196 L 128 194 L 158 206 L 178 214 L 198 228 L 194 254 L 202 280 L 214 298 L 236 286 L 258 282 L 272 290 L 268 310 L 250 314 L 236 312 L 224 338 L 206 346 L 185 334 L 165 316 L 148 296 L 132 270 L 118 242 L 108 220 L 96 196 Z"
                fill="#0f172a"
                stroke="#00f0ff"
                strokeWidth="1.5"
                strokeLinejoin="round"
                opacity="0.9"
                filter="url(#neon-glow-general)"
              />

              {/* Mexico Internal Neon Grid Fill */}
              <path
                d="M 120 220 L 180 250 M 140 270 L 200 300 M 150 230 L 190 280"
                stroke="#00f0ff"
                strokeWidth="0.6"
                strokeDasharray="2 3"
                opacity="0.35"
              />

              {/* Mexico City Pin (CDMX: 172, 298) */}
              <g transform="translate(172, 298)">
                {/* Pulse beacon for return arrival */}
                {activeSeason.flightType === 'return' && isArrived && (
                  <>
                    <circle
                      r="16"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="1.5"
                      style={{ animation: 'neon-pulse-beacon 1.8s infinite' }}
                    />
                    <circle
                      r="24"
                      fill="none"
                      stroke="#00f0ff"
                      strokeWidth="1"
                      opacity="0.4"
                    />
                  </>
                )}

                <circle r="5" fill="#00f0ff" stroke="#ffffff" strokeWidth="1.5" />
                <circle r="8" fill="none" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />

                {/* Pin Label */}
                <text
                  x="-10"
                  y="18"
                  className="fill-cyan-300 font-mono text-[10px] font-bold"
                  textAnchor="end"
                >
                  MEXICO CITY (MEX)
                </text>
                <text
                  x="-10"
                  y="28"
                  className="fill-slate-400 font-mono text-[8px]"
                  textAnchor="end"
                >
                  19.4°N, 99.1°W
                </text>
              </g>
            </g>

            {/* ---------------------------------------------------- */}
            {/* JAPAN OUTLINE (RIGHT SIDE)                           */}
            {/* Hokkaido + Honshu + Shikoku + Kyushu                 */}
            {/* ---------------------------------------------------- */}
            <g id="japan-archipelago" className="transition-all duration-500">
              {/* Hokkaido */}
              <path
                d="M 792 104 C 818 96, 836 106, 842 120 C 836 134, 816 138, 800 146 C 785 142, 775 130, 775 122 C 775 114, 784 108, 792 104 Z"
                fill="#0f172a"
                stroke={activeSeason.accentHex}
                strokeWidth="1.4"
                opacity="0.9"
                filter="url(#neon-glow-general)"
              />

              {/* Honshu (Main Island) */}
              <path
                d="M 778 150 C 788 175, 788 200, 780 218 C 778 230, 768 236, 758 244 C 746 254, 736 270, 724 266 C 704 264, 684 270, 668 274 C 680 254, 708 244, 730 228 C 734 210, 744 204, 742 218 C 752 216, 766 190, 774 166, 778 150 Z"
                fill="#0f172a"
                stroke={activeSeason.accentHex}
                strokeWidth="1.5"
                opacity="0.95"
                filter="url(#neon-glow-general)"
              />

              {/* Shikoku */}
              <path
                d="M 698 276 C 715 272, 732 276, 734 288 C 728 298, 712 300, 700 296 C 692 290, 692 280, 698 276 Z"
                fill="#0f172a"
                stroke={activeSeason.accentHex}
                strokeWidth="1.4"
                opacity="0.9"
                filter="url(#neon-glow-general)"
              />

              {/* Kyushu */}
              <path
                d="M 664 280 C 678 283, 684 296, 680 312 C 674 328, 658 332, 650 320 C 646 306, 652 288, 664 280 Z"
                fill="#0f172a"
                stroke={activeSeason.accentHex}
                strokeWidth="1.4"
                opacity="0.9"
                filter="url(#neon-glow-general)"
              />

              {/* Internal Accent Hatching for Japan */}
              <path
                d="M 775 170 L 785 190 M 740 230 L 760 245 M 680 265 L 700 270"
                stroke={activeSeason.accentHex}
                strokeWidth="0.6"
                strokeDasharray="2 3"
                opacity="0.4"
              />

              {/* Tokyo Pin (772, 222) */}
              <g transform="translate(772, 222)">
                {/* IN SPRING & AUTUMN: Tokyo Pin Pulses 'Best seasons to visit!' */}
                {activeSeason.isBestSeason && (
                  <>
                    <circle
                      r="16"
                      fill="none"
                      stroke={activeSeason.accentHex}
                      strokeWidth="2"
                      style={{ animation: 'neon-pulse-beacon 1.6s infinite' }}
                    />
                    <circle
                      r="26"
                      fill="none"
                      stroke={activeSeason.accentHex}
                      strokeWidth="1.5"
                      opacity="0.5"
                      style={{ animation: 'neon-pulse-beacon 2.4s infinite' }}
                    />
                  </>
                )}

                {/* Core Pin Dot */}
                <circle
                  r="6"
                  fill={activeSeason.accentHex}
                  stroke="#ffffff"
                  strokeWidth="2"
                  filter="url(#tokyo-strong-glow)"
                />

                {/* Tokyo Coordinates & Label */}
                <text
                  x="12"
                  y="4"
                  className="fill-white font-mono text-[11px] font-black tracking-wide"
                >
                  TOKYO (TYO)
                </text>
                <text
                  x="12"
                  y="15"
                  className="fill-slate-400 font-mono text-[8px]"
                >
                  35.6°N, 139.7°E
                </text>

                {/* Luminous Pulsing Callout: 'Best seasons to visit!' */}
                {activeSeason.isBestSeason && isArrived && (
                  <g transform="translate(0, -32)" className="transition-all duration-300">
                    <rect
                      x="-95"
                      y="-18"
                      width="190"
                      height="26"
                      rx="13"
                      fill="#020617"
                      stroke={activeSeason.accentHex}
                      strokeWidth="1.75"
                      filter="url(#tokyo-strong-glow)"
                      opacity="0.95"
                    />
                    <text
                      textAnchor="middle"
                      y="-1"
                      className="font-bold text-[10px] tracking-wide"
                      fill="#ffffff"
                    >
                      ★ {isEs ? '¡Mejor temporada para visitar!' : 'Best seasons to visit!'} ★
                    </text>
                  </g>
                )}
              </g>
            </g>

            {/* ---------------------------------------------------- */}
            {/* FLIGHT PATH & DYNAMIC ROUTE ARROW                    */}
            {/* Great Circle Arc: M 172 298 Q 472 80 772 222        */}
            {/* ---------------------------------------------------- */}
            {/* Static Background Route */}
            <path
              d="M 172 298 Q 472 80 772 222"
              fill="none"
              stroke="#334155"
              strokeWidth="2"
              strokeDasharray="4 6"
              opacity="0.4"
            />

            {/* Active Highlighted Animated Dashed Route */}
            <path
              d="M 172 298 Q 472 80 772 222"
              fill="none"
              stroke={
                activeSeason.flightType === 'outbound'
                  ? 'url(#route-gradient-outbound)'
                  : 'url(#route-gradient-return)'
              }
              strokeWidth="2.75"
              strokeDasharray="8 6"
              strokeDashoffset={pathDashOffset}
              filter="url(#neon-glow-general)"
              className="transition-all duration-75"
            />

            {/* Directional Waypoint Arrows along the Curve */}
            {activeSeason.flightType === 'outbound' ? (
              // Outbound Eastward Arrows (MEX -> TYO)
              <g fill={activeSeason.accentHex} opacity="0.8">
                {/* Arrow at 30% */}
                <path d="M 320 178 L 332 172 L 322 165 Z" />
                {/* Arrow at 50% Apex */}
                <path d="M 466 122 L 480 122 L 472 114 Z" />
                {/* Arrow at 70% */}
                <path d="M 620 152 L 632 159 L 629 146 Z" />
              </g>
            ) : (
              // Return Westward Arrows (TYO -> MEX)
              <g fill={activeSeason.accentHex} opacity="0.8">
                {/* Arrow at 70% heading west */}
                <path d="M 632 159 L 620 152 L 626 165 Z" />
                {/* Arrow at 50% Apex heading west */}
                <path d="M 480 122 L 466 122 L 474 130 Z" />
                {/* Arrow at 30% heading west */}
                <path d="M 332 172 L 320 178 L 327 185 Z" />
              </g>
            )}

            {/* ---------------------------------------------------- */}
            {/* SUPERSONIC AIRPLANE ICON                             */}
            {/* Exact tangent derivative rotation at (planeX, planeY)*/}
            {/* ---------------------------------------------------- */}
            <g
              transform={`translate(${planeX}, ${planeY}) rotate(${planeAngle})`}
              className="pointer-events-none"
            >
              {/* Jet Engine Afterburner Flame */}
              <ellipse
                cx="-16"
                cy="0"
                rx="7"
                ry="3"
                fill={activeSeason.accentHex}
                opacity="0.9"
                filter="url(#neon-glow-general)"
              />
              <circle cx="-13" cy="0" r="3" fill="#ffffff" opacity="0.95" />

              {/* Glowing Airframe Drop Shadow */}
              <path
                d="M 14 0 L -3 -11 L 0 -3 L -10 -3 L -13 -7 L -16 -7 L -14 0 L -16 7 L -13 7 L -10 3 L 0 3 L -3 11 Z"
                fill="rgba(0, 240, 255, 0.5)"
                filter="url(#neon-glow-general)"
              />

              {/* Main Supersonic Aircraft Airframe */}
              <path
                d="M 14 0 L -3 -11 L 0 -3 L -10 -3 L -13 -7 L -16 -7 L -14 0 L -16 7 L -13 7 L -10 3 L 0 3 L -3 11 Z"
                fill="#ffffff"
                stroke="#00f0ff"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Cockpit Window */}
              <ellipse cx="6" cy="0" rx="2.5" ry="1.2" fill="#0f172a" />
            </g>
          </svg>

          {/* Telemetry HUD Flight Status Banner */}
          <div className="px-5 sm:px-8 py-3 bg-slate-950/80 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Plane className="w-3.5 h-3.5" />
                <span>{activeSeason.directionEn}</span>
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-400 hidden sm:inline">
                {isEs ? 'Duración aprox: ~14h 30m directos' : 'Est. flight time: ~14h 30m non-stop'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">{isEs ? 'Estado:' : 'Status:'}</span>
              <span
                className="px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider text-[11px]"
                style={{
                  backgroundColor: `${activeSeason.accentHex}20`,
                  color: activeSeason.accentHex,
                  border: `1px solid ${activeSeason.accentHex}50`,
                }}
              >
                {isArrived
                  ? activeSeason.flightType === 'outbound'
                    ? isEs
                      ? 'Llegada a Tokio · Temporada Óptima'
                      : 'Arrived in Tokyo · Prime Season'
                    : isEs
                    ? 'Llegada a México · Retorno Exitoso'
                    : 'Arrived in Mexico · Return Complete'
                  : isEs
                  ? 'En Ruta Transpacífica'
                  : 'En Route across the Pacific'}
              </span>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SEASON CAPTION & TRAVEL INTELLIGENCE CARD (ES / EN)  */}
        {/* ---------------------------------------------------- */}
        <div className="relative z-10 p-5 sm:p-8 bg-slate-900/60 border-t border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Season Meta & Badges */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="p-2 rounded-xl"
                    style={{
                      backgroundColor: `${activeSeason.accentHex}25`,
                      color: activeSeason.accentHex,
                    }}
                  >
                    {activeSeason.id === 'spring' ? (
                      <Flower2 className="w-5 h-5" />
                    ) : activeSeason.id === 'summer' ? (
                      <Sun className="w-5 h-5" />
                    ) : activeSeason.id === 'autumn' ? (
                      <Leaf className="w-5 h-5" />
                    ) : (
                      <Snowflake className="w-5 h-5" />
                    )}
                  </span>
                  <div>
                    <h4 className="text-lg font-black text-white">
                      {isEs ? activeSeason.nameEs : activeSeason.nameEn}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {isEs ? activeSeason.monthsEs : activeSeason.monthsEn}
                    </p>
                  </div>
                </div>

                {activeSeason.isBestSeason ? (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40 flex items-center gap-1 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                    <Star className="w-3.5 h-3.5 fill-pink-300" />
                    <span>{isEs ? 'Recomendada' : 'Top Choice'}</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    {isEs ? 'Temporada Baja' : 'Off-Peak'}
                  </span>
                )}
              </div>

              {/* Meteorological Indicators */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isEs ? 'Temperatura' : 'Temperature'}</span>
                  </div>
                  <div className="text-white font-bold text-sm">{activeSeason.temp}</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                    <CloudRain className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isEs ? 'Precipitaciones' : 'Rainfall'}</span>
                  </div>
                  <div className="text-white font-bold text-xs truncate">
                    {isEs ? activeSeason.rainfallEs : activeSeason.rainfallEn}
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div
                className="p-3.5 rounded-2xl border text-xs"
                style={{
                  backgroundColor: `${activeSeason.accentHex}10`,
                  borderColor: `${activeSeason.accentHex}30`,
                }}
              >
                <div className="flex items-center gap-2 font-bold mb-1" style={{ color: activeSeason.accentHex }}>
                  <Compass className="w-4 h-4" />
                  <span>{isEs ? activeSeason.directionEs : activeSeason.directionEn}</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {isEs ? activeSeason.statusBadgeEs : activeSeason.statusBadgeEn}
                </p>
              </div>
            </div>

            {/* Right Column: Detailed Travel Narrative & Highlights */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {isEs ? 'Análisis Estacional de Viaje' : 'Seasonal Travel Analysis'}
                </h5>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {isEs ? activeSeason.narrativeEs : activeSeason.narrativeEn}
                </p>
              </div>

              {/* Highlights List */}
              <div className="space-y-2 pt-2">
                <h6 className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wide">
                  {isEs ? 'Puntos Destacados de la Temporada:' : 'Seasonal Highlights:'}
                </h6>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(isEs ? activeSeason.highlightsEs : activeSeason.highlightsEn).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/70 flex items-start gap-2"
                    >
                      <CheckCircle2
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: activeSeason.accentHex }}
                      />
                      <span className="text-xs text-slate-300 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Advice Alert */}
              <div className="mt-3 p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/90 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-300 mr-1.5">
                    {isEs ? 'Consejo Práctico:' : 'Traveler Tip:'}
                  </span>
                  {isEs ? activeSeason.tipEs : activeSeason.tipEn}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
