import React from 'react';
import Link from 'next/link';
import { ArrowRight, Settings2, SlidersHorizontal, FileText, CheckCircle2, Factory, Cpu, Hammer, Globe2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Heavy Industrial Hero Section */}
      <section className="relative bg-industrial-950 py-24 md:py-32 border-b border-industrial-800 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-industrial-grid bg-[size:40px_40px] opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-industrial-900 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              Heavy Industrial Crushing & Screening Systems
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              ENGINEERED FOR <span className="text-brand-yellow">MAXIMUM THROUGHPUT</span> & ROCK SOLID RELIABILITY
            </h1>

            <p className="text-lg text-industrial-300 leading-relaxed max-w-2xl">
              India’s premier manufacturer of complete crushing, screening, sand washing, and road building plants. Delivering verified high-capacity performance for mining, aggregate, and infrastructure sectors.
            </p>

            {/* Main Action CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products" className="btn-brand-primary">
                Explore Equipment Catalogue <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/finder" className="btn-brand-secondary">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-brand-yellow" />
                Find Right Machine
              </Link>
              <Link href="/quote" className="btn-brand-secondary">
                <FileText className="w-4 h-4 mr-2" />
                Request B2B Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Corporate Capability Highlights */}
      <section className="py-16 bg-industrial-900/50 border-b border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="industrial-card p-6 rounded-sm">
              <Factory className="w-8 h-8 text-brand-yellow mb-3" />
              <h3 className="text-white font-bold text-lg">Integrated Manufacturing</h3>
              <p className="text-xs text-industrial-400 mt-1">
                Precision heavy engineering plants with in-house fabrication, CNC machining, and rigorous load testing.
              </p>
            </div>

            <div className="industrial-card p-6 rounded-sm">
              <Cpu className="w-8 h-8 text-brand-yellow mb-3" />
              <h3 className="text-white font-bold text-lg">Turnkey Plant Design</h3>
              <p className="text-xs text-industrial-400 mt-1">
                Custom flowsheet engineering, feed-to-product simulations, and optimized footprint configurations.
              </p>
            </div>

            <div className="industrial-card p-6 rounded-sm">
              <Hammer className="w-8 h-8 text-brand-yellow mb-3" />
              <h3 className="text-white font-bold text-lg">Mining & Heavy Quarry</h3>
              <p className="text-xs text-industrial-400 mt-1">
                Field-proven heavy jaw crushers, multi-cylinder cones, and high-frequency sand classifiers.
              </p>
            </div>

            <div className="industrial-card p-6 rounded-sm">
              <Globe2 className="w-8 h-8 text-brand-yellow mb-3" />
              <h3 className="text-white font-bold text-lg">Nationwide Support</h3>
              <p className="text-xs text-industrial-400 mt-1">
                Strategically positioned regional service hubs, genuine OEM wear parts, and certified field engineers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Module 1 Scaffolding Verification Card */}
      <section className="py-16 bg-industrial-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-industrial-800 bg-industrial-900/40 p-8 rounded-sm">
            <div className="flex items-center justify-between pb-6 border-b border-industrial-800">
              <div>
                <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest">Platform Core Ready</span>
                <h2 className="text-2xl font-bold text-white mt-1">Module 1 — Project Setup Verified</h2>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded">
                <CheckCircle2 className="w-4 h-4" /> Ready for Module 2
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-sm">
              <div className="bg-industrial-950 p-4 border border-industrial-800/80 rounded">
                <span className="text-xs text-industrial-400 font-mono block mb-1">FRONTEND ENGINE</span>
                <p className="font-semibold text-white">Next.js 14 + React 18 + Tailwind</p>
                <p className="text-xs text-industrial-400 mt-1">App Router, TypeScript strict mode, responsive industrial layout.</p>
              </div>

              <div className="bg-industrial-950 p-4 border border-industrial-800/80 rounded">
                <span className="text-xs text-industrial-400 font-mono block mb-1">BACKEND API</span>
                <p className="font-semibold text-white">Node.js + Express + TypeScript</p>
                <p className="text-xs text-industrial-400 mt-1">Modular architecture with CORS, Helmet, rate-limiting, and error handling.</p>
              </div>

              <div className="bg-industrial-950 p-4 border border-industrial-800/80 rounded">
                <span className="text-xs text-industrial-400 font-mono block mb-1">DATA REPOSITORY</span>
                <p className="font-semibold text-white">MongoDB Mongoose ODM</p>
                <p className="text-xs text-industrial-400 mt-1">Prepared for verified machinery catalogue, quote tracking, and analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
