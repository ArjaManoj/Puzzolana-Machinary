'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  VERIFIED_ESG_METRICS,
  ESG_PILLARS,
  CSR_COMMUNITY_PROJECTS,
} from '@/lib/seedSustainability';
import {
  Sun,
  Droplets,
  Zap,
  Users,
  ShieldCheck,
  CheckCircle2,
  Check,
  ChevronRight,
  Download,
  FileText,
  Award,
  Factory,
  Globe,
  Leaf,
  Recycle,
  HeartHandshake,
  Activity,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function SustainabilityPage() {
  const [activePillarTab, setActivePillarTab] = useState<number>(0);

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* 1. Hero Header */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4">
            <Link href="/" className="hover:text-puzzolana-gold transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-puzzolana-gold uppercase">SUSTAINABILITY &amp; CSR</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
              <Leaf className="w-3.5 h-3.5" />
              <span>ENVIRONMENTAL, SOCIAL &amp; GOVERNANCE (ESG) FRAMEWORK</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4">
              ENGINEERING A <span className="text-puzzolana-gold">SUSTAINABLE FUTURE</span>
            </h1>
            <p className="text-industrial-300 text-sm sm:text-base leading-relaxed mb-6">
              Driving decarbonization across 60 acres of heavy manufacturing, circular steel foundry recycling, zero-effluent water conservation, and preserving India’s riverbeds through high-performance M-Sand technology.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a href="#esg-metrics">
                <Button variant="primary" className="font-semibold text-xs sm:text-sm">
                  View Verified ESG Metrics
                </Button>
              </a>
              <a href="#csr-projects">
                <Button variant="outline" className="font-semibold text-xs sm:text-sm border-industrial-700 hover:border-puzzolana-gold">
                  Community CSR Projects
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Verified ESG Metrics Dashboard */}
      <section id="esg-metrics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
            VERIFIED SUSTAINABILITY DATA
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Puzzolana ESG &amp; Decarbonization Scorecard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {VERIFIED_ESG_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/50 rounded-lg p-6 flex flex-col justify-between transition-all group shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-industrial-950 text-puzzolana-gold border border-industrial-800 font-bold">
                    {metric.category}
                  </span>
                  <div className="w-8 h-8 rounded bg-puzzolana-gold/10 text-puzzolana-gold flex items-center justify-center">
                    {metric.category === 'Renewable Energy' && <Sun className="w-4 h-4" />}
                    {metric.category === 'Resource Conservation' && <Droplets className="w-4 h-4" />}
                    {metric.category === 'Circular Economy' && <Recycle className="w-4 h-4" />}
                    {metric.category === 'Community Impact' && <Users className="w-4 h-4" />}
                  </div>
                </div>

                <div className="text-3xl sm:text-4xl font-black font-mono text-white group-hover:text-puzzolana-gold transition-colors mb-1">
                  {metric.value}
                </div>

                <h3 className="text-sm font-bold text-white mb-2">{metric.label}</h3>

                <p className="text-xs text-industrial-300 leading-relaxed mb-4">
                  {metric.description}
                </p>
              </div>

              <div className="border-t border-industrial-800 pt-3 text-[10px] font-mono text-industrial-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-puzzolana-gold shrink-0" />
                <span>Verified by: {metric.source}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Four Core Strategic ESG Pillars */}
      <section className="border-y border-industrial-800 bg-industrial-900/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>FOUR STRATEGIC PILLARS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Holistic Environmental Stewardship in Action
            </h2>
          </div>

          {/* Pillar Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {ESG_PILLARS.map((pillar, idx) => (
              <button
                key={pillar.id}
                onClick={() => setActivePillarTab(idx)}
                className={`p-4 rounded-lg text-left transition-all border ${
                  activePillarTab === idx
                    ? 'bg-industrial-900 border-puzzolana-gold shadow-lg'
                    : 'bg-industrial-950/60 border-industrial-800 hover:border-industrial-700 text-industrial-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center ${
                      activePillarTab === idx
                        ? 'bg-puzzolana-gold text-industrial-950 font-bold'
                        : 'bg-industrial-800 text-industrial-300'
                    }`}
                  >
                    {idx === 0 && <Sun className="w-4 h-4" />}
                    {idx === 1 && <Zap className="w-4 h-4" />}
                    {idx === 2 && <Droplets className="w-4 h-4" />}
                    {idx === 3 && <Users className="w-4 h-4" />}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-puzzolana-gold">
                    Pillar 0{idx + 1}
                  </span>
                </div>
                <div className={`text-xs font-bold line-clamp-2 ${activePillarTab === idx ? 'text-white' : 'text-industrial-300'}`}>
                  {pillar.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Pillar Detail Box */}
          <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-6 sm:p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-puzzolana-gold uppercase">
                    Pillar 0{activePillarTab + 1} Focus Area
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-puzzolana-gold/15 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono font-bold">
                    {ESG_PILLARS[activePillarTab].statBadge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                  {ESG_PILLARS[activePillarTab].title}
                </h3>
                <div className="text-xs font-mono text-industrial-400">
                  {ESG_PILLARS[activePillarTab].subtitle}
                </div>

                <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed">
                  {ESG_PILLARS[activePillarTab].overview}
                </p>

                {/* Key Initiatives */}
                <div className="space-y-2 pt-2">
                  <div className="text-[11px] font-mono text-industrial-400 uppercase">Key Technical Initiatives:</div>
                  {ESG_PILLARS[activePillarTab].keyInitiatives.map((init, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-industrial-200">
                      <CheckCircle2 className="w-4 h-4 text-puzzolana-gold shrink-0 mt-0.5" />
                      <span>{init}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Callout Box */}
              <div className="lg:col-span-4 bg-industrial-950 p-6 rounded-lg border border-industrial-800/90 flex flex-col justify-center space-y-4">
                <div className="text-xs font-mono text-puzzolana-gold uppercase font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Verified ESG Impact</span>
                </div>
                <p className="text-sm font-bold text-white leading-relaxed">
                  &ldquo;{ESG_PILLARS[activePillarTab].impactSummary}&rdquo;
                </p>
                <div className="pt-3 border-t border-industrial-800 text-[11px] font-mono text-industrial-400">
                  Audited under ISO 14001 &amp; ISO 45001 Standards
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Community CSR Projects Showcase */}
      <section id="csr-projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
              COMMUNITY DEVELOPMENT
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Puzzolana Technical Foundation CSR Projects
            </h2>
          </div>
          <div className="text-xs font-mono text-industrial-400">
            Empowering Over 18,000 Rural Beneficiaries
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {CSR_COMMUNITY_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/60 rounded-lg overflow-hidden flex flex-col justify-between transition-all group shadow-md"
            >
              <div>
                <div className="relative h-48 w-full bg-industrial-950 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 text-[11px] font-mono text-puzzolana-gold font-bold bg-industrial-950/90 px-2 py-0.5 rounded border border-puzzolana-gold/40">
                    {proj.beneficiaries}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-[10px] font-mono text-industrial-400 uppercase mb-1">
                    {proj.location}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-puzzolana-gold transition-colors mb-3 leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-industrial-300 leading-relaxed mb-4">
                    {proj.overview}
                  </p>

                  <div className="space-y-1.5 mb-2">
                    {proj.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-industrial-300">
                        <Check className="w-3.5 h-3.5 text-puzzolana-gold shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-industrial-800 p-5 pt-3 bg-industrial-950/40 text-[10px] font-mono text-industrial-500 flex items-center justify-between">
                <span>Puzzolana CSR Initiative</span>
                <HeartHandshake className="w-3.5 h-3.5 text-puzzolana-gold" />
              </div>
            </div>
          ))}
        </div>

        {/* 5. Governance, ISO Certifications & Reports */}
        <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="text-xs font-mono text-puzzolana-gold uppercase font-bold">
                STANDARDS &amp; GOVERNANCE
              </div>
              <h3 className="text-xl font-bold text-white">
                Certified Environmental &amp; Safety Management Systems
              </h3>
              <p className="text-xs text-industrial-300 leading-relaxed">
                All Puzzolana heavy manufacturing facilities operate under strictly audited international standards ensuring worker occupational health, zero-discharge wastewater compliance, and product quality consistency.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded bg-industrial-950 border border-industrial-800 text-xs font-mono text-white font-bold">
                  ISO 9001:2015 Quality Management
                </span>
                <span className="px-3 py-1 rounded bg-industrial-950 border border-industrial-800 text-xs font-mono text-emerald-400 font-bold">
                  ISO 14001:2015 Environmental System
                </span>
                <span className="px-3 py-1 rounded bg-industrial-950 border border-industrial-800 text-xs font-mono text-puzzolana-gold font-bold">
                  ISO 45001:2018 Occupational Health &amp; Safety
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-industrial-950 p-5 rounded-lg border border-industrial-800 space-y-3">
              <div className="text-xs font-mono text-industrial-400 uppercase">
                Annual ESG Documentation
              </div>
              <div className="p-3 rounded bg-industrial-900 border border-industrial-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate pr-2">
                  <FileText className="w-4 h-4 text-puzzolana-gold shrink-0" />
                  <span className="text-white truncate">Annual Sustainability Report 2025-26</span>
                </div>
                <span className="text-[10px] font-mono text-industrial-400 shrink-0">PDF</span>
              </div>
              <Link href="/quote?subject=Eco-Crushing%20Plant%20Audit">
                <Button variant="primary" size="sm" className="w-full text-xs font-bold mt-1">
                  Request Green Quarry Plant Sizing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
