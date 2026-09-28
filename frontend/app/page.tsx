'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  PlantProcessJourney,
  CategoryCardGrid,
  VerifiedStatsSection,
} from '@/components/home';
import { MachineCard } from '@/components/machinery';
import { ComparisonTray, QuickQuoteModal } from '@/components/catalogue';
import { VERIFIED_FRONTEND_PRODUCTS } from '@/lib/seedCatalog';
import { MachineryProduct } from '@/types';
import {
  ArrowRight,
  SlidersHorizontal,
  FileText,
  Factory,
  Cpu,
  Hammer,
  Globe2,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function HomePage() {
  // Flagship equipment list (6 highlighted models)
  const flagshipProducts = useMemo(() => {
    const flagshipIds = ['PJC-14076', 'PCC-2000', 'PVI-100', 'PSW-150', 'PTJ-11075', 'PSM-2200'];
    return VERIFIED_FRONTEND_PRODUCTS.filter((p) => flagshipIds.includes(p.id));
  }, []);

  // Comparison & Quote state
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [selectedQuoteProduct, setSelectedQuoteProduct] = useState<MachineryProduct | null>(null);

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
    <div className="flex flex-col min-h-screen bg-industrial-950 text-industrial-100">
      {/* ========================================================================= */}
      {/* 1. HERO STAGE */}
      {/* ========================================================================= */}
      <section className="relative bg-industrial-950 pt-20 pb-28 md:pt-28 md:pb-36 border-b border-industrial-800 overflow-hidden">
        {/* Background Grid & Ambient Glows */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#323b4c15_1px,transparent_1px),linear-gradient(to_bottom,#323b4c15_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-brand-yellow/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-industrial-900 border border-brand-yellow/40 text-brand-yellow text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              <span>INDIAN HEAVY MACHINERY MANUFACTURING — EST. 1970s</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.08] font-sans">
              INDOMITABLE CRUSHING, SCREENING &{' '}
              <span className="text-brand-yellow">MINING ENGINEERING</span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-industrial-300 leading-relaxed max-w-3xl font-sans">
              India&apos;s foremost manufacturer of complete crushing, screening, sand washing, surface mining, and asphalt paving plants. Engineered with in-house foundry and heavy fabrication to thrive in the most abrasive rock conditions worldwide.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4 font-mono">
              <Link href="/products" className="btn-brand-primary">
                <span>Explore Equipment Fleet</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/products" className="btn-brand-secondary">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-brand-yellow" />
                <span>Filter by Capacity (TPH)</span>
              </Link>
              <button
                onClick={() => setSelectedQuoteProduct(flagshipProducts[0] || VERIFIED_FRONTEND_PRODUCTS[0])}
                className="btn-brand-secondary"
              >
                <FileText className="w-4 h-4 mr-2 text-industrial-400" />
                <span>Request Quotation</span>
              </button>
            </div>

            {/* Hero Quick Stat Ticker */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-industrial-800/80 font-mono text-xs">
              <div>
                <span className="text-industrial-500 block text-[10px] uppercase">Heritage</span>
                <strong className="text-white text-base font-black">50+ Years</strong>
                <span className="text-industrial-400 block text-[10px]">Since 1970s</span>
              </div>
              <div>
                <span className="text-industrial-500 block text-[10px] uppercase">Installations</span>
                <strong className="text-brand-yellow text-base font-black">4,500+ Plants</strong>
                <span className="text-industrial-400 block text-[10px]">Commissioned</span>
              </div>
              <div>
                <span className="text-industrial-500 block text-[10px] uppercase">Global Reach</span>
                <strong className="text-white text-base font-black">45+ Nations</strong>
                <span className="text-industrial-400 block text-[10px]">Worldwide Exports</span>
              </div>
              <div>
                <span className="text-industrial-500 block text-[10px] uppercase">Max Stream</span>
                <strong className="text-brand-yellow text-base font-black">1,200 TPH</strong>
                <span className="text-industrial-400 block text-[10px]">Plant Capacity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. VERIFIED CORPORATE CAPABILITY STATS (Issue 1 Zero-Suppression) */}
      {/* ========================================================================= */}
      <VerifiedStatsSection />

      {/* ========================================================================= */}
      {/* 3. 8 OFFICIAL MACHINERY CATEGORIES FLEET */}
      {/* ========================================================================= */}
      <section className="py-20 bg-industrial-900/40 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-yellow font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>OFFICIAL EQUIPMENT DIVISIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-sans">
                COMPLETE CRUSHING & <span className="text-brand-yellow">PROCESSING FLEET</span>
              </h2>
              <p className="text-xs sm:text-sm text-industrial-400 font-sans">
                Explore Puzzolana&apos;s 8 official equipment divisions, covering stationary plants, mobile crawlers, sand washing systems, surface miners, and asphalt pavers.
              </p>
            </div>

            <Link
              href="/products"
              className="text-xs font-mono font-bold text-brand-yellow hover:text-white flex items-center gap-1.5 min-w-max"
            >
              <span>View All 15+ Verified Models</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 8 Categories Grid */}
          <CategoryCardGrid />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FLAGSHIP EQUIPMENT SHOWCASE */}
      {/* ========================================================================= */}
      <section className="py-20 bg-industrial-950 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INDUSTRY BENCHMARK FLAGSHIP UNITS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-sans">
              HEAVY DUTY <span className="text-brand-yellow">FLAGSHIP MACHINERY</span>
            </h2>
            <p className="text-xs sm:text-sm text-industrial-400 font-sans">
              Proven workhorses delivering continuous 24/7 quarry and mining production with high reduction ratios and low specific power consumption.
            </p>
          </div>

          {/* 6 Flagship Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flagshipProducts.map((product) => (
              <MachineCard
                key={product.id}
                product={product}
                isCompared={comparedIds.includes(product.id)}
                onToggleCompare={handleToggleCompare}
                onRequestQuote={setSelectedQuoteProduct}
              />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-industrial-900 hover:bg-industrial-850 text-white font-mono font-bold text-xs uppercase rounded border border-industrial-700 transition-colors"
            >
              <span>Explore Entire 8-Category Catalogue</span>
              <ArrowRight className="w-4 h-4 text-brand-yellow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE 4-STAGE PLANT FLOWSHEET JOURNEY */}
      {/* ========================================================================= */}
      <section className="py-20 bg-industrial-900/60 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>INTEGRATED FLOWSHEET ENGINEERING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-sans">
              FOUR-STAGE <span className="text-brand-yellow">CRUSHING & SIZING JOURNEY</span>
            </h2>
            <p className="text-xs sm:text-sm text-industrial-400 font-sans">
              Click through each process stage to inspect the feed specifications, reduction ratios, and matching Puzzolana machinery across complete aggregate plants.
            </p>
          </div>

          {/* Interactive Flowsheet */}
          <PlantProcessJourney />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. MANUFACTURING INFRASTRUCTURE & IN-HOUSE FOUNDRY */}
      {/* ========================================================================= */}
      <section className="py-20 bg-industrial-950 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Manufacturing Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold uppercase tracking-wider">
                <Factory className="w-3.5 h-3.5" />
                <span>INTEGRATED HEAVY MANUFACTURING</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-sans">
                IN-HOUSE FOUNDRY, FORGING & <span className="text-brand-yellow">PRECISION CNC MACHINING</span>
              </h2>

              <p className="text-sm text-industrial-300 leading-relaxed font-sans">
                Unlike assemblers who outsource critical components, Puzzolana controls the full metallurgical lifecycle. Operating 6 advanced manufacturing plants in Hyderabad and Coimbatore, our in-house steel foundry casts high-manganese wear plates, forged alloy eccentric shafts, and stress-relieved heavy fabricated frames.
              </p>

              {/* Engineering Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-industrial-900 rounded border border-industrial-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">In-House Foundry</strong>
                    <span className="text-industrial-400 text-[11px]">Induction melting & high-manganese alloy casting</span>
                  </div>
                </div>

                <div className="p-3 bg-industrial-900 rounded border border-industrial-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Heavy CNC Boring</strong>
                    <span className="text-industrial-400 text-[11px]">Precision machining of heavy crusher housings</span>
                  </div>
                </div>

                <div className="p-3 bg-industrial-900 rounded border border-industrial-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Full Load Testing</strong>
                    <span className="text-industrial-400 text-[11px]">100% pre-dispatch factory test runs</span>
                  </div>
                </div>

                <div className="p-3 bg-industrial-900 rounded border border-industrial-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">ISO Certified</strong>
                    <span className="text-industrial-400 text-[11px]">ISO 9001:2015 certified quality systems</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Facility Summary Card */}
            <div className="lg:col-span-6 bg-industrial-900/90 border border-industrial-800 p-8 rounded-sm space-y-6">
              <div className="flex items-center justify-between border-b border-industrial-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-brand-yellow tracking-widest block">
                    MANUFACTURING FOOTPRINT
                  </span>
                  <h3 className="text-xl font-black text-white font-mono">
                    6 INTEGRATED COMPLEXES
                  </h3>
                </div>
                <Building2 className="w-8 h-8 text-brand-yellow" />
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-3.5 bg-industrial-950 rounded border border-industrial-800">
                  <div className="flex justify-between items-baseline mb-1">
                    <strong className="text-white">Hyderabad Plant I & II (Telangana)</strong>
                    <span className="text-brand-yellow font-bold">Heavy Machinery Complex</span>
                  </div>
                  <p className="text-[11px] text-industrial-400 font-sans">
                    Primary jaw and cone crusher assembly, surface miners, heavy structural fabrication, and corporate R&D centre.
                  </p>
                </div>

                <div className="p-3.5 bg-industrial-950 rounded border border-industrial-800">
                  <div className="flex justify-between items-baseline mb-1">
                    <strong className="text-white">Coimbatore Plant (Tamil Nadu)</strong>
                    <span className="text-brand-yellow font-bold">Foundry & Machining Division</span>
                  </div>
                  <p className="text-[11px] text-industrial-400 font-sans">
                    Steel casting foundry, precision CNC horizontal/vertical machining centers, and wear-liner manufacturing.
                  </p>
                </div>

                <div className="p-3.5 bg-industrial-950 rounded border border-industrial-800">
                  <div className="flex justify-between items-baseline mb-1">
                    <strong className="text-white">Track Mobile Plant Unit</strong>
                    <span className="text-brand-yellow font-bold">Crawler Mobile Line</span>
                  </div>
                  <p className="text-[11px] text-industrial-400 font-sans">
                    Dedicated assembly lines for self-propelled track jaw crushers, track cones, and mobile screening plants.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full py-2.5 px-4 bg-industrial-950 hover:bg-industrial-800 text-white font-mono text-xs uppercase font-bold rounded border border-industrial-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Contact Corporate Engineering Office</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. LEAD GENERATION & B2B QUOTATION BANNER */}
      {/* ========================================================================= */}
      <section className="py-20 bg-industrial-900 border-b border-industrial-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/10 via-transparent to-brand-yellow/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="industrial-card p-8 sm:p-12 rounded-sm border border-brand-yellow/50 bg-industrial-950/95 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>DIRECT FACTORY ENGINEERING CONSULTATION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight font-sans">
                REQUEST A CUSTOM <span className="text-brand-yellow">PLANT PROPOSAL</span>
              </h2>

              <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed font-sans">
                Our application engineers will design the optimal crushing flowsheet tailored to your quarry rock compressive strength, target TPH output, and fraction gradation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto font-mono text-xs">
              <button
                onClick={() => setSelectedQuoteProduct(flagshipProducts[0] || VERIFIED_FRONTEND_PRODUCTS[0])}
                className="px-6 py-3.5 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-black uppercase tracking-wider rounded shadow-lg shadow-brand-yellow/10 text-center transition-colors min-w-[200px]"
              >
                Submit RFQ Enquiry
              </button>
              <Link
                href="/products"
                className="px-6 py-3.5 bg-industrial-900 hover:bg-industrial-800 text-white font-bold uppercase tracking-wider rounded border border-industrial-700 text-center transition-colors min-w-[200px]"
              >
                Browse Fleet Specs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FLOATING COMPARISON TRAY & QUOTE MODAL */}
      {/* ========================================================================= */}
      <ComparisonTray
        comparedProducts={comparedProducts}
        onRemove={handleToggleCompare}
        onClear={() => setComparedIds([])}
      />

      <QuickQuoteModal
        product={selectedQuoteProduct}
        isOpen={!!selectedQuoteProduct}
        onClose={() => setSelectedQuoteProduct(null)}
      />
    </div>
  );
}
