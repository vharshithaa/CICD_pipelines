import React, { useState, useEffect } from 'react';
import { mockPipelines, mockTeamMetrics } from '../data/mockData';
import { PipelineMetrics, PredictionResult } from '../types/pipeline';
import { PredictionEngine } from '../utils/predictionEngine';
import { PipelineCard } from './PipelineCard';
import { PredictionModal } from './PredictionModal';
import { TeamMetricsCard } from './TeamMetricsCard';
import { Activity, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [pipelines, setPipelines] = useState<PipelineMetrics[]>(mockPipelines);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineMetrics | null>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionResult | null>(null);

  useEffect(() => {
    // Generate predictions for all pipelines
    const newPredictions = pipelines.map(pipeline => 
      PredictionEngine.predictFailure(pipeline)
    );
    setPredictions(newPredictions);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setPipelines(prev => prev.map(pipeline => {
        if (pipeline.status === 'running') {
          const newDuration = pipeline.duration + 1;
          return { ...pipeline, duration: newDuration };
        }
        return pipeline;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [pipelines]);

  const handlePipelineClick = (pipeline: PipelineMetrics) => {
    const prediction = predictions.find(p => p.pipelineId === pipeline.id);
    if (prediction) {
      setSelectedPipeline(pipeline);
      setSelectedPrediction(prediction);
    }
  };

  const getOverallStats = () => {
    const totalPipelines = pipelines.length;
    const successfulPipelines = pipelines.filter(p => p.status === 'success').length;
    const failedPipelines = pipelines.filter(p => p.status === 'failed').length;
    const highRiskPipelines = predictions.filter(p => p.failureProbability > 0.7).length;
    const averageRisk = predictions.reduce((sum, p) => sum + p.failureProbability, 0) / predictions.length;

    return {
      totalPipelines,
      successfulPipelines,
      failedPipelines,
      highRiskPipelines,
      averageRisk
    };
  };

  const stats = getOverallStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">CI/CD Pipeline Intelligence</h1>
          </div>
          <p className="text-gray-600">Predictive analytics and failure prevention for your development pipelines</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pipelines</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalPipelines}</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Successful</p>
                <p className="text-2xl font-bold text-green-600">{stats.successfulPipelines}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-red-600">{stats.failedPipelines}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-amber-600">{stats.highRiskPipelines}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Risk</p>
                <p className="text-2xl font-bold text-purple-600">{Math.round(stats.averageRisk * 100)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pipeline Cards */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Pipelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pipelines.map((pipeline) => {
                const prediction = predictions.find(p => p.pipelineId === pipeline.id);
                return prediction ? (
                  <PipelineCard
                    key={pipeline.id}
                    pipeline={pipeline}
                    prediction={prediction}
                    onClick={handlePipelineClick}
                  />
                ) : null;
              })}
            </div>
          </div>

          {/* Team Metrics */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Team Performance</h2>
            <div className="space-y-4">
              {mockTeamMetrics.map((metrics) => (
                <TeamMetricsCard key={metrics.teamName} metrics={metrics} />
              ))}
            </div>
          </div>
        </div>

        {/* Prediction Modal */}
        {selectedPipeline && selectedPrediction && (
          <PredictionModal
            pipeline={selectedPipeline}
            prediction={selectedPrediction}
            onClose={() => {
              setSelectedPipeline(null);
              setSelectedPrediction(null);
            }}
          />
        )}
      </div>
    </div>
  );
};