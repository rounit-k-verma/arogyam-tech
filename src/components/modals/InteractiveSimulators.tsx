/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Activity, 
  HeartPulse, 
  Play, 
  Pause, 
  AlertTriangle, 
  CheckCircle2, 
  Battery, 
  Wifi, 
  Download,
  RotateCcw,
  Info
} from 'lucide-react';

export interface SimulatorModalProps {
  type: 'iv' | 'ecg';
  onClose: () => void;
}

type RhythmMode = 'normal' | 'tachy' | 'brady' | 'arrhythmia';

/**
 * Computes the vertical ECG trace offset for a given normalised beat phase.
 * Extracted from the canvas render loop to reduce cyclomatic complexity.
 */
function computeEcgOffset(normalizedPhase: number, rhythm: RhythmMode): number {
  // P wave
  if (normalizedPhase > 0.1 && normalizedPhase < 0.2) {
    return -Math.sin((normalizedPhase - 0.1) * Math.PI * 10) * 12;
  }
  // Q wave
  if (normalizedPhase >= 0.28 && normalizedPhase < 0.32) {
    return 8;
  }
  // R peak (sharp high deflection — may be perturbed in arrhythmia)
  if (normalizedPhase >= 0.32 && normalizedPhase < 0.38) {
    const peakHeight = rhythm === 'arrhythmia' && Math.random() > 0.6 ? 75 : 60;
    return -Math.sin((normalizedPhase - 0.32) * Math.PI / 0.06) * peakHeight;
  }
  // S wave
  if (normalizedPhase >= 0.38 && normalizedPhase < 0.42) {
    return 16;
  }
  // T wave
  if (normalizedPhase >= 0.52 && normalizedPhase < 0.68) {
    return -Math.sin((normalizedPhase - 0.52) * Math.PI / 0.16) * 18;
  }
  // Baseline physiological jitter
  return (Math.random() - 0.5) * 2;
}

