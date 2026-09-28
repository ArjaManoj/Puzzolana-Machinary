import React from 'react';
import { LayoutGrid, Table, SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import { FilterState } from './CatalogueFilters';

interface CatalogueSortViewBarProps {
  totalCount: number;
  filteredCount: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  onToggleMobileFilters?: () => void;
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState, value?: string) => void;
}

export const CatalogueSortViewBar: React.FC<CatalogueSortViewBarProps> = ({
  totalCount,
  filteredCount,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onToggleMobileFilters,
  filters,
  onRemoveFilter,
}) => {
  return (
    <div className="space-y-3">
      {/* Top Bar: Counts, Sort & View Switches */}
      <div className="bg-industrial-900/90 border border-industrial-800 p-3.5 rounded-sm flex flex-wrap items-center justify-between gap-4">
        {/* Left: Results Count & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          {onToggleMobileFilters && (
            <button
              onClick={onToggleMobileFilters}
              className="lg:hidden px-3 py-1.5 bg-industrial-800 hover:bg-industrial-700 text-white rounded text-xs font-mono font-bold flex items-center gap-1.5 border border-industrial-700"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Filters</span>
            </button>
          )}

          <div className="text-xs font-mono">
            <span className="text-industrial-400">Displaying </span>
            <strong className="text-brand-yellow font-bold">{filteredCount}</strong>
            <span className="text-industrial-400"> of {totalCount} verified machines</span>
          </div>
        </div>

        {/* Right: Sort Dropdown & Layout Mode Toggles */}
        <div className="flex items-center gap-3">
          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <ArrowUpDown className="w-3.5 h-3.5 text-industrial-400 hidden sm:inline" />
            <span className="text-industrial-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-industrial-950 border border-industrial-700 text-white text-xs px-2.5 py-1.5 rounded-sm focus:outline-none focus:border-brand-yellow font-mono"
            >
              <option value="featured">Featured Machinery</option>
              <option value="capacity_desc">Capacity: High to Low (TPH)</option>
              <option value="capacity_asc">Capacity: Low to High (TPH)</option>
              <option value="power_desc">Power Rating: High to Low (kW)</option>
              <option value="model_asc">Model Number (A-Z)</option>
            </select>
          </div>

          {/* Grid vs Table View Mode Switcher */}
          <div className="flex items-center bg-industrial-950 border border-industrial-800 rounded-sm p-0.5">
            <button
              onClick={() => onViewModeChange('grid')}
              title="Grid Cards View"
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-brand-yellow text-industrial-950 shadow'
                  : 'text-industrial-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              title="Dense Specifications Table View"
              className={`p-1.5 rounded text-xs transition-colors ${
                viewMode === 'table'
                  ? 'bg-brand-yellow text-industrial-950 shadow'
                  : 'text-industrial-400 hover:text-white'
              }`}
            >
              <Table className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Badges Row */}
      {(filters.search ||
        filters.category !== 'all' ||
        filters.subcategories.length > 0 ||
        filters.mobilityTypes.length > 0 ||
        filters.application ||
        filters.material ||
        filters.maxCapacity < 1200 ||
        filters.minCapacity > 0) && (
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-[11px] font-mono text-industrial-400 uppercase tracking-wider">
            Active:
          </span>

          {filters.search && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-industrial-800 border border-industrial-700 text-white font-mono text-[11px]">
              Query: &quot;{filters.search}&quot;
              <button
                onClick={() => onRemoveFilter('search')}
                className="text-industrial-400 hover:text-brand-yellow"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.category !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow font-mono text-[11px]">
              Cat: {filters.category}
              <button
                onClick={() => onRemoveFilter('category')}
                className="text-brand-yellow hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.subcategories.map((sub) => (
            <span
              key={sub}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-industrial-800 border border-industrial-700 text-white font-mono text-[11px]"
            >
              {sub}
              <button
                onClick={() => onRemoveFilter('subcategories', sub)}
                className="text-industrial-400 hover:text-brand-yellow"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.mobilityTypes.map((mob) => (
            <span
              key={mob}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-industrial-800 border border-industrial-700 text-white font-mono text-[11px]"
            >
              {mob}
              <button
                onClick={() => onRemoveFilter('mobilityTypes', mob)}
                className="text-industrial-400 hover:text-brand-yellow"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {(filters.minCapacity > 0 || filters.maxCapacity < 1200) && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-industrial-800 border border-industrial-700 text-white font-mono text-[11px]">
              Capacity: {filters.minCapacity} - {filters.maxCapacity} TPH
              <button
                onClick={() => {
                  onRemoveFilter('minCapacity');
                  onRemoveFilter('maxCapacity');
                }}
                className="text-industrial-400 hover:text-brand-yellow"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.application && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-industrial-800 border border-industrial-700 text-white font-mono text-[11px]">
              App: {filters.application}
              <button
                onClick={() => onRemoveFilter('application')}
                className="text-industrial-400 hover:text-brand-yellow"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.material && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-industrial-800 border border-industrial-700 text-white font-mono text-[11px]">
              Material: {filters.material}
              <button
                onClick={() => onRemoveFilter('material')}
                className="text-industrial-400 hover:text-brand-yellow"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
