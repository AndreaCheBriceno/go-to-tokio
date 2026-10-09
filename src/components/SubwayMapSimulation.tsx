'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSiteContent } from '../context/ContentContext';

const SUBWAY_LINES = [
  {
    id: 'ginza',
    name: 'Ginza Line',
    color: '#FF9500',
    points: [
      { x: 275, y: 545, name: 'Shibuya' },
      { x: 360, y: 545, name: 'Omote-sando' },
      { x: 435, y: 475, name: 'Aoyama-itchome' },
      { x: 515, y: 475, name: 'Akasaka-mitsuke' },
      { x: 540, y: 560, name: 'Tameike-sanno' },
      { x: 750, y: 615, name: 'Shimbashi' },
      { x: 790, y: 560, name: 'Ginza' },
      { x: 750, y: 430, name: 'Nihombashi' },
      { x: 750, y: 360, name: 'Kanda' },
      { x: 715, y: 220, name: 'Ueno-hirokoji' },
      { x: 750, y: 180, name: 'Ueno' },
      { x: 880, y: 180, name: 'Asakusa' }
    ]
  },
  {
    id: 'marunouchi',
    name: 'Marunouchi Line',
    color: '#E60012',
    points: [
      { x: 170, y: 375, name: 'Nakano-sakaue' },
      { x: 270, y: 375, name: 'Shinjuku' },
      { x: 345, y: 375, name: 'Shinjuku-sanchome' },
      { x: 450, y: 375, name: 'Yotsuya' },
      { x: 515, y: 470, name: 'Akasaka-mitsuke' },
      { x: 560, y: 540, name: 'Kokkai-gijidomae' },
      { x: 615, y: 575, name: 'Kasumigaseki' },
      { x: 750, y: 575, name: 'Ginza' },
      { x: 750, y: 475, name: 'Tokyo' },
      { x: 655, y: 475, name: 'Otemachi' },
      { x: 670, y: 335, name: 'Awajicho' },
      { x: 610, y: 240, name: 'Hongo-sanchome' },
      { x: 570, y: 240, name: 'Korakuen' },
      { x: 275, y: 195, name: 'Ikebukuro' }
    ]
  },
  {
    id: 'hibiya',
    name: 'Hibiya Line',
    color: '#B5B5AC',
    points: [
      { x: 275, y: 590, name: 'Ebisu' },
      { x: 445, y: 590, name: 'Roppongi' },
      { x: 620, y: 580, name: 'Kasumigaseki' },
      { x: 710, y: 520, name: 'Hibiya' },
      { x: 760, y: 560, name: 'Ginza' },
      { x: 850, y: 560, name: 'Higashi-ginza' },
      { x: 880, y: 420, name: 'Kayabacho' },
      { x: 880, y: 360, name: 'Ningyocho' },
      { x: 750, y: 280, name: 'Akihabara' },
      { x: 715, y: 220, name: 'Naka-okachimachi' },
      { x: 750, y: 180, name: 'Ueno' },
      { x: 855, y: 55, name: 'Kita-senju' }
    ]
  },
  {
    id: 'tozai',
    name: 'Tozai Line',
    color: '#00A7DB',
    points: [
      { x: 275, y: 275, name: 'Takadanobaba' },
      { x: 500, y: 310, name: 'Iidabashi' },
      { x: 560, y: 380, name: 'Kudanshita' },
      { x: 655, y: 420, name: 'Otemachi' },
      { x: 750, y: 430, name: 'Nihombashi' },
      { x: 880, y: 420, name: 'Kayabacho' },
      { x: 950, y: 420, name: 'Monzen-nakacho' }
    ]
  },
  {
    id: 'chiyoda',
    name: 'Chiyoda Line',
    color: '#009944',
    points: [
      { x: 275, y: 500, name: 'Meiji-jingumae' },
      { x: 360, y: 545, name: 'Omote-sando' },
      { x: 560, y: 540, name: 'Kokkai-gijidomae' },
      { x: 620, y: 580, name: 'Kasumigaseki' },
      { x: 710, y: 520, name: 'Hibiya' },
      { x: 655, y: 420, name: 'Otemachi' },
      { x: 670, y: 335, name: 'Shin-ochanomizu' },
      { x: 655, y: 85, name: 'Nishi-nippori' },
      { x: 855, y: 55, name: 'Kita-senju' }
    ]
  },
  {
    id: 'yurakucho',
    name: 'Yurakucho Line',
    color: '#D7C447',
    points: [
      { x: 215, y: 125, name: 'Kotake-mukaihara' },
      { x: 275, y: 195, name: 'Ikebukuro' },
      { x: 500, y: 310, name: 'Iidabashi' },
      { x: 475, y: 345, name: 'Ichigaya' },
      { x: 515, y: 470, name: 'Nagatacho' },
      { x: 710, y: 520, name: 'Yurakucho' },
      { x: 950, y: 510, name: 'Tsukishima' }
    ]
  },
  {
    id: 'hanzomon',
    name: 'Hanzomon Line',
    color: '#8B4584',
    points: [
      { x: 275, y: 545, name: 'Shibuya' },
      { x: 360, y: 545, name: 'Omote-sando' },
      { x: 435, y: 475, name: 'Aoyama-itchome' },
      { x: 515, y: 470, name: 'Nagatacho' },
      { x: 560, y: 380, name: 'Kudanshita' },
      { x: 600, y: 340, name: 'Jimbocho' },
      { x: 655, y: 420, name: 'Otemachi' },
      { x: 750, y: 400, name: 'Mitsukoshimae' },
      { x: 950, y: 360, name: 'Kiyosumi-shirakawa' },
      { x: 1000, y: 340, name: 'Sumiyoshi' },
      { x: 935, y: 145, name: 'Oshiage' }
    ]
  },
  {
    id: 'namboku',
    name: 'Namboku Line',
    color: '#00ACA9',
    points: [
      { x: 275, y: 640, name: 'Meguro' },
      { x: 360, y: 640, name: 'Shirokanedai' },
      { x: 400, y: 640, name: 'Shirokane-takanawa' },
      { x: 475, y: 625, name: 'Azabu-juban' },
      { x: 540, y: 560, name: 'Tameike-sanno' },
      { x: 515, y: 470, name: 'Nagatacho' },
      { x: 450, y: 375, name: 'Yotsuya' },
      { x: 475, y: 345, name: 'Ichigaya' },
      { x: 500, y: 310, name: 'Iidabashi' },
      { x: 570, y: 240, name: 'Korakuen' },
      { x: 550, y: 115, name: 'Komagome' }
    ]
  }
];

