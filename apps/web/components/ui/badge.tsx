import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'success' | 'outline';
}

export function Badge({
  className,
  variant = 'secondary',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white font-medium',
    accent:
      'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-semibold border border-[var(--color-primary-border)]',
    secondary: 'bg-[#F2F2F5] text-[#4A4A56] font-medium',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium',
    outline: 'border border-[#E2E2E8] text-[#585866] font-medium bg-white',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Card({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-white rounded-3xl border border-[#E8E8ED] shadow-card p-6 sm:p-8 transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
