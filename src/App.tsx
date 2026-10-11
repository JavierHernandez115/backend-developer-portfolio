import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { SystemsSection } from './components/SystemsSection';
import { ArchitecturalPillars } from './components/ArchitecturalPillars';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { CaseStudyView } from './components/CaseStudyView';
import { TechnicalDialogueModal } from './components/TechnicalDialogueModal';
import { RfcViewerModal } from './components/RfcViewerModal';
import { ResumeModal } from './components/ResumeModal';
import { useSystems } from './data/useSystems';
import { SystemCase } from './types';
import { useLang } from './i18n/LanguageContext';
import { LayoutGrid, Cpu } from 'lucide-react';

export default function App() {
  const { t } = useLang();
  const systemsList = useSystems();
  const [currentView, setCurrentView] = useState<'portfolio' | 'case-study'>('portfolio');
  const [selectedId, setSelectedId] = useState<string>(systemsList[0].id);
  // Always derive from the localized list so the case study follows the active language
  const selectedSystem = systemsList.find((sys) => sys.id === selectedId) ?? systemsList[0];
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);
  const [dialogueTopic, setDialogueTopic] = useState('');
  const [isRfcOpen, setIsRfcOpen] = useState(false);
  const [rfcNumber, setRfcNumber] = useState('RFC-2023-09A');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleSelectSystem = (system: SystemCase) => {
    setSelectedId(system.id);
    setCurrentView('case-study');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSystems = () => {
    if (currentView !== 'portfolio') {
      setCurrentView('portfolio');
      setTimeout(() => {
        const el = document.getElementById('systems-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById('systems-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenDialogue = (topic = '') => {
    setDialogueTopic(topic);
    setIsDialogueOpen(true);
  };

  const handleOpenRfc = (rfcNum: string) => {
    setRfcNumber(rfcNum);
    setIsRfcOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0c1017] text-[#dfe2ed] selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* View Switcher Floating Pill for Quick Screen Toggling */}
      <div className="fixed bottom-5 right-5 z-40 bg-[#131924]/95 backdrop-blur-md border border-[#2b3752] rounded-full p-1.5 shadow-2xl flex items-center gap-1 font-mono text-xs">
        <button
          onClick={() => {
            setCurrentView('portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentView === 'portfolio'
              ? 'bg-cyan-500 text-[#0c1017] font-bold shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutGrid size={13} />
          <span>{t.floating.screen1}</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('case-study');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentView === 'case-study'
              ? 'bg-cyan-500 text-[#0c1017] font-bold shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Cpu size={13} />
          <span>{t.floating.screen2} {selectedSystem.code.slice(0, 7)}</span>
        </button>
      </div>

      {/* Global Header */}
      <Header
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigateSystems={handleNavigateSystems}
        onOpenDialogue={() => handleOpenDialogue()}
      />

      {/* Screen 1: Portfolio View */}
      {currentView === 'portfolio' ? (
        <main>
          <HeroSection
            onExploreSystems={handleNavigateSystems}
            onInitiateDialogue={() => handleOpenDialogue()}
            onOpenResume={() => setIsResumeOpen(true)}
          />

          <MarqueeTicker />

          <SystemsSection onSelectSystem={handleSelectSystem} />

          <ArchitecturalPillars />

          <CtaSection
            onInitiateDialogue={() => handleOpenDialogue()}
            onDownloadCv={() => setIsResumeOpen(true)}
          />

          <Footer />
        </main>
      ) : (
        /* Screen 2: Case Study Detailed View */
        <main>
          <CaseStudyView
            system={selectedSystem}
            onBack={handleNavigateHome}
            onSelectOtherSystem={(sys) => {
              setSelectedId(sys.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDialogue={handleOpenDialogue}
            onOpenRfc={handleOpenRfc}
          />
          <Footer />
        </main>
      )}

      {/* Modals */}
      <TechnicalDialogueModal
        isOpen={isDialogueOpen}
        onClose={() => setIsDialogueOpen(false)}
        initialTopic={dialogueTopic}
      />

      <RfcViewerModal
        isOpen={isRfcOpen}
        onClose={() => setIsRfcOpen(false)}
        rfcNumber={rfcNumber}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onInitiateDialogue={() => {
          setIsResumeOpen(false);
          setIsDialogueOpen(true);
        }}
      />

    </div>
  );
}
