import { Router } from 'express';
import { EnquiryController } from '../controllers/enquiryController';
import { enquiryFormLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public B2B Form submissions (rate-limited against spam)
router.post('/quote-enquiries', enquiryFormLimiter, EnquiryController.createQuoteEnquiry);
router.post('/service-enquiries', enquiryFormLimiter, EnquiryController.createServiceEnquiry);
router.post('/spare-parts-enquiries', enquiryFormLimiter, EnquiryController.createSparePartsEnquiry);
router.post('/dealer-enquiries', enquiryFormLimiter, EnquiryController.createDealerEnquiry);
router.post('/contact', enquiryFormLimiter, EnquiryController.createContactMessage);
router.post('/job-applications', enquiryFormLimiter, EnquiryController.createJobApplication);

// Tracking endpoint
router.get('/enquiries/:referenceId', EnquiryController.trackEnquiry);

export default router;
