'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VERIFIED_INDUSTRY_APPLICATIONS, IndustryApplicationData } from '@/lib/seedApplications';
import { VERIFIED_FRONTEND_PRODUCTS } from '@/lib/seedCatalog';
import { MachineryProduct } from '@/types';
import { MachineCard } from '@/components/machinery';
import { ComparisonTray, QuickQuoteModal } from '@/components/catalogue';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  Zap,
  Sparkles,
  Cpu,
  Factory,
  Sliders,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

interface IndustryPageProps {
  params: {
    industry: string;
  };
}

export default function IndustryApplicationDetailPage({ params }: IndustryPageProps) {
  const { industry } = params;

  // Find industry data by slug
  const appData: IndustryApplicationData | undefined = useMemo(() => {
    return VERIFIED_INDUSTRY_APPLICATIONS.find(
      (a) => a.slug === industry || a.id === industry
    );
  }, [industry]);

  if (!appData) {
    notFound();
  }

  // Recommended machinery matching this industry
  const recommendedMachines = useMemo(() => {
    return VERIFIED_FRONTEND_PRODUCTS.filter((p) =>
      appData.recommendedMachineIds.includes(p.id) ||
      p.applications.some((app) => app.toLowerCase().includes(appData.shortTitle.toLowerCase()))
    );
  }, [appData]);

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
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* 1. Sector Hero Header */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 filter grayscale contrast-150 pointer-events-none"
          style={{ backgroundImage: `url(${appData.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/80 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <Link href="/applications" className="hover:text-white transition-colors">
              APPLICATIONS
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <span className="text-brand-yellow font-bold uppercase">{appData.shortTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{appData.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight font-sans">
                {appData.name.toUpperCase()}
              </h1>

              <p className="text-sm sm:text-base text-industrial-300 leading-relaxed font-sans max-w-3xl">
                {appData.overview}
              </p>

              {/* Output Products Chips */}
              <div className="pt-2 space-y-1.5 font-mono text-xs">
                <span className="text-[10px] text-industrial-400 uppercase tracking-wider block">
                  TARGET OUTPUT SPECIFICATIONS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {appData.targetOutputFractions.map((frac, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-industrial-950 border border-industrial-700 rounded text-brand-yellow font-bold text-xs"
                    >
                      {frac}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Benchmark Card */}
            <div className="lg:col-span-4 bg-industrial-950/90 p-5 rounded border border-industrial-800 space-y-3 font-mono text-xs">
              <span className="text-[10px] text-brand-yellow uppercase tracking-widest block font-bold">
                SECTOR PLANT BENCHMARK
              </span>
              <div className="flex justify-between border-b border-industrial-800 pb-2">
                <span className="text-industrial-400">Typical TPH:</span>
                <strong className="text-white font-bold">{appData.typicalCapacityRange}</strong>
              </div>
              <div className="flex justify-between border-b border-industrial-800 pb-2">
                <span className="text-industrial-400">Flakiness Index:</span>
                <strong className="text-emerald-400 font-bold">{appData.plantBenchmark.flakinessIndex}</strong>
              </div>
              <div className="flex justify-between border-b border-industrial-800 pb-2">
                <span className="text-industrial-400">Connected Power:</span>
                <strong className="text-white font-bold">{appData.plantBenchmark.installedPowerKW}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-industrial-400">Compliance:</span>
                <span className="text-brand-yellow font-bold truncate max-w-[160px]">
                  {appData.technicalStandards[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Turnkey Process Flowsheet Stages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="border-b border-industrial-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-yellow" />
            <h2 className="text-lg font-black text-white uppercase font-mono tracking-wider">
              TURNKEY PROCESS FLOWSHEET STAGES
            </h2>
          </div>
          <p className="text-xs text-industrial-400 mt-1 font-sans">
            Engineered stage-by-stage flowsheet designed specifically for {appData.shortTitle}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {appData.flowsheetStages.map((stage) => (
            <div
              key={stage.stageNumber}
              className="industrial-card p-6 rounded-sm border border-industrial-800 bg-industrial-900/60 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-brand-yellow text-industrial-950 px-2.5 py-0.5 rounded">
                    STAGE {stage.stageNumber}
                  </span>
                  <span className="text-[10px] font-mono text-industrial-500 uppercase">
                    Flowsheet Step
                  </span>
                </div>

                <h3 className="text-base font-black text-white font-mono uppercase">
                  {stage.stageName}
                </h3>

                <p className="text-xs text-brand-yellow font-mono font-bold">
                  {stage.equipment}
                </p>

                <p className="text-xs text-industrial-300 leading-relaxed font-sans">
                  {stage.functionDesc}
                </p>
              </div>

              {/* In/Out Metrics */}
              <div className="p-3 bg-industrial-950 rounded border border-industrial-800/80 font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-industrial-500">Feed In:</span>
                  <strong className="text-white">{stage.feedInput}</strong>
                </div>
                <div className="flex justify-between border-t border-industrial-800/60 pt-1">
                  <span className="text-industrial-500">Output Size:</span>
                  <strong className="text-brand-yellow">{stage.outputSize}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Operational Challenges vs Puzzolana Solutions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-6">
        <div className="border-b border-industrial-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-yellow" />
            <h2 className="text-lg font-black text-white uppercase font-mono tracking-wider">
              OPERATIONAL CHALLENGES & ENGINEERED SOLUTIONS
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Challenges */}
          <div className="industrial-card p-6 rounded-sm border border-red-900/40 bg-industrial-900/40 space-y-4">
            <h3 className="text-xs font-black text-red-400 uppercase font-mono tracking-wider flex items-center gap-2 border-b border-industrial-800 pb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              INDUSTRY BOTTLENECKS & OPERATIONAL PITFALLS
            </h3>
            <ul className="space-y-3 text-xs text-industrial-300 font-sans">
              {appData.challenges.map((chal, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  <span>{chal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Puzzolana Solutions */}
          <div className="industrial-card p-6 rounded-sm border border-brand-yellow/40 bg-industrial-900/40 space-y-4">
            <h3 className="text-xs font-black text-brand-yellow uppercase font-mono tracking-wider flex items-center gap-2 border-b border-industrial-800 pb-3">
              <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
              PUZZOLANA HEAVY ENGINEERING SOLUTIONS
            </h3>
            <ul className="space-y-3 text-xs text-industrial-200 font-sans">
              {appData.puzzolanaSolutions.map((sol, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-yellow mt-0.5 flex-shrink-0" />
                  <span>{sol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Recommended Machinery Fleet Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-industrial-800 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-brand-yellow uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>EQUIPMENT RECOMMENDATION</span>
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              RECOMMENDED PLANT MACHINERY FLEET
            </h2>
            <p className="text-xs text-industrial-400 mt-0.5 font-sans">
              Proven models specified for {appData.shortTitle} applications.
            </p>
          </div>

          <Link
            href="/products"
            className="text-xs font-mono font-bold text-brand-yellow hover:text-white flex items-center gap-1 min-w-max"
          >
            <span>Browse Complete Fleet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedMachines.map((product) => (
            <MachineCard
              key={product.id}
              product={product}
              isCompared={comparedIds.includes(product.id)}
              onToggleCompare={handleToggleCompare}
              onRequestQuote={setSelectedQuoteProduct}
            />
          ))}
        </div>
      </section>

      {/* 5. Floating Comparison Tray */}
      <ComparisonTray
        comparedProducts={comparedProducts}
        onRemove={handleToggleCompare}
        onClear={() => setComparedIds([])}
      />

      {/* 6. Quick Quotation Modal */}
      <QuickQuoteModal
        product={selectedQuoteProduct}
        isOpen={!!selectedQuoteProduct}
        onClose={() => setSelectedQuoteProduct(null)}
      />
    </div>
  );
}
