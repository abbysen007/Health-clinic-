/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import DiagnosticCentreInside from './components/DiagnosticCentreInside';
import DoctorHub from './components/DoctorHub';
import DiagnosticPackages from './components/DiagnosticPackages';
import BookingEngine from './components/BookingEngine';
import ReportsPortal from './components/ReportsPortal';
import FaqSection from './components/FaqSection';
import Reviews from './components/Reviews';
import FooterMatrix from './components/FooterMatrix';
import { CLINIC_INFO } from './data/clinicData';
import { Activity, ShieldCheck, Heart, Layers, Eye, ChevronRight } from 'lucide-react';

export default function App() {
  const inspectorActive = false;
  const [activeSectionId, setActiveSectionId] = useState('hero_usp');
  
  // synchronized booking basket states
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleTest = (id: string) => {
    if (selectedTestIds.includes(id)) {
      setSelectedTestIds(selectedTestIds.filter(tid => tid !== id));
    } else {
      setSelectedTestIds([...selectedTestIds, id]);
    }
  };

  const handleSelectDoctorForBooking = (doc: any) => {
    setSelectedDoctorId(doc.id);
    setActiveSectionId('booking_engine');
    scrollToSection('booking-engine');
  };

  const handleClearBookingCart = () => {
    setSelectedDoctorId(null);
    setSelectedTestIds([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      
      {/* Editorial Navigation Header */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          
          {/* Logo Brand Brandmark */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="h-9 w-9 rounded bg-teal-600 flex items-center justify-center font-display font-bold text-white tracking-tighter shadow-md">
              HP
            </div>
            <div>
              <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-teal-400 transition-colors">
                HEALTH POINT
              </span>
              <span className="text-[10px] font-mono text-teal-400 block tracking-widest leading-none mt-0.5">
                CLINIC // KONNAGAR
              </span>
            </div>
          </div>

          {/* Minimal Navigation Index */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono font-medium text-slate-300">
            {[
              { id: 'hero', label: 'USP CLINIC' },
              { id: 'doctor-hub', label: 'SPECIALISTS OPD' },
              { id: 'diagnostic-packages', label: 'DIAGNOSTIC PATHOLOGY' },
              { id: 'booking-engine', label: 'BOOKING SLOT' },
              { id: 'reviews', label: 'REVIEWS' },
              { id: 'footer-matrix', label: 'LOCATION' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  scrollToSection(link.id);
                  // set active section in inspector when navigating
                  if (link.id === 'hero') setActiveSectionId('hero_usp');
                  else if (link.id === 'doctor-hub') setActiveSectionId('specialist_hub');
                  else if (link.id === 'diagnostic-packages') setActiveSectionId('diagnostic_packages');
                  else if (link.id === 'booking-engine') setActiveSectionId('booking_engine');
                  else if (link.id === 'reviews') setActiveSectionId('google_reviews');
                  else if (link.id === 'footer-matrix') setActiveSectionId('footer_matrix');
                }}
                className="hover:text-white cursor-pointer transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Call to action & indicator controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                scrollToSection('booking-engine');
                setActiveSectionId('booking_engine');
              }}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white font-mono text-[11px] font-bold tracking-wider rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>DIRECT SLOT</span>
              <ChevronRight size={12} />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container Layout */}
      <div className={`transition-all duration-300 ${inspectorActive ? 'lg:pr-[480px]' : ''}`}>
        
        {/* Welcome Notice Banner (Displays only in inspector mode as an explanatory UI element) */}
        {inspectorActive && (
          <div className="bg-teal-950 border-b border-teal-800 text-teal-200 text-xs py-2 px-6 font-mono text-center flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-teal-400" />
            <span>Interactive UX Inspector Active: Click on any page segment below to map its corresponding wireframe strategy, conversion psychology, and accessibility specifications.</span>
          </div>
        )}

        {/* Section 1: Hero & USP */}
        <Hero 
          inspectorActive={inspectorActive} 
          isActive={activeSectionId === 'hero_usp'} 
          onSelect={() => setActiveSectionId('hero_usp')}
          onScrollToBooking={() => {
            scrollToSection('booking-engine');
            setActiveSectionId('booking_engine');
          }}
        />

        {/* Section 1B: Why Choose Us Trust Indicators */}
        <WhyChooseUs 
          inspectorActive={inspectorActive}
          isActive={activeSectionId === 'why_choose_us'}
          onSelect={() => setActiveSectionId('why_choose_us')}
        />

        {/* Section 1C: Inside Our Diagnostic Centre Tab Showcase */}
        <DiagnosticCentreInside 
          inspectorActive={inspectorActive}
          isActive={activeSectionId === 'inside_centre'}
          onSelect={() => setActiveSectionId('inside_centre')}
        />

        {/* Section 2 & 3: Specialist Hub & Consultation Fee matrices */}
        <DoctorHub 
          inspectorActive={inspectorActive} 
          isActive={activeSectionId === 'specialist_hub'} 
          onSelect={() => setActiveSectionId('specialist_hub')}
          onSelectDoctorForBooking={handleSelectDoctorForBooking}
        />

        {/* Section 5: Diagnostic & Lab Packages (rendered before booking so cart is full) */}
        <DiagnosticPackages 
          inspectorActive={inspectorActive} 
          isActive={activeSectionId === 'diagnostic_packages'} 
          onSelect={() => setActiveSectionId('diagnostic_packages')}
          selectedTestIds={selectedTestIds}
          onToggleTest={handleToggleTest}
        />

        {/* Section 4: Smart Integrated Booking Engine */}
        <BookingEngine 
          inspectorActive={inspectorActive} 
          isActive={activeSectionId === 'booking_engine'} 
          onSelect={() => setActiveSectionId('booking_engine')}
          selectedDoctorId={selectedDoctorId}
          setSelectedDoctorId={setSelectedDoctorId}
          selectedTestIds={selectedTestIds}
          setSelectedTestIds={setSelectedTestIds}
          onClearBookingCart={handleClearBookingCart}
        />

        {/* Section 4B: Reports & Prescription Download Center */}
        <ReportsPortal 
          inspectorActive={inspectorActive}
          isActive={activeSectionId === 'reports_portal'}
          onSelect={() => setActiveSectionId('reports_portal')}
        />

        {/* Section 4C: Frequently Asked Questions accordions */}
        <FaqSection 
          inspectorActive={inspectorActive}
          isActive={activeSectionId === 'faq_portal'}
          onSelect={() => setActiveSectionId('faq_portal')}
        />

        {/* Section 6: Live Google Reviews */}
        <Reviews 
          inspectorActive={inspectorActive} 
          isActive={activeSectionId === 'google_reviews'} 
          onSelect={() => setActiveSectionId('google_reviews')}
        />

        {/* Section 7: Map Location & Footer Matrix */}
        <FooterMatrix 
          inspectorActive={inspectorActive} 
          isActive={activeSectionId === 'footer_matrix'} 
          onSelect={() => setActiveSectionId('footer_matrix')}
        />

      </div>

    </div>
  );
}
