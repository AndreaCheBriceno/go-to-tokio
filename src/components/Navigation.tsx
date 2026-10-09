'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  BookOpen,
  Edit3,
  MousePointer2,
  Wind,
  Menu,
  X,
  Languages,
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

interface NavigationProps {
  laserActive: boolean;
  onToggleLaser: () => void;
  grammarActive: boolean;
  onToggleGrammar: () => void;
  ambientSakura: boolean;
  onToggleAmbientSakura: () => void;
  onOpenBrochure: () => void;
}

export default function Navigation({
  laserActive,
  onToggleLaser,
  grammarActive,
  onToggleGrammar,
  ambientSakura,
  onToggleAmbientSakura,
  onOpenBrochure,
}: NavigationProps) {
  const { isEditMode, toggleEditMode, supabaseSynced, language, toggleLanguage } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEs = language === 'es';

  const navLinks = [
    { label: isEs ? 'Resumen' : 'Overview', href: '#overview' },
    { label: isEs ? 'Atracciones' : 'Attractions', href: '#attractions' },
    { label: isEs ? 'Transporte' : 'Transit & Trains', href: '#transit' },
    { label: isEs ? 'Gastronomía' : 'Gastronomy', href: '#gastronomy' },
    { label: isEs ? 'Cultura y Sumo' : 'Culture & Sumo', href: '#culture' },
    { label: isEs ? 'Consejos' : 'Tips & Etiquette', href: '#tips' },
    { label: isEs ? 'Soluciones' : 'Problem & Solution', href: '#troubleshoot' },
    { label: isEs ? 'Excursión' : 'Day Trip', href: '#daytrip' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090b10]/90 backdrop-blur-xl border-b border-neutral-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500/20 to-pink-500/10 border border-pink-500/40 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(255,42,133,0.3)] group-hover:scale-105 transition">
            🌸
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-sm sm:text-base tracking-wide">TOKYO</span>
              <span className="text-[10px] sm:text-[11px] font-mono text-pink-400 bg-pink-950/60 px-1.5 py-0.2 rounded border border-pink-500/30">
                東京
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-neutral-400 block -mt-0.5 tracking-tight">
              {isEs ? 'Guía Académica • Unidad 5' : 'Unit 5 Academic Travel Guide'}
            </span>
          </div>
        </a>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden xl:flex items-center gap-4 text-xs font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition hover:drop-shadow-[0_0_8px_#00f0ff]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Interactive Feature Controls Bar + TOP-RIGHT LANGUAGE TOGGLE */}
        <div className="flex items-center gap-2">
          {/* 1. LANGUAGE SWITCHER BUTTON (ARRIBA A LA DERECHA) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-cyan-500/20 hover:from-amber-500/30 hover:to-cyan-500/30 border border-pink-500/50 text-white shadow-[0_0_15px_rgba(255,42,133,0.3)] transition transform hover:scale-105 active:scale-95"
            title={isEs ? 'Cambiar a Inglés (Switch to English)' : 'Cambiar a Español (Switch to Spanish)'}
          >
            <Languages className="w-3.5 h-3.5 text-pink-400" />
            <span className="font-mono tracking-wider">
              {isEs ? '🇪🇸 ES | EN' : '🇬🇧 EN | ES'}
            </span>
          </button>

          {/* 2. Laser Presentation Mode */}
          <button
            onClick={onToggleLaser}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              laserActive
                ? 'bg-red-600 text-white shadow-[0_0_15px_#ff0055] border border-red-400 animate-pulse'
                : 'bg-neutral-800/90 text-neutral-300 border border-neutral-700 hover:border-red-400/60 hover:text-white'
            }`}
            title="Activar Puntero Láser para Exposición (Atajo: Tecla L)"
          >
            <MousePointer2 className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">{isEs ? 'Modo Láser' : 'Laser Mode'}</span>
          </button>

          {/* 3. Interactive Brochure View */}
          <button
            onClick={onOpenBrochure}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-800/90 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 hover:border-pink-500/60 transition"
            title="Ver Tríptico Plegable Digital"
          >
            <BookOpen className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline">{isEs ? 'Tríptico' : 'Brochure View'}</span>
          </button>

          {/* 4. Grammar Lens Switch */}
          <button
            onClick={onToggleGrammar}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              grammarActive
                ? 'bg-purple-600/30 text-purple-300 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-neutral-800/90 text-neutral-300 border border-neutral-700 hover:text-white'
            }`}
            title="Lente Gramatical (Resalta los 16 requisitos de la rúbrica)"
          >
            <Search className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden lg:inline">{isEs ? 'Lente Gramatical' : 'Grammar Lens'}</span>
          </button>

          {/* 5. Supabase Live Edit Toggle */}
          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              isEditMode
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_#00f0ff] border border-cyan-300 font-bold'
                : 'bg-neutral-800/90 text-neutral-300 border border-neutral-700 hover:border-cyan-400/60 hover:text-white'
            }`}
            title="Editar textos en vivo conectados a Supabase"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isEditMode ? (isEs ? 'Editando' : 'Editing Active') : (isEs ? 'Editar' : 'Edit Mode')}
            </span>
          </button>

          {/* Supabase Status Dot */}
          <div
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400"
            title={supabaseSynced ? 'Supabase conectado' : 'Conectando Supabase...'}
          >
            <span className={`w-2 h-2 rounded-full ${supabaseSynced ? 'bg-emerald-400 shadow-[0_0_8px_#00f59b]' : 'bg-amber-400 animate-ping'}`} />
            <span className="font-mono text-neutral-300">Supabase</span>
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-neutral-900/98 border-b border-neutral-800 p-4 space-y-3">
          {/* Mobile Language Switcher */}
          <div className="flex justify-between items-center p-2.5 bg-neutral-800/80 rounded-xl border border-pink-500/30">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Languages className="w-4 h-4 text-pink-400" />
              <span>{isEs ? 'Idioma del Sitio' : 'Site Language'}</span>
            </span>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-lg bg-pink-600 text-white text-xs font-bold font-mono"
            >
              {isEs ? 'Cambiar a EN 🇬🇧' : 'Cambiar a ES 🇪🇸'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-neutral-800/60 text-neutral-200 hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-800 flex flex-wrap gap-2">
            <button
              onClick={() => {
                onToggleLaser();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg bg-red-600/20 text-red-300 border border-red-500/40 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <MousePointer2 className="w-3.5 h-3.5" />
              <span>{isEs ? 'Modo Láser' : 'Laser Mode'}</span>
            </button>
            <button
              onClick={() => {
                onOpenBrochure();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg bg-pink-600/20 text-pink-300 border border-pink-500/40 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isEs ? 'Ver Tríptico' : 'Brochure View'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
