import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    'EVENT-DRIVEN ARCHITECTURES',
    'HIGH-THROUGHPUT PIPELINES',
    'ZERO-TRUST API SERVICES',
    'SUB-MILLISECOND TAIL LATENCIES',
    'DETERMINISTIC FAULT DOMAINS',
    'DISTRIBUTED CONSENSUS RAFT',
  ];

  return (
    <div className="w-full bg-[#090d14] border-y border-[#232d42] py-3 overflow-hidden select-none">
      <div className="flex items-center gap-8 whitespace-nowrap text-xs font-mono tracking-widest text-slate-400">
        <div className="flex items-center gap-8 animate-[marquee_25s_linear_infinite]">
          {items.concat(items).map((text, idx) => (
            <React.Fragment key={idx}>
              <span className="text-slate-300 font-semibold tracking-wider hover:text-cyan-300 transition-colors">
                {text}
              </span>
              <span className="text-cyan-500/70 text-sm">❖</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
