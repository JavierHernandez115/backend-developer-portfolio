import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  FileText,
  Github,
  Mail,
  Activity,
  Layers,
  ChevronLeft,
  ChevronRight,
  Zap,
  Play,
  Pause,
  AlertTriangle,
} from 'lucide-react';
import { SystemCase } from '../types';
import { useSystems } from '../data/useSystems';
import { useLang } from '../i18n/LanguageContext';
import { profile } from '../i18n/translations';
import { TelemetryBlueprintSvg } from './TelemetryBlueprintSvg';

interface CaseStudyViewProps {
  system: SystemCase;
  onBack: () => void;
  onSelectOtherSystem: (sys: SystemCase) => void;
  onOpenDialogue: (topic?: string) => void;
  onOpenRfc: (rfcNumber: string) => void;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({
  system,
  onBack,
  onSelectOtherSystem,
  onOpenDialogue,
  onOpenRfc,
}) => {
  const { t } = useLang();
  const c = t.caseStudy;
  const systemsList = useSystems();
  // Live benchmark simulation state
  const [isSimulating, setIsSimulating] = useState(true);
  const [throughput, setThroughput] = useState(system.liveMetrics.baseThroughput);
  const [latencyP99, setLatencyP99] = useState(system.liveMetrics.avgLatencyP99);
  const [cpuUsage, setCpuUsage] = useState(system.liveMetrics.cpuUsage);
  const [isSpikeActive, setIsSpikeActive] = useState(false);

  // Live jitter effect
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      if (isSpikeActive) {
        // High spike load
        setThroughput(Math.floor(system.liveMetrics.baseThroughput * 2.8 + (Math.random() * 80000 - 40000)));
        setLatencyP99(Number((system.liveMetrics.avgLatencyP99 * 1.45 + (Math.random() * 3.5 - 1.5)).toFixed(1)));
        setCpuUsage(Number((system.liveMetrics.cpuUsage * 2.1 + (Math.random() * 2 - 1)).toFixed(1)));
      } else {
        // Normal state jitter
        setThroughput((prev) => Math.floor(system.liveMetrics.baseThroughput + (Math.random() * 12000 - 6000)));
        setLatencyP99((prev) => {
          const delta = (Math.random() * 0.6 - 0.3);
          const next = Number((system.liveMetrics.avgLatencyP99 + delta).toFixed(1));
          return Math.max(1, next);
        });
        setCpuUsage((prev) => {
          const delta = (Math.random() * 0.4 - 0.2);
          const next = Number((system.liveMetrics.cpuUsage + delta).toFixed(1));
          return Math.max(5, next);
        });
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [isSimulating, isSpikeActive, system]);

  const handleTriggerSpike = () => {
    setIsSpikeActive(true);
    setTimeout(() => {
      setIsSpikeActive(false);
    }, 6000);
  };

  // Find adjacent systems for pager
  const currentIndex = systemsList.findIndex((s) => s.id === system.id);
  const prevSystem = systemsList[(currentIndex - 1 + systemsList.length) % systemsList.length];
  const nextSystem = systemsList[(currentIndex + 1) % systemsList.length];

  return (
    <div className="min-h-screen bg-[#0c1017] text-[#dfe2ed] pb-24">
      
      {/* 1. Sub-nav Breadcrumb & Status bar */}
      <div className="bg-[#10141d] border-b border-[#232d42] sticky top-14 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex flex-wrap items-center justify-between text-xs font-mono gap-2">
          
          {/* Breadcrumb back */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors cursor-pointer group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>{c.back}</span>
            </button>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">{c.crumb}</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400 font-semibold">{system.code}</span>
          </div>

          {/* Right Status */}
          <div className="flex items-center gap-4 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-[#18202e] border border-[#2b3752] text-slate-300">
              {system.rfcNumber}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {system.slaStatus}
            </span>
          </div>

        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 space-y-12">
        
        {/* 2. Main Title & Stack Composition split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: System Title & Summary (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              <span>{c.architecture}</span>
              <span className="text-slate-600">•</span>
              <span>{system.kicker}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
              {system.title} <span className="text-slate-500 font-light">//</span> {system.subtitle}
            </h1>

            <p className="text-slate-300 font-sans text-base leading-relaxed max-w-3xl">
              {system.description}
            </p>

            {/* Badges / Metrics */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#131924] border border-[#232d42] text-slate-300">
                <span className="text-slate-400">{c.role}</span>
                <span className="text-cyan-300 font-semibold">{system.role}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#131924] border border-[#232d42] text-slate-300">
                <span className="text-slate-400">{c.pattern}</span>
                <span className="text-slate-200">{system.pattern}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#13281c] border border-emerald-500/30 text-emerald-400">
                <Activity size={14} className="text-emerald-400" />
                <span>{c.throughput}</span>
                <span className="font-bold">{system.throughput}</span>
              </div>
            </div>
          </div>

          {/* Right: Technical Stack Breakdown Box (4 cols) */}
          <div className="lg:col-span-4 rounded-xl bg-[#131924] border border-[#232d42] p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#232d42] font-mono text-xs">
              <span className="font-bold text-white tracking-wider">{c.stackTitle}</span>
              <span className="text-cyan-400">{system.stackVersion}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {system.technologies.map((tech, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-slate-200">{tech.name}</span>
                    <span className="text-cyan-300 font-semibold">{tech.percentage}%</span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 leading-tight">
                    {tech.detail || c.stackFallback}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Architectural Blueprint Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#232d42]">
            <div>
              <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider">
                {c.blueprintEyebrow}
              </div>
              <h2 className="text-2xl font-display font-bold text-white mt-1">
                {c.blueprintTitle(system.title)}
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="px-2 py-1 rounded bg-[#131924] border border-[#232d42] text-cyan-400 font-semibold">
                ID: {system.blueprintId}
              </span>
              <span className="text-emerald-400 font-medium">{c.clusterVerified}</span>
            </div>
          </div>

          {/* High-Fidelity Interactive Blueprint SVG */}
          <TelemetryBlueprintSvg systemTitle={system.title} isLive={isSimulating} />

          {/* Execution Phase Cards (3 phases) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {system.phases.map((phase, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#131924] border border-[#232d42] hover:border-cyan-500/40 p-5 space-y-3 transition-colors"
              >
                <div className="flex items-center justify-between font-mono text-xs pb-2 border-b border-[#232d42]">
                  <span className="text-cyan-400 font-bold tracking-wider">{phase.phase}</span>
                  <span className="text-slate-400">{phase.tech}</span>
                </div>

                <h4 className="text-base font-sans font-bold text-white">{phase.title}</h4>

                <p className="text-slate-400 text-xs font-sans leading-relaxed">
                  {phase.description}
                </p>

                <div className="pt-2 border-t border-[#232d42]/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 text-[11px]">{phase.metricLabel}:</span>
                  <span className="text-emerald-400 font-bold">{phase.metricValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Deep Dive Technical Grid (Problem, Decisions, Tolerance vs Specs & Quote) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          
          {/* Left Column: Detailed Engineering Narrative (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Section 01: El Problema */}
            <div className="rounded-xl bg-[#131924] border border-[#232d42] p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
                <FileText size={14} />
                <span>{system.deepDive.problemTitle}</span>
              </div>

              <h3 className="text-xl font-sans font-bold text-white">
                {system.problemHeading}
              </h3>

              <p className="text-slate-300 font-sans text-sm leading-relaxed">
                {system.deepDive.problemDescription}
              </p>

              <div className="pt-2 space-y-2">
                <p className="text-xs font-mono text-slate-300 font-semibold tracking-wide">
                  {c.impactTitle}
                </p>
                <ul className="space-y-2 text-xs font-sans text-slate-400">
                  {system.deepDive.problemImpacts.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-mono mt-0.5">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 02: Decisiones Clave */}
            <div className="rounded-xl bg-[#131924] border border-[#232d42] p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
                <Layers size={14} />
                <span>{system.deepDive.decisionsTitle}</span>
              </div>

              <h3 className="text-xl font-sans font-bold text-white">
                {system.decisionsHeading}
              </h3>

              <p className="text-slate-300 font-sans text-sm leading-relaxed">
                {system.deepDive.decisionsIntro}
              </p>

              <div className="space-y-3 pt-2">
                {system.deepDive.decisions.map((dec, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-[#0e131d] border border-[#232d42] space-y-1.5"
                  >
                    <h4 className="font-mono text-xs font-bold text-cyan-300">
                      {dec.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-sans leading-relaxed">
                      {dec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 03: Tolerancia a Fallos */}
            <div className="rounded-xl bg-[#131924] border border-[#232d42] p-6 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold">
                <Activity size={14} />
                <span>{system.deepDive.faultToleranceTitle}</span>
              </div>

              <p className="text-slate-300 font-sans text-sm leading-relaxed">
                {system.deepDive.faultToleranceIntro}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {system.deepDive.faultToleranceItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-[#0e131d] border border-[#232d42] space-y-1.5"
                  >
                    <h4 className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Spec Sheet, Quote & Pager (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Ficha Técnica del Sistema */}
            <div className="rounded-xl bg-[#131924] border border-[#232d42] p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#232d42] font-mono text-xs">
                <span className="font-bold text-white tracking-wider">{c.specTitle}</span>
                <span className="text-slate-400 text-sm">🗂️</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">{c.specIdentifier}</span>
                  <span className="text-cyan-300 font-bold">{system.specs.identifier}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">{c.specEnv}</span>
                  <span className="text-slate-200">{system.specs.deploymentEnv}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">{system.partitionLabel}</span>
                  <span className="text-slate-200">{system.specs.partitionNodes}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">{system.topologyLabel}</span>
                  <span className="text-slate-200">{system.specs.clusterTopology}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">{c.specCompression}</span>
                  <span className="text-emerald-400 font-bold">{system.specs.compressionRatio}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">{c.specMonitoring}</span>
                  <span className="text-slate-200">{system.specs.monitoring}</span>
                </div>
              </div>

              {/* Action buttons inside spec card */}
              <div className="pt-3 border-t border-[#232d42] space-y-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-[#18202e] hover:bg-[#202b3d] text-slate-300 hover:text-white font-mono text-xs border border-[#2b3752] transition-colors"
                >
                  <Github size={13} />
                  <span>{c.github}</span>
                </a>

                <button
                  onClick={() => onOpenRfc(system.rfcNumber)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-[#18202e] hover:bg-[#202b3d] text-slate-300 hover:text-white font-mono text-xs border border-[#2b3752] transition-colors cursor-pointer"
                >
                  <FileText size={13} className="text-cyan-400" />
                  <span>{c.rfc}</span>
                </button>

                <button
                  onClick={() => onOpenDialogue(system.title)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-[#152336] hover:bg-[#1a2f4a] text-cyan-300 hover:text-white font-mono text-xs border border-cyan-500/40 transition-colors cursor-pointer"
                >
                  <Mail size={13} className="text-cyan-400" />
                  <span>{c.talk}</span>
                </button>
              </div>
            </div>

            {/* Quote Card */}
            <div className="rounded-xl bg-[#131924] border border-[#232d42] p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center font-display font-bold text-cyan-300 text-sm">
                  {profile.initials}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">{system.quote.author}</h4>
                  <p className="font-mono text-[11px] text-cyan-400">{system.quote.role}</p>
                </div>
              </div>

              <blockquote className="font-sans text-xs text-slate-300 italic leading-relaxed pt-1">
                "{system.quote.text}"
              </blockquote>

              <p className="font-mono text-[11px] text-slate-400 pt-2 border-t border-[#232d42]">
                📍 {system.quote.location}
              </p>
            </div>

            {/* Navigation Pager between systems */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#131924] border border-[#232d42] font-mono text-xs">
              <button
                onClick={() => onSelectOtherSystem(prevSystem)}
                className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                title={c.pagerView(prevSystem.title)}
              >
                <ChevronLeft size={14} />
                <span>{prevSystem.code.slice(0, 7)}</span>
              </button>

              <span className="text-slate-400 text-[11px]">{c.pagerTitle}</span>

              <button
                onClick={() => onSelectOtherSystem(nextSystem)}
                className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                title={c.pagerView(nextSystem.title)}
              >
                <span>{nextSystem.code.slice(0, 7)}</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </div>

        </div>

        {/* 5. Live Telemetry & Benchmarking Bottom Panel */}
        <div className="rounded-xl bg-[#090d14] border border-cyan-500/30 p-6 space-y-5 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#232d42]">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-cyan-500/10 text-cyan-400">
                <Activity size={16} />
              </span>
              <span className="font-mono text-xs font-bold text-slate-200">
                {c.benchTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] font-bold">
                STRESS_TEST_PASS
              </span>
            </div>
          </div>

          {/* 4 Live Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 rounded-lg bg-[#131924] border border-[#232d42]">
              <span className="text-[11px] font-mono text-slate-400 block">{c.totalMessages}</span>
              <span className="text-lg md:text-xl font-mono font-bold text-white mt-1 block">
                {system.liveMetrics.totalMessagesDaily}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#131924] border border-[#232d42]">
              <span className="text-[11px] font-mono text-slate-400 block">{c.latency}</span>
              <span className="text-lg md:text-xl font-mono font-bold text-cyan-300 mt-1 block">
                {latencyP99} ms
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#131924] border border-[#232d42]">
              <span className="text-[11px] font-mono text-slate-400 block">{c.cpu(system.technologies[0].name)}</span>
              <span className="text-lg md:text-xl font-mono font-bold text-amber-300 mt-1 block">
                {cpuUsage}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#131924] border border-[#232d42]">
              <span className="text-[11px] font-mono text-slate-400 block">{c.availability}</span>
              <span className="text-lg md:text-xl font-mono font-bold text-emerald-400 mt-1 block">
                {system.liveMetrics.availability}
              </span>
            </div>
          </div>

          {/* Simulator Bar & Interactive triggers */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">
                {c.simulator}
              </span>
              <span className="text-cyan-300 font-bold bg-[#131924] px-2.5 py-1 rounded border border-[#232d42]">
                {throughput.toLocaleString()} ev/s
              </span>
              {isSpikeActive && (
                <span className="flex items-center gap-1 text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 text-[11px] animate-pulse">
                  <AlertTriangle size={12} />
                  <span>{c.spike}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleTriggerSpike}
                disabled={isSpikeActive}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-colors disabled:opacity-50 cursor-pointer"
                title={c.spikeTitle}
              >
                <Zap size={13} className="text-amber-400" />
                <span>{c.spikeBtn}</span>
              </button>

              <button
                onClick={() => setIsSimulating(!isSimulating)}
                className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#18202e] hover:bg-[#232d42] text-slate-300 border border-[#2b3752] transition-colors cursor-pointer"
              >
                {isSimulating ? <Pause size={13} /> : <Play size={13} className="text-emerald-400" />}
                <span>{isSimulating ? c.pause : c.resume}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
