import React from 'react';
import { TechnicalSpecificationGroup } from '@/types';
import { CheckCircle2 } from 'lucide-react';

export interface SpecMatrixTableProps {
  groups: TechnicalSpecificationGroup[];
  modelNumber?: string;
}

export const SpecMatrixTable: React.FC<SpecMatrixTableProps> = ({ groups, modelNumber }) => {
  if (!groups || groups.length === 0) {
    return (
      <div className="p-8 text-center bg-industrial-900 border border-industrial-800 rounded-sm text-sm text-industrial-400">
        Technical specifications to be verified from approved company source.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groups.map((group, groupIdx) => (
        <div key={`${group.groupName}-${groupIdx}`} className="border border-industrial-800 rounded-sm overflow-hidden shadow-industrial-md">
          {/* Group Header */}
          <div className="bg-industrial-950 px-5 py-3 border-b border-industrial-800 flex justify-between items-center">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-yellow rounded-full" />
              {group.groupName} Specifications
            </h4>
            {modelNumber && (
              <span className="text-[11px] font-mono text-brand-yellow font-bold">
                {modelNumber}
              </span>
            )}
          </div>

          {/* Group Specs Matrix */}
          <div className="divide-y divide-industrial-800 bg-industrial-900">
            {group.specifications.map((spec, specIdx) => (
              <div
                key={`${spec.name}-${specIdx}`}
                className="grid grid-cols-1 sm:grid-cols-2 p-3.5 sm:px-5 hover:bg-industrial-850 transition-colors text-xs sm:text-sm gap-1 sm:gap-4"
              >
                <span className="text-industrial-400 font-medium">{spec.name}</span>
                <span className="font-bold text-white font-mono flex items-center gap-1.5 sm:justify-end">
                  {spec.value} {spec.unit && <span className="text-industrial-400 font-normal">{spec.unit}</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
