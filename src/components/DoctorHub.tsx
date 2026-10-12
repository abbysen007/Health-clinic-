/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { DOCTORS } from '../data/clinicData';
import { Doctor } from '../types';
import { Search, Info, Clock, UserCheck, HelpCircle, ArrowUpRight, ShieldCheck, HelpCircle as HelpIcon } from 'lucide-react';

interface DoctorHubProps {
  inspectorActive: boolean;
  isActive: boolean;
  onSelect: () => void;
  onSelectDoctorForBooking: (doctor: Doctor) => void;
}

export default function DoctorHub({
  inspectorActive,
  isActive,
  onSelect,
  onSelectDoctorForBooking,
}: DoctorHubProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = useMemo(() => {
    const list = DOCTORS.map(d => d.specialty);
    return ['All', ...Array.from(new Set(list))];
  }, []);

  // Map of medical conditions to specialty for smart searching
  const conditionToSpecialtyMap: { [key: string]: string } = {
    heart: 'Cardiology',
    chest: 'Cardiology',
    bp: 'Cardiology',
    hypertension: 'Cardiology',
    cardio: 'Cardiology',
    blockage: 'Cardiology',
    valve: 'Cardiology',
    pregnancy: 'Gynecology & Obstetrics',
    female: 'Gynecology & Obstetrics',
    woman: 'Gynecology & Obstetrics',
    baby: 'Pediatrics & Neonatology',
    child: 'Pediatrics & Neonatology',
    infant: 'Pediatrics & Neonatology',
    vaccine: 'Pediatrics & Neonatology',
    pediatric: 'Pediatrics & Neonatology',
    brain: 'Neurology',
    stroke: 'Neurology',
    paralysis: 'Neurology',
    nerve: 'Neurology',
    neurology: 'Neurology',
    migraine: 'Neurology',
    headache: 'Neurology',
    bone: 'Orthopedics & Joint Specialist',
    joint: 'Orthopedics & Joint Specialist',
    fracture: 'Orthopedics & Joint Specialist',
    spine: 'Orthopedics & Joint Specialist',
    knee: 'Orthopedics & Joint Specialist',
    arthritis: 'Orthopedics & Joint Specialist',
    pain: 'Orthopedics & Joint Specialist',
    fever: 'General Medicine',
    cough: 'General Medicine',
    cold: 'General Medicine',
    sugar: 'General Medicine',
    diabetes: 'General Medicine',
    general: 'General Medicine',
    physician: 'General Medicine',
    medicine: 'General Medicine',
  };

  const filteredDoctors = useMemo(() => {
    let list = DOCTORS;

    if (selectedSpecialty !== 'All') {
      list = list.filter(d => d.specialty === selectedSpecialty);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      
      // Check if query matches a condition keyword
      let matchedSpecialtyFromCondition = '';
      for (const [key, value] of Object.entries(conditionToSpecialtyMap)) {
        if (query.includes(key)) {
          matchedSpecialtyFromCondition = value;
          break;
        }
      }

      list = list.filter((doc) => {
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesSpecialty = doc.specialty.toLowerCase().includes(query);
        const matchesDegree = doc.degree.toLowerCase().includes(query);
        const matchesCondition = matchedSpecialtyFromCondition !== '' && doc.specialty === matchedSpecialtyFromCondition;

        return matchesName || matchesSpecialty || matchesDegree || matchesCondition;
      });
    }

    return list;
  }, [searchQuery, selectedSpecialty]);

  return (
    <section
      id="doctor-hub"
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
          <span>SECTION_02_03 // SPECIALIST_HUB_&_CONSULTATION_FEES</span>
          {isActive && <span className="bg-white text-teal-600 px-1 rounded text-[8px] ml-1">INSPECTING</span>}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section 2 Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-teal-600 uppercase block">SPECIALIST CHAMBERS</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Consult Our In-House Specialists
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            Search or filter through Konnagar's most trusted practitioners across key disciplines. Direct appointments available with transparent schedules.
          </p>
        </div>

        {/* Search Engine Dock */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, or condition (e.g., 'heart', 'baby', 'bone', 'fever')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:bg-white focus:ring-1 focus:ring-teal-500 transition-all font-sans"
            />
          </div>

          {/* Specialty Filters Matrix */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-2">Quick Filter:</span>
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer ${
                  selectedSpecialty === spec
                    ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border border-slate-100 p-6 rounded-lg hover:border-teal-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Doctor Card Top */}
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-full border ${doc.avatarColor} flex items-center justify-center font-display font-bold text-sm shrink-0`}>
                      {doc.name.split(' ').slice(1).map(n => n[0]).join('') || doc.name[0]}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-slate-900 text-base leading-tight group-hover:text-teal-600 transition-colors">
                        {doc.name}
                      </h3>
                      <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-mono font-medium rounded mt-1.5">
                        {doc.specialty}
                      </span>
                    </div>
                  </div>

                  {/* Credentials */}
                  <div className="text-xs space-y-1.5 border-t border-b border-slate-100 py-3 text-slate-600">
                    <p className="font-sans font-light">
                      <strong className="text-slate-700 font-medium">Credentials:</strong> {doc.degree}
                    </p>
                    <p className="font-sans font-light">
                      <strong className="text-slate-700 font-medium">Experience:</strong> {doc.experience}
                    </p>
                  </div>

                  {/* Availability */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <Clock size={12} className="text-slate-500" />
                      <span>OFFERED TIMINGS:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {doc.days.map((day, dIdx) => (
                        <span key={dIdx} className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-600 font-sans">
                          {day}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 pl-4 border-l border-teal-500/30 font-sans font-light italic">
                      {doc.availability.join(' / ')}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono text-slate-400 block uppercase">Consultation Fee</span>
                    <span className="text-lg font-mono font-semibold text-slate-900">₹{doc.fee.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDoctorForBooking(doc);
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-teal-600 text-white hover:text-white font-mono text-xs font-semibold rounded transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>BOOK SLOT</span>
                    <ArrowUpRight size={12} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center space-y-2">
              <p className="text-slate-500 text-sm">No specialists match your current search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('All');
                }}
                className="text-xs font-mono text-teal-600 underline hover:text-teal-700 cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* Section 3: Transparent consultation fee index */}
        <div className="bg-slate-50/60 border border-slate-200/50 p-6 md:p-8 rounded-lg mt-12 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-slate-900 text-lg">
                  Transparent Consultation Fee Index
                </h3>
                <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-mono font-bold uppercase rounded flex items-center gap-1">
                  <ShieldCheck size={10} />
                  <span>No Hidden Fees</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                To eliminate surprise charges, our specialty OPD pricing is strictly governed and fixed. Pay at clinic desk.
              </p>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
              <Info size={12} className="text-slate-400 shrink-0" />
              <span>Includes 1 valid review visit within 7 days.</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm font-sans">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Medical Specialty</th>
                  <th className="py-3 px-4 font-semibold">Lead Consultant</th>
                  <th className="py-3 px-4 font-semibold">Experience Level</th>
                  <th className="py-3 px-4 text-right font-semibold">Consultation Fee</th>
                  <th className="py-3 px-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-light">
                {DOCTORS.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-100/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">{doc.specialty}</td>
                    <td className="py-3 px-4">{doc.name} <span className="text-xs text-slate-400 font-mono">({doc.degree.split(' - ')[0]})</span></td>
                    <td className="py-3 px-4">{doc.experience}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-slate-950">₹{doc.fee.toFixed(2)}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDoctorForBooking(doc);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-teal-600 text-white font-mono text-[10px] font-bold uppercase rounded tracking-wider shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md"
                      >
                        <span>BOOK APPOINTMENT</span>
                        <ArrowUpRight size={11} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
