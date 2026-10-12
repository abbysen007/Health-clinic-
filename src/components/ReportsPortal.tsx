/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, FileText, Download, ShieldCheck, FileCheck, CheckCircle2, User, RefreshCw, ChevronRight, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReportsPortalProps {
  inspectorActive: boolean;
  isActive: boolean;
  onSelect: () => void;
}

interface SimulatedParameter {
  name: string;
  value: number | string;
  unit: string;
  referenceRange: string;
  flag: 'Normal' | 'High' | 'Low';
}

interface SimulatedReport {
  id: string;
  testName: string;
  date: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  referredBy: string;
  labRefNo: string;
  parameters: SimulatedParameter[];
}

export default function ReportsPortal({ inspectorActive, isActive, onSelect }: ReportsPortalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock database of clinical reports tied to phone numbers or registry IDs
  const mockReports: SimulatedReport[] = [
    {
      id: "REP-90412",
      testName: "Complete Blood Count (CBC) with ESR",
      date: "2026-07-02",
      patientName: "Soumen Banerjee",
      patientAge: 42,
      patientGender: "Male",
      referredBy: "Dr. Madhumita Bose, MD",
      labRefNo: "NABL-77402",
      parameters: [
        { name: "Hemoglobin", value: 14.2, unit: "g/dL", referenceRange: "13.0 - 17.0", flag: "Normal" },
        { name: "Total WBC Count", value: 8500, unit: "cells/cu.mm", referenceRange: "4000 - 11000", flag: "Normal" },
        { name: "Red Blood Cell (RBC) Count", value: 4.8, unit: "million/cu.mm", referenceRange: "4.5 - 5.5", flag: "Normal" },
        { name: "Platelet Count", value: 240000, unit: "lakhs/cu.mm", referenceRange: "150000 - 450000", flag: "Normal" },
        { name: "Erythrocyte Sedimentation Rate (ESR)", value: 18, unit: "mm/hr", referenceRange: "0 - 15", flag: "High" },
        { name: "Neutrophils", value: 62, unit: "%", referenceRange: "40 - 75", flag: "Normal" },
        { name: "Lymphocytes", value: 28, unit: "%", referenceRange: "20 - 45", flag: "Normal" }
      ]
    },
    {
      id: "REP-88301",
      testName: "Thyroid Profile (T3, T4, TSH)",
      date: "2026-06-28",
      patientName: "Mousumi Das",
      patientAge: 38,
      patientGender: "Female",
      referredBy: "Dr. Srijata Mukherjee, MS",
      labRefNo: "NABL-68211",
      parameters: [
        { name: "Total Triiodothyronine (T3)", value: 1.15, unit: "ng/mL", referenceRange: "0.80 - 2.00", flag: "Normal" },
        { name: "Total Thyroxine (T4)", value: 7.8, unit: "µg/dL", referenceRange: "5.1 - 14.1", flag: "Normal" },
        { name: "Thyroid Stimulating Hormone (TSH)", value: 5.42, unit: "µIU/mL", referenceRange: "0.40 - 4.50", flag: "High" }
      ]
    },
    {
      id: "REP-91255",
      testName: "Lipid Profile (Cardiovascular Fat)",
      date: "2026-07-05",
      patientName: "Soumen Banerjee",
      patientAge: 42,
      patientGender: "Male",
      referredBy: "Dr. Arpan Sen, DM (Cardiology)",
      labRefNo: "NABL-77519",
      parameters: [
        { name: "Total Cholesterol", value: 228, unit: "mg/dL", referenceRange: "< 200 (Desirable)", flag: "High" },
        { name: "HDL Cholesterol (Good)", value: 41, unit: "mg/dL", referenceRange: "> 40 (Male)", flag: "Normal" },
        { name: "LDL Cholesterol (Bad)", value: 145, unit: "mg/dL", referenceRange: "< 100 (Optimal)", flag: "High" },
        { name: "Triglycerides", value: 195, unit: "mg/dL", referenceRange: "< 150 (Desirable)", flag: "High" },
        { name: "VLDL Cholesterol", value: 39, unit: "mg/dL", referenceRange: "5 - 40", flag: "Normal" }
      ]
    }
  ];

  // Retrieve local storage appointments to allow printing prescription templates or slips
  const savedAppointments = useMemo(() => {
    const list = localStorage.getItem('healthpoint_appointments');
    return list ? JSON.parse(list) : [];
  }, [searched]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearched(true);
      // Auto select first report if found
      const matched = matchedReports;
      if (matched.length > 0) {
        setSelectedReportId(matched[0].id);
      } else {
        setSelectedReportId(null);
      }
    }, 800);
  };

  // Find reports matching phone number or name or "9830512345"
  const matchedReports = useMemo(() => {
    if (!searched) return [];
    const query = searchQuery.toLowerCase().trim();
    if (query === 'all' || query === '') return mockReports;

    return mockReports.filter(rep => 
      rep.patientName.toLowerCase().includes(query) || 
      rep.id.toLowerCase().includes(query) || 
      query === '9830512345' || 
      query === '98305 12345' ||
      query === 'soumen' ||
      query === 'mousumi'
    );
  }, [searched, searchQuery]);

  const activeReport = useMemo(() => {
    return mockReports.find(r => r.id === selectedReportId) || null;
  }, [selectedReportId]);

  return (
    <section
      id="reports-portal"
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
      {/* Technical wireframe details for inspector mode */}
      {inspectorActive && (
        <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />
      )}

      {/* Inspector visual marker */}
      {inspectorActive && (
        <div className="absolute top-2 left-2 z-20 bg-teal-500 text-slate-950 px-2 py-0.5 rounded font-mono text-[10px] font-bold tracking-wider flex items-center gap-1 shadow">
          <span>SECTION_EXTRA // DIGITAL_HEALTH_REPORTS_PORTAL</span>
          {isActive && <span className="bg-white text-teal-600 px-1 rounded text-[8px] ml-1">INSPECTING</span>}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-clinic-gold uppercase block">SECURE PATIENT RECORD SYSTEM</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-clinic-navy tracking-tight">
            Digital Reports & Prescriptions
          </h2>
          <p className="text-clinic-slate-gray text-sm font-light">
            Access secure pathology lab results, NABL test diagnostics, and official doctor prescription sheets using your registered credentials.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Login/Search & List (Spans 4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-clinic-cream border border-slate-200/80 p-5 md:p-6 rounded-lg space-y-4 shadow-sm">
              <div className="space-y-1.5">
                <h3 className="font-display font-bold text-clinic-navy text-sm md:text-base">
                  Search Patient Profile
                </h3>
                <p className="text-clinic-slate-gray text-[11px] font-light font-sans">
                  Use your registered mobile number or Patient Registration ID (Try searching <strong className="text-clinic-navy">"Soumen"</strong>, <strong className="text-clinic-navy">"Mousumi"</strong>, or our official demo phone <strong className="text-clinic-navy">"9830512345"</strong>).
                </p>
              </div>

              <form onSubmit={handleSearch} className="space-y-3">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="Enter Phone or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded text-slate-800 text-xs focus:outline-none focus:border-clinic-gold focus:ring-1 focus:ring-clinic-gold font-mono"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full py-2.5 bg-clinic-navy hover:bg-clinic-teal text-white font-mono text-xs font-bold tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSearching ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>QUERYING RECORDS...</span>
                    </>
                  ) : (
                    <>
                      <Search size={13} />
                      <span>PULL DIAGNOSTIC FILES</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* List results or state display */}
            <AnimatePresence mode="wait">
              {searched && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Matched Lab Reports ({matchedReports.length})
                    </span>
                    {matchedReports.length > 0 && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                  </div>

                  {matchedReports.length > 0 ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {matchedReports.map((report) => (
                        <button
                          key={report.id}
                          type="button"
                          onClick={() => setSelectedReportId(report.id)}
                          className={`w-full p-3.5 text-left rounded border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            selectedReportId === report.id
                              ? 'bg-clinic-navy border-clinic-navy text-white shadow-sm'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="space-y-1 overflow-hidden">
                            <span className={`text-[9px] font-mono tracking-wider block ${selectedReportId === report.id ? 'text-clinic-teal' : 'text-clinic-gold'}`}>
                              {report.id} • {report.date}
                            </span>
                            <h4 className="font-display font-semibold text-xs truncate leading-tight">
                              {report.testName}
                            </h4>
                            <p className={`text-[10px] truncate ${selectedReportId === report.id ? 'text-slate-300' : 'text-slate-400'}`}>
                              Patient: {report.patientName} ({report.patientAge} Yrs)
                            </p>
                          </div>
                          <ChevronRight size={14} className={selectedReportId === report.id ? 'text-white' : 'text-slate-400'} />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white border border-dashed border-slate-200 p-6 rounded text-center text-xs text-slate-400 font-light font-sans">
                      No NABL blood chemistry files located for this search query. Try typing "Soumen".
                    </div>
                  )}

                  {/* Display booked prescription slips */}
                  {savedAppointments.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                        Clinic Prescription Slips ({savedAppointments.length})
                      </span>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {savedAppointments.map((app: any) => (
                          <div
                            key={app.id}
                            className="p-3 bg-white border border-slate-200 rounded text-xs flex justify-between items-center"
                          >
                            <div>
                              <span className="text-[9px] font-mono text-slate-400 block">{app.id}</span>
                              <p className="font-display font-bold text-clinic-navy text-xs">{app.patientName}</p>
                              <p className="text-[10px] text-clinic-slate-gray mt-0.5">
                                {app.bookingType === 'doctor' || app.bookingType === 'both' ? 'OPD Consultation' : 'Pathology draw'}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                // Simple slip generation / print simulation
                                window.print();
                              }}
                              className="p-1.5 bg-slate-50 hover:bg-clinic-cream border border-slate-200 text-clinic-gold rounded transition-colors"
                              title="Print slip"
                            >
                              <Download size={13} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right panel: Active report sheet details (Spans 8 cols on desktop) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeReport ? (
                <motion.div
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-sm relative overflow-hidden"
                >
                  {/* Decorative NABL accredited logo banner background */}
                  <div className="absolute right-6 top-6 border border-emerald-500/20 text-emerald-600/30 font-mono font-bold text-[10px] uppercase px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span>NABL CERTIFIED</span>
                  </div>

                  {/* Laboratory Report Letterhead Header */}
                  <div className="border-b border-slate-200 pb-5">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded bg-clinic-navy flex items-center justify-center text-white font-display font-bold text-xs">
                        HP
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm tracking-tight text-clinic-navy">
                          HEALTH POINT LABORATORY DIVISION
                        </h4>
                        <p className="text-[9px] font-mono text-clinic-slate-gray tracking-wide">
                          NABL ACCREDITED LABORATORY • GT ROAD, KONNAGAR, WB-712235
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-xs font-sans border-t border-slate-100 pt-4">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Patient Name</span>
                        <span className="font-semibold text-clinic-navy">{activeReport.patientName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Age / Gender</span>
                        <span className="text-clinic-navy font-medium">{activeReport.patientAge} Yrs / {activeReport.patientGender}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Referred By</span>
                        <span className="text-clinic-navy truncate font-medium">{activeReport.referredBy}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 block uppercase">Ref Lab Reg ID</span>
                        <span className="font-mono font-semibold text-clinic-gold">{activeReport.labRefNo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Report Table parameters */}
                  <div className="space-y-3">
                    <div className="bg-clinic-navy text-white px-3 py-1.5 rounded font-mono text-[10px] font-bold tracking-wider flex justify-between items-center">
                      <span>TEST INVESTIGATION PROFILE: {activeReport.testName.toUpperCase()}</span>
                      <span>DATE: {activeReport.date}</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-sans">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 font-mono text-[10px] uppercase">
                            <th className="py-2.5">Parameter Investigated</th>
                            <th className="py-2.5 text-center">Observed Value</th>
                            <th className="py-2.5 text-center">Unit</th>
                            <th className="py-2.5 text-center">Biological Reference Range</th>
                            <th className="py-2.5 text-right">Interpretation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700 font-light">
                          {activeReport.parameters.map((param, pIdx) => (
                            <tr key={pIdx} className="hover:bg-slate-50/50">
                              <td className="py-3 font-medium text-slate-900">{param.name}</td>
                              <td className="py-3 text-center font-mono font-semibold">
                                <span className={param.flag === 'High' || param.flag === 'Low' ? 'text-red-600 font-bold' : 'text-slate-800'}>
                                  {param.value}
                                </span>
                              </td>
                              <td className="py-3 text-center text-slate-400 font-mono text-[11px]">{param.unit}</td>
                              <td className="py-3 text-center text-slate-500 font-mono text-[11px]">{param.referenceRange}</td>
                              <td className="py-3 text-right">
                                {param.flag === 'Normal' ? (
                                  <span className="inline-block px-1.5 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-mono font-bold rounded">
                                    NORMAL
                                  </span>
                                ) : (
                                  <span className="inline-block px-1.5 py-0.5 bg-red-50 border border-red-100 text-red-700 text-[9px] font-mono font-bold rounded animate-pulse">
                                    ABNORMAL ({param.flag.toUpperCase()})
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Pathologist Stamp & sign section */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200 text-xs">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                      <FileCheck size={14} className="text-emerald-500" />
                      <span>This laboratory diagnostic report is electronically verified and digitally signed.</span>
                    </div>

                    <div className="text-center sm:text-right border-l-0 sm:border-l border-slate-200 pl-0 sm:pl-6">
                      <p className="font-display font-bold text-clinic-navy text-xs">Dr. Sreemoyee Bose, MD</p>
                      <p className="text-[10px] text-slate-400">Senior Pathologist & Biochemist</p>
                      <p className="text-[9px] font-mono text-emerald-600 font-bold tracking-widest mt-0.5">APPROVED & LOCKED</p>
                    </div>
                  </div>

                  {/* Print & download option trigger */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 bg-clinic-navy hover:bg-clinic-teal text-white font-mono text-xs font-bold tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download size={13} />
                      <span>DOWNLOAD PATHOLOGY REPORT PDF</span>
                    </button>
                  </div>

                </motion.div>
              ) : (
                <div className="bg-clinic-cream border border-dashed border-slate-200 rounded-lg p-12 text-center flex flex-col items-center justify-center space-y-4">
                  <FileText size={44} className="text-slate-300" />
                  <div className="space-y-1 max-w-sm">
                    <h4 className="font-display font-bold text-clinic-navy text-sm md:text-base">
                      No Pathology Profile Selected
                    </h4>
                    <p className="text-clinic-slate-gray text-xs font-light">
                      Please look up your registered profile on the left column, and choose from the matched lab results to load the full clinical letterhead diagnostics.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
