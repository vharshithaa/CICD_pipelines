export interface PipelineMetrics {
  id: string;
  name: string;
  repository: string;
  branch: string;
  status: 'success' | 'failed' | 'running' | 'pending';
  startTime: Date;
  endTime?: Date;
  duration: number;
  testsPassed: number;
  testsFailed: number;
  codeQuality: number;
  coverage: number;
  buildSize: number;
  dependencies: number;
  commits: number;
  author: string;
  environment: string;
  previousFailures: number;
  avgDuration: number;
  failureRate: number;
}

export interface PredictionResult {
  pipelineId: string;
  failureProbability: number;   confidence: number;
  riskFactors: RiskFactor[];
  preventiveActions: PreventiveAction[];
  estimatedImpact: 'low' | 'medium' | 'high';
}

export interface RiskFactor {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high';
  weight: number;
  description: string;
  category: 'code' | 'environment' | 'dependencies' | 'performance';
}

export interface PreventiveAction {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  estimatedTime: string;
  category: 'code' | 'infrastructure' | 'testing' | 'monitoring';
  automated: boolean;
}

export interface TeamMetrics {
  teamName: string;
  totalBuilds: number;
  successRate: number;
  avgBuildTime: number;
  topContributors: string[];
  riskTrend: 'improving' | 'stable' | 'degrading';
}