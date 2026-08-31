/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TEAM_MEMBERS, BRAND_ASSETS, COMPANY_INFO } from '../../data/content';
import { sendClinicalInquiryToEmail, InquiryResponse } from '../../services/inquiryService';
import { 
  MapPin, 
  Phone, 
  Linkedin, 
  Twitter, 
  Mail, 
  Send, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  GraduationCap, 
  Loader2, 
  ExternalLink 
} from 'lucide-react';

export interface TeamScreenProps {
  onOpenContact: () => void;
}

export const TeamScreen: React.FC<TeamScreenProps> = ({ onOpenContact }) => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryResult, setInquiryResult] = useState<InquiryResponse | null>(null);

  const handleQuickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await sendClinicalInquiryToEmail({
        name: inquiryName,
        email: inquiryEmail,
        message: inquiryMsg,
        inquiryType: 'Direct Leadership & Clinical Inquiry',
        source: 'Team Leadership Dispatch Form',
      });
      setInquiryResult(result);
      setIsSubmitted(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Inquiry transmission failed';
      setInquiryResult({
        success: false,
        message: errorMessage,
      });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-[1280px] mx-auto space-y-20 bg-[#fdfdfd] text-[#1a1a1a]">
      
      {/* Company Heritage Section */}
      <section className="flex flex-col lg:flex-row gap-10 items-center">
        
        {/* Heritage Text */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-sm border border-[#e5e7eb] shadow-sm">
            <div className="w-2 h-2 bg-[#0d9488] rotate-45" />
            <span className="text-xs font-bold text-slate-700 tracking-wider uppercase">
              IIT Patna Pre-Incubated
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
            Our <span className="font-bold text-[#0d9488]">Heritage</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Forged at the intersection of medical science and advanced engineering, AROGYAM TECH is dedicated to elevating the standard of care. We are committed to rigorous clinical validation and technological innovation, delivering robust solutions that empower healthcare providers with precision and reliability.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="bg-white p-4 rounded-sm border border-[#e5e7eb] shadow-sm flex items-start gap-3">
              <div className="p-2 bg-teal-50 text-[#0d9488] rounded-sm shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase">Academic Rigor</h4>
                <p className="text-xs text-slate-500 mt-0.5">Mentored by biomedical engineering faculty at IIT Patna.</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-sm border border-[#e5e7eb] shadow-sm flex items-start gap-3">
              <div className="p-2 bg-teal-50 text-[#0d9488] rounded-sm shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase">Clinical Validation</h4>
                <p className="text-xs text-slate-500 mt-0.5">Strict compliance with MDR & CDSCO ethical protocols.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Image */}
        <div className="w-full lg:w-1/2 relative h-72 sm:h-96 rounded-none overflow-hidden border border-[#e5e7eb] shadow-sm group">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${BRAND_ASSETS.labHeritage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-85" />
          
          <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 backdrop-blur-md border border-slate-200 shadow-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-[#0d9488] rotate-45" />
              <span className="text-xs font-bold text-slate-900">Biomedical Prototyping Cleanroom Lab</span>
            </div>
            <span className="text-[10px] font-bold text-[#0d9488] uppercase tracking-wider">Active Trials</span>
          </div>
        </div>

      </section>

      {/* Leadership Team ("The Innovators") */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-100 text-[10px] font-bold text-slate-700 uppercase tracking-widest">
            <span>CORE LEADERSHIP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900">
            The <span className="font-bold text-[#0d9488]">Innovators</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Multidisciplinary leaders uniting embedded biomedical hardware, clinical workflows, and product strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-white p-7 border border-[#e5e7eb] shadow-sm flex flex-col items-center text-center group hover:border-[#0d9488] transition-all duration-200 relative"
            >
              {/* Optional Lead Badge */}
              {member.badge && (
                <div className="absolute top-0 right-0 bg-[#0d9488] text-white px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                  {member.badge}
                </div>
              )}

              {/* Headshot with Geometric Border */}
              <div className="w-28 h-28 rounded-full overflow-hidden mb-5 border-2 border-slate-200 group-hover:border-[#0d9488] transition-colors p-1 bg-slate-50">
                <img
                  src={member.imageUrl}
                  alt={member.altText || member.name}
                  onError={(e) => {
                    const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
                    e.currentTarget.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0fdfa"/><circle cx="50" cy="50" r="45" fill="%230d9488" opacity="0.15"/><text x="50" y="56" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="28" font-weight="bold" fill="%230d9488">${initials}</text></svg>`);
                  }}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                {member.name}
              </h3>
              
              <p className="text-[11px] font-bold text-[#0d9488] mb-3 tracking-wider uppercase">
                {member.role}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-grow">
                {member.bio}
              </p>

              {/* Credentials / Affiliation Tag */}
              {member.credentials && (
                <div className="mt-5 pt-3 border-t border-slate-100 w-full text-[10px] font-mono text-slate-400">
                  {member.credentials}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Connect with Us Section - Dark Telemetry Slate Aesthetic */}
      <section className="bg-slate-900 p-8 sm:p-10 lg:p-12 relative overflow-hidden border border-slate-800 text-white shadow-xl">
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#0d9488 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-slate-800 text-[10px] font-bold text-[#0d9488] uppercase tracking-widest">
                <Building2 className="w-3.5 h-3.5" />
                <span>Direct Access</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light text-white">
                Connect with <span className="font-bold text-[#0d9488]">Leadership</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                Reach out to discuss institutional partnerships, clinical trials, or technical inquiries regarding our medical hardware.
              </p>
            </div>

            <div className="space-y-3">
              {/* Headquarters */}
              <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded border border-slate-700">
                <div className="w-9 h-9 rounded bg-slate-900 flex items-center justify-center text-[#0d9488] shrink-0 border border-slate-700">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Headquarters</p>
                  <p className="text-xs sm:text-sm font-semibold text-white">{COMPANY_INFO.address}</p>
                </div>
              </div>

              {/* Direct Lines */}
              <div className="flex items-start gap-3 bg-slate-800/80 p-3.5 rounded border border-slate-700">
                <div className="w-9 h-9 rounded bg-slate-900 flex items-center justify-center text-[#0d9488] shrink-0 border border-slate-700 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Lines</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
                    <a href={`tel:${COMPANY_INFO.phone1.replace(/\s+/g, '')}`} className="text-xs sm:text-sm font-semibold text-[#0d9488] hover:underline">
                      {COMPANY_INFO.phone1}
                    </a>
                    <span className="text-slate-500 text-xs">|</span>
                    <a href={`tel:${COMPANY_INFO.phone2.replace(/\s+/g, '')}`} className="text-xs sm:text-sm font-semibold text-[#0d9488] hover:underline">
                      {COMPANY_INFO.phone2}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded border border-slate-700">
                <div className="w-9 h-9 rounded bg-slate-900 flex items-center justify-center text-[#0d9488] shrink-0 border border-slate-700">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Official Inquiries</p>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-xs sm:text-sm font-semibold text-teal-300 hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0d9488] transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0d9488] transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <button
                  onClick={onOpenContact}
                  className="px-4 py-2 bg-[#0d9488] text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-[#0f766e] transition-colors"
                >
                  Schedule Video Call &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Dispatch Form */}
          <div className="lg:col-span-6 bg-slate-800/90 p-6 sm:p-7 rounded border border-slate-700 shadow-xl">
            <div className="mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#0d9488]" />
                <span>Send Direct Clinical Inquiry</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Biomedical engineers respond within 24 hours.</p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-slate-900 rounded border border-[#0d9488]/40 text-center space-y-3 animate-in fade-in zoom-in-95">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 border border-teal-500/30 text-[#0d9488] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Inquiry Transmitted Directly</h4>
                  <p className="text-xs text-teal-400 font-medium mt-0.5">Delivered to {COMPANY_INFO.email}</p>
                </div>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{inquiryName}</span>. Your clinical message has been routed directly to our engineering desk.
                </p>
                <div className="pt-2 flex items-center justify-center gap-2">
                  {inquiryResult?.mailtoFallbackUrl && (
                    <a
                      href={inquiryResult.mailtoFallbackUrl}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded border border-slate-700 inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 text-teal-400" />
                      <span>Open in Email App</span>
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setInquiryName('');
                      setInquiryEmail('');
                      setInquiryMsg('');
                    }}
                    className="px-4 py-1.5 bg-[#0d9488] hover:bg-[#0f766e] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Dr. Rajesh / Hospital Administrator"
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:border-[#0d9488] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="doctor@hospital.org"
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:border-[#0d9488] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">Clinical Requirements</label>
                  <textarea
                    rows={3}
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    placeholder="Requesting trial units for our ICU / Mobile ECG pilot setup..."
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white focus:border-[#0d9488] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-[#0d9488] hover:bg-[#0f766e] text-white font-bold text-xs uppercase tracking-wider rounded transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting to {COMPANY_INFO.email}...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Inquiry Directly</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
