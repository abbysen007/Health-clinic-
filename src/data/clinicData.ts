/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Doctor, DiagnosticTest, Review } from '../types';

export const CLINIC_INFO = {
  name: "Health Point Clinic",
  location: "Near batamore, 40, GT Rd, near hdfc bank, Konnagar, West Bengal 712235",
  landmark: "Near Batamore, Adjacent to HDFC Bank",
  phone: "+91 33 2674 8900",
  altPhone: "+91 98305 12345",
  email: "care@healthpointkonnagar.com",
  operatingHours: {
    weekdays: "Monday to Saturday: 8:00 AM – 8:00 PM",
    sunday: "Sunday: 8:00 AM – 5:00 PM",
  },
  usp: {
    title: "CT Scan 32-Slice with 3D Reconstruction",
    price: 1600.00,
    badge: "Only in Konnagar",
    description: "Equipped with state-of-the-art diagnostic visualization software. NABL Accredited Laboratory reports accepted by all major hospitals and physicians worldwide."
  }
};

export const DOCTORS: Doctor[] = [
  {
    id: "doc_1",
    name: "Dr. Arpan Sen",
    specialty: "Cardiology",
    degree: "MD, DM (Cardiology) - Senior Consultant",
    fee: 800,
    availability: ["04:00 PM - 07:00 PM", "10:00 AM - 01:00 PM"],
    days: ["Monday", "Wednesday", "Friday"],
    avatarColor: "bg-teal-950 text-teal-200 border-teal-800",
    experience: "14 Years"
  },
  {
    id: "doc_2",
    name: "Dr. Srijata Mukherjee",
    specialty: "Gynecology & Obstetrics",
    degree: "MS (OBG), DNB, Fellow in Reproductive Medicine",
    fee: 600,
    availability: ["11:00 AM - 02:00 PM", "05:00 PM - 07:30 PM"],
    days: ["Tuesday", "Thursday", "Saturday"],
    avatarColor: "bg-emerald-950 text-emerald-200 border-emerald-800",
    experience: "10 Years"
  },
  {
    id: "doc_3",
    name: "Dr. Anirban Roy",
    specialty: "Neurology",
    degree: "MD, DM (Neurology) - NIMHANS Alumni",
    fee: 1000,
    availability: ["05:30 PM - 08:00 PM"],
    days: ["Monday", "Thursday"],
    avatarColor: "bg-blue-950 text-blue-200 border-blue-800",
    experience: "16 Years"
  },
  {
    id: "doc_4",
    name: "Dr. Pritam Das",
    specialty: "Orthopedics & Joint Specialist",
    degree: "MS (Ortho), M.Ch (Orthopaedics) - Joint Replacement Surgeon",
    fee: 700,
    availability: ["03:00 PM - 05:00 PM", "06:00 PM - 08:00 PM"],
    days: ["Wednesday", "Saturday"],
    avatarColor: "bg-indigo-950 text-indigo-200 border-indigo-800",
    experience: "12 Years"
  },
  {
    id: "doc_5",
    name: "Dr. Tanmay Banerjee",
    specialty: "Pediatrics & Neonatology",
    degree: "MD (Pediatrics), DCH",
    fee: 500,
    availability: ["09:00 AM - 12:00 PM"],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    avatarColor: "bg-sky-950 text-sky-200 border-sky-800",
    experience: "8 Years"
  },
  {
    id: "doc_6",
    name: "Dr. Madhumita Bose",
    specialty: "General Medicine",
    degree: "MBBS, MD (General Medicine)",
    fee: 500,
    availability: ["08:30 AM - 11:30 AM", "04:30 PM - 07:30 PM"],
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    avatarColor: "bg-slate-900 text-slate-200 border-slate-700",
    experience: "18 Years"
  }
];

