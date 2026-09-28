'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  OFFICIAL_CATEGORIES,
  VERIFIED_FRONTEND_PRODUCTS,
  CategoryMetadata,
} from '@/lib/seedCatalog';
import { MachineryProduct, EquipmentCategorySlug } from '@/types';
import {
  MachineCard,
  SpecMatrixTable,
} from '@/components/machinery';
import {
  CatalogueSortViewBar,
  ProductTableView,
  ComparisonTray,
  QuickQuoteModal,
  FilterState,
  CategoryPills,
} from '@/components/catalogue';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryProductsPage({ params }: CategoryPageProps) {
  const categorySlug = params.category as EquipmentCategorySlug;
  const categoryData: CategoryMetadata | undefined = OFFICIAL_CATEGORIES.find(
    (c) => c.id === categorySlug
  );

  if (!categoryData) {
    notFound();
  }

  // State
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<MachineryProduct | null>(null);

  // Category products
  const categoryProducts = useMemo(() => {
    return VERIFIED_FRONTEND_PRODUCTS.filter((p) => p.category === categorySlug);
  }, [categorySlug]);

  // Subcategory filtered products
  const filteredProducts = useMemo(() => {
    return categoryProducts
      .filter((p) => {
        if (selectedSubcategory !== 'all' && p.subcategory !== selectedSubcategory) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'capacity_desc') return b.capacityMaxTPH - a.capacityMaxTPH;
        if (sortBy === 'capacity_asc') return a.capacityMinTPH - b.capacityMinTPH;
        if (sortBy === 'power_desc') return b.powerRatingKW - a.powerRatingKW;
        if (sortBy === 'model_asc') return a.modelNumber.localeCompare(b.modelNumber);
        return 0;
      });
  }, [categoryProducts, selectedSubcategory, sortBy]);

  // Comparison handlers
  const handleToggleCompare = (productId: string) => {
    setComparedIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        alert('You can compare a maximum of 4 machines simultaneously.');
        return prev;
      }
      return [...prev, productId];
    });
  };

  const comparedProducts = useMemo(() => {
    return VERIFIED_FRONTEND_PRODUCTS.filter((p) => comparedIds.includes(p.id));
  }, [comparedIds]);

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* 1. Category Dedicated Hero Header */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 filter grayscale contrast-150 pointer-events-none"
          style={{ backgroundImage: `url(${categoryData.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/80 to-transparent pointer-events-none" />

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
            <span className="text-brand-yellow font-bold uppercase">{categoryData.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            <div className="lg:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{categoryData.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                {categoryData.name.toUpperCase()}
              </h1>

              <p className="text-sm sm:text-base text-industrial-300 leading-relaxed font-sans max-w-2xl">
                {categoryData.description}
              </p>

              {/* Key Engineering Strengths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {categoryData.keyStrengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs font-mono text-industrial-300"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Stat Box */}
            <div className="bg-industrial-950/80 p-5 rounded border border-industrial-800 space-y-3 font-mono">
              <span className="text-[10px] text-industrial-500 uppercase tracking-widest block">
                CATEGORY FLEET SUMMARY
              </span>
              <div className="flex items-baseline justify-between border-b border-industrial-800 pb-2">
                <span className="text-xs text-industrial-400">Verified Models</span>
                <strong className="text-lg font-black text-brand-yellow">
                  {categoryProducts.length} Models
                </strong>
              </div>
              <div className="flex items-baseline justify-between border-b border-industrial-800 pb-2">
                <span className="text-xs text-industrial-400">Sub-Types</span>
                <strong className="text-xs font-bold text-white">
                  {categoryData.subcategories.length} Lines
                </strong>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-industrial-400">Application</span>
                <span className="text-xs text-brand-yellow/90 font-bold">24/7 Heavy Duty</span>
              </div>
            </div>
          </div>

          {/* Category Switcher Pills */}
          <div className="mt-8 pt-6 border-t border-industrial-800/80">
            <CategoryPills activeCategory={categorySlug} totalProductsCount={15} />
          </div>
        </div>
      </section>

      {/* 2. Subcategory Tabs & Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* Subcategory Selector Tabs */}
        {categoryData.subcategories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-industrial-800">
            <button
              onClick={() => setSelectedSubcategory('all')}
              className={`px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-colors border ${
                selectedSubcategory === 'all'
                  ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow'
                  : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:border-industrial-700 hover:text-white'
              }`}
            >
              All {categoryData.name} ({categoryProducts.length})
            </button>
            {categoryData.subcategories.map((subcat) => {
              const count = categoryProducts.filter((p) => p.subcategory === subcat).length;
              return (
                <button
                  key={subcat}
                  onClick={() => setSelectedSubcategory(subcat)}
                  className={`px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-colors border ${
                    selectedSubcategory === subcat
                      ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow'
                      : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:border-industrial-700 hover:text-white'
                  }`}
                >
                  {subcat} {count > 0 ? `(${count})` : ''}
                </button>
              );
            })}
          </div>
        )}

        {/* View Mode & Sort Bar */}
        <CatalogueSortViewBar
          totalCount={categoryProducts.length}
          filteredCount={filteredProducts.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          filters={{
            search: '',
            category: categorySlug,
            subcategories: selectedSubcategory !== 'all' ? [selectedSubcategory] : [],
            mobilityTypes: [],
            minCapacity: 0,
            maxCapacity: 1200,
            application: '',
            material: '',
          }}
          onRemoveFilter={() => setSelectedSubcategory('all')}
        />

        {/* Products Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <MachineCard
                key={product.id}
                product={product}
                isCompared={comparedIds.includes(product.id)}
                onToggleCompare={handleToggleCompare}
                onRequestQuote={setSelectedQuoteProduct}
              />
            ))}
          </div>
        )}

        {/* Technical Data Table View */}
        {viewMode === 'table' && (
          <ProductTableView
            products={filteredProducts}
            comparedIds={comparedIds}
            onToggleCompare={handleToggleCompare}
            onRequestQuote={setSelectedQuoteProduct}
          />
        )}
      </section>

      {/* 3. Floating Comparison Tray */}
      <ComparisonTray
        comparedProducts={comparedProducts}
        onRemove={handleToggleCompare}
        onClear={() => setComparedIds([])}
      />

      {/* 4. Quick Quotation Modal */}
      <QuickQuoteModal
        product={selectedQuoteProduct}
        isOpen={!!selectedQuoteProduct}
        onClose={() => setSelectedQuoteProduct(null)}
      />
    </div>
  );
}
