'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { VERIFIED_FRONTEND_PRODUCTS } from '@/lib/seedCatalog';
import { MachineryProduct } from '@/types';
import { ComparisonMatrixTable } from '@/components/compare';
import { QuickQuoteModal } from '@/components/catalogue';
import {
  GitCompare,
  ChevronRight,
  ShieldCheck,
  Plus,
  ArrowRight,
  Sparkles,
  Layers,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

function ProductCompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse IDs from query parameter ?ids=PJC-14076,PCC-2000
  const initialIds = useMemo(() => {
    const rawIds = searchParams.get('ids');
    if (!rawIds) return ['PJC-11075', 'PCC-2000']; // Default 2-machine preset
    return rawIds.split(',').filter(Boolean);
  }, [searchParams]);

  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<MachineryProduct | null>(null);

  // Sync state to URL query params
  useEffect(() => {
    if (selectedIds.length > 0) {
      const newQuery = `?ids=${selectedIds.join(',')}`;
      router.replace(`/products/compare${newQuery}`, { scroll: false });
    }
  }, [selectedIds, router]);

  // Selected machinery objects
  const selectedProducts = useMemo(() => {
    return selectedIds
      .map((id) =>
        VERIFIED_FRONTEND_PRODUCTS.find(
          (p) => p.id.toLowerCase() === id.toLowerCase() || p.slug.toLowerCase() === id.toLowerCase()
        )
      )
      .filter(Boolean) as MachineryProduct[];
  }, [selectedIds]);

  const handleAddProduct = (productId: string) => {
    if (selectedIds.length >= 4) {
      alert('You can compare a maximum of 4 machines simultaneously.');
      return;
    }
    if (!selectedIds.includes(productId)) {
      setSelectedIds([...selectedIds, productId]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    if (selectedIds.length <= 1) {
      alert('Keep at least 1 machine or select a comparison preset.');
      return;
    }
    setSelectedIds(selectedIds.filter((id) => id !== productId));
  };

  // Preset quick comparisons
  const handleLoadPreset = (ids: string[]) => {
    setSelectedIds(ids);
  };

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* 1. Hero Header */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Subtle background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <Link href="/products" className="hover:text-white transition-colors">
              EQUIPMENT CATALOGUE
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <span className="text-brand-yellow font-bold uppercase">PRODUCT COMPARISON MATRIX</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold tracking-wider uppercase">
                <GitCompare className="w-3.5 h-3.5" />
                <span>SIDE-BY-SIDE ENGINEERING COMPARISON</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                EQUIPMENT <span className="text-brand-yellow">SPECIFICATION MATRIX</span>
              </h1>

              <p className="text-sm sm:text-base text-industrial-300 leading-relaxed font-sans">
                Evaluate technical specifications, throughput capacities (TPH), power ratings, and cavity dimensions across 2 to 4 Puzzolana machinery models simultaneously.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 font-mono text-xs">
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Active Slots</span>
                <strong className="text-xl font-black text-brand-yellow">
                  {selectedProducts.length} of 4
                </strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Spec Alignment</span>
                <strong className="text-xl font-black text-white">100% Verified</strong>
              </div>
            </div>
          </div>

          {/* Quick Comparison Presets Bar */}
          <div className="mt-8 pt-6 border-t border-industrial-800/80">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-mono">
              <span className="text-[11px] text-industrial-400 uppercase font-bold tracking-wider min-w-max mr-2">
                Quick Presets:
              </span>
              <button
                onClick={() => handleLoadPreset(['PJC-9060', 'PJC-11075', 'PJC-14076'])}
                className="px-3 py-1.5 rounded bg-industrial-950 hover:bg-industrial-800 text-industrial-300 hover:text-white border border-industrial-800 min-w-max transition-colors"
              >
                Jaw Crusher Fleet (PJC 9060 vs 11075 vs 14076)
              </button>
              <button
                onClick={() => handleLoadPreset(['PJC-11075', 'PCC-2000', 'PVI-100'])}
                className="px-3 py-1.5 rounded bg-industrial-950 hover:bg-industrial-800 text-industrial-300 hover:text-white border border-industrial-800 min-w-max transition-colors"
              >
                3-Stage Crushing Circuit (Jaw + Cone + VSI)
              </button>
              <button
                onClick={() => handleLoadPreset(['PTJ-11075', 'PTC-2000'])}
                className="px-3 py-1.5 rounded bg-industrial-950 hover:bg-industrial-800 text-industrial-300 hover:text-white border border-industrial-800 min-w-max transition-colors"
              >
                Track Mobile Line (Track Jaw vs Track Cone)
              </button>
              <button
                onClick={() => handleLoadPreset(['PSW-150', 'PBW-120'])}
                className="px-3 py-1.5 rounded bg-industrial-950 hover:bg-industrial-800 text-industrial-300 hover:text-white border border-industrial-800 min-w-max transition-colors"
              >
                Sand Washing (Hydrocyclone vs Bucket Wheel)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Comparison Matrix Stage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {selectedProducts.length > 0 ? (
          <ComparisonMatrixTable
            selectedProducts={selectedProducts}
            allProducts={VERIFIED_FRONTEND_PRODUCTS}
            onAddProduct={handleAddProduct}
            onRemoveProduct={handleRemoveProduct}
            onRequestQuote={setSelectedQuoteProduct}
          />
        ) : (
          <div className="industrial-card p-12 text-center rounded border border-industrial-800 space-y-4">
            <div className="w-12 h-12 bg-industrial-900 rounded-full flex items-center justify-center mx-auto text-brand-yellow">
              <GitCompare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white uppercase font-mono">
              NO MACHINERY SELECTED FOR COMPARISON
            </h3>
            <p className="text-xs text-industrial-400 max-w-md mx-auto">
              Please select at least 2 models from the catalogue or choose one of the predefined engineering presets above.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="px-5 py-2.5 bg-brand-yellow text-industrial-950 font-bold font-mono text-xs rounded uppercase hover:bg-brand-yellow-400 transition-colors inline-flex items-center gap-2"
              >
                <span>Browse Equipment Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 3. Quick Quotation Modal */}
      <QuickQuoteModal
        product={selectedQuoteProduct}
        isOpen={!!selectedQuoteProduct}
        onClose={() => setSelectedQuoteProduct(null)}
      />
    </div>
  );
}

export default function ProductComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-industrial-950 p-12 text-center text-white font-mono">
          Loading Machinery Comparison Matrix...
        </div>
      }
    >
      <ProductCompareContent />
    </Suspense>
  );
}
