'use client';

import React from 'react';

export type GrammarCategory = 'compound' | 'comparative' | 'superlative' | 'reported';

interface GrammarBadgeProps {
  type: GrammarCategory;
  children: React.ReactNode;
  active: boolean;
  ruleExplanation?: string;
}

const CATEGORY_STYLES: Record<GrammarCategory, { bg: string; text: string; label: string; border: string }> = {
  compound: {
    bg: 'bg-emerald-500/25',
    text: 'text-emerald-300',
    border: 'border-emerald-400',
    label: 'Compound Adj',
  },
  comparative: {
    bg: 'bg-cyan-500/25',
    text: 'text-cyan-300',
    border: 'border-cyan-400',
    label: 'Comparative',
  },
  superlative: {
    bg: 'bg-purple-500/25',
    text: 'text-purple-300',
    border: 'border-purple-400',
    label: 'Superlative',
  },
  reported: {
    bg: 'bg-amber-500/25',
    text: 'text-amber-300',
    border: 'border-amber-400',
    label: 'Reported Advice',
  },
};

export default function GrammarBadge({
  type,
  children,
  active,
  ruleExplanation,
}: GrammarBadgeProps) {
  if (!active) {
    return <span className="font-semibold text-white">{children}</span>;
  }

  const style = CATEGORY_STYLES[type];

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs font-bold border transition ${style.bg} ${style.text} ${style.border} shadow-sm group relative cursor-help`}
      title={ruleExplanation || `${style.label} (Unit 5 Grammar Rule)`}
    >
      <span>{children}</span>
      <span className="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-black/60 text-white/90">
        {style.label}
      </span>
    </span>
  );
}
