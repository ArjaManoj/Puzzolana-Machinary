'use client';

import React from 'react';
import Link from 'next/link';
import { ProductFinderWizard } from '@/components/finder';
import {
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Zap,
  Sparkles,
  PhoneCall,
  Layers,
} from 'lucide-react';

export default function ProductFinderPage() {
  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* 1. Hero Header */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <Link href="/products" className="hover:text-white transition-colors">
              CATALOGUE
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <span className="text-brand-yellow font-bold uppercase">PRODUCT FINDER WIZARD</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTELLIGENT PLANT CONFIGURATION ENGINE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                RULE-BASED <span className="text-brand-yellow">MACHINERY FINDER</span>
              </h1>

              <p className="text-sm sm:text-base text-industrial-300 leading-relaxed font-sans">
                Specify your quarry material, feed sizing, and production targets. Our deterministic rule engine calculates the exact primary jaw, secondary cone, tertiary shaper, and washing plant balance for your quarry.
              </p>
            </div>

            {/* Verification Chips */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 font-mono text-xs">
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Engine Logic</span>
                <strong className="text-sm font-black text-brand-yellow">Deterministic</strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Stages Balanced</span>
                <strong className="text-sm font-black text-white">Up to 4 Stages</strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Parameters</span>
                <strong className="text-sm font-black text-brand-yellow">5 Quick Steps</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Wizard Component Stage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <ProductFinderWizard />
      </section>

      {/* 3. Direct Engineering Consultation Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="industrial-card p-8 rounded-sm border border-industrial-800 bg-industrial-900/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-yellow uppercase">
              <Cpu className="w-4 h-4" />
              <span>CUSTOM FLOWSHEET CONSULTATION</span>
            </div>
            <h3 className="text-lg font-black text-white uppercase font-mono">
              COMPLEX MINING SEAM OR NON-STANDARD QUARRY GEOLOGY?
            </h3>
            <p className="text-xs text-industrial-400 font-sans leading-relaxed">
              If your deposit includes high-clay overburden, sticky feeds, or ultra-abrasive quartzite, our Chief Process Metallurgists will run computer flow balance simulations for your site.
            </p>
          </div>

          <div className="flex gap-3 font-mono text-xs w-full md:w-auto">
            <Link
              href="/contact"
              className="w-full md:w-auto px-5 py-3 bg-industrial-950 hover:bg-industrial-800 text-white font-bold uppercase rounded border border-industrial-700 flex items-center justify-center gap-2 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Contact Process Engineers</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
