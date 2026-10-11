import React from 'react';

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
  return (
    <header className="sticky top-0 z-50 bg-[#0c1017]/90 backdrop-blur-md border-b border-[#232d42]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs font-mono">
        {/* Left: Code/Location identity */}
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="font-bold text-cyan-400 group-hover:text-cyan-300">AR//SYS.01</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 hidden sm:inline tracking-wider">MADRID / DISTRIBUTED GLOBAL</span>
          </button>
        </div>

        {/* Middle: Navigation links */}
        <nav className="flex items-center gap-4 sm:gap-8">
          <button
            onClick={onNavigateHome}
            className={`transition-colors cursor-pointer ${
              currentView === 'portfolio' ? 'text-cyan-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            // 01.INICIO
          </button>
          <button
            onClick={onNavigateSystems}
            className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            // 02.SYSTEMS
          </button>
          <button
            onClick={onOpenDialogue}
            className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            // 03.CONTACT
          </button>
        </nav>

        {/* Right: Availability badge */}
        <div className="flex items-center">
          <button
            onClick={onOpenDialogue}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#13281c] border border-emerald-500/30 text-emerald-400 hover:bg-[#1a3826] hover:border-emerald-400/50 transition-all cursor-pointer shadow-sm shadow-emerald-950/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
            <span className="font-sans text-[11px] font-medium tracking-wide">Available for Staff / Senior Roles</span>
          </button>
        </div>
      </div>
    </header>
  );
};
