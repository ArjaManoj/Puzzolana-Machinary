import React from 'react';
import Link from 'next/link';
import { MachineryProduct } from '@/types';
import { X, ArrowRight, GitCompare, Trash2 } from 'lucide-react';
import { Button } from '../common/Button';

interface ComparisonTrayProps {
  comparedProducts: MachineryProduct[];
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export const ComparisonTray: React.FC<ComparisonTrayProps> = ({
  comparedProducts,
  onRemove,
  onClear,
}) => {
  if (comparedProducts.length === 0) return null;

  const compareUrl = `/products/compare?ids=${comparedProducts.map((p) => p.id).join(',')}`;
  const canCompare = comparedProducts.length >= 2;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-industrial-950/95 border-t-2 border-brand-yellow shadow-2xl backdrop-blur-md p-4 transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Indicator & Clear */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-brand-yellow/20 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow">
              <GitCompare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-white uppercase font-mono tracking-wider">
                MACHINERY COMPARISON TRAY
              </h4>
              <p className="text-[11px] text-industrial-400 font-mono">
                {comparedProducts.length} of 4 models selected ({canCompare ? 'Ready' : 'Select at least 2'})
              </p>
            </div>
          </div>

          <button
            onClick={onClear}
            className="text-xs text-industrial-400 hover:text-brand-yellow flex items-center gap-1 font-mono md:hidden"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        {/* Center: Selected Machinery Badges */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 md:pb-0">
          {comparedProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-2 bg-industrial-900 border border-industrial-700 px-3 py-1.5 rounded-sm text-xs font-mono text-white min-w-max shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span className="font-bold text-brand-yellow">{product.modelNumber}</span>
              <span className="text-industrial-300 text-[11px] truncate max-w-[120px]">
                {product.name}
              </span>
              <button
                onClick={() => onRemove(product.id)}
                className="text-industrial-400 hover:text-white ml-1"
                title="Remove from comparison"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Empty slot indicators up to 4 */}
          {Array.from({ length: Math.max(0, 4 - comparedProducts.length) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="hidden lg:flex items-center justify-center px-3 py-1.5 border border-dashed border-industrial-800 rounded-sm text-[11px] font-mono text-industrial-600 min-w-[120px]"
            >
              + Add Machine
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={onClear}
            className="hidden md:flex text-xs text-industrial-400 hover:text-brand-yellow items-center gap-1 font-mono transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>

          {canCompare ? (
            <Link href={compareUrl} className="w-full md:w-auto">
              <Button variant="primary" size="sm" className="w-full md:w-auto font-mono text-xs">
                <span>Compare Specs ({comparedProducts.length})</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          ) : (
            <button
              disabled
              className="w-full md:w-auto px-4 py-2 bg-industrial-800 text-industrial-500 rounded text-xs font-mono font-bold cursor-not-allowed border border-industrial-700"
            >
              Select 1 More Machine
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
