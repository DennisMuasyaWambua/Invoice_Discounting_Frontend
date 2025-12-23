import React from 'react';
type InputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date';
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};
export function Input({
  label,
  error,
  helperText,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  name,
  id,
  className = '',
  icon,
  iconPosition = 'left'
}: InputProps) {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');
  return <div className={`w-full ${className}`}>
      {label && <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>}
      <div className="relative">
        {icon && iconPosition === 'left' && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>}
        <input type={type} id={inputId} name={name} value={value} onChange={onChange} onBlur={onBlur} disabled={disabled} required={required} placeholder={placeholder} className={`
            block w-full rounded-lg border bg-white
            text-gray-900 placeholder-gray-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${icon && iconPosition === 'left' ? 'pl-10' : 'pl-4'}
            ${icon && iconPosition === 'right' ? 'pr-10' : 'pr-4'}
            py-2.5 text-sm
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'}
          `} aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined} />
        {icon && iconPosition === 'right' && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>}
      </div>
      {error && <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>}
      {helperText && !error && <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-500">
          {helperText}
        </p>}
    </div>;
}