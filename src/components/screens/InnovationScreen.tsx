/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PRODUCTS } from '../../data/content';
import { 
  Activity, 
  HeartPulse, 
  CheckCircle2, 
  Cpu, 
  Factory, 
  Globe2, 
  Sliders, 
  Play, 
  Wifi 
} from 'lucide-react';

export interface InnovationScreenProps {
  onOpenIVSim: () => void;
  onOpenECGSim: () => void;
  onOpenContact: () => void;
}

export const InnovationScreen: React.FC<InnovationScreenProps> = ({
  onOpenIVSim,
  onOpenECGSim,
  onOpenContact,
}) => {
  const [selectedProductTab, setSelectedProductTab] = useState<'all' | 'iv' | 'ecg'>('all');

  const ivProduct = PRODUCTS.find((p) => p.id === 'iv-drip') || PRODUCTS[0];
  const ecgProduct = PRODUCTS.find((p) => p.id === 'cardiocare') || PRODUCTS[1];

  return (
    <div className="w-full pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-[1280px] mx-auto bg-[#fdfdfd] text-[#1a1a1a]">
      
      {/* Page Title & Intro */}
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white border border-[#e5e7eb] text-xs font-bold text-slate-700 shadow-sm">
          <div className="w-2 h-2 bg-[#0d9488] rotate-45" />
          <span>BIOMEDICAL HARDWARE & SENSOR PLATFORMS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
          Products & <span className="font-bold text-[#0d9488]">Innovation</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Pioneering medical technology designed for precision, telemetry reliability, and global accessibility.
        </p>

        {/* Filter / Quick Toggle */}
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => setSelectedProductTab('all')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
              selectedProductTab === 'all'
                ? 'bg-[#0d9488] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Platforms
          </button>
          <button
            onClick={() => setSelectedProductTab('iv')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedProductTab === 'iv'
                ? 'bg-[#0d9488] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Smart IV Drip</span>
          </button>
          <button
            onClick={() => setSelectedProductTab('ecg')}
            className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedProductTab === 'ecg'
                ? 'bg-[#0d9488] text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Cardiocare ECG</span>
          </button>
        </div>
      </div>

      {/* Product 1: Automated IV Drip Monitoring */}
      {(selectedProductTab === 'all' || selectedProductTab === 'iv') && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-24 p-6 sm:p-10 bg-white border border-[#e5e7eb] shadow-sm">
          {/* Image Container */}
          <div className="relative group order-1">
            <div className="bg-slate-50 rounded-none border border-slate-200 overflow-hidden relative shadow-sm">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={ivProduct.imageUrl}
                  alt={ivProduct.name}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" fill="%230f172a"><rect width="600" height="400" fill="%230f172a"/><g transform="translate(200, 100)" stroke="%230d9488" stroke-width="4" fill="none"><rect x="50" y="20" width="100" height="160" rx="8"/><path d="M 100 0 L 100 20 M 100 180 L 100 220"/><circle cx="100" cy="100" r="25" fill="%230d9488" opacity="0.2"/></g><text x="300" y="340" fill="%2314b8a6" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">AROGYAM SMART IV DRIP MONITOR</text></svg>');
                  }}
                  className="w-full h-full object-cover object-center opacity-95 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-md border border-slate-200 rounded-sm text-[10px] font-bold text-[#0d9488] flex items-center gap-1.5 shadow-sm">
                  <Activity className="w-3 h-3 text-[#0d9488]" />
                  <span>Optical Drop Counting</span>
                </div>
              </div>

              {/* Quick interactive test strip */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-900">Live Telemetry:</span> Optical drop rate &plusmn; 1.5%
                </div>
                <button
                  onClick={onOpenIVSim}
                  className="px-3.5 py-1.5 bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Launch Sim</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details & Specs */}
          <div className="space-y-6 order-2">
            <div className="inline-flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-sm border border-teal-200">
              <Activity className="w-3.5 h-3.5 text-[#0d9488]" />
              <span className="text-[10px] font-bold text-[#0d9488] tracking-widest uppercase">Fluid Safety Management</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 leading-tight">
              Automated IV Drip <br />
              <span className="font-bold text-[#0d9488]">Monitoring Platform</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Ensuring absolute patient safety through intelligent fluid dynamics. Our automated system continuously measures drip patterns with micron-level precision, instantaneously alerting nurses and adjusting flow rates to prevent air embolism and dry-line complications.
            </p>

            {/* Bullet Points */}
            <ul className="space-y-2.5 pt-1">
              {ivProduct.bulletPoints.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              {ivProduct.specs.map((spec, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{spec.label}</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenIVSim}
                className="px-5 py-2.5 bg-[#0d9488] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#0f766e] transition-all shadow-sm flex items-center gap-2"
              >
                <Sliders className="w-4 h-4" />
                <span>Open IV Flow Simulator</span>
              </button>
              <button
                onClick={onOpenContact}
                className="px-5 py-2.5 bg-white text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-all shadow-sm"
              >
                Request Hospital Trial
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Product 2: Cardiocare: Mobile ECG */}
      {(selectedProductTab === 'all' || selectedProductTab === 'ecg') && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-24 p-6 sm:p-10 bg-white border border-[#e5e7eb] shadow-sm">
          
          {/* Details & Specs (Left on desktop) */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-teal-50 px-3 py-1 rounded-sm border border-teal-200">
              <HeartPulse className="w-3.5 h-3.5 text-[#0d9488]" />
              <span className="text-[10px] font-bold text-[#0d9488] tracking-widest uppercase">Diagnostic Mobility</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 leading-tight">
              Cardiocare: <span className="font-bold text-[#0d9488]">Mobile ECG</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Democratizing cardiac diagnostics. Cardiocare is a revolutionary pocket-sized device that delivers clinical-grade, real-time ECG monitoring directly via smartphone connectivity. Engineered for swift triage and decentralised cardiac surveillance.
            </p>

            {/* Bullet Points */}
            <ul className="space-y-2.5 pt-1">
              {ecgProduct.bulletPoints.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Technical Specs Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              {ecgProduct.specs.map((spec, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{spec.label}</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onOpenECGSim}
                className="px-5 py-2.5 bg-[#0d9488] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#0f766e] transition-all shadow-sm flex items-center gap-2"
              >
                <HeartPulse className="w-4 h-4" />
                <span>Launch Live ECG Waveform</span>
              </button>
              <button
                onClick={onOpenContact}
                className="px-5 py-2.5 bg-white text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-all shadow-sm"
              >
                Clinical Pilot Inquiries
              </button>
            </div>
          </div>

          {/* Image Container (Right on desktop) */}
          <div className="relative group order-1 lg:order-2">
            <div className="bg-slate-50 rounded-none border border-slate-200 overflow-hidden relative shadow-sm">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-900">
                <img
                  src={ecgProduct.imageUrl}
                  alt={ecgProduct.name}
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" fill="%230f172a"><rect width="600" height="400" fill="%230f172a"/><g transform="translate(150, 140)" stroke="%230d9488" stroke-width="4" fill="none"><path d="M 0 60 L 60 60 L 80 20 L 100 100 L 120 40 L 140 60 L 300 60"/></g><text x="300" y="340" fill="%2314b8a6" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">CARDIOCARE MOBILE ECG</text></svg>');
                  }}
                  className="w-full h-full object-cover object-center opacity-95 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-md border border-slate-200 rounded-sm text-[10px] font-bold text-[#0d9488] flex items-center gap-1.5 shadow-sm">
                  <Wifi className="w-3 h-3 text-[#0d9488]" />
                  <span>Real-time Smartphone Sync</span>
                </div>
              </div>

              {/* Quick interactive test strip */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-600">
                  <span className="font-bold text-slate-900">Sampling Rate:</span> 1000 Hz / 24-bit Low Noise
                </div>
                <button
                  onClick={onOpenECGSim}
                  className="px-3.5 py-1.5 bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold rounded flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Monitor Rhythm</span>
                </button>
              </div>
            </div>
          </div>

        </section>
      )}

      {/* Strategic Goals Bento Grid */}
      <section className="mt-16 pt-12 border-t border-[#e5e7eb]">
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-100 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
            <span>STRATEGIC MILESTONES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900">
            Development <span className="font-bold text-[#0d9488]">Roadmap</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Scaling precision health engineering across institutional hospitals and grassroots healthcare networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Goal 1: Scale Manufacturing */}
          <div className="bg-white p-7 border border-[#e5e7eb] shadow-sm hover:border-[#0d9488] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-sm bg-teal-50 border border-teal-200 flex items-center justify-center mb-5 text-[#0d9488]">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Scale Manufacturing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Rapidly scaling production capabilities for our smart IV monitoring systems to meet growing institutional demand while maintaining strict quality control.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">Target Output</span>
              <span className="font-mono font-bold text-[#0d9488] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">10k units/qtr</span>
            </div>
          </div>

          {/* Goal 2: AI Integration */}
          <div className="bg-white p-7 border border-[#e5e7eb] shadow-sm hover:border-[#0d9488] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-sm bg-teal-50 border border-teal-200 flex items-center justify-center mb-5 text-[#0d9488]">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                AI Diagnostics
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Integrating advanced AI-driven diagnostics into the Cardiocare ecosystem to provide predictive insights and automated anomaly detection.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">Arrhythmia Detection</span>
              <span className="font-mono font-bold text-[#0d9488] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">99.4% F1</span>
            </div>
          </div>

          {/* Goal 3: Rural Expansion */}
          <div className="bg-white p-7 border border-[#e5e7eb] shadow-sm hover:border-[#0d9488] transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-sm bg-teal-50 border border-teal-200 flex items-center justify-center mb-5 text-[#0d9488]">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Rural Expansion
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Expanding our technological footprint to rural healthcare centers, bridging the gap between advanced diagnostic tools and remote populations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">Grassroots PHCs</span>
              <span className="font-mono font-bold text-[#0d9488] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">100+ Clinics</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
