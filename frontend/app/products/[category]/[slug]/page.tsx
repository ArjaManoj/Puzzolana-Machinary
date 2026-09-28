'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  VERIFIED_FRONTEND_PRODUCTS,
  OFFICIAL_CATEGORIES,
} from '@/lib/seedCatalog';
import { MachineryProduct, EquipmentCategorySlug } from '@/types';
import {
  ProductGallery,
  ProductActionCard,
  SpecMatrixTable,
  RelatedMachinerySection,
} from '@/components/machinery';
import {
  ComparisonTray,
  QuickQuoteModal,
} from '@/components/catalogue';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FileDown,
  Layers,
  Zap,
  Sparkles,
  Award,
  Settings,
  HelpCircle,
  Cpu,
  Video,
  Box,
} from 'lucide-react';

interface ProductDetailPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { category, slug } = params;

  // Find product by slug and category
  const product = useMemo(() => {
    return VERIFIED_FRONTEND_PRODUCTS.find(
      (p) => p.slug === slug || p.id.toLowerCase() === slug.toLowerCase()
    );
  }, [slug]);

  if (!product) {
    notFound();
  }

  // Active tab state
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'applications' | 'downloads' | '3d-cad'>('specs');
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);

  // Find related products
  const relatedProducts = useMemo(() => {
    return VERIFIED_FRONTEND_PRODUCTS.filter(
      (p) => product.relatedProductSlugs?.includes(p.slug) || (p.category === product.category && p.id !== product.id)
    ).slice(0, 3);
  }, [product]);

  // Comparison handlers
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

  // JSON-LD structured data for Google SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    model: product.modelNumber,
    description: product.fullDescription,
    image: product.primaryImage,
    brand: {
      '@type': 'Brand',
      name: 'Puzzolana Machinery',
    },
    category: product.categoryName,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 pb-28 pt-8">
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Breadcrumb Navigation & Top Metadata */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-industrial-400">
          <Link href="/" className="hover:text-white transition-colors">
            HOME
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
          <Link href="/products" className="hover:text-white transition-colors">
            CATALOGUE
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
          <Link
            href={`/products/${product.category}`}
            className="hover:text-white transition-colors uppercase"
          >
            {product.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
          <span className="text-brand-yellow font-bold uppercase">{product.modelNumber}</span>
        </div>
      </section>

      {/* 2. Main Product Showcase & Gallery Stage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Gallery & Primary Technical Overview (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold text-brand-yellow bg-brand-yellow/10 border border-brand-yellow/30 px-2.5 py-0.5 rounded">
                  {product.productFamily}
                </span>
                <span className="text-xs font-mono text-industrial-400 bg-industrial-900 border border-industrial-800 px-2.5 py-0.5 rounded">
                  Sub-Type: {product.subcategory}
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> ISO 9001 Certified Quality
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-sm font-mono text-brand-yellow/90 mt-1">
                Model: <span className="font-bold">{product.modelNumber}</span>
              </p>
            </div>

            {/* Interactive Image Gallery */}
            <ProductGallery
              primaryImage={product.primaryImage}
              galleryImages={product.galleryImages}
              productName={product.name}
              modelNumber={product.modelNumber}
              minTPH={product.capacityMinTPH}
              maxTPH={product.capacityMaxTPH}
              mobilityType={product.mobilityType}
            />

            {/* Engineering Overview Text */}
            <div className="industrial-card p-6 rounded-sm border border-industrial-800 space-y-4 bg-industrial-900/40">
              <h2 className="text-sm font-black text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-yellow" />
                ENGINEERING DESIGN & OPERATIONAL OVERVIEW
              </h2>
              <p className="text-sm text-industrial-300 leading-relaxed font-sans">
                {product.fullDescription}
              </p>

              {/* Fast Spec Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono text-xs">
                <div className="bg-industrial-950 p-3 rounded border border-industrial-800">
                  <span className="text-industrial-500 block text-[10px] uppercase">Rated Capacity</span>
                  <strong className="text-brand-yellow text-sm font-black">
                    {product.capacityMinTPH}–{product.capacityMaxTPH} TPH
                  </strong>
                </div>
                <div className="bg-industrial-950 p-3 rounded border border-industrial-800">
                  <span className="text-industrial-500 block text-[10px] uppercase">Max Feed Opening</span>
                  <strong className="text-white text-sm font-black">{product.maxFeedSizeMM} mm</strong>
                </div>
                <div className="bg-industrial-950 p-3 rounded border border-industrial-800">
                  <span className="text-industrial-500 block text-[10px] uppercase">Connected Power</span>
                  <strong className="text-white text-sm font-black">{product.powerRatingKW} kW</strong>
                </div>
                <div className="bg-industrial-950 p-3 rounded border border-industrial-800">
                  <span className="text-industrial-500 block text-[10px] uppercase">Mounting / Chassis</span>
                  <strong className="text-industrial-300 text-sm font-black">{product.mobilityType}</strong>
                </div>
              </div>
            </div>

            {/* 3. Deep-Dive Specification Tabs */}
            <div className="space-y-4">
              {/* Tab Navigation */}
              <div className="flex items-center gap-2 overflow-x-auto border-b border-industrial-800 pb-2">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`px-4 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all border ${
                    activeTab === 'specs'
                      ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow'
                      : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:text-white'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Technical Specs</span>
                </button>

                <button
                  onClick={() => setActiveTab('features')}
                  className={`px-4 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all border ${
                    activeTab === 'features'
                      ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow'
                      : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:text-white'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Features & Benefits</span>
                </button>

                <button
                  onClick={() => setActiveTab('applications')}
                  className={`px-4 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all border ${
                    activeTab === 'applications'
                      ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow'
                      : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Materials & Applications</span>
                </button>

                <button
                  onClick={() => setActiveTab('downloads')}
                  className={`px-4 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all border ${
                    activeTab === 'downloads'
                      ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow'
                      : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:text-white'
                  }`}
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Downloads & CAD</span>
                </button>

                <button
                  onClick={() => setActiveTab('3d-cad')}
                  className={`px-4 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all border ${
                    activeTab === '3d-cad'
                      ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow'
                      : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D CAD / Simulation</span>
                </button>
              </div>

              {/* Tab 1 Content: Technical Specs Matrix */}
              {activeTab === 'specs' && (
                <div className="space-y-4 pt-2">
                  <SpecMatrixTable
                    groups={product.specifications}
                    modelNumber={product.modelNumber}
                  />
                </div>
              )}

              {/* Tab 2 Content: Features & Benefits */}
              {activeTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Features */}
                  <div className="industrial-card p-5 rounded-sm border border-industrial-800 space-y-3 bg-industrial-900/40">
                    <h4 className="text-xs font-black text-white uppercase font-mono tracking-wider flex items-center gap-2 border-b border-industrial-800 pb-3">
                      <Cpu className="w-4 h-4 text-brand-yellow" />
                      KEY ENGINEERING FEATURES
                    </h4>
                    <ul className="space-y-2.5 text-xs text-industrial-200">
                      {product.features?.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="industrial-card p-5 rounded-sm border border-industrial-800 space-y-3 bg-industrial-900/40">
                    <h4 className="text-xs font-black text-white uppercase font-mono tracking-wider flex items-center gap-2 border-b border-industrial-800 pb-3">
                      <Award className="w-4 h-4 text-brand-yellow" />
                      OPERATIONAL ADVANTAGES
                    </h4>
                    <ul className="space-y-2.5 text-xs text-industrial-200">
                      {product.benefits?.map((ben, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Zap className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 3 Content: Applications & Raw Materials */}
              {activeTab === 'applications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-mono text-xs">
                  {/* Applications */}
                  <div className="industrial-card p-5 rounded-sm border border-industrial-800 space-y-3 bg-industrial-900/40">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-industrial-800 pb-3">
                      TARGET INDUSTRY APPLICATIONS
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.applications?.map((app, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded bg-industrial-950 border border-industrial-700 text-white font-mono text-xs"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Raw Materials */}
                  <div className="industrial-card p-5 rounded-sm border border-industrial-800 space-y-3 bg-industrial-900/40">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider border-b border-industrial-800 pb-3">
                      GEOLOGICAL MATERIALS & ROCK TYPES
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.materialsHandled?.map((mat, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow font-mono text-xs font-bold"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4 Content: Downloads */}
              {activeTab === 'downloads' && (
                <div className="industrial-card p-6 rounded-sm border border-industrial-800 space-y-4 bg-industrial-900/40">
                  <h4 className="text-xs font-black text-white uppercase font-mono tracking-wider">
                    TECHNICAL DOCUMENTATION REPOSITORY
                  </h4>
                  <p className="text-xs text-industrial-400">
                    Download verified engineering drawings, product brochures, and installation dimensions for {product.modelNumber}.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <a
                      href={product.datasheetUrl || '/downloads/puzzolana-specs.pdf'}
                      className="p-4 rounded bg-industrial-950 border border-industrial-800 hover:border-brand-yellow flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileDown className="w-5 h-5 text-brand-yellow group-hover:scale-110 transition-transform" />
                        <div>
                          <strong className="text-xs text-white block font-mono">
                            Technical Spec Sheet (PDF)
                          </strong>
                          <span className="text-[10px] text-industrial-500 font-mono">
                            Dimension schematics & power curves (1.8 MB)
                          </span>
                        </div>
                      </div>
                    </a>

                    <a
                      href={product.brochureUrl || '/downloads/puzzolana-brochure.pdf'}
                      className="p-4 rounded bg-industrial-950 border border-industrial-800 hover:border-brand-yellow flex items-center justify-between transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileDown className="w-5 h-5 text-brand-yellow group-hover:scale-110 transition-transform" />
                        <div>
                          <strong className="text-xs text-white block font-mono">
                            Official Product Brochure (PDF)
                          </strong>
                          <span className="text-[10px] text-industrial-500 font-mono">
                            Plant layout drawings & case studies (4.2 MB)
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              )}

              {/* Tab 5 Content: 3D Model / Simulation */}
              {activeTab === '3d-cad' && (
                <div className="industrial-card p-8 rounded-sm border border-industrial-800 text-center space-y-4 bg-industrial-950/80">
                  <div className="w-16 h-16 bg-industrial-900 rounded-full flex items-center justify-center mx-auto text-brand-yellow border border-industrial-700">
                    <Box className="w-8 h-8 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-black text-white uppercase font-mono">
                    3D DIGITAL TWIN & SIMULATION PREVIEW
                  </h4>
                  <p className="text-xs text-industrial-400 max-w-md mx-auto">
                    Interactive 360° inspection module for model <strong className="text-white">{product.modelNumber}</strong>. View internal crusher chamber, toggle manganese wear liners, and inspect drive train.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="px-4 py-2 bg-brand-yellow text-industrial-950 font-bold font-mono text-xs rounded hover:bg-brand-yellow-400 transition-colors"
                    >
                      Request CAD Files & Plant Integration Drawings
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Downstream / Compatible Machinery Section */}
            <RelatedMachinerySection
              relatedProducts={relatedProducts}
              category={product.category}
              onToggleCompare={handleToggleCompare}
              comparedIds={comparedIds}
              onRequestQuote={() => setIsQuoteModalOpen(true)}
            />
          </div>

          {/* Right Column: Sticky Action Card (4 cols) */}
          <div className="lg:col-span-4">
            <ProductActionCard
              product={product}
              onRequestQuote={() => setIsQuoteModalOpen(true)}
              isCompared={comparedIds.includes(product.id)}
              onToggleCompare={() => handleToggleCompare(product.id)}
            />
          </div>
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
        product={product}
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
