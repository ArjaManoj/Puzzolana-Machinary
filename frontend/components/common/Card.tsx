import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'accent';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  hoverEffect = true,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-industrial-900 border border-industrial-800 text-industrial-100',
    elevated: 'bg-industrial-850 border border-industrial-700 shadow-industrial-lg text-white',
    bordered: 'bg-industrial-950 border-2 border-industrial-800 text-industrial-100',
    accent: 'bg-industrial-900 border border-brand-yellow/40 shadow-gold-glow text-white',
  };

  return (
    <div
      className={cn(
        'rounded-sm p-6 relative overflow-hidden transition-all duration-200',
        variantStyles[variant],
        hoverEffect && 'hover:border-brand-yellow/60 hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {/* Subtle top gold accent bar for premium industrial feel */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
