import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'steel' | 'emerald' | 'charcoal' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'yellow', className }) => {
  const variantStyles = {
    yellow: 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/30',
    steel: 'bg-industrial-800 text-industrial-300 border-industrial-700',
    emerald: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60',
    charcoal: 'bg-industrial-900 text-white border-industrial-800',
    outline: 'bg-transparent text-industrial-300 border-industrial-700',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-semibold border tracking-wide uppercase',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
