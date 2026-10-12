/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlueprintData } from '../types';

export const BLUEPRINT_SECTIONS: BlueprintData[] = [
  {
    id: "hero_usp",
    sectionTitle: "Aesthetic & Modern Hero Section",
    uiArchitecture: {
      wireframe: "Dual-column asymmetrical grid with left-heavy typographical weight. Key USP badge floats in high-contrast overlay over deep neutral slate canvas. Empty padding margins serve as a breath-control visual anchor.",
      layout: "Flex-col lg:flex-row with strict 50/50 desktop split to isolate clinical brand mission on the left, and high-impact CT Scan USP card on the right.",
      grid: "12-column desktop grid with col-span-7 (Typographical Pitch) and col-span-5 (USP Spotlight Card).",
      tokens: [
        { label: "Background", value: "Slate-900 (Deep Clinical Navy #0F172A)" },
        { label: "Primary Typography", value: "Space Grotesk (700 Bold, tracking-tight)" },
        { label: "Accent Highlight", value: "Teal-600 (Clinical Mint #0D9488)" },
        { label: "Empty Space", value: "py-16 md:py-24 (Generous padding for premium respiration)" }
      ]
    },
    uxIntent: {
      problemSolved: "Immediately addresses diagnostic skepticism by presenting NABL accreditation and the region's only 32-slice CT Scan under 2 seconds of visual scan time.",
      psychologicalTrigger: "Authority and Proximity. Showcasing the ₹1,600 price point removes financial anxiety immediately, while 'Only place in Konnagar' triggers instant local trust.",
      conversionTactics: [
        "Contrast-ratio > 7:1 for the primary CTA button.",
        "Highlighting exact pricing (₹1,600.00) in bold tabular font (JetBrains Mono) to signal honesty.",
        "Using social proof ('NABL Accredited') in small, ultra-clean monospace tags."
      ]
    },
    devSpecs: {
      performance: [
        "CSS content-visibility: auto for smooth off-screen load.",
        "Zero-dependency inline vector assets for critical path rendering speed."
      ],
      accessibility: [
        "Role='banner' container.",
        "H1 tag reserved exclusively for the core clinic value proposition.",
        "High-contrast focus ring 'focus-visible:ring-2 focus-visible:ring-teal-500' on the CTA."
      ],
      semanticHtml: "<header class='bg-slate-900'> with nested <div role='region' aria-label='USP Highlight'>."
    }
  },
  {
    id: "specialist_hub",
    sectionTitle: "Search Doctor & Specialist Hub",
    uiArchitecture: {
      wireframe: "Centered multi-functional search deck with micro-pill navigation below. Multi-column specialist grids that respond fluidly to live search queries.",
      layout: "Sticky/integrated anchor bar layout. Filter pills stack on mobile, expand into horizontal rows on desktop.",
      grid: "Card grid auto-fit (minmax(300px, 1fr)) with 6px rounded edges to preserve the strict clinical editorial vibe.",
      tokens: [
        { label: "Layout Spacing", value: "gap-6 (balanced gutters)" },
        { label: "Text Sizing", value: "Display: Space Grotesk 1.875rem, Body: Inter 1rem" },
        { label: "Interactions", value: "hover:translate-y-[-2px] hover:border-teal-500 transition-all 200ms" },
        { label: "Color", value: "Border: Slate-200, Text: Slate-800" }
      ]
    },
    uxIntent: {
      problemSolved: "Reduces overwhelming clinical options by providing immediate search filters for medical conditions (e.g. 'heart', 'baby') and specialist names.",
      psychologicalTrigger: "Simplicity & Care. Clean, spacious doctor cards with visible credentials and experience details reduce the friction of selecting a medical provider.",
      conversionTactics: [
        "Pre-populated common search tags (Cardiology, Gynecology, Pediatrics) to speed up user intent.",
        "Real-time visual counts matching the active filters to provide positive interface feedback."
      ]
    },
    devSpecs: {
      performance: [
        "Debounced input handler for state-driven list filter to prevent input lag.",
        "Strict memoization of DoctorCards to ensure instant re-renders."
      ],
      accessibility: [
        "Search input mapped to <label> with explicit 'htmlFor' attributes.",
        "Aria-live='polite' region summarizing active search filter results count."
      ],
      semanticHtml: "<section aria-labelledby='doctor-hub-title'> with search input wrapped in <form onSubmit={e => e.preventDefault()}>."
    }
  },
  {
    id: "consultation_fees",
    sectionTitle: "Transparent Consultation Fees",
    uiArchitecture: {
      wireframe: "High-contrast editorial table. Columns align exactly to grid guides, with tabular numbers displaying clinical fees in fixed width layout.",
      layout: "Horizontal block with alternating background rows for high legibility.",
      grid: "Tabular structure with 4 columns: Specialty, Doctor, Experience, and Consultation Fee.",
      tokens: [
        { label: "Font Family", value: "JetBrains Mono for pricing columns" },
        { label: "Border Style", value: "border-b border-slate-100" },
        { label: "Background Accent", value: "Even rows: bg-slate-50/50, Odd rows: bg-white" }
      ]
    },
    uxIntent: {
      problemSolved: "Eliminates 'hidden billing' anxiety which represents the #1 friction point in private Indian clinical consultations.",
      psychologicalTrigger: "Fairness and Honesty. Fixed pricing schedules generate a level playing field and establish the clinic's patient-first ethos.",
      conversionTactics: [
        "A bold 'No Hidden Charges' trust badge.",
        "An integrated 'Book This Doctor' link on each row that auto-scrolls and populates the booking wizard."
      ]
    },
    devSpecs: {
      performance: [
        "Pure CSS layout structure with no heavy JS data tables."
      ],
      accessibility: [
        "Standard semantic <table> markup with <thead>, <tbody>, <th>, and <td> elements.",
        "Explicit scope='col' on header cells for screen-reader structural alignment."
      ],
      semanticHtml: "<table class='w-full text-left border-collapse'>"
    }
  },
  {
    id: "booking_engine",
    sectionTitle: "Smart Integrated Booking Engine",
    uiArchitecture: {
      wireframe: "Step-by-step progress tracker framing a clean, centered diagnostic/clinical booking wizard. Active paths dynamically adapt fields depending on 'Doctor Appointment' vs 'Diagnostic Test/Scan'.",
      layout: "Bento-style 2-column scheduler: Left side handles input slots, right side hosts a live, reactive billing and appointment receipt preview.",
      grid: "Two-column grid (col-span-8 and col-span-4) in desktop view. Transitions to single column on mobile view.",
      tokens: [
        { label: "Primary UI Accent", value: "Teal-600 background for selected states" },
        { label: "Focus States", value: "ring-2 ring-teal-600 ring-offset-2" },
        { label: "Success Screen", value: "bg-emerald-50/60 with Emerald-800 text" }
      ]
    },
    uxIntent: {
      problemSolved: "Combines diagnostic booking and doctor booking into a single friction-free checkout, bypassing disjointed telephone calls or separate portals.",
      psychologicalTrigger: "Sunk Cost & Closure. The step-by-step indicator encourages completion, while the real-time billing preview ensures 100% pricing transparency.",
      conversionTactics: [
        "One-click slots matching the real operational hours (Monday-Sunday schedules).",
        "Required inputs reduced strictly to absolute essentials: Name, Phone, and Age.",
        "Sticky 'Order Summary' ticket card showing total payable fee at the clinic counter."
      ]
    },
    devSpecs: {
      performance: [
        "Pre-validated phone field inputs.",
        "Local state preservation so refresh doesn't wipe patient data midway."
      ],
      accessibility: [
        "Uses role='progressbar' to communicate current step completion to assistive technologies.",
        "All buttons have descriptive aria-labels (e.g. 'Select Monday 10:00 AM slot').",
        "Auto-focus management: shifts focus to the new form fields when stepping forward."
      ],
      semanticHtml: "<div role='form' aria-label='Patient Appointment Scheduler'>"
    }
  },
  {
    id: "diagnostic_packages",
    sectionTitle: "Categorized Diagnostic & Lab Packages",
    uiArchitecture: {
      wireframe: "Category-driven horizontal tabs controlling segmented masonry listings. Each card features prominent diagnostic codes and fasting indicators.",
      layout: "Grid of clinical packages with a fixed-width sticky categories bar on top or left.",
      grid: "3-column grid (12 columns: spans 4, 4, 4) on desktop, scaling down to 2 columns and 1 column.",
      tokens: [
        { label: "Fasting Indicator", value: "Amber-600 (Warning badge) for strict fasting" },
        { label: "Diagnostic Codes", value: "JetBrains Mono tag with Slate-500 styling" },
        { label: "Card Border", value: "Slate-100 (soft high-contrast borders)" }
      ]
    },
    uxIntent: {
      problemSolved: "Simplifies searching for clinical tests by clustering them into clinically intuitive folders rather than an alphabetical dump.",
      psychologicalTrigger: "Safety & Certainty. Highlighting details like turnaround time and specific prep rules (e.g., fasting) reduces patient procedural anxiety.",
      conversionTactics: [
        "Direct 'Add to Slot' checkbox inside each package card to immediately load it into the active booking ticket.",
        "Highlighted 'Turnaround Time' badges showing speed of delivery (e.g., 'Same Day')."
      ]
    },
    devSpecs: {
      performance: [
        "Filtering is fully client-side using memorized category arrays.",
        "CSS flex layouts on diagnostic tags to prevent layout thrashing on resize."
      ],
      accessibility: [
        "Role='tablist' and role='tab' applied to categories to allow keyboard cursor navigation.",
        "Aria-selected state bound to the active category visual state."
      ],
      semanticHtml: "<nav role='tablist'> for categories, with <article class='diagnostic-card'> wrapping individual tests."
    }
  },
  {
    id: "google_reviews",
    sectionTitle: "Live Google Review Section",
    uiArchitecture: {
      wireframe: "Masonry style wall with high-contrast review headers. Incorporates the official Google badge to validate local authenticity.",
      layout: "Responsive grid of user testimony with varied text heights to preserve an organic layout rhythm.",
      grid: "Grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gaps-6.",
      tokens: [
        { label: "Rating Stars", value: "Amber-500 solid vector vectors" },
        { label: "Avatar Style", value: "Rounded-full with modern clinical monogram colors" },
        { label: "Badge Logo", value: "Original Google 'G' brand colors" }
      ]
    },
    uxIntent: {
      problemSolved: "Removes healthcare quality anxiety by providing raw, unfiltered local peer social proof.",
      psychologicalTrigger: "Social Consensus. Seeing neighbors (like 'Debasish Chakraborty' from Konnagar) write reviews about the CT scan and clinic hygiene creates powerful local validation.",
      conversionTactics: [
        "Explicitly highlighting 'NABL certification reports accepted by major doctors' as verified review themes.",
        "Including local guides' badges to assure readers reviews aren't simulated."
      ]
    },
    devSpecs: {
      performance: [
        "Static reviews layout prevents layout shifts (CLS) on page loads."
      ],
      accessibility: [
        "Explicit alt text on Google 'G' badge: 'Google Verified Reviews'.",
        "Aria-label for star ratings: 'Rated 5 out of 5 stars by customer'."
      ],
      semanticHtml: "<section aria-label='Patient Testimonials'> with <blockquote class='review-card'>"
    }
  },
  {
    id: "footer_matrix",
    sectionTitle: "Map Location & Footer Matrix",
    uiArchitecture: {
      wireframe: "Dual block layout: Left contains an elegant responsive embedded vector map or map layout, and right displays operating hour matrices with live open/closed badges.",
      layout: "Split 50/50 footer grid with a deep slate background for clean aesthetic grounding.",
      grid: "Grid split: Left col map, right col detailed metadata hierarchy.",
      tokens: [
        { label: "Background", value: "Slate-950 (Absolute charcoal dark)" },
        { label: "Active Status", value: "Green-500 (Pulse animation) for open slots" },
        { label: "Text Hierarchy", value: "Footer links in Slate-400, hover in Teal-400" }
      ]
    },
    uxIntent: {
      problemSolved: "Solves physical navigational anxiety by embedding a real map and clarifying the Batamore/HDFC bank landmark.",
      psychologicalTrigger: "Real-time Availability. A live dynamic indicator showing if the clinic is 'Open Now' or 'Closed Now' based on West Bengal timezone prevents patients from making useless physical trips.",
      conversionTactics: [
        "One-click 'Get Directions' linking straight to Google Maps.",
        "Highlighted emergency phone links for rapid tap-to-call during clinic hours."
      ]
    },
    devSpecs: {
      performance: [
        "Google Map iframe loaded lazily using loading='lazy' to prevent blocking the initial document load."
      ],
      accessibility: [
        "Iframe has explicit title='Health Point Clinic Google Map Location'.",
        "Telephone links prefixed with tel: for click-to-call mobile accessibility."
      ],
      semanticHtml: "<footer class='bg-slate-950 text-slate-100'> with nested <address> layout."
    }
  }
];
