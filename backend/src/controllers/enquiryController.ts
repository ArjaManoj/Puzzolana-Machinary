import { Request, Response } from 'express';
import { EnquiryService } from '../services/enquiryService';
import { AnalyticsService } from '../services/analyticsService';
import { NotificationService } from '../services/notificationService';
import { sendSuccess } from '../utils/apiResponse';

export const EnquiryController = {
  // POST /api/quote-enquiries
  createQuoteEnquiry: async (req: Request, res: Response): Promise<void> => {
    const savedEnquiry: any = await EnquiryService.createQuoteEnquiry(req.body);

    // Record anonymous telemetry event
    AnalyticsService.recordEvent('quote_submit', '/quote', { category: req.body.productCategory }, req.ip, req.headers['user-agent']);

    // Asynchronously dispatch Customer Acknowledgement + Internal Sales Alert
    NotificationService.sendQuoteReceivedNotification({
      referenceId: savedEnquiry.referenceId,
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      state: req.body.state,
      industry: req.body.industry,
      application: req.body.application,
      productCategory: req.body.productCategory,
      productModel: req.body.productModel,
      capacityRequiredTPH: req.body.capacityRequiredTPH,
      feedSizeMaxMM: req.body.feedSizeMaxMM,
      projectTimeline: req.body.projectTimeline,
      estimatedBudget: req.body.estimatedBudget,
    }).catch(() => {
      // Non-blocking notification resilience
    });

    sendSuccess(
      res,
      savedEnquiry,
      'Quotation enquiry submitted successfully. Tracking reference generated.',
      201
    );
  },

  // POST /api/service-enquiries
  createServiceEnquiry: async (req: Request, res: Response): Promise<void> => {
    const savedEnquiry: any = await EnquiryService.createServiceEnquiry(req.body);

    NotificationService.sendServiceEnquiryNotification({
      referenceId: savedEnquiry.referenceId,
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      plantLocation: req.body.plantLocation,
      machineModel: req.body.machineModel,
      urgency: req.body.urgency,
      serviceType: req.body.serviceType,
    }).catch(() => {});

    sendSuccess(res, savedEnquiry, 'Service request logged successfully.', 201);
  },

  // POST /api/spare-parts-enquiries
  createSparePartsEnquiry: async (req: Request, res: Response): Promise<void> => {
    const savedEnquiry: any = await EnquiryService.createSparePartsEnquiry(req.body);

    NotificationService.sendSparePartsNotification({
      referenceId: savedEnquiry.referenceId,
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      machineModel: req.body.machineModel,
      partNumbers: req.body.partNumbers || [],
    }).catch(() => {});

    sendSuccess(res, savedEnquiry, 'Spare parts request logged successfully.', 201);
  },

  // POST /api/dealer-enquiries
  createDealerEnquiry: async (req: Request, res: Response): Promise<void> => {
    const savedEnquiry: any = await EnquiryService.createDealerEnquiry(req.body);

    NotificationService.sendDealerApplicationNotification({
      referenceId: savedEnquiry.referenceId,
      name: req.body.name,
      companyName: req.body.companyName,
      email: req.body.email,
      territory: req.body.territoryInterested,
    }).catch(() => {});

    sendSuccess(res, savedEnquiry, 'Dealer registration inquiry submitted successfully.', 201);
  },

  // POST /api/contact
  createContactMessage: async (req: Request, res: Response): Promise<void> => {
    const savedMessage: any = await EnquiryService.createContactMessage(req.body);
    sendSuccess(res, savedMessage, 'Message received. A representative will contact you shortly.', 201);
  },

  // POST /api/job-applications
  createJobApplication: async (req: Request, res: Response): Promise<void> => {
    const savedApp: any = await EnquiryService.createJobApplication(req.body);

    NotificationService.sendJobApplicationNotification({
      referenceId: savedApp.referenceId,
      fullName: req.body.fullName,
      email: req.body.email,
      position: req.body.positionApplied,
      department: req.body.department,
    }).catch(() => {});

    sendSuccess(res, savedApp, 'Application submitted successfully to Puzzolana HR.', 201);
  },

  // GET /api/enquiries/:referenceId
  trackEnquiry: async (req: Request, res: Response): Promise<void> => {
    const { referenceId } = req.params;
    const trackingData = await EnquiryService.trackEnquiry(referenceId);
    sendSuccess(res, trackingData, `Tracking status for ${referenceId}`);
  },
};
