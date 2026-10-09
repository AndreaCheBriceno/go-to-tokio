'use client';

import React, { useState, useEffect } from 'react';
import { Train, CreditCard, Clock, CheckCircle2, Volume2 } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

interface Station {
  id: string;
  name: string;
  nameEs: string;
  japanese: string;
  angle: number;
  passengers: string;
  passengersEs: string;
  attractions: string;
  attractionsEs: string;
  color: string;
}

const STATIONS: Station[] = [
  {
    id: 'tokyo',
    name: 'Tokyo Station',
    nameEs: 'Estación de Tokio',
    japanese: '東京',
    angle: 0,
    passengers: '460,000 / day',
    passengersEs: '460,000 al día',
    attractions: 'Imperial Palace, Shinkansen bullet trains, Ramen Street',
    attractionsEs: 'Palacio Imperial, Trenes bala Shinkansen, Calle del Ramen',
    color: '#ff2a85',
  },
  {
    id: 'akihabara',
    name: 'Akihabara',
    nameEs: 'Akihabara',
    japanese: '秋葉原',
    angle: 45,
    passengers: '250,000 / day',
    passengersEs: '250,000 al día',
    attractions: 'Electric Town, Anime superstores, Retro gaming arcades',
    attractionsEs: 'Ciudad Eléctrica, Grandes almacenes de anime, Arcades retro',
    color: '#00f0ff',
  },
  {
    id: 'ueno',
    name: 'Ueno',
    nameEs: 'Ueno',
    japanese: '上野',
    angle: 90,
    passengers: '180,000 / day',
    passengersEs: '180,000 al día',
    attractions: 'Ueno Park, Tokyo National Museum, Hanami cherry blossoms',
    attractionsEs: 'Parque Ueno, Museo Nacional de Tokio, Cerezos de Hanami',
    color: '#ffb703',
  },
  {
    id: 'ikebukuro',
    name: 'Ikebukuro',
    nameEs: 'Ikebukuro',
    japanese: '池袋',
    angle: 145,
    passengers: '560,000 / day',
    passengersEs: '560,000 al día',
    attractions: 'Sunshine City, Otome Road, Commercial hub',
    attractionsEs: 'Sunshine City, Otome Road, Gran nudo comercial',
    color: '#00f59b',
  },
  {
    id: 'shinjuku',
    name: 'Shinjuku',
    nameEs: 'Shinjuku',
    japanese: '新宿',
    angle: 200,
    passengers: '3,500,000 / day (World #1)',
    passengersEs: '3,500,000 al día (Récord Mundial #1)',
    attractions: 'Busiest train station on Earth, 200+ exits, Skyscraper district',
    attractionsEs: 'Estación más transitada del planeta, más de 200 salidas, distrito de rascacielos',
    color: '#ff0055',
  },
  {
    id: 'shibuya',
    name: 'Shibuya',
    nameEs: 'Shibuya',
    japanese: '渋谷',
    angle: 260,
    passengers: '1,200,000 / day',
    passengersEs: '1,200,000 al día',
    attractions: 'Shibuya Scramble Crossing, Hachiko statue, Shibuya Sky',
    attractionsEs: 'Cruce peatonal de Shibuya, estatua de Hachiko, mirador Shibuya Sky',
    color: '#00f0ff',
  },
  {
    id: 'shinagawa',
    name: 'Shinagawa',
    nameEs: 'Shinagawa',
    japanese: '品川',
    angle: 315,
    passengers: '380,000 / day',
    passengersEs: '380,000 al día',
    attractions: 'Bullet train connections & Direct monorail to Haneda Airport',
    attractionsEs: 'Conexión con tren bala Shinkansen y monorraíl directo a Haneda',
    color: '#ffb703',
  },
];

