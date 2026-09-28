'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VERIFIED_CASE_STUDIES, CaseStudyItem } from '@/lib/seedCaseStudies';
import {
  Factory,
  MapPin,
  Calendar,
  Layers,
  Search,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award,
  ArrowRight,
  SlidersHorizontal,
  FileText,
  Activity,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function CaseStudiesDirectoryPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [capacityFilter, setCapacityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const industries = [
    { id: 'all', name: 'All Installations (6)' },
    { id: 'Commercial Aggregate Quarries', name: 'Commercial Aggregates' },
    { id: 'Highway Infrastructure', name: 'Highway Infrastructure' },
    { id: 'Iron Ore & Mineral Mining', name: 'Iron Ore Mining' },
    { id: 'Manufactured Sand (M-Sand)', name: 'M-Sand & Washing' },
    { id: 'Coal Mining', name: 'Open-Cast Coal' },
  ];

  const filteredCaseStudies = useMemo(() => {
    return VERIFIED_CASE_STUDIES.filter((item) => {
      // Industry filter
      if (selectedIndustry !== 'all' && item.industry !== selectedIndustry) {
        return false;
      }
      // Capacity filter
      if (capacityFilter === 'lt500' && item.plantCapacityTPH >= 500) return false;
      if (capacityFilter === '500to1000' && (item.plantCapacityTPH < 500 || item.plantCapacityTPH > 1000)) return false;
      if (capacityFilter === 'gt1000' && item.plantCapacityTPH <= 1000) return false;

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchClient = item.clientName.toLowerCase().includes(q);
        const matchLoc = item.location.toLowerCase().includes(q) || item.state.toLowerCase().includes(q);
        const matchRock = item.rockType.toLowerCase().includes(q);
        const matchEquip = item.equipmentSupplied.some((e) =>
          e.model.toLowerCase().includes(q) || e.name.toLowerCase().includes(q)
        );
        if (!matchTitle && !matchClient && !matchLoc && !matchRock && !matchEquip) {
          return false;
        }
      }
      return true;
    });
  }, [selectedIndustry, capacityFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* 1. Hero Header */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4">
            <Link href="/" className="hover:text-puzzolana-gold transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-puzzolana-gold uppercase">CASE STUDIES &amp; INSTALLATIONS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono mb-4">
                <Award className="w-3.5 h-3.5" />
                <span>FIELD-VERIFIED OPERATIONAL CASE HISTORIES</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-white mb-4">
                ENGINEERED EXCELLENCE <span className="text-puzzolana-gold">IN THE FIELD</span>
              </h1>
              <p className="text-industrial-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-6">
                Explore real quarry flowsheets, high-tonnage mining beneficiation lines, expressway aggregate plants, and zero-silt M-Sand systems engineered and commissioned by Puzzolana.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/quote">
                  <Button variant="primary" className="font-semibold text-xs sm:text-sm">
                    Request Flowsheet Engineering
                  </Button>
                </Link>
                <Link href="/finder">
                  <Button variant="outline" className="font-semibold text-xs sm:text-sm border-industrial-700 hover:border-puzzolana-gold">
                    Launch Product Finder
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-puzzolana-gold">5,000+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Live Plants</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">2,500</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Max TPH Single Pass</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-puzzolana-gold">&lt; 12%</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Flakiness Index</div>
              </div>
              <div className="p-4 rounded bg-industrial-900 border border-industrial-800 flex flex-col justify-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">98%+</div>
                <div className="text-xs text-industrial-400 uppercase font-mono mt-1">Fines Recovery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter & Search Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="bg-industrial-900/80 border border-industrial-800 rounded-lg p-4 space-y-4">
          {/* Industry Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-industrial-800 pb-3">
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  selectedIndustry === ind.id
                    ? 'bg-puzzolana-gold text-industrial-950 font-bold shadow'
                    : 'bg-industrial-800/60 text-industrial-300 hover:text-white hover:bg-industrial-700'
                }`}
              >
                {ind.name}
              </button>
            ))}
          </div>

          {/* Search & Capacity Dropdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 text-industrial-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search case studies by rock type, location, machine model (e.g. Granite, PJC 14076, Odisha, M-Sand)..."
                className="w-full bg-industrial-950 border border-industrial-800 rounded py-2 pl-9 pr-4 text-xs sm:text-sm text-industrial-100 placeholder-industrial-500 focus:outline-none focus:border-puzzolana-gold"
              />
            </div>

            <div className="md:col-span-4 flex items-center justify-start md:justify-end gap-2">
              <span className="text-xs font-mono text-industrial-400 shrink-0">Capacity:</span>
              <select
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
                className="bg-industrial-950 border border-industrial-800 rounded py-1.5 px-3 text-xs text-industrial-200 focus:outline-none focus:border-puzzolana-gold w-full sm:w-auto font-mono"
              >
                <option value="all">All Capacities</option>
                <option value="lt500">&lt; 500 TPH</option>
                <option value="500to1000">500 - 1000 TPH</option>
                <option value="gt1000">&gt; 1000 TPH</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-mono text-industrial-400">
            Showing <span className="text-puzzolana-gold font-bold">{filteredCaseStudies.length}</span> Verified Case Studies
          </div>
        </div>

        {filteredCaseStudies.length === 0 ? (
          <div className="text-center py-16 bg-industrial-900/40 border border-dashed border-industrial-800 rounded-lg">
            <Factory className="w-12 h-12 text-industrial-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No Case Studies Found</h3>
            <p className="text-sm text-industrial-400 max-w-md mx-auto mb-4">
              We did not find any installation reports matching your current filter selections.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedIndustry('all');
                setCapacityFilter('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((study) => (
              <div
                key={study.id}
                className="bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/60 rounded-lg overflow-hidden flex flex-col justify-between transition-all group shadow-md"
              >
                <div>
                  {/* Image & Capacity Badge */}
                  <div className="relative h-48 w-full bg-industrial-950 overflow-hidden">
                    <img
                      src={study.featuredImage}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-transparent opacity-80" />
                    
                    {/* Capacity Badge */}
                    <div className="absolute top-3 left-3 bg-industrial-950/90 border border-puzzolana-gold/60 backdrop-blur-sm px-2.5 py-1 rounded font-mono text-xs font-bold text-puzzolana-gold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{study.plantCapacityTPH} TPH</span>
                    </div>

                    {/* Commissioning Year */}
                    <div className="absolute top-3 right-3 bg-industrial-950/80 border border-industrial-700 backdrop-blur-sm px-2 py-0.5 rounded font-mono text-[11px] text-industrial-300">
                      Est. {study.yearCommissioned}
                    </div>

                    {/* Location strip */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center gap-1 text-[11px] font-mono text-industrial-300">
                      <MapPin className="w-3.5 h-3.5 text-puzzolana-gold shrink-0" />
                      <span className="truncate">{study.location}, {study.state}</span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5">
                    <div className="text-[10px] font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
                      {study.industry}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-puzzolana-gold transition-colors line-clamp-2 mb-2">
                      {study.title}
                    </h3>

                    <p className="text-xs text-industrial-300 line-clamp-2 leading-relaxed mb-4">
                      {study.challenge}
                    </p>

                    {/* Installed Equipment Chips */}
                    <div className="mb-4">
                      <div className="text-[10px] font-mono text-industrial-400 uppercase mb-1.5 flex items-center gap-1">
                        <Layers className="w-3 h-3 text-puzzolana-gold" /> Key Machinery:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {study.equipmentSupplied.slice(0, 3).map((eq, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono bg-industrial-800 text-industrial-200 px-2 py-0.5 rounded border border-industrial-700"
                          >
                            {eq.model}
                          </span>
                        ))}
                        {study.equipmentSupplied.length > 3 && (
                          <span className="text-[10px] font-mono bg-industrial-800 text-industrial-400 px-1.5 py-0.5 rounded">
                            +{study.equipmentSupplied.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Top Result Card */}
                    {study.results.length > 0 && (
                      <div className="bg-industrial-950 p-2.5 rounded border border-industrial-800/80 mb-2">
                        <div className="text-[10px] font-mono text-puzzolana-gold uppercase">
                          {study.results[0].metric}
                        </div>
                        <div className="text-xs font-bold text-white mt-0.5">
                          {study.results[0].value}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="border-t border-industrial-800 p-5 pt-3 bg-industrial-950/40">
                  <Link href={`/case-studies/${study.slug}`} className="block w-full">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full text-xs font-semibold flex items-center justify-center gap-1.5 py-2"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
