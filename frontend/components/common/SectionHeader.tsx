import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = 'left',
  className,
}) => {
  return (
    <div className={cn('space-y-3 mb-10', align === 'center' ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl', className)}>
      {badge && (
        <span className="inline-block text-xs font-bold text-brand-yellow tracking-widest uppercase border-l-2 border-brand-yellow pl-2">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-industrial-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
