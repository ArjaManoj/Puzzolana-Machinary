import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { validateRequest } from '../middleware/requestValidator';
import { machineFinderSchema } from '../validators/productValidators';

const router = Router();

// GET /api/products
router.get('/', ProductController.getAllProducts);

// GET /api/products/compare?ids=PJC-14076,PCC-2000
router.get('/compare', ProductController.compareProducts);

// POST /api/products/finder (Rule-based machine discovery)
router.post('/finder', validateRequest(machineFinderSchema), ProductController.findMachines);

// GET /api/products/:slug
router.get('/:slug', ProductController.getProductBySlug);

export default router;
