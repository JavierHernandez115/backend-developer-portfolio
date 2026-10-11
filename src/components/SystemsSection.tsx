import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SystemCase, SystemCategory } from '../types';
import { systemsList } from '../data/systemsData';

interface SystemsSectionProps {
  onSelectSystem: (system: SystemCase) => void;
}

export const SystemsSection: React.FC<SystemsSectionProps> = ({ onSelectSystem }) => {
  const [activeCategory, setActiveCategory] = useState<SystemCategory>('ALL');

  const categories: SystemCategory[] = [
    'ALL',
    'STREAMING',
    'CONSENSUS',
    'EDGE & PROXY',
    'FINANCIAL ENGINE',
  ];

  const filteredSystems =
    activeCategory === 'ALL'
      ? systemsList
      : systemsList.filter((sys) => sys.category === activeCategory);

  return (
    <section id="systems-section" className="py-16 md:py-24 border-b border-[#232d42] bg-[#0c1017]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#232d42]/60">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-cyan-400 font-semibold">// SECTION 02</span>
              <span className="text-slate-600">—</span>
              <span className="tracking-wider">PRODUCTION CASE FILES</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tight uppercase mt-2">
              SELECTED SYSTEMS
            </h2>
            
            <p className="text-sm font-mono text-slate-400 tracking-wider mt-1">
              / ARCHITECTURAL INDEX
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#182638] text-cyan-300 border border-cyan-500/50 shadow-sm'
                      : 'bg-[#131924] text-slate-400 border border-[#232d42] hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  [{cat}]
                </button>
              );
            })}
          </div>
        </div>

        {/* 2x2 Grid of System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          {filteredSystems.map((system) => (
            <div
              key={system.id}
              className="group relative flex flex-col justify-between rounded-xl bg-[#131924] border border-[#232d42] hover:border-[#384968] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-950/20"
            >
              <div>
                {/* Card Top Meta Bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#232d42] text-xs font-mono bg-[#0e131d]">
                  <span className="text-cyan-400 font-semibold tracking-wider">
                    {system.categoryTag}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: system.statusColor }}
                    ></span>
                    <span className="text-slate-300 tracking-wider text-[11px] font-medium">
                      {system.statusBadge}
                    </span>
                  </div>
                </div>

                {/* Card Image Banner */}
                <div
                  onClick={() => onSelectSystem(system)}
                  className="relative aspect-[16/9] w-full overflow-hidden bg-[#090d14] cursor-pointer"
                >
                  <img
                    src={system.heroImage}
                    alt={system.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131924] via-transparent to-transparent"></div>
                </div>

                {/* Content body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3
                      onClick={() => onSelectSystem(system)}
                      className="text-2xl font-sans font-bold text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      {system.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">
                      {system.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed font-sans line-clamp-3">
                    {system.description}
                  </p>

                  {/* Architecture metadata block */}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 uppercase tracking-wider text-[11px]">
                      ARQUITECTURA:
                    </span>
                    <span className="text-cyan-300 font-semibold bg-[#18202e] px-2.5 py-1 rounded border border-[#2b3752]">
                      {system.architectureType}
                    </span>
                  </div>

                  {/* Technologies bar */}
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400 text-[11px]">Tecnologías:</span>
                      <span className="text-slate-300 text-[11px]">
                        {system.technologies
                          .map((t) => `${t.name} (${t.percentage}%)`)
                          .join(' · ')}
                      </span>
                    </div>

                    {/* Progress bar stack */}
                    <div className="w-full h-2 rounded-full bg-[#18202e] border border-[#232d42] flex overflow-hidden">
                      {system.technologies.map((t, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: `${t.percentage}%`,
                            backgroundColor: t.color,
                          }}
                          className="h-full transition-all duration-500"
                          title={`${t.name}: ${t.percentage}%`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="px-6 py-4 border-t border-[#232d42] bg-[#0f141f]">
                <button
                  onClick={() => onSelectSystem(system)}
                  className="w-full flex items-center justify-between text-xs font-mono text-slate-300 group-hover:text-cyan-300 transition-colors cursor-pointer"
                >
                  <span className="font-semibold">
                    {system.id === 'telemetry-engine' ? 'Ver Arquitectura Completa' : 'Ver Detalle del Proyecto'}
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-cyan-400" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
