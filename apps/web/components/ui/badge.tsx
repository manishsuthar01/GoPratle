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
    primary: 'bg-primary text-white',
    accent: 'bg-accent/10 text-accent font-semibold border border-accent/20',
    secondary: 'bg-slate-100 text-slate-700',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    outline: 'border border-slate-300 text-slate-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
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
        'bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-6 transition-all',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

