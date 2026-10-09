'use client';

import React, { useState } from 'react';
import {
  Edit3,
  Menu,
  X,
  Languages,
} from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

interface NavigationProps {
  ambientSakura: boolean;
  onToggleAmbientSakura: () => void;
}

export default function Navigation({
  ambientSakura,
  onToggleAmbientSakura,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    language,
    toggleLanguage,
    isEditMode,
    toggleEditMode,
    supabaseSynced,
  } = useSiteContent();

  const isEs = language === 'es';

  const navLinks = [
    { label: isEs ? 'Inicio' : 'Hero', href: '#hero' },
    { label: isEs ? 'Descripción' : 'Overview', href: '#overview' },
    { label: isEs ? 'Atracciones' : 'Attractions', href: '#attractions' },
    { label: isEs ? 'Transporte' : 'Transit', href: '#transit' },
    { label: isEs ? 'Gastronomía' : 'Food', href: '#food' },
    { label: isEs ? 'Cultura' : 'Culture', href: '#culture' },
    { label: isEs ? 'Consejos' : 'Tips', href: '#tips' },
    { label: isEs ? 'Excursión' : 'Day Trip', href: '#daytrip' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#090b10]/90 backdrop-blur-md border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / Title Area */}
        <a href="#hero" className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-black text-white tracking-widest uppercase">
              {isEs ? 'Explora Tokio' : 'Explore Tokyo'}
            </h1>
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

        {/* Interactive Feature Controls Bar */}
        <div className="flex items-center gap-2">
          {/* LANGUAGE SWITCHER BUTTON */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-cyan-500/20 hover:from-amber-500/30 hover:to-cyan-500/30 border border-pink-500/50 text-white transition"
          >
            <Languages className="w-3.5 h-3.5 text-pink-400" />
            <span className="font-mono tracking-wider">
              {isEs ? 'ES | EN' : 'EN | ES'}
            </span>
          </button>

          {/* Supabase Live Edit Toggle */}
          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              isEditMode
                ? 'bg-cyan-500 text-black border border-cyan-300 font-bold'
                : 'bg-neutral-800/90 text-neutral-300 border border-neutral-700 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {isEditMode ? (isEs ? 'Editando' : 'Editing Active') : (isEs ? 'Editar' : 'Edit Mode')}
            </span>
          </button>

          {/* Supabase Status Dot */}
          <div
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-400"
          >
            <span className={`w-2 h-2 rounded-full ${supabaseSynced ? 'bg-emerald-400' : 'bg-amber-400 animate-ping'}`} />
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
              {isEs ? 'Cambiar a EN' : 'Cambiar a ES'}
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
        </div>
      )}
    </header>
  );
}
