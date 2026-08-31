/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenType } from '../../types';
import { BRAND_ASSETS } from '../../data/content';
import { ChevronDown, Activity, HeartPulse, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenIVSim: () => void;
  onOpenECGSim: () => void;
  onOpenContact: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenIVSim,
  onOpenECGSim,
  onOpenContact,
}) => {
  const scrollToVision = () => {
    const el = document.getElementById('vision-mission-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-[#fdfdfd] text-[#1a1a1a]">
      
      {/* Hero Section */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 text-center pt-28 pb-20 overflow-hidden">
        
        {/* Subtle geometric grid background */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none -z-10"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Hero Content Container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 z-10">
          
          {/* Central Geometric Emblem */}
          <div 
            className="relative group cursor-pointer" 
            onClick={() => onNavigate('innovation')}
            role="button"
            tabIndex={0}
            aria-label="View Product Innovations"
            onKeyDown={(e) => { if (e.key === 'Enter') onNavigate('innovation'); }}
          >
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-none bg-white p-4 shadow-sm border border-[#e5e7eb] flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105 group-hover:border-[#0d9488]">
              <img
                src={BRAND_ASSETS.logo}
                alt="AROGYAM TECH Logo"
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#0d9488]" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#0d9488]" />
            </div>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1a1a1a] tracking-tight leading-[1.15]">
              Empowering Precision Medicine & <br />
              <span className="font-bold text-[#0d9488]">
                Safer Tomorrow
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Leveraging intelligent optical sensing and mobile bio-signal telemetry to deliver real-time diagnostic insights for critical and distributed healthcare.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('innovation')}
              className="px-7 py-3 bg-[#0d9488] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#0f766e] hover:shadow transition-all duration-200 flex items-center gap-2"
              id="hero-explore-products-btn"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenContact}
              className="px-7 py-3 bg-white text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-all duration-200 flex items-center gap-2 shadow-sm"
              id="hero-request-demo-btn"
            >
              <span>Request Clinical Demo</span>
            </button>
          </div>

          {/* Telemetry Feature Quick Launch Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl pt-4">
            <button
              onClick={onOpenIVSim}
              className="bg-white border border-[#e5e7eb] rounded-lg p-5 flex items-center gap-4 text-left group hover:border-[#0d9488] hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 bg-teal-50 border border-teal-200 text-[#0d9488] flex items-center justify-center rounded-md group-hover:bg-[#0d9488] group-hover:text-white transition-colors shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#0d9488] uppercase tracking-widest block">Fluid Dynamics</span>
                <span className="text-sm font-bold text-slate-900 block">Automated IV Drip Simulator</span>
                <span className="text-xs text-slate-500 block mt-0.5">Test live flow metering & safety loops &rarr;</span>
              </div>
            </button>

            <button
              onClick={onOpenECGSim}
              className="bg-white border border-[#e5e7eb] rounded-lg p-5 flex items-center gap-4 text-left group hover:border-[#0d9488] hover:shadow-sm transition-all"
            >
              <div className="w-12 h-12 bg-teal-50 border border-teal-200 text-[#0d9488] flex items-center justify-center rounded-md group-hover:bg-[#0d9488] group-hover:text-white transition-colors shrink-0">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#0d9488] uppercase tracking-widest block">Mobile Diagnostics</span>
                <span className="text-sm font-bold text-slate-900 block">Cardiocare Live ECG Stream</span>
                <span className="text-xs text-slate-500 block mt-0.5">Test 24-bit real-time cardiac trace &rarr;</span>
              </div>
            </button>
          </div>

        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToVision}
          className="mt-12 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer animate-bounce text-slate-500 hover:text-[#0d9488]"
          aria-label="Scroll to Vision and Mission"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">Explore</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </section>

      {/* Geometric Balance Bento Metric Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-[1280px] mx-auto border-t border-[#e5e7eb]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Hero Metric: Teal Card */}
          <div className="lg:col-span-4 bg-[#0d9488] p-8 flex flex-col justify-between text-white shadow-md rounded-none relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold tracking-wider opacity-85 uppercase">Telemetry Precision</span>
              <div className="w-6 h-6 border border-white/40 rounded-full flex items-center justify-center text-[10px]">↑</div>
            </div>
            <div className="my-6">
              <h3 className="text-5xl font-bold tracking-tight">99.82<span className="text-2xl font-normal opacity-70">%</span></h3>
              <p className="text-xs opacity-85 mt-2">Drip drop metering accuracy across 100+ clinical test hours</p>
            </div>
            <div className="pt-4 border-t border-white/20 text-[11px] font-mono opacity-90">
              STATUS: ZERO UNDETECTED OCCLUSIONS
            </div>
          </div>

          {/* Right Bento Grid */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-white border border-[#e5e7eb] p-6 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Patient Reach</span>
                  <div className="w-6 h-6 border border-slate-200 rounded-full flex items-center justify-center text-[10px] text-slate-400">→</div>
                </div>
                <div className="my-4">
                  <h3 className="text-4xl font-bold text-slate-900">100<span className="text-xl font-normal text-slate-400">+</span></h3>
                  <p className="text-xs text-slate-500 mt-1">Infusion hours monitored & 10+ cardiac scans</p>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">
                  ACTIVE PHC NODES: 3 CLINICS
                </div>
              </div>

              <div className="bg-white border border-[#e5e7eb] p-6 flex flex-col justify-between shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Cardiocare Footprint</span>
                  <div className="w-6 h-6 border border-slate-200 rounded-full flex items-center justify-center text-[10px] text-slate-400">→</div>
                </div>
                <div className="my-4">
                  <h3 className="text-4xl font-bold text-slate-900">42<span className="text-xl font-normal text-slate-400">g</span></h3>
                  <p className="text-xs text-slate-500 mt-1">Ultra-lightweight ambulatory ECG sensor housing</p>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">
                  SAMPLING: 1000 HZ / 24-BIT ADC
                </div>
              </div>

            </div>

            {/* Dark Telemetry Live Bar */}
            <div className="bg-slate-900 p-6 sm:p-8 text-white relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0d9488] opacity-10 rounded-full -mr-20 -mt-20 pointer-events-none" />
              <div className="relative z-10 w-full">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h4 className="text-white text-lg font-bold">Biomedical Telemetry Stream</h4>
                    <p className="text-slate-400 text-xs uppercase tracking-widest">Arogyam-Cloud Telemetry Gateway</p>
                  </div>
                  <span className="text-[#0d9488] text-xs font-mono">NODE: IITP-INCUBATION-HUB</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-800 h-1.5 flex mb-6">
                  <div className="h-full bg-[#0d9488] w-[88%]" />
                  <div className="h-full bg-white/30 w-[2%] ml-1" />
                  <div className="h-full bg-white/30 w-[1%] ml-1" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="border-r border-slate-800 pr-2">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Sampling</p>
                    <p className="text-white font-bold text-sm">1000 Hz</p>
                  </div>
                  <div className="border-r border-slate-800 pr-2">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Bandwidth</p>
                    <p className="text-white font-bold text-sm">Low-Power BLE</p>
                  </div>
                  <div className="border-r border-slate-800 pr-2">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Stability</p>
                    <p className="text-white font-bold text-sm">99.98%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Encryption</p>
                    <p className="text-white font-bold text-sm uppercase">AES-256 / TLS</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision-mission-section" className="py-20 px-4 sm:px-6 lg:px-12 bg-slate-50 border-t border-[#e5e7eb]">
        <div className="max-w-[1280px] mx-auto">
          
          <div className="text-center mb-14 space-y-2">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-[#0d9488]">Institutional Blueprint</h2>
            <p className="text-2xl md:text-3xl font-light text-slate-900">
              Engineering <span className="font-bold text-slate-900">Global Medical Equity</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision Card */}
            <div className="bg-white p-8 sm:p-10 border border-[#e5e7eb] shadow-sm flex flex-col justify-between group hover:border-[#0d9488] transition-all">
              <div>
                <div className="p-4 bg-slate-50 border-l-4 border-[#0d9488] mb-6">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">CORE PURPOSE</p>
                  <p className="text-sm font-bold text-slate-900">Universal Diagnostic Access</p>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  To become a global leader in accessible, high-tech medical solutions that save lives. We envision a world where advanced diagnostics and precision fluid control are universally accessible across primary, secondary, and tertiary healthcare tiers.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-xs font-semibold text-[#0d9488]">
                <ShieldCheck className="w-4 h-4 text-[#0d9488]" />
                <span>Standardized for universal hospital & field deployment</span>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-white p-8 sm:p-10 border border-[#e5e7eb] shadow-sm flex flex-col justify-between group hover:border-[#0d9488] transition-all">
              <div>
                <div className="p-4 bg-slate-50 border-l-4 border-slate-400 mb-6">
                  <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">ENGINEERING MANDATE</p>
                  <p className="text-sm font-bold text-slate-900">Smart, Portable, Reliable</p>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Empowering healthcare providers and patients with smart, reliable, and portable diagnostic and monitoring tools engineered for precision, seamless usability, and rapid triage in both high-density clinical wards and remote environments.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-xs font-semibold text-[#0d9488]">
                <Cpu className="w-4 h-4 text-[#0d9488]" />
                <span>Infusing AI and edge computing into portable biomedical hardware</span>
              </div>
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 border border-[#e5e7eb] shadow-sm">
            <div className="text-center p-3 border-r border-slate-100">
              <div className="text-2xl font-bold text-[#0d9488]">IIT Patna</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Incubation Base</div>
            </div>
            <div className="text-center p-3 border-r border-slate-100">
              <div className="text-2xl font-bold text-[#0d9488]">&plusmn;1.5%</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Flow Metering Precision</div>
            </div>
            <div className="text-center p-3 border-r border-slate-100">
              <div className="text-2xl font-bold text-[#0d9488]">42 grams</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Cardiocare Pocket Unit</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl font-bold text-[#0d9488]">ISO 13485</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mt-1">Design Pathway</div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
