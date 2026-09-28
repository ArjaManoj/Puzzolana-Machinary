import { Router, Request, Response } from 'express';
import productRoutes from './productRoutes';
import categoryRoutes from './categoryRoutes';
import enquiryRoutes from './enquiryRoutes';
import contentRoutes from './contentRoutes';
import searchRoutes from './searchRoutes';
import adminRoutes from './adminRoutes';
import analyticsRoutes from './analyticsRoutes';

const router = Router();

// Health Check & Meta Endpoint
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    platform: 'Puzzolana Machinery Enterprise API Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

// Root API Directory Endpoint
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    name: 'Puzzolana Machinery REST API',
    endpoints: {
      health: '/api/health',
      search: '/api/search',
      products: '/api/products',
      categories: '/api/categories',
      applications: '/api/applications',
      caseStudies: '/api/case-studies',
      quoteEnquiries: '/api/quote-enquiries',
      serviceEnquiries: '/api/service-enquiries',
      sparePartsEnquiries: '/api/spare-parts-enquiries',
      dealerEnquiries: '/api/dealer-enquiries',
      tracking: '/api/enquiries/:referenceId',
      downloads: '/api/downloads',
      statistics: '/api/statistics',
      locations: '/api/locations',
      admin: '/api/admin',
      analytics: '/api/analytics',
    },
  });
});

// Mount domain routes
router.use('/search', searchRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/', enquiryRoutes);
router.use('/', contentRoutes);
router.use('/admin', adminRoutes);

export default router;
