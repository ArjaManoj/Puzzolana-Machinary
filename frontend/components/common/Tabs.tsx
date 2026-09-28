'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'underline' | 'boxed' | 'pills';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className,
  variant = 'underline',
}) => {
  return (
    <div className={cn('w-full border-b border-industrial-800', className)}>
      <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          if (variant === 'boxed') {
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className={cn(
                  'px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-t border-l border-r rounded-t-sm flex items-center gap-2 transition-all whitespace-nowrap',
                  isActive
                    ? 'bg-industrial-900 border-industrial-700 text-brand-yellow border-t-2 border-t-brand-yellow'
                    : 'bg-industrial-950 border-transparent text-industrial-400 hover:text-industrial-200 hover:bg-industrial-900/50'
                )}
              >
                {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
                {tab.label}
                {tab.badge !== undefined && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-industrial-800 text-industrial-300">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                'py-3.5 px-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all whitespace-nowrap',
                isActive
                  ? 'border-brand-yellow text-brand-yellow'
                  : 'border-transparent text-industrial-400 hover:text-industrial-200 hover:border-industrial-700'
              )}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              {tab.label}
              {tab.badge !== undefined && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-industrial-800 text-industrial-300">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
