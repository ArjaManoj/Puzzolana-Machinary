import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { AdminController } from '../controllers/adminController';
import { authenticateJwt, requireRoles } from '../middleware/authGuard';
import { authLimiter } from '../middleware/rateLimiter';
import { validateRequest } from '../middleware/requestValidator';
import { loginSchema } from '../validators/authValidators';
import { adminProductCreateSchema, adminProductUpdateSchema } from '../validators/productValidators';

const router = Router();

// Public auth endpoint
router.post('/login', authLimiter, validateRequest(loginSchema), AuthController.login);

// Protected Admin routes
router.get('/me', authenticateJwt, AuthController.getCurrentUser);
router.get('/kpis', authenticateJwt, requireRoles('admin', 'editor'), AdminController.getDashboardKpis);
router.get('/enquiries', authenticateJwt, requireRoles('admin', 'editor'), AdminController.getEnquiries);
router.patch('/enquiries/:id', authenticateJwt, requireRoles('admin'), AdminController.updateEnquiryStatus);

// Admin Product CRUD routes
router.get('/products', authenticateJwt, requireRoles('admin', 'editor'), AdminController.getAllProductsAdmin);
router.post(
  '/products',
  authenticateJwt,
  requireRoles('admin'),
  validateRequest(adminProductCreateSchema),
  AdminController.createProductAdmin
);
router.patch(
  '/products/:id',
  authenticateJwt,
  requireRoles('admin'),
  validateRequest(adminProductUpdateSchema),
  AdminController.updateProductAdmin
);
router.delete('/products/:id', authenticateJwt, requireRoles('admin'), AdminController.deleteProductAdmin);

export default router;
