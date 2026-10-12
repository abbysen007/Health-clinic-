/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, FileText, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqSectionProps {
  inspectorActive: boolean;
  isActive: boolean;
  onSelect: () => void;
}

export default function FaqSection({ inspectorActive, isActive, onSelect }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What preparation is required for diagnostic blood tests or scans?",
      answer: "Some specific wellness profiles (like the Lipid Profile or Fasting Blood Sugar) require absolute fasting for 10-12 hours prior to your sample draw. Drinking plain water is allowed. Tests like the Whole Abdomen USG require you to have a full bladder. Our booking engine automatically displays preparation flags on your ticket!"
    },
    {
      question: "How long does it take to get my reports, and how will I receive them?",
      answer: "Most routine blood pathology reports (Thyroid, CBC, Lipid) are finalized and verified by our pathologist within 4-6 hours. You will receive a high-security PDF report directly on your WhatsApp number. Advanced scans (like CT scans with 3D physical reconstructions or MRI) are usually printed and finalized on the same day within 6 hours."
    },
    {
      question: "Are your diagnostic reports accepted by hospitals and doctors in Kolkata or other cities?",
      answer: "Absolutely. Health Point Clinic has an NABL-aligned laboratory system. Because we maintain rigorous calibration protocols, our digital and printed diagnostic reports are universally accepted by all major hospitals, primary care networks, and insurance authorities nationwide."
    },
    {
      question: "How does the Home Sample Collection service work in Konnagar?",
      answer: "You can book home collection directly through our booking portal! Select 'Request Home Sample Collection', enter your address, preferred date/time slot, and patient info. A certified, vaccinated phlebotomist will visit your home for sterile sample extraction. No additional transport fee is charged for areas within Konnagar limits."
    },
    {
      question: "Do I need to pay online in advance to book a doctor appointment or test?",
      answer: "No. To keep scheduling transparent and reliable, we require zero online pre-payment. All consultation and pathology fees are payable directly at our reception desk when you arrive for your scheduled slot. We accept UPI, Cash, and Debit/Credit Cards."
    },
    {
      question: "Where is the clinic located exactly, and is parking available?",
      answer: "We are located right on GT Road in Konnagar, adjacent to the HDFC Bank branch and near the prominent Batamore junction. This central location is easily accessible by auto-rickshaws, rickshaws, and train (Konnagar Station is just a 5-minute ride away). Two-wheeler parking is available in front of the clinic."
    }
  ];

  return (
    <section
      id="faq-section"
      onClick={() => {
        if (inspectorActive) onSelect();
      }}
      className={`relative bg-clinic-cream py-16 md:py-24 border-b border-slate-200/60 transition-all duration-300 ${
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
          <span>SECTION_EXTRA // FAQ_PORTAL</span>
          {isActive && <span className="bg-white text-teal-600 px-1 rounded text-[8px] ml-1">INSPECTING</span>}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-clinic-gold uppercase block">PATIENT INQUIRIES</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-clinic-navy tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-clinic-slate-gray text-sm font-light">
            Have questions about laboratory test protocols, timings, or bookings? Find prompt answers here.
          </p>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:border-clinic-gold/40"
              >
                {/* Header Accordion Button */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-sans focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className={isOpen ? 'text-clinic-gold' : 'text-clinic-slate-gray'} />
                    <span className="font-display font-bold text-clinic-navy text-sm md:text-base tracking-tight hover:text-clinic-gold transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-clinic-slate-gray shrink-0">
                    {isOpen ? <ChevronUp size={16} className="text-clinic-gold" /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Collapsible Answer block with smooth AnimatePresence and layout shift */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 text-clinic-slate-gray text-xs md:text-sm font-light leading-relaxed border-t border-slate-50">
                        <p>{faq.answer}</p>
                        
                        <div className="mt-3 p-3 bg-clinic-cream rounded border border-slate-100 flex items-start gap-2 text-[11px] text-clinic-gold">
                          <Info size={14} className="shrink-0 mt-0.5" />
                          <span>Need further clarification? Feel free to contact our round-the-clock help desk at +91 33 2674 8900.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