export default function TrainSimulationMap() {
  const { language } = useSiteContent();
  const isEs = language === 'es';

  const [activeStation, setActiveStation] = useState<Station>(STATIONS[4]); // Shinjuku default
  const [trainAngle, setTrainAngle] = useState(200);
  const [trainAngle2, setTrainAngle2] = useState(20);
  const [isPlaying, setIsPlaying] = useState(true);
  const [suicaBalance, setSuicaBalance] = useState(2480);
  const [tapStatus, setTapStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTrainAngle((prev) => (prev + 0.6) % 360);
      setTrainAngle2((prev) => (prev + 0.6) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTapSuica = () => {
    if (suicaBalance < 160) {
      setTapStatus(isEs ? '¡Saldo insuficiente! Por favor recarga.' : 'Insufficient balance! Please recharge.');
      return;
    }
    setSuicaBalance((b) => b - 160);
    setTapStatus(
      isEs
        ? 'PUERTA ABIERTA: ¡Tarifa ¥160 descontada! Que disfrutes tu viaje. (ピッ!)'
        : 'GATE OPENED: Fare ¥160 deducted! Enjoy your ride. (ピッ!)'
    );
    setTimeout(() => {
      setTapStatus(null);
    }, 3200);
  };

  const cx = 200;
  const cy = 200;
  const r = 135;

  const getCoords = (deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const train1Pos = getCoords(trainAngle);
  const train2Pos = getCoords(trainAngle2);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/30 overflow-hidden shadow-[0_0_35px_rgba(0,245,155,0.15)] my-8">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Train className="w-4 h-4 text-emerald-400" />
            <span>
              {isEs
                ? 'Simulación de Transporte en Tiempo Real • Líneas de Tren'
                : 'Real-Time Transit Simulation • Getting There & Around'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            {isEs ? 'Línea Circular JR Yamanote' : 'JR Yamanote Circular Line Loop'}{' '}
            <span className="text-emerald-300 text-base font-normal">山手線</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-600 transition flex items-center gap-2"
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isPlaying
                ? isEs ? 'Pausar Trenes' : 'Pause Trains'
                : isEs ? 'Reanudar Trenes' : 'Resume Trains'}
            </span>
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-neutral-300 mb-6">
        {isEs
          ? 'Tokio cuenta con el sistema ferroviario más puntual e interconectado del mundo. La emblemática línea circular JR Yamanote recorre los principales núcleos de la metrópolis cada 2-3 minutos. Observa los trenes verdes JR E235 moviéndose por las vías en tiempo real, ¡o haz clic en cualquier estación para ver sus conexiones!'
          : 'Tokyo boasts the world\'s most punctual and interconnected rail system. The circular JR Yamanote Line loops around the core metropolis every 2-3 minutes. Watch the green JR E235 trains move along the track in real time, or select any station to inspect its connections!'}
      </p>

      {/* Grid: Interactive SVG Rail Loop + Station Card & Suica Tap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Yamanote Loop */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative w-80 sm:w-96 h-80 sm:h-96">
            <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
              <defs>
                <filter id="trainGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" mode="over" />
                </filter>
              </defs>

              <line x1="60" y1="200" x2="340" y2="200" stroke="#f62e36" strokeWidth="3" opacity="0.4" strokeDasharray="6 4" />
              <line x1="200" y1="60" x2="200" y2="340" stroke="#ff9500" strokeWidth="3" opacity="0.4" strokeDasharray="6 4" />

              <circle cx={cx} cy={cy} r={r + 3} stroke="#1b281f" strokeWidth="8" fill="none" />
              <circle cx={cx} cy={cy} r={r} stroke="#80c342" strokeWidth="5" fill="none" opacity="0.9" />
              <circle cx={cx} cy={cy} r={r} stroke="#00f59b" strokeWidth="2" fill="none" filter="url(#trainGlow)" />

              {STATIONS.map((station) => {
                const pos = getCoords(station.angle);
                const isSelected = activeStation.id === station.id;
                return (
                  <g
                    key={station.id}
                    onClick={() => setActiveStation(station)}
                    className="cursor-pointer group"
                  >
                    {isSelected && (
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="14"
                        fill="none"
                        stroke="#00f0ff"
                        strokeWidth="2"
                        className="animate-ping"
                        opacity="0.75"
                      />
                    )}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isSelected ? '9' : '6.5'}
                      fill={isSelected ? '#00f0ff' : '#ffffff'}
                      stroke="#80c342"
                      strokeWidth="2.5"
                      className="transition-all duration-200 group-hover:scale-125"
                    />
                    <text
                      x={pos.x + (pos.x > cx ? 12 : -12)}
                      y={pos.y + (pos.y > cy ? 12 : -12)}
                      textAnchor={pos.x > cx ? 'start' : 'end'}
                      fill={isSelected ? '#00f0ff' : '#cbd5e1'}
                      fontSize={isSelected ? '11' : '9.5'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      className="select-none transition-colors"
                    >
                      {isEs ? station.nameEs : station.name} ({station.japanese})
                    </text>
                  </g>
                );
              })}

              <g transform={`translate(${train1Pos.x}, ${train1Pos.y})`} filter="url(#trainGlow)">
                <rect x="-8" y="-5" width="16" height="10" rx="3" fill="#80c342" stroke="#fff" strokeWidth="1" />
                <circle cx="-4" cy="-2" r="1.5" fill="#fff" />
                <circle cx="4" cy="-2" r="1.5" fill="#fff" />
                <rect x="-6" y="2" width="12" height="2" fill="#111" />
              </g>

              <g transform={`translate(${train2Pos.x}, ${train2Pos.y})`} filter="url(#trainGlow)">
                <rect x="-8" y="-5" width="16" height="10" rx="3" fill="#00f0ff" stroke="#fff" strokeWidth="1" />
                <circle cx="-4" cy="-2" r="1.5" fill="#fff" />
                <circle cx="4" cy="-2" r="1.5" fill="#fff" />
                <rect x="-6" y="2" width="12" height="2" fill="#111" />
              </g>

              <g transform={`translate(${cx}, ${cy})`}>
                <circle cx="0" cy="0" r="28" fill="#111827" stroke="#374151" strokeWidth="2" />
                <text x="0" y="-5" textAnchor="middle" fill="#80c342" fontSize="9" fontWeight="bold">JR</text>
                <text x="0" y="8" textAnchor="middle" fill="#9ca3af" fontSize="7">YAMANOTE</text>
                <text x="0" y="18" textAnchor="middle" fill="#00f59b" fontSize="7">LOOP</text>
              </g>
            </svg>
          </div>
          <span className="text-[11px] text-neutral-400 mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {isEs
              ? '¡Haz clic en cualquier estación para explorar sus transbordos!'
              : 'Click any station node along the ring to explore its connections!'}
          </span>
        </div>

        {/* Selected Station Details & Virtual Suica Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-neutral-900/80 border border-neutral-700/80 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-400">
                  {isEs ? 'Estación Seleccionada' : 'Selected Hub'}
                </span>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  {isEs ? activeStation.nameEs : activeStation.name}
                  <span className="text-base font-normal text-emerald-300">({activeStation.japanese})</span>
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                JR East
              </span>
            </div>

            <div className="space-y-3 mt-3 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-800/60">
                <span className="text-neutral-400">{isEs ? 'Pasajeros diarios:' : 'Daily Commuters:'}</span>
                <span className="font-semibold text-white">
                  {isEs ? activeStation.passengersEs : activeStation.passengers}
                </span>
              </div>
              <div className="py-1">
                <span className="text-neutral-400 block mb-1">
                  {isEs ? 'Lugares clave y transbordos:' : 'Key Landmarks & Transfers:'}
                </span>
                <p className="text-neutral-200 leading-relaxed bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800">
                  {isEs ? activeStation.attractionsEs : activeStation.attractions}
                </p>
              </div>
              <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-lg p-2.5 text-emerald-300">
                <span className="font-semibold block mb-0.5">
                  {isEs ? 'Comparativo Gramatical en Transporte:' : 'Grammar Comparative in Transit:'}
                </span>
                &quot;Tokyo&apos;s subway network is <strong>cleaner and faster than</strong> public transit systems in most western capitals.&quot;
              </div>
            </div>
          </div>

          {/* Interactive Suica IC Card Demo */}
          <div className="bg-gradient-to-br from-[#103a27] via-[#0b2419] to-[#06150e] border border-emerald-400/40 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-300" />
                <span className="font-black text-sm text-white tracking-widest">Suica (スイカ)</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-black/40 text-emerald-300 border border-emerald-500/30">
                Contactless IC
              </span>
            </div>

            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-[10px] text-emerald-300/80 uppercase">
                  {isEs ? 'Saldo de la Tarjeta' : 'Cardholder Balance'}
                </span>
                <div className="text-2xl font-mono font-bold text-white">¥{suicaBalance.toLocaleString()}</div>
              </div>
              <div className="text-right text-[10px] text-neutral-300 font-mono">
                JR East • Tokyo Metro • Pasmo
              </div>
            </div>

            <button
              onClick={handleTapSuica}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,245,155,0.4)] transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Volume2 className="w-4 h-4" />
              <span>
                {isEs ? 'Tocar Suica para Pasar el Molinete (-¥160)' : 'Tap Suica to Pass Ticket Gate (-¥160)'}
              </span>
            </button>

            {tapStatus && (
              <div className="mt-3 p-2 bg-black/70 rounded-lg border border-emerald-400 text-xs text-emerald-300 flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{tapStatus}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
