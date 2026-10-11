import React, { useEffect, useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

interface TechnicalDialogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export const TechnicalDialogueModal: React.FC<TechnicalDialogueModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
}) => {
  const { t } = useLang();
  const d = t.dialogue;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [stackFocus, setStackFocus] = useState<string[]>(['Java', 'Python', 'Docker']);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill the message each time the modal opens (or the language changes)
  useEffect(() => {
    if (isOpen) {
      setMessage(initialTopic ? d.defaultMessage(initialTopic) : '');
    }
  }, [isOpen, initialTopic, d]);

  if (!isOpen) return null;

  const availableStacks = ['Java', 'Spring Boot', 'Python', 'Django', 'PHP / Laravel', 'React', 'Vue.js', 'Docker', 'Kubernetes', 'Jenkins CI/CD'];

  const toggleStack = (tech: string) => {
    if (stackFocus.includes(tech)) {
      setStackFocus(stackFocus.filter((s) => s !== tech));
    } else {
      setStackFocus([...stackFocus, tech]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#131924] border border-[#232d42] shadow-2xl overflow-hidden font-sans text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e131d] border-b border-[#232d42]">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-400 font-bold tracking-wider">{d.header}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1a2333] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>

              <h3 className="text-xl font-display font-bold text-white">
                {d.sentTitle}
              </h3>

              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                {d.sentText(name, company, email)}
              </p>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0c1017] font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  {d.back}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs font-mono text-slate-400">
                {d.intro}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">{d.name}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={d.namePh}
                    className="w-full px-3 py-2 rounded bg-[#0a0e15] border border-[#232d42] text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">{d.email}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={d.emailPh}
                    className="w-full px-3 py-2 rounded bg-[#0a0e15] border border-[#232d42] text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">{d.company}</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={d.companyPh}
                    className="w-full px-3 py-2 rounded bg-[#0a0e15] border border-[#232d42] text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">{d.roleType}</label>
                  <select
                    value={roleIdx}
                    onChange={(e) => setRoleIdx(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded bg-[#0a0e15] border border-[#232d42] text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                  >
                    {d.roles.map((r, i) => (
                      <option key={r} value={i}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stack selection tags */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">{d.stack}</label>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {availableStacks.map((st) => {
                    const isSelected = stackFocus.includes(st);
                    return (
                      <button
                        type="button"
                        key={st}
                        onClick={() => toggleStack(st)}
                        className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-950/70 border border-cyan-400 text-cyan-300'
                            : 'bg-[#0a0e15] border border-[#232d42] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">{d.message}</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={d.messagePh}
                  className="w-full px-3 py-2 rounded bg-[#0a0e15] border border-[#232d42] text-white text-sm focus:border-cyan-400 focus:outline-none font-sans"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <ShieldCheck size={14} className="text-cyan-400" />
                  <span>{d.confidential}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {d.cancel}
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0c1017] font-mono text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    <Send size={13} />
                    <span>{d.send}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
