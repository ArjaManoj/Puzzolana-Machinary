import React from 'react';
import Link from 'next/link';
import { OFFICIAL_CATEGORIES } from '@/lib/seedCatalog';
import { EquipmentCategorySlug } from '@/types';
import { Layers } from 'lucide-react';

interface CategoryPillsProps {
  activeCategory?: EquipmentCategorySlug | 'all';
  onSelectCategory?: (category: EquipmentCategorySlug | 'all') => void;
  totalProductsCount?: number;
  categoryCounts?: Record<string, number>;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  activeCategory = 'all',
  onSelectCategory,
  totalProductsCount = 15,
  categoryCounts = {},
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-industrial-700">
      <div className="flex items-center gap-2 min-w-max">
        {/* All Products Pill */}
        {onSelectCategory ? (
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-sm text-xs font-bold font-mono tracking-wide transition-all duration-150 flex items-center gap-2 border ${
              activeCategory === 'all'
                ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow-lg shadow-brand-yellow/10'
                : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:border-industrial-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ALL EQUIPMENT</span>
            <span
              className={`px-1.5 py-0.5 text-[10px] rounded ${
                activeCategory === 'all'
                  ? 'bg-industrial-950 text-brand-yellow'
                  : 'bg-industrial-800 text-industrial-400'
              }`}
            >
              {totalProductsCount}
            </span>
          </button>
        ) : (
          <Link
            href="/products"
            className={`px-4 py-2 rounded-sm text-xs font-bold font-mono tracking-wide transition-all duration-150 flex items-center gap-2 border ${
              activeCategory === 'all'
                ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow-lg shadow-brand-yellow/10'
                : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:border-industrial-700 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ALL EQUIPMENT</span>
            <span
              className={`px-1.5 py-0.5 text-[10px] rounded ${
                activeCategory === 'all'
                  ? 'bg-industrial-950 text-brand-yellow'
                  : 'bg-industrial-800 text-industrial-400'
              }`}
            >
              {totalProductsCount}
            </span>
          </Link>
        )}

        {/* Category Specific Pills */}
        {OFFICIAL_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = categoryCounts[cat.id] ?? cat.totalModels;

          if (onSelectCategory) {
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-sm text-xs font-bold font-mono tracking-wide transition-all duration-150 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow-lg shadow-brand-yellow/10'
                    : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:border-industrial-700 hover:text-white'
                }`}
              >
                <span>{cat.name.toUpperCase()}</span>
                <span
                  className={`px-1.5 py-0.5 text-[10px] rounded ${
                    isActive
                      ? 'bg-industrial-950 text-brand-yellow'
                      : 'bg-industrial-800 text-industrial-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={cat.id}
              href={`/products/${cat.id}`}
              className={`px-4 py-2 rounded-sm text-xs font-bold font-mono tracking-wide transition-all duration-150 flex items-center gap-2 border ${
                isActive
                  ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow-lg shadow-brand-yellow/10'
                  : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:border-industrial-700 hover:text-white'
              }`}
            >
              <span>{cat.name.toUpperCase()}</span>
              <span
                className={`px-1.5 py-0.5 text-[10px] rounded ${
                  isActive
                    ? 'bg-industrial-950 text-brand-yellow'
                    : 'bg-industrial-800 text-industrial-400'
                }`}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
