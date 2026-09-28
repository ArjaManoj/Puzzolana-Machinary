import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  VERIFIED_CASE_STUDIES,
  CaseStudyItem,
} from '@/lib/seedCaseStudies';
import {
  Factory,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Award,
  ArrowLeft,
  ArrowRight,
  Download,
  Quote,
  ShieldCheck,
  Zap,
  Activity,
  Sparkles,
  FileText,
  Sliders,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/common/Button';

import { JsonLd } from '@/components/seo/JsonLd';
import { generateBreadcrumbSchema } from '@/lib/seo';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return VERIFIED_CASE_STUDIES.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const study = VERIFIED_CASE_STUDIES.find((s) => s.slug === params.slug);
  if (!study) {
    return {
      title: 'Case Study Not Found | Puzzolana Machinery',
    };
  }

  return {
    title: `${study.title} | Puzzolana Field Installation Case Study`,
    description: `${study.plantCapacityTPH} TPH crushing & screening installation in ${study.location}, ${study.state}. Engineered by Puzzolana.`,
  };
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const study = VERIFIED_CASE_STUDIES.find((s) => s.slug === params.slug);

  if (!study) {
    notFound();
  }

  const otherStudies = VERIFIED_CASE_STUDIES.filter((s) => s.slug !== study.slug).slice(0, 2);
  const totalPowerKW = study.equipmentSupplied.reduce(
    (acc, curr) => acc + curr.powerKW * curr.quantity,
    0
  );

  const breadcrumbsSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
    { name: study.title, url: `/case-studies/${study.slug}` },
  ]);

  const caseStudyArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: `${study.plantCapacityTPH} TPH ${study.industry} installation in ${study.location}, ${study.state}.`,
    url: `https://puzzolana.com/case-studies/${study.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Puzzolana Machinery OEM',
    },
  };

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      <JsonLd data={[caseStudyArticleSchema, breadcrumbsSchema]} />
      {/* 1. Hero Header */}
      <section className="relative border-b border-industrial-800 bg-industrial-900/60 pb-12 pt-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e6a817_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-industrial-400 mb-4 flex-wrap">
            <Link href="/" className="hover:text-puzzolana-gold transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link href="/case-studies" className="hover:text-puzzolana-gold transition-colors">
              CASE STUDIES
            </Link>
            <span>/</span>
            <span className="text-puzzolana-gold uppercase truncate max-w-xs">{study.slug}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded bg-puzzolana-gold/10 border border-puzzolana-gold/30 text-puzzolana-gold text-xs font-mono font-bold">
              {study.industry}
            </span>
            <span className="px-2.5 py-1 rounded bg-industrial-800 border border-industrial-700 text-industrial-300 text-xs font-mono flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-puzzolana-gold" />
              {study.location}, {study.state}, {study.country}
            </span>
            <span className="px-2.5 py-1 rounded bg-industrial-800 border border-industrial-700 text-industrial-300 text-xs font-mono">
              Commissioned: {study.yearCommissioned}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white mb-4 leading-tight">
            {study.title}
          </h1>

          <div className="text-xs sm:text-sm font-mono text-industrial-300 flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
            <div>
              <span className="text-industrial-500 uppercase">Client:</span>{' '}
              <span className="text-white font-bold">{study.clientName}</span>
            </div>
            <div>
              <span className="text-industrial-500 uppercase">Rock Hardness:</span>{' '}
              <span className="text-puzzolana-gold font-bold">{study.rockType}</span>
            </div>
            <div>
              <span className="text-industrial-500 uppercase">Max Feed:</span>{' '}
              <span className="text-industrial-200 font-bold">{study.feedSizeMax}</span>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded bg-industrial-900 border border-industrial-800">
              <div className="text-xs text-industrial-400 font-mono uppercase">Design Capacity</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-puzzolana-gold mt-0.5">
                {study.plantCapacityTPH} TPH
              </div>
            </div>
            <div className="p-3.5 rounded bg-industrial-900 border border-industrial-800">
              <div className="text-xs text-industrial-400 font-mono uppercase">Total Connected Load</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white mt-0.5">
                {totalPowerKW} kW
              </div>
            </div>
            <div className="p-3.5 rounded bg-industrial-900 border border-industrial-800">
              <div className="text-xs text-industrial-400 font-mono uppercase">Major Machinery Units</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-puzzolana-gold mt-0.5">
                {study.equipmentSupplied.reduce((acc, c) => acc + c.quantity, 0)} Units
              </div>
            </div>
            <div className="p-3.5 rounded bg-industrial-900 border border-industrial-800">
              <div className="text-xs text-industrial-400 font-mono uppercase">Product Fractions</div>
              <div className="text-xl sm:text-2xl font-black font-mono text-white mt-0.5">
                {study.productsProduced.length} Calibrated Sizes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured Image */}
            <div className="rounded-lg overflow-hidden border border-industrial-800 relative h-72 sm:h-96 w-full bg-industrial-900">
              <img
                src={study.featuredImage}
                alt={study.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-transparent to-transparent opacity-60" />
            </div>

            {/* Verified Operational Results & Metrics */}
            <div>
              <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
                OPERATIONAL PERFORMANCE METRICS
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-white mb-4">
                Field-Verified Results &amp; ROI
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {study.results.map((res, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-industrial-900 border border-industrial-800 hover:border-puzzolana-gold/50 transition-all"
                  >
                    <div className="text-xs font-mono text-industrial-400 uppercase mb-1">
                      {res.metric}
                    </div>
                    <div className="text-2xl font-black font-mono text-puzzolana-gold mb-1">
                      {res.value}
                    </div>
                    <p className="text-xs text-industrial-300 leading-relaxed">
                      {res.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-5">
                <div className="flex items-center gap-2 text-xs font-mono text-rose-400 uppercase font-bold mb-2">
                  <Activity className="w-4 h-4 text-rose-400" />
                  <span>The Operational Challenge</span>
                </div>
                <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-5">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>The Puzzolana Engineering Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Flowsheet Architecture */}
            <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-6">
              <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
                PLANT ARCHITECTURE
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                Stage-by-Stage Flowsheet Sequence
              </h3>
              <div className="space-y-3">
                {study.flowsheetOverview.map((stage, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-industrial-950 p-3.5 rounded border border-industrial-800/80 text-xs sm:text-sm text-industrial-200"
                  >
                    <div className="w-6 h-6 rounded bg-puzzolana-gold text-industrial-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="leading-relaxed">{stage}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Installed Equipment Table */}
            <div>
              <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
                EQUIPMENT INVENTORY
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                Installed Machinery Fleet &amp; Connected Power
              </h3>

              <div className="overflow-x-auto rounded-lg border border-industrial-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-industrial-900 text-industrial-400 font-mono uppercase text-[11px] border-b border-industrial-800">
                    <tr>
                      <th className="py-3 px-4">Equipment Model</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Flowsheet Stage</th>
                      <th className="py-3 px-4 text-right">Power (kW)</th>
                      <th className="py-3 px-4 text-center">Qty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-industrial-800/60 bg-industrial-950 font-mono">
                    {study.equipmentSupplied.map((eq, idx) => (
                      <tr key={idx} className="hover:bg-industrial-900/50">
                        <td className="py-3 px-4 font-bold text-puzzolana-gold">{eq.model}</td>
                        <td className="py-3 px-4 text-white">{eq.name}</td>
                        <td className="py-3 px-4 text-industrial-300">
                          <span className="px-2 py-0.5 rounded bg-industrial-800 text-[10px]">
                            {eq.stage}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right text-industrial-200">{eq.powerKW} kW</td>
                        <td className="py-3 px-4 text-center text-white">{eq.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Products Calibrated Output */}
            <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-6">
              <div className="text-xs font-mono text-puzzolana-gold uppercase tracking-wider mb-1">
                CALIBRATED DISPATCH
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Commercial End Products Manufactured
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {study.productsProduced.map((prod, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs bg-industrial-950 p-2.5 rounded border border-industrial-800 text-industrial-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-puzzolana-gold shrink-0" />
                    <span>{prod}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Testimonial */}
            {study.testimonial && (
              <div className="bg-gradient-to-r from-industrial-900 via-industrial-900 to-industrial-850 border border-puzzolana-gold/40 rounded-lg p-6 relative overflow-hidden">
                <Quote className="w-12 h-12 text-puzzolana-gold/15 absolute top-4 right-4 pointer-events-none" />
                <p className="text-sm sm:text-base text-industrial-200 italic leading-relaxed mb-4 relative z-10">
                  &ldquo;{study.testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-industrial-800/80 pt-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{study.testimonial.author}</div>
                    <div className="text-xs text-industrial-400 font-mono">
                      {study.testimonial.role}, {study.testimonial.company}
                    </div>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-puzzolana-gold" />
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct RFQ Action Box */}
            <div className="bg-industrial-900 border border-puzzolana-gold/50 rounded-lg p-6 shadow-xl space-y-4 sticky top-24">
              <div className="text-xs font-mono text-puzzolana-gold uppercase font-bold">
                ENGINEERING CONSULTATION
              </div>
              <h3 className="text-base font-bold text-white">
                Require a Similar {study.plantCapacityTPH} TPH Configuration?
              </h3>
              <p className="text-xs text-industrial-300 leading-relaxed">
                Connect with our Hyderabad application design team for a customized rock crushing simulation and budgetary plant flowsheet proposal.
              </p>

              <Link href={`/quote?prefillCapacity=${study.plantCapacityTPH}&prefillCategory=${study.industry}`}>
                <Button variant="primary" className="w-full text-xs font-bold py-3 mt-2">
                  Request Plant Quotation
                </Button>
              </Link>

              <div className="pt-2 border-t border-industrial-800 text-[11px] font-mono text-industrial-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-puzzolana-gold shrink-0" />
                <span>24-Hour Sizing &amp; GA Layout Proposal SLA</span>
              </div>
            </div>

            {/* Technical Downloads */}
            {study.downloads.length > 0 && (
              <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-5 space-y-3">
                <div className="text-xs font-mono text-industrial-400 uppercase mb-1">
                  Technical Documentation
                </div>
                {study.downloads.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded bg-industrial-950 border border-industrial-800 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <FileText className="w-4 h-4 text-puzzolana-gold shrink-0" />
                      <span className="truncate text-white">{doc.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-industrial-400 uppercase shrink-0">
                      {doc.size}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Other Installation Case Studies */}
            <div className="bg-industrial-900 border border-industrial-800 rounded-lg p-5 space-y-4">
              <div className="text-xs font-mono text-puzzolana-gold uppercase">
                More Case Studies
              </div>
              <div className="space-y-3">
                {otherStudies.map((other) => (
                  <Link
                    key={other.id}
                    href={`/case-studies/${other.slug}`}
                    className="block p-3 rounded bg-industrial-950 border border-industrial-800 hover:border-puzzolana-gold/50 transition-colors group"
                  >
                    <div className="text-[10px] font-mono text-puzzolana-gold uppercase">
                      {other.plantCapacityTPH} TPH • {other.industry}
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-puzzolana-gold transition-colors mt-0.5 line-clamp-2">
                      {other.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
