import React from 'react';
import { Cog } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className, label }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3" role="status" aria-label="Loading">
      <Cog className={cn('text-brand-yellow animate-spin', sizeMap[size], className)} />
      {label && <span className="text-xs font-bold text-industrial-400 uppercase tracking-widest">{label}</span>}
      <span className="sr-only">Loading content...</span>
    </div>
  );
};
