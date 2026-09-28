import nodemailer, { Transporter } from 'nodemailer';
import { mailConfig } from '../config/mailConfig';
import { Logger } from '../utils/logger';
import {
  renderCustomerQuoteEmail,
  renderInternalQuoteAlertEmail,
  renderCustomerServiceEmail,
  renderCustomerSparePartsEmail,
  renderCustomerDealerEmail,
  renderCustomerJobEmail,
  renderGatedCadAlertEmail,
} from './templates/emailTemplates';

export interface NotificationLog {
  id: string;
  type: string;
  to: string;
  subject: string;
  timestamp: Date;
  status: 'SENT' | 'SIMULATED' | 'FAILED';
  error?: string;
}

// In-memory telemetry log for diagnostic and admin visibility
const NOTIFICATION_LOGS: NotificationLog[] = [];

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (mailConfig.isMock) {
    return null;
  }
  if (!transporter) {
    try {
      transporter = nodemailer.createTransport({
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.secure,
        auth: mailConfig.user ? { user: mailConfig.user, pass: mailConfig.pass } : undefined,
      });
    } catch (err) {
      Logger.warn('Failed to initialize SMTP transporter, falling back to simulation mode', {
        error: (err as Error).message,
      });
      transporter = null;
    }
  }
  return transporter;
}

export const NotificationService = {
  /**
   * Generic low-level email dispatcher with error boundary
   */
  sendEmail: async (options: {
    to: string;
    subject: string;
    html: string;
    text: string;
    type?: string;
  }): Promise<{ success: boolean; simulated: boolean; messageId?: string }> => {
    const { to, subject, html, text, type = 'GENERAL' } = options;
    const logId = `notif-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const currentTransporter = getTransporter();

    if (!currentTransporter || mailConfig.isMock) {
      Logger.info(`[NOTIFICATION SIMULATED] To: ${to} | Subject: "${subject}"`);
      NOTIFICATION_LOGS.unshift({
        id: logId,
        type,
        to,
        subject,
        timestamp: new Date(),
        status: 'SIMULATED',
      });
      if (NOTIFICATION_LOGS.length > 100) NOTIFICATION_LOGS.pop();
      return { success: true, simulated: true, messageId: logId };
    }

    try {
      const info = await currentTransporter.sendMail({
        from: `"${mailConfig.fromName}" <${mailConfig.fromAddress}>`,
        to,
        subject,
        html,
        text,
      });

      NOTIFICATION_LOGS.unshift({
        id: logId,
        type,
        to,
        subject,
        timestamp: new Date(),
        status: 'SENT',
      });
      if (NOTIFICATION_LOGS.length > 100) NOTIFICATION_LOGS.pop();

      return { success: true, simulated: false, messageId: info.messageId };
    } catch (err) {
      const errorMsg = (err as Error).message;
      Logger.error(`[NOTIFICATION FAILED] To: ${to} | Error: ${errorMsg}`);
      NOTIFICATION_LOGS.unshift({
        id: logId,
        type,
        to,
        subject,
        timestamp: new Date(),
        status: 'FAILED',
        error: errorMsg,
      });
      return { success: false, simulated: false };
    }
  },

  /**
   * Quote / RFQ Received Notifications (Customer + Sales Alert)
   */
  sendQuoteReceivedNotification: async (quote: {
    referenceId: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    industry: string;
    application: string;
    productCategory: string;
    productModel?: string;
    capacityRequiredTPH?: number;
    feedSizeMaxMM?: number;
    projectTimeline?: string;
    estimatedBudget?: string;
  }) => {
    const portalUrl = `https://puzzolana.com/enquiries/track?ref=${quote.referenceId}`;
    const dashboardUrl = `https://puzzolana.com/admin/dashboard`;

    // 1. Customer Acknowledgement
    const customerEmail = renderCustomerQuoteEmail({
      ...quote,
      portalUrl,
    });

    // 2. Internal Sales Lead Alert
    const internalAlert = renderInternalQuoteAlertEmail({
      ...quote,
      dashboardUrl,
    });

    const [custRes, intRes] = await Promise.all([
      NotificationService.sendEmail({
        to: quote.email,
        subject: customerEmail.subject,
        html: customerEmail.html,
        text: customerEmail.text,
        type: 'CUSTOMER_QUOTE_RECEIPT',
      }),
      NotificationService.sendEmail({
        to: mailConfig.internalSalesEmail,
        subject: internalAlert.subject,
        html: internalAlert.html,
        text: internalAlert.text,
        type: 'INTERNAL_SALES_ALERT',
      }),
    ]);

    return { customerSent: custRes.success, salesAlertSent: intRes.success };
  },

  /**
   * Field Service Ticket Notification
   */
  sendServiceEnquiryNotification: async (service: {
    referenceId: string;
    name: string;
    company: string;
    email: string;
    plantLocation: string;
    machineModel: string;
    urgency: string;
    serviceType: string;
  }) => {
    const customerEmail = renderCustomerServiceEmail(service);
    return NotificationService.sendEmail({
      to: service.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
      type: 'CUSTOMER_SERVICE_RECEIPT',
    });
  },

  /**
   * Spare Parts RFQ Notification
   */
  sendSparePartsNotification: async (parts: {
    referenceId: string;
    name: string;
    company: string;
    email: string;
    machineModel: string;
    partNumbers: string[];
  }) => {
    const customerEmail = renderCustomerSparePartsEmail(parts);
    return NotificationService.sendEmail({
      to: parts.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
      type: 'CUSTOMER_PARTS_RECEIPT',
    });
  },

  /**
   * Dealership Application Notification
   */
  sendDealerApplicationNotification: async (dealer: {
    referenceId: string;
    name: string;
    companyName: string;
    email: string;
    territory: string;
  }) => {
    const customerEmail = renderCustomerDealerEmail(dealer);
    return NotificationService.sendEmail({
      to: dealer.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
      type: 'CUSTOMER_DEALER_RECEIPT',
    });
  },

  /**
   * Job Application Notification
   */
  sendJobApplicationNotification: async (job: {
    referenceId: string;
    fullName: string;
    email: string;
    position: string;
    department: string;
  }) => {
    const customerEmail = renderCustomerJobEmail(job);
    return NotificationService.sendEmail({
      to: job.email,
      subject: customerEmail.subject,
      html: customerEmail.html,
      text: customerEmail.text,
      type: 'CUSTOMER_JOB_RECEIPT',
    });
  },

  /**
   * Gated CAD Access Notification
   */
  sendGatedCadAccessNotification: async (cad: {
    documentTitle: string;
    companyName: string;
    applicantName: string;
    email: string;
    phone: string;
    projectApplication: string;
  }) => {
    const alertEmail = renderGatedCadAlertEmail(cad);
    return NotificationService.sendEmail({
      to: mailConfig.internalCadDeskEmail,
      subject: alertEmail.subject,
      html: alertEmail.html,
      text: alertEmail.text,
      type: 'INTERNAL_CAD_ACCESS_ALERT',
    });
  },

  /**
   * Diagnostic Telemetry Query
   */
  getRecentLogs: (): NotificationLog[] => {
    return NOTIFICATION_LOGS;
  },

  clearLogs: (): void => {
    NOTIFICATION_LOGS.length = 0;
  },
};