export const DIAGNOSTIC_TESTS: DiagnosticTest[] = [
  // Advanced Imaging
  {
    id: "diag_ct_3d",
    name: "CT Scan 32 Slice with 3D Reconstruction",
    category: "Advanced Imaging",
    price: 1600,
    description: "Unmatched clinical visualization of complex structures with high speed. Premium diagnostic standard.",
    code: "CT-3D-32S",
    requiresFasting: false,
    turnaroundTime: "Same Day (Within 6 hours)"
  },
  {
    id: "diag_mri",
    name: "Magnetic Resonance Imaging (MRI)",
    category: "Advanced Imaging",
    price: 4500,
    description: "High-resolution non-invasive scan of soft tissues, spine, joints, and brain.",
    code: "MRI-HIGHRES",
    requiresFasting: false,
    turnaroundTime: "24 Hours"
  },
  {
    id: "diag_usg",
    name: "Ultrasound (USG) Whole Abdomen",
    category: "Advanced Imaging",
    price: 1200,
    description: "High-frequency sound waves to visualize abdominal organs. Pre-booking mandatory.",
    code: "USG-ABD",
    requiresFasting: true,
    turnaroundTime: "2 Hours"
  },
  {
    id: "diag_hsg",
    name: "HSG Testing (Hysterosalpingography)",
    category: "Advanced Imaging",
    price: 2200,
    description: "Specialized contrast radiography used to investigate female fertility and uterine health.",
    code: "HSG-RAD",
    requiresFasting: false,
    turnaroundTime: "Next Day"
  },

  // Neuro & Cardiac
  {
    id: "diag_echo",
    name: "Echocardiogram (Echo) with Color Doppler",
    category: "Neuro & Cardiac",
    price: 1800,
    description: "Advanced cardiac imaging showing live chamber valves and blood flows.",
    code: "ECHO-CD",
    requiresFasting: false,
    turnaroundTime: "1 Hour"
  },
  {
    id: "diag_ecg",
    name: "12-Lead Electrocardiogram (ECG)",
    category: "Neuro & Cardiac",
    price: 300,
    description: "Standard physical electrode rhythm scan mapped by cardiology desk.",
    code: "ECG-12L",
    requiresFasting: false,
    turnaroundTime: "15 Minutes"
  },
  {
    id: "diag_eeg",
    name: "Electroencephalogram (EEG) Brain Mapping",
    category: "Neuro & Cardiac",
    price: 1500,
    description: "Clinical electrical wave scan of the brain's cortical activities.",
    code: "EEG-BM",
    requiresFasting: false,
    turnaroundTime: "Next Day"
  },
  {
    id: "diag_emg",
    name: "Electromyography (EMG) Muscle Study",
    category: "Neuro & Cardiac",
    price: 2000,
    description: "Measures electrical activity of muscles at rest and during contraction.",
    code: "EMG-PHYS",
    requiresFasting: false,
    turnaroundTime: "Next Day"
  },
  {
    id: "diag_ncv",
    name: "Nerve Conduction Velocity (NCV) Study",
    category: "Neuro & Cardiac",
    price: 1800,
    description: "Specialized neurological diagnostics for neuropathy and motor response speeds.",
    code: "NCV-4LIMBS",
    requiresFasting: false,
    turnaroundTime: "Next Day"
  },
  {
    id: "diag_holter",
    name: "24-Hour Holter Cardiac Monitoring",
    category: "Neuro & Cardiac",
    price: 2500,
    description: "Continuous ambulatory ECG recorder mapping irregularities over a full day.",
    code: "HOLTER-24H",
    requiresFasting: false,
    turnaroundTime: "3 Days"
  },
  {
    id: "diag_tropt",
    name: "TROP-T (Troponin T) Cardiac Biomarker",
    category: "Neuro & Cardiac",
    price: 900,
    description: "Emergency blood analysis to rule out myocardial infarction/heart attack.",
    code: "B-TROPT",
    requiresFasting: false,
    turnaroundTime: "45 Minutes"
  },

  // Wellness Pathology
  {
    id: "diag_cbc",
    name: "Complete Blood Count (CBC) with ESR",
    category: "Wellness Pathology",
    price: 350,
    description: "A comprehensive blood profiling evaluating red/white cells and platelet densities.",
    code: "CBC-NABL",
    requiresFasting: false,
    turnaroundTime: "4 Hours"
  },
  {
    id: "diag_thyroid",
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "Wellness Pathology",
    price: 650,
    description: "Essential endocrinology evaluation mapping thyroid metabolic regulation.",
    code: "THY-COMP",
    requiresFasting: true,
    turnaroundTime: "6 Hours"
  },
  {
    id: "diag_lipid",
    name: "Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)",
    category: "Wellness Pathology",
    price: 700,
    description: "Comprehensive cardiovascular fat profiling. Strict fasting required.",
    code: "LIPID-F",
    requiresFasting: true,
    turnaroundTime: "6 Hours"
  },

  // Radiology & Imaging
  {
    id: "diag_xray",
    name: "Digital Chest X-ray (PA View)",
    category: "Radiology & Imaging",
    price: 400,
    description: "Immediate high-contrast digital chest radiography with low-dose filter grids.",
    code: "XRAY-CHEST",
    requiresFasting: false,
    turnaroundTime: "30 Minutes"
  },
  {
    id: "diag_pft",
    name: "Pulmonary Function Testing (PFT) / Spirometry",
    category: "Radiology & Imaging",
    price: 900,
    description: "Measures lung volume speeds, crucial for asthma and COPD patients.",
    code: "PFT-SPIRO",
    requiresFasting: false,
    turnaroundTime: "1 Hour"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev_1",
    author: "Debasish Chakraborty",
    rating: 5,
    text: "Health Point Clinic is a blessing for Konnagar residents. Earlier we had to travel to Serampore or Kolkata for a CT Scan. Getting a high quality 32-slice CT Scan for just Rs. 1600 here is unbelievable. Staff was professional and handed the 3D reports on the same day.",
    relativeTime: "1 week ago",
    initials: "DC",
    source: "Verified Patient"
  },
  {
    id: "rev_2",
    author: "Riya Banerjee",
    rating: 5,
    text: "Very neat and clean clinic, located right on GT Road near Batamore. Dr. Srijata Mukherjee is extremely patient and polite. The lab is NABL certified so doctors accept reports without question. Proximity to HDFC bank makes parking and finding it very easy.",
    relativeTime: "2 weeks ago",
    initials: "RB",
    source: "Google Local Guides"
  },
  {
    id: "rev_3",
    author: "Prasun Chatterjee",
    rating: 5,
    text: "Extremely fast service for ECG and blood tests. Had my thyroid and lipid tests done; reports were WhatsApped directly to my phone. They follow very good hygiene and sterilization standards which is reassuring.",
    relativeTime: "1 month ago",
    initials: "PC",
    source: "Verified Patient"
  },
  {
    id: "rev_4",
    author: "Soma Ghosal",
    rating: 4,
    text: "Excellent set of in-house doctors. I visit Dr. Tanmay Banerjee for my child's checkups. Booking is straightforward, though on Saturdays it can get slightly crowded. Strongly recommend this diagnostic center.",
    relativeTime: "2 months ago",
    initials: "SG",
    source: "Google Local Guides"
  }
];
