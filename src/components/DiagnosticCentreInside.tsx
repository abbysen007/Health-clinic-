/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, ShieldCheck, Microscope, HeartPulse, Activity, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface DiagnosticCentreInsideProps {
  inspectorActive: boolean;
  isActive: boolean;
  onSelect: () => void;
}

export default function DiagnosticCentreInside({ inspectorActive, isActive, onSelect }: DiagnosticCentreInsideProps) {
  const [activeTab, setActiveTab] = useState(0);

  const suites = [
    {
      title: "32-Slice CT Scan Suite",
      tagline: "Ultra-fast high-resolution 3D visualization",
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1200",
      description: "Our core technology USP. The 32-Slice Scanner provides exceptionally clear skeletal and organ images, allowing 3D physical reconstructions. Crucial for prompt neurology, pulmonology, and orthopedic diagnostics.",
      specifications: [
        "Ultra-low dose radiation filters",
        "High-definition 3D vascular maps",
        "Same-day physical films + digital report"
      ],
      icon: Zap
    },
    {
      title: "Sterile Pathology Laboratory",
      tagline: "Fully automated biochemistry and hematology analyzers",
      image: "https://images.unsplash.com/photo-1582719471384-894fbb16e024?auto=format&fit=crop&q=80&w=1200",
      description: "Health Point's lab is certified for NABL protocols. Equipped with fully automated immunoassay analyzers, blood cell counters, and micro-filtration. All blood draws, thyroid profiles, and lipid tests are cataloged bar-coded for error prevention.",
      specifications: [
        "100% NABL compliant procedures",
        "Bar-coded tracking to avoid sample mixups",
        "Auto-transmission to WhatsApp in 4-6 hours"
      ],
      icon: Microscope
    },
    {
      title: "Cardiac and Neuro-mapping Suite",
      tagline: "Echo Color Doppler, EEG, and NCV neuro studies",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
      description: "A specialized clinical setup for advanced organ rhythms. Includes Color Doppler Echocardiography, 12-lead digital ECG tracking, nerve conduction velocities (NCV) to locate nerve pinches, and brain electrical mapping (EEG).",
      specifications: [
        "Real-time cardiac chamber measurements",
        "High sensitivity electrode neuro-mapping",
        "Consultant-supervised wave reviews"
      ],
      icon: HeartPulse
    },
    {
      title: "Advanced Ultrasound Lab (USG)",
      tagline: "High-frequency ultrasound of whole abdomen and pregnancy mapping",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
      description: "Precision non-invasive scanning of soft tissues, abdomen, pelvis, and prenatal scans. Supervised by highly skilled in-house sonologists. Employs advanced contrast algorithms for high clarity organ visualization.",
      specifications: [
        "High-density physical photo prints",
        "Painless, highly sterile patient rooms",
        "Pre-booked slots for immediate testing"
      ],
      icon: Eye
    }
  ];

  return (
    <section
      id="diagnostic-centre-inside"
      onClick={() => {
        if (inspectorActive) onSelect();
      }}
      className={`relative bg-white py-20 border-b border-slate-200/60 transition-all duration-300 ${
        inspectorActive
          ? `cursor-crosshair outline-3 outline-dashed outline-teal-500/40 relative z-10 ${
              isActive ? 'outline-teal-500 bg-slate-50 shadow-[0_0_50px_rgba(13,148,136,0.15)]' : 'hover:outline-teal-500/60'
            }`
          : ''
      }`}
    >
      {/* Decorative technical grid for inspector mode */}
      {inspectorActive && (
        <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
      )}

      {/* Inspector tag */}
      {inspectorActive && (
        <div className="absolute top-2 left-2 z-20 bg-teal-500 text-slate-950 px-2 py-0.5 rounded font-mono text-[10px] font-bold tracking-wider flex items-center gap-1 shadow">
          <span>SECTION_EXTRA // DIAG_CENTRE_INSIDE</span>
          {isActive && <span className="bg-white text-teal-600 px-1 rounded text-[8px] ml-1">INSPECTING</span>}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-clinic-gold uppercase block">STATE-OF-THE-ART APPARATUS</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-clinic-navy tracking-tight">
            Inside Our Diagnostic Centre
          </h2>
          <p className="text-clinic-slate-gray text-sm font-light leading-relaxed">
            Take a visual tour of our sanitized, clinical diagnostics wing in Konnagar. We continuously upgrade our instrumentation to meet elite hospital standards.
          </p>
        </div>

        {/* Tab Controllers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {suites.map((suite, idx) => {
            const Icon = suite.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-4 py-2.5 rounded border font-mono text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === idx
                    ? 'bg-clinic-navy border-clinic-navy text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-clinic-slate-gray hover:bg-slate-100 hover:text-clinic-navy'
                }`}
              >
                <Icon size={14} className={activeTab === idx ? 'text-clinic-teal' : 'text-clinic-gold'} />
                <span>{suite.title.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        {/* Showcase Area */}
        <div className="bg-clinic-cream border border-slate-200/80 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[440px]">
          
          {/* Image Block */}
          <div className="lg:col-span-6 relative min-h-[280px] lg:min-h-0 bg-slate-900 overflow-hidden">
            <img
              src={suites[activeTab].image}
              alt={suites[activeTab].title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="px-2 py-0.5 bg-clinic-gold text-white text-[9px] font-mono font-bold uppercase rounded tracking-wider">
                STERILE EQUIPMENT DEPLOYED
              </span>
              <h4 className="font-display font-bold text-lg mt-1 text-white">{suites[activeTab].title}</h4>
            </div>
          </div>

          {/* Description Block */}
          <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-wider text-clinic-gold uppercase block">
                {suites[activeTab].tagline}
              </span>
              <h3 className="font-display font-bold text-2xl text-clinic-navy tracking-tight">
                {suites[activeTab].title}
              </h3>
              <p className="text-clinic-slate-gray text-xs md:text-sm leading-relaxed font-light">
                {suites[activeTab].description}
              </p>
            </div>

            <div className="space-y-3 bg-white p-4 rounded border border-slate-100">
              <span className="text-[9px] font-mono font-bold text-clinic-navy uppercase tracking-widest block">
                ACCURACY & PROTOCOLS:
              </span>
              <ul className="space-y-2 text-xs text-clinic-slate-gray">
                {suites[activeTab].specifications.map((spec, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2 font-light">
                    <ShieldCheck size={14} className="text-clinic-teal shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                  Live & Fully Operational
                </span>
              </div>
              <a
                href="#booking-engine"
                className="text-xs font-mono font-bold text-clinic-gold hover:text-clinic-navy flex items-center gap-1 transition-colors"
              >
                <span>BOOK IN THIS DEPT &gt;</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
