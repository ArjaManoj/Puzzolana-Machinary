import { Router } from 'express';
import { AnalyticsController } from '../controllers/analyticsController';
import { authenticateJwt, requireRoles } from '../middleware/authGuard';

const router = Router();

// Public telemetry ingestion
router.post('/event', AnalyticsController.postEvent);

// Protected Operations Command analytics
router.get('/metrics', authenticateJwt, requireRoles('admin', 'editor'), AnalyticsController.getMetrics);
router.get('/funnel', authenticateJwt, requireRoles('admin', 'editor'), AnalyticsController.getFunnel);
router.get('/live', authenticateJwt, requireRoles('admin', 'editor'), AnalyticsController.getLiveStream);

export default router;
