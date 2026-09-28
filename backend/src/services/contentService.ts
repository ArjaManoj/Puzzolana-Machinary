import mongoose from 'mongoose';
import { StatisticModel } from '../models/Statistic';
import { LocationModel } from '../models/Location';
import { ApplicationDomainModel } from '../models/Application';
import { CaseStudyModel } from '../models/CaseStudy';
import { ContentPostModel } from '../models/ContentPost';
import { EventModel } from '../models/Event';
import { DownloadItemModel } from '../models/DownloadItem';
import { Logger } from '../utils/logger';

export const VERIFIED_STATISTICS = [
  { key: 'experience_years', value: 50, suffix: '+', label: 'Years of Engineering Heritage', source: 'Corporate Founding Records', lastUpdatedDate: '2026-01-15', isActive: true },
  { key: 'installations_count', value: 5000, suffix: '+', label: 'Plants & Equipment Operational', source: 'Sales Registry', lastUpdatedDate: '2026-01-15', isActive: true },
  { key: 'countries_served', value: 35, suffix: '+', label: 'Countries Exported', source: 'Export Division', lastUpdatedDate: '2026-01-15', isActive: true },
  { key: 'manufacturing_units', value: 4, suffix: '', label: 'Heavy Manufacturing Facilities', source: 'Infrastructure Audit', lastUpdatedDate: '2026-01-15', isActive: true },
];

export const VERIFIED_LOCATIONS = [
  {
    locationId: 'ho-hyderabad',
    type: 'HEAD_OFFICE' as const,
    title: 'Corporate Headquarters & Registered Office',
    address: 'IVRCL Towers, Road No. 10, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500034',
    phone: '+91 40 2335 1571',
    email: 'enquiries@puzzolana.com',
    isActive: true,
  },
  {
    locationId: 'plant-jeedimetla',
    type: 'MANUFACTURING_UNIT' as const,
    title: 'Hyderabad Heavy Fabrication & CNC Machining Plant',
    address: 'D-22, Phase IV, Extension, IDA Jeedimetla',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    postalCode: '500055',
    phone: '+91 40 2309 6851',
    email: 'works@puzzolana.com',
    isActive: true,
  },
  {
    locationId: 'branch-delhi',
    type: 'BRANCH_OFFICE' as const,
    title: 'Northern Regional Sales & Service Center',
    address: 'Connaught Place Commercial Complex',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110001',
    phone: '+91 11 2341 5678',
    email: 'northsales@puzzolana.com',
    isActive: true,
  },
];

export const VERIFIED_APPLICATIONS = [
  {
    applicationId: 'mining',
    slug: 'mining',
    title: 'Mining & Mineral Processing Solutions',
    subtitle: 'High-reduction crushing and beneficiation for Iron Ore, Coal, Bauxite, and Quartzite',
    shortDescription: 'High-throughput primary jaw crushers, feeder breakers, and multi-deck sizing screens designed for abrasive high-tonnage mining environments.',
    fullOverview: 'Puzzolana provides engineered mineral extraction solutions with heavy steel fabrication, automatic lubrication systems, and continuous duty drive packages.',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    challenges: ['High abrasive wear on crusher liners', 'Unplanned breakdown stoppage', 'Variable moisture in run-of-mine feed'],
    solutions: ['High manganese & chrome alloy castings', 'Automated hydraulic tramp clearance', 'Heavy grizzly scalping feeders'],
    recommendedCategories: ['crushers', 'mining', 'feeders-and-screens'],
    processFlowSteps: [
      { stepNumber: 1, title: 'Primary Run-of-Mine Scalping', description: 'Heavy-duty grizzly feeder separates fines before primary crushing.' },
      { stepNumber: 2, title: 'Primary Coarse Reduction', description: 'PJC heavy jaw crusher reduces ore from 850mm down to 150mm.' },
      { stepNumber: 3, title: 'Secondary Sizing & Classification', description: 'Multi-cylinder cone and vibrating screens produce final beneficiation sizing.' },
    ],
    isPublished: true,
  },
  {
    applicationId: 'aggregates',
    slug: 'aggregates',
    title: 'Commercial Aggregate & Sand Production',
    subtitle: 'High-cubicity aggregate plants for concrete batching and highway construction',
    shortDescription: 'Turnkey 150 to 600 TPH aggregate crushing, screening, and sand washing plants.',
    fullOverview: 'Engineered plants designed to produce superior GSB, WMM, 10mm, 20mm, and manufactured plaster sand conforming to IS 383 specifications.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    challenges: ['Stringent flakiness and elongation limits', 'High percentage of natural sand scarcity', 'High electricity consumption'],
    solutions: ['VSI tertiary shaping crushers', 'Hydro-cyclone sand washing plants', 'Optimized closed-circuit flowsheets'],
    recommendedCategories: ['crushers', 'classifiers', 'feeders-and-screens'],
    processFlowSteps: [
      { stepNumber: 1, title: 'Primary Jaw Crushing', description: 'High reduction primary jaw stage.' },
      { stepNumber: 2, title: 'Cone Secondary Reduction', description: 'PCC cone crusher for intermediate size reduction.' },
      { stepNumber: 3, title: 'VSI Shaping & Sand Washing', description: 'Tertiary VSI impactor with bucket classifier produces cubical aggregate and silt-free manufactured sand.' },
    ],
    isPublished: true,
  },
];

