'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  CategoryPills,
  CatalogueFilters,
  CatalogueSortViewBar,
  ProductTableView,
  ComparisonTray,
  QuickQuoteModal,
  FilterState,
} from '@/components/catalogue';
import { MachineCard } from '@/components/machinery';
import { VERIFIED_FRONTEND_PRODUCTS, OFFICIAL_CATEGORIES } from '@/lib/seedCatalog';
import { MachineryProduct, EquipmentCategorySlug } from '@/types';
import {
  ShieldCheck,
  Zap,
  Sliders,
  Layers,
  Sparkles,
  ChevronRight,
  Search,
} from 'lucide-react';
import Link from 'next/link';

function ProductsCatalogueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial query params
  const initialCategory = (searchParams.get('category') as EquipmentCategorySlug) || 'all';
  const initialSearch = searchParams.get('search') || '';

  // Local state for products & filters
  const [products, setProducts] = useState<MachineryProduct[]>(VERIFIED_FRONTEND_PRODUCTS);
  const [filters, setFilters] = useState<FilterState>({
    search: initialSearch,
    category: initialCategory,
    subcategories: [],
    mobilityTypes: [],
    minCapacity: 0,
    maxCapacity: 1200,
    application: '',
    material: '',
  });

  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<MachineryProduct | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // Sync category param changes if URL updates
  useEffect(() => {
    const cat = searchParams.get('category') as EquipmentCategorySlug | null;
    if (cat) {
      setFilters((prev) => ({ ...prev, category: cat }));
    }
  }, [searchParams]);

  // Compute available subcategories based on selected category
  const availableSubcategories = useMemo(() => {
    if (filters.category === 'all') {
      const allSubs = new Set<string>();
      OFFICIAL_CATEGORIES.forEach((c) => c.subcategories.forEach((s) => allSubs.add(s)));
      return Array.from(allSubs);
    }
    const currentCat = OFFICIAL_CATEGORIES.find((c) => c.id === filters.category);
    return currentCat ? currentCat.subcategories : [];
  }, [filters.category]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    OFFICIAL_CATEGORIES.forEach((c) => {
      counts[c.id] = products.filter((p) => p.category === c.id).length;
    });
    return counts;
  }, [products]);

  // Handle filter updates
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      subcategories: [],
      mobilityTypes: [],
      minCapacity: 0,
      maxCapacity: 1200,
      application: '',
      material: '',
    });
  };

  const handleRemoveFilter = (key: keyof FilterState, value?: string) => {
    if (key === 'subcategories' && value) {
      setFilters((prev) => ({
        ...prev,
        subcategories: prev.subcategories.filter((s) => s !== value),
      }));
    } else if (key === 'mobilityTypes' && value) {
      setFilters((prev) => ({
        ...prev,
        mobilityTypes: prev.mobilityTypes.filter((m) => m !== value),
      }));
    } else if (key === 'category') {
      setFilters((prev) => ({ ...prev, category: 'all', subcategories: [] }));
    } else if (key === 'minCapacity') {
      setFilters((prev) => ({ ...prev, minCapacity: 0 }));
    } else if (key === 'maxCapacity') {
      setFilters((prev) => ({ ...prev, maxCapacity: 1200 }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: '' }));
    }
  };

  // Active filter count calculator
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.category !== 'all') count++;
    count += filters.subcategories.length;
    count += filters.mobilityTypes.length;
    if (filters.minCapacity > 0) count++;
    if (filters.maxCapacity < 1200) count++;
    if (filters.application) count++;
    if (filters.material) count++;
    return count;
  }, [filters]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search text matching
        if (filters.search) {
          const query = filters.search.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchModel = product.modelNumber.toLowerCase().includes(query);
          const matchSub = product.subcategory.toLowerCase().includes(query);
          const matchDesc = product.shortDescription.toLowerCase().includes(query);
          const matchMat = product.materialsHandled?.some((m) => m.toLowerCase().includes(query));
          const matchApp = product.applications?.some((a) => a.toLowerCase().includes(query));
          if (!matchName && !matchModel && !matchSub && !matchDesc && !matchMat && !matchApp) {
            return false;
          }
        }

        // Category filter
        if (filters.category !== 'all' && product.category !== filters.category) {
          return false;
        }

        // Subcategory filter
        if (
          filters.subcategories.length > 0 &&
          !filters.subcategories.includes(product.subcategory)
        ) {
          return false;
        }

        // Mobility filter
        if (
          filters.mobilityTypes.length > 0 &&
          !filters.mobilityTypes.includes(product.mobilityType)
        ) {
          return false;
        }

        // Capacity filter
        if (product.capacityMaxTPH < filters.minCapacity) return false;
        if (product.capacityMinTPH > filters.maxCapacity) return false;

        // Application filter
        if (
          filters.application &&
          !product.applications?.some((app) => app.includes(filters.application))
        ) {
          return false;
        }

        // Material filter
        if (
          filters.material &&
          !product.materialsHandled?.some((mat) => mat.includes(filters.material))
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'capacity_desc') return b.capacityMaxTPH - a.capacityMaxTPH;
        if (sortBy === 'capacity_asc') return a.capacityMinTPH - b.capacityMinTPH;
        if (sortBy === 'power_desc') return b.powerRatingKW - a.powerRatingKW;
        if (sortBy === 'model_asc') return a.modelNumber.localeCompare(b.modelNumber);
        return 0; // Default featured
      });
  }, [products, filters, sortBy]);

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

  const handleClearCompare = () => {
    setComparedIds([]);
  };

  const comparedProducts = useMemo(() => {
    return products.filter((p) => comparedIds.includes(p.id));
  }, [products, comparedIds]);

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* 1. Hero Header */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <span className="text-brand-yellow font-bold">EQUIPMENT CATALOGUE</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL PRODUCT FLEET & SPECIFICATION DIRECTORY</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                HEAVY INDUSTRIAL <span className="text-brand-yellow">MACHINERY</span>
              </h1>

              <p className="text-sm sm:text-base text-industrial-300 leading-relaxed font-sans">
                Explore Puzzolana&apos;s field-tested crushing, screening, washing, mining, and road-building
                equipment. Every machine is manufactured in ISO-certified facilities and engineered for abrasive Indian rock conditions.
              </p>
            </div>

            {/* Industrial Stat Badges */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 font-mono text-xs">
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Categories</span>
                <strong className="text-xl font-black text-brand-yellow">8 Official</strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Fleet Range</span>
                <strong className="text-xl font-black text-white">80–1200</strong>
                <span className="text-industrial-400 text-[10px] ml-1">TPH</span>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Verified Models</span>
                <strong className="text-xl font-black text-brand-yellow">15+ Units</strong>
              </div>
            </div>
          </div>

          {/* Category Quick Pills */}
          <div className="mt-8 pt-6 border-t border-industrial-800/80">
            <CategoryPills
              activeCategory={filters.category}
              onSelectCategory={(cat) => handleFilterChange({ category: cat, subcategories: [] })}
              totalProductsCount={products.length}
              categoryCounts={categoryCounts}
            />
          </div>
        </div>
      </section>

      {/* 2. Main Catalogue Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Left Column: Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-24">
            <CatalogueFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              availableSubcategories={availableSubcategories}
              activeFilterCount={activeFilterCount}
            />
          </aside>

          {/* Right Column: Catalogue Listings */}
          <main className="lg:col-span-3 space-y-6">
            {/* Sort & View Mode Top Bar */}
            <CatalogueSortViewBar
              totalCount={products.length}
              filteredCount={filteredProducts.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              onToggleMobileFilters={() => setIsMobileFiltersOpen(true)}
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
            />

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="industrial-card p-12 text-center rounded border border-industrial-800 space-y-4">
                <div className="w-12 h-12 bg-industrial-800 rounded-full flex items-center justify-center mx-auto text-industrial-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white uppercase font-mono">
                  No Machinery Matches the Selected Filters
                </h3>
                <p className="text-xs text-industrial-400 max-w-md mx-auto">
                  Try clearing some filter criteria, broadening the capacity range, or searching for a different rock type.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-brand-yellow text-industrial-950 font-bold font-mono text-xs rounded hover:bg-brand-yellow-400 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* View Mode 1: Grid Cards */}
            {viewMode === 'grid' && filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

            {/* View Mode 2: High-Density Technical Table */}
            {viewMode === 'table' && filteredProducts.length > 0 && (
              <ProductTableView
                products={filteredProducts}
                comparedIds={comparedIds}
                onToggleCompare={handleToggleCompare}
                onRequestQuote={setSelectedQuoteProduct}
              />
            )}
          </main>
        </div>
      </section>

      {/* 3. Mobile Filter Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-xs bg-industrial-950 h-full p-5 overflow-y-auto border-l border-industrial-800 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-industrial-800">
                <h3 className="text-sm font-black text-white uppercase font-mono">FILTERS</h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-industrial-400 hover:text-white text-sm font-bold font-mono"
                >
                  ✕ Close
                </button>
              </div>

              <CatalogueFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                availableSubcategories={availableSubcategories}
                activeFilterCount={activeFilterCount}
              />
            </div>

            <div className="pt-4 border-t border-industrial-800 mt-6">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-2.5 bg-brand-yellow text-industrial-950 font-black font-mono text-xs rounded uppercase"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Floating Comparison Tray */}
      <ComparisonTray
        comparedProducts={comparedProducts}
        onRemove={handleToggleCompare}
        onClear={handleClearCompare}
      />

      {/* 5. Quick Quotation Modal */}
      <QuickQuoteModal
        product={selectedQuoteProduct}
        isOpen={!!selectedQuoteProduct}
        onClose={() => setSelectedQuoteProduct(null)}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-industrial-950 p-12 text-center text-white font-mono">Loading Puzzolana Machinery Catalogue...</div>}>
      <ProductsCatalogueContent />
    </Suspense>
  );
}
