/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, ModalType } from './types';
import {
  Header,
  Footer,
  TelemetryDock,
  HomeScreen,
  InnovationScreen,
  TeamScreen,
  ImpactScreen,
  SimulatorModal,
  ContactModal,
  PolicyModal,
} from './components';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd] text-[#1a1a1a] relative selection:bg-[#0d9488]/20 selection:text-[#0f766e]">
      
      {/* Top Fixed Navigation Bar */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenContact={() => setActiveModal('contact')}
        onOpenIVSim={() => setActiveModal('iv-simulator')}
        onOpenECGSim={() => setActiveModal('ecg-simulator')}
      />

      {/* Main Screen Content with Transitions */}
      <main className="flex-grow flex flex-col relative">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenIVSim={() => setActiveModal('iv-simulator')}
            onOpenECGSim={() => setActiveModal('ecg-simulator')}
            onOpenContact={() => setActiveModal('contact')}
          />
        )}

        {currentScreen === 'innovation' && (
          <InnovationScreen
            onOpenIVSim={() => setActiveModal('iv-simulator')}
            onOpenECGSim={() => setActiveModal('ecg-simulator')}
            onOpenContact={() => setActiveModal('contact')}
          />
        )}

        {currentScreen === 'team' && (
          <TeamScreen onOpenContact={() => setActiveModal('contact')} />
        )}

        {currentScreen === 'impact' && (
          <ImpactScreen
            onOpenContact={() => setActiveModal('contact')}
            onOpenIVSim={() => setActiveModal('iv-simulator')}
            onOpenECGSim={() => setActiveModal('ecg-simulator')}
          />
        )}
      </main>

      {/* Persistent Floating Quick-Access Telemetry Dock */}
      <TelemetryDock
        onOpenIVSim={() => setActiveModal('iv-simulator')}
        onOpenECGSim={() => setActiveModal('ecg-simulator')}
        onOpenContact={() => setActiveModal('contact')}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenModal={(modal) => setActiveModal(modal)}
      />

      {/* Modals */}
      {activeModal === 'contact' && (
        <ContactModal onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'iv-simulator' && (
        <SimulatorModal type="iv" onClose={() => setActiveModal(null)} />
      )}

      {activeModal === 'ecg-simulator' && (
        <SimulatorModal type="ecg" onClose={() => setActiveModal(null)} />
      )}

      {(activeModal === 'privacy' ||
        activeModal === 'terms' ||
        activeModal === 'grant' ||
        activeModal === 'safety') && (
        <PolicyModal type={activeModal} onClose={() => setActiveModal(null)} />
      )}

    </div>
  );
}
