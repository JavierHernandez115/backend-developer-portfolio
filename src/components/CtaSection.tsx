import React from 'react';
import { Mail, Download } from 'lucide-react';

interface CtaSectionProps {
  onInitiateDialogue: () => void;
  onDownloadCv: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onInitiateDialogue,
  onDownloadCv,
}) => {
  return (
    <section className="py-20 md:py-28 border-b border-[#232d42] bg-[#0c1017] relative tech-grid-pattern overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#112519] border border-emerald-500/30 text-emerald-400 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
          <span className="tracking-wider">AVAILABLE FOR STAFF, PRINCIPAL &amp; SENIOR ARCHITECT ROLES</span>
        </div>

        {/* Big Bold Statement */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase max-w-4xl mx-auto leading-[1.05]">
          Seeking an architect who treats stability &amp; tail latency as foundational constraints?
        </h2>

        {/* Paragraph */}
        <p className="text-slate-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Currently evaluating roles in high-throughput infrastructure, fintech backends, and distributed streaming engines. Open to Madrid on-site/hybrid and distributed remote global organizations.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onInitiateDialogue}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0c1017] font-mono text-xs sm:text-sm font-bold transition-all shadow-lg shadow-cyan-500/25 cursor-pointer group"
          >
            <Mail size={16} className="text-[#0c1017]" />
            <span>Initiate Technical Dialogue</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            onClick={onDownloadCv}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#131924] hover:bg-[#1a2333] border border-[#232d42] hover:border-slate-500 text-slate-200 font-mono text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            <Download size={16} className="text-slate-400" />
            <span>Download Engineering CV (PDF)</span>
          </button>
        </div>

        {/* Social / contact links */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            // github.com/alexrivera
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-300 transition-colors"
          >
            // linkedin.com/in/alex-rivera-dev
          </a>
          <a
            href="mailto:alex.dev@ejemplo.com"
            className="hover:text-cyan-300 transition-colors"
          >
            // alex.dev@ejemplo.com
          </a>
        </div>

      </div>
    </section>
  );
};
