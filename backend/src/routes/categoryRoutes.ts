import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';
import { cacheResponse } from '../middleware/cacheMiddleware';

const router = Router();

router.get('/', cacheResponse(300), CategoryController.getAllCategories);
router.get('/:slug', cacheResponse(300), CategoryController.getCategoryBySlug);

export default router;
