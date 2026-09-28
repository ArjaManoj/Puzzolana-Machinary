import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middleware/authGuard';

export const AdminController = {
  // GET /api/admin/kpis
  getDashboardKpis: async (req: Request, res: Response): Promise<void> => {
    const kpis = await AdminService.getKpis();
    sendSuccess(res, kpis, 'Admin dashboard KPIs fetched');
  },

  // GET /api/admin/enquiries
  getEnquiries: async (req: Request, res: Response): Promise<void> => {
    const { page, limit } = req.query;
    const result = await AdminService.getAllEnquiries(
      page ? parseInt(page as string, 10) : 1,
      limit ? parseInt(limit as string, 10) : 20
    );
    sendSuccess(res, result.enquiries, 'Admin enquiries list', 200, {
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
    });
  },

  // PATCH /api/admin/enquiries/:id
  updateEnquiryStatus: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status, notes } = req.body;
    const userId = req.user?.userId || 'admin';

    const updated = await AdminService.updateEnquiryStatus(id, status, notes, userId);
    sendSuccess(res, updated, 'Enquiry updated successfully');
  },

  // GET /api/admin/products
  getAllProductsAdmin: async (req: Request, res: Response): Promise<void> => {
    const { category, search, status } = req.query;
    const products = await AdminService.getAllProducts({
      category: category as string,
      search: search as string,
      status: status as string,
    });
    sendSuccess(res, products, `Retrieved ${products.length} products for admin`);
  },

  // POST /api/admin/products
  createProductAdmin: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId || 'admin';
    const created = await AdminService.createProduct(req.body, userId);
    sendSuccess(res, created, 'Product created successfully in draft status', 201);
  },

  // PATCH /api/admin/products/:id
  updateProductAdmin: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.user?.userId || 'admin';
    const updated = await AdminService.updateProduct(id, req.body, userId);
    sendSuccess(res, updated, 'Product updated successfully');
  },

  // DELETE /api/admin/products/:id
  deleteProductAdmin: async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    const userId = req.user?.userId || 'admin';
    const deleted = await AdminService.deleteProduct(id, userId);
    sendSuccess(res, deleted, 'Product archived/deleted successfully');
  },
};
