import React from 'react';
import { PipelineMetrics, PredictionResult } from '../types/pipeline';
import { Clock, GitBranch, User, AlertTriangle, CheckCircle, XCircle, Play } from 'lucide-react';

interface PipelineCardProps {
  pipeline: PipelineMetrics;
  prediction: PredictionResult;
  onClick: (pipeline: PipelineMetrics) => void;
}

export const PipelineCard: React.FC<PipelineCardProps> = ({ pipeline, prediction, onClick }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Play className="w-5 h-5 text-blue-500 animate-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'failed':
        return 'bg-red-50 border-red-200';
      case 'running':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getRiskColor = (probability: number) => {
    if (probability > 0.7) return 'text-red-600 bg-red-100';
    if (probability > 0.4) return 'text-amber-600 bg-amber-100';
    return 'text-green-600 bg-green-100';
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div
      onClick={() => onClick(pipeline)}
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${getStatusColor(pipeline.status)}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon(pipeline.status)}
          <div>
            <h3 className="font-semibold text-gray-900">{pipeline.name}</h3>
            <p className="text-sm text-gray-500">{pipeline.repository}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(prediction.failureProbability)}`}>
          {Math.round(prediction.failureProbability * 100)}% risk
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <GitBranch className="w-4 h-4 text-gray-400" />
            <span>{pipeline.branch}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span>{pipeline.author}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{formatDuration(pipeline.duration)}</span>
          </div>
          <div className="text-gray-500">
            {pipeline.testsPassed + pipeline.testsFailed} tests
          </div>
        </div>

        {prediction.riskFactors.length > 0 && (
          <div className="flex items-center space-x-2 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-amber-600">
              {prediction.riskFactors.length} risk factor{prediction.riskFactors.length > 1 ? 's' : ''}
            </span>
          </div>
        )}

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              prediction.failureProbability > 0.7 ? 'bg-red-500' :
              prediction.failureProbability > 0.4 ? 'bg-amber-500' : 'bg-green-500'
            }`}
            style={{ width: `${prediction.failureProbability * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};