export const SimulatorModal: React.FC<SimulatorModalProps> = ({ type, onClose }) => {
  // IV Drip States
  const [ivRunning, setIvRunning] = useState(true);
  const [flowRate, setFlowRate] = useState(125); // mL/hr
  const [totalBagVolume] = useState(500); // mL
  const [volumeInfused, setVolumeInfused] = useState(142.5); // mL
  const [isOccluded, setIsOccluded] = useState(false);
  const [airDetected, setAirDetected] = useState(false);

  // ECG States
  const [ecgRunning, setEcgRunning] = useState(true);
  const [bpm, setBpm] = useState(74);
  const [rhythmMode, setRhythmMode] = useState<RhythmMode>('normal');
  const [lead, setLead] = useState<'Lead I' | 'Lead II' | 'Lead III' | 'V1'>('Lead II');
  const [recordingExported, setRecordingExported] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Refs for seamless real-time animation without tearing down the canvas loop
  const bpmRef = useRef(bpm);
  const rhythmModeRef = useRef(rhythmMode);
  const ecgRunningRef = useRef(ecgRunning);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    rhythmModeRef.current = rhythmMode;
  }, [rhythmMode]);

  useEffect(() => {
    ecgRunningRef.current = ecgRunning;
  }, [ecgRunning]);

  // Modal accessibility: Escape key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  // IV Simulation tick
  useEffect(() => {
    if (!ivRunning || isOccluded || airDetected || type !== 'iv') return;

    const interval = setInterval(() => {
      setVolumeInfused((prev) => {
        const increment = (flowRate / 3600) * 0.5; // half second tick
        const next = prev + increment;
        if (next >= totalBagVolume) {
          setIvRunning(false);
          return totalBagVolume;
        }
        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [ivRunning, isOccluded, airDetected, flowRate, totalBagVolume, type]);

  // ECG Canvas Animation Loop
  useEffect(() => {
    if (type !== 'ecg') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let x = 0;
    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;
    
    // Clear canvas once with grid
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw ECG grid
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(13, 148, 136, 0.12)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let gx = 0; gx < width; gx += step) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      for (let gy = 0; gy < height; gy += step) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }
    };

    drawGrid();

    let lastY = midY;
    let beatPhase = 0;

    const render = () => {
      if (!ecgRunningRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const currentBpm = bpmRef.current;
      const currentRhythm = rhythmModeRef.current;

      // Erase trailing slice
      const scanBarWidth = 16;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x, 0, scanBarWidth, height);

      // Re-draw subtle grid under eraser
      ctx.strokeStyle = 'rgba(13, 148, 136, 0.12)';
      ctx.lineWidth = 1;
      for (let gx = Math.floor(x / 20) * 20; gx <= x + scanBarWidth; gx += 20) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }

      // Calculate ECG Waveform value based on beat cycle
      const cycleLength = Math.max(25, Math.floor(3600 / currentBpm));
      beatPhase = (beatPhase + 1) % cycleLength;

      const normalizedPhase = beatPhase / cycleLength;
      let offset = computeEcgOffset(normalizedPhase, currentRhythm);

      // Additional arrhythmia noise burst on top of per-wave perturbation
      if (currentRhythm === 'arrhythmia' && Math.random() > 0.94) {
        offset += (Math.random() - 0.5) * 30;
      }

      const currentY = midY + offset;


      // Draw ECG glowing trace segment in teal
      ctx.beginPath();
      ctx.moveTo(x === 0 ? 0 : x - 2, lastY);
      ctx.lineTo(x, currentY);
      ctx.strokeStyle = '#0d9488';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#0d9488';
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      lastY = currentY;
      x = (x + 2) % width;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [type]);

  // Export report function
  const handleExportReport = () => {
    setRecordingExported(true);
    const timestamp = new Date().toISOString();
    const reportText = `=====================================================
AROGYAM TECHNOLOGIES - CARDIOCARE CLINICAL TELEMETRY REPORT
=====================================================
Timestamp: ${timestamp}
Device ID: CARDIOCARE-AMB-2026-IITP
Sampling Rate: 1000 Hz (24-bit Low-Noise ADC)
Lead Configuration: ${lead}
Heart Rate: ${bpm} BPM
Rhythm Classification: ${rhythmMode.toUpperCase()}
PR Interval: 154 ms
QRS Duration: 84 ms
QTc Interval: 412 ms
AI Diagnostic Confidence: 99.2%
Compliance: IEC 60601-2-47 / HIPAA / ISO 27001
=====================================================
Status: Automated Clinical Triage Summary Generated.
Arogyam Tech Pvt. Ltd. | IIT Patna Incubation Centre
=====================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cardiocare_ECG_Report_${bpm}BPM_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setRecordingExported(false), 3500);
  };

  const dropsPerMin = Math.round((flowRate * 20) / 60);
  const remainingVolume = Math.max(0, totalBagVolume - volumeInfused);
  const remainingHours = flowRate > 0 ? (remainingVolume / flowRate).toFixed(1) : '∞';

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="simulator-modal-title"
    >
      <div className="bg-white border border-[#e5e7eb] rounded-none w-full max-w-4xl shadow-2xl overflow-hidden my-auto relative text-slate-900 animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-[#e5e7eb] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0d9488]">
              {type === 'iv' ? <Activity className="w-4 h-4" /> : <HeartPulse className="w-4 h-4" />}
            </div>
            <div>
              <h2 id="simulator-modal-title" className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>{type === 'iv' ? 'Automated IV Drip Telemetry & Flow Engine' : 'Cardiocare Mobile ECG Bio-Signal Stream'}</span>
                <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] uppercase font-bold">
                  Live Interactive
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {type === 'iv'
                  ? 'Real-time micron drop rate metering and occlusion safety loop'
                  : 'Real-time clinical rhythm telemetry sampled at 1000 Hz / 24-bit ADC'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors rounded"
            aria-label="Close simulator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* ===================== IV DRIP SIMULATOR ===================== */}
          {type === 'iv' && (
            <div className="space-y-6">
              
              {/* Top Telemetry HUD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Flow Rate</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{flowRate} <span className="text-xs font-normal text-slate-500">mL/hr</span></div>
                  <span className="text-[10px] text-[#0d9488] font-mono">({dropsPerMin} drops/min)</span>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Infused / Total</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{volumeInfused.toFixed(1)} <span className="text-xs font-normal text-slate-500">/ {totalBagVolume} mL</span></div>
                  <div className="w-full bg-slate-200 h-1.5 rounded mt-2 overflow-hidden">
                    <div 
                      className="bg-[#0d9488] h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (volumeInfused / totalBagVolume) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Remaining Time</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{remainingHours} <span className="text-xs font-normal text-slate-500">hrs</span></div>
                  <span className="text-[10px] text-slate-400">Auto-shutoff on empty</span>
                </div>

                <div className={`p-4 rounded border transition-all ${
                  isOccluded || airDetected
                    ? 'bg-rose-50 border-rose-300 text-rose-800'
                    : 'bg-teal-50 border-teal-200 text-teal-900'
                }`}>
                  <span className="text-[10px] font-bold uppercase block text-slate-500">Safety Sensor</span>
                  <div className="text-sm font-bold mt-1 flex items-center gap-1.5">
                    {isOccluded ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-600 animate-bounce" />
                        <span>OCCLUSION ALARM</span>
                      </>
                    ) : airDetected ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-amber-600 animate-bounce" />
                        <span>AIR BUBBLE ALERT</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        <span>NOMINAL FLOW</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Optical feedback active</span>
                </div>
              </div>

              {/* Graphical IV Chamber Animation */}
              <div className="bg-slate-50 rounded p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-8">
                
                {/* Visual Drip Chamber */}
                <div className="flex items-center gap-6">
                  <div className="relative w-16 h-40 bg-white rounded border-2 border-slate-300 overflow-hidden flex flex-col items-center justify-between p-2 shadow-sm">
                    {/* Top fluid inlet */}
                    <div className="w-3 h-4 bg-teal-600 rounded-sm" />
                    
                    {/* Falling drop animation */}
                    {ivRunning && !isOccluded && (
                      <div 
                        className="w-2.5 h-3 bg-[#0d9488] rounded-full animate-bounce shadow-sm"
                        style={{ animationDuration: `${Math.max(0.3, 60 / dropsPerMin)}s` }}
                      />
                    )}

                    {/* Fluid pool at bottom */}
                    <div 
                      className="w-full bg-teal-100 rounded-b transition-all duration-500 border-t border-teal-300"
                      style={{ height: `${Math.min(60, 20 + (volumeInfused % 20))}px` }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-sm font-bold text-slate-900">Optical Droplet Sensor Head</div>
                    <div className="text-xs text-slate-500">Infrared beam measuring droplet curvature & frequency.</div>
                    <div className="flex items-center gap-4 text-xs pt-1">
                      <span className="flex items-center gap-1 text-[#0d9488] font-semibold">
                        <Battery className="w-4 h-4" /> 94% Battery
                      </span>
                      <span className="flex items-center gap-1 text-slate-600 font-medium">
                        <Wifi className="w-4 h-4" /> Central Nurse Hub Sync (5.2 GHz)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Rate Controller Slider */}
                <div className="w-full sm:w-72 space-y-3 bg-white p-4 rounded border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Target Infusion Rate</span>
                    <span className="font-bold text-[#0d9488]">{flowRate} mL/hr</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="5"
                    value={flowRate}
                    onChange={(e) => setFlowRate(Number(e.target.value))}
                    className="w-full accent-[#0d9488] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>10 (KVO)</span>
                    <span>125 (Maintenance)</span>
                    <span>300 (Bolus)</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons & Triggers */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setIvRunning(!ivRunning)}
                    className={`px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      ivRunning
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                        : 'bg-[#0d9488] text-white hover:bg-[#0f766e]'
                    }`}
                  >
                    {ivRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{ivRunning ? 'Pause Infusion' : 'Resume Infusion'}</span>
                  </button>

                  <button
                    onClick={() => setIsOccluded(!isOccluded)}
                    className={`px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      isOccluded
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-rose-400'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{isOccluded ? 'Clear Occlusion' : 'Simulate Line Occlusion'}</span>
                  </button>

                  <button
                    onClick={() => setAirDetected(!airDetected)}
                    className={`px-3.5 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      airDetected
                        ? 'bg-amber-500 text-white font-bold'
                        : 'bg-slate-100 text-slate-700 border border-slate-200 hover:border-amber-400'
                    }`}
                  >
                    <span>{airDetected ? 'Purge Air Bubble' : 'Simulate Air Bubble'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setVolumeInfused(0);
                      setIsOccluded(false);
                      setAirDetected(false);
                    }}
                    className="px-3 py-2 bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 rounded text-xs flex items-center gap-1 uppercase tracking-wider font-bold"
                    title="Reset Bag Level"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Bag</span>
                  </button>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#0d9488]" />
                  <span>Compliant with IEC 60601-2-24 infusion standards.</span>
                </div>
              </div>

            </div>
          )}

          {/* ===================== CARDIOCARE ECG SIMULATOR ===================== */}
          {type === 'ecg' && (
            <div className="space-y-6">
              
              {/* Telemetry Header */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Heart Rate</span>
                  <div className="text-3xl font-bold text-slate-900 mt-1 flex items-baseline gap-1">
                    <span>{bpm}</span>
                    <span className="text-xs font-normal text-slate-500">BPM</span>
                  </div>
                  <span className="text-[10px] text-[#0d9488] font-mono">Real-time R-R peak detection</span>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Active Lead</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">{lead}</div>
                  <span className="text-[10px] text-slate-400">24-bit Low-Noise ADC</span>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">PR / QRS / QTc</span>
                  <div className="text-base font-bold text-[#0d9488] mt-1 font-mono">154 / 84 / 412 ms</div>
                  <span className="text-[10px] text-slate-400">Interval Mapping</span>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">AI Classification</span>
                  <div className="text-sm font-bold text-teal-700 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-[#0d9488]" />
                    <span>{rhythmMode === 'normal' ? 'Normal Sinus Rhythm' : rhythmMode.toUpperCase()}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Confidence: 99.2%</span>
                </div>
              </div>

              {/* Canvas Waveform Display */}
              <div className="bg-slate-900 rounded p-3 sm:p-4 border border-slate-800 relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between pb-2 px-2 text-xs text-white font-bold uppercase tracking-wider border-b border-slate-800 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#0d9488] rotate-45" />
                    <span>Cardiocare Live Rhythm Trace ({lead})</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">25 mm/s | 10 mm/mV</div>
                </div>

                <canvas
                  ref={canvasRef}
                  width={750}
                  height={220}
                  className="w-full h-48 sm:h-56 bg-slate-950 rounded block"
                />
              </div>

              {/* Interactive Controls */}
              <div className="bg-slate-50 p-5 rounded border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                
                {/* BPM Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700">Adjust Heart Rate</span>
                    <span className="font-bold text-[#0d9488]">{bpm} BPM</span>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="160"
                    value={bpm}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setBpm(val);
                      if (val > 100) setRhythmMode('tachy');
                      else if (val < 60) setRhythmMode('brady');
                      else setRhythmMode('normal');
                    }}
                    className="w-full accent-[#0d9488] cursor-pointer"
                  />
                </div>

                {/* Rhythm Modes */}
                <div className="space-y-2">
                  <span className="block text-xs font-bold text-slate-700">Clinical Rhythm Simulation</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(['normal', 'tachy', 'brady', 'arrhythmia'] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setRhythmMode(mode);
                          if (mode === 'tachy') setBpm(120);
                          if (mode === 'brady') setBpm(50);
                          if (mode === 'normal') setBpm(72);
                        }}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                          rhythmMode === mode
                            ? 'bg-[#0d9488] text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {mode === 'normal' ? 'Sinus' : mode === 'tachy' ? 'Tachycardia' : mode === 'brady' ? 'Bradycardia' : 'Arrhythmia'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lead Selector */}
                <div className="space-y-2">
                  <span className="block text-xs font-bold text-slate-700">Lead Channel</span>
                  <div className="flex gap-2">
                    {(['Lead I', 'Lead II', 'Lead III', 'V1'] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLead(l)}
                        className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                          lead === l
                            ? 'bg-[#0d9488] text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEcgRunning(!ecgRunning)}
                    className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      ecgRunning
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-[#0d9488] text-white'
                    }`}
                  >
                    {ecgRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{ecgRunning ? 'Freeze Rhythm' : 'Resume Telemetry'}</span>
                  </button>

                  <button
                    onClick={handleExportReport}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-[#0d9488]" />
                    <span>{recordingExported ? 'ECG Summary Downloaded!' : 'Export Clinical Summary'}</span>
                  </button>
                </div>

                <div className="text-xs text-slate-500">
                  Encryption: TLS 1.3 | HIPAA Compliant Cloud Gateway
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
