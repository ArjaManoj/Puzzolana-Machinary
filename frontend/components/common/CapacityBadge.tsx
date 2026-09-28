import React from 'react';
import { Gauge } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CapacityBadgeProps {
  minTPH: number;
  maxTPH: number;
  className?: string;
  size?: 'sm' | 'md';
}

export const CapacityBadge: React.FC<CapacityBadgeProps> = ({ minTPH, maxTPH, className, size = 'md' }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm bg-industrial-950/80 border border-brand-yellow/40 text-brand-yellow font-mono font-bold',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1.5 text-sm',
        className
      )}
    >
      <Gauge className={cn('text-brand-yellow shrink-0', size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4')} />
      <span>
        {minTPH === maxTPH ? `${minTPH} TPH` : `${minTPH} – ${maxTPH} TPH`}
      </span>
    </div>
  );
};
