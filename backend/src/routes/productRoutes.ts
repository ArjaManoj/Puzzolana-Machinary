import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { validateRequest } from '../middleware/requestValidator';
import { machineFinderSchema } from '../validators/productValidators';

const router = Router();

// GET /api/products (Catalogue with multi-param filtering, sorting, pagination)
router.get('/', ProductController.getAllProducts);

// GET /api/products/search?q=PJC (Global product full-text & field search)
router.get('/search', ProductController.searchProducts);

// GET /api/products/featured (Flagship high-capacity machinery)
router.get('/featured', ProductController.getFeaturedProducts);

// GET /api/products/compare?ids=PJC-14076,PCC-2000 (Side-by-side spec comparison matrix)
router.get('/compare', ProductController.compareProducts);

// POST /api/products/finder (Rule-based machinery recommendation)
router.post('/finder', validateRequest(machineFinderSchema), ProductController.findMachines);

// GET /api/products/related/:slug (Compatible downstream equipment)
router.get('/related/:slug', ProductController.getRelatedProducts);

// GET /api/products/:slug (Single product technical detail)
router.get('/:slug', ProductController.getProductBySlug);

export default router;
