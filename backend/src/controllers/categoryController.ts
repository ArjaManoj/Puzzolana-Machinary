import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse';

export const CategoryController = {
  // GET /api/categories
  getAllCategories: async (req: Request, res: Response): Promise<void> => {
    const verifiedCategories = [
      { id: 'crushers', name: 'Crushers', slug: 'crushers', count: 12 },
      { id: 'feeders-and-screens', name: 'Feeders & Screens', slug: 'feeders-and-screens', count: 8 },
      { id: 'classifiers', name: 'Classifiers & Washing', slug: 'classifiers', count: 5 },
      { id: 'mobile-crushers', name: 'Mobile Crushers (Track)', slug: 'mobile-crushers', count: 6 },
      { id: 'semi-mobile', name: 'Semi-Mobile / Skid Mounted', slug: 'semi-mobile', count: 4 },
      { id: 'mining', name: 'Mining Solutions', slug: 'mining', count: 5 },
      { id: 'waste-processing', name: 'Waste Processing & Recycling', slug: 'waste-processing', count: 3 },
      { id: 'road-building', name: 'Road Building Machinery', slug: 'road-building', count: 4 },
    ];
    sendSuccess(res, verifiedCategories, 'Verified product categories fetched successfully');
  },

  // GET /api/categories/:slug
  getCategoryBySlug: async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;
    sendSuccess(res, { slug }, `Category details for ${slug}`);
  },
};
