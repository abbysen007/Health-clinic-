/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { DIAGNOSTIC_TESTS } from '../data/clinicData';
import { DiagnosticTest } from '../types';
import { Layers, Check, AlertTriangle, Clock, Plus, Minus, Search, ShieldCheck } from 'lucide-react';

interface DiagnosticPackagesProps {
  inspectorActive: boolean;
  isActive: boolean;
  onSelect: () => void;
  selectedTestIds: string[];
  onToggleTest: (testId: string) => void;
}

export default function DiagnosticPackages({
  inspectorActive,
  isActive,
  onSelect,
  selectedTestIds,
  onToggleTest,
}: DiagnosticPackagesProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Advanced Imaging' | 'Neuro & Cardiac' | 'Wellness Pathology' | 'Radiology & Imaging'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Advanced Imaging', 'Neuro & Cardiac', 'Wellness Pathology', 'Radiology & Imaging'] as const;

  const filteredTests = useMemo(() => {
    let list = DIAGNOSTIC_TESTS;
    if (activeCategory !== 'All') {
      list = list.filter(t => t.category === activeCategory);
    }
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.code.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchTerm]);

  return (
    <section
      id="diagnostic-packages"
      onClick={() => {
        if (inspectorActive) onSelect();
      }}
      className={`relative bg-slate-50 py-16 md:py-24 border-b border-slate-100 transition-all duration-300 ${
        inspectorActive
          ? `cursor-crosshair outline-3 outline-dashed outline-teal-500/40 relative z-10 ${
              isActive ? 'outline-teal-500 bg-slate-100 shadow-[0_0_50px_rgba(13,148,136,0.15)]' : 'hover:outline-teal-500/60'
            }`
          : ''
      }`}
    >
      {/* Decorative technical backdrop for inspector mode */}
      {inspectorActive && (
        <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
      )}

      {/* Inspector visual markers */}
      {inspectorActive && (
        <div className="absolute top-2 left-2 z-20 bg-teal-500 text-slate-950 px-2 py-0.5 rounded font-mono text-[10px] font-bold tracking-wider flex items-center gap-1 shadow">
          <span>SECTION_05 // DIAGNOSTIC_&_LAB_PACKAGES</span>
          {isActive && <span className="bg-white text-teal-600 px-1 rounded text-[8px] ml-1">INSPECTING</span>}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-teal-600 uppercase block">NABL PATHOLOGY & IMAGING</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Diagnostic & Lab Packages
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            Our clinical laboratory is NABL accredited, ensuring standard accuracy accepted by major national institutions. Add tests directly to schedule slot.
          </p>
        </div>

        {/* Categories Tabs & Search */}
        <div className="space-y-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-2">
            
            {/* Category horizontal scroll navigation */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded border whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-950'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Quick search inside tests */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="Search scans, panels, profiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-teal-500 text-slate-800"
              />
            </div>

          </div>
        </div>

        {/* Diagnostic Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => {
            const isAdded = selectedTestIds.includes(test.id);
            // Color mapping based on category for subtle tags
            const catColors = {
              'Advanced Imaging': 'border-teal-100 bg-teal-50/50 text-teal-800',
              'Neuro & Cardiac': 'border-blue-100 bg-blue-50/50 text-blue-800',
              'Wellness Pathology': 'border-emerald-100 bg-emerald-50/50 text-emerald-800',
              'Radiology & Imaging': 'border-purple-100 bg-purple-50/50 text-purple-800',
            }[test.category];

            return (
              <div
                key={test.id}
                className={`bg-white border rounded-lg p-6 flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isAdded
                    ? 'border-teal-500 shadow-md bg-teal-50/10'
                    : 'border-slate-200/60 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* Visual Indicator of Addition */}
                {isAdded && (
                  <div className="absolute top-0 right-0 h-10 w-10 bg-teal-500 flex items-center justify-center rounded-bl-lg">
                    <Check size={16} className="text-white" />
                  </div>
                )}

                <div className="space-y-4">
                  {/* Category and code tags */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-medium border ${catColors}`}>
                      {test.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      CODE: {test.code}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-slate-900 text-base leading-tight group-hover:text-teal-600 transition-colors">
                      {test.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans font-light leading-relaxed">
                      {test.description}
                    </p>
                  </div>

                  {/* Test specifications */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-500 font-mono">
                    <div className="flex items-center gap-1">
                      <Clock size={11} className="text-slate-400" />
                      <span>REPORTS: {test.turnaroundTime.toUpperCase()}</span>
                    </div>
                    {test.requiresFasting && (
                      <div className="flex items-center gap-1 text-amber-600 font-semibold">
                        <AlertTriangle size={11} className="text-amber-500" />
                        <span>FASTING 12H REQ.</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Test Rate</span>
                    <span className="text-lg font-mono font-bold text-slate-900">₹{test.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleTest(test.id);
                    }}
                    className={`px-3 py-1.5 rounded font-mono text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-all ${
                      isAdded
                        ? 'bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100'
                        : 'bg-slate-900 border border-slate-900 text-white hover:bg-teal-600 hover:border-teal-600'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Minus size={11} />
                        <span>REMOVE</span>
                      </>
                    ) : (
                      <>
                        <Plus size={11} />
                        <span>ADD TO SLOT</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* NABL standard badge callout */}
        <div className="mt-10 bg-white border border-slate-200 rounded-lg p-5 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-teal-50 border border-teal-100 rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="text-teal-600" size={20} />
            </div>
            <div>
              <h4 className="text-xs font-mono font-semibold text-slate-900 uppercase">National NABL Quality Directives</h4>
              <p className="text-xs text-slate-500 font-sans font-light mt-0.5">
                Our lab equipment passes weekly blind reference samples to maintain standard deviations of &lt;1.5%. Accepted globally.
              </p>
            </div>
          </div>
          <a
            href="#booking-engine"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono font-bold rounded transition-colors whitespace-nowrap text-center"
          >
            VIEW SCHEDULING TICKET
          </a>
        </div>

      </div>
    </section>
  );
}
