import React from 'react';
import Link from 'next/link';
import { OFFICIAL_CATEGORIES } from '@/lib/seedCatalog';
import { ArrowRight, Layers, Shield } from 'lucide-react';

export const CategoryCardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {OFFICIAL_CATEGORIES.map((cat, idx) => (
        <Link
          key={cat.id}
          href={`/products/${cat.id}`}
          className="industrial-card rounded-sm overflow-hidden flex flex-col justify-between group border border-industrial-800 hover:border-brand-yellow/60 transition-all duration-300 relative bg-industrial-900/60"
        >
          {/* Card Image Banner */}
          <div className="relative h-44 bg-industrial-950 overflow-hidden border-b border-industrial-800">
            <img
              src={cat.heroImage}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale contrast-125 group-hover:filter-none group-hover:contrast-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/40 to-transparent" />

            {/* Model Count Badge */}
            <div className="absolute top-3 right-3 bg-industrial-950/90 backdrop-blur border border-industrial-800 px-2 py-0.5 rounded text-[11px] font-mono text-brand-yellow font-bold">
              {cat.totalModels} Verified Models
            </div>

            {/* Step / Index Pill */}
            <div className="absolute top-3 left-3 bg-industrial-950/90 border border-industrial-800 text-[10px] font-mono text-industrial-400 px-2 py-0.5 rounded">
              0{idx + 1}
            </div>

            {/* Category Title on Image */}
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-base font-black text-white group-hover:text-brand-yellow transition-colors uppercase leading-tight font-mono">
                {cat.name}
              </h3>
            </div>
          </div>

          {/* Description & Subcategories */}
          <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
            <p className="text-xs text-industrial-300 line-clamp-2 leading-relaxed font-sans">
              {cat.tagline}
            </p>

            {/* Subcategory Pills */}
            <div className="flex flex-wrap gap-1 pt-1">
              {cat.subcategories.slice(0, 3).map((sub, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 rounded bg-industrial-950 border border-industrial-800 text-[10px] font-mono text-industrial-400"
                >
                  {sub}
                </span>
              ))}
            </div>

            {/* Bottom Link CTA */}
            <div className="pt-3 border-t border-industrial-800/60 flex items-center justify-between text-xs font-mono font-bold text-brand-yellow group-hover:text-white transition-colors">
              <span>EXPLORE FLEET</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