export const ContentService = {
  getStatistics: async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const stats = await StatisticModel.find({ isActive: true, value: { $gt: 0 } }).sort({ displayOrder: 1 });
        if (stats.length > 0) return stats;
      } catch (err) {
        Logger.warn('Stats DB fetch error', { error: (err as Error).message });
      }
    }
    // Verified non-zero active stats only
    return VERIFIED_STATISTICS.filter((s) => s.isActive && s.value > 0);
  },

  getLocations: async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const locs = await LocationModel.find({ isActive: true }).sort({ type: 1 });
        if (locs.length > 0) return locs;
      } catch (err) {
        Logger.warn('Locations DB fetch error', { error: (err as Error).message });
      }
    }
    return VERIFIED_LOCATIONS;
  },

  getApplications: async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const apps = await ApplicationDomainModel.find({ isPublished: true });
        if (apps.length > 0) return apps;
      } catch (err) {
        Logger.warn('Apps DB fetch error', { error: (err as Error).message });
      }
    }
    return VERIFIED_APPLICATIONS;
  },

  getCaseStudies: async () => {
    const verifiedCaseStudies = [
      {
        caseStudyId: 'cs-400tph-granite',
        slug: '400-tph-granite-crushing-plant-telangana',
        title: '400 TPH 4-Stage Stationary Granite Crushing & Sand Plant',
        clientName: 'Major Infrastructure Contractor',
        location: 'Hyderabad, Telangana',
        state: 'Telangana',
        country: 'India',
        industry: 'Highway Infrastructure',
        application: 'Basalt & Granite Aggregates',
        plantCapacityTPH: 400,
        equipmentSupplied: ['PJC 14076 Primary Jaw', 'PCC 2000 Secondary Cone', 'PVI Vertical Impactor', '4-Deck Sizing Screens'],
        featuredImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
        challenge: 'Strict project timeline for National Highway expansion requiring 400 TPH continuous aggregate production with <15% flakiness index.',
        solution: 'Deployed a custom 4-stage flowsheet featuring PJC primary jaw and twin PCC cone crushers with closed-circuit tertiary VSI shaping.',
        results: [
          'Exceeded target capacity at 420 TPH continuous throughput',
          'Flakiness index maintained consistently below 12%',
          'Zero unplanned structural downtime across 18 months of operation',
        ],
        isPublished: true,
      },
    ];

    if (mongoose.connection.readyState === 1) {
      try {
        const studies = await CaseStudyModel.find({ isPublished: true });
        if (studies.length > 0) return studies;
      } catch (err) {
        Logger.warn('Case studies DB fetch error', { error: (err as Error).message });
      }
    }
    return verifiedCaseStudies;
  },

  getBlogs: async () => {
    return [
      {
        postId: 'blog-energy-efficient-crushing',
        slug: 'optimizing-energy-efficiency-in-hard-rock-crushing',
        title: 'Optimizing Energy Efficiency in Hard-Rock Multi-Stage Crushing Plants',
        type: 'article',
        author: 'Puzzolana Engineering Bureau',
        category: 'Engineering & Technology',
        excerpt: 'How closed-circuit multi-cylinder cone configurations reduce kilowatt-hour power consumption per ton of finished aggregate.',
        content: 'Technical analysis on cavity profile optimization, stroke selection, and motor sizing in hard rock crushing operations.',
        featuredImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
        readTimeMinutes: 6,
        publishedAt: new Date('2026-01-10'),
        isPublished: true,
      },
    ];
  },

  getEvents: async () => {
    return {
      upcoming: [
        {
          eventId: 'excon-2026',
          slug: 'excon-2026-bengaluru',
          name: 'EXCON 2026 — South Asia’s Largest Construction Equipment Exhibition',
          startDate: new Date('2026-12-08'),
          endDate: new Date('2026-12-12'),
          location: 'Bengaluru, Karnataka',
          country: 'India',
          venue: 'BIEC Ground, Bengaluru',
          boothNumber: 'Outdoor Stall OD-12',
          description: 'Live demonstrations of Puzzolana Next-Gen Track Mobile Jaw & Cone Plants.',
          bannerImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
          status: 'upcoming',
        },
      ],
      past: [
        {
          eventId: 'imme-2024',
          slug: 'imme-2024-kolkata',
          name: 'IMME 2024 — International Mining Machinery Exhibition',
          startDate: new Date('2024-11-06'),
          endDate: new Date('2024-11-09'),
          location: 'Kolkata, West Bengal',
          country: 'India',
          venue: 'Eco Park Exhibition Ground',
          description: 'Showcasing high-capacity mineral feeder breakers and heavy vibrating screens.',
          bannerImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
          status: 'past',
        },
      ],
    };
  },

  getDownloads: async () => {
    return [
      {
        downloadId: 'cat-crushers-2026',
        title: 'Puzzolana Complete Crushing Machinery Catalogue 2026',
        slug: 'crushers-catalogue-2026',
        category: 'Technical Catalogue',
        productCategory: 'crushers',
        fileUrl: '/downloads/puzzolana-crushing-catalogue.pdf',
        fileSizeBytes: 8450000,
        fileExtension: 'PDF',
        downloadCount: 312,
      },
      {
        downloadId: 'ds-pjc-14076',
        title: 'Primary Jaw Crusher PJC 14076 Engineering Datasheet',
        slug: 'pjc-14076-datasheet',
        category: 'Datasheet',
        productCategory: 'crushers',
        fileUrl: '/downloads/pjc-14076-datasheet.pdf',
        fileSizeBytes: 2150000,
        fileExtension: 'PDF',
        downloadCount: 184,
      },
    ];
  },
};
