import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
type LineChartProps = {
  data: Array<Record<string, string | number>>;
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  formatYAxis?: (value: number) => string;
  formatTooltip?: (value: number) => string;
  className?: string;
};
export function LineChart({
  data,
  xKey,
  yKey,
  color = '#0066CC',
  height = 300,
  showGrid = true,
  formatYAxis,
  formatTooltip,
  className = ''
}: LineChartProps) {
  return <div className={className} style={{
    height
  }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{
        top: 10,
        right: 10,
        left: 0,
        bottom: 0
      }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />}
          <XAxis dataKey={xKey} axisLine={false} tickLine={false} tick={{
          fill: '#6B7280',
          fontSize: 12
        }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{
          fill: '#6B7280',
          fontSize: 12
        }} tickFormatter={formatYAxis} dx={-10} />
          <Tooltip contentStyle={{
          backgroundColor: '#fff',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }} formatter={(value: number) => [formatTooltip ? formatTooltip(value) : value, '']} labelStyle={{
          color: '#374151',
          fontWeight: 600
        }} />
          <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} dot={{
          fill: color,
          strokeWidth: 2,
          r: 4
        }} activeDot={{
          r: 6,
          strokeWidth: 0
        }} />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>;
}