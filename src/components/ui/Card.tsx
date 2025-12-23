import React from 'react';
type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  hoverable?: boolean;
};
const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};
export function Card({
  children,
  className = '',
  padding = 'md',
  onClick,
  hoverable = false
}: CardProps) {
  const isClickable = !!onClick || hoverable;
  return <div onClick={onClick} className={`
        bg-white rounded-xl border border-gray-200 shadow-sm
        ${paddingStyles[padding]}
        ${isClickable ? 'cursor-pointer transition-shadow duration-200 hover:shadow-md' : ''}
        ${className}
      `} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onKeyDown={onClick ? e => e.key === 'Enter' && onClick() : undefined}>
      {children}
    </div>;
}
type CardHeaderProps = {
  children: React.ReactNode;
  className?: string;
};
export function CardHeader({
  children,
  className = ''
}: CardHeaderProps) {
  return <div className={`pb-4 border-b border-gray-100 ${className}`}>
      {children}
    </div>;
}
type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
};
export function CardTitle({
  children,
  className = ''
}: CardTitleProps) {
  return <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>;
}
type CardContentProps = {
  children: React.ReactNode;
  className?: string;
};
export function CardContent({
  children,
  className = ''
}: CardContentProps) {
  return <div className={className}>{children}</div>;
}