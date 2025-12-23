import React, { useState } from 'react';
import { SmartphoneIcon } from 'lucide-react';
type MPesaInputProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
};
export function MPesaInput({
  value,
  onChange,
  error,
  label = 'M-Pesa Phone Number',
  required = false,
  className = ''
}: MPesaInputProps) {
  const [focused, setFocused] = useState(false);
  const formatPhoneNumber = (input: string): string => {
    const digits = input.replace(/\D/g, '');
    if (digits.length <= 4) {
      return digits;
    } else if (digits.length <= 7) {
      return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    } else {
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 10) {
      onChange(formatted);
    }
  };
  const isValid = value.replace(/\s/g, '').length === 10 && (value.startsWith('07') || value.startsWith('01'));
  return <div className={className}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center">
          <div className={`
            h-full flex items-center gap-2 pl-3 pr-3 rounded-l-lg border-r
            ${focused ? 'border-primary-500' : 'border-gray-300'}
            ${error ? 'border-red-300' : ''}
            bg-success-50 transition-colors duration-200
          `}>
            <SmartphoneIcon className="w-4 h-4 text-success-600" />
            <span className="text-sm font-medium text-success-700">M-Pesa</span>
          </div>
        </div>
        <input type="tel" value={value} onChange={handleChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="0712 345 678" className={`
            block w-full rounded-lg border bg-white
            text-gray-900 placeholder-gray-400
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-0
            pl-32 pr-10 py-2.5 text-sm tabular-nums
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'}
          `} aria-invalid={error ? 'true' : 'false'} />
        {isValid && <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg className="w-5 h-5 text-success-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>}
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
      <p className="mt-1.5 text-xs text-gray-500">
        Enter your Safaricom M-Pesa number (07XX or 01XX)
      </p>
    </div>;
}