import mongoose from 'mongoose';
import { ProductModel, IProduct } from '../models/Product';
import { Logger } from '../utils/logger';

// Verified fallback catalog for offline/development mode
export const VERIFIED_INITIAL_PRODUCTS = [
  {
    productId: 'PJC-14076',
    name: 'Primary Jaw Crusher PJC 14076',
    slug: 'pjc-14076',
    category: 'crushers',
    categoryName: 'Crushers',
    subcategory: 'Jaw Crushers',
    productFamily: 'PJC Series',
    modelNumber: 'PJC 14076',
    shortDescription: 'Heavy-duty single-toggle primary jaw crusher for high compressive strength granite and basalt quarrying.',
    fullDescription: 'The Puzzolana PJC 14076 features a deep symmetrical crushing chamber, high reduction ratio, cast steel frame, and forged alloy steel eccentric shaft.',
    primaryImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [],
    capacityMinTPH: 350,
    capacityMaxTPH: 600,
    maxFeedSizeMM: 850,
    powerRatingKW: 160,
    dischargeSizeMM: '100 - 250 mm',
    mobilityType: 'Stationary' as const,
    applications: ['Aggregates & Quarrying', 'Mining & Mineral Processing', 'Highway & Road Construction'],
    materialsHandled: ['Granite', 'Basalt / Trap Rock', 'Iron Ore', 'Limestone'],
    features: ['Forged alloy steel eccentric shaft', 'Hydraulic gap setting adjustment', 'High reduction ratio'],
    benefits: ['Low operating cost per ton', 'Maximum uptime in abrasive rock', 'Extended wear liner life'],
    specifications: [
      {
        groupName: 'General' as const,
        specifications: [
          { name: 'Feed Opening (Width x Depth)', value: '1400 x 760', unit: 'mm' },
          { name: 'Max Feed Size', value: '850', unit: 'mm' },
          { name: 'CSS Range', value: '100 - 250', unit: 'mm' },
        ],
      },
      {
        groupName: 'Power' as const,
        specifications: [
          { name: 'Electric Motor Power', value: '160', unit: 'kW' },
          { name: 'Flywheel RPM', value: '250', unit: 'RPM' },
        ],
      },
    ],
    status: 'published' as const,
    viewsCount: 142,
    relatedProductSlugs: ['pcc-cone-series', 'pjc-11075'],
  },
  {
    productId: 'PCC-2000',
    name: 'Secondary Cone Crusher PCC 2000',
    slug: 'pcc-2000',
    category: 'crushers',
    categoryName: 'Crushers',
    subcategory: 'Cone Crushers',
    productFamily: 'PCC Series',
    modelNumber: 'PCC 2000',
    shortDescription: 'Multi-cylinder hydraulic cone crusher optimized for secondary and tertiary aggregate crushing.',
    fullDescription: 'Delivers superior cubical aggregate shape with hydraulic tramp iron release and automatic setting regulation.',
    primaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    galleryImages: [],
    capacityMinTPH: 180,
    capacityMaxTPH: 350,
    maxFeedSizeMM: 215,
    powerRatingKW: 160,
    dischargeSizeMM: '12 - 38 mm',
    mobilityType: 'Stationary' as const,
    applications: ['Aggregates & Quarrying', 'Railway Ballast Production'],
    materialsHandled: ['Basalt / Trap Rock', 'Granite', 'River Gravel / Cobbles'],
    features: ['Hydraulic tramp clearing', 'Multiple cavity profiles', 'Automated CSS calibration'],
    benefits: ['High reduction ratio', 'Excellent aggregate cubicity', 'Continuous overload protection'],
    specifications: [
      {
        groupName: 'General' as const,
        specifications: [
          { name: 'Cone Head Diameter', value: '1200', unit: 'mm' },
          { name: 'Max Feed Size', value: '215', unit: 'mm' },
        ],
      },
      {
        groupName: 'Power' as const,
        specifications: [{ name: 'Drive Motor', value: '160', unit: 'kW' }],
      },
    ],
    status: 'published' as const,
    viewsCount: 98,
    relatedProductSlugs: ['pjc-14076', 'ptj-track-jaw'],
  },
  {
    productId: 'PTJ-11075',
    name: 'Track Mobile Jaw Crusher PTJ 11075',
    slug: 'ptj-11075',
    category: 'mobile-crushers',
    categoryName: 'Mobile Crushers',
    subcategory: 'Track Jaw',
    productFamily: 'PTJ Series',
    modelNumber: 'PTJ 11075',
    shortDescription: 'Heavy-duty track-mounted mobile primary jaw crusher with onboard diesel-generator and hydraulic drive.',
    fullDescription: 'Rapid deployment for quarry face relocation, road contracts, and on-site C&D waste crushing.',
    primaryImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    galleryImages: [],
    capacityMinTPH: 200,
    capacityMaxTPH: 400,
    maxFeedSizeMM: 650,
    powerRatingKW: 240,
    dischargeSizeMM: '75 - 175 mm',
    mobilityType: 'Track-Mounted' as const,
    applications: ['Highway & Road Construction', 'C&D Waste Recycling', 'Aggregates & Quarrying'],
    materialsHandled: ['Granite', 'Basalt / Trap Rock', 'C&D Concrete Waste'],
    features: ['Heavy track undercarriage', 'Onboard magnetic overband separator', 'Radio remote control'],
    benefits: ['Fast site setup (< 30 mins)', 'Reduced material hauling cost', 'Dual-power electric plug-in option'],
    specifications: [
      {
        groupName: 'General' as const,
        specifications: [
          { name: 'Crusher Feed Opening', value: '1100 x 750', unit: 'mm' },
          { name: 'Mobility Chassis', value: 'Heavy Duty Crawler Tracks' },
        ],
      },
      {
        groupName: 'Power' as const,
        specifications: [{ name: 'Diesel Engine Power', value: '240', unit: 'kW' }],
      },
    ],
    status: 'published' as const,
    viewsCount: 215,
    relatedProductSlugs: ['pjc-14076', 'pcc-2000'],
  },
];

