import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { profile } from '../i18n/translations';
import { BrandIcon, GITHUB_PATH, LINKEDIN_PATH } from './BrandIcons';

export const Footer: React.FC = () => {
  const { t } = useLang();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090d14] py-8 border-t border-[#232d42] text-xs font-mono text-slate-400">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <span>© {new Date().getFullYear()} Javier Hernández</span>
          <span className="text-slate-600 mx-2">/</span>
          <span className="text-slate-400">{t.footer.tagline}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>{t.footer.top}</span>
            <ArrowUp size={13} />
          </button>

          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <BrandIcon d={GITHUB_PATH} size={15} />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <BrandIcon d={LINKEDIN_PATH} size={15} />
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="text-slate-400 hover:text-cyan-300 transition-colors break-all"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </footer>
  );
};
