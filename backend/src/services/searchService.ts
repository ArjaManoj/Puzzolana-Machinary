import mongoose from 'mongoose';
import { ProductModel } from '../models/Product';
import { ContentPostModel } from '../models/ContentPost';
import { CaseStudyModel } from '../models/CaseStudy';
import { ApplicationDomainModel } from '../models/Application';
import { DownloadItemModel } from '../models/DownloadItem';
import { LocationModel } from '../models/Location';
import { COMPREHENSIVE_PUZZOLANA_CATALOG } from '../config/seedData';
import { VERIFIED_APPLICATIONS, VERIFIED_LOCATIONS } from './contentService';
import { Logger } from '../utils/logger';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'products' | 'applications' | 'case-studies' | 'articles' | 'downloads' | 'spares' | 'dealers';
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

export interface SearchFilterOptions {
  category?: 'all' | 'products' | 'applications' | 'case-studies' | 'articles' | 'downloads' | 'spares' | 'dealers';
  minCapacity?: number;
  maxCapacity?: number;
  mobility?: 'STATIONARY' | 'TRACK_MOUNTED' | 'WHEEL_MOUNTED';
  limit?: number;
}

export interface SearchResponsePayload {
  query: string;
  totalHits: number;
  categoryCounts: {
    all: number;
    products: number;
    applications: number;
    'case-studies': number;
    articles: number;
    downloads: number;
    spares: number;
    dealers: number;
  };
  results: SearchResultItem[];
  suggestedKeywords: string[];
}

// Verified Mock Collections for Static/Offline Resilience
const VERIFIED_SPARE_PARTS_SEARCH = [
  {
    id: 'sp-jaw-dies',
    title: 'High Manganese (Mn18Cr2) Jaw Crusher Dies & Cheek Plates',
    subtitle: 'OEM Wear Liners for PJC-14076, PJC-11075, PJC-9060',
    category: 'spares' as const,
    url: '/spare-parts',
    snippet: 'Precision austenitic manganese steel alloy casting with 18% Mn and 2% Cr for extreme impact resistance and work-hardening up to 550 HBW.',
    badge: 'Cast Alloy Wear Parts',
    specs: { material: 'Mn18Cr2 Austenitic Steel', feedSize: 'Up to 900mm Feed' },
    keywords: ['jaw', 'dies', 'cheek plates', 'mn18cr2', 'pjc', 'crusher liner', 'manganese'],
  },
  {
    id: 'sp-cone-mantle',
    title: 'PCC Cone Crusher Mantles & Concave Ring Liners',
    subtitle: 'Crushing Chambers for PCC-2000, PCC-1500, PCC-1200',
    category: 'spares' as const,
    url: '/spare-parts',
    snippet: 'Optimized high-manganese profile cavity liners designed for maximum secondary and tertiary reduction with uniform wear distribution.',
    badge: 'Cone Cavity Spares',
    specs: { material: 'Mn22Cr2 High-Life', capacity: '120-650 TPH' },
    keywords: ['mantle', 'concave', 'pcc', 'cone', 'liner', 'bowl liner', 'crushing ring'],
  },
  {
    id: 'sp-vsi-rotor-tips',
    title: 'Tungsten Carbide VSI Rotor Tips & Cavity Wear Plates',
    subtitle: 'Centrifugal Rock-on-Rock Impactor Parts for PVI-1200, PVI-900',
    category: 'spares' as const,
    url: '/spare-parts',
    snippet: 'High-density premium tungsten carbide tips with braze-joint integrity for ultra-high velocity aggregate shaping and M-sand generation.',
    badge: 'VSI Sand Making',
    specs: { material: 'Tungsten Carbide Cobalt', capacity: '100-350 TPH' },
    keywords: ['vsi', 'rotor', 'carbide', 'tips', 'pvi', 'm-sand', 'impactor'],
  },
  {
    id: 'sp-screen-mesh',
    title: 'Heavy-Duty Modular Polyurethane & High-Tensile Wire Screen Meshes',
    subtitle: 'Direct Fit for PVS-2460, PVS-2050, PVS-1845 Inclined Screens',
    category: 'spares' as const,
    url: '/spare-parts',
    snippet: 'Abrasion-resistant high-open-area grading media ensuring IS 383 Zone II aggregate compliance and zero blinding in wet screening.',
    badge: 'Grading Media',
    specs: { material: 'Polyurethane / Spring Steel', capacity: 'Up to 800 TPH' },
    keywords: ['screen', 'mesh', 'polyurethane', 'pvs', 'wire cloth', 'grading', 'deck'],
  },
];

