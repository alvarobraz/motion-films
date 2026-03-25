import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const SelectInput = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <select
          ref={ref}
          defaultValue=""
          className={cn(
            'flex h-12 w-full appearance-none rounded-lg border border-white/10 bg-zinc-800 px-4 py-2 text-sm text-white transition-all',
            'focus-visible:ring-primary/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'invalid:text-zinc-500',
            error &&
              'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/50',
            className
          )}
          {...props}
        >
          <option value="" disabled>
            O que você precisa?
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-zinc-800">
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <span className="ml-1 text-xs font-medium text-red-500">{error}</span>
        )}
      </div>
    );
  }
);
SelectInput.displayName = 'SelectInput';

export { SelectInput };
