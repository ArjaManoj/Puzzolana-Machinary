import { Router } from 'express';
import { EnquiryController } from '../controllers/enquiryController';
import { enquiryFormLimiter } from '../middleware/rateLimiter';
import { validateRequest } from '../middleware/requestValidator';
import {
  quoteEnquirySchema,
  serviceEnquirySchema,
  sparePartsEnquirySchema,
  dealerEnquirySchema,
  contactMessageSchema,
  jobApplicationSchema,
} from '../validators/enquiryValidators';

const router = Router();

// Public B2B Form submissions with rate-limiting and strict Zod payload validation
router.post(
  '/quote-enquiries',
  enquiryFormLimiter,
  validateRequest(quoteEnquirySchema),
  EnquiryController.createQuoteEnquiry
);

router.post(
  '/service-enquiries',
  enquiryFormLimiter,
  validateRequest(serviceEnquirySchema),
  EnquiryController.createServiceEnquiry
);

router.post(
  '/spare-parts-enquiries',
  enquiryFormLimiter,
  validateRequest(sparePartsEnquirySchema),
  EnquiryController.createSparePartsEnquiry
);

router.post(
  '/dealer-enquiries',
  enquiryFormLimiter,
  validateRequest(dealerEnquirySchema),
  EnquiryController.createDealerEnquiry
);

router.post(
  '/contact',
  enquiryFormLimiter,
  validateRequest(contactMessageSchema),
  EnquiryController.createContactMessage
);

router.post(
  '/job-applications',
  enquiryFormLimiter,
  validateRequest(jobApplicationSchema),
  EnquiryController.createJobApplication
);

// Tracking endpoint
router.get('/enquiries/:referenceId', EnquiryController.trackEnquiry);

export default router;
