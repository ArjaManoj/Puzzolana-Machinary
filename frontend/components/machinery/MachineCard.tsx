import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Zap, Layers } from 'lucide-react';
import { MachineryProduct } from '@/types';
import { CapacityBadge } from '../common/CapacityBadge';
import { Button } from '../common/Button';

export interface MachineCardProps {
  product: MachineryProduct;
  isCompared?: boolean;
  onToggleCompare?: (productId: string) => void;
  onRequestQuote?: (product: MachineryProduct) => void;
}

export const MachineCard: React.FC<MachineCardProps> = ({
  product,
  isCompared = false,
  onToggleCompare,
  onRequestQuote,
}) => {
  return (
    <div className="industrial-card rounded-sm overflow-hidden flex flex-col justify-between group">
      {/* Card Header & Model Identifier */}
      <div className="p-5 pb-3">
        <div className="flex justify-between items-start gap-2 mb-2">
          <span className="text-[11px] font-bold text-brand-yellow uppercase tracking-widest bg-brand-yellow/10 px-2 py-0.5 rounded border border-brand-yellow/20">
            {product.categoryName || product.category}
          </span>
          <span className="text-xs font-mono font-bold text-industrial-400 bg-industrial-950 px-2 py-0.5 rounded border border-industrial-800">
            {product.mobilityType}
          </span>
        </div>

        <h3 className="text-lg font-black text-white group-hover:text-brand-yellow transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-xs font-mono text-industrial-400 mt-0.5">{product.modelNumber}</p>
      </div>

      {/* Machine Image Preview */}
      <div className="relative h-44 bg-industrial-950 border-y border-industrial-800 flex items-center justify-center p-4 overflow-hidden">
        {/* Placeholder industrial wireframe / image representation */}
        <div className="w-full h-full bg-gradient-to-tr from-industrial-900 to-industrial-850 rounded border border-industrial-800 flex flex-col items-center justify-center text-industrial-500 group-hover:scale-105 transition-transform duration-300">
          <Layers className="w-10 h-10 text-brand-yellow/60 mb-2" />
          <span className="text-[11px] font-mono uppercase text-industrial-400 font-semibold">
            {product.productFamily}
          </span>
        </div>

        {/* Capacity overlay pill */}
        <div className="absolute bottom-2 left-2">
          <CapacityBadge minTPH={product.capacityMinTPH} maxTPH={product.capacityMaxTPH} size="sm" />
        </div>
      </div>

      {/* Key Specifications Grid */}
      <div className="p-5 space-y-3 flex-grow">
        <p className="text-xs text-industrial-300 line-clamp-2 leading-relaxed">
          {product.shortDescription}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs bg-industrial-950/60 p-2.5 rounded border border-industrial-800/80 font-mono">
          <div>
            <span className="text-industrial-500 block text-[10px] uppercase">Max Feed Size</span>
            <span className="text-white font-bold">{product.maxFeedSizeMM} mm</span>
          </div>
          <div>
            <span className="text-industrial-500 block text-[10px] uppercase">Power Rating</span>
            <span className="text-white font-bold flex items-center gap-1">
              <Zap className="w-3 h-3 text-brand-yellow inline" /> {product.powerRatingKW} kW
            </span>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0 space-y-2.5 border-t border-industrial-800/60 mt-auto">
        <div className="flex items-center justify-between pt-3">
          {onToggleCompare && (
            <label className="flex items-center space-x-2 text-xs text-industrial-400 hover:text-white cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isCompared}
                onChange={() => onToggleCompare(product.id)}
                className="w-3.5 h-3.5 rounded bg-industrial-900 border-industrial-700 text-brand-yellow focus:ring-brand-yellow"
              />
              <span>Compare</span>
            </label>
          )}

          <Link
            href={`/products/${product.category}/${product.slug}`}
            className="text-xs font-bold text-brand-yellow hover:text-white inline-flex items-center gap-1 ml-auto"
          >
            View Specs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {onRequestQuote && (
          <Button
            variant="primary"
            size="sm"
            className="w-full text-xs"
            onClick={() => onRequestQuote(product)}
          >
            Request Quotation
          </Button>
        )}
      </div>
    </div>
  );
};
