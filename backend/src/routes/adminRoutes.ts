import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { AdminController } from '../controllers/adminController';
import { authenticateJwt, requireRoles } from '../middleware/authGuard';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public auth endpoint
router.post('/login', authLimiter, AuthController.login);

// Protected Admin routes
router.get('/me', authenticateJwt, AuthController.getCurrentUser);
router.get('/kpis', authenticateJwt, requireRoles('admin', 'editor'), AdminController.getDashboardKpis);
router.get('/enquiries', authenticateJwt, requireRoles('admin', 'editor'), AdminController.getEnquiries);
router.patch('/enquiries/:id', authenticateJwt, requireRoles('admin'), AdminController.updateEnquiryStatus);

export default router;
