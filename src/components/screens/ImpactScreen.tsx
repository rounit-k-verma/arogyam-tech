/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IMPACT_MILESTONES } from '../../data/content';
import { 
  Award, 
  Activity, 
  HeartPulse, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight
} from 'lucide-react';

export interface ImpactScreenProps {
  onOpenContact: () => void;
  onOpenIVSim: () => void;
  onOpenECGSim: () => void;
}

export const ImpactScreen: React.FC<ImpactScreenProps> = ({
  onOpenContact,
  onOpenIVSim,
  onOpenECGSim,
}) => {
  return (
    <div className="w-full pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-[1280px] mx-auto space-y-20 bg-[#fdfdfd] text-[#1a1a1a]">
      
      {/* Title & Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-white border border-[#e5e7eb] text-xs font-bold text-slate-700 shadow-sm">
          <div className="w-2 h-2 bg-[#0d9488] rotate-45" />
          <span>REAL-WORLD HEALTHCARE TRANSFORMATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
          Clinical <span className="font-bold text-[#0d9488]">Impact & Roadmap</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          From IIT Patna research cleanrooms to high-dependency hospital wards and underserved primary health centers across India.
        </p>
      </div>

      {/* High-Level Impact Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 border border-[#e5e7eb] shadow-sm text-center group hover:border-[#0d9488] transition-all">
          <div className="w-10 h-10 rounded-sm bg-teal-50 text-[#0d9488] border border-teal-200 flex items-center justify-center mx-auto mb-4">
            <Activity className="w-5 h-5" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-slate-900">100+</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#0d9488] mt-1">Drip Hours Monitored</div>
          <p className="text-xs text-slate-500 mt-2">Zero undetected occlusions or free-flow hazards in clinical trial setups.</p>
        </div>

        <div className="bg-white p-6 border border-[#e5e7eb] shadow-sm text-center group hover:border-[#0d9488] transition-all">
          <div className="w-10 h-10 rounded-sm bg-teal-50 text-[#0d9488] border border-teal-200 flex items-center justify-center mx-auto mb-4">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-slate-900">10+</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#0d9488] mt-1">Cardiocare ECG Scans</div>
          <p className="text-xs text-slate-500 mt-2">Instantaneous remote transmission to certified cardiology review panels.</p>
        </div>

        <div className="bg-white p-6 border border-[#e5e7eb] shadow-sm text-center group hover:border-[#0d9488] transition-all">
          <div className="w-10 h-10 rounded-sm bg-teal-50 text-[#0d9488] border border-teal-200 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-slate-900">3 PHCs</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#0d9488] mt-1">Rural Pilot Phase</div>
          <p className="text-xs text-slate-500 mt-2">Bridging the last mile in Bihar & neighboring underserved districts.</p>
        </div>

        <div className="bg-white p-6 border border-[#e5e7eb] shadow-sm text-center group hover:border-[#0d9488] transition-all">
          <div className="w-10 h-10 rounded-sm bg-teal-50 text-[#0d9488] border border-teal-200 flex items-center justify-center mx-auto mb-4">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-slate-900">2 Patents</div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#0d9488] mt-1">Filed & Under Review</div>
          <p className="text-xs text-slate-500 mt-2">Optical droplet refractor and low-power telemetry architectures.</p>
        </div>
      </div>

      {/* Strategic Roadmap Timeline */}
      <div className="bg-white p-8 sm:p-12 border border-[#e5e7eb] shadow-sm">
        <div className="mb-10 text-center md:text-left space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">MILESTONE LOG</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Validation & Deployment <span className="text-[#0d9488]">Roadmap</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">Chronological progression from incubation to mass hospital distribution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {IMPACT_MILESTONES.map((milestone, idx) => {
            const isCompleted = milestone.status === 'Completed';
            const isInProgress = milestone.status === 'In Progress';

            return (
              <div
                key={idx}
                className={`p-6 border flex flex-col justify-between transition-all ${
                  isCompleted
                    ? 'bg-slate-50/70 border-slate-200'
                    : isInProgress
                    ? 'bg-teal-50/30 border-[#0d9488]'
                    : 'bg-white border-slate-200 opacity-70'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {milestone.phase}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        isCompleted
                          ? 'bg-teal-100 text-teal-800'
                          : isInProgress
                          ? 'bg-[#0d9488] text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {milestone.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {milestone.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-[#0d9488] font-semibold font-mono">
                  <span className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <Clock className="w-3.5 h-3.5 text-[#0d9488]" />
                    <span>{milestone.date}</span>
                  </span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-[#0d9488]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clinical Testing CTA & Simulator launch */}
      <div className="bg-slate-900 p-8 sm:p-12 border border-slate-800 text-center space-y-6 shadow-xl relative overflow-hidden text-white">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-light text-white">
            Partner with AROGYAM TECH for <span className="font-bold text-[#0d9488]">Institutional Trials</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            We provide pre-calibrated evaluation hardware kits, telemetry dashboards, and 24/7 technical assistance for teaching hospitals and clinical research organizations.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
          <button
            onClick={onOpenContact}
            className="px-6 py-3 bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold text-xs uppercase tracking-wider rounded transition-all shadow-sm flex items-center gap-2"
          >
            <span>Request Trial Protocol</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onOpenIVSim}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-[#0d9488]" />
            <span>Simulate Smart IV</span>
          </button>
          <button
            onClick={onOpenECGSim}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-2"
          >
            <HeartPulse className="w-4 h-4 text-[#0d9488]" />
            <span>Simulate Cardiocare ECG</span>
          </button>
        </div>
      </div>

    </div>
  );
};
