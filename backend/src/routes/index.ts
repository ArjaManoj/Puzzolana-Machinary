import { Router, Request, Response } from 'express';

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

// Root API Welcome / Directory Endpoint
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    name: 'Puzzolana Machinery REST API',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      categories: '/api/categories',
      applications: '/api/applications',
      caseStudies: '/api/case-studies',
      quoteEnquiries: '/api/quote-enquiries',
      sparePartsEnquiries: '/api/spare-parts-enquiries',
      dealerEnquiries: '/api/dealer-enquiries',
      tracking: '/api/enquiries/:referenceId',
      downloads: '/api/downloads',
      admin: '/api/admin',
    },
  });
});

export default router;
