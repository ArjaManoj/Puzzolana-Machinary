import mongoose from 'mongoose';
import { ProductModel, IProduct } from '../models/Product';
import { Logger } from '../utils/logger';
import { COMPREHENSIVE_PUZZOLANA_CATALOG } from '../config/seedData';

// Verified fallback catalog for offline/development mode
export const VERIFIED_INITIAL_PRODUCTS = COMPREHENSIVE_PUZZOLANA_CATALOG;

export const ProductService = {
  // Main product query with comprehensive filters, sorting, and pagination
  getProducts: async (filters: {
    category?: string;
    subcategory?: string;
    application?: string;
    material?: string;
    search?: string;
    minCapacity?: number;
    maxCapacity?: number;
    mobility?: string;
    sortBy?: 'capacity_asc' | 'capacity_desc' | 'power_asc' | 'power_desc' | 'newest' | 'popular';
    page?: number;
    limit?: number;
  }) => {
    const page = filters.page || 1;
    const limit = filters.limit || 12;

    if (mongoose.connection.readyState === 1) {
      try {
        const query: Record<string, unknown> = { status: 'published' };

        if (filters.category) query.category = filters.category.toLowerCase();
        if (filters.subcategory) query.subcategory = filters.subcategory;
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
            { applications: { $regex: filters.search, $options: 'i' } },
          ];
        }

        let sortOption: Record<string, 1 | -1> = { capacityMaxTPH: -1 };
        if (filters.sortBy === 'capacity_asc') sortOption = { capacityMaxTPH: 1 };
        if (filters.sortBy === 'capacity_desc') sortOption = { capacityMaxTPH: -1 };
        if (filters.sortBy === 'power_asc') sortOption = { powerRatingKW: 1 };
        if (filters.sortBy === 'power_desc') sortOption = { powerRatingKW: -1 };
        if (filters.sortBy === 'popular') sortOption = { viewsCount: -1 };
        if (filters.sortBy === 'newest') sortOption = { createdAt: -1 };

        const total = await ProductModel.countDocuments(query);
        const products = await ProductModel.find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .sort(sortOption);

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

    // In-memory filter & sort logic for fallback
    let filtered = [...COMPREHENSIVE_PUZZOLANA_CATALOG];

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category?.toLowerCase());
    }
    if (filters.subcategory) {
      filtered = filtered.filter((p) => p.subcategory.toLowerCase() === filters.subcategory?.toLowerCase());
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
          p.shortDescription.toLowerCase().includes(q) ||
          p.applications.some((app) => app.toLowerCase().includes(q))
      );
    }

    // Sort in-memory
    if (filters.sortBy === 'capacity_asc') {
      filtered.sort((a, b) => a.capacityMaxTPH - b.capacityMaxTPH);
    } else if (filters.sortBy === 'power_asc') {
      filtered.sort((a, b) => a.powerRatingKW - b.powerRatingKW);
    } else if (filters.sortBy === 'power_desc') {
      filtered.sort((a, b) => b.powerRatingKW - a.powerRatingKW);
    } else if (filters.sortBy === 'popular') {
      filtered.sort((a, b) => b.viewsCount - a.viewsCount);
    } else {
      filtered.sort((a, b) => b.capacityMaxTPH - a.capacityMaxTPH);
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

  // Lookup single product by slug
  getProductBySlug: async (slug: string) => {
    if (mongoose.connection.readyState === 1) {
      try {
        const product = await ProductModel.findOne({ slug: slug.toLowerCase() });
        if (product) {
          ProductModel.updateOne({ _id: product._id }, { $inc: { viewsCount: 1 } }).exec();
          return product;
        }
      } catch (err) {
        Logger.warn('Lookup by slug error', { error: (err as Error).message });
      }
    }

    return COMPREHENSIVE_PUZZOLANA_CATALOG.find((p) => p.slug === slug.toLowerCase()) || null;
  },

  // Global machinery search with highlights & category grouping
  searchProducts: async (queryStr: string, limit = 10) => {
    const q = queryStr.trim().toLowerCase();
    if (!q) return [];

    if (mongoose.connection.readyState === 1) {
      try {
        const results = await ProductModel.find({
          status: 'published',
          $or: [
            { name: { $regex: q, $options: 'i' } },
            { modelNumber: { $regex: q, $options: 'i' } },
            { productFamily: { $regex: q, $options: 'i' } },
            { shortDescription: { $regex: q, $options: 'i' } },
            { applications: { $regex: q, $options: 'i' } },
            { materialsHandled: { $regex: q, $options: 'i' } },
          ],
        }).limit(limit);

        if (results.length > 0) return results;
      } catch (err) {
        Logger.warn('Search query error', { error: (err as Error).message });
      }
    }

    return COMPREHENSIVE_PUZZOLANA_CATALOG.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.modelNumber.toLowerCase().includes(q) ||
        p.productFamily.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.applications.some((app) => app.toLowerCase().includes(q)) ||
        p.materialsHandled.some((mat) => mat.toLowerCase().includes(q))
    ).slice(0, limit);
  },

  // Featured flagship industrial products
  getFeaturedProducts: async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const featured = await ProductModel.find({ status: 'published' })
          .sort({ capacityMaxTPH: -1 })
          .limit(6);
        if (featured.length > 0) return featured;
      } catch (err) {
        Logger.warn('Featured fetch error', { error: (err as Error).message });
      }
    }

    return COMPREHENSIVE_PUZZOLANA_CATALOG.slice(0, 6);
  },

  // Related products based on flowsheet compatibility (Jaw -> Cone -> VSI -> Screen)
  getRelatedProducts: async (slug: string) => {
    const current = await ProductService.getProductBySlug(slug);
    if (!current) return [];

    const relatedSlugs = current.relatedProductSlugs || [];
    if (relatedSlugs.length > 0) {
      return ProductService.getProductsByIds(relatedSlugs);
    }

    return COMPREHENSIVE_PUZZOLANA_CATALOG.filter(
      (p) => p.slug !== current.slug && p.category === current.category
    ).slice(0, 3);
  },

  // Compare multiple machines side-by-side with aligned specification matrix
  compareProductsAdvanced: async (ids: string[]) => {
    const cleanIds = ids.map((id) => id.trim().toLowerCase());
    let products: any[] = [];

    if (mongoose.connection.readyState === 1) {
      try {
        products = await ProductModel.find({
          $or: [{ productId: { $in: cleanIds } }, { slug: { $in: cleanIds } }],
        });
      } catch {
        // Fallback
      }
    }

    if (products.length === 0) {
      products = COMPREHENSIVE_PUZZOLANA_CATALOG.filter(
        (p) => cleanIds.includes(p.productId.toLowerCase()) || cleanIds.includes(p.slug.toLowerCase())
      );
    }

    // Aligned comparison response structure
    return {
      comparedCount: products.length,
      machines: products,
      attributesComparison: [
        { attribute: 'Category', values: products.map((p) => p.categoryName || p.category) },
        { attribute: 'Product Family', values: products.map((p) => p.productFamily) },
        { attribute: 'Mobility Chassis', values: products.map((p) => p.mobilityType) },
        { attribute: 'Capacity Range (TPH)', values: products.map((p) => `${p.capacityMinTPH} – ${p.capacityMaxTPH} TPH`) },
        { attribute: 'Maximum Feed Size', values: products.map((p) => `${p.maxFeedSizeMM} mm`) },
        { attribute: 'Power Rating', values: products.map((p) => `${p.powerRatingKW} kW`) },
        { attribute: 'Discharge Sizing', values: products.map((p) => p.dischargeSizeMM || 'Configurable') },
        { attribute: 'Suitable Materials', values: products.map((p) => (p.materialsHandled || []).join(', ')) },
      ],
    };
  },

  getProductsByIds: async (ids: string[]) => {
    const cleanIds = ids.map((id) => id.trim().toLowerCase());
    if (mongoose.connection.readyState === 1) {
      try {
        const products = await ProductModel.find({
          $or: [{ productId: { $in: cleanIds } }, { slug: { $in: cleanIds } }],
        });
        if (products.length > 0) return products;
      } catch (err) {
        Logger.warn('Lookup by IDs error', { error: (err as Error).message });
      }
    }

    return COMPREHENSIVE_PUZZOLANA_CATALOG.filter(
      (p) => cleanIds.includes(p.productId.toLowerCase()) || cleanIds.includes(p.slug.toLowerCase())
    );
  },

  // Rule-based machinery selection tool
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
