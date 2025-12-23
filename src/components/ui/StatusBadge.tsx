import React from 'react';
type StatusType = 'pending' | 'approved' | 'funded' | 'repaid' | 'completed' | 'failed' | 'low' | 'medium' | 'high';
type StatusBadgeProps = {
  status: StatusType;
  size?: 'sm' | 'md';
  className?: string;
};
const statusConfig: Record<StatusType, {
  label: string;
  bgColor: string;
  textColor: string;
  dotColor: string;
}> = {
  pending: {
    label: 'Under Review',
    bgColor: 'bg-pending-50',
    textColor: 'text-pending-700',
    dotColor: 'bg-pending-500'
  },
  approved: {
    label: 'Approved',
    bgColor: 'bg-primary-50',
    textColor: 'text-primary-700',
    dotColor: 'bg-primary-500'
  },
  funded: {
    label: 'Funded',
    bgColor: 'bg-success-50',
    textColor: 'text-success-700',
    dotColor: 'bg-success-500'
  },
  repaid: {
    label: 'Settled',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    dotColor: 'bg-gray-500'
  },
  completed: {
    label: 'Completed',
    bgColor: 'bg-success-50',
    textColor: 'text-success-700',
    dotColor: 'bg-success-500'
  },
  failed: {
    label: 'Declined',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500'
  },
  low: {
    label: 'Low Risk',
    bgColor: 'bg-success-50',
    textColor: 'text-success-700',
    dotColor: 'bg-success-500'
  },
  medium: {
    label: 'Medium Risk',
    bgColor: 'bg-pending-50',
    textColor: 'text-pending-700',
    dotColor: 'bg-pending-500'
  },
  high: {
    label: 'Elevated Risk',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500'
  }
};
export function StatusBadge({
  status,
  size = 'md',
  className = ''
}: StatusBadgeProps) {
  const config = statusConfig[status];
  return <span className={`
        inline-flex items-center gap-1.5 font-medium rounded-full
        ${config.bgColor} ${config.textColor}
        ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'}
        ${className}
      `}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>;
}