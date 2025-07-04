import { PipelineMetrics, PredictionResult, RiskFactor, PreventiveAction } from '../types/pipeline';
import { mockRiskFactors, mockPreventiveActions } from '../data/mockData';

export class PredictionEngine {
  static predictFailure(pipeline: PipelineMetrics): PredictionResult {
    const riskFactors = this.analyzeRiskFactors(pipeline);
    const failureProbability = this.calculateFailureProbability(pipeline, riskFactors);
    const confidence = this.calculateConfidence(pipeline);
    const preventiveActions = this.generatePreventiveActions(riskFactors);
    const estimatedImpact = this.assessImpact(failureProbability, pipeline);

    return {
      pipelineId: pipeline.id,
      failureProbability,
      confidence,
      riskFactors,
      preventiveActions,
      estimatedImpact
    };
  }

  private static analyzeRiskFactors(pipeline: PipelineMetrics): RiskFactor[] {
    const factors: RiskFactor[] = [];

    // Test failure risk
    if (pipeline.testsFailed > 0) {
      factors.push({
        ...mockRiskFactors[0],
        weight: Math.min(pipeline.testsFailed * 0.1, 1.0)
      });
    }

    // Dependency risk
    if (pipeline.dependencies > 200) {
      factors.push({
        ...mockRiskFactors[1],
        weight: Math.min((pipeline.dependencies - 200) * 0.002, 1.0)
      });
    }

    // Code coverage risk
    if (pipeline.coverage < 70) {
      factors.push({
        ...mockRiskFactors[2],
        weight: Math.max(0, (70 - pipeline.coverage) * 0.01)
      });
    }

    // Performance risk
    if (pipeline.duration > pipeline.avgDuration * 1.5) {
      factors.push({
        ...mockRiskFactors[3],
        weight: Math.min((pipeline.duration / pipeline.avgDuration - 1), 1.0)
      });
    }

    return factors;
  }

  private static calculateFailureProbability(pipeline: PipelineMetrics, riskFactors: RiskFactor[]): number {
    let baseProbability = pipeline.failureRate;
    
    // Apply risk factors
    const riskWeight = riskFactors.reduce((sum, factor) => sum + factor.weight, 0);
    const riskMultiplier = 1 + (riskWeight * 0.3);
    
    // Consider recent failures
    const recentFailureMultiplier = 1 + (pipeline.previousFailures * 0.05);
    
    // Calculate final probability
    let probability = baseProbability * riskMultiplier * recentFailureMultiplier;
    
    // Cap at 95%
    return Math.min(probability, 0.95);
  }

  private static calculateConfidence(pipeline: PipelineMetrics): number {
    // Base confidence on historical data availability
    const historyWeight = Math.min(pipeline.previousFailures + 10, 50) / 50;
    
    // Consider data quality
    const dataQuality = pipeline.testsPassed + pipeline.testsFailed > 0 ? 1 : 0.5;
    
    return historyWeight * dataQuality * 0.9 + 0.1;
  }

  private static generatePreventiveActions(riskFactors: RiskFactor[]): PreventiveAction[] {
    const actions: PreventiveAction[] = [];
    
    riskFactors.forEach(factor => {
      switch (factor.category) {
        case 'code':
          if (factor.name.includes('Test')) {
            actions.push(mockPreventiveActions[0]);
          } else if (factor.name.includes('Coverage')) {
            actions.push(mockPreventiveActions[2]);
          }
          break;
        case 'dependencies':
          actions.push(mockPreventiveActions[1]);
          break;
        case 'performance':
          actions.push(mockPreventiveActions[3]);
          break;
      }
    });
    
    return actions;
  }

  private static assessImpact(probability: number, pipeline: PipelineMetrics): 'low' | 'medium' | 'high' {
    if (probability > 0.7 && pipeline.environment === 'production') {
      return 'high';
    } else if (probability > 0.5 || pipeline.environment === 'production') {
      return 'medium';
    } else {
      return 'low';
    }
  }
}