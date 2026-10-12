/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { REVIEWS } from '../data/clinicData';
import { Star, ShieldAlert, CheckCircle, Quote, StarHalf } from 'lucide-react';

interface ReviewsProps {
  inspectorActive: boolean;
  isActive: boolean;
  onSelect: () => void;
}

export default function Reviews({ inspectorActive, isActive, onSelect }: ReviewsProps) {
  return (
    <section
      id="reviews"
      onClick={() => {
        if (inspectorActive) onSelect();
      }}
      className={`relative bg-white py-16 md:py-24 border-b border-slate-100 transition-all duration-300 ${
        inspectorActive
          ? `cursor-crosshair outline-3 outline-dashed outline-teal-500/40 relative z-10 ${
              isActive ? 'outline-teal-500 bg-slate-50 shadow-[0_0_50px_rgba(13,148,136,0.15)]' : 'hover:outline-teal-500/60'
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
          <span>SECTION_06 // GOOGLE_REVIEWS_GRID</span>
          {isActive && <span className="bg-white text-teal-600 px-1 rounded text-[8px] ml-1">INSPECTING</span>}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-teal-600 uppercase block">PATIENT SOCIAL VALIDATION</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Verified Google Reviews
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            Read real feedback from Konnagar and West Bengal patients regarding our diagnostic accuracy, professional clinicians, and safety guidelines.
          </p>
        </div>

        {/* Google review meta statistics */}
        <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200/60 p-6 md:p-8 rounded-lg mb-12 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            {/* Google G logo */}
            <div className="h-14 w-14 bg-white shadow-sm border border-slate-200/80 rounded-full flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="h-7 w-7">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.245-3.12C18.281 1.25 15.518 0 12.24 0 5.58 0 .171 5.37.171 12s5.41 12 12.07 12c6.95 0 11.57-4.89 11.57-11.785 0-.795-.085-1.402-.191-1.93H12.24z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-extrabold text-slate-900 text-xl">4.8</span>
                <div className="flex text-amber-500">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
              <p className="text-xs text-slate-500 font-sans font-light mt-0.5">
                Based on over 340+ certified patient reviews in Konnagar, West Bengal.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-mono text-slate-600">
              #1 CLINIC IN KONNAGAR
            </span>
            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-mono text-slate-600">
              NABL ACCREDITATION TESTED
            </span>
          </div>
        </div>

        {/* Masonry Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((rev) => (
            <blockquote
              key={rev.id}
              className="bg-white border border-slate-200/50 p-6 rounded-lg shadow-sm flex flex-col justify-between hover:border-teal-500/50 hover:shadow-md transition-all duration-300 relative group"
            >
              <div className="space-y-4">
                {/* Header author and star details */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-display font-bold text-xs">
                      {rev.initials}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-xs leading-none">
                        {rev.author}
                      </h4>
                      <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                        {rev.source}
                      </span>
                    </div>
                  </div>
                  {/* Small Google G logo */}
                  <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 opacity-40">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.61c-.28 1.5-1.12 2.76-2.38 3.61v3h3.84c2.25-2.07 3.67-5.12 3.67-8.46z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.84-3c-1.07.72-2.44 1.16-4.09 1.16-3.14 0-5.8-2.11-6.75-4.96H1.32v3.1c1.98 3.96 6.07 6.61 10.68 6.61z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.25 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.61H1.32c-.81 1.62-1.27 3.44-1.27 5.39s.46 3.77 1.27 5.39L5.25 14.29z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.39 0 3.3 2.65 1.32 6.61L5.25 9.9c.95-2.85 3.61-4.96 6.75-4.96z"
                    />
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" className="stroke-none" />
                  ))}
                  {rev.rating < 5 && (
                    <Star key="empty" size={12} className="text-slate-200" />
                  )}
                </div>

                {/* Body Content with a tiny quote visual */}
                <div className="relative">
                  <Quote size={18} className="absolute -top-1.5 -left-1 text-teal-100 opacity-60 pointer-events-none" />
                  <p className="text-slate-600 text-xs font-sans font-light leading-relaxed pl-4">
                    {rev.text}
                  </p>
                </div>
              </div>

              {/* Timestamp footer */}
              <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                <span>{rev.relativeTime}</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                  <CheckCircle size={10} />
                  <span>Verified</span>
                </span>
              </div>
            </blockquote>
          ))}
        </div>

        {/* Write Google Review CTA */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col items-center justify-center text-center space-y-4">
          <div className="max-w-md space-y-1">
            <h4 className="font-display font-bold text-slate-900 text-sm">Have you visited Health Point Clinic recently?</h4>
            <p className="text-slate-500 text-xs font-light font-sans">
              Your valuable feedback helps other patients in Konnagar find trustworthy, accredited healthcare services.
            </p>
          </div>
          <a
            href="https://www.google.com/search?q=healthpoint+clinic+konnagar&oq=&gs_lcrp=EgZjaHJvbWUqCQgBECMYJxjqAjIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyDAgFECMYJxjqAhitBjIMCAYQIxgnGOoCGK0GMgwIBxAjGCcY6gIYrQbSAQkxNjM1ajBqMTWoAgiwAgHxBRCXKNvWRM3K8QUQlyjb1kTNyg&sourceid=chrome&ie=UTF-8#lrd=0x39f89c8145c52f25:0x169cc5383a3edec7,3,,,,"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-teal-600 text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-all duration-300 shadow hover:shadow-md cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.245-3.12C18.281 1.25 15.518 0 12.24 0 5.58 0 .171 5.37.171 12s5.41 12 12.07 12c6.95 0 11.57-4.89 11.57-11.785 0-.795-.085-1.402-.191-1.93H12.24z"/>
            </svg>
            <span>Write a Google Review</span>
          </a>
        </div>

        {/* Localized feedback note */}
        <p className="text-center text-xs text-slate-400 font-sans font-light mt-10">
          * Feedback collected securely via SMS triggers following report delivery. Review metadata is fully compliant with medical representation guidelines.
        </p>

      </div>
    </section>
  );
}
