import { Router } from 'express';
import { ContentController } from '../controllers/contentController';

const router = Router();

router.get('/applications', ContentController.getApplications);
router.get('/case-studies', ContentController.getCaseStudies);
router.get('/blogs', ContentController.getBlogs);
router.get('/events', ContentController.getEvents);
router.get('/downloads', ContentController.getDownloads);
router.get('/locations', ContentController.getLocations);
router.get('/statistics', ContentController.getStatistics);

export default router;
