'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSiteContent } from '../context/ContentContext';

interface LaserPointerProps {
  active: boolean;
  onToggle: () => void;
}

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function LaserPointer({ active, onToggle }: LaserPointerProps) {
  const { language } = useSiteContent();
  const isEs = language === 'es';

  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<Point[]>([]);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const rippleCount = useRef(0);

  useEffect(() => {
    if (!active) {
      document.body.classList.remove('laser-mode-active');
      return;
    }

    document.body.classList.add('laser-mode-active');

    const handleMouseMove = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setPos(newPos);
      setTrail((prev) => [...prev.slice(-12), { ...newPos, timestamp: Date.now() }]);
    };

    const handleClick = (e: MouseEvent) => {
      rippleCount.current += 1;
      const newRipple = { id: rippleCount.current, x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'l' || e.key === 'L') {
        onToggle();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('laser-mode-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [active, onToggle]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setTrail((prev) => prev.filter((p) => now - p.timestamp < 180));
    }, 40);
    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* Laser Light Trail */}
      <svg className="absolute inset-0 w-full h-full">
        {trail.length > 1 && (
          <path
            d={trail.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '')}
            fill="none"
            stroke="#ff0055"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.65"
            style={{
              filter: 'drop-shadow(0 0 6px #ff0055) drop-shadow(0 0 12px #ff2a85)',
            }}
          />
        )}
      </svg>

      {/* Click Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none animate-ping"
          style={{
            left: r.x - 24,
            top: r.y - 24,
            width: 48,
            height: 48,
            border: '2px solid #ff0055',
            backgroundColor: 'rgba(255, 0, 85, 0.3)',
            boxShadow: '0 0 20px #ff0055',
          }}
        />
      ))}

      {/* Main Laser Pointer Dot */}
      <div
        className="absolute pointer-events-none transition-transform duration-75 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-8 h-8 rounded-full bg-red-600/30 blur-sm animate-pulse" />
        <div
          className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-red-500"
          style={{
            boxShadow: '0 0 14px 4px #ff0055, 0 0 28px 8px #ff2a85',
          }}
        />
        <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
      </div>

      {/* Floating Status Indicator */}
      <div className="fixed bottom-5 right-5 pointer-events-auto bg-black/85 backdrop-blur-md border border-red-500/60 rounded-full px-4 py-2 flex items-center gap-3 text-xs text-white shadow-[0_0_20px_rgba(255,0,85,0.4)]">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
        <span className="font-semibold tracking-wide">
          {isEs ? 'MODO PUNTERO LÁSER ACTIVO' : 'LASER PRESENTATION MODE ACTIVE'}
        </span>
        <span className="text-neutral-400 text-[11px]">
          {isEs ? '(Presiona "L" para alternar)' : '(Press "L" to toggle)'}
        </span>
        <button
          onClick={onToggle}
          className="bg-red-500/20 hover:bg-red-500/40 text-red-300 px-2 py-0.5 rounded text-[10px] font-mono border border-red-500/40 transition"
        >
          {isEs ? 'Salir' : 'Exit'}
        </button>
      </div>
    </div>
  );
}
