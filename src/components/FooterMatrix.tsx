/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CLINIC_INFO } from '../data/clinicData';
import { MapPin, Phone, Mail, Clock, HelpCircle, Navigation, ExternalLink, ShieldAlert, CheckCircle } from 'lucide-react';

interface FooterMatrixProps {
  inspectorActive: boolean;
  isActive: boolean;
  onSelect: () => void;
}

export default function FooterMatrix({ inspectorActive, isActive, onSelect }: FooterMatrixProps) {
  const { name, location, phone, altPhone, email, operatingHours, landmark } = CLINIC_INFO;
  const [isOpen, setIsOpen] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Checking operational hours...');

  // Compute live Open/Closed state
  useEffect(() => {
    const checkClinicStatus = () => {
      // Get current date/time in IST (Indian Standard Time is UTC+5.5)
      const now = new Date();
      
      // Calculate IST time
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istTime = new Date(utc + (3600000 * 5.5));
      
      const day = istTime.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
      const hour = istTime.getHours();
      const minute = istTime.getMinutes();
      const currentDecimalHour = hour + (minute / 60);

      let clinicOpen = false;
      let nextAction = '';

      if (day === 0) {
        // Sunday: 8:00 AM – 5:00 PM (8.0 to 17.0 decimal)
        if (currentDecimalHour >= 8 && currentDecimalHour < 17) {
          clinicOpen = true;
          setStatusMessage("OPEN NOW (Closes today at 5:00 PM)");
        } else {
          clinicOpen = false;
          setStatusMessage("CLOSED NOW (Opens Monday at 8:00 AM)");
        }
      } else {
        // Monday to Saturday: 8:00 AM – 8:00 PM (8.0 to 20.0 decimal)
        if (currentDecimalHour >= 8 && currentDecimalHour < 20) {
          clinicOpen = true;
          setStatusMessage(`OPEN NOW (Closes today at 8:00 PM)`);
        } else {
          clinicOpen = false;
          const isSaturday = day === 6;
          const nextDayMsg = isSaturday ? "Sunday at 8:00 AM" : "tomorrow at 8:00 AM";
          setStatusMessage(`CLOSED NOW (Opens ${nextDayMsg})`);
        }
      }

      setIsOpen(clinicOpen);
    };

    checkClinicStatus();
    const interval = setInterval(checkClinicStatus, 60000); // refresh status every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      id="footer-matrix"
      onClick={() => {
        if (inspectorActive) onSelect();
      }}
      className={`relative bg-slate-950 text-slate-300 pt-16 pb-12 transition-all duration-300 ${
        inspectorActive
          ? `cursor-crosshair outline-3 outline-dashed outline-teal-500/40 relative z-10 ${
              isActive ? 'outline-teal-500 bg-slate-950/95 shadow-[0_0_50px_rgba(13,148,136,0.15)]' : 'hover:outline-teal-500/60'
            }`
          : ''
      }`}
    >
      {/* Decorative technical backdrop for inspector mode */}
      {inspectorActive && (
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      )}

      {/* Inspector visual markers */}
      {inspectorActive && (
        <div className="absolute top-2 left-2 z-20 bg-teal-500 text-slate-950 px-2 py-0.5 rounded font-mono text-[10px] font-bold tracking-wider flex items-center gap-1 shadow">
          <span>SECTION_07 // LOCATION_&_FOOTER_MATRIX</span>
          {isActive && <span className="bg-white text-teal-600 px-1 rounded text-[8px] ml-1">INSPECTING</span>}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Split Grid: Map left, metadata right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start pb-12 border-b border-slate-900">
          
          {/* Lazy-Loaded Google Map Card (Spans 6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="text-teal-400" size={16} />
              <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Physical Mapping</h3>
            </div>
            
            <div className="relative rounded-lg overflow-hidden border border-slate-900 shadow-2xl h-80 bg-slate-900">
              <iframe
                title="Health Point Clinic Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.603310029567!2d88.35625451105436!3d22.701817585055047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89c8145c52f25%3A0x169cc5383a3edec7!2sHealth%20Point%20Clinic!5e0!3m2!1sen!2sin!4v1719999999999!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 filter invert opacity-90 contrast-125"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>LAT: 22.7018° N // LON: 88.3588° E</span>
              <a
                href="https://www.google.com/maps/place/Health+Point+Clinic/@22.7018127,88.3588294,17z/data=!3m1!4b1!4m6!3m5!1s0x39f89c8145c52f25:0x169cc5383a3edec7!8m2!3d22.7018127!4d88.3588294!16s%2Fg%2F11c2k3r2zx?entry=ttu&g_ep=EgoyMDI2MDcwNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-400 transition-colors flex items-center gap-1"
              >
                <span>OPEN GOOGLE MAPS</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

          {/* Metadata hierarchy index (Spans 6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-white tracking-tight mb-2">
                {name}
              </h2>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-widest border-b border-slate-900 pb-3">
                Konnagar Diagnostics & Multi-Specialty Desk
              </p>
            </div>

            {/* Live Operational Status Indicator */}
            <div className="p-4 bg-slate-900/50 border border-slate-900 rounded-lg flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider">Live Clinic Status</span>
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className="font-mono text-xs font-bold text-white">{statusMessage}</span>
                </div>
              </div>
              <div className="text-right">
                <Clock className="text-slate-500 inline" size={18} />
              </div>
            </div>

            {/* Technical metadata matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm font-sans">
              
              {/* Address detail */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Location & Landmark</span>
                <p className="font-light text-slate-300 leading-relaxed">
                  {location}
                </p>
                <span className="inline-block px-2 py-0.5 bg-slate-900 text-teal-400 text-[10px] font-mono rounded">
                  Landmark: {landmark}
                </span>
              </div>

              {/* Contacts */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Communication Channels</span>
                <p className="font-mono text-slate-300">
                  <span className="text-slate-500">Phone:</span> <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-teal-400 transition-colors">{phone}</a> <br />
                  <span className="text-slate-500">Mobile:</span> <a href={`tel:${altPhone.replace(/\s+/g, '')}`} className="hover:text-teal-400 transition-colors">{altPhone}</a>
                </p>
                <p className="font-mono text-slate-300">
                  <span className="text-slate-500">Email:</span> <a href={`mailto:${email}`} className="hover:text-teal-400 transition-colors">{email}</a>
                </p>
              </div>

            </div>

            {/* Working schedules table */}
            <div className="space-y-2 border-t border-slate-900 pt-6">
              <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Operating Schedule Matrix</span>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-400">
                <div>
                  <span className="text-slate-500">Mon - Sat:</span> <span className="text-slate-300">08:00 AM - 08:00 PM</span>
                </div>
                <div>
                  <span className="text-slate-500">Sunday:</span> <span className="text-slate-300">08:00 AM - 05:00 PM</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Lower row: Copyright and licensing */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-600 font-mono">
          <div>
            &copy; 2026 {name}. All Rights Reserved. NABL Standard Registry.
          </div>
          <div className="flex gap-4">
            <a href="#hero" className="hover:text-teal-500 transition-colors">TOP OF PAGE</a>
            <span>•</span>
            <a href="#doctor-hub" className="hover:text-teal-500 transition-colors">OPD CHAMBERS</a>
            <span>•</span>
            <a href="#diagnostic-packages" className="hover:text-teal-500 transition-colors">LAB tests</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
