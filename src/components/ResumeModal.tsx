import React from 'react';
import { X, Download, Briefcase, Award, Terminal, Code2 } from 'lucide-react';

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
  if (!isOpen) return null;

  const handleDownloadCv = () => {
    const element = document.createElement('a');
    const file = new Blob(
      [
        `========================================================================\n` +
        `ALEX RIVERA — LEAD & STAFF DISTRIBUTED SYSTEMS ENGINEER\n` +
        `Location: Madrid, Spain / Global Remote | Email: alex.dev@ejemplo.com\n` +
        `GitHub: github.com/alexrivera | LinkedIn: linkedin.com/in/alex-rivera-dev\n` +
        `========================================================================\n\n` +
        `EXECUTIVE SUMMARY\n` +
        `Senior distributed systems and backend engineer with 7+ years architecting\n` +
        `mission-critical backbones in Go, Rust, Kafka, and Kubernetes. Specialized in\n` +
        `stream processing, Raft consensus, and sub-millisecond tail latency SLAs.\n\n` +
        `CORE COMPETENCIES\n` +
        `- High-Throughput Streaming: Apache Kafka, ClickHouse, eBPF, sync.Pool\n` +
        `- Consensus & State Machines: Raft Protocol, RocksDB LSM, Tokio, Tonic gRPC\n` +
        `- Edge & Routing: Envoy Proxy, Redis Cluster Lua, Sliding-window rate limiters\n` +
        `- Fintech Core: Event Sourcing, CQRS, Merkle Tree proofs, ACID isolation\n\n` +
        `EXPERIENCE HIGHLIGHTS\n` +
        `- Staff Backend Architect (2022 - Present): Led 1.4M ev/s telemetry platform\n` +
        `- Senior Systems Engineer (2019 - 2022): Built Raft distributed lease coordinator\n` +
        `- Infrastructure Engineer (2017 - 2019): Scaled Kubernetes and Envoy proxy mesh\n`
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = 'Alex_Rivera_Staff_Engineer_CV.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#131924] border border-[#232d42] shadow-2xl overflow-hidden font-sans text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e131d] border-b border-[#232d42]">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-cyan-400 font-bold tracking-wider">// ENGINEERING DOSSIER &amp; CV</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">ALEX RIVERA</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1a2333] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* CV Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-sm bg-[#0a0e15]/60">
          
          {/* Identity & Headline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232d42]">
            <div>
              <h3 className="text-2xl font-display font-bold text-white">Alex Rivera</h3>
              <p className="font-mono text-xs text-cyan-400 mt-0.5">
                Staff Distributed Systems &amp; Backend Engineer
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Madrid, Spain (Available On-site/Hybrid &amp; Global Distributed Remote)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadCv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0c1017] font-mono text-xs font-bold transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>

          {/* Core Technical Highlights */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <Terminal size={14} />
              <span>LOGROS DE PRODUCCIÓN A GRAN ESCALA</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-[#101520] border border-[#232d42]">
                <div className="font-mono text-lg font-bold text-white">1.4M+ ev/s</div>
                <div className="text-xs text-slate-400 mt-0.5">Throughput sostenido de telemetría IoT</div>
              </div>

              <div className="p-3 rounded-lg bg-[#101520] border border-[#232d42]">
                <div className="font-mono text-lg font-bold text-cyan-300">99.995% SLA</div>
                <div className="text-xs text-slate-400 mt-0.5">Disponibilidad en clústeres multirregión</div>
              </div>

              <div className="p-3 rounded-lg bg-[#101520] border border-[#232d42]">
                <div className="font-mono text-lg font-bold text-emerald-400">&lt; 1.1ms GC</div>
                <div className="text-xs text-slate-400 mt-0.5">Pausa STW con piscinas zero-alloc</div>
              </div>
            </div>
          </div>

          {/* Career Path */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
              <Briefcase size={14} />
              <span>TRAYECTORIA PROFESIONAL</span>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <div className="p-4 rounded-lg bg-[#101520] border border-[#232d42] space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="font-bold text-white">Lead &amp; Staff Backend Architect</span>
                  <span className="text-cyan-400">2021 — Presente</span>
                </div>
                <p className="text-slate-300">
                  Liderazgo de arquitectura para el pipeline de ingesta en Go y Kafka. Diseño del clúster de ClickHouse con compactaciones automáticas MergeTree y reducción del consumo de memoria en un 64%.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#101520] border border-[#232d42] space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="font-bold text-white">Senior Distributed Systems Engineer</span>
                  <span className="text-cyan-400">2019 — 2021</span>
                </div>
                <p className="text-slate-300">
                  Implementación de motor de consenso Raft en Rust Tokio con backend persistente en RocksDB para coordinación de leases y estados distribuidos.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#101520] border border-[#232d42] space-y-2">
                <div className="flex justify-between font-mono text-xs">
                  <span className="font-bold text-white">Backend &amp; Infrastructure Engineer</span>
                  <span className="text-cyan-400">2017 — 2019</span>
                </div>
                <p className="text-slate-300">
                  Operación de clústeres Kubernetes bare-metal, proxies Envoy, mallas de servicios gRPC y pipelines CI/CD automatizados.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e131d] border-t border-[#232d42]">
          <span className="text-xs font-mono text-slate-400">
            alex.dev@ejemplo.com • +34 600 000 000
          </span>

          <button
            onClick={() => {
              onClose();
              onInitiateDialogue();
            }}
            className="px-4 py-2 rounded-lg bg-[#18202e] hover:bg-[#222b3d] text-cyan-300 border border-cyan-500/40 text-xs font-mono font-semibold transition-colors cursor-pointer"
          >
            Iniciar Diálogo Directo
          </button>
        </div>

      </div>
    </div>
  );
};
