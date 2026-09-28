'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  ArrowRight,
  Cpu,
  Layers,
  FileText,
  BookOpen,
  Download,
  Wrench,
  Building,
  CheckCircle2,
  Sparkles,
  Zap,
  Tag,
  ChevronRight,
  Shield,
  Clock,
  MapPin,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { VERIFIED_FRONTEND_PRODUCTS } from '@/lib/seedCatalog';
import { VERIFIED_INDUSTRY_APPLICATIONS } from '@/lib/seedApplications';
import { VERIFIED_CASE_STUDIES } from '@/lib/seedCaseStudies';
import { VERIFIED_ARTICLES } from '@/lib/seedArticles';
import { VERIFIED_DOWNLOAD_ASSETS } from '@/lib/seedDownloads';
import { PUZZOLANA_DEALERS } from '@/lib/seedDealers';
import { PUZZOLANA_LOCATIONS } from '@/lib/seedLocations';
import { VERIFIED_OEM_PARTS } from '@/lib/seedParts';
import { Button } from '@/components/common/Button';

type SearchCategory =
  | 'all'
  | 'products'
  | 'applications'
  | 'case-studies'
  | 'articles'
  | 'downloads'
  | 'spares'
  | 'dealers';

interface UnifiedItem {
  id: string;
  title: string;
  subtitle?: string;
  category: SearchCategory;
  url: string;
  snippet: string;
  badge?: string;
  specs?: {
    capacity?: string;
    power?: string;
    feedSize?: string;
    location?: string;
    format?: string;
    material?: string;
  };
  score: number;
}

const CATEGORY_TABS: { id: SearchCategory; label: string; icon: any }[] = [
  { id: 'all', label: 'All Results', icon: Sparkles },
  { id: 'products', label: 'Machinery Models', icon: Cpu },
  { id: 'applications', label: 'Process Flowsheets', icon: Layers },
  { id: 'case-studies', label: 'Case Studies', icon: FileText },
  { id: 'articles', label: 'Technical Articles', icon: BookOpen },
  { id: 'downloads', label: 'Datasheets & CADs', icon: Download },
  { id: 'spares', label: 'Wear Parts & Liners', icon: Wrench },
  { id: 'dealers', label: 'Dealers & Facilities', icon: Building },
];

