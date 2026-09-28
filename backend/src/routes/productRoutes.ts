import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const router = Router();

router.get('/', ProductController.getAllProducts);
router.get('/compare', ProductController.compareProducts);
router.post('/finder', ProductController.findMachines);
router.get('/:slug', ProductController.getProductBySlug);

export default router;
