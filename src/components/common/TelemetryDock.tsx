/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Activity, HeartPulse, PhoneCall } from 'lucide-react';

export interface TelemetryDockProps {
  onOpenIVSim: () => void;
  onOpenECGSim: () => void;
  onOpenContact: () => void;
}

export const TelemetryDock: React.FC<TelemetryDockProps> = ({
  onOpenIVSim,
  onOpenECGSim,
  onOpenContact,
}) => {
  return (
    <div 
      className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-2 p-1.5 bg-slate-900/90 backdrop-blur-md rounded-full border border-slate-700 shadow-2xl transition-all"
      role="region"
      aria-label="Quick Access Telemetry Controls"
    >
      <button
        onClick={onOpenIVSim}
        className="px-3.5 py-2 rounded-full bg-slate-800 hover:bg-[#0d9488] text-teal-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 shadow-sm"
        title="Open Smart IV Drip Simulator"
      >
        <Activity className="w-3.5 h-3.5 text-[#0d9488] group-hover:text-white" />
        <span>IV Simulator</span>
      </button>

      <button
        onClick={onOpenECGSim}
        className="px-3.5 py-2 rounded-full bg-slate-800 hover:bg-[#0d9488] text-teal-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105 shadow-sm"
        title="Open Cardiocare Live ECG Waveform"
      >
        <HeartPulse className="w-3.5 h-3.5 text-[#0d9488] group-hover:text-white" />
        <span>Live ECG</span>
      </button>

      <button
        onClick={onOpenContact}
        className="p-2 rounded-full bg-[#0d9488] hover:bg-[#0f766e] text-white transition-transform hover:scale-105 shadow-sm"
        title="Contact Team Directly"
        aria-label="Connect with Leadership Team"
      >
        <PhoneCall className="w-4 h-4" />
      </button>
    </div>
  );
};
