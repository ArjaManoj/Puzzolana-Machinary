import { Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const CategoryController = {
  // GET /api/categories
  getAllCategories: async (req: Request, res: Response): Promise<void> => {
    const categories = await CategoryService.getCategories();
    sendSuccess(res, categories, 'Verified product categories fetched successfully');
  },

  // GET /api/categories/:slug
  getCategoryBySlug: async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;
    const category = await CategoryService.getCategoryBySlug(slug);

    if (!category) {
      sendError(res, `Category '${slug}' not found`, 404);
      return;
    }

    sendSuccess(res, category, `Category details for ${slug}`);
  },
};
