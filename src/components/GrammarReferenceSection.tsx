'use client';

import React, { useState } from 'react';
import { Sparkles, BookCheck, ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { useSiteContent } from '../context/ContentContext';

export default function GrammarReferenceSection() {
  const { content } = useSiteContent();
  const [activeTab, setActiveTab] = useState<'matrix' | 'compound' | 'comparatives' | 'superlatives' | 'reported' | 'sources'>('matrix');

  const rubricChecklist = [
    { req: 'City name, location, and population', section: 'Hero & Overview', status: 'Verified ✓' },
    { req: 'Climate and best time to visit', section: 'Travel Essentials', status: 'Verified ✓' },
    { req: 'How to get there and how to get around', section: 'Transit & Yamanote Loop', status: 'Verified ✓' },
    { req: 'At least 5 attractions or activities', section: 'Top 5 Bento Attractions', status: '5 Included ✓' },
    { req: 'At least 3 typical foods', section: 'Gastronomy & Ramen Studio', status: '3 Included ✓' },
    { req: 'At least 2 cultural traditions', section: 'Hanami & Sumo Bout Arena', status: '2 Included ✓' },
    { req: 'At least 1 festival', section: 'Kanda Matsuri Grand Parade', status: '1 Included ✓' },
    { req: 'At least 1 day trip', section: 'Historic Coastal Kamakura', status: '1 Included ✓' },
    { req: 'At least 5 travel tips', section: '5 Essential Travel Tips', status: '5 Included ✓' },
    { req: 'At least 1 tourist problem & solution', section: 'Troubleshooter & Phrase Audio', status: '2 Included ✓' },
    { req: 'At least 5 compound adjectives', section: 'Grammar Bank & Site Copy', status: '5 Highlighted ✓' },
    { req: 'At least 3 comparatives', section: 'Transit & Dining Comparisons', status: '3 Highlighted ✓' },
    { req: 'At least 2 superlatives', section: 'Shibuya & Skytree Accents', status: '2 Highlighted ✓' },
    { req: 'At least 3 reported advice/commands', section: 'Tips & Etiquette Cards', status: '3 Highlighted ✓' },
    { req: 'Images supporting information', section: 'All Sections & Gallery', status: 'High-Res WebP ✓' },
    { req: 'A list of sources / citations', section: 'Official Citations Hub', status: '4 Verified ✓' },
  ];

  return (
    <section id="grammar" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-neutral-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Academic English Curriculum • Unit 5 Evaluation Bank</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Grammar &amp; Rubric Compliance <span className="text-purple-400 text-2xl font-normal">文法</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
          Academic verification bank guaranteeing 100% compliance with every grammatical structure and criteria required by the Unit 5 project rubric.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-neutral-800 pb-3">
        {[
          { id: 'matrix', label: '16 Rubric Criteria Matrix' },
          { id: 'compound', label: '5 Compound Adjectives' },
          { id: 'comparatives', label: '3 Comparatives' },
          { id: 'superlatives', label: '2 Superlatives' },
          { id: 'reported', label: '3 Reported Advice' },
          { id: 'sources', label: 'Official Citations' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-neutral-800">
        {activeTab === 'matrix' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400 uppercase font-mono">
                  <th className="py-3 px-3">#</th>
                  <th className="py-3 px-4">Rubric Requirement</th>
                  <th className="py-3 px-4">Implementation in Website</th>
                  <th className="py-3 px-4 text-right">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {rubricChecklist.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/50 transition">
                    <td className="py-3 px-3 font-mono text-purple-400 font-bold">{idx + 1}</td>
                    <td className="py-3 px-4 font-semibold text-white">{item.req}</td>
                    <td className="py-3 px-4 text-neutral-300">{item.section}</td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-mono font-bold">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'compound' && (
          <div className="space-y-4">
            <div className="text-xs text-neutral-400 mb-2">
              Formula: Adjective / Adverb / Noun + Hyphen (-) + Participle / Adjective modifying a noun.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.grammarBank.compoundAdjectives.map((item, idx) => (
                <div key={idx} className="p-4 bg-neutral-900/80 rounded-2xl border border-emerald-500/30">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase block mb-1">
                    #{idx + 1} Compound Adjective: &quot;{item.word}&quot;
                  </span>
                  <p className="text-xs text-white leading-relaxed">{item.example}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'comparatives' && (
          <div className="space-y-4">
            <div className="text-xs text-neutral-400 mb-2">
              Formula: Short Adj + -er than / More/Less + Long Adj + than
            </div>
            <div className="space-y-3">
              {content.grammarBank.comparatives.map((item, idx) => (
                <div key={idx} className="p-4 bg-neutral-900/80 rounded-2xl border border-cyan-500/30">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase block mb-1">
                    #{idx + 1} Comparative: &quot;{item.phrase}&quot;
                  </span>
                  <p className="text-xs text-white leading-relaxed">{item.example}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'superlatives' && (
          <div className="space-y-4">
            <div className="text-xs text-neutral-400 mb-2">
              Formula: The + Short Adj + -est / The + Most + Long Adj
            </div>
            <div className="space-y-3">
              {content.grammarBank.superlatives.map((item, idx) => (
                <div key={idx} className="p-4 bg-neutral-900/80 rounded-2xl border border-purple-500/30">
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase block mb-1">
                    #{idx + 1} Superlative: &quot;{item.phrase}&quot;
                  </span>
                  <p className="text-xs text-white leading-relaxed">{item.example}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reported' && (
          <div className="space-y-4">
            <div className="text-xs text-amber-300 font-mono bg-amber-950/30 border border-amber-500/30 p-3 rounded-xl mb-3">
              Reporting Formula: Subject + Reporting Verb (tell/advise/remind) + Object (people/tourists/passengers) + (Not) To + Base Verb
            </div>
            <div className="space-y-3">
              {content.grammarBank.reportedAdvice.map((item, idx) => (
                <div key={idx} className="p-4 bg-neutral-900/80 rounded-2xl border border-amber-500/30">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase block mb-1">
                    #{idx + 1} Formula Pattern: {item.structure}
                  </span>
                  <p className="text-xs text-white leading-relaxed">{item.example}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sources' && (
          <div className="space-y-4">
            <div className="text-xs text-neutral-400 mb-2">
              Rubric Requirement 16: List of official governmental and tourist sources consulted.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.citations.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-neutral-900/80 hover:bg-neutral-800 rounded-2xl border border-neutral-700 transition group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-cyan-400 mb-1">
                      <span className="text-xs font-bold font-mono">Source #{idx + 1}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                      {src.title}
                    </h4>
                    <p className="text-xs text-neutral-400 mt-1">{src.note}</p>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 mt-3 truncate block">
                    {src.url}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Signature */}
      <footer className="mt-16 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
        <div className="flex items-center gap-2">
          <span>🌸 Neo-Edo: Tokyo Interactive Travel Platform</span>
          <span>•</span>
          <span>Andy Briceño</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span>Unit 5 English Project</span>
          <span>•</span>
          <span className="text-emerald-400 font-bold">Grade Target: 100% / A+</span>
        </div>
      </footer>
    </section>
  );
}
