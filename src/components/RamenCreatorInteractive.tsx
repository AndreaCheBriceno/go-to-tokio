'use client';

import React, { useState } from 'react';
import { Utensils, Check, ChefHat } from 'lucide-react';
import { FoodItem } from '../lib/defaultContent';
import { useSiteContent } from '../context/ContentContext';

interface RamenCreatorProps {
  foods: FoodItem[];
}

interface BrothOption {
  id: string;
  name: string;
  nameEs: string;
  japanese: string;
  desc: string;
  descEs: string;
  basePrice: number;
  color: string;
}

const BROTHS: BrothOption[] = [
  {
    id: 'shoyu',
    name: 'Classic Tokyo Shoyu',
    nameEs: 'Shoyu Clásico de Tokio',
    japanese: '醤油',
    desc: 'Clear fragrant soy-sauce broth simmered with chicken and kombu dashi.',
    descEs: 'Caldo claro y aromático a base de salsa de soja, pollo y alga kombu.',
    basePrice: 850,
    color: '#92400e',
  },
  {
    id: 'tonkotsu',
    name: 'Rich Pork Tonkotsu',
    nameEs: 'Tonkotsu Cremoso de Cerdo',
    japanese: '豚骨',
    desc: 'Creamy collagen-rich broth boiled from pork bones for 16 hours.',
    descEs: 'Caldo sedoso y concentrado hervido con huesos de cerdo por 16 horas.',
    basePrice: 900,
    color: '#fef3c7',
  },
  {
    id: 'miso',
    name: 'Spicy Hokkaido Miso',
    nameEs: 'Miso Picante de Hokkaido',
    japanese: '味噌',
    desc: 'Hearty fermented red miso blend with roasted sesame and chili oil.',
    descEs: 'Miso rojo fermentado con aceite de sésamo tostado y toques de chile.',
    basePrice: 920,
    color: '#c2410c',
  },
  {
    id: 'yuzu_shio',
    name: 'Edo Yuzu Shio',
    nameEs: 'Yuzu Shio Cítrico de Edo',
    japanese: '柚子塩',
    desc: 'Delicate sea-salt dashi with aromatic Japanese yuzu citrus zest.',
    descEs: 'Dashi delicado de sal marina con ralladura aromática de cítrico yuzu.',
    basePrice: 880,
    color: '#eab308',
  },
];

interface ToppingOption {
  id: string;
  name: string;
  nameEs: string;
  japanese: string;
  price: number;
  icon: string;
}

const TOPPINGS: ToppingOption[] = [
  { id: 'chashu', name: 'Braised Chashu Pork', nameEs: 'Panceta Chashu Braseada', japanese: 'チャーシュー', price: 250, icon: '🥩' },
  { id: 'nitamago', name: 'Seasoned Soft-Boiled Egg', nameEs: 'Huevo Marinado Nitamago', japanese: '味玉', price: 150, icon: '🥚' },
  { id: 'nori', name: 'Crisp Roasted Nori Seaweed', nameEs: 'Alga Nori Crujiente', japanese: '海苔', price: 80, icon: '⬛' },
  { id: 'menma', name: 'Seasoned Bamboo Shoots', nameEs: 'Brotes de Bambú Menma', japanese: 'メンマ', price: 100, icon: '🎋' },
  { id: 'negi', name: 'Chopped Tokyo Scallions', nameEs: 'Cebolleta Picada Negi', japanese: 'ネギ', price: 60, icon: '🥬' },
  { id: 'naruto', name: 'Narutomaki Swirl Fish Cake', nameEs: 'Pastel de Pescado Narutomaki', japanese: '鳴門巻き', price: 70, icon: '🍥' },
];

