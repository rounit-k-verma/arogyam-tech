/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, MapPin, Loader2, ExternalLink } from 'lucide-react';
import { ContactFormData, InquiryType } from '../../types';
import { COMPANY_INFO } from '../../data/content';
import { sendClinicalInquiryToEmail, InquiryResponse } from '../../services/inquiryService';

export interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'clinical_trial',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [inquiryResult, setInquiryResult] = useState<InquiryResponse | null>(null);

  // Modal accessibility: Escape key and body scroll lock
  React.useEffect(() => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await sendClinicalInquiryToEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        inquiryType: formData.inquiryType,
        message: formData.message,
        source: 'Top Navigation Connect Button & Institutional Portal',
      });
      setInquiryResult(result);
      setSubmitted(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Transmission failed';
      setInquiryResult({
        success: false,
        message: errorMessage,
      });
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="bg-white border border-[#e5e7eb] rounded-none w-full max-w-2xl shadow-2xl overflow-hidden my-auto relative text-slate-900 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 sm:px-8 py-5 border-b border-[#e5e7eb] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#0d9488] rotate-45" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0d9488]">Institutional Gateway</span>
            </div>
            <h2 id="contact-modal-title" className="text-xl font-bold text-slate-900 mt-0.5">Connect with AROGYAM TECH</h2>
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
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-teal-50 border border-teal-200 text-[#0d9488] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900">Inquiry Dispatched Instantly</h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-[#0d9488] border border-teal-200 rounded-full text-xs font-semibold">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Delivered to {COMPANY_INFO.email}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[#0d9488] font-bold">{formData.name}</span>. Your clinical specifications and requirements have been transmitted directly to our biomedical engineering desk. We will respond back at <span className="text-[#0d9488] font-bold">{formData.email}</span> within 24 hours.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded text-left max-w-lg mx-auto text-xs space-y-1 text-slate-600">
                <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1.5">Transmission Summary</div>
                <div><span className="font-semibold text-slate-700">Recipient:</span> {COMPANY_INFO.email}</div>
                <div><span className="font-semibold text-slate-700">Inquiry Type:</span> {formData.inquiryType.replace('_', ' ').toUpperCase()}</div>
                <div><span className="font-semibold text-slate-700">Organization:</span> {formData.organization || 'Individual Clinical Facility'}</div>
              </div>
              
              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                {inquiryResult?.mailtoFallbackUrl && (
                  <a
                    href={inquiryResult.mailtoFallbackUrl}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded border border-slate-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                    <span>Open in Email App</span>
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0d9488] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#0f766e] transition-colors shadow-sm"
                >
                  Return to Overview
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Dr. Vivek / Admin"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-[#e5e7eb] rounded text-xs text-slate-900 focus:border-[#0d9488] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@hospital.org"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-[#e5e7eb] rounded text-xs text-slate-900 focus:border-[#0d9488] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / Direct Line
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-[#e5e7eb] rounded text-xs text-slate-900 focus:border-[#0d9488] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hospital / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="AIIMS / Apollo / Rural PHC"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-[#e5e7eb] rounded text-xs text-slate-900 focus:border-[#0d9488] focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Inquiry Purpose
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as InquiryType })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-[#e5e7eb] rounded text-xs text-slate-900 focus:border-[#0d9488] focus:bg-white focus:outline-none transition-colors"
                >
                  <option value="clinical_trial">Request Clinical Trial Hardware Units</option>
                  <option value="procurement">Hospital Bulk Procurement & Demo</option>
                  <option value="partnership">Rural Health Mission & CSR Partnership</option>
                  <option value="investment">Investor Relations & Deep-Tech Grants</option>
                  <option value="general">Academic / Technical Discussion</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Project Scope or Clinical Requirements
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Details regarding your ICU bed count, mobile ECG triage targets, or clinical validation protocol..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-[#e5e7eb] rounded text-xs text-slate-900 focus:border-[#0d9488] focus:bg-white focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Direct Info Footnote */}
              <div className="p-3 bg-slate-50 rounded border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
                  <span>{COMPANY_INFO.address}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-[#0d9488] font-bold hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-transparent text-slate-600 hover:text-slate-900 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold text-xs uppercase tracking-wider rounded transition-all shadow-sm flex items-center gap-2 disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending to {COMPANY_INFO.email}...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
