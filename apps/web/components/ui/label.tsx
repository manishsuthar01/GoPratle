import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'block text-xs font-semibold text-[#585866] mb-1.5 select-none tracking-tight',
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-[var(--color-primary)] ml-1 font-bold">*</span>}
      </label>
    );
  }
);
Label.displayName = 'Label';
