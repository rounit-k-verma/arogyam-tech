/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Award, Shield, FileText } from 'lucide-react';
import { ModalType } from '../../types';

export interface PolicyModalProps {
  type: ModalType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  // Modal accessibility: Escape key and body scroll lock
  React.useEffect(() => {
    if (!type || type === 'contact' || type === 'iv-simulator' || type === 'ecg-simulator') {
      return;
    }
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
  }, [type, onClose]);

  if (!type || type === 'contact' || type === 'iv-simulator' || type === 'ecg-simulator') {
    return null;
  }

  const getContent = () => {
    switch (type) {
      case 'grant':
        return {
          title: 'IIT Patna Incubation & Innovation Grant',
          badge: 'Deep-Tech Fellowship',
          icon: <Award className="w-5 h-5 text-[#0d9488]" />,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                AROGYAM TECH Pvt. Ltd. is formally pre-incubated at the Indian Institute of Technology Patna (IIT Patna). Through this fellowship, our core engineering team benefits from:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Access to state-of-the-art biomedical sensor fabrication and precision cleanrooms.</li>
                <li>Faculty mentorship in bio-signal processing, embedded firmware validation, and machine learning triage models.</li>
                <li>Seed grants supporting the clinical bench-testing of the Automated IV Drip optical array and Cardiocare mobile telemetry device.</li>
                <li>Priority access to university hospital clinical trial boards for multi-center ethical clearance.</li>
              </ul>
              <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-[#0d9488] font-mono">
                Grant ID: IITP-INC-MEDTECH-2024 | Principal Incubation Officer: Biomedical Innovation Cell, IIT Patna.
              </div>
            </div>
          ),
        };

      case 'safety':
        return {
          title: 'Medical Safety & Quality Engineering',
          badge: 'ISO 13485 & MDR Compliance',
          icon: <Shield className="w-5 h-5 text-[#0d9488]" />,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                Patient safety is our primary engineering mandate. All AROGYAM TECH hardware architectures are developed under strict biomedical safety frameworks:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="font-bold text-[#0d9488] text-xs">IEC 60601-1-2</div>
                  <div className="text-xs text-slate-500 mt-0.5">Electromagnetic compatibility and bio-isolation protection.</div>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="font-bold text-[#0d9488] text-xs">IEC 60601-2-24</div>
                  <div className="text-xs text-slate-500 mt-0.5">Essential performance of infusion pumps and flow controllers.</div>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="font-bold text-[#0d9488] text-xs">IEC 60601-2-47</div>
                  <div className="text-xs text-slate-500 mt-0.5">Ambulatory electrocardiographic diagnostic systems.</div>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="font-bold text-[#0d9488] text-xs">CDSCO Class B/C</div>
                  <div className="text-xs text-slate-500 mt-0.5">Indian Medical Device Rules 2017 regulatory pathway.</div>
                </div>
              </div>
            </div>
          ),
        };

      case 'privacy':
        return {
          title: 'Privacy Policy & Clinical Data Security',
          badge: 'HIPAA & ISO 27001 Ready',
          icon: <FileText className="w-5 h-5 text-[#0d9488]" />,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                AROGYAM TECH ensures all patient and institutional telemetry data is strictly protected. Our data infrastructure enforces:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>End-to-End Encryption (AES-256 at rest, TLS 1.3 in flight) for all wireless ECG and drip sensor transmissions.</li>
                <li>Zero unconsented third-party data sharing or unauthorized telemetry aggregation.</li>
                <li>Anonymized telemetry tokens ensuring that clinical data cannot be linked back to individual identity without local hospital EHR authentication keys.</li>
                <li>Full compliance with Indian Digital Personal Data Protection (DPDP) Act and international HIPAA privacy regulations.</li>
              </ul>
            </div>
          ),
        };

      case 'terms':
      default:
        return {
          title: 'Terms of Service & Clinical Evaluation',
          badge: 'Legal Agreement',
          icon: <FileText className="w-5 h-5 text-[#0d9488]" />,
          content: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                By evaluating AROGYAM TECH prototypes, hardware simulators, or clinical software dashboards, institutional partners agree to:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Use pre-market devices solely under authorized investigational protocols or institutional review board (IRB) supervision.</li>
                <li>Maintain confidentiality of proprietary optical drop detection mechanisms and circuit schematics.</li>
                <li>Report any telemetry anomalies or unexpected edge-case sensor deviations to AROGYAM TECH within 24 hours.</li>
              </ul>
              <p className="text-xs text-slate-400">
                For legal inquiries, contact: arogyamtechpvt@gmail.com | Registered office: Muzaffarpur, Bihar, India 843108.
              </p>
            </div>
          ),
        };
    }
  };

  const { title, badge, icon, content } = getContent();

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
    >
      <div className="bg-white border border-[#e5e7eb] rounded-none w-full max-w-2xl shadow-2xl overflow-hidden my-auto relative text-slate-900 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 sm:px-8 py-5 border-b border-[#e5e7eb] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-teal-50 border border-teal-200 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488] block">
                {badge}
              </span>
              <h2 id="policy-modal-title" className="text-base font-bold text-slate-900 mt-0.5">{title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-colors rounded"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {content}

          <div className="pt-4 flex justify-end border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
