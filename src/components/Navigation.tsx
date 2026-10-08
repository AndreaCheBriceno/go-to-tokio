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
  CheckCircle2,
  Cloud,
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
  const { isEditMode, toggleEditMode, supabaseSynced, lastSaved } = useSiteContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Attractions', href: '#attractions' },
    { label: 'Transit & Trains', href: '#transit' },
    { label: 'Gastronomy', href: '#gastronomy' },
    { label: 'Culture & Sumo', href: '#culture' },
    { label: 'Tips & Etiquette', href: '#tips' },
    { label: 'Problem & Solution', href: '#troubleshoot' },
    { label: 'Day Trip', href: '#daytrip' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090b10]/85 backdrop-blur-xl border-b border-neutral-800/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500/20 to-pink-500/10 border border-pink-500/40 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(255,42,133,0.3)] group-hover:scale-105 transition">
            🌸
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-base tracking-wide">TOKYO</span>
              <span className="text-[11px] font-mono text-pink-400 bg-pink-950/60 px-1.5 py-0.2 rounded border border-pink-500/30">
                東京
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 block -mt-0.5 tracking-tight">
              Unit 5 Academic Travel Guide
            </span>
          </div>
        </a>

        {/* Desktop Anchor Navigation */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-neutral-300">
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
          {/* 1. Laser Presentation Mode */}
          <button
            onClick={onToggleLaser}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              laserActive
                ? 'bg-red-600 text-white shadow-[0_0_15px_#ff0055] border border-red-400 animate-pulse'
                : 'bg-neutral-800/90 text-neutral-300 border border-neutral-700 hover:border-red-400/60 hover:text-white'
            }`}
            title="Toggle Laser Presentation Mode for Class (Shortcut: L)"
          >
            <MousePointer2 className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Laser Mode</span>
          </button>

          {/* 2. Interactive Brochure View */}
          <button
            onClick={onOpenBrochure}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-800/90 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 hover:border-pink-500/60 transition"
            title="View 3-Fold Brochure View (Tríptico Digital)"
          >
            <BookOpen className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden md:inline">Brochure View</span>
          </button>

          {/* 3. Grammar Lens Switch */}
          <button
            onClick={onToggleGrammar}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              grammarActive
                ? 'bg-purple-600/30 text-purple-300 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-neutral-800/90 text-neutral-300 border border-neutral-700 hover:text-white'
            }`}
            title="Highlight 16 Rubric Grammar Targets (Compound, Comparatives, Superlatives)"
          >
            <Search className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Grammar Lens</span>
          </button>

          {/* 4. Supabase Live Edit Toggle */}
          <button
            onClick={toggleEditMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              isEditMode
                ? 'bg-cyan-500 text-black shadow-[0_0_15px_#00f0ff] border border-cyan-300 font-bold'
                : 'bg-neutral-800/90 text-neutral-300 border border-neutral-700 hover:border-cyan-400/60 hover:text-white'
            }`}
            title="Edit texts live connected to Supabase database"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isEditMode ? 'Editing Active' : 'Edit Mode'}</span>
          </button>

          {/* Supabase Cloud Health Indicator */}
          <div
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400"
            title={supabaseSynced ? `Supabase Connected! Last saved: ${lastSaved || 'Synchronized'}` : 'Connecting to Supabase...'}
          >
            <span className={`w-2 h-2 rounded-full ${supabaseSynced ? 'bg-emerald-400 shadow-[0_0_8px_#00f59b]' : 'bg-amber-400 animate-ping'}`} />
            <span className="font-mono text-[10px] text-neutral-300">Supabase</span>
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
        <div className="xl:hidden bg-neutral-900/95 border-b border-neutral-800 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-neutral-800/60 text-neutral-200 hover:text-cyan-400"
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
              <span>Laser Mode</span>
            </button>
            <button
              onClick={() => {
                onOpenBrochure();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg bg-pink-600/20 text-pink-300 border border-pink-500/40 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Brochure View</span>
            </button>
            <button
              onClick={() => {
                toggleEditMode();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Mode</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
