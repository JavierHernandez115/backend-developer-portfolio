import React, { useState } from 'react';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { HeroSection } from './components/HeroSection';
import { SystemsSection } from './components/SystemsSection';
import { SkillsSection } from './components/SkillsSection';
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
      
      {/* Floating language switcher (always visible) */}
      <div className="fixed bottom-5 right-5 z-50 rounded-full bg-[#0c1017]/70 backdrop-blur-md shadow-xl shadow-black/40">
        <LanguageSwitcher />
      </div>

      {/* Screen 1: Portfolio View */}
      {currentView === 'portfolio' ? (
        <main>
          <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

          <SkillsSection />

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
