/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType } from '../../types';
import { BRAND_ASSETS } from '../../data/content';
import { Activity, Menu, X, PhoneCall, Sparkles } from 'lucide-react';

export interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenContact: () => void;
  onOpenIVSim: () => void;
  onOpenECGSim: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenContact,
  onOpenIVSim,
  onOpenECGSim,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks: { id: ScreenType; label: string }[] = [
    { id: 'home', label: 'OVERVIEW' },
    { id: 'innovation', label: 'INNOVATION' },
    { id: 'team', label: 'HERITAGE & TEAM' },
    { id: 'impact', label: 'CLINICAL ROADMAP' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-center h-20">
        
        {/* Brand Logo & Name */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group text-left transition-transform duration-200"
          id="brand-logo-btn"
          aria-label="Arogyam Tech Home"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white border border-[#e5e7eb] rounded flex items-center justify-center p-1 shadow-sm group-hover:border-[#0d9488] transition-colors">
            <img
              src={BRAND_ASSETS.logo}
              alt="AROGYAM TECH Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-[#1a1a1a]">
              AROGYAM <span className="text-[#0d9488]">TECH</span>
            </span>
            <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase hidden sm:block">
              Precision Medical Engineering
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 h-full" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentScreen === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => {
                  onNavigate(link.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-xs font-bold tracking-wider uppercase transition-all duration-200 h-full flex items-center border-b-2 relative ${
                  isActive
                    ? 'text-[#1a1a1a] border-[#0d9488] font-extrabold'
                    : 'text-slate-500 border-transparent hover:text-[#1a1a1a] hover:border-slate-300'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Simulation Trigger */}
          <div className="flex items-center bg-slate-50 border border-[#e5e7eb] rounded-lg p-1">
            <button
              onClick={onOpenIVSim}
              className="text-xs px-3 py-1.5 rounded text-slate-600 hover:text-[#0d9488] hover:bg-white transition-all font-semibold flex items-center gap-1.5"
              title="Test IV Drip Simulator"
            >
              <Activity className="w-3.5 h-3.5 text-[#0d9488]" />
              <span>IV Sim</span>
            </button>
            <span className="text-slate-300 text-xs px-1">|</span>
            <button
              onClick={onOpenECGSim}
              className="text-xs px-3 py-1.5 rounded text-slate-600 hover:text-[#0d9488] hover:bg-white transition-all font-semibold flex items-center gap-1.5"
              title="Test Cardiocare ECG Waveform"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0d9488]" />
              <span>ECG Live</span>
            </button>
          </div>

          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            id="header-contact-btn"
            className="px-5 py-2.5 bg-[#0d9488] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-200 hover:bg-[#0f766e] shadow-sm hover:shadow active:scale-95 flex items-center gap-2"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenContact}
            className="px-3 py-1.5 bg-[#0d9488] text-white font-bold text-xs uppercase tracking-wider rounded-md"
          >
            Connect
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e5e7eb] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = currentScreen === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`text-left text-xs font-bold tracking-wider uppercase py-2.5 px-3 rounded-md transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-teal-50 text-[#0d9488] border-l-4 border-[#0d9488]'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 bg-[#0d9488] rotate-45" />}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#e5e7eb] flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenIVSim();
                }}
                className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5"
              >
                <Activity className="w-4 h-4 text-[#0d9488]" />
                <span>IV Simulator</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenECGSim();
                }}
                className="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#0d9488]" />
                <span>ECG Monitor</span>
              </button>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 bg-[#0d9488] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#0f766e] transition-colors text-center"
            >
              Connect with Leadership Team
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