export default function RamenCreatorInteractive({ foods }: RamenCreatorProps) {
  const { language } = useSiteContent();
  const isEs = language === 'es';

  const [selectedBroth, setSelectedBroth] = useState<BrothOption>(BROTHS[0]);
  const [noodleFirmness, setNoodleFirmness] = useState<'Soft' | 'Medium' | 'Firm' | 'Extra-Firm'>('Firm');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['chashu', 'nitamago', 'nori', 'negi']);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const toggleTopping = (id: string) => {
    setSelectedToppings((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const toppingsTotal = selectedToppings.reduce((acc, tId) => {
      const top = TOPPINGS.find((t) => t.id === tId);
      return acc + (top ? top.price : 0);
    }, 0);
    return selectedBroth.basePrice + toppingsTotal;
  };

  const handleOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 4500);
  };

  return (
    <div className="space-y-10 my-10">
      {/* 3 Typical Foods Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <div
            key={food.id}
            className="glass-panel rounded-2xl overflow-hidden border border-neutral-800 hover:border-pink-500/40 transition group flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-pink-500/80 text-white font-semibold">
                    {food.category}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1">
                    {food.name} <span className="text-xs font-normal text-pink-300">({food.japanese})</span>
                  </h4>
                </div>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-neutral-300 leading-relaxed">{food.description}</p>

              <div className="space-y-2 text-xs border-t border-neutral-800 pt-3">
                <div className="flex justify-between text-neutral-400">
                  <span>{isEs ? 'Rango de Precio:' : 'Price Level:'}</span>
                  <span className="text-amber-400 font-medium">{food.priceLevel}</span>
                </div>
                <div className="text-neutral-400">
                  <span className="block mb-0.5">{isEs ? 'Mejor Zona:' : 'Top Area:'}</span>
                  <span className="text-neutral-200">{food.bestSpots}</span>
                </div>
                <div className="bg-pink-950/30 border border-pink-500/20 rounded-lg p-2 text-[11px] text-pink-300">
                  💡 {food.funFact}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Tokyo Ramen Bar Workshop */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-orange-500/30 overflow-hidden shadow-[0_0_35px_rgba(249,115,22,0.15)] relative">
        <div className="absolute top-0 right-1/3 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <ChefHat className="w-4 h-4 text-orange-400" />
              <span>
                {isEs
                  ? 'Taller Culinario Interactivo • Tokyo Ramen Street'
                  : 'Interactive Culinary Workshop • Tokyo Ramen Street'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              {isEs ? 'Estudio de Ramen Artesanal' : 'Custom Tokyo Ramen Studio'}{' '}
              <span className="text-orange-300 text-base font-normal">ラーメン工房</span>
            </h3>
          </div>

          <div className="text-right">
            <span className="text-xs text-neutral-400 block font-mono">
              {isEs ? 'Total Estimado' : 'Estimated Order Total'}
            </span>
            <span className="text-2xl font-mono font-bold text-amber-400">
              ¥{calculateTotal().toLocaleString()}{' '}
              <span className="text-xs font-normal text-neutral-400">
                (~${(calculateTotal() / 155).toFixed(2)} USD)
              </span>
            </span>
          </div>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Pick Broth */}
            <div>
              <label className="text-xs uppercase font-mono tracking-wider text-orange-400 block mb-2">
                {isEs ? '1. Selecciona la Base del Caldo (スープ)' : '1. Select Broth Base (スープ)'}
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {BROTHS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBroth(b)}
                    className={`p-3 rounded-xl text-left border transition text-xs ${
                      selectedBroth.id === b.id
                        ? 'bg-orange-500/20 border-orange-400 text-white shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span>{isEs ? b.nameEs : b.name}</span>
                      <span className="text-orange-400 font-mono">¥{b.basePrice}</span>
                    </div>
                    <div className="text-[10px] text-neutral-400 mt-1 line-clamp-1">
                      {isEs ? b.descEs : b.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Pick Noodle Firmness */}
            <div>
              <label className="text-xs uppercase font-mono tracking-wider text-orange-400 block mb-2">
                {isEs ? '2. Textura de los Fideos (麺の硬さ)' : '2. Noodle Texture (麺の硬さ)'}
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Soft', 'Medium', 'Firm', 'Extra-Firm'] as const).map((firmness) => {
                  const firmnessLabel = {
                    Soft: isEs ? 'Suave (Yawa)' : 'Soft',
                    Medium: isEs ? 'Medio (Futsu)' : 'Medium',
                    Firm: isEs ? 'Firme (Katame / Recomendado)' : 'Firm (Katame / Recommended)',
                    'Extra-Firm': isEs ? 'Extra Firme (Barikata)' : 'Extra-Firm',
                  }[firmness];

                  return (
                    <button
                      key={firmness}
                      onClick={() => setNoodleFirmness(firmness)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition ${
                        noodleFirmness === firmness
                          ? 'bg-amber-500 text-black border-amber-400 font-bold'
                          : 'bg-neutral-900 border-neutral-700 text-neutral-300 hover:border-neutral-600'
                      }`}
                    >
                      {firmnessLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Pick Toppings */}
            <div>
              <label className="text-xs uppercase font-mono tracking-wider text-orange-400 block mb-2">
                {isEs ? '3. Elige los Ingredientes y Toppings (トッピング)' : '3. Choose Artisan Toppings (トッピング)'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {TOPPINGS.map((top) => {
                  const isChecked = selectedToppings.includes(top.id);
                  return (
                    <button
                      key={top.id}
                      onClick={() => toggleTopping(top.id)}
                      className={`p-2 rounded-xl text-left border flex items-center justify-between text-xs transition ${
                        isChecked
                          ? 'bg-orange-500/20 border-orange-400 text-white'
                          : 'bg-neutral-900/40 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{top.icon}</span>
                        <span className="truncate">{isEs ? top.nameEs : top.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-orange-300">+¥{top.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Order Callout Button */}
            <div className="pt-2">
              <button
                onClick={handleOrder}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)] transition transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <Utensils className="w-4 h-4" />
                <span>
                  {isEs
                    ? 'Pedir Tazón en Japonés: "Kore o kudasai" (Esto, por favor)'
                    : 'Order Bowl in Japanese: "Kore o kudasai" (これをください)'}
                </span>
              </button>
            </div>
          </div>

          {/* Live Visual Ramen Bowl with Rising Steam */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-64 sm:w-72 h-64 sm:h-72 flex items-center justify-center">
              <div className="absolute top-2 inset-x-0 flex justify-center gap-6 pointer-events-none z-30">
                <div className="w-3 h-14 bg-white/40 blur-md rounded-full animate-steam-1" />
                <div className="w-3.5 h-16 bg-white/50 blur-md rounded-full animate-steam-2" />
                <div className="w-2.5 h-12 bg-white/40 blur-md rounded-full animate-steam-3" />
              </div>

              <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
                <defs>
                  <linearGradient id="bowlCeramic" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="60%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>

                  <radialGradient id="brothGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={selectedBroth.color} stopOpacity="0.9" />
                    <stop offset="85%" stopColor={selectedBroth.color} stopOpacity="0.98" />
                    <stop offset="100%" stopColor="#2e1065" stopOpacity="0.8" />
                  </radialGradient>
                </defs>

                <line x1="20" y1="50" x2="220" y2="40" stroke="#854d0e" strokeWidth="5" strokeLinecap="round" />
                <line x1="22" y1="58" x2="218" y2="48" stroke="#713f12" strokeWidth="4" strokeLinecap="round" />

                <ellipse cx="120" cy="115" rx="95" ry="38" fill="#1e293b" stroke="#f97316" strokeWidth="3" />
                <path d="M 25 115 C 30 195 70 215 120 215 C 170 215 210 195 215 115 Z" fill="url(#bowlCeramic)" />
                <ellipse cx="120" cy="215" rx="42" ry="8" fill="#020617" stroke="#f97316" strokeWidth="2" />

                <ellipse cx="120" cy="115" rx="86" ry="32" fill="url(#brothGrad)" />

                <path
                  d="M 55 110 Q 75 125 100 110 Q 125 130 150 115 Q 170 125 185 110"
                  stroke="#fde047"
                  strokeWidth="3.5"
                  fill="none"
                  opacity="0.8"
                />
                <path
                  d="M 60 118 Q 85 132 110 118 Q 135 135 165 118 Q 180 128 185 118"
                  stroke="#fef08a"
                  strokeWidth="3.5"
                  fill="none"
                  opacity="0.8"
                />

                {selectedToppings.includes('nori') && (
                  <g>
                    <rect x="42" y="80" width="22" height="34" rx="2" fill="#14281d" transform="rotate(-15 42 80)" />
                    <rect x="58" y="76" width="20" height="34" rx="2" fill="#0d1b13" transform="rotate(-8 58 76)" />
                  </g>
                )}

                {selectedToppings.includes('chashu') && (
                  <g>
                    <ellipse cx="160" cy="115" rx="22" ry="16" fill="#b91c1c" />
                    <ellipse cx="160" cy="115" rx="16" ry="11" fill="#f87171" opacity="0.85" />
                    <ellipse cx="160" cy="115" rx="7" ry="5" fill="#fecaca" />
                  </g>
                )}

                {selectedToppings.includes('nitamago') && (
                  <g transform="translate(115, 105)">
                    <ellipse cx="0" cy="0" rx="16" ry="12" fill="#fffbeb" />
                    <circle cx="0" cy="0" r="8" fill="#f97316" />
                    <circle cx="2" cy="-1" r="5" fill="#ea580c" />
                  </g>
                )}

                {selectedToppings.includes('naruto') && (
                  <g transform="translate(85, 122)">
                    <ellipse cx="0" cy="0" rx="13" ry="10" fill="#ffffff" stroke="#f43f5e" strokeWidth="2.5" />
                    <path d="M -4 -2 Q 0 -6 4 -2 Q 6 2 2 4 Q -2 4 -4 0" stroke="#f43f5e" strokeWidth="2.5" fill="none" />
                  </g>
                )}

                {selectedToppings.includes('menma') && (
                  <g>
                    <rect x="135" y="128" width="18" height="6" rx="2" fill="#d97706" transform="rotate(20 135 128)" />
                    <rect x="145" y="132" width="18" height="6" rx="2" fill="#b45309" transform="rotate(25 145 132)" />
                  </g>
                )}

                {selectedToppings.includes('negi') && (
                  <g fill="#22c55e">
                    <circle cx="100" cy="110" r="2.5" />
                    <circle cx="106" cy="112" r="2" />
                    <circle cx="112" cy="120" r="2.5" />
                    <circle cx="125" cy="125" r="2.5" />
                    <circle cx="132" cy="118" r="2" />
                    <circle cx="95" cy="120" r="2.2" />
                  </g>
                )}
              </svg>

              {orderPlaced && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-md rounded-2xl z-40 flex flex-col items-center justify-center p-4 text-center animate-fadeIn">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 border border-emerald-500/40">
                    <Check className="w-6 h-6 animate-bounce" />
                  </div>
                  <h5 className="font-bold text-white text-base">
                    &quot;Irasshaimase!&quot; (いらっしゃいませ!)
                  </h5>
                  <p className="text-xs text-orange-200 mt-1">
                    {isEs
                      ? `¡Tu ${selectedBroth.nameEs} está listo en la cocina! Total: ¥${calculateTotal()}`
                      : `Your ${selectedBroth.name} is sizzling on the stove. Total: ¥${calculateTotal()}!`}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-2 text-center text-[11px] text-neutral-400">
              {isEs ? 'Caldo:' : 'Selected:'} <strong className="text-white">{isEs ? selectedBroth.nameEs : selectedBroth.name}</strong> •{' '}
              {isEs ? 'Fideos:' : 'Texture:'} <strong className="text-white">{noodleFirmness}</strong> •{' '}
              {isEs ? 'Toppings:' : 'Toppings:'}{' '}
              <strong className="text-white">
                {selectedToppings.length} {isEs ? 'agregados' : 'added'}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
