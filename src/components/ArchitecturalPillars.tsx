import React from 'react';

export const ArchitecturalPillars: React.FC = () => {
  return (
    <section className="py-16 md:py-20 border-b border-[#232d42] bg-[#090d14]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-xl bg-[#131924]/80 border border-[#232d42] p-8 md:p-12 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider">
            // ARCHITECTURAL PILLARS
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
            Zero Assumptions, Deterministic Degredation.
          </h2>

          <p className="text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
            I don't design for the sunny path. Systems are engineered with constant network jitter, split-brain scenarios, and sudden downstream slowness in mind. Circuit breakers, backpressure queues, and partitioned event boundaries are not afterthought add-ons; they are day-zero topology design.
          </p>
        </div>
      </div>
    </section>
  );
};
