'use client';

import React from 'react';
import { formatNumber } from '@/lib/utils';
import { Info } from 'lucide-react';

export interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  source?: string;
  lastUpdated?: string;
  isActive?: boolean;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '+',
  label,
  source = 'Verified Corporate Records',
  lastUpdated,
  isActive = true,
}) => {
  // CRITICAL SPEC REQUIREMENT: If data is unavailable, 0, or inactive, hide instead of displaying 0
  if (!isActive || value <= 0 || isNaN(value)) {
    return null;
  }

  return (
    <div className="industrial-card p-6 rounded-sm relative group">
      <div className="flex items-baseline justify-between">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono tracking-tight">
          <span className="text-brand-yellow">{formatNumber(value)}</span>
          {suffix && <span className="text-brand-gold ml-0.5">{suffix}</span>}
        </div>
        {source && (
          <div className="text-industrial-500 hover:text-industrial-300 transition cursor-help relative group/tip" title={`Source: ${source}`}>
            <Info className="w-3.5 h-3.5" />
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover/tip:block bg-industrial-950 border border-industrial-700 text-[10px] text-industrial-300 p-2 rounded whitespace-nowrap z-30 shadow-lg">
              <p className="font-semibold text-white">Source: {source}</p>
              {lastUpdated && <p className="text-industrial-400">Updated: {lastUpdated}</p>}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs sm:text-sm font-bold text-industrial-300 uppercase tracking-wider mt-2 border-t border-industrial-800/80 pt-2">
        {label}
      </p>
    </div>
  );
};
