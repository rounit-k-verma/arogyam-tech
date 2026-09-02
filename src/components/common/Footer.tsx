/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenType, ModalType } from '../../types';
import { BRAND_ASSETS, COMPANY_INFO } from '../../data/content';
import { Shield, Award, FileText, CheckCircle2, MapPin, Phone, Mail, Linkedin } from 'lucide-react';

export interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenModal: (modal: ModalType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-14 pb-10 w-full mt-auto relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded flex items-center justify-center p-1 border border-slate-700 shadow-sm">
                <img
                  src={BRAND_ASSETS.logo}
                  alt="AROGYAM TECHNOLOGIES Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">AROGYAM TECH</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Innovating biomedical technology for a safer tomorrow. Pre-incubated at IIT Patna, building precision diagnostic and fluid management instruments.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-800 rounded-sm border border-slate-700 text-[11px] font-semibold text-[#0d9488]">
              <Award className="w-3.5 h-3.5" />
              <span>IIT Patna Pre-Incubation</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Navigation</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#0d9488] transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('innovation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#0d9488] transition-colors"
                >
                  Products & Innovation
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('team'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#0d9488] transition-colors"
                >
                  Our Heritage & Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('impact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#0d9488] transition-colors"
                >
                  Clinical Impact Roadmap
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Certifications */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Compliance & Grants</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onOpenModal('grant')}
                  className="hover:text-[#0d9488] transition-colors flex items-center gap-1.5 text-left"
                >
                  <Award className="w-3.5 h-3.5 text-[#0d9488]" />
                  <span>IIT Patna Grant Details</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('safety')}
                  className="hover:text-[#0d9488] transition-colors flex items-center gap-1.5 text-left"
                >
                  <Shield className="w-3.5 h-3.5 text-[#0d9488]" />
                  <span>Medical Safety & ISO 13485</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('privacy')}
                  className="hover:text-[#0d9488] transition-colors flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Privacy Policy & Data Security</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('terms')}
                  className="hover:text-[#0d9488] transition-colors flex items-center gap-1.5 text-left"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Terms of Service</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Snapshot */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">Headquarters & Contact</h3>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#0d9488] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a href={`tel:${COMPANY_INFO.phone1.replace(/\s+/g, '')}`} className="hover:text-[#0d9488] transition-colors font-medium">
                    {COMPANY_INFO.phone1}
                  </a>
                  <a href={`tel:${COMPANY_INFO.phone2.replace(/\s+/g, '')}`} className="hover:text-[#0d9488] transition-colors font-medium">
                    {COMPANY_INFO.phone2}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0d9488] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#0d9488] transition-colors text-teal-400 font-medium">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Linkedin className="w-4 h-4 text-[#0d9488] shrink-0" />
                <a
                  href={COMPANY_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0a66c2] transition-colors text-slate-300 font-medium"
                >
                  LinkedIn Company Page
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0d9488]" />
              <span>Clinical validation in accordance with Indian Medical Device Rules (MDR).</span>
            </div>
            <a
              href={COMPANY_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0a66c2] hover:border-[#0a66c2] transition-all"
              aria-label="Arogyam Technologies on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => onOpenModal('privacy')} className="hover:text-[#0d9488] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onOpenModal('terms')} className="hover:text-[#0d9488] transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onOpenModal('grant')} className="hover:text-[#0d9488] transition-colors">
              IIT Patna Grant
            </button>
            <button onClick={() => onOpenModal('safety')} className="hover:text-[#0d9488] transition-colors">
              Medical Safety
            </button>
          </div>

          <p className="text-center md:text-right text-slate-400">
            © 2026 AROGYAM TECH Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