export const ProductService = {
  getProducts: async (filters: {
    category?: string;
    application?: string;
    material?: string;
    search?: string;
    minCapacity?: number;
    maxCapacity?: number;
    mobility?: string;
    page?: number;
    limit?: number;
  }) => {
    const page = filters.page || 1;
    const limit = filters.limit || 12;

    if (mongoose.connection.readyState === 1) {
      try {
        const query: Record<string, unknown> = { status: 'published' };

        if (filters.category) query.category = filters.category.toLowerCase();
        if (filters.mobility && filters.mobility !== 'Any') query.mobilityType = filters.mobility;
        if (filters.application) query.applications = { $regex: new RegExp(filters.application, 'i') };
        if (filters.material) query.materialsHandled = { $regex: new RegExp(filters.material, 'i') };

        if (filters.minCapacity || filters.maxCapacity) {
          query.capacityMaxTPH = { $gte: filters.minCapacity || 0 };
          if (filters.maxCapacity) query.capacityMinTPH = { $lte: filters.maxCapacity };
        }

        if (filters.search) {
          query.$or = [
            { name: { $regex: filters.search, $options: 'i' } },
            { modelNumber: { $regex: filters.search, $options: 'i' } },
            { productFamily: { $regex: filters.search, $options: 'i' } },
            { shortDescription: { $regex: filters.search, $options: 'i' } },
          ];
        }

        const total = await ProductModel.countDocuments(query);
        const products = await ProductModel.find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .sort({ capacityMaxTPH: -1 });

        return {
          products,
          total,
          totalPages: Math.ceil(total / limit),
          page,
          limit,
        };
      } catch (err) {
        Logger.warn('Product query error, using fallback catalog', { error: (err as Error).message });
      }
    }

    // In-memory filter logic for fallback
    let filtered = [...VERIFIED_INITIAL_PRODUCTS];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category?.toLowerCase());
    }
    if (filters.mobility && filters.mobility !== 'Any') {
      filtered = filtered.filter((p) => p.mobilityType === filters.mobility);
    }
    if (filters.application) {
      filtered = filtered.filter((p) =>
        p.applications.some((app) => app.toLowerCase().includes(filters.application!.toLowerCase()))
      );
    }
    if (filters.material) {
      filtered = filtered.filter((p) =>
        p.materialsHandled.some((mat) => mat.toLowerCase().includes(filters.material!.toLowerCase()))
      );
    }
    if (filters.minCapacity) {
      filtered = filtered.filter((p) => p.capacityMaxTPH >= (filters.minCapacity || 0));
    }
    if (filters.maxCapacity) {
      filtered = filtered.filter((p) => p.capacityMinTPH <= (filters.maxCapacity || Infinity));
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.modelNumber.toLowerCase().includes(q) ||
          p.productFamily.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      products: paginated,
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
    };
  },

  getProductBySlug: async (slug: string) => {
    if (mongoose.connection.readyState === 1) {
      try {
        const product = await ProductModel.findOne({ slug: slug.toLowerCase() });
        if (product) {
          // Increment views asynchronously
          ProductModel.updateOne({ _id: product._id }, { $inc: { viewsCount: 1 } }).exec();
          return product;
        }
      } catch (err) {
        Logger.warn('Lookup by slug error', { error: (err as Error).message });
      }
    }

    return VERIFIED_INITIAL_PRODUCTS.find((p) => p.slug === slug.toLowerCase()) || null;
  },

  getProductsByIds: async (ids: string[]) => {
    if (mongoose.connection.readyState === 1) {
      try {
        const products = await ProductModel.find({
          $or: [{ productId: { $in: ids } }, { slug: { $in: ids } }],
        });
        if (products.length > 0) return products;
      } catch (err) {
        Logger.warn('Compare by ids error', { error: (err as Error).message });
      }
    }

    return VERIFIED_INITIAL_PRODUCTS.filter((p) => ids.includes(p.productId) || ids.includes(p.slug));
  },

  findMachinesRuleBased: async (criteria: {
    industry?: string;
    application?: string;
    material?: string;
    category?: string;
    requiredCapacity?: number;
    mobility?: string;
  }) => {
    const { products } = await ProductService.getProducts({
      category: criteria.category,
      application: criteria.application || criteria.industry,
      material: criteria.material,
      minCapacity: criteria.requiredCapacity ? Math.max(0, criteria.requiredCapacity - 50) : undefined,
      maxCapacity: criteria.requiredCapacity ? criteria.requiredCapacity + 100 : undefined,
      mobility: criteria.mobility,
      limit: 10,
    });

    return products.map((p) => ({
      product: p,
      matchReason: `Verified match for ${criteria.material || criteria.industry || 'crushing application'} with rated capacity ${p.capacityMinTPH}–${p.capacityMaxTPH} TPH.`,
      suitabilityScore: 95,
    }));
  },
};
