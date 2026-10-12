/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldCheck, HeartPulse, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface WhyChooseUsProps {
  inspectorActive: boolean;
  isActive: boolean;
  onSelect: () => void;
}

export default function WhyChooseUs({ inspectorActive, isActive, onSelect }: WhyChooseUsProps) {
  const highlights = [
    {
      icon: Award,
      title: "NABL Accredited Diagnostics",
      description: "Rigorous laboratory testing standards. Our pathology reports are accepted by all major hospitals, physicians, and health boards globally.",
      badge: "Highest Standards"
    },
    {
      icon: ShieldCheck,
      title: "32-Slice CT Scan (3D)",
      description: "Equipped with state-of-the-art 3D visual reconstruction. Available at an unbeatable rate of ₹1,600—the only such facility in Konnagar.",
      badge: "Exclusive Facility"
    },
    {
      icon: HeartPulse,
      title: "Elite Specialist Panel",
      description: "Direct consultation access with leading practitioners from Cardiology to Neurology. Transparent pricing and scheduled time-slots.",
      badge: "6+ Specialists"
    },
    {
      icon: Smartphone,
      title: "WhatsApp & Online Reports",
      description: "Say goodbye to multiple trips. Receive completely secure, NABL-verified PDF reports directly on your WhatsApp number as soon as they are ready.",
      badge: "Instant Delivery"
    }
  ];

  return (
    <section
      id="why-choose-us"
      onClick={() => {
        if (inspectorActive) onSelect();
      }}
      className={`relative bg-clinic-cream py-20 border-b border-slate-200/60 transition-all duration-300 ${
        inspectorActive
          ? `cursor-crosshair outline-3 outline-dashed outline-teal-500/40 relative z-10 ${
              isActive ? 'outline-teal-500 bg-white shadow-[0_0_50px_rgba(13,148,136,0.15)]' : 'hover:outline-teal-500/60'
            }`
          : ''
      }`}
    >
      {/* Decorative Blueprint Overlays for Inspector Mode */}
      {inspectorActive && (
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      )}

      {/* Inspector tag */}
      {inspectorActive && (
        <div className="absolute top-2 left-2 z-20 bg-teal-500 text-slate-950 px-2 py-0.5 rounded font-mono text-[10px] font-bold tracking-wider flex items-center gap-1 shadow">
          <span>SECTION_EXTRA // WHY_CHOOSE_US</span>
          {isActive && <span className="bg-white text-teal-600 px-1 rounded text-[8px] ml-1">INSPECTING</span>}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Editorial Text Block */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-clinic-gold uppercase block">TRUSTED CLINICAL CARE</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-clinic-navy tracking-tight leading-tight">
              A Higher Standard of Healthcare in Konnagar
            </h2>
            <p className="text-clinic-slate-gray text-sm md:text-base font-light leading-relaxed">
              At Health Point Clinic, we believe that world-class diagnostic precision and specialist healthcare shouldn't require long journeys to Kolkata. We offer the community modern diagnostic tools, NABL accreditation, and highly esteemed medical consultants, right next door.
            </p>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 size={16} className="text-clinic-gold shrink-0 mt-0.5" />
                <span className="text-clinic-navy font-medium">99.8% Diagnostic Accuracy Rating</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 size={16} className="text-clinic-gold shrink-0 mt-0.5" />
                <span className="text-clinic-navy font-medium">Clean, fully air-conditioned and sanitized facilities</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs">
                <CheckCircle2 size={16} className="text-clinic-gold shrink-0 mt-0.5" />
                <span className="text-clinic-navy font-medium">Adjacent to HDFC Bank with dedicated patient support desk</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#booking-engine"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-clinic-navy text-white hover:bg-clinic-teal font-mono text-xs font-bold tracking-wider rounded transition-colors shadow-sm"
              >
                <span>BOOK AN APPOINTMENT</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Bento-Grid Highlights Block */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-slate-200/80 p-6 rounded-lg hover:border-clinic-gold/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-clinic-cream rounded border border-slate-100 group-hover:bg-clinic-navy group-hover:text-white transition-colors">
                        <Icon size={20} className="text-clinic-gold group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-[9px] font-mono font-bold tracking-wider text-clinic-gold uppercase px-2 py-0.5 bg-amber-50 rounded border border-amber-100">
                        {item.badge}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-clinic-navy text-base group-hover:text-clinic-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-clinic-slate-gray text-xs leading-relaxed font-light font-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
