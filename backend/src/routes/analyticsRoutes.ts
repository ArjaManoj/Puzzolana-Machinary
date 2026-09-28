import { Router } from 'express';
import { AnalyticsController } from '../controllers/analyticsController';
import { authenticateJwt, requireRoles } from '../middleware/authGuard';
import { analyticsLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public telemetry ingestion with rate limiter
router.post('/event', analyticsLimiter, AnalyticsController.postEvent);

// Protected Operations Command analytics
router.get('/metrics', authenticateJwt, requireRoles('admin', 'editor'), AnalyticsController.getMetrics);
router.get('/funnel', authenticateJwt, requireRoles('admin', 'editor'), AnalyticsController.getFunnel);
router.get('/live', authenticateJwt, requireRoles('admin', 'editor'), AnalyticsController.getLiveStream);

export default router;