const POPULAR_SEARCH_TAGS = [
  'PJC-14076 Jaw Crusher',
  'PCC-2000 Cone Crusher',
  'PVI-1200 VSI Impactor',
  'PTJ-1100 Track Mobile',
  '600 TPH Granite Flowsheet',
  'IS 383 Zone II M-Sand',
  'Mn18Cr2 Jaw Dies',
  '2D/3D CAD Layouts',
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get('q') || '';
  const initialCategory = (searchParams.get('category') as SearchCategory) || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<SearchCategory>(initialCategory);
  const [minCapacity, setMinCapacity] = useState<number>(0);
  const [selectedMobility, setSelectedMobility] = useState<'ALL' | 'STATIONARY' | 'TRACK_MOUNTED'>('ALL');
  const [showFilters, setShowFilters] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    const qParam = searchParams.get('q') || '';
    const catParam = (searchParams.get('category') as SearchCategory) || 'all';
    setQuery(qParam);
    setActiveCategory(catParam);
  }, [searchParams]);

  // Update URL search parameters
  const updateUrl = (newQuery: string, newCat: SearchCategory) => {
    const params = new URLSearchParams();
    if (newQuery.trim()) params.set('q', newQuery.trim());
    if (newCat !== 'all') params.set('category', newCat);
    router.replace(`/search?${params.toString()}`);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateUrl(val, activeCategory);
  };

  const handleCategoryChange = (cat: SearchCategory) => {
    setActiveCategory(cat);
    updateUrl(query, cat);
  };

  // Build searchable index from rich verified seeds
  const allIndexedItems: UnifiedItem[] = useMemo(() => {
    const items: UnifiedItem[] = [];

    // 1. Products
    VERIFIED_FRONTEND_PRODUCTS.forEach((p) => {
      const isTrack = p.mobilityType === 'Track-Mounted';
      items.push({
        id: `prod-${p.id || p.modelNumber}`,
        title: `${p.modelNumber} — ${p.name}`,
        subtitle: `${p.productFamily} • ${p.capacityMinTPH}-${p.capacityMaxTPH} TPH • ${p.powerRatingKW || 0} kW`,
        category: 'products',
        url: `/products/${p.category}/${p.slug}`,
        snippet: p.shortDescription || p.fullDescription?.slice(0, 180) || '',
        badge: isTrack ? 'Track Mobile' : 'Stationary Plant',
        specs: {
          capacity: `${p.capacityMinTPH}-${p.capacityMaxTPH} TPH`,
          power: p.powerRatingKW ? `${p.powerRatingKW} kW` : undefined,
          feedSize: p.maxFeedSizeMM ? `Max ${p.maxFeedSizeMM} mm` : undefined,
          material: p.materialsHandled?.slice(0, 3).join(', '),
        },
        score: 0,
      });
    });

    // 2. Applications
    VERIFIED_INDUSTRY_APPLICATIONS.forEach((app) => {
      items.push({
        id: `app-${app.id}`,
        title: app.name,
        subtitle: app.tagline,
        category: 'applications',
        url: `/applications/${app.slug}`,
        snippet: app.overview,
        badge: 'Engineered Flowsheet',
        specs: {
          material: app.materialsHandled?.slice(0, 3).join(', ') || 'Aggregates & Minerals',
        },
        score: 0,
      });
    });

    // 3. Case Studies
    VERIFIED_CASE_STUDIES.forEach((cs) => {
      items.push({
        id: `cs-${cs.id}`,
        title: cs.title,
        subtitle: `Client: ${cs.clientName} • ${cs.location}`,
        category: 'case-studies',
        url: `/case-studies/${cs.slug}`,
        snippet: cs.solution || cs.challenge,
        badge: 'Plant Commissioning',
        specs: {
          capacity: `${cs.plantCapacityTPH} TPH`,
          location: `${cs.location}, ${cs.state}`,
          material: cs.rockType,
        },
        score: 0,
      });
    });

    // 4. Articles
    VERIFIED_ARTICLES.forEach((art) => {
      items.push({
        id: `art-${art.id}`,
        title: art.title,
        subtitle: `By ${art.author.name}, ${art.author.role} • ${art.readTimeMinutes} min read`,
        category: 'articles',
        url: `/news/${art.slug}`,
        snippet: art.excerpt,
        badge: 'Technical Whitepaper',
        specs: {
          material: art.category,
        },
        score: 0,
      });
    });

    // 5. Downloads
    VERIFIED_DOWNLOAD_ASSETS.forEach((dl) => {
      items.push({
        id: `dl-${dl.id}`,
        title: dl.title,
        subtitle: `${dl.id} • ${dl.fileType} (${dl.fileSize})`,
        category: 'downloads',
        url: '/downloads',
        snippet: dl.description,
        badge: dl.isGated ? 'Gated CAD Asset' : 'Direct Download',
        specs: {
          format: `${dl.fileType} (${dl.fileSize})`,
        },
        score: 0,
      });
    });

    // 6. Spare Parts
    VERIFIED_OEM_PARTS.forEach((part) => {
      items.push({
        id: `part-${part.id}`,
        title: `${part.partNumber} — ${part.name}`,
        subtitle: `Category: ${part.category} • Material: ${part.materialGrade}`,
        category: 'spares',
        url: '/spare-parts',
        snippet: part.description,
        badge: 'OEM Wear Component',
        specs: {
          material: part.materialGrade,
        },
        score: 0,
      });
    });

    // 7. Dealers & Facilities
    PUZZOLANA_LOCATIONS.forEach((loc) => {
      items.push({
        id: `loc-${loc.id}`,
        title: `${loc.name} (${loc.city}, ${loc.state})`,
        subtitle: `${loc.address} • Ph: ${loc.phone}`,
        category: 'dealers',
        url: '/contact',
        snippet: `Puzzolana official facility with sales and engineering service desk.`,
        badge: loc.category === 'Headquarters' ? 'Headquarters' : 'Manufacturing Plant',
        specs: {
          location: `${loc.city}, ${loc.country}`,
        },
        score: 0,
      });
    });

    PUZZOLANA_DEALERS.forEach((dlr) => {
      items.push({
        id: `dlr-${dlr.id}`,
        title: `${dlr.companyName} (${dlr.city}, ${dlr.state})`,
        subtitle: `Authorized Territory: ${dlr.region} • Ph: ${dlr.phone}`,
        category: 'dealers',
        url: '/dealers',
        snippet: `Authorized OEM Dealership providing machinery sales, wear parts, and field service technicians.`,
        badge: 'Authorized Dealership',
        specs: {
          location: `${dlr.city}, ${dlr.country}`,
        },
        score: 0,
      });
    });

    return items;
  }, []);

  // Filter & Score Results
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cleanQ = q.replace(/[-_\s]+/g, '');
    const tokens = q.split(/[\s\-_]+/).filter(Boolean);

    if (!q) {
      return [];
    }

    const scoredItems: UnifiedItem[] = [];

    allIndexedItems.forEach((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return;
      }

      // Mobility filter for products
      if (item.category === 'products' && selectedMobility !== 'ALL') {
        const isTrack = item.badge?.includes('Track');
        if (selectedMobility === 'TRACK_MOUNTED' && !isTrack) return;
        if (selectedMobility === 'STATIONARY' && isTrack) return;
      }

      // Capacity filter for products
      if (item.category === 'products' && minCapacity > 0) {
        const capMatch = item.specs?.capacity?.match(/(\d+)\s*TPH/);
        if (capMatch && parseInt(capMatch[1], 10) < minCapacity) {
          return;
        }
      }

      let score = 0;
      const cleanTitle = (item.title + (item.subtitle || '')).toLowerCase().replace(/[-_\s]+/g, '');
      const cleanSnippet = item.snippet.toLowerCase();

      // Exact phrase / code matching
      if (cleanTitle.includes(cleanQ)) {
        score += 100;
      }

      // Token matching
      tokens.forEach((t) => {
        if (!t) return;
        if (cleanTitle.includes(t)) score += 30;
        if (cleanSnippet.includes(t)) score += 10;
        if (item.badge?.toLowerCase().includes(t)) score += 15;
      });

      if (score > 0) {
        scoredItems.push({
          ...item,
          score,
        });
      }
    });

    return scoredItems.sort((a, b) => b.score - a.score);
  }, [query, activeCategory, minCapacity, selectedMobility, allIndexedItems]);

  // Compute live category breakdown counts
  const categoryCounts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cleanQ = q.replace(/[-_\s]+/g, '');
    const tokens = q.split(/[\s\-_]+/).filter(Boolean);

    const counts: Record<SearchCategory, number> = {
      all: 0,
      products: 0,
      applications: 0,
      'case-studies': 0,
      articles: 0,
      downloads: 0,
      spares: 0,
      dealers: 0,
    };

    if (!q) return counts;

    allIndexedItems.forEach((item) => {
      const cleanTitle = (item.title + (item.subtitle || '')).toLowerCase().replace(/[-_\s]+/g, '');
      const cleanSnippet = item.snippet.toLowerCase();

      let matches = cleanTitle.includes(cleanQ);
      if (!matches) {
        matches = tokens.some((t) => cleanTitle.includes(t) || cleanSnippet.includes(t));
      }

      if (matches) {
        counts.all++;
        counts[item.category]++;
      }
    });

    return counts;
  }, [query, allIndexedItems]);

  // Text highlight helper
  const highlightMatch = (text: string, searchStr: string) => {
    if (!searchStr.trim() || !text) return text;
    const tokens = searchStr.trim().split(/[\s\-_]+/).filter(Boolean);
    const regex = new RegExp(`(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-brand-yellow/30 text-brand-yellow font-bold px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-industrial-400">
            <Link href="/" className="hover:text-brand-yellow transition">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-industrial-600" />
            <span className="text-brand-yellow font-semibold">Global Enterprise Search</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <Search className="w-8 h-8 text-brand-yellow" />
                Global Machinery & Technical Search
              </h1>
              <p className="text-industrial-400 text-sm max-w-3xl mt-1">
                Unified index across high-capacity crushers, screening plants, process flowsheets, verified
                case studies, CAD drawings, and OEM wear metallurgy.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-industrial-900 border border-industrial-800 text-xs text-industrial-400">
              <kbd className="px-1.5 py-0.5 rounded bg-industrial-800 font-mono text-[10px] text-brand-yellow">
                Ctrl + K
              </kbd>
              <span>Quick Command Palette</span>
            </div>
          </div>
        </div>

        {/* Search Bar Input Container */}
        <div className="bg-industrial-900 border border-industrial-800 rounded-xl p-4 sm:p-5 shadow-2xl space-y-4">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-6 h-6 text-brand-yellow pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search by equipment model (e.g. PJC-14076, PCC-2000), material, application, TPH, or CAD..."
              className="w-full bg-industrial-950 border border-industrial-700 rounded-lg pl-13 pr-24 py-4 text-white placeholder-industrial-500 text-base sm:text-lg focus:outline-none focus:border-brand-yellow transition shadow-inner"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange('')}
                className="absolute right-12 text-industrial-400 hover:text-white p-1"
                title="Clear Search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`absolute right-3 p-2 rounded-md border transition flex items-center gap-1 text-xs ${
                showFilters
                  ? 'bg-brand-yellow text-industrial-950 border-brand-yellow font-bold'
                  : 'bg-industrial-800 text-industrial-300 border-industrial-700 hover:text-white'
              }`}
              title="Toggle Advanced Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Popular Search Suggestion Tags */}
          <div className="flex items-center flex-wrap gap-2 text-xs pt-1">
            <span className="text-industrial-400 flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" /> Suggestions:
            </span>
            {POPULAR_SEARCH_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleQueryChange(tag)}
                className="bg-industrial-950 hover:bg-brand-yellow hover:text-industrial-950 text-industrial-300 border border-industrial-800 hover:border-brand-yellow px-2.5 py-1 rounded-md transition"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Collapsible Advanced Filters Tray */}
          {showFilters && (
            <div className="pt-4 border-t border-industrial-800 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-400 mb-1.5">
                  Mobility Architecture
                </label>
                <select
                  value={selectedMobility}
                  onChange={(e) => setSelectedMobility(e.target.value as any)}
                  className="w-full bg-industrial-950 border border-industrial-700 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-brand-yellow"
                >
                  <option value="ALL">All Configurations (Stationary & Track)</option>
                  <option value="STATIONARY">Stationary Heavy Foundational</option>
                  <option value="TRACK_MOUNTED">Track-Mounted High Mobility</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-industrial-400 mb-1.5">
                  Minimum Capacity: {minCapacity > 0 ? `${minCapacity} TPH` : 'Any'}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(parseInt(e.target.value, 10))}
                  className="w-full accent-brand-yellow cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-industrial-500 mt-1">
                  <span>0 TPH</span>
                  <span>500 TPH</span>
                  <span>1000+ TPH</span>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => {
                    setMinCapacity(0);
                    setSelectedMobility('ALL');
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-industrial-800 hover:bg-industrial-700 text-industrial-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter Tabs with Live Hit Counts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-industrial-800/80 no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            const count = categoryCounts[tab.id];
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition border ${
                  isActive
                    ? 'bg-brand-yellow text-industrial-950 border-brand-yellow shadow-gold-glow'
                    : 'bg-industrial-900 text-industrial-300 border-industrial-800 hover:border-industrial-700 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-industrial-950' : 'text-brand-yellow'}`} />
                <span>{tab.label}</span>
                {query.trim() && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-industrial-950 text-brand-yellow' : 'bg-industrial-800 text-industrial-400'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Search Results Display */}
        <div>
          {/* Query State: Blank */}
          {!query.trim() && (
            <div className="text-center py-16 px-4 bg-industrial-900/50 border border-industrial-800 rounded-xl space-y-6">
              <div className="w-16 h-16 rounded-full bg-industrial-800 flex items-center justify-center mx-auto text-brand-yellow border border-industrial-700">
                <Search className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  Enterprise Search Ready
                </h3>
                <p className="text-sm text-industrial-400">
                  Type an equipment model (e.g. <span className="text-brand-yellow font-mono">PJC-14076</span>), rock type,
                  application, or technical document to browse verified industrial data.
                </p>
              </div>

              <div className="max-w-2xl mx-auto pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href="/finder"
                  className="p-4 rounded-lg bg-industrial-950 border border-industrial-800 hover:border-brand-yellow/50 transition text-left group"
                >
                  <Cpu className="w-5 h-5 text-brand-yellow mb-2" />
                  <div className="text-sm font-bold text-white group-hover:text-brand-yellow transition">
                    Machine Finder
                  </div>
                  <p className="text-xs text-industrial-400 mt-1">Rule-based rock flowsheet sizing wizard</p>
                </Link>

                <Link
                  href="/products/compare"
                  className="p-4 rounded-lg bg-industrial-950 border border-industrial-800 hover:border-brand-yellow/50 transition text-left group"
                >
                  <Layers className="w-5 h-5 text-brand-yellow mb-2" />
                  <div className="text-sm font-bold text-white group-hover:text-brand-yellow transition">
                    Compare Machines
                  </div>
                  <p className="text-xs text-industrial-400 mt-1">Side-by-side engineering spec matrices</p>
                </Link>

                <Link
                  href="/downloads"
                  className="p-4 rounded-lg bg-industrial-950 border border-industrial-800 hover:border-brand-yellow/50 transition text-left group"
                >
                  <Download className="w-5 h-5 text-brand-yellow mb-2" />
                  <div className="text-sm font-bold text-white group-hover:text-brand-yellow transition">
                    Download Centre
                  </div>
                  <p className="text-xs text-industrial-400 mt-1">Brochures, datasheets, & 2D/3D CAD layouts</p>
                </Link>
              </div>
            </div>
          )}

          {/* Query State: No Results */}
          {query.trim() && searchResults.length === 0 && (
            <div className="text-center py-16 px-4 bg-industrial-900/50 border border-industrial-800 rounded-xl space-y-6">
              <div className="w-16 h-16 rounded-full bg-industrial-800 flex items-center justify-center mx-auto text-industrial-400 border border-industrial-700">
                <Search className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  No Matches Found for &ldquo;{query}&rdquo;
                </h3>
                <p className="text-sm text-industrial-400">
                  We couldn&apos;t find any records matching your search query in the{' '}
                  <span className="text-brand-yellow font-semibold">{activeCategory}</span> category.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <Button variant="outline" onClick={() => handleCategoryChange('all')}>
                  Search All Categories
                </Button>
                <Button variant="outline" onClick={() => handleQueryChange('')}>
                  Clear Query
                </Button>
                <Link href="/quote">
                  <Button variant="primary">Submit Custom Technical RFQ</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Query State: Results Found */}
          {query.trim() && searchResults.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-industrial-400 px-1">
                <span>
                  Showing <strong className="text-white font-mono">{searchResults.length}</strong> matching results for &ldquo;
                  <strong className="text-brand-yellow">{query}</strong>&rdquo;
                </span>
                <span>Sorted by Engineering Relevance</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl bg-industrial-900 border border-industrial-800 hover:border-brand-yellow/60 transition group relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    <div className="space-y-2.5 max-w-4xl">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.badge && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[10px] uppercase tracking-wider text-industrial-500 font-mono">
                          Category: {item.category}
                        </span>
                      </div>

                      <div>
                        <Link href={item.url} className="group-hover:text-brand-yellow transition">
                          <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-yellow transition">
                            {highlightMatch(item.title, query)}
                          </h3>
                        </Link>
                        {item.subtitle && (
                          <p className="text-xs text-industrial-400 mt-0.5 font-medium">
                            {highlightMatch(item.subtitle, query)}
                          </p>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-industrial-300 leading-relaxed">
                        {highlightMatch(item.snippet, query)}
                      </p>

                      {/* Technical Specs Pills */}
                      {item.specs && Object.keys(item.specs).length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-industrial-400">
                          {item.specs.capacity && (
                            <span className="bg-industrial-950 px-2.5 py-1 rounded border border-industrial-800 flex items-center gap-1">
                              <Zap className="w-3 h-3 text-brand-yellow" /> Cap: {item.specs.capacity}
                            </span>
                          )}
                          {item.specs.power && (
                            <span className="bg-industrial-950 px-2.5 py-1 rounded border border-industrial-800 flex items-center gap-1">
                              <Cpu className="w-3 h-3 text-brand-yellow" /> Power: {item.specs.power}
                            </span>
                          )}
                          {item.specs.feedSize && (
                            <span className="bg-industrial-950 px-2.5 py-1 rounded border border-industrial-800 flex items-center gap-1">
                              <Layers className="w-3 h-3 text-brand-yellow" /> Feed: {item.specs.feedSize}
                            </span>
                          )}
                          {item.specs.location && (
                            <span className="bg-industrial-950 px-2.5 py-1 rounded border border-industrial-800 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-brand-yellow" /> {item.specs.location}
                            </span>
                          )}
                          {item.specs.format && (
                            <span className="bg-industrial-950 px-2.5 py-1 rounded border border-industrial-800 flex items-center gap-1">
                              <Download className="w-3 h-3 text-brand-yellow" /> {item.specs.format}
                            </span>
                          )}
                          {item.specs.material && (
                            <span className="bg-industrial-950 px-2.5 py-1 rounded border border-industrial-800 flex items-center gap-1">
                              <Tag className="w-3 h-3 text-brand-yellow" /> {item.specs.material}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Link Button */}
                    <div className="shrink-0 flex items-center gap-2 md:self-center">
                      <Link
                        href={item.url}
                        className="btn-brand-primary text-xs uppercase tracking-wider py-2.5 px-4 flex items-center gap-1.5 whitespace-nowrap shadow-gold-glow"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GlobalSearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-industrial-950 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-industrial-400 uppercase tracking-widest font-mono">
              Loading Puzzolana Enterprise Search...
            </p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
