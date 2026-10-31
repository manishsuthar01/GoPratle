import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  helperText?: string;
  floatingLabel?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      placeholder = 'Select an option',
      error,
      helperText,
      floatingLabel,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <div
          className={cn(
            'relative bg-white border rounded-2xl transition-all duration-150',
            error
              ? 'border-rose-400 focus-within:border-rose-500 focus-within:ring-1 focus-within:ring-rose-400'
              : 'border-[#E8E8ED] hover:border-[#D6D6DC] focus-within:border-[var(--color-primary)] focus-within:ring-1 focus-within:ring-[var(--color-primary)]'
          )}
        >
          {floatingLabel && (
            <label
              htmlFor={id}
              className="absolute -top-2 left-3.5 bg-white px-1.5 text-[11px] font-semibold text-[#585866] leading-none pointer-events-none z-10"
            >
              {floatingLabel}
            </label>
          )}
          <select
            id={id}
            ref={ref}
            className={cn(
              'flex h-12 w-full appearance-none bg-transparent px-4 py-2 text-sm text-[#1D1D24] transition duration-150 pr-10 rounded-2xl',
              'focus:outline-none',
              'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#8E8E9C]">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        {error && (
          <p className="mt-1.5 text-xs text-rose-600 font-medium flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="mt-1 text-xs text-[#8E8E9C]">{helperText}</p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
