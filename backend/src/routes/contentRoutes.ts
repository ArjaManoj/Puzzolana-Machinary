import { Router } from 'express';
import { ContentController } from '../controllers/contentController';
import { cacheResponse } from '../middleware/cacheMiddleware';

const router = Router();

router.get('/applications', cacheResponse(180), ContentController.getApplications);
router.get('/case-studies', cacheResponse(180), ContentController.getCaseStudies);
router.get('/blogs', cacheResponse(180), ContentController.getBlogs);
router.get('/events', cacheResponse(180), ContentController.getEvents);
router.get('/downloads', cacheResponse(180), ContentController.getDownloads);
router.get('/locations', cacheResponse(300), ContentController.getLocations);
router.get('/statistics', cacheResponse(300), ContentController.getStatistics);

export default router;