type Point = { x: number; y: number; name: string };
type Stop = Point & { dist: number; index: number };

const parsedLines = SUBWAY_LINES.map(line => {
  const stops: Stop[] = [];
  let currentDist = 0;
  stops.push({ ...line.points[0], dist: 0, index: 0 });
  for(let i = 0; i < line.points.length - 1; i++) {
    const dx = line.points[i + 1].x - line.points[i].x;
    const dy = line.points[i + 1].y - line.points[i].y;
    const d = Math.sqrt(dx * dx + dy * dy);
    currentDist += d;
    stops.push({ ...line.points[i + 1], dist: currentDist, index: i + 1 });
  }
  return { ...line, totalLength: currentDist, stops };
});

function getPointAtDistance(points: Point[], distance: number) {
  let len = 0;
  for(let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (len + d >= distance) {
      const ratio = (distance - len) / d;
      return {
        x: points[i].x + dx * ratio,
        y: points[i].y + dy * ratio
      };
    }
    len += d;
  }
  return points[points.length - 1];
}

type Train = {
  id: string;
  lineId: string;
  distance: number;
  direction: 1 | -1;
  status: 'moving' | 'dwelling';
  dwellRemaining: number;
  speed: number;
  currentStopIndex: number | null;
};

export default function SubwayMapSimulation() {
  const { language } = useSiteContent();
  const tNextStop = language === 'es' ? 'Próxima estación:' : 'Next stop:';
  const tLines = language === 'es' ? 'Líneas' : 'Lines';
  
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const [, setFrame] = useState(0);

  const trainsRef = useRef<Train[]>([]);
  const requestRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const initTrains: Train[] = [];
    parsedLines.forEach(line => {
      initTrains.push({
        id: `${line.id}-1`,
        lineId: line.id,
        distance: line.totalLength * 0.1,
        direction: 1,
        status: 'moving',
        dwellRemaining: 0,
        speed: 60,
        currentStopIndex: null
      });
      initTrains.push({
        id: `${line.id}-2`,
        lineId: line.id,
        distance: line.totalLength * 0.9,
        direction: -1,
        status: 'moving',
        dwellRemaining: 0,
        speed: 60,
        currentStopIndex: null
      });
    });
    trainsRef.current = initTrains;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const animate = (time: number) => {
      if (lastTimeRef.current != null) {
        const deltaTime = time - lastTimeRef.current;
        if (deltaTime > 100) { 
           lastTimeRef.current = time;
           requestRef.current = requestAnimationFrame(animate);
           return; 
        }
        
        let changed = false;
        trainsRef.current.forEach(train => {
          const line = parsedLines.find(l => l.id === train.lineId)!;
          if (train.status === 'dwelling') {
            train.dwellRemaining -= deltaTime;
            if (train.dwellRemaining <= 0) {
              train.status = 'moving';
              train.currentStopIndex = null;
              changed = true;
            }
          } else {
            const moveDist = (train.speed * deltaTime) / 1000;
            const oldDist = train.distance;
            train.distance += moveDist * train.direction;
            
            const upcomingStop = line.stops.find(s => {
              if (train.direction === 1 && train.distance >= s.dist && oldDist < s.dist) return true;
              if (train.direction === -1 && train.distance <= s.dist && oldDist > s.dist) return true;
              return false;
            });
            
            if (upcomingStop) {
              train.distance = upcomingStop.dist;
              train.status = 'dwelling';
              train.dwellRemaining = 1200;
              train.currentStopIndex = upcomingStop.index;
              if (upcomingStop.index === 0) train.direction = 1;
              if (upcomingStop.index === line.stops.length - 1) train.direction = -1;
            } else {
              if (train.distance <= 0) {
                train.distance = 0;
                train.direction = 1;
                train.status = 'dwelling';
                train.dwellRemaining = 1200;
                train.currentStopIndex = 0;
              } else if (train.distance >= line.totalLength) {
                train.distance = line.totalLength;
                train.direction = -1;
                train.status = 'dwelling';
                train.dwellRemaining = 1200;
                train.currentStopIndex = line.stops.length - 1;
              }
            }
            changed = true;
          }
        });
        
        if (changed) {
          setFrame(f => f + 1);
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    }
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-950 p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-4 overflow-x-auto pb-2">
        <span className="text-sm font-semibold text-gray-500 shrink-0">{tLines}:</span>
        {parsedLines.map(l => (
          <button 
            key={l.id}
            onClick={() => setActiveLine(activeLine === l.id ? null : l.id)}
            className={`px-3 py-1 rounded-full text-xs font-bold text-white transition-opacity shrink-0 ${activeLine && activeLine !== l.id ? 'opacity-30' : 'opacity-100 hover:opacity-90'}`}
            style={{ backgroundColor: l.color }}
          >
            {l.name}
          </button>
        ))}
      </div>
      
      <div className="relative w-full" style={{ aspectRatio: '1200/796' }}>
        <img 
          src="/images/tokyo_subway_metro_map.png" 
          alt="Tokyo Subway Map" 
          className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-300 ${activeLine ? 'opacity-40' : 'opacity-100'}`} 
        />
        <svg viewBox="0 0 1200 796" className="absolute inset-0 w-full h-full pointer-events-none">
          {parsedLines.map(line => {
            const isDimmed = activeLine && activeLine !== line.id;
            return (
               <polyline
                 key={`path-${line.id}`}
                 points={line.points.map(p => `${p.x},${p.y}`).join(' ')}
                 fill="none"
                 stroke={line.color}
                 strokeWidth={6}
                 strokeOpacity={isDimmed ? 0.15 : 0.8}
                 strokeLinejoin="round"
                 className="transition-all duration-300"
               />
            );
          })}
          
          {trainsRef.current.map(train => {
            const line = parsedLines.find(l => l.id === train.lineId)!;
            const isDimmed = activeLine && activeLine !== line.id;
            if (isDimmed) return null;
            
            const pos = getPointAtDistance(line.points, train.distance);
            return (
              <g key={train.id} transform={`translate(${pos.x}, ${pos.y})`}>
                {train.status === 'dwelling' && (
                  <circle r={12} fill={line.color} opacity={0.4} className="animate-ping" />
                )}
                <circle 
                  r={6} 
                  fill="#ffffff" 
                  stroke={line.color} 
                  strokeWidth={3} 
                />
              </g>
            );
          })}
        </svg>
      </div>
      
      <div className="mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-3 rounded-lg text-sm flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
         <span className="font-bold shrink-0">{tNextStop}</span>
         {trainsRef.current.filter(t => !activeLine || t.lineId === activeLine).map(train => {
            const line = parsedLines.find(l => l.id === train.lineId)!;
            let targetStopName = '';
            
            if (train.status === 'dwelling' && train.currentStopIndex !== null) {
              targetStopName = line.stops[train.currentStopIndex].name + ' (Dwelling)';
            } else {
              const nextStop = line.stops.find(s => train.direction === 1 ? s.dist > train.distance : s.dist < train.distance);
              if (nextStop) {
                targetStopName = nextStop.name;
              } else {
                targetStopName = train.direction === 1 ? line.stops[line.stops.length - 1].name : line.stops[0].name;
              }
            }

            return (
              <div key={train.id} className="flex items-center gap-1.5 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 shrink-0">
                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: line.color }} />
                 <span className="font-medium text-xs">{line.name}</span>
                 <span className="text-gray-400 mx-1">→</span>
                 <span className="text-xs">{targetStopName}</span>
              </div>
            );
         })}
      </div>
    </div>
  );
}
