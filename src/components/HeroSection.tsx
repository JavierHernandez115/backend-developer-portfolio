import React from 'react';
import { BrandIcon, GITHUB_PATH, LINKEDIN_PATH } from './BrandIcons';
import { Mail, Phone, FileText, ChevronRight, MapPin, GraduationCap, Briefcase, Languages } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { profile } from '../i18n/translations';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const { t } = useLang();
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 border-b border-[#232d42] overflow-hidden tech-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/3 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Bio & Core Pitch (7 cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Super header */}
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-cyan-400 font-semibold tracking-wider">{t.hero.eyebrow}</span>
              <span className="text-slate-600">—</span>
              <span className="text-slate-400 tracking-wider">{t.hero.years}</span>
            </div>

            {/* Huge Name Headline (scales with its container so it never clips) */}
            <div style={{ containerType: 'inline-size' }}>
              <h1
                className="font-display font-black tracking-tight text-white uppercase leading-[0.92] select-none whitespace-nowrap"
                style={{ fontSize: 'clamp(2.25rem, 7.4cqw, 5.5rem)' }}
              >
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


            {/* Quick facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-2xl">
              {[
                { Icon: MapPin, label: t.hero.infoLocation, lines: [t.cv.location] },
                {
                  Icon: GraduationCap,
                  label: t.hero.infoEducation,
                  lines: [t.cv.education[0].degree, `${t.cv.education[0].school} · ${t.cv.education[0].period}`],
                },
                {
                  Icon: Briefcase,
                  label: t.hero.infoExperience,
                  lines: [`${t.cv.experience[0].role} · ${t.cv.experience[0].company}`, t.cv.experience[0].period],
                },
                {
                  Icon: Languages,
                  label: t.hero.infoLanguages,
                  lines: t.cv.languages.map((l) => `${l.label} — ${l.value}`),
                },
              ].map(({ Icon, label, lines }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 rounded-lg bg-[#101520]/80 border border-[#232d42] hover:border-[#384968] transition-colors p-3.5"
                >
                  <span className="shrink-0 w-9 h-9 rounded-md bg-cyan-950/60 border border-cyan-500/25 flex items-center justify-center text-cyan-300">
                    <Icon size={17} />
                  </span>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-[10px] font-mono tracking-widest text-cyan-400 font-semibold">{label}</p>
                    {lines.map((line, i) => (
                      <p
                        key={i}
                        className={i === 0 ? 'text-sm text-slate-100 font-medium leading-snug' : 'text-xs text-slate-400 leading-snug'}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Portrait card with contact icons (6 cols) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[560px] group">
              {/* Offset accent frame */}
              <div className="absolute -inset-3 rounded-[28px] border border-cyan-500/20 pointer-events-none"></div>
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-cyan-400 rounded-tl-2xl pointer-events-none"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-cyan-400 rounded-br-2xl pointer-events-none"></div>

              <div className="relative rounded-2xl overflow-hidden bg-[#131924] border border-[#232d42] shadow-2xl shadow-cyan-950/30 group-hover:border-[#384968] transition-all duration-300">
                {/* Portrait */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0c1017]">
                  <img
                    src="/src/assets/images/alex_rivera_portrait_1791751712976.jpg"
                    alt={t.hero.portraitAlt}
                    className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 contrast-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e15]/60 via-transparent to-transparent"></div>

                  {/* Top tag */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a0e15]/80 backdrop-blur-md border border-emerald-500/30 text-[11px] font-mono">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
                    <span className="tracking-wider text-emerald-300 font-semibold">{t.hero.cardTag}</span>
                  </div>

                  {/* Contact accordion: the arrow travels to the right edge pulling the bar open; when it arrives it fades out. On leave it comes back from the right, folding the bar. */}
                  <div className="contact-bar absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
                    <div className="contact-icons flex h-full">
                      <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" title={t.hero.linkGithub} aria-label={t.hero.linkGithub} className="contact-cell flex-1 h-full flex items-center justify-center text-slate-100 hover:text-cyan-300 bg-white/[0.04] hover:bg-white/10 backdrop-blur-md border-t border-white/10 cursor-pointer" > <BrandIcon size={26} d={GITHUB_PATH} /> </a>
                      <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" title={t.hero.linkLinkedin} aria-label={t.hero.linkLinkedin} className="contact-cell flex-1 h-full flex items-center justify-center text-slate-100 hover:text-cyan-300 bg-white/[0.04] hover:bg-white/10 backdrop-blur-md border-t border-white/10 cursor-pointer" > <BrandIcon size={26} d={LINKEDIN_PATH} /> </a>
                      <a href={`mailto:${profile.email}`} title={t.hero.linkEmail} aria-label={t.hero.linkEmail} className="contact-cell flex-1 h-full flex items-center justify-center text-slate-100 hover:text-cyan-300 bg-white/[0.04] hover:bg-white/10 backdrop-blur-md border-t border-white/10 cursor-pointer" > <Mail size={26} /> </a>
                      <a href={profile.phoneHref} title={t.hero.linkPhone} aria-label={t.hero.linkPhone} className="contact-cell flex-1 h-full flex items-center justify-center text-slate-100 hover:text-cyan-300 bg-white/[0.04] hover:bg-white/10 backdrop-blur-md border-t border-white/10 cursor-pointer" > <Phone size={26} /> </a>
                      <button type="button" onClick={onOpenResume} title={t.hero.linkCv} aria-label={t.hero.linkCv} className="contact-cell flex-1 h-full flex items-center justify-center text-slate-100 hover:text-cyan-300 bg-white/[0.04] hover:bg-white/10 backdrop-blur-md border-t border-white/10 cursor-pointer" > <FileText size={26} /> </button>
                    </div>
                    <div className="contact-arrow absolute top-0 bottom-0 flex items-center justify-center bg-[#0e1420]/80 backdrop-blur-md border-t border-r border-white/10 text-cyan-300 rounded-tr-xl" aria-hidden="true">
                      <ChevronRight size={26} />
                    </div>
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