const VERIFIED_CASE_STUDIES_SEARCH = [
  {
    id: 'cs-granite-telangana',
    title: '600 TPH Hard Granite Crushing & IS 383 Zone II M-Sand Plant',
    subtitle: 'Client: Apex Infra Minerals • Hyderabad, Telangana',
    category: 'case-studies' as const,
    url: '/case-studies/600-tph-granite-crushing-msand-telangana',
    snippet: 'Integrated 4-stage stationary plant featuring PJC-14076 primary jaw, dual PCC-2000 secondary cones, PVI-1200 VSI shaping crusher, and PSW-200 hydro-cyclone washer.',
    badge: 'Stationary Mega Plant',
    specs: { capacity: '600 TPH', location: 'Telangana, India', material: 'Hard Granite (240 MPa)' },
    keywords: ['granite', 'telangana', 'm-sand', 'pjc-14076', 'pcc-2000', 'pvi-1200', '600 tph'],
  },
  {
    id: 'cs-basalt-maharashtra',
    title: '800 TPH High-Capacity Basalt Crushing for Samruddhi Mahamarg Expressway',
    subtitle: 'Client: Mega Infra Concessions • Pune / Nashik Corridor, Maharashtra',
    category: 'case-studies' as const,
    url: '/case-studies/800-tph-basalt-crushing-expressway-maharashtra',
    snippet: 'Heavy-duty primary jaw crusher with heavy grizzly feeder and twin hydraulic cone crushers producing continuous GSB, WMM, and concrete aggregates.',
    badge: 'Expressway Infrastructure',
    specs: { capacity: '800 TPH', location: 'Maharashtra, India', material: 'Deccan Trap Basalt' },
    keywords: ['basalt', 'maharashtra', 'expressway', 'highway', '800 tph', 'pcc-2000', 'gsb'],
  },
  {
    id: 'cs-track-rajasthan',
    title: '450 TPH Rapid-Deployment Track Mobile Crushing Fleet',
    subtitle: 'Client: National Highway Infra Partners • Jaipur-Jodhpur Highway, Rajasthan',
    category: 'case-studies' as const,
    url: '/case-studies/450-tph-track-mobile-fleet-highway-rajasthan',
    snippet: 'Fully track-mounted mobile fleet comprising PTJ-1100 track jaw, PTC-300 track cone, and PTS-6020 double-deck mobile screen commissioned in 72 hours.',
    badge: 'Track Mobile Fleet',
    specs: { capacity: '450 TPH', location: 'Rajasthan, India', material: 'Quartzite & Sandstone' },
    keywords: ['track', 'mobile', 'rajasthan', 'ptj-1100', 'ptc-300', '450 tph', 'highway'],
  },
  {
    id: 'cs-iron-ore-odisha',
    title: '1,200 TPH Heavy Run-of-Mine Iron Ore Sizing & Beneficiation Plant',
    subtitle: 'Client: Eastern Mining Consortium • Barbil / Joda Sector, Odisha',
    category: 'case-studies' as const,
    url: '/case-studies/1200-tph-iron-ore-sizing-odisha',
    snippet: 'High-reduction primary jaw and heavy vibrating feeder breakers handling abrasive iron ore hematite boulders with zero choke downtime.',
    badge: 'Mining & Beneficiation',
    specs: { capacity: '1200 TPH', location: 'Odisha, India', material: 'Hematite Iron Ore (64% Fe)' },
    keywords: ['iron ore', 'mining', 'odisha', 'barbil', '1200 tph', 'hematite', 'sizing'],
  },
];

