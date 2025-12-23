import React from 'react';
import { FileTextIcon, UploadIcon, CreditCardIcon, TrendingUpIcon } from 'lucide-react';
import { Button } from './Button';
type EmptyStateType = 'invoices' | 'funding' | 'transactions' | 'investments' | 'generic';
type EmptyStateProps = {
  type?: EmptyStateType;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};
const typeConfig: Record<EmptyStateType, {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel: string;
}> = {
  invoices: {
    icon: <FileTextIcon className="w-12 h-12 text-gray-400" />,
    title: 'No invoices yet',
    description: 'Upload your first eTIMS invoice to start accessing liquidity for your healthcare practice.',
    actionLabel: 'Upload Invoice'
  },
  funding: {
    icon: <CreditCardIcon className="w-12 h-12 text-gray-400" />,
    title: 'No funding requests',
    description: 'Once your invoices are approved, you can request funding and receive funds via M-Pesa.',
    actionLabel: 'View Invoices'
  },
  transactions: {
    icon: <TrendingUpIcon className="w-12 h-12 text-gray-400" />,
    title: 'No transactions yet',
    description: 'Your funding and repayment transactions will appear here once you start using MediFi.',
    actionLabel: 'Get Started'
  },
  investments: {
    icon: <TrendingUpIcon className="w-12 h-12 text-gray-400" />,
    title: 'No investments yet',
    description: 'Browse available healthcare invoice opportunities and start earning returns.',
    actionLabel: 'Browse Opportunities'
  },
  generic: {
    icon: <FileTextIcon className="w-12 h-12 text-gray-400" />,
    title: 'Nothing here yet',
    description: 'Get started by exploring the platform features.',
    actionLabel: 'Get Started'
  }
};
export function EmptyState({
  type = 'generic',
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}: EmptyStateProps) {
  const config = typeConfig[type];
  return <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        {config.icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title || config.title}
      </h3>
      <p className="text-sm text-gray-600 max-w-sm mb-6">
        {description || config.description}
      </p>
      {onAction && <Button onClick={onAction} icon={<UploadIcon className="w-4 h-4" />}>
          {actionLabel || config.actionLabel}
        </Button>}
    </div>;
}