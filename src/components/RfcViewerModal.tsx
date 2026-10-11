import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode, CheckCircle2 } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`RFC ARCHITECTURAL SPECIFICATION: ${rfcNumber}\nSystem: Telemetry Engine v2.4\nStatus: APPROVED FOR PRODUCTION\nAuthor: Alex Rivera <alex.dev@ejemplo.com>`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Generate text blob and trigger download
    const element = document.createElement('a');
    const file = new Blob(
      [
        `========================================================================\n` +
        `RFC: ${rfcNumber} - DISTRIBUTED STREAMING TELEMETRY ENGINE\n` +
        `Author: Alex Rivera (Staff Distributed Systems Engineer)\n` +
        `Target SLA: 99.995% Uptime | Peak Throughput: 1.4M ev/s | Latency: p99 < 45ms\n` +
        `========================================================================\n\n` +
        `1. ABSTRACT\n` +
        `This specification defines the architectural blueprint for horizontally\n` +
        `partitioned ingestion and time-series condensations across hybrid clouds.\n\n` +
        `2. INGESTION TOPOLOGY\n` +
        `- Transport: gRPC over HTTP/2, Protobuf v3 schemas.\n` +
        `- Kernel Bypass: eBPF XDP layer for wire-speed L4 packet routing.\n` +
        `- Memory Allocation: Zero-allocation sync.Pool buffers; STW pauses < 1.1ms.\n\n` +
        `3. PARTITIONING & BROKERING\n` +
        `- Broker: Apache Kafka in KRaft mode (24 physical partitions).\n` +
        `- Partition Key: murmur3(tenant_id:device_uuid).\n` +
        `- Storage: ReplacingMergeTree in ClickHouse with ZSTD lv3 compression.\n\n` +
        `4. INVARIANT VERIFICATION\n` +
        `- State Linearizability: Verified via TLA+ model checking.\n` +
        `- Fault Injection: ChaosMesh network split survival confirmed.\n`
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `${rfcNumber}_Architecture_Specification.txt`;
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
            <span className="text-white font-bold tracking-wider">{rfcNumber} // ARCHITECTURE SPECIFICATION</span>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
              PROD_READY
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
              <span>Document: {rfcNumber}</span>
              <span>Classification: Architecture Standard</span>
            </div>
            <div className="text-cyan-300 font-bold text-sm">
              RFC: Distributed Streaming Telemetry Engine &amp; Real-Time Aggregator
            </div>
            <div className="text-slate-400 text-[11px]">
              Author: Alex Rivera &lt;alex.dev@ejemplo.com&gt; • Staff Distributed Systems Specialist
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-cyan-400 font-bold uppercase tracking-wider">1. Resumen Ejecutivo (Abstract)</h4>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              Este documento formaliza la topología de streaming para el procesamiento de alta concurrencia de telemetría IoT y métricas de infraestructura. La meta de diseño es asegurar una tasa sostenida de 1.4 millones de eventos por segundo con latencias p99 inferiores a 45 milisegundos bajo fallos estocásticos de infraestructura.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-cyan-400 font-bold uppercase tracking-wider">2. Invariantes Arquitectónicas</h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300 font-sans text-xs">
              <li><strong>Zero-Allocation Memory Ingestion:</strong> Ningún datagrama gRPC creará alocaciones en el heap de Go fuera de los buffers de `sync.Pool`.</li>
              <li><strong>Particionado Determinista:</strong> El balanceador de partición de Kafka utiliza MurmurHash3 sobre `tenant_id:device_uuid` para asegurar el orden estricto de eventos por dispositivo.</li>
              <li><strong>Semántica At-Least-Once con Deduplicación:</strong> Los offsets se confirman únicamente tras HTTP 200 de ClickHouse con motor `ReplacingMergeTree`.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-cyan-400 font-bold uppercase tracking-wider">3. Benchmarks de Laboratorio (Stress Suite)</h4>
            <div className="p-3 rounded bg-[#101520] border border-[#232d42] text-[11px] font-mono space-y-1 text-slate-300">
              <p>• Throughput pico alcanzado: 1,840,210 ev/s (Cluster 6 brokers NVMe)</p>
              <p>• Latencia media p99: 42.8 ms (Red transatlántica Frankfurt-Virginia)</p>
              <p>• Tasa de compresión columnar: 8.4x (ZSTD lv3 en ClickHouse)</p>
              <p>• Pausas de Garbage Collector (Go STW): &lt; 1.1 ms (92% de reducción frente a serializador JSON)</p>
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
            <span>{copied ? 'Copiado al Portapapeles' : 'Copiar Cita RFC'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0c1017] text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              {downloadSuccess ? <CheckCircle2 size={14} /> : <Download size={14} />}
              <span>{downloadSuccess ? 'Descargado!' : 'Descargar RFC Completo (PDF/TXT)'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
