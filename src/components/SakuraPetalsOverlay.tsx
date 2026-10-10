'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface SakuraOverlayRef {
  burst: (originX?: number, originY?: number, count?: number) => void;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  sway: number;
  swaySpeed: number;
  opacity: number;
  color: string;
}

// Gentle, ethereal sakura blossom color palette
const PETAL_COLORS = [
  '#ffe5ec',
  '#ffccd5',
  '#ffb7c5',
  '#ffc0cb',
  '#ffa6b9',
  '#ff94aa',
];

const SakuraPetalsOverlay = forwardRef<SakuraOverlayRef, { ambient?: boolean }>(
  ({ ambient = true }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const petalsRef = useRef<Petal[]>([]);
    const animFrameRef = useRef<number | null>(null);

    const createPetal = (x?: number, y?: number, isBurst = false): Petal => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
      return {
        x: x !== undefined ? x + (Math.random() * 60 - 30) : Math.random() * width,
        y: y !== undefined ? y + (Math.random() * 30 - 15) : Math.random() * -40,
        size: Math.random() * 6 + 6, // 6px - 12px delicate petals
        // ~45% slower fall and gentle, organic horizontal drift
        speedX: isBurst
          ? (Math.random() - 0.5) * 4.4 + (Math.random() > 0.5 ? 1.2 : -1.2)
          : (Math.random() * 0.6 + 0.2), // gentle eastward drift
        speedY: isBurst
          ? (Math.random() * 2.2 + 1.1) // ~45% slower than original (4+2)
          : (Math.random() * 0.99 + 0.55), // ~45% slower than original (1.8+1)
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.1, // gentle tumbling
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.012, // soft swaying oscillation
        opacity: isBurst ? Math.random() * 0.25 + 0.55 : Math.random() * 0.3 + 0.38, // subtle & ethereal
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      };
    };

    useImperativeHandle(ref, () => ({
      burst: (originX?: number, originY?: number, count = 55) => {
        // Cut burst petals by 80% (count * 0.2, min ~8)
        const actualCount = Math.max(8, Math.round(count * 0.2));
        const x = originX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 600);
        const y = originY ?? 300;
        const newPetals: Petal[] = [];
        for (let i = 0; i < actualCount; i++) {
          newPetals.push(createPetal(x, y, true));
        }
        petalsRef.current = [...petalsRef.current, ...newPetals];
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      handleResize();
      window.addEventListener('resize', handleResize);

      // Cut ambient petals by 80% (initial seed of 5 petals instead of 25)
      if (ambient && !prefersReduced && petalsRef.current.length < 14) {
        for (let i = 0; i < 14; i++) {
          const p = createPetal();
          p.y = Math.random() * window.innerHeight;
          petalsRef.current.push(p);
        }
      }

      const drawPetal = (p: Petal) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        // Realistic 3D perspective flutter
        ctx.scale(Math.sin(p.sway) * 0.5 + 0.65, 1);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Distinctive notched cherry blossom petal geometry
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          -p.size * 0.5,
          -p.size * 0.8,
          -p.size * 0.6,
          -p.size * 1.5,
          -p.size * 0.15,
          -p.size * 1.7
        );
        ctx.lineTo(0, -p.size * 1.48);
        ctx.lineTo(p.size * 0.15, -p.size * 1.7);
        ctx.bezierCurveTo(
          p.size * 0.6,
          -p.size * 1.5,
          p.size * 0.5,
          -p.size * 0.8,
          0,
          0
        );
        ctx.fill();

        ctx.restore();
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Cap ambient count to ~8-10 petals (80% cut from original 50 limit)
        if (ambient && !prefersReduced && Math.random() < 0.04 && petalsRef.current.length < 18) {
          petalsRef.current.push(createPetal());
        }

        petalsRef.current.forEach((p, idx) => {
          p.sway += p.swaySpeed;
          // Gentle sway with reduced lateral displacement
          p.x += p.speedX + Math.sin(p.sway) * 0.65;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          drawPetal(p);

          // Recycle or remove petals that leave the viewport
          if (p.y > canvas.height + 25 || p.x > canvas.width + 40 || p.x < -40) {
            if (ambient && !prefersReduced && petalsRef.current.length <= 17) {
              petalsRef.current[idx] = createPetal();
            } else {
              petalsRef.current.splice(idx, 1);
            }
          }
        });

        animFrameRef.current = requestAnimationFrame(animate);
      };

      animFrameRef.current = requestAnimationFrame(animate);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      };
    }, [ambient]);

    return (
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[8888] w-full h-full"
      />
    );
  }
);

SakuraPetalsOverlay.displayName = 'SakuraPetalsOverlay';

export default SakuraPetalsOverlay;
