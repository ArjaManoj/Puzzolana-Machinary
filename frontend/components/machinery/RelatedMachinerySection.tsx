import React from 'react';
import { MachineryProduct } from '@/types';
import { MachineCard } from './MachineCard';
import { Layers, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RelatedMachinerySectionProps {
  relatedProducts: MachineryProduct[];
  category: string;
  onToggleCompare?: (productId: string) => void;
  comparedIds?: string[];
  onRequestQuote?: (product: MachineryProduct) => void;
}

export const RelatedMachinerySection: React.FC<RelatedMachinerySectionProps> = ({
  relatedProducts,
  category,
  onToggleCompare,
  comparedIds = [],
  onRequestQuote,
}) => {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <section className="border-t border-industrial-800 pt-12 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-brand-yellow uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>CIRCUIT COMPATIBILITY</span>
          </div>
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">
            COMPLEMENTARY PLANT MACHINERY
          </h3>
          <p className="text-xs text-industrial-400 mt-1 font-sans">
            Engineered to pair seamlessly with downstream tertiary crushing, screening, or sand washing stages.
          </p>
        </div>

        <Link
          href={`/products/${category}`}
          className="text-xs font-mono font-bold text-brand-yellow hover:text-white flex items-center gap-1 min-w-max"
        >
          <span>View All in Category</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <MachineCard
            key={product.id}
            product={product}
            isCompared={comparedIds.includes(product.id)}
            onToggleCompare={onToggleCompare}
            onRequestQuote={onRequestQuote}
          />
        ))}
      </div>
    </section>
  );
};
