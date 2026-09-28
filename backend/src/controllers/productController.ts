import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { sendSuccess, sendError } from '../utils/apiResponse';

export const ProductController = {
  // GET /api/products
  getAllProducts: async (req: Request, res: Response): Promise<void> => {
    const { category, subcategory, application, material, search, minCapacity, maxCapacity, mobility, sortBy, page, limit } = req.query;

    const result = await ProductService.getProducts({
      category: category as string,
      subcategory: subcategory as string,
      application: application as string,
      material: material as string,
      search: search as string,
      minCapacity: minCapacity ? parseFloat(minCapacity as string) : undefined,
      maxCapacity: maxCapacity ? parseFloat(maxCapacity as string) : undefined,
      mobility: mobility as string,
      sortBy: sortBy as any,
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

  // GET /api/products/search?q=PJC
  searchProducts: async (req: Request, res: Response): Promise<void> => {
    const { q, limit } = req.query;
    if (!q || typeof q !== 'string') {
      sendError(res, 'Please provide a search query parameter ?q=', 400);
      return;
    }

    const results = await ProductService.searchProducts(q, limit ? parseInt(limit as string, 10) : 10);
    sendSuccess(res, results, `Search results for '${q}' (${results.length} matches)`);
  },

  // GET /api/products/featured
  getFeaturedProducts: async (req: Request, res: Response): Promise<void> => {
    const featured = await ProductService.getFeaturedProducts();
    sendSuccess(res, featured, 'Featured flagship machinery products');
  },

  // GET /api/products/related/:slug
  getRelatedProducts: async (req: Request, res: Response): Promise<void> => {
    const { slug } = req.params;
    const related = await ProductService.getRelatedProducts(slug);
    sendSuccess(res, related, `Downstream compatible products for ${slug}`);
  },

  // GET /api/products/compare?ids=PJC-14076,PCC-2000
  compareProducts: async (req: Request, res: Response): Promise<void> => {
    const { ids } = req.query;
    if (!ids) {
      sendError(res, 'Please provide machine IDs or slugs to compare (e.g. ?ids=PJC-14076,PCC-2000)', 400);
      return;
    }

    const idList = typeof ids === 'string' ? ids.split(',').map((id) => id.trim()) : [];
    if (idList.length < 2) {
      sendError(res, 'Please select at least 2 machines for comparison', 400);
      return;
    }

    const comparisonMatrix = await ProductService.compareProductsAdvanced(idList);
    sendSuccess(res, comparisonMatrix, `Comparison matrix for ${comparisonMatrix.comparedCount} machines`);
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
};
