'use client';

import React, { useState, useRef } from 'react';
import { Sparkles, Wind } from 'lucide-react';

interface InteractiveSakuraTreeProps {
  onShake: (x: number, y: number) => void;
  ambient: boolean;
  onToggleAmbient: () => void;
}

export default function InteractiveSakuraTree({
  onShake,
  ambient,
  onToggleAmbient,
}: InteractiveSakuraTreeProps) {
  const [shaking, setShaking] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const treeRef = useRef<HTMLDivElement | null>(null);

  const handleTreeClick = (e: React.MouseEvent) => {
    setShaking(true);
    setShakeCount((prev) => prev + 1);

    const rect = treeRef.current?.getBoundingClientRect();
    const originX = rect ? rect.left + rect.width / 2 : e.clientX;
    const originY = rect ? rect.top + rect.height * 0.35 : e.clientY;

    onShake(originX, originY);

    setTimeout(() => {
      setShaking(false);
    }, 650);
  };

  return (
    <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-pink-500/30 overflow-hidden shadow-[0_0_35px_rgba(255,42,133,0.15)]">
      {/* Decorative background aura */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-pink-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 animate-spin text-pink-400" />
            <span>Interactive Japanese Garden Feature</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            Sacred Sakura Blossom Tree <span className="text-pink-300 text-base font-normal">桜の木</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAmbient}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
              ambient
                ? 'bg-pink-500/25 text-pink-300 border border-pink-500/50 shadow-[0_0_12px_rgba(255,42,133,0.3)]'
                : 'bg-neutral-800 text-neutral-400 border border-neutral-700 hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>{ambient ? 'Ambient Breeze: ON' : 'Ambient Breeze: OFF'}</span>
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-neutral-300 mb-6">
        Click or tap the sakura tree below to gently shake its branches and release a shower of cherry blossom petals across the screen! In Tokyo, cherry blossoms symbolize the arrival of spring and the ancient aesthetic of <em>mono no aware</em> (the fleeting beauty of nature).
      </p>

      {/* Interactive Tree Stage */}
      <div className="flex flex-col items-center justify-center py-4">
        <div
          ref={treeRef}
          onClick={handleTreeClick}
          className={`cursor-pointer group relative select-none transition-transform ${
            shaking ? 'animate-tree-shake' : 'hover:scale-[1.02]'
          }`}
          title="Click to shake the sakura tree!"
        >
          {/* Subtle glow behind branches */}
          <div className="absolute inset-0 m-auto w-48 h-48 bg-pink-400/20 rounded-full blur-2xl group-hover:bg-pink-400/35 transition" />

          {/* Handcrafted Stylized Vector Sakura Tree */}
          <svg
            viewBox="0 0 400 360"
            className="w-72 sm:w-88 h-64 sm:h-80 drop-shadow-[0_10px_25px_rgba(255,105,180,0.3)]"
          >
            <defs>
              {/* Trunk Gradient */}
              <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4a2511" />
                <stop offset="50%" stopColor="#2c1408" />
                <stop offset="100%" stopColor="#1a0c05" />
              </linearGradient>

              {/* Foliage Blossom Gradients */}
              <radialGradient id="foliageGrad1" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffe4e1" />
                <stop offset="40%" stopColor="#ffb6c1" />
                <stop offset="85%" stopColor="#ff69b4" />
                <stop offset="100%" stopColor="#ff1493" />
              </radialGradient>
              <radialGradient id="foliageGrad2" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#ffc0cb" />
                <stop offset="75%" stopColor="#ff69b4" />
                <stop offset="100%" stopColor="#db2777" />
              </radialGradient>
            </defs>

            {/* Mossy Stone & Fallen Petals Mound */}
            <ellipse cx="200" cy="335" rx="140" ry="20" fill="#1e293b" />
            <ellipse cx="200" cy="332" rx="125" ry="14" fill="#0f172a" />
            {/* Ground petals */}
            <circle cx="160" cy="334" r="3" fill="#ffb6c1" opacity="0.8" />
            <circle cx="230" cy="332" r="4" fill="#ff69b4" opacity="0.9" />
            <circle cx="190" cy="336" r="3.5" fill="#ffb6c1" opacity="0.85" />
            <circle cx="130" cy="331" r="2.5" fill="#ff8da1" opacity="0.75" />
            <circle cx="260" cy="333" r="3" fill="#ffc0cb" opacity="0.8" />
            <circle cx="210" cy="338" r="4" fill="#ff69b4" opacity="0.7" />

            {/* Tree Trunk & Elegant Twisted Bonsai Limbs */}
            <path
              d="M 185 330 C 185 280 165 240 180 200 C 190 170 185 140 195 120 C 170 135 140 145 110 140 C 95 137 75 148 60 142 C 78 135 98 128 115 130 C 145 133 170 120 185 105 C 195 90 200 65 205 50 C 210 70 220 90 235 105 C 260 125 295 130 330 135 C 310 142 290 138 270 132 C 245 124 225 138 215 155 C 225 180 235 220 220 270 C 220 300 225 320 225 330 Z"
              fill="url(#trunkGrad)"
            />
            {/* Trunk bark texture lines */}
            <path d="M 190 320 Q 185 270 195 220" stroke="#5c2e17" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M 205 325 Q 210 275 205 210" stroke="#3b1d0e" strokeWidth="2.5" fill="none" opacity="0.6" />

            {/* Hanging Traditional Chochin Lantern */}
            <g transform="translate(130, 160)">
              <line x1="0" y1="0" x2="0" y2="15" stroke="#4a2511" strokeWidth="1.5" />
              <rect x="-8" y="15" width="16" height="24" rx="4" fill="#ff0055" filter="drop-shadow(0 0 6px #ff0055)" />
              <text x="0" y="32" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">祭</text>
              <line x1="-8" y1="20" x2="8" y2="20" stroke="#ffd700" strokeWidth="1" />
              <line x1="-8" y1="34" x2="8" y2="34" stroke="#ffd700" strokeWidth="1" />
              <line x1="0" y1="39" x2="0" y2="46" stroke="#ffd700" strokeWidth="1.5" />
            </g>

            {/* Second Hanging Lantern */}
            <g transform="translate(280, 150)">
              <line x1="0" y1="0" x2="0" y2="18" stroke="#4a2511" strokeWidth="1.5" />
              <rect x="-8" y="18" width="16" height="24" rx="4" fill="#ff0055" filter="drop-shadow(0 0 6px #ff0055)" />
              <text x="0" y="35" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">桜</text>
              <line x1="-8" y1="23" x2="8" y2="23" stroke="#ffd700" strokeWidth="1" />
              <line x1="-8" y1="37" x2="8" y2="37" stroke="#ffd700" strokeWidth="1" />
              <line x1="0" y1="42" x2="0" y2="49" stroke="#ffd700" strokeWidth="1.5" />
            </g>

            {/* Cloud Clustered Sakura Blossom Canopies */}
            {/* Left Cluster */}
            <circle cx="100" cy="120" r="45" fill="url(#foliageGrad1)" opacity="0.95" />
            <circle cx="130" cy="95" r="40" fill="url(#foliageGrad2)" opacity="0.95" />
            <circle cx="70" cy="140" r="32" fill="url(#foliageGrad1)" opacity="0.9" />

            {/* Right Cluster */}
            <circle cx="300" cy="115" r="48" fill="url(#foliageGrad1)" opacity="0.95" />
            <circle cx="265" cy="85" r="42" fill="url(#foliageGrad2)" opacity="0.95" />
            <circle cx="330" cy="135" r="34" fill="url(#foliageGrad1)" opacity="0.9" />

            {/* Center Top Crown */}
            <circle cx="200" cy="55" r="55" fill="url(#foliageGrad2)" opacity="0.95" />
            <circle cx="155" cy="65" r="42" fill="url(#foliageGrad1)" opacity="0.95" />
            <circle cx="245" cy="65" r="44" fill="url(#foliageGrad1)" opacity="0.95" />

            {/* Foreground Fluffy Blossom Accents */}
            <circle cx="180" cy="95" r="38" fill="url(#foliageGrad2)" opacity="0.98" />
            <circle cx="220" cy="95" r="36" fill="url(#foliageGrad2)" opacity="0.98" />
            <circle cx="150" cy="125" r="30" fill="url(#foliageGrad1)" opacity="0.92" />
            <circle cx="250" cy="125" r="32" fill="url(#foliageGrad1)" opacity="0.92" />

            {/* Detailed Individual Blossom Highlights with Pistils */}
            <g transform="translate(185, 55)">
              <circle cx="0" cy="0" r="8" fill="#fff" />
              <circle cx="0" cy="0" r="3" fill="#ff1493" />
            </g>
            <g transform="translate(140, 85)">
              <circle cx="0" cy="0" r="7" fill="#fff" />
              <circle cx="0" cy="0" r="2.5" fill="#ff1493" />
            </g>
            <g transform="translate(260, 80)">
              <circle cx="0" cy="0" r="7.5" fill="#fff" />
              <circle cx="0" cy="0" r="2.5" fill="#ff1493" />
            </g>
            <g transform="translate(95, 115)">
              <circle cx="0" cy="0" r="6" fill="#fff" />
              <circle cx="0" cy="0" r="2" fill="#ff1493" />
            </g>
            <g transform="translate(305, 110)">
              <circle cx="0" cy="0" r="6.5" fill="#fff" />
              <circle cx="0" cy="0" r="2.2" fill="#ff1493" />
            </g>
          </svg>

          {/* Click Callout Hint */}
          <div className="mt-3 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-semibold shadow-[0_0_15px_rgba(255,42,133,0.3)] animate-pulse">
              🌸 CLICK TREE TO SHAKE &amp; RELEASE PETALS! 🌸
            </span>
          </div>
        </div>

        {/* Shake Counter & Stats */}
        <div className="flex items-center gap-6 mt-4 text-xs text-neutral-400">
          <div>
            Shakes Triggered: <span className="text-pink-400 font-bold">{shakeCount}</span>
          </div>
          <div>•</div>
          <div>
            Status:{' '}
            <span className="text-emerald-400 font-medium">
              {shaking ? 'Blooming in the wind!' : 'Resting in peace'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
