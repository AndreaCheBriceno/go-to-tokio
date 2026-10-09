'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Edit3,
  Menu,
  X,
  Languages,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '../context/ContentContext';

interface NavigationProps {
  ambientSakura?: boolean;
  onToggleAmbientSakura?: () => void;
}

export default function Navigation({
  ambientSakura,
  onToggleAmbientSakura,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    language,
    toggleLanguage,
    isEditMode,
    toggleEditMode,
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

  // Detect touch device capabilities
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouchDevice(isTouch);
    }
  }, []);

  const cancelHide = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    cancelHide();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    cancelHide();
    hideTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  // Initial appearance: visible on load, then auto-collapses after 2.5s if mouse not over it
  useEffect(() => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 2500);

    return () => {
      cancelHide();
    };
  }, []);

  return (
    <>
      {/* 1. Thin hover trigger strip at the very top edge */}
      <div
        className="fixed top-0 inset-x-0 h-3 z-30 cursor-pointer pointer-events-auto"
        onMouseEnter={handleMouseEnter}
        aria-hidden="true"
      />

      {/* 2. Top-center collapsed handle / pill */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            y: isOpen ? -50 : 0,
            opacity: isOpen ? 0 : 1,
          }}
          transition={{
            duration: 0.25,
            ease: 'easeOut',
          }}
          className={isOpen ? 'pointer-events-none' : 'pointer-events-auto'}
        >
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            onMouseEnter={handleMouseEnter}
            onFocus={handleMouseEnter}
            className="group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-b-xl bg-[#090b10]/95 hover:bg-[#121622] border-x border-b border-cyan-500/40 hover:border-cyan-400 shadow-[0_4px_20px_rgba(0,240,255,0.18)] backdrop-blur-md transition-all text-neutral-300 hover:text-white"
            aria-label={isEs ? 'Abrir menú de navegación' : 'Open navigation menu'}
            title={isEs ? 'Abrir menú de navegación' : 'Open navigation menu'}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
            <span className="text-[11px] font-bold tracking-widest uppercase font-mono text-neutral-200 group-hover:text-cyan-300 transition-colors">
              {isEs ? 'Explora Tokio' : 'Explore Tokyo'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* 3. Mobile Backdrop Overlay when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm xl:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* 4. Sliding Section Menu Bar */}
      <motion.header
        initial={false}
        animate={{
          y: isOpen ? 0 : '-100%',
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            handleMouseLeave();
          }
        }}
        className={`fixed top-0 inset-x-0 z-40 bg-[#090b10]/95 backdrop-blur-md border-b border-neutral-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo / Title Area */}
          <a
            href="#hero"
            onClick={() => setIsOpen(false)}
            className="flex flex-col group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-black text-white tracking-widest uppercase group-hover:text-cyan-400 transition-colors">
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
                className="hover:text-cyan-400 transition hover:drop-shadow-[0_0_8px_#00f0ff] py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Spacer on the right so links don't collide with the fixed top-right controls */}
          <div
            className="flex items-center gap-2 invisible select-none pointer-events-none shrink-0"
            aria-hidden="true"
          >
            <div className="w-20 sm:w-28 h-8" />
            <div className="w-20 h-8" />
            <div className="w-9 h-8 xl:hidden" />
          </div>
        </div>

        {/* Mobile / Tablet links grid when menu is open */}
        <div className="xl:hidden px-4 pb-4 pt-1 border-t border-neutral-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-lg bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-cyan-500/40 text-neutral-200 hover:text-cyan-400 transition text-center font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.header>

      {/* 5. Fixed Top-Right Controls Bar (ALWAYS VISIBLE) */}
      <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-end">
          <div
            className="pointer-events-auto flex items-center gap-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Supabase Live Edit Toggle */}
            <button
              type="button"
              onClick={toggleEditMode}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg transition ${
                isEditMode
                  ? 'bg-cyan-500 text-black border border-cyan-300 font-bold'
                  : 'bg-[#090b10]/90 text-neutral-300 border border-neutral-700/80 hover:text-white hover:border-neutral-500'
              }`}
              title={isEs ? 'Modo de edición' : 'Edit mode'}
              aria-label={isEs ? 'Alternar modo de edición' : 'Toggle edit mode'}
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">
                {isEditMode ? (isEs ? 'Editando' : 'Editing Active') : (isEs ? 'Editar' : 'Edit Mode')}
              </span>
            </button>

            {/* LANGUAGE SWITCHER BUTTON (ALWAYS VISIBLE TOP RIGHT) */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-cyan-500/20 hover:from-amber-500/30 hover:to-cyan-500/30 border border-pink-500/50 text-white transition backdrop-blur-md bg-[#090b10]/90 shadow-lg"
              title={isEs ? 'Cambiar idioma' : 'Change language'}
              aria-label={isEs ? 'Cambiar idioma' : 'Change language'}
            >
              <Languages className="w-3.5 h-3.5 text-pink-400" />
              <span className="font-mono tracking-wider">
                {isEs ? 'ES | EN' : 'EN | ES'}
              </span>
            </button>

            {/* Visible Toggle Button for Touch / Mobile Devices */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className={`items-center justify-center p-2 rounded-full bg-[#090b10]/90 border border-neutral-700/80 text-neutral-300 hover:text-white shadow-lg backdrop-blur-md transition ${
                isTouchDevice ? 'flex' : 'flex xl:hidden'
              }`}
              aria-label={isOpen ? (isEs ? 'Cerrar menú' : 'Close menu') : (isEs ? 'Abrir menú' : 'Open menu')}
              title={isOpen ? (isEs ? 'Cerrar menú' : 'Close menu') : (isEs ? 'Abrir menú' : 'Open menu')}
            >
              {isOpen ? (
                <X className="w-4 h-4 text-pink-400" />
              ) : (
                <Menu className="w-4 h-4 text-cyan-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
