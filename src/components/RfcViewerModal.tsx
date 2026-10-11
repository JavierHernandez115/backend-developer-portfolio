import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';
import { profile } from '../i18n/translations';

interface RfcViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfcNumber: string;
}

export const RfcViewerModal: React.FC<RfcViewerModalProps> = ({
  isOpen,
  onClose,
  rfcNumber,
}) => {
  const { t } = useLang();
  const r = t.rfc;
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(r.copyText(rfcNumber));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Generate text blob and trigger download
    const element = document.createElement('a');
    const file = new Blob([r.fileText(rfcNumber)], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${rfcNumber}_${r.fileSuffix}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#131924] border border-[#232d42] shadow-2xl overflow-hidden font-mono text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e131d] border-b border-[#232d42]">
          <div className="flex items-center gap-2 text-xs">
            <FileCode size={16} className="text-cyan-400" />
            <span className="text-white font-bold tracking-wider">{rfcNumber} {r.headerSuffix}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
              {r.ready}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1a2333] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* RFC Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed bg-[#0a0e15]/70">
          <div className="p-4 rounded-lg bg-[#0e131d] border border-[#232d42] space-y-2">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>{r.doc}: {rfcNumber}</span>
              <span>{r.classification}</span>
            </div>
            <div className="text-cyan-300 font-bold text-sm">{r.title}</div>
            <div className="text-slate-400 text-[11px]">
              {r.author} &lt;{profile.email}&gt;
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-cyan-400 font-bold uppercase tracking-wider">{r.s1}</h4>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">{r.s1p}</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-cyan-400 font-bold uppercase tracking-wider">{r.s2}</h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 font-sans text-xs">
              {r.s2li.map(([title, desc]) => (
                <li key={title}>
                  <strong>{title}</strong> {desc}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-cyan-400 font-bold uppercase tracking-wider">{r.s3}</h4>
            <div className="p-3 rounded bg-[#101520] border border-[#232d42] text-[11px] font-mono space-y-1 text-slate-300">
              {r.s3li.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e131d] border-t border-[#232d42]">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#18202e] text-slate-300 hover:text-white border border-[#2b3752] text-xs cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? r.copied : r.copy}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0c1017] text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              {downloadSuccess ? <CheckCircle2 size={14} /> : <Download size={14} />}
              <span>{downloadSuccess ? r.downloaded : r.download}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
