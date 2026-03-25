import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <textarea
          className={cn(
            'flex min-h-30 w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-white transition-all',
            'resize-none placeholder:text-zinc-500',
            'focus-visible:ring-primary/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error &&
              'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/50',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="ml-1 text-xs font-medium text-red-500">{error}</span>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
