import React from 'react';
import { TeamMetrics } from '../types/pipeline';
import { Users, TrendingUp, TrendingDown, Minus, Clock, Target } from 'lucide-react';

interface TeamMetricsCardProps {
  metrics: TeamMetrics;
}

export const TeamMetricsCard: React.FC<TeamMetricsCardProps> = ({ metrics }) => {
  const getTrendIcon = (trend: 'improving' | 'stable' | 'degrading') => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'degrading':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: 'improving' | 'stable' | 'degrading') => {
    switch (trend) {
      case 'improving':
        return 'text-green-600 bg-green-100';
      case 'degrading':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 0.8) return 'text-green-600';
    if (rate >= 0.6) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">{metrics.teamName}</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTrendColor(metrics.riskTrend)}`}>
          {getTrendIcon(metrics.riskTrend)}
          <span>{metrics.riskTrend}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{metrics.totalBuilds}</div>
          <div className="text-sm text-gray-500">Total Builds</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${getSuccessRateColor(metrics.successRate)}`}>
            {Math.round(metrics.successRate * 100)}%
          </div>
          <div className="text-sm text-gray-500">Success Rate</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Avg Build Time</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium">{metrics.avgBuildTime}m</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-blue-500"
            style={{ width: `${Math.min((metrics.avgBuildTime / 20) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <Target className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Top Contributors</span>
        </div>
        <div className="space-y-1">
          {metrics.topContributors.map((contributor, index) => (
            <div key={contributor} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{contributor}</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-1 bg-gray-200 rounded-full">
                  <div
                    className="h-1 bg-blue-500 rounded-full"
                    style={{ width: `${100 - (index * 25)}%` }}
                  />
                </div>
                <span className="text-gray-500 w-8 text-right">#{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};