const VERIFIED_ARTICLES_SEARCH = [
  {
    id: 'art-metallurgy-mn18cr2',
    title: 'The Science of High-Manganese Metallurgy: Mn18Cr2 vs Standard Mn13 Crusher Jaw Dies',
    subtitle: 'Author: Dr. K. R. Sharma, Chief Metallurgical Engineer',
    category: 'articles' as const,
    url: '/news/science-of-high-manganese-metallurgy-mn18cr2-crusher-jaw-life',
    snippet: 'Comparative analysis of work-hardening dynamics in high-manganese austenitic steel under heavy abrasive granite impact. Demonstrates 40% extended wear life.',
    badge: 'Technical Whitepaper',
    specs: { material: 'Mn18Cr2 / Mn22Cr2 Metallurgy', location: 'Foundry R&D' },
    keywords: ['metallurgy', 'manganese', 'mn18cr2', 'jaw dies', 'wear life', 'austenite', 'hardness'],
  },
  {
    id: 'art-msand-is383',
    title: 'Achieving IS 383 Zone II Compliance: Engineered M-Sand vs Depleting River Sand',
    subtitle: 'Author: P. Venkatesh, VP Process Engineering',
    category: 'articles' as const,
    url: '/news/achieving-is-383-zone-ii-compliance-msand-vs-river-sand-concrete',
    snippet: 'Comprehensive guide to particle shape optimization using tertiary VSI rock-on-rock impactors and cyclone de-watering classifiers to meet IS 383:2016 standards.',
    badge: 'Process Engineering',
    specs: { material: 'Manufactured Plaster & Concrete Sand', location: 'Concrete Technology' },
    keywords: ['m-sand', 'is 383', 'river sand', 'vsi', 'cyclone', 'concrete', 'aggregates'],
  },
  {
    id: 'art-track-vs-stationary-tco',
    title: 'Track-Mounted vs Stationary Crushing Plants: Comprehensive 5-Year TCO Analysis',
    subtitle: 'Author: S. Chidambaram, Director of Applications',
    category: 'articles' as const,
    url: '/news/track-mounted-vs-stationary-crushing-plants-tco-comparison-expressways',
    snippet: 'Evaluating capital expenditure, civil foundation costs, diesel vs electric utility economics, and relocatability in fast-track infrastructure packages.',
    badge: 'Financial & Capex Analysis',
    specs: { capacity: '200-600 TPH', location: 'Infrastructure Strategy' },
    keywords: ['track mounted', 'stationary', 'tco', 'capex', 'diesel electric', 'expressway', 'crushing'],
  },
  {
    id: 'art-slag-recycling',
    title: 'Blast Furnace & Steel Slag Beneficiation: Sustainable Secondary Aggregate Generation',
    subtitle: 'Author: Puzzolana Green Foundry & Mineral Extraction Group',
    category: 'articles' as const,
    url: '/news/blast-furnace-steel-slag-recycling-sustainable-aggregate-beneficiation',
    snippet: 'Recovering high-grade metallics from LD slag and converting inert non-metallic fraction into road base WMM aggregates with heavy impact crushers.',
    badge: 'ESG & Circular Economy',
    specs: { material: 'LD Steel & Blast Furnace Slag', location: 'Mineral Processing' },
    keywords: ['slag', 'recycling', 'steel', 'blast furnace', 'circular economy', 'sustainability', 'wmm'],
  },
];

const VERIFIED_DOWNLOADS_SEARCH = [
  {
    id: 'dl-pjc-datasheet',
    title: 'PJC Series Primary Jaw Crushers — Technical Datasheet & Specification Guide',
    subtitle: 'Brochure & Spec Sheet • Revision 2026.1 • 4.2 MB PDF',
    category: 'downloads' as const,
    url: '/downloads',
    snippet: 'Complete technical dimensional matrices, feed opening sizes, power requirements, and closed side setting (CSS) capacity curves for PJC-14076, PJC-11075, PJC-9060.',
    badge: 'Technical Datasheet',
    specs: { format: 'PDF (4.2 MB)', capacity: '150 - 900 TPH' },
    keywords: ['datasheet', 'pjc', 'jaw crusher', 'dimensions', 'specifications', 'download', 'pdf'],
  },
  {
    id: 'dl-pcc-cad-layout',
    title: 'PCC-2000 Secondary Cone Crusher — General Arrangement (GA) 2D/3D CAD Layout',
    subtitle: 'Gated CAD Asset • DWG / STEP / PDF • 18.5 MB',
    category: 'downloads' as const,
    url: '/downloads',
    snippet: 'Certified engineering CAD drawings with anchor bolt coordinates, static/dynamic load data, chute interfaces, and motor mount geometry for structural engineering.',
    badge: 'Gated CAD Drawing',
    specs: { format: 'DWG / STEP / PDF', capacity: '600 TPH' },
    keywords: ['cad', 'dwg', 'step', 'pcc-2000', 'general arrangement', 'ga drawing', 'cone', 'layout'],
  },
  {
    id: 'dl-msand-brochure',
    title: 'Turnkey M-Sand & Washing Systems — Complete Engineering Solutions Catalogue',
    subtitle: 'Corporate Brochure • Revision 2026.2 • 8.6 MB PDF',
    category: 'downloads' as const,
    url: '/downloads',
    snippet: 'Comprehensive process flowsheets, hydro-cyclone classification loops, sand washing water recovery systems, and dry air classification layouts.',
    badge: 'Product Catalogue',
    specs: { format: 'PDF (8.6 MB)', capacity: '100 - 400 TPH' },
    keywords: ['m-sand', 'brochure', 'washing', 'vsi', 'sand plant', 'hydro-cyclone', 'catalogue'],
  },
];

