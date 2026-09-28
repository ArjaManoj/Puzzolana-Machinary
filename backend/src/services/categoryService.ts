import mongoose from 'mongoose';
import { ProductCategoryModel } from '../models/ProductCategory';
import { Logger } from '../utils/logger';

export const VERIFIED_CATEGORIES = [
  {
    categoryId: 'crushers',
    name: 'Crushers',
    slug: 'crushers',
    shortDescription: 'Primary Jaw, Multi-Cylinder Cone, and High Performance VSI Crushers.',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    displayOrder: 1,
    isActive: true,
  },
  {
    categoryId: 'feeders-and-screens',
    name: 'Feeders & Screens',
    slug: 'feeders-and-screens',
    shortDescription: 'Vibrating Grizzly Feeders and Multi-Deck High-Frequency Aggregate Screens.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    displayOrder: 2,
    isActive: true,
  },
  {
    categoryId: 'classifiers',
    name: 'Classifiers & Washing',
    slug: 'classifiers',
    shortDescription: 'Bucket Wheel Sand Classifiers and Hydro-Cyclone Sand Washing Plants.',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    displayOrder: 3,
    isActive: true,
  },
  {
    categoryId: 'mobile-crushers',
    name: 'Mobile Crushers',
    slug: 'mobile-crushers',
    shortDescription: 'Track-Mounted Diesel/Electric Mobile Crushing and Screening Units.',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    displayOrder: 4,
    isActive: true,
  },
  {
    categoryId: 'semi-mobile',
    name: 'Semi-Mobile / Skid',
    slug: 'semi-mobile',
    shortDescription: 'Modular Wheel and Skid-Mounted Crushing Configurations for Rapid Relocation.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    displayOrder: 5,
    isActive: true,
  },
  {
    categoryId: 'mining',
    name: 'Mining Solutions',
    slug: 'mining',
    shortDescription: 'Heavy-Duty Feeder Breakers, Surface Miners, and Mineral Processing Plants.',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
    displayOrder: 6,
    isActive: true,
  },
  {
    categoryId: 'waste-processing',
    name: 'Waste Processing',
    slug: 'waste-processing',
    shortDescription: 'Construction & Demolition (C&D) Recycling and Steel Slag Processing Plants.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    displayOrder: 7,
    isActive: true,
  },
  {
    categoryId: 'road-building',
    name: 'Road Building Machinery',
    slug: 'road-building',
    shortDescription: 'Hydrostatic Sensor Pavers, Asphalt Batch Mixers, and Soil Stabilizers.',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    displayOrder: 8,
    isActive: true,
  },
];

export const CategoryService = {
  getCategories: async () => {
    if (mongoose.connection.readyState === 1) {
      try {
        const categories = await ProductCategoryModel.find({ isActive: true }).sort({ displayOrder: 1 });
        if (categories.length > 0) return categories;
      } catch (err) {
        Logger.warn('Category DB fetch error, using verified fallback', { error: (err as Error).message });
      }
    }

    return VERIFIED_CATEGORIES;
  },

  getCategoryBySlug: async (slug: string) => {
    if (mongoose.connection.readyState === 1) {
      try {
        const category = await ProductCategoryModel.findOne({ slug: slug.toLowerCase(), isActive: true });
        if (category) return category;
      } catch (err) {
        Logger.warn('Category slug lookup error', { error: (err as Error).message });
      }
    }

    return VERIFIED_CATEGORIES.find((c) => c.slug === slug.toLowerCase()) || null;
  },
};
