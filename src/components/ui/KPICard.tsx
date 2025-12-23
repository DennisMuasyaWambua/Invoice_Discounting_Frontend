import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from 'lucide-react';
type KPICardProps = {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
  };
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
};
export function KPICard({
  title,
  value,
  trend,
  icon,
  subtitle,
  className = ''
}: KPICardProps) {
  const getTrendColor = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return 'text-success-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };
  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up':
        return <TrendingUpIcon className="w-4 h-4" />;
      case 'down':
        return <TrendingDownIcon className="w-4 h-4" />;
      default:
        return <MinusIcon className="w-4 h-4" />;
    }
  };
  return <div className={`
        bg-white rounded-xl border border-gray-200 shadow-sm p-6
        ${className}
      `}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 tabular-nums">
            {value}
          </p>
          {(trend || subtitle) && <div className="flex items-center gap-2 mt-2">
              {trend && <span className={`inline-flex items-center gap-1 text-sm font-medium ${getTrendColor(trend.direction)}`}>
                  {getTrendIcon(trend.direction)}
                  {Math.abs(trend.value)}%
                </span>}
              {subtitle && <span className="text-sm text-gray-500">{subtitle}</span>}
            </div>}
        </div>
        {icon && <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
            {icon}
          </div>}
      </div>
    </div>;
}