const POPULAR_SEARCH_KEYWORDS = [
  'PJC-14076 Jaw Crusher',
  'PCC-2000 Cone Crusher',
  'PVI-1200 VSI Impactor',
  'PTJ-1100 Track Mobile Crusher',
  '600 TPH Granite Plant',
  'IS 383 Zone II M-Sand',
  'Mn18Cr2 Jaw Dies',
  'Basalt Crushing Flowsheet',
  'CAD Layout Drawings',
  'PSW Sand Washer',
  'Surface Miner',
  'Feeder Breaker',
];

export const SearchService = {
  // Comprehensive Unified Search across all Enterprise Domains
  searchAll: async (queryStr: string, options: SearchFilterOptions = {}): Promise<SearchResponsePayload> => {
    const q = queryStr.trim().toLowerCase();
    const limit = options.limit || 50;
    const requestedCategory = options.category || 'all';

    if (!q) {
      return {
        query: '',
        totalHits: 0,
        categoryCounts: {
          all: 0,
          products: 0,
          applications: 0,
          'case-studies': 0,
          articles: 0,
          downloads: 0,
          spares: 0,
          dealers: 0,
        },
        results: [],
        suggestedKeywords: POPULAR_SEARCH_KEYWORDS.slice(0, 8),
      };
    }

    const normalize = (str: string) => (str || '').toLowerCase().replace(/[-_\s]+/g, '');
    const normQ = normalize(q);
    const tokens = q.split(/[\s\-_]+/).filter(Boolean).map((t) => t.toLowerCase());
    const results: SearchResultItem[] = [];

    // Helper: calculate relevance score
    const calculateScore = (title: string, code: string, desc: string, tags: string[] = []): number => {
      let score = 0;
      const lowerTitle = (title || '').toLowerCase();
      const lowerCode = (code || '').toLowerCase();
      const lowerDesc = (desc || '').toLowerCase();
      const normTitle = normalize(title);
      const normCode = normalize(code);

      // Exact normalized code match bonus (e.g. pjc14076 === pjc14076)
      if (normCode === normQ || normTitle === normQ) {
        score += 150;
      } else if (normCode.includes(normQ) || normTitle.includes(normQ)) {
        score += 90;
      } else if (lowerCode.includes(q) || lowerTitle.includes(q)) {
        score += 60;
      }

      // Token matching
      tokens.forEach((t) => {
        if (!t) return;
        if (normCode.includes(t)) score += 35;
        if (lowerTitle.includes(t)) score += 25;
        if (lowerDesc.includes(t)) score += 10;
        if (tags.some((tag) => tag && tag.toLowerCase().includes(t))) score += 15;
      });

      return score;
    };

    // 1. Search Machinery Products
    let rawProducts = COMPREHENSIVE_PUZZOLANA_CATALOG;
    if (mongoose.connection.readyState === 1) {
      try {
        const dbProducts = await ProductModel.find({ status: 'published' }).lean();
        if (dbProducts.length > 0) rawProducts = dbProducts as any;
      } catch (err) {
        Logger.warn('Product DB search fallback to memory seed', { error: (err as Error).message });
      }
    }

    (rawProducts as any[]).forEach((p: any) => {
      const tags = [
        ...(p.applications || []),
        ...(p.materialsHandled || []),
        p.productFamily,
        p.category,
        p.subcategory,
        p.productId,
        p.slug,
      ];
      const codeString = `${p.productId || ''} ${p.modelNumber || ''} ${p.slug || ''}`;
      const score = calculateScore(p.name, codeString, `${p.shortDescription || ''} ${p.fullDescription || p.fullOverview || ''}`, tags);
      
      if (score > 0) {
        const mobility = p.mobility || (p.mobilityType === 'Stationary' ? 'STATIONARY' : p.mobilityType === 'Track' || p.mobilityType === 'Track-Mounted' ? 'TRACK_MOUNTED' : 'WHEEL_MOUNTED');
        // Mobility check if specified
        if (options.mobility && mobility !== options.mobility) return;
        // Capacity check if specified
        if (options.minCapacity && p.capacityMaxTPH < options.minCapacity) return;
        if (options.maxCapacity && p.capacityMinTPH > options.maxCapacity) return;

        const power = p.motorPowerKW || p.powerRatingKW || 0;
        const feed = p.maxFeedSizeMM ? `Max ${p.maxFeedSizeMM} mm` : 'Variable Feed';

        results.push({
          id: `prod-${p.productId || p.modelNumber || p.slug}`,
          title: `${p.modelNumber || p.productId} — ${p.name}`,
          subtitle: `${p.productFamily || p.categoryName || 'Crushing Equipment'} • ${p.capacityMinTPH}-${p.capacityMaxTPH} TPH • ${power} kW`,
          category: 'products',
          url: `/products/${p.category}/${p.slug}`,
          snippet: p.shortDescription || (p.fullDescription || p.fullOverview || '').slice(0, 160) || '',
          badge: mobility === 'TRACK_MOUNTED' ? 'Track Mobile' : 'Stationary Plant',
          specs: {
            capacity: `${p.capacityMinTPH}-${p.capacityMaxTPH} TPH`,
            power: power > 0 ? `${power} kW` : undefined,
            feedSize: feed,
          },
          score: score + 10, // Boost for primary machinery catalog
        });
      }
    });

    // 2. Search Applications & Flowsheets
    VERIFIED_APPLICATIONS.forEach((app) => {
      const score = calculateScore(app.title, app.applicationId, `${app.shortDescription} ${app.fullOverview}`, app.challenges || []);
      if (score > 0) {
        results.push({
          id: `app-${app.applicationId}`,
          title: app.title,
          subtitle: app.subtitle,
          category: 'applications',
          url: `/applications/${app.slug}`,
          snippet: app.shortDescription,
          badge: 'Flowsheet Solution',
          specs: {
            material: 'Aggregates, Ore & Minerals',
          },
          score,
        });
      }
    });

    // 3. Search Case Studies
    VERIFIED_CASE_STUDIES_SEARCH.forEach((cs) => {
      const score = calculateScore(cs.title, cs.id, cs.snippet, cs.keywords);
      if (score > 0) {
        results.push({
          id: cs.id,
          title: cs.title,
          subtitle: cs.subtitle,
          category: 'case-studies',
          url: cs.url,
          snippet: cs.snippet,
          badge: cs.badge,
          specs: cs.specs,
          score,
        });
      }
    });

    // 4. Search Technical Articles & Whitepapers
    VERIFIED_ARTICLES_SEARCH.forEach((art) => {
      const score = calculateScore(art.title, art.id, art.snippet, art.keywords);
      if (score > 0) {
        results.push({
          id: art.id,
          title: art.title,
          subtitle: art.subtitle,
          category: 'articles',
          url: art.url,
          snippet: art.snippet,
          badge: art.badge,
          specs: art.specs,
          score,
        });
      }
    });

    // 5. Search Downloadable Technical Assets & CADs
    VERIFIED_DOWNLOADS_SEARCH.forEach((dl) => {
      const score = calculateScore(dl.title, dl.id, dl.snippet, dl.keywords);
      if (score > 0) {
        results.push({
          id: dl.id,
          title: dl.title,
          subtitle: dl.subtitle,
          category: 'downloads',
          url: dl.url,
          snippet: dl.snippet,
          badge: dl.badge,
          specs: dl.specs,
          score,
        });
      }
    });

    // 6. Search Spare Parts & Wear Liners
    VERIFIED_SPARE_PARTS_SEARCH.forEach((sp) => {
      const score = calculateScore(sp.title, sp.id, sp.snippet, sp.keywords);
      if (score > 0) {
        results.push({
          id: sp.id,
          title: sp.title,
          subtitle: sp.subtitle,
          category: 'spares',
          url: sp.url,
          snippet: sp.snippet,
          badge: sp.badge,
          specs: sp.specs,
          score,
        });
      }
    });

    // 7. Search Locations & Dealers
    VERIFIED_LOCATIONS.forEach((loc) => {
      const score = calculateScore(loc.title, loc.locationId, `${loc.address} ${loc.city} ${loc.state} ${loc.country}`, [loc.city, loc.state, loc.type]);
      if (score > 0) {
        results.push({
          id: `loc-${loc.locationId}`,
          title: `${loc.title} (${loc.city}, ${loc.state})`,
          subtitle: `${loc.address}, ${loc.postalCode} • Ph: ${loc.phone}`,
          category: 'dealers',
          url: '/contact',
          snippet: `Official Puzzolana ${loc.type.replace(/_/g, ' ')} facility with dedicated technical sales and spare parts support desk.`,
          badge: loc.type === 'HEAD_OFFICE' ? 'Headquarters' : 'Manufacturing Plant',
          specs: {
            location: `${loc.city}, ${loc.country}`,
          },
          score,
        });
      }
    });

    // Count hits across all categories before filtering
    const categoryCounts = {
      all: results.length,
      products: results.filter((r) => r.category === 'products').length,
      applications: results.filter((r) => r.category === 'applications').length,
      'case-studies': results.filter((r) => r.category === 'case-studies').length,
      articles: results.filter((r) => r.category === 'articles').length,
      downloads: results.filter((r) => r.category === 'downloads').length,
      spares: results.filter((r) => r.category === 'spares').length,
      dealers: results.filter((r) => r.category === 'dealers').length,
    };

    // Filter by requested category
    let filteredResults = results;
    if (requestedCategory !== 'all') {
      filteredResults = results.filter((r) => r.category === requestedCategory);
    }

    // Sort by relevance score descending
    filteredResults.sort((a, b) => b.score - a.score);

    // Dynamic suggested keywords matching query or defaults
    const matchingKeywords = POPULAR_SEARCH_KEYWORDS.filter(
      (kw) => kw.toLowerCase().includes(q) || tokens.some((t) => kw.toLowerCase().includes(t))
    );
    const suggestedKeywords = Array.from(new Set([...matchingKeywords, ...POPULAR_SEARCH_KEYWORDS])).slice(0, 6);

    return {
      query: queryStr,
      totalHits: filteredResults.length,
      categoryCounts,
      results: filteredResults.slice(0, limit),
      suggestedKeywords,
    };
  },

  // Instant typeahead suggestions for Search Bar / Command Palette
  getSuggestions: (queryStr: string, limit = 6) => {
    const q = queryStr.trim().toLowerCase();
    if (!q) {
      return {
        popularKeywords: POPULAR_SEARCH_KEYWORDS.slice(0, 6),
        recommendedProducts: (COMPREHENSIVE_PUZZOLANA_CATALOG as any[]).slice(0, 4).map((p: any) => ({
          modelNumber: p.modelNumber,
          name: p.name,
          category: p.category,
          slug: p.slug,
          capacityMaxTPH: p.capacityMaxTPH,
        })),
      };
    }

    const matchedKeywords = POPULAR_SEARCH_KEYWORDS.filter((kw) => kw.toLowerCase().includes(q)).slice(0, limit);
    const matchedProducts = (COMPREHENSIVE_PUZZOLANA_CATALOG as any[]).filter(
      (p: any) =>
        p.modelNumber.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    ).slice(0, limit).map((p: any) => ({
      modelNumber: p.modelNumber,
      name: p.name,
      category: p.category,
      slug: p.slug,
      capacityMaxTPH: p.capacityMaxTPH,
    }));

    return {
      keywords: matchedKeywords,
      products: matchedProducts,
    };
  },
};
