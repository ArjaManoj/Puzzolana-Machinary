import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { generateReferenceId } from '../utils/referenceGenerator';

export const EnquiryController = {
  // POST /api/quote-enquiries
  createQuoteEnquiry: async (req: Request, res: Response): Promise<void> => {
    const referenceId = generateReferenceId('QUOTE');
    const enquiryData = {
      referenceId,
      ...req.body,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
    };
    sendSuccess(res, enquiryData, 'Quotation enquiry submitted successfully. Tracking reference generated.', 201);
  },

  // POST /api/service-enquiries
  createServiceEnquiry: async (req: Request, res: Response): Promise<void> => {
    const referenceId = generateReferenceId('SERVICE');
    const serviceData = {
      referenceId,
      ...req.body,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
    };
    sendSuccess(res, serviceData, 'Service request logged successfully.', 201);
  },

  // POST /api/spare-parts-enquiries
  createSparePartsEnquiry: async (req: Request, res: Response): Promise<void> => {
    const referenceId = generateReferenceId('SPARES');
    const sparePartsData = {
      referenceId,
      ...req.body,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
    };
    sendSuccess(res, sparePartsData, 'Spare parts request logged successfully.', 201);
  },

  // POST /api/dealer-enquiries
  createDealerEnquiry: async (req: Request, res: Response): Promise<void> => {
    const referenceId = generateReferenceId('DEALER');
    const dealerData = {
      referenceId,
      ...req.body,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
    };
    sendSuccess(res, dealerData, 'Dealer registration inquiry submitted successfully.', 201);
  },

  // POST /api/contact
  createContactMessage: async (req: Request, res: Response): Promise<void> => {
    const referenceId = generateReferenceId('CONTACT');
    const contactData = {
      referenceId,
      ...req.body,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
    };
    sendSuccess(res, contactData, 'Message received. A representative will contact you shortly.', 201);
  },

  // POST /api/job-applications
  createJobApplication: async (req: Request, res: Response): Promise<void> => {
    const referenceId = generateReferenceId('CAREER');
    const applicationData = {
      referenceId,
      ...req.body,
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
    };
    sendSuccess(res, applicationData, 'Application submitted successfully to Puzzolana HR.', 201);
  },

  // GET /api/enquiries/:referenceId
  trackEnquiry: async (req: Request, res: Response): Promise<void> => {
    const { referenceId } = req.params;
    const trackingStages = [
      { stage: 'NEW', label: 'Enquiry Received', completed: true, timestamp: new Date().toISOString() },
      { stage: 'REVIEW', label: 'Under Technical Review', completed: true, timestamp: new Date().toISOString() },
      { stage: 'SALES_CONTACTED', label: 'Sales Assigned', completed: false },
      { stage: 'EVALUATION', label: 'Engineering Sizing & Quotation', completed: false },
      { stage: 'CLOSED', label: 'Completed', completed: false },
    ];

    sendSuccess(res, {
      referenceId,
      currentStatus: 'UNDER_REVIEW',
      timeline: trackingStages,
      lastUpdated: new Date().toISOString(),
    }, `Tracking details for ${referenceId}`);
  },
};
