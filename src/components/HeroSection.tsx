import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { profile } from '../i18n/translations';

interface HeroSectionProps {
  onExploreSystems: () => void;
  onInitiateDialogue: () => void;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreSystems,
  onInitiateDialogue,
  onOpenResume,
}) => {
  const { t } = useLang();
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#232d42] overflow-hidden tech-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/3 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Core Pitch (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Super header */}
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-cyan-400 font-semibold tracking-wider">{t.hero.eyebrow}</span>
              <span className="text-slate-600">—</span>
              <span className="text-slate-400 tracking-wider">{t.hero.years}</span>
            </div>

            {/* Huge Name Headline */}
            <div className="space-y-1">
              <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[0.88] select-none">
                {profile.firstName}<br />
                {profile.lastName}
              </h1>
            </div>

            {/* Title / Role Subheading */}
            <div className="flex items-center gap-2 text-lg sm:text-xl font-mono text-cyan-400 font-medium">
              <span className="text-cyan-400">&gt;</span>
              <span>{t.hero.role}</span>
            </div>

            {/* Description Paragraphs */}
            <div className="space-y-4 text-slate-300 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
              <p className="text-slate-200 font-normal">
                {t.hero.p1}
              </p>
              
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {t.hero.p2a}{' '}
                <span className="inline-block px-1.5 py-0.5 rounded bg-[#18202e] border border-[#2b3752] text-cyan-300 font-mono text-xs sm:text-sm font-semibold mx-1">
                  {t.hero.pill1}
                </span>{' '}
                {t.hero.p2b}{' '}
                <span className="inline-block px-1.5 py-0.5 rounded bg-[#18202e] border border-[#2b3752] text-cyan-300 font-mono text-xs sm:text-sm font-semibold mx-1">
                  {t.hero.pill2}
                </span>
                {t.hero.p2c}
              </p>
            </div>

            {/* Core Stack in Production */}
            <div className="pt-2 space-y-2">
              <p className="text-[11px] font-mono tracking-widest uppercase text-slate-400 font-semibold">
                {t.hero.stackLabel}
              </p>
              <p className="font-mono text-xs sm:text-[13px] text-slate-300 leading-relaxed bg-[#101520]/80 p-3 rounded-lg border border-[#232d42]">
                {[
                  ['Java (Spring Boot)', 'text-orange-300 font-semibold'],
                  ['Python (Django)', 'text-cyan-300 font-semibold'],
                  ['PHP (Laravel)', 'text-red-300'],
                  ['React / Vue.js', 'text-sky-300'],
                  ['Docker', 'text-blue-300'],
                  ['Kubernetes', 'text-indigo-300'],
                  ['Jenkins', 'text-amber-300'],
                  ['PostgreSQL / MySQL', 'text-emerald-300'],
                  ['Git', 'text-purple-300'],
                ].map(([label, color], i, arr) => (
                  <React.Fragment key={label}>
                    <span className={color}>{label}</span>
                    {i < arr.length - 1 && <span className="text-slate-600 mx-2">/</span>}
                  </React.Fragment>
                ))}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onInitiateDialogue}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#152336] hover:bg-[#1a2f4a] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white font-mono text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-cyan-950/30 group cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform"></span>
                <span>{t.hero.contactBtn}</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform text-cyan-400" />
              </button>

              <button
                onClick={onExploreSystems}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#131924] hover:bg-[#1c2333] border border-[#232d42] hover:border-slate-600 text-slate-300 hover:text-white font-mono text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                <span>{t.hero.exploreBtn}</span>
                <ArrowDown size={14} className="text-slate-400" />
              </button>
            </div>

            {/* Social / Dossier links */}
            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-mono text-slate-400">
              <a
                href={`mailto:${profile.email}`}
                className="hover:text-cyan-300 transition-colors"
              >
                {t.hero.linkEmail}
              </a>
              <a
                href={profile.phoneHref}
                className="hover:text-cyan-300 transition-colors"
              >
                {t.hero.linkPhone}
              </a>
              <button
                onClick={onOpenResume}
                className="hover:text-cyan-300 transition-colors cursor-pointer"
              >
                {t.hero.linkCv}
              </button>
            </div>

          </div>

          {/* Right Column: Engineering Card with Portrait (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden bg-[#131924] border border-[#232d42] shadow-2xl group hover:border-[#384968] transition-all duration-300">
              
              {/* Top floating spec tag */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded bg-[#0a0e15]/85 backdrop-blur-md border border-[#232d42] text-[11px] font-mono text-slate-300 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="tracking-wider">{t.hero.cardTag}</span>
              </div>

              {/* Portrait image container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#0c1017]">
                <img
                  src="/src/assets/images/alex_rivera_portrait_1791751712976.jpg"
                  alt={t.hero.portraitAlt}
                  className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500 filter contrast-105"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle dark gradient scrim at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e15] via-[#0a0e15]/40 to-transparent"></div>
              </div>

              {/* Bottom overlay info */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-[#0a0e15]/90 backdrop-blur-md border-t border-[#232d42]/60 z-20">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-semibold block uppercase">
                      {t.hero.cardRole}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white tracking-wide mt-0.5">
                      {profile.firstName} {profile.lastName}
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 block uppercase">
                      {t.hero.cardCurrentLabel}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {t.hero.cardCurrentValue}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
