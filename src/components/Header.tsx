import React from 'react';
import { useLang } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  currentView: 'portfolio' | 'case-study';
  onNavigateHome: () => void;
  onNavigateSystems: () => void;
  onOpenDialogue: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onNavigateSystems,
  onOpenDialogue,
}) => {
  const { t } = useLang();

  return (
    <header className="sticky top-0 z-50 bg-[#0c1017]/90 backdrop-blur-md border-b border-[#232d42]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Code/Location identity */}
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="font-bold text-cyan-400 group-hover:text-cyan-300 hidden sm:inline">{t.header.code}</span>
            <span className="font-bold text-cyan-400 group-hover:text-cyan-300 sm:hidden">LH</span>
            <span className="text-slate-600 hidden xl:inline">|</span>
            <span className="text-slate-400 hidden xl:inline tracking-wider">{t.header.location}</span>
          </button>
        </div>

        {/* Middle: Navigation links */}
        <nav className="flex items-center gap-2.5 sm:gap-8 text-[10px] sm:text-xs whitespace-nowrap">
          <button
            onClick={onNavigateHome}
            className={`transition-colors cursor-pointer ${
              currentView === 'portfolio' ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.header.nav01}
          </button>
          <button
            onClick={onNavigateSystems}
            className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {t.header.nav02}
          </button>
          <button
            onClick={onOpenDialogue}
            className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {t.header.nav03}
          </button>
        </nav>

        {/* Right: Language switch + availability badge */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={onOpenDialogue}
            className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#13281c] border border-emerald-500/30 text-emerald-400 hover:bg-[#1a3826] hover:border-emerald-400/50 transition-all cursor-pointer shadow-sm shadow-emerald-950/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
            <span className="font-sans text-[11px] font-medium tracking-wide">{t.header.available}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
