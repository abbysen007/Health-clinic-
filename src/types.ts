/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degree: string;
  fee: number;
  availability: string[];
  days: string[]; // e.g., ["Monday", "Wednesday", "Friday"]
  avatarColor: string;
  experience: string;
}

export interface DiagnosticTest {
  id: string;
  name: string;
  category: 'Advanced Imaging' | 'Neuro & Cardiac' | 'Wellness Pathology' | 'Radiology & Imaging';
  price: number;
  description: string;
  code: string;
  requiresFasting: boolean;
  turnaroundTime: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  initials: string;
  source: 'Google Local Guides' | 'Verified Patient';
}

export interface BlueprintData {
  id: string;
  sectionTitle: string;
  uiArchitecture: {
    wireframe: string;
    layout: string;
    grid: string;
    tokens: { label: string; value: string }[];
  };
  uxIntent: {
    problemSolved: string;
    psychologicalTrigger: string;
    conversionTactics: string[];
  };
  devSpecs: {
    performance: string[];
    accessibility: string[];
    semanticHtml: string;
  };
}

export interface BookingState {
  type: 'doctor' | 'diagnostic' | null;
  selectedDoctorId: string | null;
  selectedTestIds: string[];
  date: string;
  slot: string;
  patientName: string;
  patientPhone: string;
  patientAge: string;
  patientGender: string;
  step: number; // 1: Type/Item Selection, 2: Slot/Details Selection, 3: Patient Info, 4: Summary/Success
}

export interface SavedAppointment {
  id: string;
  bookingType: 'doctor' | 'diagnostic' | 'both' | 'home_collection';
  selectedDoctorId: string | null;
  selectedTestIds: string[];
  selectedDate: string;
  selectedSlot: string;
  patientName: string;
  patientPhone: string;
  patientAge: string;
  patientGender: string;
  totalPricing: number;
  createdAt: string;
  status: 'Confirmed' | 'Rescheduled' | 'Cancelled';
  homeAddress?: string;
}
