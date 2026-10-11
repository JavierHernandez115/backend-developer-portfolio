import React from 'react';
import { X, Download, Briefcase, GraduationCap, Terminal, Code2, Languages, Sparkles } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { profile } from '../i18n/translations';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInitiateDialogue: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  onInitiateDialogue,
}) => {
  const { t } = useLang();
  if (!isOpen) return null;

  const cv = t.cv;

  const handleDownloadCv = () => {
    const line = '========================================================================\n';
    const text =
      line +
      `${profile.fullName.toUpperCase()}\n` +
      `${cv.headline}\n` +
      `${profile.phone} | ${profile.email} | ${cv.location}\n` +
      line +
      '\n' +
      `${t.resume.summaryTitle}\n${cv.summary}\n\n` +
      `${t.resume.experienceTitle}\n` +
      cv.experience
        .map(
          (job) =>
            `\n${job.role} | ${job.company} | ${job.period}\n` +
            job.bullets.map((b) => `  - ${b}`).join('\n') +
            '\n'
        )
        .join('') +
      `\n${t.resume.educationTitle}\n` +
      cv.education.map((e) => `${e.degree}\n${e.school} | ${e.period}`).join('\n') +
      `\n\n${t.resume.skillsTitle}\n` +
      cv.skills.map((s) => `${s.label}: ${s.value}`).join('\n') +
      `\n\n${t.resume.languagesTitle}\n` +
      cv.languages.map((l) => `${l.label}: ${l.value}`).join('\n') +
      `\n\n${t.resume.competenciesTitle}\n` +
      cv.competencies.join(' • ') +
      '\n';

    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = t.resume.fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  const SectionTitle: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
      {icon}
      <span>{label}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#131924] border border-[#232d42] shadow-2xl overflow-hidden font-sans text-slate-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e131d] border-b border-[#232d42]">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-cyan-400 font-bold tracking-wider">{t.resume.headerTitle}</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">{profile.firstName} {profile.lastName}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1a2333] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* CV Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-7 text-sm bg-[#0a0e15]/60">

          {/* Identity & Headline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232d42]">
            <div>
              <h3 className="text-2xl font-display font-bold text-white">{profile.fullName}</h3>
              <p className="font-mono text-xs text-cyan-400 mt-0.5">{cv.headline}</p>
              <p className="text-xs text-slate-400 mt-1">
                {cv.location} • {profile.phone}
              </p>
            </div>

            <button
              onClick={handleDownloadCv}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0c1017] font-mono text-xs font-bold transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>{t.resume.download}</span>
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-3">
            <SectionTitle icon={<Terminal size={14} />} label={t.resume.summaryTitle} />
            <p className="text-xs text-slate-300 leading-relaxed">{cv.summary}</p>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <SectionTitle icon={<Briefcase size={14} />} label={t.resume.experienceTitle} />

            <div className="space-y-4 font-sans text-xs">
              {cv.experience.map((job) => (
                <div key={job.company} className="p-4 rounded-lg bg-[#101520] border border-[#232d42] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 font-mono text-xs">
                    <span className="font-bold text-white">
                      {job.role} <span className="text-slate-500">|</span> <span className="text-cyan-300">{job.company}</span>
                    </span>
                    <span className="text-cyan-400">{job.period}</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300">
                    {job.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono mt-0.5">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <SectionTitle icon={<GraduationCap size={14} />} label={t.resume.educationTitle} />
            {cv.education.map((e) => (
              <div key={e.degree} className="p-4 rounded-lg bg-[#101520] border border-[#232d42] text-xs space-y-1">
                <div className="font-bold text-white font-mono">{e.degree}</div>
                <div className="text-slate-300">
                  {e.school} <span className="text-slate-500">|</span> <span className="text-cyan-400 font-mono">{e.period}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <SectionTitle icon={<Code2 size={14} />} label={t.resume.skillsTitle} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cv.skills.map((s) => (
                <div key={s.label} className="p-3 rounded-lg bg-[#101520] border border-[#232d42]">
                  <div className="font-mono text-[11px] text-slate-400">{s.label}</div>
                  <div className="text-xs text-slate-200 mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-3">
            <SectionTitle icon={<Languages size={14} />} label={t.resume.languagesTitle} />
            <div className="flex flex-wrap gap-3 text-xs">
              {cv.languages.map((l) => (
                <div key={l.label} className="px-3 py-2 rounded-lg bg-[#101520] border border-[#232d42]">
                  <span className="font-mono font-bold text-white">{l.label}:</span>{' '}
                  <span className="text-slate-300">{l.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Competencies */}
          <div className="space-y-3">
            <SectionTitle icon={<Sparkles size={14} />} label={t.resume.competenciesTitle} />
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {cv.competencies.map((c) => (
                <span key={c} className="px-2.5 py-1 rounded bg-cyan-950/50 border border-cyan-500/30 text-cyan-300">
                  {c}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 bg-[#0e131d] border-t border-[#232d42]">
          <span className="text-xs font-mono text-slate-400 break-all">
            {profile.email} • {profile.phone}
          </span>

          <button
            onClick={() => {
              onClose();
              onInitiateDialogue();
            }}
            className="px-4 py-2 rounded-lg bg-[#18202e] hover:bg-[#222b3d] text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-colors cursor-pointer"
          >
            {t.resume.contactBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
