import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, maxLength, className, id, required, value, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full space-y-1.5">
        <div className="flex justify-between items-center">
          {label && (
            <label htmlFor={textareaId} className="block text-xs font-bold text-industrial-200 tracking-wide uppercase">
              {label} {required && <span className="text-brand-yellow">*</span>}
            </label>
          )}
          {maxLength && (
            <span className="text-[10px] text-industrial-500">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
        <textarea
          id={textareaId}
          ref={ref}
          required={required}
          maxLength={maxLength}
          value={value}
          className={cn(
            'w-full bg-industrial-900 border border-industrial-700 text-white text-sm rounded-sm p-3 transition-all duration-200 focus:outline-none focus:border-brand-yellow focus:ring-1 focus:ring-brand-yellow placeholder:text-industrial-500 disabled:opacity-50 min-h-[100px]',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
        {helperText && !error && <p className="text-xs text-industrial-400">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
