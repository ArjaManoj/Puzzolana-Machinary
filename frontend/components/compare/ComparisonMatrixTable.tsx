'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MachineryProduct } from '@/types';
import { CapacityBadge } from '@/components/common/CapacityBadge';
import { Button } from '@/components/common/Button';
import {
  X,
  Plus,
  Zap,
  CheckCircle2,
  FileDown,
  ArrowRight,
  Eye,
  Layers,
  Sparkles,
  HelpCircle,
  Printer,
} from 'lucide-react';

interface ComparisonMatrixTableProps {
  selectedProducts: MachineryProduct[];
  allProducts: MachineryProduct[];
  onAddProduct: (productId: string) => void;
  onRemoveProduct: (productId: string) => void;
  onRequestQuote: (product: MachineryProduct) => void;
}

export const ComparisonMatrixTable: React.FC<ComparisonMatrixTableProps> = ({
  selectedProducts,
  allProducts,
  onAddProduct,
  onRemoveProduct,
  onRequestQuote,
}) => {
  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(false);
  const [isAddPickerOpen, setIsAddPickerOpen] = useState<boolean>(false);

  // Available products to add (not yet in comparison)
  const availableToAdd = useMemo(() => {
    const selectedIds = new Set(selectedProducts.map((p) => p.id));
    return allProducts.filter((p) => !selectedIds.has(p.id));
  }, [allProducts, selectedProducts]);

  // Check if a row has differences
  const hasDiff = (values: (string | number | undefined)[]) => {
    if (values.length <= 1) return false;
    const first = values[0];
    return values.some((v) => v !== first);
  };

  const getRowClass = (values: (string | number | undefined)[]) => {
    if (highlightDifferences && hasDiff(values)) {
      return 'bg-brand-yellow/10 border-l-2 border-l-brand-yellow';
    }
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Top Utility Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-industrial-900 border border-industrial-800 rounded-sm">
        <div className="flex items-center gap-4 text-xs font-mono">
          <label className="flex items-center gap-2 text-industrial-300 hover:text-white cursor-pointer select-none">
            <input
              type="checkbox"
              checked={highlightDifferences}
              onChange={(e) => setHighlightDifferences(e.target.checked)}
              className="w-4 h-4 rounded bg-industrial-950 border-industrial-700 text-brand-yellow focus:ring-brand-yellow"
            />
            <span className={highlightDifferences ? 'text-brand-yellow font-bold' : ''}>
              Highlight Specification Differences
            </span>
          </label>

          <span className="text-industrial-600 hidden sm:inline">|</span>

          <span className="text-industrial-400 hidden sm:inline">
            Comparing <strong className="text-white">{selectedProducts.length}</strong> of 4 slots
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedProducts.length < 4 && (
            <div className="relative">
              <button
                onClick={() => setIsAddPickerOpen(!isAddPickerOpen)}
                className="px-3 py-1.5 bg-industrial-950 hover:bg-industrial-800 text-brand-yellow border border-brand-yellow/40 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Machine Slot</span>
              </button>

              {/* Add Picker Dropdown */}
              {isAddPickerOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 max-h-80 overflow-y-auto bg-industrial-950 border border-industrial-700 rounded shadow-2xl p-2 z-50 text-xs font-mono space-y-1">
                  <div className="text-[10px] text-industrial-500 uppercase px-2 py-1 font-bold">
                    Select Equipment to Compare:
                  </div>
                  {availableToAdd.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onAddProduct(p.id);
                        setIsAddPickerOpen(false);
                      }}
                      className="w-full text-left p-2 rounded hover:bg-industrial-800 text-industrial-200 hover:text-white flex items-center justify-between"
                    >
                      <div>
                        <strong className="text-white block">{p.modelNumber}</strong>
                        <span className="text-[10px] text-industrial-400 truncate block max-w-[180px]">
                          {p.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-brand-yellow">
                        {p.capacityMinTPH}–{p.capacityMaxTPH} TPH
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => window.print()}
            className="p-1.5 bg-industrial-950 hover:bg-industrial-800 text-industrial-400 hover:text-white border border-industrial-700 rounded transition-colors"
            title="Print Specification Comparison Sheet"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Comparison Table */}
      <div className="industrial-card rounded-sm overflow-hidden border border-industrial-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-industrial-200 border-collapse">
            {/* Sticky Machine Header Row */}
            <thead>
              <tr className="bg-industrial-950 border-b border-industrial-800">
                <th className="p-4 w-60 min-w-[220px] font-mono text-industrial-400 text-xs uppercase bg-industrial-950 sticky left-0 z-20 shadow-r">
                  TECHNICAL SPECIFICATION
                </th>
                {selectedProducts.map((product) => (
                  <th
                    key={product.id}
                    className="p-4 w-72 min-w-[260px] align-top border-l border-industrial-800"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-2 py-0.5 rounded uppercase">
                          {product.categoryName}
                        </span>
                        {selectedProducts.length > 2 && (
                          <button
                            onClick={() => onRemoveProduct(product.id)}
                            className="text-industrial-500 hover:text-red-400 transition-colors p-0.5"
                            title="Remove from comparison"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div>
                        <Link
                          href={`/products/${product.category}/${product.slug}`}
                          className="text-base font-black text-white hover:text-brand-yellow transition-colors block leading-snug font-sans"
                        >
                          {product.modelNumber}
                        </Link>
                        <p className="text-xs text-industrial-400 font-sans mt-0.5 line-clamp-1">
                          {product.name}
                        </p>
                      </div>

                      {/* Image Preview */}
                      <div className="relative h-28 bg-industrial-900 rounded border border-industrial-800 overflow-hidden flex items-center justify-center p-2">
                        <img
                          src={product.primaryImage}
                          alt={product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Capacity Badge */}
                      <div>
                        <CapacityBadge
                          minTPH={product.capacityMinTPH}
                          maxTPH={product.capacityMaxTPH}
                          size="sm"
                        />
                      </div>

                      {/* Quick Action Button */}
                      <div className="pt-1">
                        <button
                          onClick={() => onRequestQuote(product)}
                          className="w-full py-2 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-mono font-bold text-xs uppercase rounded transition-colors shadow-sm"
                        >
                          Request Quote
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-industrial-800/60 font-mono text-xs">
              {/* SECTION: 1. GENERAL CLASSIFICATION */}
              <tr className="bg-industrial-950/80 font-bold text-white uppercase text-[11px]">
                <td colSpan={selectedProducts.length + 1} className="p-3 px-4 text-brand-yellow">
                  1. GENERAL & MECHANICAL CLASSIFICATION
                </td>
              </tr>
              <tr className={getRowClass(selectedProducts.map((p) => p.productFamily))}>
                <td className="p-3 px-4 text-industrial-400 sticky left-0 bg-industrial-950/90 z-10 font-bold">
                  Product Family
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3 px-4 border-l border-industrial-800/60 font-bold text-white">
                    {p.productFamily}
                  </td>
                ))}
              </tr>
              <tr className={getRowClass(selectedProducts.map((p) => p.subcategory))}>
                <td className="p-3 px-4 text-industrial-400 sticky left-0 bg-industrial-950/90 z-10">
                  Subcategory Line
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3 px-4 border-l border-industrial-800/60 text-industrial-200">
                    {p.subcategory}
                  </td>
                ))}
              </tr>
              <tr className={getRowClass(selectedProducts.map((p) => p.mobilityType))}>
                <td className="p-3 px-4 text-industrial-400 sticky left-0 bg-industrial-950/90 z-10">
                  Mobility / Mounting
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3 px-4 border-l border-industrial-800/60">
                    <span className="px-2 py-0.5 rounded bg-industrial-950 border border-industrial-700 text-industrial-300 font-bold">
                      {p.mobilityType}
                    </span>
                  </td>
                ))}
              </tr>

              {/* SECTION: 2. CAPACITY & THROUGHPUT */}
              <tr className="bg-industrial-950/80 font-bold text-white uppercase text-[11px]">
                <td colSpan={selectedProducts.length + 1} className="p-3 px-4 text-brand-yellow">
                  2. PRODUCTION CAPACITY & THROUGHPUT
                </td>
              </tr>
              <tr className={getRowClass(selectedProducts.map((p) => `${p.capacityMinTPH}-${p.capacityMaxTPH}`))}>
                <td className="p-3 px-4 text-industrial-400 sticky left-0 bg-industrial-950/90 z-10 font-bold">
                  Operating Capacity Range
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3 px-4 border-l border-industrial-800/60">
                    <strong className="text-brand-yellow text-sm font-black">
                      {p.capacityMinTPH} – {p.capacityMaxTPH}
                    </strong>{' '}
                    <span className="text-industrial-400">TPH</span>
                  </td>
                ))}
              </tr>

              {/* SECTION: 3. FEED & OUTPUT DIMENSIONS */}
              <tr className="bg-industrial-950/80 font-bold text-white uppercase text-[11px]">
                <td colSpan={selectedProducts.length + 1} className="p-3 px-4 text-brand-yellow">
                  3. FEED & DISCHARGE SIZING
                </td>
              </tr>
              <tr className={getRowClass(selectedProducts.map((p) => p.maxFeedSizeMM))}>
                <td className="p-3 px-4 text-industrial-400 sticky left-0 bg-industrial-950/90 z-10 font-bold">
                  Maximum Feed Size
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3 px-4 border-l border-industrial-800/60 text-white font-bold">
                    {p.maxFeedSizeMM} mm
                  </td>
                ))}
              </tr>
              <tr className={getRowClass(selectedProducts.map((p) => p.dischargeSizeMM))}>
                <td className="p-3 px-4 text-industrial-400 sticky left-0 bg-industrial-950/90 z-10">
                  Discharge Output Size
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3 px-4 border-l border-industrial-800/60 text-industrial-300">
                    {p.dischargeSizeMM}
                  </td>
                ))}
              </tr>

              {/* SECTION: 4. POWER & DRIVE */}
              <tr className="bg-industrial-950/80 font-bold text-white uppercase text-[11px]">
                <td colSpan={selectedProducts.length + 1} className="p-3 px-4 text-brand-yellow">
                  4. POWER & DRIVE RATING
                </td>
              </tr>
              <tr className={getRowClass(selectedProducts.map((p) => p.powerRatingKW))}>
                <td className="p-3 px-4 text-industrial-400 sticky left-0 bg-industrial-950/90 z-10 font-bold">
                  Connected Power Rating
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3 px-4 border-l border-industrial-800/60">
                    <strong className="text-white flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-brand-yellow" />
                      {p.powerRatingKW} kW
                    </strong>
                  </td>
                ))}
              </tr>

              {/* SECTION: 5. RAW MATERIALS & GEOLOGY */}
              <tr className="bg-industrial-950/80 font-bold text-white uppercase text-[11px]">
                <td colSpan={selectedProducts.length + 1} className="p-3 px-4 text-brand-yellow">
                  5. GEOLOGICAL ROCK & MATERIAL CAPABILITY
                </td>
              </tr>
              <tr>
                <td className="p-3 px-4 text-industrial-400 sticky left-0 bg-industrial-950/90 z-10">
                  Materials Handled
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3 px-4 border-l border-industrial-800/60">
                    <div className="flex flex-wrap gap-1">
                      {p.materialsHandled?.map((mat, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded bg-industrial-950 border border-industrial-700 text-[10px] text-industrial-300"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* SECTION: 6. TARGET APPLICATIONS */}
              <tr className="bg-industrial-950/80 font-bold text-white uppercase text-[11px]">
                <td colSpan={selectedProducts.length + 1} className="p-3 px-4 text-brand-yellow">
                  6. TARGET APPLICATIONS
                </td>
              </tr>
              <tr>
                <td className="p-3 px-4 text-industrial-400 sticky left-0 bg-industrial-950/90 z-10">
                  Industry Applications
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-3 px-4 border-l border-industrial-800/60">
                    <div className="flex flex-wrap gap-1">
                      {p.applications?.map((app, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-[10px] text-brand-yellow font-bold"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* BOTTOM ACTION ROW */}
              <tr className="bg-industrial-950">
                <td className="p-4 sticky left-0 bg-industrial-950 z-10 text-industrial-400 font-bold uppercase text-xs">
                  DIRECT FACTORY ACTION
                </td>
                {selectedProducts.map((p) => (
                  <td key={p.id} className="p-4 border-l border-industrial-800 space-y-2">
                    <button
                      onClick={() => onRequestQuote(p)}
                      className="w-full py-2 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-mono font-bold text-xs uppercase rounded transition-colors shadow-sm"
                    >
                      Request RFQ
                    </button>
                    <Link
                      href={`/products/${p.category}/${p.slug}`}
                      className="w-full py-1.5 bg-industrial-900 hover:bg-industrial-850 text-white font-mono text-xs rounded border border-industrial-700 flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Full Specs</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
