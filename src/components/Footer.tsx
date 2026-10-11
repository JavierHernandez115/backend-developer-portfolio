import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090d14] py-8 border-t border-[#232d42] text-xs font-mono text-slate-400">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span>© 2025 Alex Rivera</span>
          <span className="text-slate-600 mx-2">/</span>
          <span className="text-slate-400">Distributed Cloud &amp; Microservices Architecture</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>Return to Top</span>
            <ArrowUp size={13} />
          </button>
          
          <a
            href="mailto:alex.dev@ejemplo.com"
            className="text-slate-400 hover:text-cyan-300 transition-colors"
          >
            alex.dev@ejemplo.com
          </a>
        </div>
      </div>
    </footer>
  );
};
