/* eslint-disable */
'use client';

import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function TokyoCinematicBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "0px" });

  useEffect(() => {
    if (!isInView || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Night sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGradient.addColorStop(0, '#090a0f');
      skyGradient.addColorStop(1, '#1b1b3a');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      for(let i=0; i<100; i++) {
        const x = (Math.sin(i*123) * canvas.width + canvas.width) % canvas.width;
        const y = (Math.cos(i*321) * canvas.height/2 + canvas.height/2) % (canvas.height/2);
        const a = (Math.sin(time * 2 + i) + 1) / 2;
        ctx.globalAlpha = a * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Mt Fuji silhouette
      ctx.fillStyle = '#0f101e';
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.2 - time * 5, canvas.height);
      ctx.lineTo(canvas.width * 0.5 - time * 5, canvas.height * 0.6);
      ctx.lineTo(canvas.width * 0.8 - time * 5, canvas.height);
      ctx.fill();

      // Buildings
      ctx.fillStyle = '#05050a';
      for(let i=0; i<20; i++) {
        const h = 50 + (Math.sin(i*77) * 200 + 200) % 300;
        const w = 40 + (i*11) % 40;
        const x = (i * 100 - time * 20) % (canvas.width + 200);
        
        ctx.fillRect(x - 100, canvas.height - h, w, h);
        
        // Windows
        ctx.fillStyle = (i%3===0) ? 'rgba(255, 50, 100, 0.4)' : 'rgba(50, 200, 255, 0.4)';
        if (Math.sin(time * 5 + i) > 0) {
          ctx.fillRect(x - 90, canvas.height - h + 20, w - 20, 10);
        }
        ctx.fillStyle = '#05050a';
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" aria-hidden="true">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
    </div>
  );
}
