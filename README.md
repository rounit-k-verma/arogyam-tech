# AROGYAM TECH — Innovating Medical Technology for a Safer Tomorrow

<div align="center">

**Precision Biomedical Instrumentation & Mobile Diagnostics**  
*Pre-incubated at the Indian Institute of Technology Patna (IIT Patna)*

[![React 19](https://img.shields.io/badge/React-19.0-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38b2ac.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 🔬 Overview

**AROGYAM TECHNOLOGIES** is a biomedical engineering enterprise dedicated to democratizing critical care diagnostics and smart infusion safety. Forged at the intersection of medical science and edge computing, our platforms deliver clinical-grade precision in high-dependency hospital wards, remote primary healthcare centers (PHCs), and field triage settings.

### Core Innovations

1. **Automated IV Drip Monitoring Platform**
   - Micron-level optical droplet sensing array ($\pm 1.5\%$ flow accuracy).
   - Real-time air-bubble occlusion detection and automated safety cut-off loops.
   - Long-range wireless telemetry integrated with centralized nursing stations and hospital EHRs.

2. **Cardiocare: Pocket-Sized Mobile ECG**
   - 42-gram ultra-portable ambulatory cardiac rhythm monitor.
   - High-fidelity 24-bit ADC sampling at 1000 Hz with low-noise bio-amplification.
   - Real-time smartphone synchronization, HIPAA-compliant encryption, and automated arrhythmia classification.

---

## 📁 Project Architecture & Directory Structure

```text
arogyam-tech/
├── assets/                       # Static branding and media assets
├── src/
│   ├── components/               # Modular UI Components
│   │   ├── common/               # Core shared layout components
│   │   │   ├── ArogyamLogo.tsx   # Scalable vector brand logo (full / icon / horizontal)
│   │   │   ├── Header.tsx        # Navigation header with active screen states & drawer
│   │   │   ├── Footer.tsx        # Institutional footer with compliance & legal links
│   │   │   └── TelemetryDock.tsx # Floating quick-access telemetry action bar
│   │   ├── modals/               # Interactive dialogs & simulators
│   │   │   ├── ContactModal.tsx  # Direct clinical trial & demo request gateway
│   │   │   ├── InteractiveSimulators.tsx # Live IV drip engine & 24-bit ECG waveform stream
│   │   │   └── PolicyModals.tsx  # IIT Patna grant, ISO 13485 safety, privacy & terms
│   │   ├── screens/              # Primary view screens
│   │   │   ├── HomeScreen.tsx    # Hero section, telemetry stats, vision & mission
│   │   │   ├── InnovationScreen.tsx # Detailed hardware specs & strategic roadmap
│   │   │   ├── TeamScreen.tsx    # Lab heritage, core leadership & dispatch form
│   │   │   └── ImpactScreen.tsx  # Clinical metrics & milestone progression timeline
│   │   └── index.ts              # Central component barrel exports
│   ├── data/
│   │   └── content.ts            # Content registry, specifications, team & milestones
│   ├── services/
│   │   ├── inquiryService.ts     # Clinical inquiry handler & email dispatch logic
│   │   └── index.ts              # Service barrel exports
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions and interfaces
│   ├── App.tsx                   # Main application root with state & navigation
│   ├── index.css                 # Design system tokens, keyframes & custom scrollbars
│   ├── main.tsx                  # React 19 application entry point
│   └── types.ts                  # Root type re-exports for backward compatibility
├── index.html                    # HTML5 template with typography & metadata
├── package.json                  # Dependencies, scripts and package metadata
├── tsconfig.json                 # TypeScript compiler configuration & path aliases
└── vite.config.ts                # Vite bundler configuration & React plugins
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.x or later recommended)
- **npm** (v9.x or later) or **pnpm** / **yarn**

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone https://github.com/arogyam-tech/arogyam-tech.git
   cd arogyam-tech
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## ⚡ Key Features

- **Interactive Telemetry Simulators**: Test live flow metering rates, trigger simulated occlusion/air-bubble alarms, and monitor dynamic ECG sinus and arrhythmia rhythm traces directly in the browser.
- **Direct Leadership Inquiry Gateway**: Dispatch inquiries directly to `arogyamtechpvt@gmail.com` with automatic timestamping in Indian Standard Time (IST), local storage backup, and native email client fallback.
- **Modern Responsive Design**: Engineered with a clinical-grade aesthetic using high-contrast medical teal, dark telemetry slate, and crisp typography.
- **Type Safety**: Full TypeScript coverage across all data models, services, and UI components.

---

## 🏥 Institutional Affiliation & Regulatory Pathway

- **Incubation**: Pre-incubated at the **IIT Patna Incubation Centre**, Bihar, India.
- **Standards & Compliance**: Designed under **IEC 60601-1-2**, **IEC 60601-2-24**, **IEC 60601-2-47**, and **ISO 13485** medical device pathways.
- **Contact**: `arogyamtechpvt@gmail.com` | Muzaffarpur, Bihar, India 843108

---

## 📄 License

Copyright © 2026 AROGYAM TECH Pvt. Ltd. All rights reserved.
