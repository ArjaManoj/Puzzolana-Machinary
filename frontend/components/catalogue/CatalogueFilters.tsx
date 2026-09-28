import React from 'react';
import { Search, RotateCcw, Filter, ChevronDown, ChevronUp, Sliders } from 'lucide-react';
import { EquipmentCategorySlug } from '@/types';
import { OFFICIAL_CATEGORIES } from '@/lib/seedCatalog';
import { TARGET_INDUSTRIES, RAW_MATERIALS } from '@/lib/constants';

export interface FilterState {
  search: string;
  category: EquipmentCategorySlug | 'all';
  subcategories: string[];
  mobilityTypes: string[];
  minCapacity: number;
  maxCapacity: number;
  application: string;
  material: string;
}

interface CatalogueFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  availableSubcategories?: string[];
  activeFilterCount: number;
}

export const CatalogueFilters: React.FC<CatalogueFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  availableSubcategories = [],
  activeFilterCount,
}) => {
  const [openSections, setOpenSections] = React.useState({
    search: true,
    category: true,
    subcategories: true,
    capacity: true,
    mobility: true,
    applications: false,
    materials: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubcategoryToggle = (subcat: string) => {
    const current = filters.subcategories;
    const updated = current.includes(subcat)
      ? current.filter((s) => s !== subcat)
      : [...current, subcat];
    onFilterChange({ subcategories: updated });
  };

  const handleMobilityToggle = (mob: string) => {
    const current = filters.mobilityTypes;
    const updated = current.includes(mob)
      ? current.filter((m) => m !== mob)
      : [...current, mob];
    onFilterChange({ mobilityTypes: updated });
  };

  const MOBILITY_OPTIONS = ['Stationary', 'Track-Mounted', 'Skid-Mounted', 'Wheel-Mounted'];

  return (
    <div className="industrial-card p-5 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/90 backdrop-blur-md">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-industrial-800 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-yellow" />
          <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono">
            ENGINEERING FILTERS
          </h3>
          {activeFilterCount > 0 && (
            <span className="bg-brand-yellow text-industrial-950 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs text-brand-yellow/80 hover:text-brand-yellow flex items-center gap-1 font-mono transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Quick Search */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search model, specs, type..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 bg-industrial-950 border border-industrial-700 rounded-sm text-xs text-white placeholder-industrial-500 focus:outline-none focus:border-brand-yellow font-mono"
          />
          <Search className="w-4 h-4 text-industrial-400 absolute left-3 top-2.5" />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-2.5 top-2 text-industrial-500 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. Equipment Category */}
      <div className="border-t border-industrial-800 pt-4">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-xs font-mono font-bold text-white uppercase mb-2 hover:text-brand-yellow transition-colors"
        >
          <span>Category ({OFFICIAL_CATEGORIES.length})</span>
          {openSections.category ? (
            <ChevronUp className="w-3.5 h-3.5 text-industrial-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-industrial-400" />
          )}
        </button>

        {openSections.category && (
          <div className="space-y-1 mt-2 text-xs">
            <label
              className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition-colors ${
                filters.category === 'all'
                  ? 'bg-brand-yellow/10 text-brand-yellow font-bold'
                  : 'text-industrial-300 hover:bg-industrial-800/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="catalogue-category"
                  checked={filters.category === 'all'}
                  onChange={() => onFilterChange({ category: 'all', subcategories: [] })}
                  className="w-3.5 h-3.5 text-brand-yellow focus:ring-brand-yellow bg-industrial-950 border-industrial-700"
                />
                <span>All Categories</span>
              </div>
            </label>

            {OFFICIAL_CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                className={`flex items-center justify-between p-1.5 rounded cursor-pointer transition-colors ${
                  filters.category === cat.id
                    ? 'bg-brand-yellow/10 text-brand-yellow font-bold'
                    : 'text-industrial-300 hover:bg-industrial-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="catalogue-category"
                    checked={filters.category === cat.id}
                    onChange={() => onFilterChange({ category: cat.id, subcategories: [] })}
                    className="w-3.5 h-3.5 text-brand-yellow focus:ring-brand-yellow bg-industrial-950 border-industrial-700"
                  />
                  <span>{cat.name}</span>
                </div>
                <span className="text-[10px] font-mono text-industrial-500">
                  {cat.totalModels}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 3. Subcategories Filter (If Category Selected or Available) */}
      {availableSubcategories.length > 0 && (
        <div className="border-t border-industrial-800 pt-4">
          <button
            onClick={() => toggleSection('subcategories')}
            className="flex items-center justify-between w-full text-xs font-mono font-bold text-white uppercase mb-2 hover:text-brand-yellow transition-colors"
          >
            <span>Sub-Type / Machinery Line</span>
            {openSections.subcategories ? (
              <ChevronUp className="w-3.5 h-3.5 text-industrial-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-industrial-400" />
            )}
          </button>

          {openSections.subcategories && (
            <div className="space-y-1.5 mt-2 text-xs">
              {availableSubcategories.map((subcat) => {
                const isSelected = filters.subcategories.includes(subcat);
                return (
                  <label
                    key={subcat}
                    className="flex items-center gap-2 text-industrial-300 hover:text-white cursor-pointer select-none py-0.5"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSubcategoryToggle(subcat)}
                      className="w-3.5 h-3.5 rounded bg-industrial-950 border-industrial-700 text-brand-yellow focus:ring-brand-yellow"
                    />
                    <span className={isSelected ? 'text-brand-yellow font-medium' : ''}>
                      {subcat}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. Capacity Range Slider (TPH) */}
      <div className="border-t border-industrial-800 pt-4">
        <button
          onClick={() => toggleSection('capacity')}
          className="flex items-center justify-between w-full text-xs font-mono font-bold text-white uppercase mb-2 hover:text-brand-yellow transition-colors"
        >
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3 h-3 text-brand-yellow" />
            <span>Capacity (TPH)</span>
          </div>
          {openSections.capacity ? (
            <ChevronUp className="w-3.5 h-3.5 text-industrial-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-industrial-400" />
          )}
        </button>

        {openSections.capacity && (
          <div className="space-y-3 mt-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-industrial-400">Min: <strong className="text-white">{filters.minCapacity} TPH</strong></span>
              <span className="text-industrial-400">Max: <strong className="text-white">{filters.maxCapacity} TPH</strong></span>
            </div>

            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1200"
                step="25"
                value={filters.maxCapacity}
                onChange={(e) => onFilterChange({ maxCapacity: Number(e.target.value) })}
                className="w-full accent-brand-yellow bg-industrial-950 h-1.5 rounded cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div>
                <label className="text-industrial-500 block mb-1">Min TPH</label>
                <input
                  type="number"
                  min="0"
                  max="1200"
                  value={filters.minCapacity}
                  onChange={(e) => onFilterChange({ minCapacity: Number(e.target.value) || 0 })}
                  className="w-full px-2 py-1 bg-industrial-950 border border-industrial-700 rounded text-white text-xs"
                />
              </div>
              <div>
                <label className="text-industrial-500 block mb-1">Max TPH</label>
                <input
                  type="number"
                  min="0"
                  max="1200"
                  value={filters.maxCapacity}
                  onChange={(e) => onFilterChange({ maxCapacity: Number(e.target.value) || 1200 })}
                  className="w-full px-2 py-1 bg-industrial-950 border border-industrial-700 rounded text-white text-xs"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Mobility Types */}
      <div className="border-t border-industrial-800 pt-4">
        <button
          onClick={() => toggleSection('mobility')}
          className="flex items-center justify-between w-full text-xs font-mono font-bold text-white uppercase mb-2 hover:text-brand-yellow transition-colors"
        >
          <span>Mobility / Mounting</span>
          {openSections.mobility ? (
            <ChevronUp className="w-3.5 h-3.5 text-industrial-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-industrial-400" />
          )}
        </button>

        {openSections.mobility && (
          <div className="space-y-1.5 mt-2 text-xs">
            {MOBILITY_OPTIONS.map((mob) => {
              const isSelected = filters.mobilityTypes.includes(mob);
              return (
                <label
                  key={mob}
                  className="flex items-center gap-2 text-industrial-300 hover:text-white cursor-pointer select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleMobilityToggle(mob)}
                    className="w-3.5 h-3.5 rounded bg-industrial-950 border-industrial-700 text-brand-yellow focus:ring-brand-yellow"
                  />
                  <span className={isSelected ? 'text-brand-yellow font-medium' : ''}>
                    {mob}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Target Application Industry */}
      <div className="border-t border-industrial-800 pt-4">
        <button
          onClick={() => toggleSection('applications')}
          className="flex items-center justify-between w-full text-xs font-mono font-bold text-white uppercase mb-2 hover:text-brand-yellow transition-colors"
        >
          <span>Target Industry</span>
          {openSections.applications ? (
            <ChevronUp className="w-3.5 h-3.5 text-industrial-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-industrial-400" />
          )}
        </button>

        {openSections.applications && (
          <div className="space-y-1 mt-2 text-xs">
            <select
              value={filters.application}
              onChange={(e) => onFilterChange({ application: e.target.value })}
              className="w-full px-2.5 py-2 bg-industrial-950 border border-industrial-700 rounded text-xs text-white focus:outline-none focus:border-brand-yellow"
            >
              <option value="">All Industries</option>
              {TARGET_INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 7. Raw Material Handled */}
      <div className="border-t border-industrial-800 pt-4">
        <button
          onClick={() => toggleSection('materials')}
          className="flex items-center justify-between w-full text-xs font-mono font-bold text-white uppercase mb-2 hover:text-brand-yellow transition-colors"
        >
          <span>Raw Material</span>
          {openSections.materials ? (
            <ChevronUp className="w-3.5 h-3.5 text-industrial-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-industrial-400" />
          )}
        </button>

        {openSections.materials && (
          <div className="space-y-1 mt-2 text-xs">
            <select
              value={filters.material}
              onChange={(e) => onFilterChange({ material: e.target.value })}
              className="w-full px-2.5 py-2 bg-industrial-950 border border-industrial-700 rounded text-xs text-white focus:outline-none focus:border-brand-yellow"
            >
              <option value="">All Raw Materials</option>
              {RAW_MATERIALS.map((mat) => (
                <option key={mat} value={mat}>
                  {mat}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
