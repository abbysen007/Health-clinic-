/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { Award, ShieldAlert, Sparkles, Activity, FileText, MousePointerClick } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  inspectorActive: boolean;
  isActive: boolean;
  onSelect: () => void;
  onScrollToBooking: () => void;
}

export default function Hero({ inspectorActive, isActive, onSelect, onScrollToBooking }: HeroProps) {
  const { name, operatingHours, usp } = CLINIC_INFO;

  return (
    <section
      id="hero"
      onClick={() => {
        if (inspectorActive) onSelect();
      }}
      className={`relative bg-slate-900 text-white py-20 lg:py-28 overflow-hidden transition-all duration-300 ${
        inspectorActive
          ? `cursor-crosshair outline-3 outline-dashed outline-teal-500/40 relative z-10 ${
              isActive ? 'outline-teal-500 bg-slate-900/95 shadow-[0_0_50px_rgba(13,148,136,0.15)]' : 'hover:outline-teal-500/60'
            }`
          : ''
      }`}
    >
      {/* Decorative technical backdrop for inspector mode */}
      {inspectorActive && (
        <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      )}

      {/* Inspector visual markers */}
      {inspectorActive && (
        <div className="absolute top-2 left-2 z-20 bg-teal-500 text-slate-950 px-2 py-0.5 rounded font-mono text-[10px] font-bold tracking-wider flex items-center gap-1 shadow">
          <Activity size={10} className="animate-spin" />
          <span>SECTION_01 // HERO_&_USP</span>
          {isActive && <span className="bg-white text-teal-600 px-1 rounded text-[8px] ml-1">INSPECTING</span>}
        </div>
      )}

      {/* Dimension guidelines when inspector is active */}
      {inspectorActive && (
        <>
          <div className="absolute left-6 top-0 bottom-0 border-l border-teal-500/10 pointer-events-none" />
          <div className="absolute right-6 top-0 bottom-0 border-r border-teal-500/10 pointer-events-none" />
          <div className="absolute left-1/2 top-0 bottom-0 border-l border-teal-500/5 pointer-events-none" />
          <div className="absolute top-6 left-0 right-0 border-b border-teal-500/10 pointer-events-none" />
          <div className="absolute bottom-6 left-0 right-0 border-t border-teal-500/10 pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Typographical Pitch Column */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-950/80 border border-teal-800/80 text-teal-300 rounded text-xs font-mono">
              <Award size={13} className="text-teal-400" />
              <span>NABL ACCREDITED LABORATORY</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-[1.1]">
                Clinical Precision. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
                  Uncompromised Care.
                </span>
              </h1>
              <p className="text-slate-300 text-base md:text-lg max-w-xl font-sans font-light leading-relaxed">
                Welcome to <strong className="text-white font-medium">{name}</strong>, Konnagar's premier healthcare and diagnostics hub. We combine elite-level specialist chambers with rigorous pathology standards.
              </p>
            </div>

            {/* Quick trust bullet metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
              <div>
                <div className="text-xs font-mono text-teal-400 uppercase tracking-widest">Diagnostics</div>
                <div className="text-xl font-display font-bold text-white mt-1">NABL Standard</div>
                <p className="text-xs text-slate-400 font-sans mt-0.5">Accredited Laboratory</p>
              </div>
              <div>
                <div className="text-xs font-mono text-teal-400 uppercase tracking-widest">Location</div>
                <div className="text-xl font-display font-bold text-white mt-1">GT Rd, Konnagar</div>
                <p className="text-xs text-slate-400 font-sans mt-0.5">Near Batamore, HDFC Bank</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="text-xs font-mono text-teal-400 uppercase tracking-widest">Consultations</div>
                <div className="text-xl font-display font-bold text-white mt-1">Multi-Specialty</div>
                <p className="text-xs text-slate-400 font-sans mt-0.5">In-House Doctors Chambers</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-book-now"
                onClick={(e) => {
                  e.stopPropagation();
                  onScrollToBooking();
                }}
                className="px-6 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold tracking-wider rounded border border-teal-500 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <span>BOOK APPOINTMENT & DIAGNOSTICS</span>
                <span className="text-teal-200">→</span>
              </button>
              <a
                href="#doctor-hub"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="px-6 py-3.5 bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs font-semibold tracking-wider rounded border border-slate-800 transition-all flex items-center justify-center gap-1"
              >
                <span>EXPLORE DOCTORS</span>
              </a>
            </div>
          </div>

          {/* Premium USP Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 blur-xl opacity-30" />
            
            <div className="relative bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-lg shadow-2xl flex flex-col justify-between">
              <div>
                {/* USP Badge tag */}
                <div className="flex justify-between items-start mb-6">
                  <span className="px-2.5 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-[10px] font-mono font-bold uppercase tracking-wider rounded">
                    {usp.badge}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-xs font-mono text-slate-400 uppercase tracking-widest">Exclusive Technology USP</h2>
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight">
                    {usp.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-sans font-light leading-relaxed">
                    {usp.description}
                  </p>
                </div>

                {/* Highly structured pricing display */}
                <div className="mt-8 p-4 bg-slate-900 border border-slate-800 rounded flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Unbeatable Cost</span>
                    <span className="text-2xl font-mono font-bold text-teal-400">₹{usp.price.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Reports Provided</span>
                    <span className="text-xs font-mono text-slate-300">Same-Day 3D Print</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-900">
                <button
                  id="hero-quick-ct-book"
                  onClick={(e) => {
                    e.stopPropagation();
                    onScrollToBooking();
                    // Custom trigger to auto-fill CT scan can be handled in App state
                  }}
                  className="w-full py-3 bg-white text-slate-950 hover:bg-slate-100 font-mono text-xs font-bold tracking-wider rounded text-center transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>REQUEST EXPRESS CT SLOT</span>
                  <Activity size={12} className="text-teal-600" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
