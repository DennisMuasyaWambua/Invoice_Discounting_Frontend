import React from 'react';
type PageContainerProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
};
export function PageContainer({
  children,
  title,
  subtitle,
  actions,
  className = ''
}: PageContainerProps) {
  return <main className={`flex-1 p-4 lg:p-6 overflow-auto ${className}`}>
      {(title || actions) && <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>}
      {children}
    </main>;
}