import React from 'react';
type CreditScoreGaugeProps = {
  score: number;
  maxScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
};
export function CreditScoreGauge({
  score,
  maxScore = 100,
  size = 'md',
  showLabel = true,
  className = ''
}: CreditScoreGaugeProps) {
  const percentage = score / maxScore * 100;
  const getScoreColor = (pct: number) => {
    if (pct >= 80) return {
      stroke: '#00A86B',
      bg: '#E6F7F0',
      label: 'Excellent'
    };
    if (pct >= 60) return {
      stroke: '#0066CC',
      bg: '#E6F0FF',
      label: 'Good'
    };
    if (pct >= 40) return {
      stroke: '#FF8C42',
      bg: '#FFF4EB',
      label: 'Fair'
    };
    return {
      stroke: '#DC2626',
      bg: '#FEE2E2',
      label: 'Poor'
    };
  };
  const colors = getScoreColor(percentage);
  const sizeConfig = {
    sm: {
      width: 120,
      strokeWidth: 8,
      fontSize: 'text-xl'
    },
    md: {
      width: 160,
      strokeWidth: 10,
      fontSize: 'text-3xl'
    },
    lg: {
      width: 200,
      strokeWidth: 12,
      fontSize: 'text-4xl'
    }
  };
  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - percentage / 100 * circumference;
  return <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{
      width: config.width,
      height: config.width / 2 + 20
    }}>
        <svg width={config.width} height={config.width / 2 + 20} viewBox={`0 0 ${config.width} ${config.width / 2 + 20}`} className="transform">
          {/* Background arc */}
          <path d={`M ${config.strokeWidth / 2} ${config.width / 2} A ${radius} ${radius} 0 0 1 ${config.width - config.strokeWidth / 2} ${config.width / 2}`} fill="none" stroke="#E5E7EB" strokeWidth={config.strokeWidth} strokeLinecap="round" />
          {/* Foreground arc */}
          <path d={`M ${config.strokeWidth / 2} ${config.width / 2} A ${radius} ${radius} 0 0 1 ${config.width - config.strokeWidth / 2} ${config.width / 2}`} fill="none" stroke={colors.stroke} strokeWidth={config.strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className={`${config.fontSize} font-bold text-gray-900 tabular-nums`}>
            {score}
          </span>
          {showLabel && <span className="text-sm font-medium" style={{
          color: colors.stroke
        }}>
              {colors.label}
            </span>}
        </div>
      </div>
      <div className="flex justify-between w-full px-2 mt-1">
        <span className="text-xs text-gray-400">0</span>
        <span className="text-xs text-gray-400">{maxScore}</span>
      </div>
    </div>;
}