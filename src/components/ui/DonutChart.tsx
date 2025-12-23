import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
type DonutChartData = {
  name: string;
  value: number;
  color: string;
};
type DonutChartProps = {
  data: DonutChartData[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  centerLabel?: string;
  centerValue?: string | number;
  className?: string;
};
export function DonutChart({
  data,
  height = 250,
  innerRadius = 60,
  outerRadius = 90,
  showLegend = true,
  centerLabel,
  centerValue,
  className = ''
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return <div className={`relative ${className}`} style={{
    height
  }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={innerRadius} outerRadius={outerRadius} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
          </Pie>
          <Tooltip contentStyle={{
          backgroundColor: '#fff',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }} formatter={(value: number, name: string) => [`${value} (${(value / total * 100).toFixed(1)}%)`, name]} />
          {showLegend && <Legend verticalAlign="bottom" height={36} formatter={value => <span className="text-sm text-gray-600">{value}</span>} />}
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{
      marginBottom: showLegend ? 36 : 0
    }}>
          {centerValue && <span className="text-2xl font-bold text-gray-900">
              {centerValue}
            </span>}
          {centerLabel && <span className="text-sm text-gray-500">{centerLabel}</span>}
        </div>}
    </div>;
}