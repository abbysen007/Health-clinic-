/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { DOCTORS, DIAGNOSTIC_TESTS, CLINIC_INFO } from '../data/clinicData';
import { Doctor, DiagnosticTest, BookingState, SavedAppointment } from '../types';
import { Calendar, Clock, User, Phone, CheckCircle, Ticket, Trash2, ArrowRight, ArrowLeft, Heart, Shield, Plus, Printer, RefreshCw, MapPin, Edit2, XCircle, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingEngineProps {
  inspectorActive: boolean;
  isActive: boolean;
  onSelect: () => void;
  selectedDoctorId: string | null;
  setSelectedDoctorId: (id: string | null) => void;
  selectedTestIds: string[];
  setSelectedTestIds: (ids: string[]) => void;
  onClearBookingCart: () => void;
}

export default function BookingEngine({
  inspectorActive,
  isActive,
  onSelect,
  selectedDoctorId,
  setSelectedDoctorId,
  selectedTestIds,
  setSelectedTestIds,
  onClearBookingCart,
}: BookingEngineProps) {
  
  // Tab selector: 'book' (schedule form) or 'portal' (my appointments portal)
  const [bookingTab, setBookingTab] = useState<'book' | 'portal'>('book');

  // Local Booking Form States
  const [bookingType, setBookingType] = useState<'doctor' | 'diagnostic' | 'both' | 'home_collection'>('doctor');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1); // default to tomorrow
    return today.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Male');
  const [homeAddress, setHomeAddress] = useState('');
  const [bookingStep, setBookingStep] = useState(1); // 1: Cart, 2: Slot & Info, 3: Success
  const [activeSlipId, setActiveSlipId] = useState('');

  // Portal States
  const [portalSearch, setPortalSearch] = useState('');
  const [rescheduleTargetId, setRescheduleTargetId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('');
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  // Errors state
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const activeDoctor = useMemo(() => {
    return DOCTORS.find(d => d.id === selectedDoctorId) || null;
  }, [selectedDoctorId]);

  const activeTests = useMemo(() => {
    return DIAGNOSTIC_TESTS.filter(t => selectedTestIds.includes(t.id));
  }, [selectedTestIds]);

  // Calculate total fee of the basket
  const totalPricing = useMemo(() => {
    let sum = 0;
    if (bookingType === 'doctor' || bookingType === 'both') {
      if (activeDoctor) sum += activeDoctor.fee;
    }
    if (bookingType === 'diagnostic' || bookingType === 'both' || bookingType === 'home_collection') {
      activeTests.forEach(t => sum += t.price);
    }
    return sum;
  }, [bookingType, activeDoctor, activeTests]);

  // Generate Slots matching raw operational hours:
  // Weekdays: 8:00 AM – 8:00 PM (Last slot 7:30 PM)
  // Sundays: 8:00 AM – 5:00 PM (Last slot 4:30 PM)
  const availableSlots = useMemo(() => {
    const slots: string[] = [];
    const dateObj = new Date(selectedDate);
    const isSunday = dateObj.getDay() === 0;

    // Morning block
    slots.push("08:30 AM", "09:30 AM", "10:30 AM", "11:30 AM");
    
    // Afternoon block
    slots.push("12:30 PM", "01:30 PM", "02:30 PM", "03:30 PM");

    // Evening block
    if (!isSunday) {
      slots.push("04:30 PM", "05:30 PM", "06:30 PM", "07:30 PM");
    } else {
      slots.push("04:30 PM");
    }

    return slots;
  }, [selectedDate]);

  // Handle Form Validations
  const validateStep2 = () => {
    const errors: { [key: string]: string } = {};
    if (!selectedSlot) errors.slot = "Please select an appointment time slot.";
    if (!patientName.trim()) errors.name = "Patient full name is required.";
    if (!patientPhone.trim() || !/^\d{10}$/.test(patientPhone.trim())) {
      errors.phone = "Provide a valid 10-digit mobile number.";
    }
    if (!patientAge.trim() || isNaN(Number(patientAge)) || Number(patientAge) <= 0) {
      errors.age = "Provide a valid patient age.";
    }
    if (bookingType === 'doctor' || bookingType === 'both') {
      if (!selectedDoctorId) errors.doctor = "Please select a specialist doctor.";
    }
    if (bookingType === 'diagnostic' || bookingType === 'both' || bookingType === 'home_collection') {
      if (selectedTestIds.length === 0) errors.tests = "Please select at least one diagnostic test/scan.";
    }
    if (bookingType === 'home_collection') {
      if (!homeAddress.trim() || homeAddress.length < 8) {
        errors.address = "Please enter a valid complete address in Konnagar (min 8 characters).";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (bookingStep === 1) {
      // Validate that something is chosen
      const errors: { [key: string]: string } = {};
      if (bookingType === 'doctor' && !selectedDoctorId) {
        errors.basket = "Please select a specialist doctor first.";
      } else if ((bookingType === 'diagnostic' || bookingType === 'home_collection') && selectedTestIds.length === 0) {
        errors.basket = "Please add at least one diagnostic test/scan first.";
      } else if (bookingType === 'both' && !selectedDoctorId && selectedTestIds.length === 0) {
        errors.basket = "Please add a doctor and/or diagnostic test first.";
      }
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
      setBookingStep(2);
    } else if (bookingStep === 2) {
      if (validateStep2()) {
        const slipId = "HP-2026-" + Math.floor(1000 + Math.random() * 9000);
        setActiveSlipId(slipId);

        // Save appointment to local storage
        const newApp: SavedAppointment = {
          id: slipId,
          bookingType: bookingType,
          selectedDoctorId: selectedDoctorId,
          selectedTestIds: [...selectedTestIds],
          selectedDate: selectedDate,
          selectedSlot: selectedSlot,
          patientName: patientName,
          patientPhone: patientPhone,
          patientAge: patientAge,
          patientGender: patientGender,
          totalPricing: totalPricing,
          createdAt: new Date().toISOString(),
          status: 'Confirmed',
          homeAddress: bookingType === 'home_collection' ? homeAddress : undefined
        };

        try {
          const existing = localStorage.getItem('healthpoint_appointments');
          const list = existing ? JSON.parse(existing) : [];
          list.unshift(newApp);
          localStorage.setItem('healthpoint_appointments', JSON.stringify(list));
        } catch (e) {
          console.error("Error saving appointment to localStorage:", e);
        }

        setBookingStep(3);
      }
    }
  };

  const resetBookingForm = () => {
    onClearBookingCart();
    setBookingType('doctor');
    setSelectedSlot('');
    setPatientName('');
    setPatientPhone('');
    setPatientAge('');
    setPatientGender('Male');
    setHomeAddress('');
    setActiveSlipId('');
    setBookingStep(1);
    setFormErrors({});
  };

  // Helper to load current appointments from localStorage
  const loadedAppointments = useMemo(() => {
    try {
      const existing = localStorage.getItem('healthpoint_appointments');
      return existing ? JSON.parse(existing) : [];
    } catch (e) {
      return [];
    }
  }, [bookingTab, rescheduleTargetId, confirmCancelId]);

  // Filter portal appointments by search query
  const filteredPortalAppointments = useMemo(() => {
    const query = portalSearch.toLowerCase().trim();
    if (!query) return loadedAppointments;
    return loadedAppointments.filter((app: SavedAppointment) => 
      app.patientName.toLowerCase().includes(query) || 
      app.patientPhone.includes(query) || 
      app.id.toLowerCase().includes(query)
    );
  }, [loadedAppointments, portalSearch]);

  // Handle Cancel Appointment
  const handleCancelAppointment = (id: string) => {
    try {
      const existing = localStorage.getItem('healthpoint_appointments');
      if (existing) {
        const list: SavedAppointment[] = JSON.parse(existing);
        const updated = list.map(app => app.id === id ? { ...app, status: 'Cancelled' as const } : app);
        localStorage.setItem('healthpoint_appointments', JSON.stringify(updated));
      }
      setConfirmCancelId(null);
    } catch (e) {
      console.error(e);
    }
  };

  // Handle Reschedule Appointment
  const handleRescheduleSubmit = (id: string) => {
    if (!rescheduleDate || !rescheduleSlot) return;
    try {
      const existing = localStorage.getItem('healthpoint_appointments');
      if (existing) {
        const list: SavedAppointment[] = JSON.parse(existing);
        const updated = list.map(app => app.id === id ? { 
          ...app, 
          selectedDate: rescheduleDate, 
          selectedSlot: rescheduleSlot, 
          status: 'Rescheduled' as const 
        } : app);
        localStorage.setItem('healthpoint_appointments', JSON.stringify(updated));
      }
      setRescheduleTargetId(null);
      setRescheduleDate('');
      setRescheduleSlot('');
    } catch (e) {
      console.error(e);
    }
  };

  // Handle load slip for re-printing
  const handleViewReceiptSlip = (app: SavedAppointment) => {
    setSelectedDoctorId(app.selectedDoctorId);
    setSelectedTestIds(app.selectedTestIds);
    setBookingType(app.bookingType);
    setSelectedDate(app.selectedDate);
    setSelectedSlot(app.selectedSlot);
    setPatientName(app.patientName);
    setPatientPhone(app.patientPhone);
    setPatientAge(app.patientAge);
    setPatientGender(app.patientGender);
    if (app.homeAddress) {
      setHomeAddress(app.homeAddress);
    } else {
      setHomeAddress('');
    }
    setActiveSlipId(app.id);
    
    // Switch view to booking step 3
    setBookingTab('book');
    setBookingStep(3);
  };

  return (
    <section
      id="booking-engine"
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
          <span>SECTION_04 // SMART_BOOKING_ENGINE</span>
          {isActive && <span className="bg-white text-teal-600 px-1 rounded text-[8px] ml-1">INSPECTING</span>}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-teal-600 uppercase block">DIRECT DIGITAL SCHEDULING</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Integrated Appointment Engine
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            Book an in-house OPD consultation or reserve a high-accuracy diagnostic lab test. Zero registration fee. Pay direct at the clinic desk during your slot.
          </p>
        </div>

        {/* Segmented Tab Controller */}
        <div className="flex items-center justify-center max-w-md mx-auto mb-10 p-1 bg-clinic-cream border border-slate-200/80 rounded-lg">
          <button
            type="button"
            onClick={() => setBookingTab('book')}
            className={`flex-1 py-2.5 rounded font-mono text-[11px] font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              bookingTab === 'book'
                ? 'bg-clinic-navy text-white shadow-sm'
                : 'text-clinic-slate-gray hover:text-clinic-navy'
            }`}
          >
            <Calendar size={13} className={bookingTab === 'book' ? 'text-clinic-teal' : 'text-clinic-gold'} />
            <span>BOOK APPOINTMENT</span>
          </button>
          <button
            type="button"
            onClick={() => setBookingTab('portal')}
            className={`flex-1 py-2.5 rounded font-mono text-[11px] font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              bookingTab === 'portal'
                ? 'bg-clinic-navy text-white shadow-sm'
                : 'text-clinic-slate-gray hover:text-clinic-navy'
            }`}
          >
            <Ticket size={13} className={bookingTab === 'portal' ? 'text-clinic-teal' : 'text-clinic-gold'} />
            <span>MY APPOINTMENTS PORTAL</span>
          </button>
        </div>

        {bookingTab === 'portal' ? (
          <PortalView 
            portalSearch={portalSearch}
            setPortalSearch={setPortalSearch}
            confirmCancelId={confirmCancelId}
            setConfirmCancelId={setConfirmCancelId}
            rescheduleTargetId={rescheduleTargetId}
            setRescheduleTargetId={setRescheduleTargetId}
            rescheduleDate={rescheduleDate}
            setRescheduleDate={setRescheduleDate}
            rescheduleSlot={rescheduleSlot}
            setRescheduleSlot={setRescheduleSlot}
            loadedAppointments={loadedAppointments}
            filteredPortalAppointments={filteredPortalAppointments}
            handleCancelAppointment={handleCancelAppointment}
            handleRescheduleSubmit={handleRescheduleSubmit}
            handleViewReceiptSlip={handleViewReceiptSlip}
            availableSlots={availableSlots}
          />
        ) : (
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Form Panel: steps wizard (Spans 8 cols on desktop) */}
          <div className="lg:col-span-7 p-6 md:p-8 bg-white border-b lg:border-b-0 lg:border-r border-slate-200/80">
            
            {/* Step indicators */}
            <div className="flex items-center gap-2 mb-8 border-b border-slate-100 pb-4">
              {[
                { step: 1, label: "Define Basket" },
                { step: 2, label: "Slot & Info" },
                { step: 3, label: "Receipt Issued" },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-2 flex-1 last:flex-initial">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-xs font-semibold ${
                    bookingStep >= s.step
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {s.step}
                  </div>
                  <span className={`text-xs font-mono font-medium hidden sm:inline ${
                    bookingStep >= s.step ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {s.label}
                  </span>
                  {s.step < 3 && <div className={`h-[1px] flex-1 mx-2 ${bookingStep > s.step ? 'bg-teal-500' : 'bg-slate-100'}`} />}
                </div>
              ))}
            </div>

            {/* Error alerts */}
            {formErrors.basket && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700 font-mono mb-4 flex items-center gap-2">
                <Trash2 size={13} />
                <span>{formErrors.basket}</span>
              </div>
            )}

            {/* STEP 1: CONFIGURE APPOINTMENT BASKET */}
            {bookingStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-2">Select Booking Domain:</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'doctor', title: "OPD Doctor", desc: "Specialist consultation" },
                      { id: 'diagnostic', title: "Lab Diagnostics", desc: "Clinic Scans & Pathology" },
                      { id: 'home_collection', title: "Home Collection", desc: "Sterile lab sample draw" },
                      { id: 'both', title: "Unified Slot", desc: "Consult & Scan combined" },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          setBookingType(type.id as any);
                          setFormErrors({});
                        }}
                        className={`p-3 rounded text-left border cursor-pointer transition-all flex flex-col justify-between ${
                          bookingType === type.id
                            ? 'border-clinic-navy bg-clinic-navy text-white shadow-sm'
                            : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="text-xs font-sans font-bold">
                          {type.title}
                        </div>
                        <div className={`text-[9px] mt-1 font-sans font-light leading-tight ${bookingType === type.id ? 'text-slate-200' : 'text-slate-400'}`}>
                          {type.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* DOCTOR SELECTOR PATH */}
                {(bookingType === 'doctor' || bookingType === 'both') && (
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Choose Specialist Practitioner:</label>
                    <select
                      value={selectedDoctorId || ''}
                      onChange={(e) => setSelectedDoctorId(e.target.value || null)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded text-sm text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white"
                    >
                      <option value="">-- Select Specialist --</option>
                      {DOCTORS.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({d.specialty} - Fee: ₹{d.fee})</option>
                      ))}
                    </select>
                    {activeDoctor && (
                      <div className="p-3 bg-teal-50/30 border border-teal-100 rounded text-xs text-slate-600 space-y-1">
                        <p><strong className="text-slate-800 font-medium">Timings:</strong> {activeDoctor.availability.join(' / ')}</p>
                        <p><strong className="text-slate-800 font-medium">Days:</strong> {activeDoctor.days.join(', ')}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* DIAGNOSTIC SELECTOR PATH */}
                {(bookingType === 'diagnostic' || bookingType === 'both' || bookingType === 'home_collection') && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Diagnostics in Basket ({activeTests.length}):</label>
                      <a href="#diagnostic-packages" className="text-xs font-mono text-teal-600 hover:underline">Browse Tests Catalog &gt;</a>
                    </div>
                    {activeTests.length > 0 ? (
                      <div className="border border-slate-200 rounded divide-y divide-slate-100 overflow-hidden max-h-48 overflow-y-auto">
                        {activeTests.map(t => (
                          <div key={t.id} className="p-3 bg-slate-50/50 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors">
                            <div>
                              <p className="font-display font-bold text-slate-800">{t.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono">CODE: {t.code} • Turnaround: {t.turnaroundTime}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-slate-800">₹{t.price}</span>
                              <button
                                type="button"
                                onClick={() => setSelectedTestIds(selectedTestIds.filter(id => id !== t.id))}
                                className="text-slate-400 hover:text-red-500 cursor-pointer"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 border border-dashed border-slate-200 rounded text-center space-y-2">
                        <p className="text-xs text-slate-400">Your diagnostics basket is currently empty.</p>
                        <a
                          href="#diagnostic-packages"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-teal-600 border border-teal-200 px-2 py-1 bg-white rounded hover:bg-teal-50"
                        >
                          <Plus size={10} />
                          <span>ADD TESTS OR SCANS</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-5 py-3 bg-slate-900 hover:bg-teal-600 text-white font-mono text-xs font-bold tracking-wider rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>CONTINUE TO SLOT SELECT</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: FILL APPOINTMENT SLOT & PATIENT DEMOGRAPHICS */}
            {bookingStep === 2 && (
              <div className="space-y-6">
                
                {/* Date & Slot selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Select Date */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Appointment Date:</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value);
                          setSelectedSlot(''); // reset slot when date changes
                        }}
                        min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // from tomorrow onwards
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Select Slot */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Available Time Slot:</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2.5 bg-slate-50 border rounded text-xs text-slate-800 focus:outline-none focus:border-teal-500 ${
                          formErrors.slot ? 'border-red-300' : 'border-slate-200'
                        }`}
                      >
                        <option value="">-- Choose Slot --</option>
                        {availableSlots.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    {formErrors.slot && <p className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.slot}</p>}
                  </div>

                </div>

                {/* Patient Demographics */}
                <div className="space-y-4 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">Patient Demographics</h4>
                  
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-sans text-slate-600 block">Patient Full Name:</label>
                    <input
                      type="text"
                      placeholder="e.g. Priyanjali Roy"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className={`w-full px-3 py-2 bg-slate-50 border rounded text-xs focus:outline-none ${
                        formErrors.name ? 'border-red-300' : 'border-slate-200'
                      }`}
                    />
                    {formErrors.name && <p className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.name}</p>}
                  </div>

                  {/* Phone, Age, Gender Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    {/* Mobile Phone */}
                    <div className="space-y-1">
                      <label className="text-xs font-sans text-slate-600 block">10-Digit Mobile Phone:</label>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="e.g. 9830098300"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value.replace(/\D/g, ''))}
                        className={`w-full px-3 py-2 bg-slate-50 border rounded text-xs focus:outline-none ${
                          formErrors.phone ? 'border-red-300' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.phone && <p className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.phone}</p>}
                    </div>

                    {/* Patient Age */}
                    <div className="space-y-1">
                      <label className="text-xs font-sans text-slate-600 block">Patient Age (Years):</label>
                      <input
                        type="number"
                        placeholder="e.g. 34"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                        className={`w-full px-3 py-2 bg-slate-50 border rounded text-xs focus:outline-none ${
                          formErrors.age ? 'border-red-300' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.age && <p className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.age}</p>}
                    </div>

                    {/* Patient Gender */}
                    <div className="space-y-1">
                      <label className="text-xs font-sans text-slate-600 block">Patient Gender:</label>
                      <div className="flex items-center h-9 gap-3">
                        {['Male', 'Female', 'Other'].map(g => (
                          <label key={g} className="flex items-center gap-1 text-xs text-slate-700 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={patientGender === g}
                              onChange={() => setPatientGender(g)}
                              className="accent-teal-600"
                            />
                            <span>{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Home collection address (if selected) */}
                  {bookingType === 'home_collection' && (
                    <div className="space-y-1.5 pt-3">
                      <label className="text-xs font-sans text-slate-600 block flex items-center gap-1">
                        <MapPin size={13} className="text-clinic-gold" />
                        <span>Home Sample Collection Address (Konnagar limits):</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Enter complete house number, street, landmark near Konnagar..."
                        value={homeAddress}
                        onChange={(e) => setHomeAddress(e.target.value)}
                        className={`w-full px-3 py-2 bg-slate-50 border rounded text-xs focus:outline-none focus:bg-white resize-none ${
                          formErrors.address ? 'border-red-300' : 'border-slate-200'
                        }`}
                      />
                      {formErrors.address ? (
                        <p className="text-[10px] text-red-500 font-mono mt-0.5">{formErrors.address}</p>
                      ) : (
                        <p className="text-[10px] text-slate-400 font-sans font-light">Free doorstep extraction. Phlebotomists follow rigorous sterile protocol.</p>
                      )}
                    </div>
                  )}

                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 font-mono text-xs font-bold rounded transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={12} />
                    <span>MODIFY BASKET</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white font-mono text-xs font-bold tracking-wider rounded border border-teal-500 shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>CONFIRM APPOINTMENT SLOT</span>
                    <Heart size={12} />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: BOOKING SUCCESS RECEIPT PRINT PAGE */}
            {bookingStep === 3 && (
              <div className="space-y-6">
                
                {/* Visual Success Accent Banner */}
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded flex items-start gap-3">
                  <CheckCircle className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold text-emerald-800 uppercase">Appointment Successfully Scheduled!</h4>
                    <p className="text-xs text-emerald-700 font-sans font-light leading-relaxed">
                      Your booking credentials have been securely stored. No advance payment needed online. Present this clinical slip at the Health Point Clinic desk.
                    </p>
                  </div>
                </div>

                {/* Printable Digital Receipt Card Frame */}
                <div id="booking-slip" className="border border-slate-200 bg-slate-50 rounded-lg p-6 space-y-6 relative overflow-hidden">
                  
                  {/* Decorative stamp backdrop */}
                  <div className="absolute right-4 top-4 border-4 border-emerald-500/10 text-emerald-500/15 uppercase font-mono font-extrabold text-2xl px-3 py-1 rounded rotate-12 select-none">
                    CONFIRMED
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h5 className="font-display font-extrabold text-slate-900 text-sm">{CLINIC_INFO.name.toUpperCase()}</h5>
                      <p className="text-[9px] font-mono text-slate-400">GT Road, Konnagar • West Bengal</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-mono text-slate-400 block">SLIP ID</span>
                      <span className="text-xs font-mono font-bold text-slate-800">{activeSlipId || "HP-2026-TBD"}</span>
                    </div>
                  </div>

                  {/* Patient Info Table */}
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs font-sans">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Patient Name</span>
                      <span className="font-medium text-slate-900">{patientName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Mobile Number</span>
                      <span className="font-mono font-medium text-slate-900">+91 {patientPhone}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Age / Gender</span>
                      <span className="font-medium text-slate-900">{patientAge} Yrs / {patientGender}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Scheduled Slot</span>
                      <span className="font-mono font-semibold text-teal-600">{selectedDate} @ {selectedSlot}</span>
                    </div>
                  </div>

                  {/* Booking Items Breakdown */}
                  <div className="border-t border-b border-slate-200 py-3 space-y-2">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Service Particulars</span>
                    
                    {/* Doctor item */}
                    {(bookingType === 'doctor' || bookingType === 'both') && activeDoctor && (
                      <div className="flex justify-between items-center text-xs">
                        <div>
                          <p className="font-medium text-slate-800">{activeDoctor.name}</p>
                          <p className="text-[10px] text-slate-500">OPD Consultation ({activeDoctor.specialty})</p>
                        </div>
                        <span className="font-mono text-slate-800">₹{activeDoctor.fee.toFixed(2)}</span>
                      </div>
                    )}

                    {/* Diagnostics items */}
                    {(bookingType === 'diagnostic' || bookingType === 'both') && activeTests.map(t => (
                      <div key={t.id} className="flex justify-between items-center text-xs">
                        <div>
                          <p className="font-medium text-slate-800">{t.name}</p>
                          <p className="text-[10px] text-slate-500">Diagnostic scan ({t.code})</p>
                        </div>
                        <span className="font-mono text-slate-800">₹{t.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Total block */}
                  <div className="flex items-center justify-between font-mono text-sm pt-1">
                    <span className="font-bold text-slate-900">GRAND TOTAL:</span>
                    <span className="font-bold text-teal-600 text-base">₹{totalPricing.toFixed(2)}</span>
                  </div>

                  <div className="text-[9px] text-slate-400 leading-relaxed font-sans font-light">
                    * Please arrive 15 minutes prior to your selected slot for offline verification. For CT scan scans or fasting blood profiles, ensure you follow preparation protocols as specified on cards.
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Printer size={13} />
                    <span>PRINT TICKET SLIP</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetBookingForm}
                    className="flex-1 py-3 bg-slate-900 hover:bg-teal-600 text-white font-mono text-xs font-bold tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={13} />
                    <span>BOOK ANOTHER SLOT</span>
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Right Visual Summary Card (Spans 4 cols on desktop) */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-slate-900 text-white flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
                <Ticket className="text-teal-400" size={18} />
                <h3 className="font-display font-bold text-white text-base">Appointment Ticket</h3>
              </div>

              {/* Booking breakdown visual */}
              <div className="space-y-4">
                {selectedDoctorId || selectedTestIds.length > 0 ? (
                  <div className="space-y-4">
                    
                    {/* Doctor representation */}
                    {(bookingType === 'doctor' || bookingType === 'both') && activeDoctor && (
                      <div className="bg-slate-950 p-3 rounded border border-slate-800 text-xs flex justify-between items-start">
                        <div>
                          <div className="text-[9px] font-mono text-teal-400 uppercase tracking-widest">Selected Practitioner</div>
                          <p className="font-display font-semibold text-white mt-1">{activeDoctor.name}</p>
                          <p className="text-[10px] text-slate-400 font-sans mt-0.5">{activeDoctor.specialty} OPD</p>
                        </div>
                        <div className="text-right font-mono">
                          <span className="text-white font-medium">₹{activeDoctor.fee}</span>
                        </div>
                      </div>
                    )}

                    {/* Lab packages count */}
                    {(bookingType === 'diagnostic' || bookingType === 'both' || bookingType === 'home_collection') && activeTests.length > 0 && (
                      <div className="bg-slate-950 p-3 rounded border border-slate-800 text-xs space-y-2">
                        <div className="text-[9px] font-mono text-teal-400 uppercase tracking-widest">Added Diagnostic Tests ({activeTests.length})</div>
                        <div className="max-h-24 overflow-y-auto space-y-1 divide-y divide-slate-900">
                          {activeTests.map(t => (
                            <div key={t.id} className="flex justify-between text-[11px] pt-1">
                              <span className="text-slate-300 truncate pr-4">{t.name}</span>
                              <span className="font-mono text-slate-400">₹{t.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-500 font-light text-xs">
                    No doctor consultations or pathology scans loaded yet. Customize details on the left.
                  </div>
                )}
              </div>
            </div>

            {/* Total Block sticky on right panel footer */}
            <div className="border-t border-slate-800 pt-6 mt-6 space-y-4">
              <div className="flex justify-between items-end font-mono">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Total Payable Fee</span>
                  <span className="text-xs text-slate-400">Payable at clinic desk</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-teal-400">₹{totalPricing.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-800 rounded flex items-start gap-2 text-[10px] text-slate-400 font-sans leading-tight">
                <Shield size={14} className="text-teal-500 shrink-0 mt-0.5" />
                <span>NABL standard accreditation and strict sanitization. Your records remain fully encrypted and confidential.</span>
              </div>
            </div>

          </div>

        </div>
        )}

      </div>
    </section>
  );
}

interface PortalViewProps {
  portalSearch: string;
  setPortalSearch: (v: string) => void;
  confirmCancelId: string | null;
  setConfirmCancelId: (v: string | null) => void;
  rescheduleTargetId: string | null;
  setRescheduleTargetId: (v: string | null) => void;
  rescheduleDate: string;
  setRescheduleDate: (v: string) => void;
  rescheduleSlot: string;
  setRescheduleSlot: (v: string) => void;
  loadedAppointments: SavedAppointment[];
  filteredPortalAppointments: SavedAppointment[];
  handleCancelAppointment: (id: string) => void;
  handleRescheduleSubmit: (id: string) => void;
  handleViewReceiptSlip: (app: SavedAppointment) => void;
  availableSlots: string[];
}

function PortalView({
  portalSearch,
  setPortalSearch,
  confirmCancelId,
  setConfirmCancelId,
  rescheduleTargetId,
  setRescheduleTargetId,
  rescheduleDate,
  setRescheduleDate,
  rescheduleSlot,
  setRescheduleSlot,
  loadedAppointments,
  filteredPortalAppointments,
  handleCancelAppointment,
  handleRescheduleSubmit,
  handleViewReceiptSlip,
  availableSlots,
}: PortalViewProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-6 md:p-8 shadow-sm space-y-6">
      
      {/* Portal Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h3 className="font-display font-bold text-slate-900 text-lg">My Appointments & Home Collections</h3>
          <p className="text-slate-500 text-xs font-light font-sans mt-0.5">
            Retrieve, reschedule, or cancel your scheduled visits instantly from your browser's persistent cache.
          </p>
        </div>
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Search name, phone, slip ID..."
            value={portalSearch}
            onChange={(e) => setPortalSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 focus:outline-none focus:border-clinic-gold focus:ring-1 focus:ring-clinic-gold font-sans"
          />
        </div>
      </div>

      {filteredPortalAppointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPortalAppointments.map((app) => {
            const isRescheduling = rescheduleTargetId === app.id;
            const isConfirmingCancel = confirmCancelId === app.id;

            // Particulars display helper
            const docObj = DOCTORS.find(d => d.id === app.selectedDoctorId);
            const testsMatched = DIAGNOSTIC_TESTS.filter(t => app.selectedTestIds.includes(t.id));

            return (
              <div
                key={app.id}
                className={`border rounded-lg p-5 flex flex-col justify-between space-y-4 transition-all duration-300 relative overflow-hidden ${
                  app.status === 'Cancelled'
                    ? 'bg-slate-50/50 border-slate-200 opacity-70'
                    : 'bg-white border-slate-200/80 hover:border-clinic-gold/50 hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  
                  {/* Card top branding / badge */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Appointment ID</span>
                      <span className="font-mono font-bold text-slate-900 text-xs">{app.id}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {app.bookingType === 'home_collection' ? (
                        <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-[9px] font-mono font-bold rounded">
                          HOME DRAW
                        </span>
                      ) : app.bookingType === 'doctor' ? (
                        <span className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 text-[9px] font-mono font-bold rounded">
                          OPD CONSULT
                        </span>
                      ) : app.bookingType === 'diagnostic' ? (
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[9px] font-mono font-bold rounded">
                          LAB PATHOLOGY
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-amber-50 border border-amber-100 text-amber-700 text-[9px] font-mono font-bold rounded">
                          UNIFIED SLOT
                        </span>
                      )}

                      {/* Status badge */}
                      {app.status === 'Confirmed' ? (
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-mono font-bold rounded">
                          CONFIRMED
                        </span>
                      ) : app.status === 'Rescheduled' ? (
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-mono font-bold rounded">
                          RESCHEDULED
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-800 text-[9px] font-mono font-bold rounded">
                          CANCELLED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Scheduled timings block */}
                  <div className="p-3 bg-clinic-cream rounded border border-slate-100 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-clinic-gold font-bold">
                      <Calendar size={11} />
                      <span>SCHEDULED FOR:</span>
                    </div>
                    <p className="font-mono text-xs font-bold text-slate-800">
                      {app.selectedDate} @ {app.selectedSlot}
                    </p>
                  </div>

                  {/* Patient Info */}
                  <div className="text-xs space-y-1 border-t border-b border-slate-100 py-2.5">
                    <p className="text-slate-700">
                      <strong className="font-medium text-slate-900 font-sans">Patient:</strong> {app.patientName} ({app.patientAge} Yrs / {app.patientGender})
                    </p>
                    <p className="text-slate-500 font-mono text-[11px]">
                      <strong className="font-medium text-slate-800 font-sans">Phone:</strong> +91 {app.patientPhone}
                    </p>
                    {app.homeAddress && (
                      <p className="text-slate-500 flex items-start gap-1">
                        <MapPin size={11} className="text-clinic-gold shrink-0 mt-0.5" />
                        <span>Address: {app.homeAddress}</span>
                      </p>
                    )}
                  </div>

                  {/* Particulars list */}
                  <div className="text-xs space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Department Particulars:</span>
                    {docObj && (
                      <p className="text-slate-800 font-medium">
                        🩺 {docObj.name} <span className="text-slate-400 font-light font-mono text-[11px]">({docObj.specialty})</span>
                      </p>
                    )}
                    {testsMatched.length > 0 && (
                      <div className="space-y-1">
                        {testsMatched.map(t => (
                          <p key={t.id} className="text-slate-700 pl-4 border-l border-clinic-gold/30">
                            🔬 {t.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Card bottom price and action utility bar */}
                <div className="border-t border-slate-100 pt-4 mt-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase block">Grand total fee</span>
                      <span className="font-mono font-bold text-slate-900">₹{app.totalPricing.toFixed(2)}</span>
                    </div>
                    
                    {app.status !== 'Cancelled' && !isRescheduling && !isConfirmingCancel && (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setRescheduleTargetId(app.id);
                            setRescheduleDate(app.selectedDate);
                            setRescheduleSlot(app.selectedSlot);
                          }}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-clinic-cream border border-slate-200 text-clinic-gold rounded font-mono text-[10px] font-bold tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 size={10} />
                          <span>RESCHEDULE</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmCancelId(app.id)}
                          className="px-2.5 py-1.5 bg-slate-50 hover:bg-red-50 hover:text-red-700 text-slate-500 rounded font-mono text-[10px] font-bold tracking-wider border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <XCircle size={10} />
                          <span>CANCEL</span>
                        </button>
                      </div>
                    )}

                    {app.status === 'Cancelled' && (
                      <span className="text-[10px] font-mono text-red-500 font-bold">SLOT RELEASED</span>
                    )}
                  </div>

                  {/* Reschedule inline drawer */}
                  {isRescheduling && (
                    <div className="p-3 bg-clinic-cream rounded border border-clinic-gold/30 space-y-3 animate-fadeIn">
                      <span className="text-[9px] font-mono font-bold text-clinic-gold uppercase block">Select New Timings:</span>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          value={rescheduleDate}
                          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                          onChange={(e) => setRescheduleDate(e.target.value)}
                          className="p-2 bg-white border border-slate-200 rounded text-xs font-mono"
                        />
                        <select
                          value={rescheduleSlot}
                          onChange={(e) => setRescheduleSlot(e.target.value)}
                          className="p-2 bg-white border border-slate-200 rounded text-xs font-mono"
                        >
                          <option value="">-- Slot --</option>
                          {availableSlots.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleRescheduleSubmit(app.id)}
                          className="flex-1 py-1.5 bg-clinic-navy hover:bg-clinic-teal text-white font-mono text-[10px] font-bold rounded transition-colors cursor-pointer"
                        >
                          CONFIRM CHANGE
                        </button>
                        <button
                          type="button"
                          onClick={() => setRescheduleTargetId(null)}
                          className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 font-mono text-[10px] font-bold rounded hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          ABORT
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Confirm cancellation prompt */}
                  {isConfirmingCancel && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded space-y-2 animate-fadeIn">
                      <p className="text-[11px] text-red-700 font-sans">
                        Are you sure you want to cancel this visit slot? This releases your pathology reservation and consultant timing.
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleCancelAppointment(app.id)}
                          className="flex-1 py-1.5 bg-red-600 hover:bg-red-700 text-white font-mono text-[10px] font-bold rounded transition-colors cursor-pointer"
                        >
                          CONFIRM CANCELLATION
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmCancelId(null)}
                          className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 font-mono text-[10px] font-bold rounded hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          ABORT
                        </button>
                      </div>
                    </div>
                  )}

                  {/* View ticket slip for print */}
                  {app.status !== 'Cancelled' && !isRescheduling && !isConfirmingCancel && (
                    <button
                      type="button"
                      onClick={() => handleViewReceiptSlip(app)}
                      className="w-full py-2 bg-slate-900 hover:bg-clinic-teal text-white font-mono text-xs font-bold rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Printer size={12} />
                      <span>LOAD & PRINT DIGITAL SLIP</span>
                    </button>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-dashed border-slate-200 rounded-lg p-12 text-center flex flex-col items-center justify-center space-y-4">
          <Ticket size={44} className="text-slate-300" />
          <div className="space-y-1 max-w-sm">
            <h4 className="font-display font-bold text-slate-900 text-base">
              No Appointments Found
            </h4>
            <p className="text-slate-500 text-xs font-light">
              We couldn't locate any saved clinical appointments in this browser's cache. Book a specialist slot or diagnostic package above to populate your tracking history.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              // Simulating toggle tab
              window.location.hash = "booking-engine";
            }}
            className="px-4 py-2 bg-clinic-navy hover:bg-clinic-teal text-white font-mono text-xs font-bold rounded transition-colors shadow-sm cursor-pointer"
          >
            BOOK AN APPOINTMENT NOW
          </button>
        </div>
      )}

    </div>
  );
}
