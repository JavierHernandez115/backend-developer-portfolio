import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [roleType, setRoleType] = useState('Staff Engineer / Architect');
  const [stackFocus, setStackFocus] = useState<string[]>(['Golang', 'Apache Kafka', 'Distributed Systems']);
  const [message, setMessage] = useState(
    initialTopic ? `Hola Alex, me interesa conversar acerca del sistema ${initialTopic} y evaluar una oportunidad de liderazgo técnico.` : ''
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const availableStacks = ['Golang', 'Rust Tokio', 'Apache Kafka', 'Distributed Consensus', 'ClickHouse', 'Kubernetes', 'PCI-DSS Fintech'];

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
            <span className="text-cyan-400 font-bold tracking-wider">// INITIATE TECHNICAL DIALOGUE</span>
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
                Technical Brief Dispatched
              </h3>

              <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                Gracias, <span className="text-cyan-300 font-semibold">{name}</span>. He recibido tu consulta para <span className="text-white font-medium">{company || 'tu organización'}</span>. Revisaré los detalles de arquitectura y responderé a <span className="text-cyan-300 font-mono text-xs">{email}</span> en menos de 24 horas laborables.
              </p>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0c1017] font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  Volver al Espacio de Trabajo
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs font-mono text-slate-400">
                Canal directo para líderes de ingeniería, VPs y reclutadores que buscan roles de Staff, Principal o Arquitecto de Sistemas Distribuidos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Tu Nombre *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Elena Gómez"
                    className="w-full px-3 py-2 rounded bg-[#0a0e15] border border-[#232d42] text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Email Profesional *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@tech-scale.io"
                    className="w-full px-3 py-2 rounded bg-[#0a0e15] border border-[#232d42] text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Organización / Empresa</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Global High-Throughput Inc."
                    className="w-full px-3 py-2 rounded bg-[#0a0e15] border border-[#232d42] text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Tipo de Rol Objetivo</label>
                  <select
                    value={roleType}
                    onChange={(e) => setRoleType(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-[#0a0e15] border border-[#232d42] text-white text-sm focus:border-cyan-400 focus:outline-none font-mono"
                  >
                    <option value="Staff Engineer / Architect">Staff Software Engineer</option>
                    <option value="Principal Distributed Systems Architect">Principal Systems Architect</option>
                    <option value="Head of Infrastructure / Backend Lead">Head of Infrastructure / Backend Lead</option>
                    <option value="Specialized Technical Advisory">Specialized Architecture Advisory</option>
                  </select>
                </div>
              </div>

              {/* Stack selection tags */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Stack Tecnológico Relevante</label>
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
                <label className="block text-xs font-mono text-slate-300 mb-1">Mensaje / Contexto del Reto *</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe brevemente el volumen de eventos, el equipo o el problema de latencia..."
                  className="w-full px-3 py-2 rounded bg-[#0a0e15] border border-[#232d42] text-white text-sm focus:border-cyan-400 focus:outline-none font-sans"
                />
              </div>

              {/* Footer Buttons */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <ShieldCheck size={14} className="text-cyan-400" />
                  <span>Confidencialidad garantizada</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0c1017] font-mono text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    <Send size={13} />
                    <span>Enviar Brief Técnico</span>
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
