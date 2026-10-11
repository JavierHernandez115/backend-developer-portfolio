export type SystemCategory = 'ALL' | 'STREAMING' | 'CONSENSUS' | 'EDGE & PROXY' | 'FINANCIAL ENGINE';

export interface TechItem {
  name: string;
  percentage: number;
  color: string;
  detail?: string;
}

export interface SystemCase {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: SystemCategory;
  categoryTag: string;
  statusBadge: string;
  statusColor: string;
  description: string;
  architectureType: string;
  heroImage: string;
  technologies: TechItem[];
  rfcNumber: string;
  slaStatus: string;
  role: string;
  pattern: string;
  throughput: string;
  stackVersion: string;
  blueprintId: string;
  blueprintScale: string;
  phases: {
    phase: string;
    tech: string;
    title: string;
    description: string;
    metricLabel: string;
    metricValue: string;
  }[];
  deepDive: {
    problemTitle: string;
    problemDescription: string;
    problemImpacts: string[];
    decisionsTitle: string;
    decisionsIntro: string;
    decisions: {
      title: string;
      description: string;
    }[];
    faultToleranceTitle: string;
    faultToleranceIntro: string;
    faultToleranceItems: {
      title: string;
      description: string;
    }[];
  };
  specs: {
    identifier: string;
    deploymentEnv: string;
    partitionNodes: string;
    clusterTopology: string;
    compressionRatio: string;
    monitoring: string;
  };
  quote: {
    text: string;
    author: string;
    role: string;
    location: string;
  };
  liveMetrics: {
    totalMessagesDaily: string;
    avgLatencyP99: number; // e.g. 42.8 ms
    cpuUsage: number; // e.g. 14.2%
    availability: string; // e.g. 99.998%
    baseThroughput: number; // e.g. 1424987
  };
}
