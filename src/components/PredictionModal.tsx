import React from 'react';
import { PipelineMetrics, PredictionResult } from '../types/pipeline';
import { X, AlertTriangle, CheckCircle, Clock, Zap, TrendingUp } from 'lucide-react';

interface PredictionModalProps {
  pipeline: PipelineMetrics;
  prediction: PredictionResult;
  onClose: () => void;
}

export const PredictionModal: React.FC<PredictionModalProps> = ({ pipeline, prediction, onClose }) => {
  const getRiskColor = (probability: number) => {
    if (probability > 0.7) return 'text-red-600';
    if (probability > 0.4) return 'text-amber-600';
    return 'text-green-600';
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityIcon = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{pipeline.name}</h2>
              <p className="text-gray-500">{pipeline.repository} • {pipeline.branch}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Prediction Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Failure Prediction</h3>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {Math.round(prediction.confidence * 100)}% confidence
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getRiskColor(prediction.failureProbability)}`}>
                  {Math.round(prediction.failureProbability * 100)}%
                </div>
                <div className="text-sm text-gray-600">Failure Risk</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getSeverityColor(prediction.estimatedImpact).split(' ')[1]}`}>
                  {prediction.estimatedImpact.toUpperCase()}
                </div>
                <div className="text-sm text-gray-600">Impact Level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {prediction.riskFactors.length}
                </div>
                <div className="text-sm text-gray-600">Risk Factors</div>
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>
            <div className="space-y-3">
              {prediction.riskFactors.map((factor) => (
                <div key={factor.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(factor.severity)}`}>
                    {factor.severity}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{factor.name}</h4>
                    <p className="text-sm text-gray-600">{factor.description}</p>
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Category:</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {factor.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {Math.round(factor.weight * 100)}%
                    </div>
                    <div className="text-xs text-gray-500">weight</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preventive Actions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h3>
            <div className="space-y-3">
              {prediction.preventiveActions.map((action) => (
                <div key={action.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getPriorityIcon(action.priority)}
                      <div>
                        <h4 className="font-medium text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {action.estimatedTime}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            {action.category}
                          </span>
                          {action.automated && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
                              <Zap className="w-3 h-3 mr-1" />
                              Automated
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      action.priority === 'high' ? 'bg-red-100 text-red-800' :
                      action.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {action.priority} priority
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Environment:</span>
                  <span className="font-medium">{pipeline.environment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Author:</span>
                  <span className="font-medium">{pipeline.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{pipeline.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tests Passed:</span>
                  <span className="font-medium text-green-600">{pipeline.testsPassed}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tests Failed:</span>
                  <span className="font-medium text-red-600">{pipeline.testsFailed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Code Coverage:</span>
                  <span className="font-medium">{pipeline.coverage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dependencies:</span>
                  <span className="font-medium">{pipeline.dependencies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Previous Failures:</span>
                  <span className="font-medium">{pipeline.previousFailures}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};