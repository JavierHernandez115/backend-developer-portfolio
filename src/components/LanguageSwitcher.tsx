import React from 'react';
import { Globe } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t.langSwitch.label}
      title={t.langSwitch.title}
      className="flex items-center gap-1 rounded-full bg-[#131924] border border-[#2b3752] p-0.5 font-mono text-[11px]"
    >
      <Globe size={12} className="ml-1.5 text-slate-400" />
      {(['es', 'en'] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-semibold ${
            lang === code
              ? 'bg-cyan-500 text-[#0c1017] shadow shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {t.langSwitch[code]}
        </button>
      ))}
    </div>
  );
};
