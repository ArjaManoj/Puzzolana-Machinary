import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse';

export const AdminController = {
  // GET /api/admin/kpis
  getDashboardKpis: async (req: Request, res: Response): Promise<void> => {
    const kpis = {
      quoteEnquiries: 0,
      serviceEnquiries: 0,
      sparePartsEnquiries: 0,
      dealerEnquiries: 0,
      contactMessages: 0,
      jobApplications: 0,
      productViews: 0,
      downloads: 0,
      recentEnquiries: [],
    };
    sendSuccess(res, kpis, 'Admin dashboard KPIs fetched');
  },

  // GET /api/admin/enquiries
  getEnquiries: async (req: Request, res: Response): Promise<void> => {
    sendSuccess(res, [], 'Admin enquiries list', 200, { page: 1, limit: 20, total: 0 });
  },

  // PATCH /api/admin/enquiries/:id
  updateEnquiryStatus: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status, notes } = req.body;
    sendSuccess(res, { id, status, notes, updatedAt: new Date().toISOString() }, 'Enquiry updated');
  },
};
