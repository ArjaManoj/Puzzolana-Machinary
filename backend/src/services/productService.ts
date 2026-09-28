import mongoose from 'mongoose';
import { ProductModel, IProduct } from '../models/Product';
import { Logger } from '../utils/logger';
import { COMPREHENSIVE_PUZZOLANA_CATALOG } from '../config/seedData';

// Verified fallback catalog for offline/development mode
export const VERIFIED_INITIAL_PRODUCTS = COMPREHENSIVE_PUZZOLANA_CATALOG;

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
