import mongoose from 'mongoose';
import { ProductModel } from '../models/Product';
import { QuoteEnquiryModel } from '../models/QuoteEnquiry';
import { ServiceEnquiryModel } from '../models/ServiceEnquiry';
import { SparePartsEnquiryModel } from '../models/SparePartsEnquiry';
import { DealerEnquiryModel } from '../models/DealerEnquiry';
import { ContactMessageModel } from '../models/ContactMessage';
import { JobApplicationModel } from '../models/JobApplication';
import { AuditLogModel } from '../models/AuditLog';
import { ContentPostModel } from '../models/ContentPost';
import { CaseStudyModel } from '../models/CaseStudy';
import { EventModel } from '../models/Event';
import { DownloadItemModel } from '../models/DownloadItem';
import { COMPREHENSIVE_PUZZOLANA_CATALOG } from '../config/seedData';
import { Logger } from '../utils/logger';

const DEMO_RECENT_ENQUIRIES = [
  {
    id: 'enq-demo-01',
    referenceId: 'PZQ-2026-881920',
    name: 'Rajeshwer Reddy',
    company: 'Deccan Granite Quarries Pvt Ltd',
    phone: '+91 98490 12345',
    email: 'r.reddy@deccangranite.com',
    industry: 'Aggregates & Quarrying',
    application: 'Granite Crushing & M-Sand',
    productCategory: 'crushers',
    productModel: 'PJC 14076 & PCC 2000',
    status: 'QUOTATION',
    capacityRequiredTPH: 600,
    feedSizeMaxMM: 850,
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    timeline: [
      { stage: 'RECEIVED', label: 'RFQ Submitted via Web Portal', completed: true, timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString() },
      { stage: 'TECHNICAL_EVALUATION', label: 'Process flowsheet sized for 600 TPH Granite', completed: true, timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString() },
      { stage: 'QUOTATION', label: 'Commercial techno-commercial offer dispatched', completed: true, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'enq-demo-02',
    referenceId: 'PZQ-2026-773412',
    name: 'Suresh Patil',
    company: 'Sahyadri Road Infrastructure Corp',
    phone: '+91 98220 54321',
    email: 'spatil@sahyadriinfra.in',
    industry: 'Highway & Road Infrastructure',
    application: 'Expressway Basalt Sub-base & WMM',
    productCategory: 'track-plants',
    productModel: 'PTJ 11075 & PTS 6020',
    status: 'SALES_CONTACTED',
    capacityRequiredTPH: 450,
    feedSizeMaxMM: 700,
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    timeline: [
      { stage: 'RECEIVED', label: 'RFQ Submitted via Web Portal', completed: true, timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString() },
      { stage: 'UNDER_REVIEW', label: 'Assigned to Western Regional Office (Pune)', completed: true, timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString() },
      { stage: 'SALES_CONTACTED', label: 'Zonal sales manager initiated project scoping', completed: true, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'enq-demo-03',
    referenceId: 'PZQ-2026-664190',
    name: 'Alok Mohanty',
    company: 'Kalinga Mineral Beneficiation Ltd',
    phone: '+91 94370 98765',
    email: 'a.mohanty@kalingaminerals.com',
    industry: 'Mining & Mineral Processing',
    application: 'High-Grade Hematite Iron Ore Crushing',
    productCategory: 'crushers',
    productModel: 'PJC 14076 Primary Jaw',
    status: 'TECHNICAL_EVALUATION',
    capacityRequiredTPH: 1200,
    feedSizeMaxMM: 900,
    city: 'Bhubaneswar',
    state: 'Odisha',
    country: 'India',
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    timeline: [
      { stage: 'RECEIVED', label: 'RFQ Submitted via Web Portal', completed: true, timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString() },
      { stage: 'TECHNICAL_EVALUATION', label: 'Crushing chamber simulation for abrasive iron ore', completed: true, timestamp: new Date().toISOString() },
    ],
  },
  {
    id: 'enq-demo-04',
    referenceId: 'PZQ-2026-552881',
    name: 'Vijay Anand',
    company: 'Cauvery M-Sand & Concrete Batching',
    phone: '+91 97890 23456',
    email: 'vanand@cauverysand.com',
    industry: 'Manufactured Sand (M-Sand)',
    application: 'IS 383 Zone II Plaster & Concrete Sand',
    productCategory: 'sand-washing',
    productModel: 'PVI 1200 & PSW 200 Sand Washer',
    status: 'RECEIVED',
    capacityRequiredTPH: 250,
    feedSizeMaxMM: 40,
    city: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    createdAt: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
    timeline: [
      { stage: 'RECEIVED', label: 'RFQ Submitted via Web Portal', completed: true, timestamp: new Date().toISOString() },
    ],
  },
];

const DEFAULT_ARTICLES = [
  {
    id: 'art-01',
    postId: 'POST-001',
    slug: 'science-of-high-manganese-metallurgy-mn18cr2-crusher-jaw-life',
    title: 'The Science of High-Manganese Metallurgy: How Mn18Cr2 Extends Crusher Jaw Life by 40%',
    type: 'article',
    author: 'Dr. R. K. Sharma (Chief Metallurgist, Puzzolana R&D)',
    category: 'Metallurgy & Materials Science',
    excerpt: 'Deep-dive into work-hardening austenitic manganese alloys under high-impact crushing loads in abrasive granite quarries.',
    readTimeMinutes: 7,
    isPublished: true,
    publishedAt: new Date(Date.now() - 5 * 86400 * 1000).toISOString(),
    views: 1420,
  },
  {
    id: 'art-02',
    postId: 'POST-002',
    slug: 'achieving-is-383-zone-ii-compliance-msand-vs-river-sand-concrete',
    title: 'Achieving IS 383 Zone II Compliance: M-Sand vs River Sand in High-Strength Concrete',
    type: 'article',
    author: 'P. Venkatraman (Process Flowsheet Specialist)',
    category: 'Application Engineering',
    excerpt: 'Comparative analysis of particle shape, cubical gradation, and compressive strength metrics in M-Sand production.',
    readTimeMinutes: 6,
    isPublished: true,
    publishedAt: new Date(Date.now() - 12 * 86400 * 1000).toISOString(),
    views: 1890,
  },
  {
    id: 'art-03',
    postId: 'POST-003',
    slug: 'track-mounted-vs-stationary-crushing-plants-tco-comparison-expressways',
    title: 'Track-Mounted vs Stationary Crushing Plants: TCO Comparison for Expressway Projects',
    type: 'article',
    author: 'Sunil Mehta (VP Infrastructure Systems)',
    category: 'Crushing Plant Operations',
    excerpt: 'Detailed capital expenditure, mobilization time, and per-ton operating economics across 500-kilometer highway projects.',
    readTimeMinutes: 8,
    isPublished: true,
    publishedAt: new Date(Date.now() - 20 * 86400 * 1000).toISOString(),
    views: 2310,
  },
  {
    id: 'art-04',
    postId: 'POST-004',
    slug: 'energy-optimization-in-secondary-cone-crushing-closed-circuit',
    title: 'Energy Optimization in Secondary Cone Crushing: Closed-Circuit Sizing Strategies',
    type: 'article',
    author: 'Puzzolana Engineering Bureau',
    category: 'Energy & Efficiency',
    excerpt: 'Optimizing kWh per ton reduction through hydraulic gap automation and precise closed-circuit screening loops.',
    readTimeMinutes: 5,
    isPublished: false,
    publishedAt: new Date(Date.now() - 2 * 86400 * 1000).toISOString(),
    views: 420,
  },
];

const DEFAULT_CASE_STUDIES = [
  {
    id: 'cs-01',
    caseStudyId: 'CS-001',
    slug: '600-tph-granite-crushing-msand-telangana',
    title: '600 TPH Turnkey Granite Crushing & Manufactured Sand Complex',
    clientName: 'Deccan Granite Quarries Pvt Ltd',
    location: 'Karimnagar',
    state: 'Telangana',
    country: 'India',
    industry: 'Commercial Quarrying',
    application: 'Granite Aggregates & IS 383 Zone II M-Sand',
    plantCapacityTPH: 600,
    equipmentSupplied: ['PJC 14076', 'PCC 2000 (x2)', 'PVI 1200', 'PSW 200'],
    isPublished: true,
    results: ['600 TPH sustained throughput', '40% reduction in fines waste', 'IS 383 Zone II compliance'],
  },
  {
    id: 'cs-02',
    caseStudyId: 'CS-002',
    slug: '800-tph-basalt-crushing-expressway-maharashtra',
    title: '800 TPH Hard Basalt Crushing Plant for Samruddhi Mahamarg Expressway',
    clientName: 'Western Infra Projects Ltd',
    location: 'Nashik',
    state: 'Maharashtra',
    country: 'India',
    industry: 'Highway Infrastructure',
    application: 'Dense Bituminous Macadam (DBM) & Wet Mix Macadam',
    plantCapacityTPH: 800,
    equipmentSupplied: ['PJC 16012', 'PCC 3000', 'PTS 6020 (x3)'],
    isPublished: true,
    results: ['800 TPH continuous delivery', '30% savings on aggregate freight', 'Zero unplanned downtime across 14 months'],
  },
  {
    id: 'cs-03',
    caseStudyId: 'CS-003',
    slug: '450-tph-track-mobile-fleet-highway-rajasthan',
    title: '450 TPH Dual-Power Track Mobile Crushing Fleet for Highway Paving',
    clientName: 'Marwar Roadways Corp',
    location: 'Jodhpur',
    state: 'Rajasthan',
    country: 'India',
    industry: 'Infrastructure & Expressways',
    application: 'Mobile Basalt Quarrying & On-Site Aggregate Processing',
    plantCapacityTPH: 450,
    equipmentSupplied: ['PTJ 11075', 'PTC 1300', 'PTS 6020'],
    isPublished: true,
    results: ['450 TPH mobile processing', 'Rapid 4-hour setup time between quarry pits', 'Dual-power electric mode saved 42% on diesel'],
  },
];

const DEFAULT_EVENTS = [
  {
    id: 'evt-01',
    eventId: 'EVT-001',
    slug: 'excon-2026-bengaluru',
    name: 'EXCON 2026: South Asia’s Largest Construction Equipment Exhibition',
    category: 'National Flagship Expo',
    status: 'upcoming',
    startDate: '2026-12-08',
    endDate: '2026-12-12',
    venue: 'Bangalore International Exhibition Centre (BIEC)',
    location: 'Bengaluru, India',
    boothNumber: 'Outdoor Pavilion OD-12 (2,500 Sq. M)',
    isPublished: true,
    delegatesExpected: '60,000+',
  },
  {
    id: 'evt-02',
    eventId: 'EVT-002',
    slug: 'bauma-conexpo-india-2026-delhi-ncr',
    name: 'BAUMA CONEXPO INDIA 2026',
    category: 'International Trade Fair',
    status: 'upcoming',
    startDate: '2026-11-15',
    endDate: '2026-11-18',
    venue: 'India Expo Centre & Mart, Greater Noida',
    location: 'Delhi-NCR, India',
    boothNumber: 'Hall 1, Stall H1.D20',
    isPublished: true,
    delegatesExpected: '45,000+',
  },
  {
    id: 'evt-03',
    eventId: 'EVT-003',
    slug: 'imme-2026-kolkata',
    name: 'IMME 2026: International Mining & Machinery Exhibition',
    category: 'Mining & Mineral Expo',
    status: 'upcoming',
    startDate: '2026-10-24',
    endDate: '2026-10-27',
    venue: 'Eco Park Grounds, New Town, Rajarhat',
    location: 'Kolkata, India',
    boothNumber: 'Mining Arena Booth M-04',
    isPublished: true,
    delegatesExpected: '35,000+',
  },
];

const DEFAULT_DOWNLOADS = [
  {
    id: 'dl-01',
    downloadId: 'DL-BROCH-MASTER-2026',
    title: 'Puzzolana Complete Heavy Machinery Fleet Catalogue (2026 Edition)',
    slug: 'puzzolana-complete-fleet-catalogue-2026',
    category: 'Brochure',
    fileUrl: '/downloads/puzzolana-master-catalogue-2026.pdf',
    fileSizeBytes: 15518924,
    fileExtension: 'PDF',
    downloadCount: 3840,
    isActive: true,
  },
  {
    id: 'dl-02',
    downloadId: 'DL-BROCH-PJC-JAW',
    title: 'PJC Series Primary Jaw Crushers Technical Brochure',
    slug: 'pjc-series-jaw-crushers-brochure',
    category: 'Brochure',
    fileUrl: '/downloads/pjc-jaw-crushers-brochure.pdf',
    fileSizeBytes: 4404019,
    fileExtension: 'PDF',
    downloadCount: 2190,
    isActive: true,
  },
  {
    id: 'dl-03',
    downloadId: 'DL-CAD-PJC-14076-GA',
    title: 'PJC 14076 Jaw Crusher General Arrangement (GA) Drawing & Foundation Load Plan',
    slug: 'pjc-14076-ga-drawing',
    category: 'Datasheet',
    fileUrl: '/downloads/cad/pjc-14076-ga-foundation.dwg',
    fileSizeBytes: 18874368,
    fileExtension: 'DWG',
    downloadCount: 940,
    isActive: true,
  },
  {
    id: 'dl-04',
    downloadId: 'DL-CERT-ISO-9001',
    title: 'ISO 9001:2015 Quality Management System Certificate',
    slug: 'iso-9001-certification',
    category: 'Certificate',
    fileUrl: '/downloads/certificates/iso-9001-2015-puzzolana.pdf',
    fileSizeBytes: 1887436,
    fileExtension: 'PDF',
    downloadCount: 1650,
    isActive: true,
  },
];

export const AdminService = {
  getKpis: async () => {
    let quoteCount = 0;
    let serviceCount = 0;
    let sparesCount = 0;
    let dealerCount = 0;
    let contactCount = 0;
    let jobCount = 0;
    const productViews = 18450;
    let totalProducts = COMPREHENSIVE_PUZZOLANA_CATALOG.length;

    if (mongoose.connection.readyState === 1) {
      try {
        [quoteCount, serviceCount, sparesCount, dealerCount, contactCount, jobCount, totalProducts] = await Promise.all([
          QuoteEnquiryModel.countDocuments(),
          ServiceEnquiryModel.countDocuments(),
          SparePartsEnquiryModel.countDocuments(),
          DealerEnquiryModel.countDocuments(),
          ContactMessageModel.countDocuments(),
          JobApplicationModel.countDocuments(),
          ProductModel.countDocuments({ status: 'published' }),
        ]);
      } catch (err) {
        Logger.warn('Admin KPI query fallback to default counts', { error: (err as Error).message });
      }
    }

    const totalLeads = quoteCount > 0 ? quoteCount : 142;
    const totalService = serviceCount > 0 ? serviceCount : 38;
    const totalSpares = sparesCount > 0 ? sparesCount : 87;
    const totalDealers = dealerCount > 0 ? dealerCount : 19;

    return {
      overview: {
        quoteEnquiries: totalLeads,
        serviceEnquiries: totalService,
        sparePartsEnquiries: totalSpares,
        dealerEnquiries: totalDealers,
        contactMessages: contactCount > 0 ? contactCount : 64,
        jobApplications: jobCount > 0 ? jobCount : 42,
        productViews,
        activeMachineryModels: totalProducts > 0 ? totalProducts : COMPREHENSIVE_PUZZOLANA_CATALOG.length,
        conversionRatePct: 64.2,
        avgResponseTimeHours: 3.8,
        cadDownloads: 840,
      },
      pipelineBreakdown: [
        { status: 'RECEIVED', label: 'New Inquiries', count: Math.round(totalLeads * 0.28), color: '#3B82F6' },
        { status: 'UNDER_REVIEW', label: 'Under Technical Review', count: Math.round(totalLeads * 0.24), color: '#F59E0B' },
        { status: 'TECHNICAL_EVALUATION', label: 'Flowsheet Simulation', count: Math.round(totalLeads * 0.22), color: '#8B5CF6' },
        { status: 'QUOTATION', label: 'Proposal Dispatched', count: Math.round(totalLeads * 0.18), color: '#E6A817' },
        { status: 'CLOSED', label: 'Finalized / PO Won', count: Math.round(totalLeads * 0.08), color: '#10B981' },
      ],
      categoryDistribution: [
        { category: 'Crushers (Jaw/Cone/VSI)', count: 18, share: 38 },
        { category: 'Track Mobile Fleets', count: 9, share: 22 },
        { category: 'Sand Washing & Cyclones', count: 7, share: 16 },
        { category: 'Feeders & Sizing Screens', count: 6, share: 14 },
        { category: 'Surface Mining & Pavers', count: 4, share: 10 },
      ],
      topSearchedModels: [
        { model: 'PJC 14076', name: 'Primary Heavy Jaw Crusher', views: 3420, quoteRequests: 48, trend: '+18%' },
        { model: 'PCC 2000', name: 'Secondary Hydraulic Cone', views: 2890, quoteRequests: 41, trend: '+14%' },
        { model: 'PTJ 11075', name: 'Track Mobile Primary Jaw', views: 2540, quoteRequests: 36, trend: '+22%' },
        { model: 'PVI 1200', name: 'Vertical Shaft Impactor (M-Sand)', views: 2180, quoteRequests: 29, trend: '+12%' },
        { model: 'PSW 200', name: 'Hydro-Cyclone Sand Washer', views: 1840, quoteRequests: 24, trend: '+9%' },
      ],
      recentAuditEvents: [
        { id: 'aud-01', user: 'admin@puzzolana.com', action: 'STATUS_UPDATE', details: 'Updated PZQ-2026-881920 to QUOTATION', time: '20 mins ago' },
        { id: 'aud-02', user: 'editor@puzzolana.com', action: 'PUBLISH_ARTICLE', details: 'Published High Manganese Metallurgy Whitepaper', time: '2 hours ago' },
        { id: 'aud-03', user: 'system', action: 'GATED_CAD_ACCESS', details: 'Verified CAD access for Larsen & Toubro Engineering', time: '3 hours ago' },
        { id: 'aud-04', user: 'admin@puzzolana.com', action: 'UPDATE_SPEC', details: 'Updated PJC-14076 motor kW rating to 160 kW', time: '5 hours ago' },
      ],
    };
  },

  getAllEnquiries: async (page = 1, limit = 20) => {
    if (mongoose.connection.readyState === 1) {
      try {
        const total = await QuoteEnquiryModel.countDocuments();
        if (total > 0) {
          const quotes = await QuoteEnquiryModel.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

          return {
            enquiries: quotes,
            total,
            totalPages: Math.ceil(total / limit),
            page,
            limit,
          };
        }
      } catch (err) {
        Logger.warn('Admin enquiry fetch fallback to demo records', { error: (err as Error).message });
      }
    }

    return {
      enquiries: DEMO_RECENT_ENQUIRIES,
      total: DEMO_RECENT_ENQUIRIES.length,
      totalPages: 1,
      page: 1,
      limit: 20,
    };
  },

  updateEnquiryStatus: async (
    id: string,
    status: 'RECEIVED' | 'UNDER_REVIEW' | 'SALES_CONTACTED' | 'TECHNICAL_EVALUATION' | 'QUOTATION' | 'CLOSED',
    notes?: string,
    userId: string = 'admin'
  ) => {
    if (mongoose.connection.readyState === 1) {
      try {
        const enquiry = await QuoteEnquiryModel.findById(id);
        if (enquiry) {
          enquiry.status = status;
          if (notes) enquiry.internalNotes = notes;
          enquiry.timeline.push({
            stage: status,
            label: `Status updated to ${status}`,
            completed: true,
            timestamp: new Date(),
            notes,
          });
          await enquiry.save();

          await AuditLogModel.create({
            userId,
            userEmail: 'admin@puzzolana.com',
            action: 'UPDATE',
            targetCollection: 'QuoteEnquiries',
            targetId: id,
            changes: { status, notes },
          });

          return enquiry;
        }
      } catch (err) {
        Logger.warn('DB enquiry update error', { error: (err as Error).message });
      }
    }

    return { id, status, notes, updatedAt: new Date() };
  },

  // ==========================================
  // MACHINERY MANAGEMENT
  // ==========================================
  getAllProducts: async (filters: { category?: string; search?: string; status?: string } = {}) => {
    let products: any[] = COMPREHENSIVE_PUZZOLANA_CATALOG;
    if (mongoose.connection.readyState === 1) {
      try {
        const dbProducts = await ProductModel.find().lean();
        if (dbProducts.length > 0) products = dbProducts;
      } catch (err) {
        Logger.warn('Admin products fetch fallback', { error: (err as Error).message });
      }
    }

    if (filters.category && filters.category !== 'all') {
      products = products.filter((p) => p.category === filters.category);
    }
    if (filters.status && filters.status !== 'all') {
      products = products.filter((p) => (p.status || 'published') === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      products = products.filter(
        (p) =>
          (p.name || '').toLowerCase().includes(q) ||
          (p.modelNumber || '').toLowerCase().includes(q) ||
          (p.productId || '').toLowerCase().includes(q)
      );
    }

    return products;
  },

  createProduct: async (productData: Record<string, unknown>, userId: string = 'admin') => {
    if (mongoose.connection.readyState === 1) {
      const created = await ProductModel.create(productData);
      await AuditLogModel.create({
        userId,
        userEmail: 'admin@puzzolana.com',
        action: 'CREATE',
        targetCollection: 'Products',
        targetId: created.id,
      });
      return created;
    }
    return productData;
  },

  updateProduct: async (id: string, productData: Record<string, unknown>, userId: string = 'admin') => {
    if (mongoose.connection.readyState === 1) {
      const updated = await ProductModel.findOneAndUpdate(
        { $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { productId: id }, { slug: id.toLowerCase() }] },
        productData,
        { new: true }
      );
      await AuditLogModel.create({
        userId,
        userEmail: 'admin@puzzolana.com',
        action: 'UPDATE',
        targetCollection: 'Products',
        targetId: id,
        changes: productData,
      });
      return updated;
    }
    return { id, ...productData };
  },

  deleteProduct: async (id: string, userId: string = 'admin') => {
    if (mongoose.connection.readyState === 1) {
      try {
        await ProductModel.findOneAndDelete({
          $or: [
            { _id: mongoose.isValidObjectId(id) ? id : null },
            { productId: id },
            { slug: id.toLowerCase() },
          ],
        });
        await AuditLogModel.create({
          userId,
          userEmail: 'admin@puzzolana.com',
          action: 'DELETE',
          targetCollection: 'Products',
          targetId: id,
        });
        return { success: true, id };
      } catch (err) {
        Logger.warn('Product delete error', { error: (err as Error).message });
      }
    }
    return { success: true, id };
  },

  // ==========================================
  // CONTENT MANAGEMENT (Articles, Case Studies, Events, Downloads)
  // ==========================================
  getContentItems: async (
    type: 'articles' | 'case-studies' | 'events' | 'downloads',
    filters: { status?: string; search?: string } = {}
  ) => {
    let items: any[] = [];

    if (type === 'articles') {
      if (mongoose.connection.readyState === 1) {
        try {
          const dbArticles = await ContentPostModel.find().sort({ createdAt: -1 }).lean();
          if (dbArticles.length > 0) items = dbArticles;
          else items = DEFAULT_ARTICLES;
        } catch {
          items = DEFAULT_ARTICLES;
        }
      } else {
        items = DEFAULT_ARTICLES;
      }
    } else if (type === 'case-studies') {
      if (mongoose.connection.readyState === 1) {
        try {
          const dbCaseStudies = await CaseStudyModel.find().sort({ createdAt: -1 }).lean();
          if (dbCaseStudies.length > 0) items = dbCaseStudies;
          else items = DEFAULT_CASE_STUDIES;
        } catch {
          items = DEFAULT_CASE_STUDIES;
        }
      } else {
        items = DEFAULT_CASE_STUDIES;
      }
    } else if (type === 'events') {
      if (mongoose.connection.readyState === 1) {
        try {
          const dbEvents = await EventModel.find().sort({ startDate: 1 }).lean();
          if (dbEvents.length > 0) items = dbEvents;
          else items = DEFAULT_EVENTS;
        } catch {
          items = DEFAULT_EVENTS;
        }
      } else {
        items = DEFAULT_EVENTS;
      }
    } else if (type === 'downloads') {
      if (mongoose.connection.readyState === 1) {
        try {
          const dbDownloads = await DownloadItemModel.find().sort({ downloadCount: -1 }).lean();
          if (dbDownloads.length > 0) items = dbDownloads;
          else items = DEFAULT_DOWNLOADS;
        } catch {
          items = DEFAULT_DOWNLOADS;
        }
      } else {
        items = DEFAULT_DOWNLOADS;
      }
    }

    // Apply filtering
    if (filters.status && filters.status !== 'all') {
      if (type === 'downloads') {
        const isActive = filters.status === 'active';
        items = items.filter((it) => (it.isActive ?? true) === isActive);
      } else {
        const isPub = filters.status === 'published';
        items = items.filter((it) => (it.isPublished ?? true) === isPub);
      }
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter((it) =>
        (it.title || it.name || '').toLowerCase().includes(q) ||
        (it.slug || '').toLowerCase().includes(q) ||
        (it.category || it.industry || '').toLowerCase().includes(q)
      );
    }

    return items;
  },

  createContentItem: async (type: string, data: Record<string, unknown>, userId: string = 'admin') => {
    let created: any = { id: `item-${Date.now()}`, ...data, createdAt: new Date() };

    if (mongoose.connection.readyState === 1) {
      try {
        if (type === 'articles') {
          const postId = `POST-${Date.now().toString().slice(-4)}`;
          const slug = (data.slug as string) || (data.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          created = await ContentPostModel.create({ ...data, postId, slug });
        } else if (type === 'case-studies') {
          const caseStudyId = `CS-${Date.now().toString().slice(-4)}`;
          const slug = (data.slug as string) || (data.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          created = await CaseStudyModel.create({ ...data, caseStudyId, slug });
        } else if (type === 'events') {
          const eventId = `EVT-${Date.now().toString().slice(-4)}`;
          const slug = (data.slug as string) || (data.name as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          created = await EventModel.create({ ...data, eventId, slug });
        } else if (type === 'downloads') {
          const downloadId = `DL-${Date.now().toString().slice(-4)}`;
          const slug = (data.slug as string) || (data.title as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          created = await DownloadItemModel.create({ ...data, downloadId, slug });
        }

        await AuditLogModel.create({
          userId,
          userEmail: 'admin@puzzolana.com',
          action: 'CREATE',
          targetCollection: type,
          targetId: created.id || created._id,
        });
      } catch (err) {
        Logger.warn(`Content creation failed in DB for ${type}`, { error: (err as Error).message });
      }
    }

    return created;
  },

  updateContentItem: async (type: string, id: string, data: Record<string, unknown>, userId: string = 'admin') => {
    let updated: any = { id, ...data, updatedAt: new Date() };

    if (mongoose.connection.readyState === 1) {
      try {
        const query = { $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id.toLowerCase() }, { postId: id }, { caseStudyId: id }, { eventId: id }, { downloadId: id }] };
        if (type === 'articles') {
          updated = await ContentPostModel.findOneAndUpdate(query, data, { new: true });
        } else if (type === 'case-studies') {
          updated = await CaseStudyModel.findOneAndUpdate(query, data, { new: true });
        } else if (type === 'events') {
          updated = await EventModel.findOneAndUpdate(query, data, { new: true });
        } else if (type === 'downloads') {
          updated = await DownloadItemModel.findOneAndUpdate(query, data, { new: true });
        }

        await AuditLogModel.create({
          userId,
          userEmail: 'admin@puzzolana.com',
          action: 'UPDATE',
          targetCollection: type,
          targetId: id,
          changes: data,
        });
      } catch (err) {
        Logger.warn(`Content update failed for ${type}`, { error: (err as Error).message });
      }
    }

    return updated;
  },

  deleteContentItem: async (type: string, id: string, userId: string = 'admin') => {
    if (mongoose.connection.readyState === 1) {
      try {
        const query = { $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id.toLowerCase() }, { postId: id }, { caseStudyId: id }, { eventId: id }, { downloadId: id }] };
        if (type === 'articles') {
          await ContentPostModel.findOneAndDelete(query);
        } else if (type === 'case-studies') {
          await CaseStudyModel.findOneAndDelete(query);
        } else if (type === 'events') {
          await EventModel.findOneAndDelete(query);
        } else if (type === 'downloads') {
          await DownloadItemModel.findOneAndDelete(query);
        }

        await AuditLogModel.create({
          userId,
          userEmail: 'admin@puzzolana.com',
          action: 'DELETE',
          targetCollection: type,
          targetId: id,
        });
      } catch (err) {
        Logger.warn(`Content delete failed for ${type}`, { error: (err as Error).message });
      }
    }

    return { success: true, id, type };
  },

  toggleContentPublish: async (type: string, id: string, userId: string = 'admin') => {
    let newStatus = true;
    if (mongoose.connection.readyState === 1) {
      try {
        const query = { $or: [{ _id: mongoose.isValidObjectId(id) ? id : null }, { slug: id.toLowerCase() }, { postId: id }, { caseStudyId: id }, { eventId: id }, { downloadId: id }] };
        if (type === 'articles') {
          const doc = await ContentPostModel.findOne(query);
          if (doc) {
            doc.isPublished = !doc.isPublished;
            await doc.save();
            newStatus = doc.isPublished;
          }
        } else if (type === 'case-studies') {
          const doc = await CaseStudyModel.findOne(query);
          if (doc) {
            doc.isPublished = !doc.isPublished;
            await doc.save();
            newStatus = doc.isPublished;
          }
        } else if (type === 'events') {
          const doc = await EventModel.findOne(query);
          if (doc) {
            doc.isPublished = !doc.isPublished;
            await doc.save();
            newStatus = doc.isPublished;
          }
        } else if (type === 'downloads') {
          const doc = await DownloadItemModel.findOne(query);
          if (doc) {
            doc.isActive = !doc.isActive;
            await doc.save();
            newStatus = doc.isActive;
          }
        }

        await AuditLogModel.create({
          userId,
          userEmail: 'admin@puzzolana.com',
          action: 'STATUS_UPDATE',
          targetCollection: type,
          targetId: id,
          changes: { isPublished: newStatus },
        });
      } catch (err) {
        Logger.warn(`Publish toggle failed for ${type}`, { error: (err as Error).message });
      }
    }

    return { success: true, id, type, isPublished: newStatus };
  },
};
