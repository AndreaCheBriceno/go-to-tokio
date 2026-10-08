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

const PETAL_COLORS = ['#ffb7c5', '#ff94aa', '#ffc0cb', '#ffe4e1', '#ff8da1'];

const SakuraPetalsOverlay = forwardRef<SakuraOverlayRef, { ambient?: boolean }>(
  ({ ambient = true }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const petalsRef = useRef<Petal[]>([]);
    const animFrameRef = useRef<number | null>(null);

    const createPetal = (x?: number, y?: number, isBurst = false): Petal => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
      return {
        x: x !== undefined ? x + (Math.random() * 80 - 40) : Math.random() * width,
        y: y !== undefined ? y + (Math.random() * 40 - 20) : Math.random() * -50,
        size: Math.random() * 9 + 7,
        speedX: isBurst ? (Math.random() - 0.5) * 8 + (Math.random() > 0.5 ? 2 : -2) : Math.random() * 1.5 + 0.5,
        speedY: isBurst ? Math.random() * 4 + 2 : Math.random() * 1.8 + 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 3,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.04 + 0.02,
        opacity: Math.random() * 0.4 + 0.6,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      };
    };

    useImperativeHandle(ref, () => ({
      burst: (originX?: number, originY?: number, count = 55) => {
        const x = originX ?? (typeof window !== 'undefined' ? window.innerWidth / 2 : 600);
        const y = originY ?? 300;
        const newPetals: Petal[] = [];
        for (let i = 0; i < count; i++) {
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

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      handleResize();
      window.addEventListener('resize', handleResize);

      // Seed initial ambient petals
      if (ambient && petalsRef.current.length < 25) {
        for (let i = 0; i < 25; i++) {
          const p = createPetal();
          p.y = Math.random() * window.innerHeight;
          petalsRef.current.push(p);
        }
      }

      const drawPetal = (p: Petal) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(Math.sin(p.sway) * 0.6 + 0.8, 1);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Distinctive notched cherry blossom petal path
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size * 0.5, -p.size * 0.8, -p.size * 0.6, -p.size * 1.5, -p.size * 0.15, -p.size * 1.7);
        ctx.lineTo(0, -p.size * 1.5);
        ctx.lineTo(p.size * 0.15, -p.size * 1.7);
        ctx.bezierCurveTo(p.size * 0.6, -p.size * 1.5, p.size * 0.5, -p.size * 0.8, 0, 0);
        ctx.fill();

        ctx.restore();
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Periodically spawn ambient petals if enabled
        if (ambient && Math.random() < 0.08 && petalsRef.current.length < 50) {
          petalsRef.current.push(createPetal());
        }

        petalsRef.current.forEach((p, idx) => {
          p.sway += p.swaySpeed;
          p.x += p.speedX + Math.sin(p.sway) * 1.2;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          drawPetal(p);

          // Recycle or remove petals that leave the screen
          if (p.y > canvas.height + 30 || p.x > canvas.width + 50 || p.x < -50) {
            if (ambient && petalsRef.current.length <= 40) {
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
        className="fixed inset-0 pointer-events-none z-[8888] w-full h-full"
      />
    );
  }
);

SakuraPetalsOverlay.displayName = 'SakuraPetalsOverlay';

export default SakuraPetalsOverlay;
