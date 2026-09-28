import React from 'react';
import { MachineryProduct } from '@/types';
import { Button } from '../common/Button';
import {
  FileDown,
  FileText,
  PhoneCall,
  Mail,
  ShieldCheck,
  Zap,
  GitCompare,
  Clock,
} from 'lucide-react';

interface ProductActionCardProps {
  product: MachineryProduct;
  onRequestQuote: () => void;
  isCompared?: boolean;
  onToggleCompare?: () => void;
}

export const ProductActionCard: React.FC<ProductActionCardProps> = ({
  product,
  onRequestQuote,
  isCompared = false,
  onToggleCompare,
}) => {
  return (
    <div className="industrial-card p-6 rounded-sm border border-industrial-800 space-y-6 bg-industrial-900/90 backdrop-blur sticky top-24">
      {/* Header */}
      <div className="border-b border-industrial-800 pb-4">
        <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block mb-1">
          OFFICIAL FACTORY ENQUIRY
        </span>
        <h3 className="text-xl font-black text-white">{product.modelNumber}</h3>
        <p className="text-xs text-industrial-400 mt-1 font-sans">{product.name}</p>
      </div>

      {/* Quick Spec Highlights */}
      <div className="space-y-2 font-mono text-xs">
        <div className="flex justify-between py-1.5 border-b border-industrial-800/60">
          <span className="text-industrial-400">Rated Capacity:</span>
          <strong className="text-brand-yellow font-bold">
            {product.capacityMinTPH}–{product.capacityMaxTPH} TPH
          </strong>
        </div>
        <div className="flex justify-between py-1.5 border-b border-industrial-800/60">
          <span className="text-industrial-400">Max Feed Size:</span>
          <strong className="text-white">{product.maxFeedSizeMM} mm</strong>
        </div>
        <div className="flex justify-between py-1.5 border-b border-industrial-800/60">
          <span className="text-industrial-400">Power Rating:</span>
          <strong className="text-white">{product.powerRatingKW} kW</strong>
        </div>
        <div className="flex justify-between py-1.5 border-b border-industrial-800/60">
          <span className="text-industrial-400">Mobility:</span>
          <strong className="text-industrial-300">{product.mobilityType}</strong>
        </div>
      </div>

      {/* Primary Quotation CTA */}
      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          className="w-full font-mono text-xs uppercase tracking-wider font-bold py-3.5 shadow-lg shadow-brand-yellow/10"
          onClick={onRequestQuote}
        >
          <Zap className="w-4 h-4 mr-1.5" />
          Request Official Quotation
        </Button>

        {onToggleCompare && (
          <button
            onClick={onToggleCompare}
            className={`w-full py-2.5 px-4 rounded text-xs font-mono font-bold flex items-center justify-center gap-2 border transition-all ${
              isCompared
                ? 'bg-brand-yellow/15 border-brand-yellow text-brand-yellow'
                : 'bg-industrial-950 border-industrial-700 text-industrial-300 hover:text-white hover:border-industrial-600'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{isCompared ? '✓ Added to Compare Tray' : '+ Add to Machine Comparison'}</span>
          </button>
        )}
      </div>

      {/* Technical Downloads */}
      <div className="border-t border-industrial-800 pt-4 space-y-2">
        <span className="text-[10px] font-mono uppercase text-industrial-500 tracking-wider block">
          ENGINEERING DOCUMENTATION
        </span>

        {product.datasheetUrl && (
          <a
            href={product.datasheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded bg-industrial-950 border border-industrial-800 hover:border-industrial-700 text-xs font-mono text-industrial-300 hover:text-white transition-colors group"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-brand-yellow group-hover:scale-110 transition-transform" />
              <span>Technical Datasheet (PDF)</span>
            </div>
            <FileDown className="w-3.5 h-3.5 text-industrial-500" />
          </a>
        )}

        {product.brochureUrl && (
          <a
            href={product.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded bg-industrial-950 border border-industrial-800 hover:border-industrial-700 text-xs font-mono text-industrial-300 hover:text-white transition-colors group"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-brand-yellow group-hover:scale-110 transition-transform" />
              <span>Product Brochure (PDF)</span>
            </div>
            <FileDown className="w-3.5 h-3.5 text-industrial-500" />
          </a>
        )}
      </div>

      {/* Direct Factory Support */}
      <div className="border-t border-industrial-800 pt-4 space-y-2 font-mono text-xs">
        <span className="text-[10px] uppercase text-industrial-500 tracking-wider block">
          DIRECT FACTORY CONTACT
        </span>
        <div className="flex items-center gap-2 text-industrial-300">
          <PhoneCall className="w-3.5 h-3.5 text-brand-yellow" />
          <span>+91 (40) 2344 5566 / 67</span>
        </div>
        <div className="flex items-center gap-2 text-industrial-300">
          <Mail className="w-3.5 h-3.5 text-brand-yellow" />
          <span>sales@puzzolana.com</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-industrial-500 pt-1">
          <Clock className="w-3 h-3 text-industrial-500" />
          <span>Average RFQ response: &lt; 24 business hours</span>
        </div>
      </div>
    </div>
  );
};
