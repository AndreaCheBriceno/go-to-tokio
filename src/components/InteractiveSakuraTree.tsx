'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useReducedMotion, type TargetAndTransition } from 'framer-motion';
import { Sparkles, Wind } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

export interface InteractiveSakuraTreeProps {
  onShake: (originX: number, originY: number) => void;
  ambient?: boolean;
  onToggleAmbient?: () => void;
  className?: string;
}

interface LocalPetal {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  scale: number;
  rotateEnd: number;
  color: string;
}

const LOCAL_PETAL_COLORS = [
  '#ffe4e6',
  '#fecdd3',
  '#fda4af',
  '#fb7185',
  '#f472b6',
  '#ffccd5',
];

export default function InteractiveSakuraTree({
  onShake,
  ambient = true,
  onToggleAmbient,
  className = '',
}: InteractiveSakuraTreeProps) {
  const { language } = useSiteContent();
  const isEs = language === 'es';
  const prefersReducedMotion = useReducedMotion();

  const [isShaking, setIsShaking] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [localPetals, setLocalPetals] = useState<LocalPetal[]>([]);

  const treeRef = useRef<HTMLDivElement | null>(null);
  const shakeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const petalTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
      petalTimersRef.current.forEach((t) => clearTimeout(t));
      petalTimersRef.current = [];
    };
  }, []);

  const spawnLocalPetals = useCallback(() => {
    if (prefersReducedMotion) return;

    // Spawn 7-9 local falling petals that drift downwards from branch clusters
    const count = 8;
    const batchId = Date.now();
    const newPetals: LocalPetal[] = [];

    for (let i = 0; i < count; i++) {
      // Pick canopy quadrant: 0 = left branch, 1 = crown, 2 = right branch
      const zone = Math.random();
      let startX: number;
      let startY: number;

      if (zone < 0.35) {
        // Left branch
        startX = 110 + Math.random() * 90;
        startY = 190 + Math.random() * 90;
      } else if (zone < 0.65) {
        // Crown
        startX = 230 + Math.random() * 140;
        startY = 110 + Math.random() * 100;
      } else {
        // Right branch
        startX = 400 + Math.random() * 100;
        startY = 180 + Math.random() * 100;
      }

      newPetals.push({
        id: batchId + i,
        startX,
        startY,
        endX: startX + (Math.random() * 70 - 25),
        endY: 460 + Math.random() * 30,
        scale: 0.65 + Math.random() * 0.45,
        rotateEnd: (Math.random() - 0.5) * 360,
        color: LOCAL_PETAL_COLORS[Math.floor(Math.random() * LOCAL_PETAL_COLORS.length)],
      });
    }

    setLocalPetals((prev) => [...prev, ...newPetals]);

    const timer = setTimeout(() => {
      setLocalPetals((prev) => prev.filter((p) => !newPetals.some((np) => np.id === p.id)));
      petalTimersRef.current = petalTimersRef.current.filter((t) => t !== timer);
    }, 2200);

    petalTimersRef.current.push(timer);
  }, [prefersReducedMotion]);

  const handleTreeClick = (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    setIsShaking(true);
    setShakeCount((prev) => prev + 1);

    // Calculate burst origin coordinates
    const rect = treeRef.current?.getBoundingClientRect();
    const clientX = 'clientX' in e ? e.clientX : undefined;
    const clientY = 'clientY' in e ? e.clientY : undefined;
    const originX = rect ? rect.left + rect.width / 2 : clientX ?? 600;
    const originY = rect ? rect.top + rect.height * 0.38 : clientY ?? 300;

    onShake(originX, originY);
    spawnLocalPetals();

    if (shakeTimerRef.current) {
      clearTimeout(shakeTimerRef.current);
    }
    shakeTimerRef.current = setTimeout(() => {
      setIsShaking(false);
    }, 900);
  };

  // Branch and trunk motion animations (transform only with spring decay & idle breeze)
  const trunkMotion: TargetAndTransition = isShaking && !prefersReducedMotion
    ? {
        rotate: [0, -2.6, 2.2, -1.4, 0.8, -0.3, 0],
        transition: { duration: 0.85, ease: 'easeOut' },
      }
    : ambient && !prefersReducedMotion
    ? {
        rotate: [-0.35, 0.4, -0.35],
        transition: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
      }
    : { rotate: 0 };

  const branchLeftMotion: TargetAndTransition = isShaking && !prefersReducedMotion
    ? {
        rotate: [0, -7.8, 6.2, -4.5, 3.0, -1.5, 0.6, 0],
        transition: { duration: 0.9, ease: 'easeOut' },
      }
    : ambient && !prefersReducedMotion
    ? {
        rotate: [-1.4, 1.6, -1.4],
        transition: { duration: 5.4, repeat: Infinity, ease: 'easeInOut' },
      }
    : { rotate: 0 };

  const branchRightMotion: TargetAndTransition = isShaking && !prefersReducedMotion
    ? {
        rotate: [0, 8.2, -6.5, 4.8, -3.1, 1.4, -0.5, 0],
        transition: { duration: 0.9, ease: 'easeOut', delay: 0.02 },
      }
    : ambient && !prefersReducedMotion
    ? {
        rotate: [1.5, -1.4, 1.5],
        transition: { duration: 6.0, repeat: Infinity, ease: 'easeInOut' },
      }
    : { rotate: 0 };

  const crownMotion: TargetAndTransition = isShaking && !prefersReducedMotion
    ? {
        rotate: [0, -5.2, 4.5, -3.2, 2.0, -0.9, 0],
        y: [0, -4, 3, -1.6, 0.8, 0],
        transition: { duration: 0.85, ease: 'easeOut', delay: 0.02 },
      }
    : ambient && !prefersReducedMotion
    ? {
        rotate: [-0.8, 1.0, -0.8],
        y: [-1, 1, -1],
        transition: { duration: 5.0, repeat: Infinity, ease: 'easeInOut' },
      }
    : { rotate: 0, y: 0 };

  const lanternLeftMotion: TargetAndTransition = isShaking && !prefersReducedMotion
    ? {
        rotate: [0, -16, 13, -9, 5, -2, 0],
        transition: { duration: 1.2, ease: 'easeOut' },
      }
    : ambient && !prefersReducedMotion
    ? {
        rotate: [-3.5, 3.5, -3.5],
        transition: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' },
      }
    : { rotate: 0 };

  const lanternRightMotion: TargetAndTransition = isShaking && !prefersReducedMotion
    ? {
        rotate: [0, 17, -14, 9, -5, 2, 0],
        transition: { duration: 1.2, ease: 'easeOut' },
      }
    : ambient && !prefersReducedMotion
    ? {
        rotate: [3.5, -3.5, 3.5],
        transition: { duration: 3.7, repeat: Infinity, ease: 'easeInOut' },
      }
    : { rotate: 0 };

  return (
    <div
      className={`relative glass-panel rounded-3xl p-6 sm:p-8 border border-pink-500/30 overflow-hidden shadow-[0_0_35px_rgba(255,42,133,0.15)] ${className}`}
    >
      {/* Decorative ambient aura backgrounds */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar with bilingual titles and breeze toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 animate-spin text-pink-400" />
            <span>
              {isEs ? 'Jardín Japonés Interactivo • Simulación Cultural' : 'Interactive Japanese Garden Feature'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            {isEs ? 'Árbol Sagrado de Cerezos (Sakura)' : 'Sacred Sakura Blossom Tree'}{' '}
            <span className="text-pink-300 text-base font-normal">桜の木</span>
          </h3>
        </div>

        {onToggleAmbient && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleAmbient}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                ambient
                  ? 'bg-pink-500/25 text-pink-300 border border-pink-500/50 shadow-[0_0_12px_rgba(255,42,133,0.3)]'
                  : 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:text-white'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>
                {ambient
                  ? isEs ? 'Brisa Ambiental: ACTIVADA' : 'Ambient Breeze: ON'
                  : isEs ? 'Brisa Ambiental: DESACTIVADA' : 'Ambient Breeze: OFF'}
              </span>
            </button>
          </div>
        )}
      </div>

      <p className="text-xs sm:text-sm text-neutral-300 mb-6 max-w-3xl">
        {isEs
          ? '¡Haz clic o toca el árbol de sakura para sacudir sus ramas y liberar una danza de pétalos por toda la pantalla! En la tradición japonesa, el florecimiento de los cerezos evoca el concepto de "mono no aware" (el aprecio por la belleza fugaz y sagrada de la vida).'
          : 'Click or tap the sakura tree below to gently shake its branches and release a shower of cherry blossom petals across the screen! In Tokyo, cherry blossoms symbolize spring and the aesthetic of mono no aware (the fleeting beauty of nature).'}
      </p>

      {/* Interactive Tree Stage */}
      <div className="flex flex-col items-center justify-center py-2 sm:py-4">
        <div
          ref={treeRef}
          role="button"
          tabIndex={0}
          onClick={handleTreeClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTreeClick(e);
            }
          }}
          aria-label={isEs ? 'Sacudir el árbol de cerezos de sakura' : 'Shake the sakura cherry blossom tree'}
          className="cursor-pointer group relative select-none transition-transform hover:scale-[1.015] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-3xl"
          title={isEs ? '¡Haz clic para sacudir el árbol de sakura!' : 'Click to shake the sakura tree!'}
        >
          {/* Subtle glow behind tree foliage */}
          <div className="absolute inset-0 m-auto w-56 h-56 bg-pink-400/20 rounded-full blur-3xl group-hover:bg-pink-400/30 transition duration-500 pointer-events-none" />

          {/* Masterpiece Code-Made SVG Sakura Bonsai Tree */}
          <svg
            viewBox="0 0 600 520"
            className="w-80 sm:w-[480px] md:w-[540px] h-auto drop-shadow-[0_12px_30px_rgba(255,105,180,0.32)] overflow-visible"
          >
            <defs>
              {/* Bark gradients */}
              <linearGradient id="sakuraTrunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#452313" />
                <stop offset="35%" stopColor="#2e150a" />
                <stop offset="70%" stopColor="#1a0b04" />
                <stop offset="100%" stopColor="#281207" />
              </linearGradient>

              <linearGradient id="branchWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5a2d18" />
                <stop offset="50%" stopColor="#3d1d0f" />
                <stop offset="100%" stopColor="#220e06" />
              </linearGradient>

              {/* Foliage blossom gradients */}
              <radialGradient id="blossomClusterBack" cx="45%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="45%" stopColor="#f43f5e" />
                <stop offset="85%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#881337" />
              </radialGradient>

              <radialGradient id="blossomClusterMid" cx="40%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#fff1f2" />
                <stop offset="30%" stopColor="#fecdd3" />
                <stop offset="70%" stopColor="#fb7185" />
                <stop offset="100%" stopColor="#e11d48" />
              </radialGradient>

              <radialGradient id="blossomClusterFront" cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#ffe4e6" />
                <stop offset="75%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#db2777" />
              </radialGradient>

              {/* Zen Mound & Grass */}
              <linearGradient id="zenMoundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="60%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              {/* Reusable 5-petal sakura flower floret */}
              <g id="sakuraFlower">
                <g transform="rotate(0)">
                  <path d="M 0 0 C -3 -5 -4 -10 -1 -12 L 0 -10.5 L 1 -12 C 4 -10 3 -5 0 0 Z" fill="#ffe4e6" />
                </g>
                <g transform="rotate(72)">
                  <path d="M 0 0 C -3 -5 -4 -10 -1 -12 L 0 -10.5 L 1 -12 C 4 -10 3 -5 0 0 Z" fill="#ffccd5" />
                </g>
                <g transform="rotate(144)">
                  <path d="M 0 0 C -3 -5 -4 -10 -1 -12 L 0 -10.5 L 1 -12 C 4 -10 3 -5 0 0 Z" fill="#ffccd5" />
                </g>
                <g transform="rotate(216)">
                  <path d="M 0 0 C -3 -5 -4 -10 -1 -12 L 0 -10.5 L 1 -12 C 4 -10 3 -5 0 0 Z" fill="#ffe4e6" />
                </g>
                <g transform="rotate(288)">
                  <path d="M 0 0 C -3 -5 -4 -10 -1 -12 L 0 -10.5 L 1 -12 C 4 -10 3 -5 0 0 Z" fill="#ffccd5" />
                </g>
                <circle cx="0" cy="0" r="2.8" fill="#f43f5e" />
                <circle cx="0" cy="0" r="1.4" fill="#fef08a" />
              </g>

              {/* Reusable single notched petal */}
              <path
                id="sakuraSinglePetal"
                d="M 0 0 C -3 -5 -4 -10 -1 -11.5 L 0 -10 L 1 -11.5 C 4 -10 3 -5 0 0 Z"
                fill="#fbcfe8"
                opacity="0.9"
              />
            </defs>

            {/* Ground / Zen Stone Mound Base */}
            <g id="groundMound">
              <ellipse cx="300" cy="482" rx="220" ry="26" fill="url(#zenMoundGrad)" />
              <ellipse cx="300" cy="478" rx="195" ry="20" fill="#131c2d" />
              <ellipse cx="300" cy="474" rx="165" ry="14" fill="#1e293b" />

              {/* Zen river stones around roots */}
              <ellipse cx="190" cy="482" rx="26" ry="10" fill="#334155" opacity="0.9" />
              <ellipse cx="188" cy="480" rx="20" ry="7" fill="#475569" opacity="0.8" />
              <ellipse cx="410" cy="481" rx="28" ry="11" fill="#334155" opacity="0.9" />
              <ellipse cx="412" cy="479" rx="22" ry="8" fill="#475569" opacity="0.8" />
              <ellipse cx="250" cy="485" rx="16" ry="6" fill="#1e293b" />
              <ellipse cx="360" cy="486" rx="18" ry="7" fill="#1e293b" />

              {/* Moss green accents */}
              <path d="M 230 478 Q 245 474 260 478 Q 245 482 230 478 Z" fill="#15803d" opacity="0.65" />
              <path d="M 340 479 Q 355 475 370 479 Q 355 483 340 479 Z" fill="#15803d" opacity="0.65" />

              {/* Fallen cherry petals scattered on zen soil */}
              <circle cx="160" cy="483" r="3.5" fill="#fda4af" opacity="0.8" />
              <circle cx="210" cy="481" r="4.5" fill="#fb7185" opacity="0.85" />
              <circle cx="235" cy="485" r="3" fill="#fecdd3" opacity="0.75" />
              <circle cx="280" cy="484" r="4" fill="#fda4af" opacity="0.9" />
              <circle cx="325" cy="486" r="3.5" fill="#fb7185" opacity="0.85" />
              <circle cx="380" cy="483" r="4.2" fill="#fecdd3" opacity="0.8" />
              <circle cx="430" cy="484" r="3" fill="#fda4af" opacity="0.75" />
              <circle cx="455" cy="481" r="3.8" fill="#fb7185" opacity="0.8" />
            </g>

            {/* Tree Trunk Base & Gnarled Roots (Trunk Sway Group) */}
            <motion.g
              style={{ transformOrigin: '300px 480px' }}
              animate={trunkMotion}
            >
              {/* Massive Gnarled Trunk with Buttress Roots */}
              <path
                d="M 235 480 
                   C 255 476 270 460 274 430
                   C 278 395 268 360 270 330
                   C 273 295 285 265 292 235
                   C 298 210 300 185 302 165
                   C 305 185 310 210 314 235
                   C 320 265 330 295 332 325
                   C 334 355 324 395 328 430
                   C 332 460 348 476 368 480
                   C 350 478 335 472 325 464
                   C 315 456 308 450 300 450
                   C 292 450 285 456 275 464
                   C 265 472 250 478 235 480 Z"
                fill="url(#sakuraTrunkGrad)"
              />

              {/* Buttress Root Left */}
              <path
                d="M 274 430 C 260 445 235 462 195 476 C 228 468 255 455 272 438 Z"
                fill="url(#sakuraTrunkGrad)"
              />
              {/* Buttress Root Right */}
              <path
                d="M 328 430 C 342 445 368 462 408 476 C 374 468 347 455 330 438 Z"
                fill="url(#sakuraTrunkGrad)"
              />

              {/* Ancient Bark Ridges & Wood Grain Contours */}
              <path
                d="M 284 445 Q 280 380 286 320"
                stroke="#633118"
                strokeWidth="2.5"
                fill="none"
                opacity="0.55"
              />
              <path
                d="M 316 445 Q 322 380 316 320"
                stroke="#241107"
                strokeWidth="3"
                fill="none"
                opacity="0.65"
              />
              <path
                d="M 295 435 Q 292 370 298 290"
                stroke="#4a2412"
                strokeWidth="2"
                fill="none"
                opacity="0.5"
              />
              <path
                d="M 305 435 Q 308 370 304 290"
                stroke="#783c1d"
                strokeWidth="1.8"
                fill="none"
                opacity="0.45"
              />

              {/* Trunk knot hole */}
              <ellipse cx="298" cy="365" rx="6" ry="11" fill="#140803" />
              <path d="M 292 355 Q 308 365 292 377" stroke="#5a2d18" strokeWidth="1.5" fill="none" opacity="0.6" />
            </motion.g>

            {/* Left Main Branch Group */}
            <motion.g
              style={{ transformOrigin: '270px 330px' }}
              animate={branchLeftMotion}
            >
              {/* Main Left Bough */}
              <path
                d="M 272 335 
                   C 240 320 205 305 165 285 
                   C 135 270 105 245 78 218 
                   C 95 224 118 238 142 248 
                   C 178 262 215 280 252 298 
                   C 264 304 270 318 272 335 Z"
                fill="url(#branchWoodGrad)"
              />
              {/* Secondary Upward Fork */}
              <path
                d="M 185 293 
                   C 165 260 142 225 120 185 
                   C 130 196 142 215 155 238 
                   C 170 262 182 278 185 293 Z"
                fill="url(#branchWoodGrad)"
              />
              {/* Lower Twig */}
              <path
                d="M 125 258 C 105 275 80 290 55 305 C 75 295 98 282 118 268 Z"
                fill="url(#branchWoodGrad)"
              />

              {/* Left Blossom Cloud Layer 1 (Dark Shadow Depth) */}
              <circle cx="75" cy="210" r="42" fill="url(#blossomClusterBack)" opacity="0.9" />
              <circle cx="115" cy="180" r="46" fill="url(#blossomClusterBack)" opacity="0.9" />
              <circle cx="150" cy="235" r="40" fill="url(#blossomClusterBack)" opacity="0.88" />
              <circle cx="60" cy="255" r="32" fill="url(#blossomClusterBack)" opacity="0.85" />

              {/* Left Blossom Cloud Layer 2 (Mid Radiant Pink) */}
              <circle cx="95" cy="205" r="44" fill="url(#blossomClusterMid)" opacity="0.96" />
              <circle cx="135" cy="175" r="42" fill="url(#blossomClusterMid)" opacity="0.96" />
              <circle cx="65" cy="215" r="36" fill="url(#blossomClusterMid)" opacity="0.94" />
              <circle cx="145" cy="225" r="38" fill="url(#blossomClusterMid)" opacity="0.94" />
              <circle cx="180" cy="265" r="34" fill="url(#blossomClusterMid)" opacity="0.92" />

              {/* Left Blossom Cloud Layer 3 (Foreground Highlight Soft Pinks) */}
              <circle cx="85" cy="195" r="32" fill="url(#blossomClusterFront)" opacity="0.98" />
              <circle cx="125" cy="165" r="34" fill="url(#blossomClusterFront)" opacity="0.98" />
              <circle cx="110" cy="220" r="28" fill="url(#blossomClusterFront)" opacity="0.95" />
              <circle cx="155" cy="215" r="26" fill="url(#blossomClusterFront)" opacity="0.95" />

              {/* Intricate Individual Sakura Flowers on Left Branches */}
              <use href="#sakuraFlower" x="70" y="200" transform="scale(1.15)" />
              <use href="#sakuraFlower" x="110" y="165" transform="scale(1.2)" />
              <use href="#sakuraFlower" x="135" y="210" transform="scale(1.05)" />
              <use href="#sakuraFlower" x="55" y="240" transform="scale(0.95)" />
              <use href="#sakuraFlower" x="160" y="250" transform="scale(1.1)" />

              {/* Left Traditional Festive Chōchin Lantern */}
              <motion.g
                style={{ transformOrigin: '140px 255px' }}
                animate={lanternLeftMotion}
              >
                <line x1="140" y1="255" x2="140" y2="272" stroke="#5a2d18" strokeWidth="1.8" />
                {/* Lantern Body */}
                <rect
                  x="131"
                  y="272"
                  width="18"
                  height="26"
                  rx="5"
                  fill="#dc2626"
                  filter="drop-shadow(0 0 8px rgba(239,68,68,0.75))"
                />
                <line x1="131" y1="277" x2="149" y2="277" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="131" y1="293" x2="149" y2="293" stroke="#fef08a" strokeWidth="1.2" />
                <text x="140" y="289" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                  春
                </text>
                {/* Tassel */}
                <line x1="140" y1="298" x2="140" y2="308" stroke="#fef08a" strokeWidth="1.5" />
              </motion.g>
            </motion.g>

            {/* Right Main Branch Group */}
            <motion.g
              style={{ transformOrigin: '330px 325px' }}
              animate={branchRightMotion}
            >
              {/* Main Right Bough */}
              <path
                d="M 328 325 
                   C 365 310 405 292 445 270 
                   C 478 252 510 225 538 195 
                   C 520 204 495 218 470 230 
                   C 432 248 395 270 355 290 
                   C 342 298 334 310 328 325 Z"
                fill="url(#branchWoodGrad)"
              />
              {/* Secondary Upward Fork */}
              <path
                d="M 425 280 
                   C 445 245 470 208 495 168 
                   C 482 180 468 200 452 225 
                   C 438 248 428 268 425 280 Z"
                fill="url(#branchWoodGrad)"
              />
              {/* Lower Twig */}
              <path
                d="M 480 245 C 502 262 528 276 555 290 C 532 280 508 268 488 255 Z"
                fill="url(#branchWoodGrad)"
              />

              {/* Right Blossom Cloud Layer 1 (Dark Shadow Depth) */}
              <circle cx="530" cy="190" r="44" fill="url(#blossomClusterBack)" opacity="0.9" />
              <circle cx="485" cy="160" r="46" fill="url(#blossomClusterBack)" opacity="0.9" />
              <circle cx="450" cy="225" r="42" fill="url(#blossomClusterBack)" opacity="0.88" />
              <circle cx="545" cy="245" r="34" fill="url(#blossomClusterBack)" opacity="0.85" />

              {/* Right Blossom Cloud Layer 2 (Mid Radiant Pink) */}
              <circle cx="505" cy="185" r="46" fill="url(#blossomClusterMid)" opacity="0.96" />
              <circle cx="465" cy="155" r="44" fill="url(#blossomClusterMid)" opacity="0.96" />
              <circle cx="535" cy="195" r="38" fill="url(#blossomClusterMid)" opacity="0.94" />
              <circle cx="455" cy="215" r="40" fill="url(#blossomClusterMid)" opacity="0.94" />
              <circle cx="420" cy="255" r="36" fill="url(#blossomClusterMid)" opacity="0.92" />

              {/* Right Blossom Cloud Layer 3 (Foreground Highlight Soft Pinks) */}
              <circle cx="515" cy="175" r="34" fill="url(#blossomClusterFront)" opacity="0.98" />
              <circle cx="475" cy="145" r="36" fill="url(#blossomClusterFront)" opacity="0.98" />
              <circle cx="490" cy="205" r="30" fill="url(#blossomClusterFront)" opacity="0.95" />
              <circle cx="445" cy="205" r="28" fill="url(#blossomClusterFront)" opacity="0.95" />

              {/* Intricate Individual Sakura Flowers on Right Branches */}
              <use href="#sakuraFlower" x="525" y="180" transform="scale(1.2)" />
              <use href="#sakuraFlower" x="480" y="145" transform="scale(1.15)" />
              <use href="#sakuraFlower" x="460" y="195" transform="scale(1.1)" />
              <use href="#sakuraFlower" x="540" y="225" transform="scale(0.95)" />
              <use href="#sakuraFlower" x="435" y="240" transform="scale(1.05)" />

              {/* Right Traditional Festive Chōchin Lantern */}
              <motion.g
                style={{ transformOrigin: '460px 245px' }}
                animate={lanternRightMotion}
              >
                <line x1="460" y1="245" x2="460" y2="262" stroke="#5a2d18" strokeWidth="1.8" />
                {/* Lantern Body */}
                <rect
                  x="451"
                  y="262"
                  width="18"
                  height="26"
                  rx="5"
                  fill="#dc2626"
                  filter="drop-shadow(0 0 8px rgba(239,68,68,0.75))"
                />
                <line x1="451" y1="267" x2="469" y2="267" stroke="#fef08a" strokeWidth="1.2" />
                <line x1="451" y1="283" x2="469" y2="283" stroke="#fef08a" strokeWidth="1.2" />
                <text x="460" y="279" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                  桜
                </text>
                {/* Tassel */}
                <line x1="460" y1="288" x2="460" y2="298" stroke="#fef08a" strokeWidth="1.5" />
              </motion.g>
            </motion.g>

            {/* Central High Crown Canopy Group */}
            <motion.g
              style={{ transformOrigin: '300px 240px' }}
              animate={crownMotion}
            >
              {/* Crown High Branches */}
              <path
                d="M 295 240 C 275 190 250 145 220 105 C 235 118 255 145 272 178 C 285 204 292 225 295 240 Z"
                fill="url(#branchWoodGrad)"
              />
              <path
                d="M 305 240 C 325 190 350 145 380 105 C 365 118 345 145 328 178 C 315 204 308 225 305 240 Z"
                fill="url(#branchWoodGrad)"
              />
              <path
                d="M 300 210 C 298 165 299 120 300 80 C 302 120 302 165 300 210 Z"
                stroke="#4a2412"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Crown Canopy Layer 1 (Dark Shadow Depth) */}
              <circle cx="300" cy="90" r="58" fill="url(#blossomClusterBack)" opacity="0.9" />
              <circle cx="230" cy="115" r="50" fill="url(#blossomClusterBack)" opacity="0.9" />
              <circle cx="370" cy="115" r="50" fill="url(#blossomClusterBack)" opacity="0.9" />
              <circle cx="185" cy="140" r="42" fill="url(#blossomClusterBack)" opacity="0.88" />
              <circle cx="415" cy="140" r="42" fill="url(#blossomClusterBack)" opacity="0.88" />

              {/* Crown Canopy Layer 2 (Mid Radiant Pink Clouds) */}
              <circle cx="300" cy="80" r="54" fill="url(#blossomClusterMid)" opacity="0.96" />
              <circle cx="250" cy="100" r="52" fill="url(#blossomClusterMid)" opacity="0.96" />
              <circle cx="350" cy="100" r="52" fill="url(#blossomClusterMid)" opacity="0.96" />
              <circle cx="205" cy="130" r="44" fill="url(#blossomClusterMid)" opacity="0.95" />
              <circle cx="395" cy="130" r="44" fill="url(#blossomClusterMid)" opacity="0.95" />
              <circle cx="300" cy="135" r="46" fill="url(#blossomClusterMid)" opacity="0.96" />

              {/* Crown Canopy Layer 3 (Foreground Highlight Soft Pinks) */}
              <circle cx="300" cy="70" r="42" fill="url(#blossomClusterFront)" opacity="0.98" />
              <circle cx="265" cy="88" r="40" fill="url(#blossomClusterFront)" opacity="0.98" />
              <circle cx="335" cy="88" r="40" fill="url(#blossomClusterFront)" opacity="0.98" />
              <circle cx="225" cy="120" r="36" fill="url(#blossomClusterFront)" opacity="0.98" />
              <circle cx="375" cy="120" r="36" fill="url(#blossomClusterFront)" opacity="0.98" />
              <circle cx="300" cy="115" r="38" fill="url(#blossomClusterFront)" opacity="0.98" />

              {/* Intricate Individual Sakura Flowers on Crown Canopy */}
              <use href="#sakuraFlower" x="300" y="65" transform="scale(1.25)" />
              <use href="#sakuraFlower" x="250" y="85" transform="scale(1.2)" />
              <use href="#sakuraFlower" x="350" y="85" transform="scale(1.2)" />
              <use href="#sakuraFlower" x="215" y="115" transform="scale(1.15)" />
              <use href="#sakuraFlower" x="385" y="115" transform="scale(1.15)" />
              <use href="#sakuraFlower" x="290" y="110" transform="scale(1.2)" />
              <use href="#sakuraFlower" x="315" y="130" transform="scale(1.1)" />
            </motion.g>

            {/* Few Falling Petals Locally inside the Tree Canvas */}
            {localPetals.map((petal) => (
              <motion.path
                key={petal.id}
                d="M 0 0 C -3 -5 -4 -10 -1 -11.5 L 0 -10 L 1 -11.5 C 4 -10 3 -5 0 0 Z"
                fill={petal.color}
                initial={{
                  x: petal.startX,
                  y: petal.startY,
                  opacity: 0.95,
                  scale: petal.scale,
                  rotate: 0,
                }}
                animate={{
                  x: petal.endX,
                  y: petal.endY,
                  opacity: [0.95, 0.9, 0.75, 0],
                  rotate: petal.rotateEnd,
                }}
                transition={{
                  duration: 1.9,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            ))}
          </svg>

          {/* Bilingual interactive Callout Hint */}
          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-300 text-xs sm:text-sm font-semibold shadow-[0_0_20px_rgba(255,42,133,0.35)] transition-all group-hover:scale-105 group-hover:bg-pink-500/25 group-hover:border-pink-400 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>
                {isEs
                  ? '🌸 ¡HAZ CLIC AL ÁRBOL PARA SACUDIRLO Y SOLTAR PÉTALOS! 🌸'
                  : '🌸 CLICK TREE TO SHAKE & RELEASE PETALS! 🌸'}
              </span>
            </span>
          </div>
        </div>

        {/* Shake Counter & Dynamic Zen Status */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-5 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span>{isEs ? 'Sacudidas activadas:' : 'Shakes Triggered:'}</span>
            <span className="text-pink-400 font-bold tabular-nums text-sm">{shakeCount}</span>
          </div>
          <div className="text-neutral-600 hidden sm:block">•</div>
          <div className="flex items-center gap-1.5">
            <span>{isEs ? 'Estado:' : 'Status:'}</span>
            <span
              className={`font-medium transition-colors ${
                isShaking ? 'text-pink-400 font-semibold' : 'text-emerald-400'
              }`}
            >
              {isShaking
                ? isEs ? '¡Floreciendo con la brisa!' : 'Blooming in the wind!'
                : isEs ? 'En calma en el jardín zen' : 'Resting in zen calm'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
