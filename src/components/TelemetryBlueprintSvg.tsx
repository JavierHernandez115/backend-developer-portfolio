import React, { useState } from 'react';
import { Play, Pause, ZoomIn, Info, ShieldCheck, Cpu } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

interface BlueprintSvgProps {
  systemTitle?: string;
  isLive?: boolean;
}

export const TelemetryBlueprintSvg: React.FC<BlueprintSvgProps> = ({
  systemTitle = 'Distributed Telemetry Engine Architecture',
  isLive = true,
}) => {
  const { t } = useLang();
  const b = t.blueprint;
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [animationActive, setAnimationActive] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const nodeDetails: Record<string, { title: string; tech: string; spec: string; latency: string; throughput: string }> = b.nodes;

  return (
    <div className="relative w-full bg-[#0a0e15] border border-[#232d42] rounded-lg overflow-hidden select-none">
      {/* Top bar of blueprint container */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#101520] border-b border-[#232d42] text-xs font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-semibold tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            diagrams/engine_distributed_stream.svg
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">{b.scale}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAnimationActive(!animationActive)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#18202e] hover:bg-[#232d42] text-slate-300 hover:text-cyan-300 border border-[#2b3752] transition-colors"
            title={b.toggleTitle}
          >
            {animationActive ? <Pause size={12} className="text-cyan-400" /> : <Play size={12} className="text-emerald-400" />}
            <span>{animationActive ? b.pauseStream : b.playStream}</span>
          </button>

          <button
            onClick={() => setZoomLevel(zoomLevel === 1 ? 1.25 : 1)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#18202e] hover:bg-[#232d42] text-slate-300 hover:text-cyan-300 border border-[#2b3752] transition-colors"
            title={b.zoomTitle}
          >
            <ZoomIn size={12} />
            <span>{zoomLevel === 1 ? 'Zoom 125%' : b.zoomReset}</span>
          </button>
        </div>
      </div>

      {/* SVG Container with subtle blueprint grid */}
      <div className="relative overflow-x-auto p-4 md:p-6 subtle-blueprint-grid bg-[#090d14]/90 min-h-[460px] flex items-center justify-center">
        <div
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center', transition: 'transform 0.25s ease' }}
          className="w-full max-w-[1100px]"
        >
          <svg
            viewBox="0 0 1100 520"
            className="w-full h-auto drop-shadow-xl font-mono text-xs"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Cyan gradient line */}
              <linearGradient id="streamCyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0.8" />
              </linearGradient>

              {/* Blue glowing filter */}
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Sub-header inside diagram */}
            <text x="30" y="32" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="0.05em">
              {systemTitle.toUpperCase()}
            </text>

            {/* Legend on top right */}
            <g transform="translate(680, 16)">
              <rect x="0" y="0" width="390" height="26" rx="4" fill="#131924" stroke="#232d42" />
              <circle cx="20" cy="13" r="4" fill="#38bdf8" />
              <text x="30" y="17" fill="#94a3b8" fontSize="10">Ingestion</text>

              <circle cx="110" cy="13" r="4" fill="#f59e0b" />
              <text x="120" y="17" fill="#94a3b8" fontSize="10">Kafka Stream</text>

              <circle cx="215" cy="13" r="4" fill="#ec4899" />
              <text x="225" y="17" fill="#94a3b8" fontSize="10">ClickHouse</text>

              <circle cx="310" cy="13" r="4" fill="#4ade80" />
              <text x="320" y="17" fill="#4ade80" fontSize="10">Data Flow</text>
            </g>

            {/* 1. SOURCES COLUMN */}
            <g
              transform="translate(30, 60)"
              onClick={() => setSelectedNode('sources')}
              className="cursor-pointer group"
            >
              <rect
                x="0"
                y="0"
                width="140"
                height="220"
                rx="6"
                fill="#131924"
                stroke={selectedNode === 'sources' ? '#38bdf8' : '#232d42'}
                strokeWidth={selectedNode === 'sources' ? '2' : '1'}
                className="transition-colors group-hover:stroke-cyan-400"
              />
              <rect x="0" y="0" width="140" height="28" rx="6" fill="#1a2333" />
              <text x="12" y="19" fill="#38bdf8" fontWeight="bold" fontSize="11">SOURCES</text>

              {/* Source items */}
              <g transform="translate(12, 42)">
                <rect x="0" y="0" width="116" height="34" rx="4" fill="#0d121c" stroke="#20293a" />
                <text x="10" y="22" fill="#e2e8f0" fontSize="11">IoT Edge Fleet</text>
              </g>

              <g transform="translate(12, 88)">
                <rect x="0" y="0" width="116" height="34" rx="4" fill="#0d121c" stroke="#20293a" />
                <text x="10" y="22" fill="#e2e8f0" fontSize="11">K8s App Logs</text>
              </g>

              <g transform="translate(12, 134)">
                <rect x="0" y="0" width="116" height="34" rx="4" fill="#0d121c" stroke="#20293a" />
                <text x="10" y="22" fill="#e2e8f0" fontSize="11">OTel Metrics</text>
              </g>

              <g transform="translate(12, 180)">
                <rect x="0" y="0" width="116" height="28" rx="4" fill="#162030" stroke="#2b3b55" />
                <text x="8" y="18" fill="#38bdf8" fontSize="10">gRPC Protobuf</text>
              </g>
            </g>

            {/* Connecting paths from Sources to Ingestion */}
            <path d="M 170 120 L 230 120" stroke="#38bdf8" strokeWidth="2" strokeDasharray={animationActive ? '4 4' : 'none'} className={animationActive ? 'animate-pulse' : ''} />
            <path d="M 170 160 L 230 160" stroke="#38bdf8" strokeWidth="2" strokeDasharray={animationActive ? '4 4' : 'none'} />
            <polygon points="228,117 236,120 228,123" fill="#38bdf8" />
            <polygon points="228,157 236,160 228,163" fill="#38bdf8" />

            {/* 2. INGESTION TIER (Go 1.23 sync.Pool) */}
            <g
              transform="translate(240, 60)"
              onClick={() => setSelectedNode('ingestion')}
              className="cursor-pointer group"
            >
              <rect
                x="0"
                y="0"
                width="200"
                height="220"
                rx="6"
                fill="#131924"
                stroke={selectedNode === 'ingestion' ? '#38bdf8' : '#232d42'}
                strokeWidth={selectedNode === 'ingestion' ? '2' : '1'}
                className="transition-colors group-hover:stroke-cyan-400"
              />
              <rect x="0" y="0" width="200" height="28" rx="6" fill="#1a2333" />
              <text x="12" y="19" fill="#38bdf8" fontWeight="bold" fontSize="11">1. INGESTION TIER (Go)</text>

              <g transform="translate(12, 40)">
                <rect x="0" y="0" width="176" height="42" rx="4" fill="#0d121c" stroke="#223046" />
                <text x="10" y="18" fill="#e2e8f0" fontSize="11" fontWeight="bold">eBPF XDP Balancer</text>
                <text x="10" y="32" fill="#64748b" fontSize="9">L4 kernel-bypass dispatch</text>
              </g>

              <g transform="translate(12, 94)">
                <rect x="0" y="0" width="176" height="50" rx="4" fill="#0d121c" stroke="#223046" />
                <text x="10" y="18" fill="#38bdf8" fontSize="11" fontWeight="bold">sync.Pool Memory Pools</text>
                <text x="10" y="32" fill="#94a3b8" fontSize="10">Zero-alloc byte buffers</text>
                <text x="10" y="44" fill="#4ade80" fontSize="9">GC STW: &lt; 1.1ms</text>
              </g>

              <g transform="translate(12, 156)">
                <rect x="0" y="0" width="176" height="48" rx="4" fill="#0d121c" stroke="#223046" />
                <text x="10" y="18" fill="#f59e0b" fontSize="11" fontWeight="bold">Protobuf Validator</text>
                <text x="10" y="32" fill="#94a3b8" fontSize="10">MurmurHash3 Partition Key</text>
                <text x="10" y="43" fill="#64748b" fontSize="9">tenant_id:device_uuid</text>
              </g>
            </g>

            {/* Connecting paths to Kafka */}
            <path d="M 440 140 L 500 140" stroke="#f59e0b" strokeWidth="2.5" />
            <polygon points="498,136 508,140 498,144" fill="#f59e0b" />

            {/* 3. KAFKA CLUSTER */}
            <g
              transform="translate(510, 60)"
              onClick={() => setSelectedNode('kafka')}
              className="cursor-pointer group"
            >
              <rect
                x="0"
                y="0"
                width="240"
                height="220"
                rx="6"
                fill="#131924"
                stroke={selectedNode === 'kafka' ? '#f59e0b' : '#232d42'}
                strokeWidth={selectedNode === 'kafka' ? '2' : '1'}
                className="transition-colors group-hover:stroke-amber-400"
              />
              <rect x="0" y="0" width="240" height="28" rx="6" fill="#201a14" />
              <text x="12" y="19" fill="#f59e0b" fontWeight="bold" fontSize="11">2. KAFKA BROKER CLUSTER</text>

              {/* Partitions */}
              <g transform="translate(12, 40)">
                <rect x="0" y="0" width="216" height="34" rx="4" fill="#18130d" stroke="#3b2b1a" />
                <text x="10" y="17" fill="#fbbf24" fontSize="10" fontWeight="bold">Topic: telemetry.raw.v1</text>
                <text x="10" y="28" fill="#94a3b8" fontSize="9">Partition 00..07 • NVMe Log Segments</text>
              </g>

              <g transform="translate(12, 82)">
                <rect x="0" y="0" width="216" height="34" rx="4" fill="#18130d" stroke="#3b2b1a" />
                <text x="10" y="17" fill="#fbbf24" fontSize="10" fontWeight="bold">Topic: telemetry.raw.v1</text>
                <text x="10" y="28" fill="#94a3b8" fontSize="9">Partition 08..15 • NVMe Log Segments</text>
              </g>

              <g transform="translate(12, 124)">
                <rect x="0" y="0" width="216" height="34" rx="4" fill="#18130d" stroke="#3b2b1a" />
                <text x="10" y="17" fill="#fbbf24" fontSize="10" fontWeight="bold">Topic: telemetry.raw.v1</text>
                <text x="10" y="28" fill="#94a3b8" fontSize="9">Partition 16..23 • NVMe Log Segments</text>
              </g>

              <g transform="translate(12, 168)">
                <rect x="0" y="0" width="216" height="40" rx="4" fill="#101726" stroke="#25354e" />
                <text x="10" y="18" fill="#38bdf8" fontSize="10" fontWeight="bold">KRaft Controller Nodes (3x)</text>
                <text x="10" y="32" fill="#64748b" fontSize="9">Zero ZooKeeper dependency • 850 MB/s</text>
              </g>
            </g>

            {/* Connecting to Consumers */}
            <path d="M 750 140 L 810 140" stroke="#ec4899" strokeWidth="2.5" />
            <polygon points="808,136 818,140 808,144" fill="#ec4899" />

            {/* 4. CONSUMER FLEET & MICRO-BATCHING */}
            <g
              transform="translate(820, 60)"
              onClick={() => setSelectedNode('consumers')}
              className="cursor-pointer group"
            >
              <rect
                x="0"
                y="0"
                width="250"
                height="220"
                rx="6"
                fill="#131924"
                stroke={selectedNode === 'consumers' ? '#ec4899' : '#232d42'}
                strokeWidth={selectedNode === 'consumers' ? '2' : '1'}
                className="transition-colors group-hover:stroke-pink-400"
              />
              <rect x="0" y="0" width="250" height="28" rx="6" fill="#25121e" />
              <text x="12" y="19" fill="#ec4899" fontWeight="bold" fontSize="11">CONSUMER THREAD POOL (Go)</text>

              <g transform="translate(12, 40)">
                <rect x="0" y="0" width="226" height="48" rx="4" fill="#0d121c" stroke="#251624" />
                <text x="10" y="18" fill="#e2e8f0" fontSize="10" fontWeight="bold">Micro-Batching Engine</text>
                <text x="10" y="32" fill="#94a3b8" fontSize="9">Threshold: 65,536 rows OR 400ms</text>
                <text x="10" y="43" fill="#ec4899" fontSize="9">Prevents "Too Many Parts"</text>
              </g>

              <g transform="translate(12, 98)">
                <rect x="0" y="0" width="226" height="50" rx="4" fill="#0d121c" stroke="#251624" />
                <text x="10" y="18" fill="#4ade80" fontSize="10" fontWeight="bold">Strict Manual Offset Commit</text>
                <text x="10" y="32" fill="#94a3b8" fontSize="9">Commit ONLY after HTTP 200 OK</text>
                <text x="10" y="44" fill="#64748b" fontSize="9">At-least-once delivery guarantee</text>
              </g>

              <g transform="translate(12, 158)">
                <rect x="0" y="0" width="226" height="48" rx="4" fill="#0d121c" stroke="#251624" />
                <text x="10" y="18" fill="#a855f7" fontSize="10" fontWeight="bold">ReplacingMergeTree Deduplication</text>
                <text x="10" y="32" fill="#64748b" fontSize="9">Composite PK: uuid + timestamp_nano</text>
              </g>
            </g>

            {/* FLOW DOWN TO CLICKHOUSE STORAGE CLUSTER */}
            <path d="M 945 280 L 945 330 L 700 330" stroke="#ec4899" strokeWidth="2.5" />
            <polygon points="702,326 692,330 702,334" fill="#ec4899" />

            {/* 5. CLICKHOUSE STORAGE CLUSTER */}
            <g
              transform="translate(180, 310)"
              onClick={() => setSelectedNode('clickhouse')}
              className="cursor-pointer group"
            >
              <rect
                x="0"
                y="0"
                width="500"
                height="190"
                rx="6"
                fill="#131924"
                stroke={selectedNode === 'clickhouse' ? '#4ade80' : '#232d42'}
                strokeWidth={selectedNode === 'clickhouse' ? '2' : '1'}
                className="transition-colors group-hover:stroke-emerald-400"
              />
              <rect x="0" y="0" width="500" height="28" rx="6" fill="#12251a" />
              <text x="14" y="19" fill="#4ade80" fontWeight="bold" fontSize="11">3. CLICKHOUSE OLAP STORAGE CLUSTER (3 Shards x 2 Replicas)</text>

              {/* Shard 1, 2, 3 boxes */}
              <g transform="translate(14, 40)">
                <rect x="0" y="0" width="146" height="74" rx="4" fill="#0c1811" stroke="#1f422b" />
                <text x="10" y="18" fill="#4ade80" fontSize="10" fontWeight="bold">Shard 1 (NVMe)</text>
                <text x="10" y="32" fill="#94a3b8" fontSize="9">Replica A (Primary)</text>
                <text x="10" y="46" fill="#64748b" fontSize="9">Replica B (Sync)</text>
                <text x="10" y="62" fill="#38bdf8" fontSize="9">ReplacingMergeTree</text>
              </g>

              <g transform="translate(176, 40)">
                <rect x="0" y="0" width="146" height="74" rx="4" fill="#0c1811" stroke="#1f422b" />
                <text x="10" y="18" fill="#4ade80" fontSize="10" fontWeight="bold">Shard 2 (NVMe)</text>
                <text x="10" y="32" fill="#94a3b8" fontSize="9">Replica A (Primary)</text>
                <text x="10" y="46" fill="#64748b" fontSize="9">Replica B (Sync)</text>
                <text x="10" y="62" fill="#38bdf8" fontSize="9">ReplacingMergeTree</text>
              </g>

              <g transform="translate(338, 40)">
                <rect x="0" y="0" width="146" height="74" rx="4" fill="#0c1811" stroke="#1f422b" />
                <text x="10" y="18" fill="#4ade80" fontSize="10" fontWeight="bold">Shard 3 (NVMe)</text>
                <text x="10" y="32" fill="#94a3b8" fontSize="9">Replica A (Primary)</text>
                <text x="10" y="46" fill="#64748b" fontSize="9">Replica B (Sync)</text>
                <text x="10" y="62" fill="#38bdf8" fontSize="9">ReplacingMergeTree</text>
              </g>

              {/* Aggregation & Compression stats */}
              <g transform="translate(14, 126)">
                <rect x="0" y="0" width="470" height="50" rx="4" fill="#09120c" stroke="#173420" />
                <text x="12" y="20" fill="#e2e8f0" fontSize="10" fontWeight="bold">
                  Background Merge Engine &amp; ZSTD Compression (Ratio: 8.4x)
                </text>
                <text x="12" y="36" fill="#94a3b8" fontSize="9">
                  {b.svgAgg}
                </text>
              </g>
            </g>

            {/* QUERY & ANALYTICS LAYER */}
            <g transform="translate(720, 310)">
              <rect x="0" y="0" width="350" height="190" rx="6" fill="#131924" stroke="#232d42" />
              <rect x="0" y="0" width="350" height="28" rx="6" fill="#18202e" />
              <text x="14" y="19" fill="#38bdf8" fontWeight="bold" fontSize="11">4. ANALYTICS &amp; QUERY LAYER</text>

              <g transform="translate(14, 40)">
                <rect x="0" y="0" width="322" height="60" rx="4" fill="#0d121c" stroke="#223046" />
                <text x="12" y="20" fill="#e2e8f0" fontSize="10" fontWeight="bold">Real-Time Grafana Dashboards &amp; Alerting</text>
                <text x="12" y="36" fill="#94a3b8" fontSize="9">{b.svgSlicing}</text>
                <text x="12" y="50" fill="#4ade80" fontSize="9">{b.svgQps}</text>
              </g>

              <g transform="translate(14, 112)">
                <rect x="0" y="0" width="322" height="64" rx="4" fill="#0d121c" stroke="#223046" />
                <text x="12" y="20" fill="#fbbf24" fontSize="10" fontWeight="bold">Automated Anomaly Detector (eBPF Probes)</text>
                <text x="12" y="36" fill="#94a3b8" fontSize="9">{b.svgOutliers}</text>
                <text x="12" y="50" fill="#38bdf8" fontSize="9">{b.svgPager}</text>
              </g>
            </g>

            {/* Connecting arrow from ClickHouse to Analytics */}
            <path d="M 680 405 L 720 405" stroke="#38bdf8" strokeWidth="2.5" />
            <polygon points="718,401 728,405 718,409" fill="#38bdf8" />
          </svg>
        </div>
      </div>

      {/* Selected Node Inspector Drawer / Card */}
      {selectedNode && (
        <div className="p-4 bg-[#131924] border-t border-cyan-500/40 animate-fadeIn text-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-cyan-500/10 text-cyan-400">
                <Info size={16} />
              </span>
              <div>
                <h4 className="font-mono text-cyan-300 font-bold">{nodeDetails[selectedNode]?.title}</h4>
                <p className="text-xs text-slate-400 font-mono">{nodeDetails[selectedNode]?.tech}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-[#1c2333]"
            >
              {b.close}
            </button>
          </div>

          <p className="text-slate-300 text-xs mt-2 font-mono leading-relaxed">
            {nodeDetails[selectedNode]?.spec}
          </p>

          <div className="flex flex-wrap gap-4 mt-3 pt-2 border-t border-[#232d42] text-xs font-mono">
            <span className="text-slate-400">
              {b.latencyMetric} <span className="text-emerald-400 font-semibold">{nodeDetails[selectedNode]?.latency}</span>
            </span>
            <span className="text-slate-400">
              {b.effectiveThroughput} <span className="text-cyan-400 font-semibold">{nodeDetails[selectedNode]?.throughput}</span>
            </span>
          </div>
        </div>
      )}

      {/* Blueprint Legend Footer */}
      <div className="px-4 py-2 bg-[#0d121c] border-t border-[#232d42] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-slate-400">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>{b.footerVerified}</span>
        </span>
        <span className="text-slate-400">{b.footerHint}</span>
      </div>
    </div>
  );
};
