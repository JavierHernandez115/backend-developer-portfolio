import React from 'react';
import { Mail, Download, Phone } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { profile } from '../i18n/translations';
import { BrandIcon, GITHUB_PATH, LINKEDIN_PATH } from './BrandIcons';

interface CtaSectionProps {
  onInitiateDialogue: () => void;
  onDownloadCv: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onInitiateDialogue,
  onDownloadCv,
}) => {
  const { t } = useLang();

  return (
    <section className="py-20 md:py-28 border-b border-[#232d42] bg-[#0c1017] relative tech-grid-pattern overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">

        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#112519] border border-emerald-500/30 text-emerald-400 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
          <span className="tracking-wider">{t.cta.badge}</span>
        </div>

        {/* Big Bold Statement */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase max-w-4xl mx-auto leading-[1.05]">
          {t.cta.headline}
        </h2>

        {/* Paragraph */}
        <p className="text-slate-300 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {t.cta.text}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onInitiateDialogue}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0c1017] font-mono text-xs sm:text-sm font-bold transition-all shadow-lg shadow-cyan-500/25 cursor-pointer group"
          >
            <Mail size={16} className="text-[#0c1017]" />
            <span>{t.cta.contactBtn}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <button
            onClick={onDownloadCv}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#131924] hover:bg-[#1a2333] border border-[#232d42] hover:border-slate-500 text-slate-200 font-mono text-xs sm:text-sm font-medium transition-all cursor-pointer"
          >
            <Download size={16} className="text-slate-400" />
            <span>{t.cta.cvBtn}</span>
          </button>
        </div>

        {/* Contact links */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-cyan-300 transition-colors break-all"
          >
            {profile.email}
          </a>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <BrandIcon d={GITHUB_PATH} size={13} />
            <span>{t.hero.linkGithub}</span>
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <BrandIcon d={LINKEDIN_PATH} size={13} />
            <span>{t.hero.linkLinkedin}</span>
          </a>
          <a
            href={profile.phoneHref}
            className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <Phone size={12} />
            <span>{profile.phone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
