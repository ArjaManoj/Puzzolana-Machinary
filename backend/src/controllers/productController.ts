import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const ProductController = {
  // GET /api/products
  getAllProducts: async (req: Request, res: Response): Promise<void> => {
    const { category, application, material, search, minCapacity, maxCapacity, mobility, page, limit } = req.query;

    const result = await ProductService.getProducts({
      category: category as string,
      application: application as string,
      material: material as string,
      search: search as string,
      minCapacity: minCapacity ? parseFloat(minCapacity as string) : undefined,
      maxCapacity: maxCapacity ? parseFloat(maxCapacity as string) : undefined,
      mobility: mobility as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 12,
    });

    sendSuccess(res, result.products, 'Products retrieved successfully', 200, {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    });
  },

  // GET /api/products/:slug
  getProductBySlug: async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;
    const product = await ProductService.getProductBySlug(slug);

    if (!product) {
      sendError(res, `Machine model '${slug}' not found in active catalogue.`, 404);
      return;
    }

    sendSuccess(res, product, `Product details for ${slug}`);
  },

  // GET /api/products/compare
  compareProducts: async (req: Request, res: Response): Promise<void> => {
    const { ids } = req.query;
    if (!ids) {
      sendError(res, 'Please provide machine IDs or slugs to compare (e.g. ?ids=PJC-14076,PCC-2000)', 400);
      return;
    }

    const idList = typeof ids === 'string' ? ids.split(',').map((id) => id.trim()) : [];
    const products = await ProductService.getProductsByIds(idList);

    sendSuccess(res, products, `Comparison matrix for ${products.length} machines`);
  },

  // POST /api/products/finder
  findMachines: async (req: Request, res: Response): Promise<void> => {
    const { industry, application, material, category, requiredCapacity, mobility } = req.body;
    const matches = await ProductService.findMachinesRuleBased({
      industry,
      application,
      material,
      category,
      requiredCapacity,
      mobility,
    });

    sendSuccess(res, matches, `Rule-based machine recommendations matched (${matches.length} models)`);
  },
};
