import React from 'react';
import Link from 'next/link';
import { MachineryProduct } from '@/types';
import { ArrowRight, Zap, FileText } from 'lucide-react';
import { CapacityBadge } from '../common/CapacityBadge';

interface ProductTableViewProps {
  products: MachineryProduct[];
  comparedIds: string[];
  onToggleCompare: (productId: string) => void;
  onRequestQuote: (product: MachineryProduct) => void;
}

export const ProductTableView: React.FC<ProductTableViewProps> = ({
  products,
  comparedIds,
  onToggleCompare,
  onRequestQuote,
}) => {
  return (
    <div className="industrial-card rounded-sm overflow-hidden border border-industrial-800">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-industrial-200 border-collapse">
          {/* Table Header */}
          <thead className="bg-industrial-950 text-industrial-400 font-mono uppercase text-[11px] border-b border-industrial-800">
            <tr>
              <th className="p-3.5 text-center w-12">
                <span className="sr-only">Compare</span>
                VS
              </th>
              <th className="p-3.5 min-w-[220px]">Machine Model & Name</th>
              <th className="p-3.5 min-w-[140px]">Category / Line</th>
              <th className="p-3.5 min-w-[120px]">Mobility</th>
              <th className="p-3.5 min-w-[150px]">Capacity (TPH)</th>
              <th className="p-3.5 min-w-[120px]">Max Feed</th>
              <th className="p-3.5 min-w-[110px]">Power Rating</th>
              <th className="p-3.5 min-w-[160px]">Discharge Size</th>
              <th className="p-3.5 text-right min-w-[180px]">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-industrial-800/60 bg-industrial-900/40">
            {products.map((p) => {
              const isChecked = comparedIds.includes(p.id);

              return (
                <tr
                  key={p.id}
                  className={`hover:bg-industrial-850/60 transition-colors ${
                    isChecked ? 'bg-brand-yellow/5' : ''
                  }`}
                >
                  {/* Compare checkbox */}
                  <td className="p-3.5 text-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleCompare(p.id)}
                      className="w-3.5 h-3.5 rounded bg-industrial-950 border-industrial-700 text-brand-yellow focus:ring-brand-yellow cursor-pointer"
                      title="Select to compare side-by-side"
                    />
                  </td>

                  {/* Model & Name */}
                  <td className="p-3.5">
                    <Link
                      href={`/products/${p.category}/${p.slug}`}
                      className="font-black text-white hover:text-brand-yellow transition-colors block text-sm leading-tight"
                    >
                      {p.name}
                    </Link>
                    <span className="text-[11px] font-mono text-brand-yellow/90 mt-0.5 block">
                      {p.modelNumber}
                    </span>
                  </td>

                  {/* Category & Subcategory */}
                  <td className="p-3.5 font-mono">
                    <span className="text-white block font-medium">{p.categoryName}</span>
                    <span className="text-[11px] text-industrial-400 block">{p.subcategory}</span>
                  </td>

                  {/* Mobility */}
                  <td className="p-3.5 font-mono">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-industrial-950 border border-industrial-800 text-industrial-300">
                      {p.mobilityType}
                    </span>
                  </td>

                  {/* Capacity Badge */}
                  <td className="p-3.5">
                    <CapacityBadge minTPH={p.capacityMinTPH} maxTPH={p.capacityMaxTPH} size="sm" />
                  </td>

                  {/* Max Feed Size */}
                  <td className="p-3.5 font-mono">
                    <span className="text-white font-bold">{p.maxFeedSizeMM}</span>{' '}
                    <span className="text-industrial-400">mm</span>
                  </td>

                  {/* Power Rating */}
                  <td className="p-3.5 font-mono">
                    <span className="text-white font-bold inline-flex items-center gap-1">
                      <Zap className="w-3 h-3 text-brand-yellow" />
                      {p.powerRatingKW} kW
                    </span>
                  </td>

                  {/* Discharge Size */}
                  <td className="p-3.5 text-industrial-300 font-mono text-[11px]">
                    {p.dischargeSizeMM}
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => onRequestQuote(p)}
                      className="px-2.5 py-1.5 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-bold font-mono text-[11px] rounded transition-colors shadow-sm"
                    >
                      Request Quote
                    </button>
                    <Link
                      href={`/products/${p.category}/${p.slug}`}
                      className="px-2.5 py-1.5 bg-industrial-800 hover:bg-industrial-700 text-white font-mono text-[11px] rounded transition-colors inline-flex items-center gap-1 border border-industrial-700"
                      title="View Full Specifications"
                    >
                      Specs <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
