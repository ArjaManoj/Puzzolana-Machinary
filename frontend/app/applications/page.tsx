'use client';

import React from 'react';
import Link from 'next/link';
import { VERIFIED_INDUSTRY_APPLICATIONS } from '@/lib/seedApplications';
import {
  Layers,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Cpu,
  Factory,
  HardHat,
  Train,
  Recycle,
  Building,
} from 'lucide-react';

export default function ApplicationsHubPage() {
  const SECTOR_ICONS: Record<string, React.ReactNode> = {
    'aggregates-quarrying': <Building className="w-5 h-5 text-brand-yellow" />,
    'mining-minerals': <HardHat className="w-5 h-5 text-brand-yellow" />,
    'm-sand-production': <Factory className="w-5 h-5 text-brand-yellow" />,
    'highway-infrastructure': <Zap className="w-5 h-5 text-brand-yellow" />,
    'railway-ballast': <Train className="w-5 h-5 text-brand-yellow" />,
    'waste-recycling': <Recycle className="w-5 h-5 text-brand-yellow" />,
  };

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* 1. Master Solutions Hero */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <span className="text-brand-yellow font-bold uppercase">APPLICATIONS & INDUSTRY SOLUTIONS</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>TURNKEY FLOWSHEET ENGINEERING</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                INDUSTRY & GEOLOGICAL <span className="text-brand-yellow">APPLICATIONS</span>
              </h1>

              <p className="text-sm sm:text-base text-industrial-300 leading-relaxed font-sans">
                Every rock deposit and mineral seam has unique compressive strength and abrasiveness. Puzzolana custom-designs balanced multi-stage plant flowsheet configurations to optimize throughput, shape cubicity, and reduce wear costs.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 font-mono text-xs">
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Industry Verticals</span>
                <strong className="text-xl font-black text-brand-yellow">6 Sectors</strong>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Throughput</span>
                <strong className="text-xl font-black text-white">Up to 1200</strong>
                <span className="text-industrial-400 text-[10px] ml-1">TPH</span>
              </div>
              <div className="bg-industrial-950 p-3.5 rounded border border-industrial-800 min-w-[130px]">
                <span className="text-industrial-500 block text-[10px] uppercase">Compliance</span>
                <strong className="text-xl font-black text-brand-yellow">IS / RDSO</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 6 Industry Sector Solution Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="flex items-center justify-between border-b border-industrial-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-brand-yellow" />
            <h2 className="text-lg font-black text-white uppercase font-mono tracking-wider">
              PRIMARY INDUSTRIAL SECTORS
            </h2>
          </div>
          <span className="text-xs font-mono text-industrial-400">
            Select a sector for stage flowsheet & equipment configurations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VERIFIED_INDUSTRY_APPLICATIONS.map((app) => (
            <div
              key={app.id}
              className="industrial-card rounded-sm overflow-hidden flex flex-col justify-between group border border-industrial-800 hover:border-brand-yellow/60 transition-all duration-300 bg-industrial-900/60"
            >
              {/* Sector Image Preview */}
              <div className="relative h-48 bg-industrial-950 overflow-hidden border-b border-industrial-800">
                <img
                  src={app.heroImage}
                  alt={app.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale contrast-125 group-hover:filter-none group-hover:contrast-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/40 to-transparent" />

                {/* Capacity Badge */}
                <div className="absolute top-3 right-3 bg-industrial-950/90 backdrop-blur border border-industrial-800 px-2.5 py-0.5 rounded text-[11px] font-mono text-brand-yellow font-bold">
                  {app.typicalCapacityRange}
                </div>

                {/* Icon Header */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-industrial-950/90 border border-industrial-800 flex items-center justify-center">
                    {SECTOR_ICONS[app.slug] || <Layers className="w-4 h-4 text-brand-yellow" />}
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-brand-yellow transition-colors uppercase font-mono">
                    {app.shortTitle}
                  </h3>
                </div>
              </div>

              {/* Sector Body */}
              <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                <p className="text-xs text-industrial-300 leading-relaxed font-sans line-clamp-2">
                  {app.overview}
                </p>

                {/* Output Fractions */}
                <div className="space-y-1.5 font-mono text-xs">
                  <span className="text-[10px] uppercase text-industrial-500 tracking-wider block">
                    TARGET OUTPUT PRODUCTS:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {app.targetOutputFractions.slice(0, 3).map((frac, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-industrial-950 border border-industrial-800 rounded text-[10px] text-industrial-300"
                      >
                        {frac}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical Benchmark */}
                <div className="p-2.5 bg-industrial-950/80 rounded border border-industrial-800/80 text-[11px] font-mono flex items-center justify-between text-industrial-400">
                  <span>Standards:</span>
                  <span className="text-white font-bold truncate max-w-[180px]">
                    {app.technicalStandards[0]}
                  </span>
                </div>

                {/* Bottom CTA Link */}
                <div className="pt-3 border-t border-industrial-800/60">
                  <Link
                    href={`/applications/${app.slug}`}
                    className="w-full py-2.5 px-4 bg-industrial-950 hover:bg-brand-yellow text-white hover:text-industrial-950 font-mono text-xs font-bold uppercase rounded border border-industrial-800 hover:border-brand-yellow flex items-center justify-center gap-2 transition-all"
                  >
                    <span>View Flowsheet & Equipment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Geological Material Matrix Reference Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-6">
        <div className="border-b border-industrial-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-brand-yellow" />
            <h2 className="text-lg font-black text-white uppercase font-mono tracking-wider">
              GEOLOGICAL MATERIAL PROPERTIES & CRUSHING MATRIX
            </h2>
          </div>
          <p className="text-xs text-industrial-400 mt-1 font-sans">
            Technical rock classification showing compressive strength, abrasive index, and recommended Puzzolana equipment circuit stages.
          </p>
        </div>

        <div className="industrial-card rounded-sm overflow-hidden border border-industrial-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-industrial-200 border-collapse font-mono">
              <thead className="bg-industrial-950 text-industrial-400 uppercase text-[11px] border-b border-industrial-800">
                <tr>
                  <th className="p-3.5 min-w-[160px]">Raw Material / Rock</th>
                  <th className="p-3.5 min-w-[140px]">Compressive Strength</th>
                  <th className="p-3.5 min-w-[120px]">Abrasion Index</th>
                  <th className="p-3.5 min-w-[180px]">Primary Crushing Stage</th>
                  <th className="p-3.5 min-w-[180px]">Secondary Stage</th>
                  <th className="p-3.5 min-w-[180px]">Tertiary / Washing Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-industrial-800/60 bg-industrial-900/40">
                <tr className="hover:bg-industrial-850/60 transition-colors">
                  <td className="p-3.5 font-bold text-white">Basalt / Trap Rock</td>
                  <td className="p-3.5 text-brand-yellow font-bold">200 – 350 MPa</td>
                  <td className="p-3.5 text-red-400 font-bold">Very High</td>
                  <td className="p-3.5">PJC Single-Toggle Jaw</td>
                  <td className="p-3.5">PCC Heavy Hydraulic Cone</td>
                  <td className="p-3.5">PVI VSI + PSW Sand Washer</td>
                </tr>
                <tr className="hover:bg-industrial-850/60 transition-colors">
                  <td className="p-3.5 font-bold text-white">Granite / Gneiss</td>
                  <td className="p-3.5 text-brand-yellow font-bold">150 – 250 MPa</td>
                  <td className="p-3.5 text-amber-400 font-bold">High (Silica)</td>
                  <td className="p-3.5">PJC 11075 / 14076 Jaw</td>
                  <td className="p-3.5">PCC 2000 Cone Crusher</td>
                  <td className="p-3.5">PVI 100 Sand Maker</td>
                </tr>
                <tr className="hover:bg-industrial-850/60 transition-colors">
                  <td className="p-3.5 font-bold text-white">Iron Ore (Hematite)</td>
                  <td className="p-3.5 text-brand-yellow font-bold">180 – 300 MPa</td>
                  <td className="p-3.5 text-red-400 font-bold">Extreme Heavy Bulk</td>
                  <td className="p-3.5">PJC 14076 Heavy Mining Jaw</td>
                  <td className="p-3.5">PCC Cone / Sizer</td>
                  <td className="p-3.5">PVS Heavy Mining Screen</td>
                </tr>
                <tr className="hover:bg-industrial-850/60 transition-colors">
                  <td className="p-3.5 font-bold text-white">Limestone / Dolomite</td>
                  <td className="p-3.5 text-emerald-400 font-bold">60 – 140 MPa</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Low – Medium</td>
                  <td className="p-3.5">PJC Jaw / PSM Surface Miner</td>
                  <td className="p-3.5">Impact Crusher / Cone</td>
                  <td className="p-3.5">PVS Circular Screen</td>
                </tr>
                <tr className="hover:bg-industrial-850/60 transition-colors">
                  <td className="p-3.5 font-bold text-white">Coal / Lignite / Shale</td>
                  <td className="p-3.5 text-emerald-400 font-bold">20 – 50 MPa</td>
                  <td className="p-3.5 text-emerald-400 font-bold">Low (Friable)</td>
                  <td className="p-3.5">PSM 2200 Continuous Miner</td>
                  <td className="p-3.5">PFB 1200 Feeder Breaker</td>
                  <td className="p-3.5">Rotary Breaker / Sizer</td>
                </tr>
                <tr className="hover:bg-industrial-850/60 transition-colors">
                  <td className="p-3.5 font-bold text-white">C&D Demolition Waste</td>
                  <td className="p-3.5 text-industrial-400 font-bold">Heterogeneous</td>
                  <td className="p-3.5 text-amber-400 font-bold">High (Tramp Steel)</td>
                  <td className="p-3.5">PFB 1200 Feeder Breaker</td>
                  <td className="p-3.5">PTJ Mobile Track Jaw</td>
                  <td className="p-3.5">Over-Band Magnetic Separator</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Direct Engineering Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="industrial-card p-8 sm:p-10 rounded-sm border border-brand-yellow/50 bg-industrial-900/90 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-xl font-black text-white uppercase font-mono">
              NEED A CUSTOM QUARRY FLOWSHEET DESIGN?
            </h3>
            <p className="text-xs text-industrial-300 font-sans leading-relaxed">
              Send our senior process engineers your core borehole rock sample test reports (UCS, LA Abrasion) for a computer-simulated turnkey plant flowsheet and capacity guarantee.
            </p>
          </div>

          <div className="flex gap-3 font-mono text-xs w-full md:w-auto">
            <Link
              href="/products"
              className="w-full md:w-auto px-5 py-3 bg-brand-yellow hover:bg-brand-yellow-400 text-industrial-950 font-black uppercase rounded text-center transition-colors shadow"
            >
              Explore Equipment Fleet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
