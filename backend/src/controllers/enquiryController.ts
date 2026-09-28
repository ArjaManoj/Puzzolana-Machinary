import { Request, Response } from 'express';
import { EnquiryService } from '../services/enquiryService';
import { AnalyticsService } from '../services/analyticsService';
import { sendSuccess } from '../utils/apiResponse';

export const EnquiryController = {
  // POST /api/quote-enquiries
  createQuoteEnquiry: async (req: Request, res: Response): Promise<void> => {
    const savedEnquiry = await EnquiryService.createQuoteEnquiry(req.body);

    // Record anonymous telemetry event
    AnalyticsService.recordEvent('quote_submit', '/quote', { category: req.body.productCategory }, req.ip, req.headers['user-agent']);

    sendSuccess(
      res,
      savedEnquiry,
      'Quotation enquiry submitted successfully. Tracking reference generated.',
      201
    );
  },

  // POST /api/service-enquiries
  createServiceEnquiry: async (req: Request, res: Response): Promise<void> => {
    const savedEnquiry = await EnquiryService.createServiceEnquiry(req.body);
    sendSuccess(res, savedEnquiry, 'Service request logged successfully.', 201);
  },

  // POST /api/spare-parts-enquiries
  createSparePartsEnquiry: async (req: Request, res: Response): Promise<void> => {
    const savedEnquiry = await EnquiryService.createSparePartsEnquiry(req.body);
    sendSuccess(res, savedEnquiry, 'Spare parts request logged successfully.', 201);
  },

  // POST /api/dealer-enquiries
  createDealerEnquiry: async (req: Request, res: Response): Promise<void> => {
    const savedEnquiry = await EnquiryService.createDealerEnquiry(req.body);
    sendSuccess(res, savedEnquiry, 'Dealer registration inquiry submitted successfully.', 201);
  },

  // POST /api/contact
  createContactMessage: async (req: Request, res: Response): Promise<void> => {
    const savedMessage = await EnquiryService.createContactMessage(req.body);
    sendSuccess(res, savedMessage, 'Message received. A representative will contact you shortly.', 201);
  },

  // POST /api/job-applications
  createJobApplication: async (req: Request, res: Response): Promise<void> => {
    const savedApp = await EnquiryService.createJobApplication(req.body);
    sendSuccess(res, savedApp, 'Application submitted successfully to Puzzolana HR.', 201);
  },

  // GET /api/enquiries/:referenceId
  trackEnquiry: async (req: Request, res: Response): Promise<void> => {
    const { referenceId } = req.params;
    const trackingData = await EnquiryService.trackEnquiry(referenceId);
    sendSuccess(res, trackingData, `Tracking status for ${referenceId}`);
  },
};
