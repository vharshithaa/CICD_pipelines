import { PipelineMetrics, PredictionResult, RiskFactor, PreventiveAction, TeamMetrics } from '../types/pipeline';

export const mockPipelines: PipelineMetrics[] = [
  {
    id: 'pipeline-1',
    name: 'Frontend Build',
    repository: 'web-app',
    branch: 'main',
    status: 'running',
    startTime: new Date(Date.now() - 5 * 60 * 1000),
    duration: 5,
    testsPassed: 124,
    testsFailed: 0,
    codeQuality: 8.5,
    coverage: 87,
    buildSize: 2.4,
    dependencies: 156,
    commits: 3,
    author: 'Sarah Chen',
    environment: 'production',
    previousFailures: 2,
    avgDuration: 7.2,
    failureRate: 0.12
  },
  {
    id: 'pipeline-2',
    name: 'Backend API',
    repository: 'api-service',
    branch: 'develop',
    status: 'success',
    startTime: new Date(Date.now() - 15 * 60 * 1000),
    endTime: new Date(Date.now() - 3 * 60 * 1000),
    duration: 12,
    testsPassed: 89,
    testsFailed: 1,
    codeQuality: 7.8,
    coverage: 74,
    buildSize: 1.8,
    dependencies: 203,
    commits: 7,
    author: 'Mike Johnson',
    environment: 'staging',
    previousFailures: 5,
    avgDuration: 10.5,
    failureRate: 0.28
  },
  {
    id: 'pipeline-3',
    name: 'Mobile App',
    repository: 'mobile-app',
    branch: 'feature/auth',
    status: 'failed',
    startTime: new Date(Date.now() - 25 * 60 * 1000),
    endTime: new Date(Date.now() - 20 * 60 * 1000),
    duration: 5,
    testsPassed: 45,
    testsFailed: 8,
    codeQuality: 6.2,
    coverage: 58,
    buildSize: 3.2,
    dependencies: 289,
    commits: 12,
    author: 'Alex Rodriguez',
    environment: 'development',
    previousFailures: 8,
    avgDuration: 15.8,
    failureRate: 0.45
  },
  {
    id: 'pipeline-4',
    name: 'Database Migration',
    repository: 'db-scripts',
    branch: 'main',
    status: 'pending',
    startTime: new Date(Date.now() - 2 * 60 * 1000),
    duration: 0,
    testsPassed: 0,
    testsFailed: 0,
    codeQuality: 9.1,
    coverage: 95,
    buildSize: 0.3,
    dependencies: 24,
    commits: 1,
    author: 'David Kim',
    environment: 'production',
    previousFailures: 1,
    avgDuration: 3.2,
    failureRate: 0.08
  }
];

export const mockRiskFactors: RiskFactor[] = [
  {
    id: 'rf-1',
    name: 'High Test Failure Rate',
    severity: 'high',
    weight: 0.8,
    description: 'Multiple test failures detected in recent builds',
    category: 'code'
  },
  {
    id: 'rf-2',
    name: 'Large Number of Dependencies',
    severity: 'medium',
    weight: 0.6,
    description: 'High dependency count increases failure risk',
    category: 'dependencies'
  },
  {
    id: 'rf-3',
    name: 'Low Code Coverage',
    severity: 'medium',
    weight: 0.5,
    description: 'Insufficient test coverage may hide issues',
    category: 'code'
  },
  {
    id: 'rf-4',
    name: 'Performance Degradation',
    severity: 'high',
    weight: 0.7,
    description: 'Build duration significantly exceeds average',
    category: 'performance'
  }
];

export const mockPreventiveActions: PreventiveAction[] = [
  {
    id: 'pa-1',
    title: 'Fix Failing Tests',
    description: 'Address the 8 failing test cases in the authentication module',
    priority: 'high',
    estimatedTime: '2-4 hours',
    category: 'testing',
    automated: false
  },
  {
    id: 'pa-2',
    title: 'Optimize Dependencies',
    description: 'Review and remove unused dependencies to reduce build complexity',
    priority: 'medium',
    estimatedTime: '1-2 hours',
    category: 'code',
    automated: true
  },
  {
    id: 'pa-3',
    title: 'Increase Test Coverage',
    description: 'Add unit tests for critical paths to reach 80% coverage',
    priority: 'medium',
    estimatedTime: '4-6 hours',
    category: 'testing',
    automated: false
  },
  {
    id: 'pa-4',
    title: 'Setup Performance Monitoring',
    description: 'Configure build performance alerts for early detection',
    priority: 'low',
    estimatedTime: '30 minutes',
    category: 'monitoring',
    automated: true
  }
];

export const mockTeamMetrics: TeamMetrics[] = [
  {
    teamName: 'Frontend Team',
    totalBuilds: 245,
    successRate: 0.88,
    avgBuildTime: 7.2,
    topContributors: ['Sarah Chen', 'Emily Davis', 'Tom Wilson'],
    riskTrend: 'improving'
  },
  {
    teamName: 'Backend Team',
    totalBuilds: 189,
    successRate: 0.72,
    avgBuildTime: 10.5,
    topContributors: ['Mike Johnson', 'Lisa Park', 'James Brown'],
    riskTrend: 'stable'
  },
  {
    teamName: 'Mobile Team',
    totalBuilds: 156,
    successRate: 0.55,
    avgBuildTime: 15.8,
    topContributors: ['Alex Rodriguez', 'Maria Garcia', 'Chris Lee'],
    riskTrend: 'degrading'
  }
];