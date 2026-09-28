import { NotificationService } from '../src/services/notificationService';
import {
  renderCustomerQuoteEmail,
  renderInternalQuoteAlertEmail,
  renderCustomerServiceEmail,
  renderCustomerSparePartsEmail,
  renderCustomerDealerEmail,
  renderCustomerJobEmail,
  renderGatedCadAlertEmail,
} from '../src/services/templates/emailTemplates';

describe('Notifications Subsystem & Email Generation Suite', () => {
  beforeEach(() => {
    NotificationService.clearLogs();
  });

  describe('HTML Email Template Compilers', () => {
    it('Customer Quote Email compiles with PZQ tracking code and table specs', () => {
      const email = renderCustomerQuoteEmail({
        referenceId: 'PZQ-2026-994102',
        name: 'Rajeshwer Reddy',
        company: 'Deccan Granite Quarries Pvt Ltd',
        industry: 'Aggregates & Quarrying',
        application: 'Granite Crushing & M-Sand',
        productCategory: 'crushers',
        productModel: 'PJC 14076',
        capacityRequiredTPH: 600,
        feedSizeMaxMM: 850,
        portalUrl: 'https://puzzolana.com/enquiries/track?ref=PZQ-2026-994102',
      });

      expect(email.subject).toContain('PZQ-2026-994102');
      expect(email.subject).toContain('Quotation Request Received');
      expect(email.html).toContain('PJC 14076');
      expect(email.html).toContain('600 TPH');
      expect(email.html).toContain('Pashamylaram');
      expect(email.text).toContain('PZQ-2026-994102');
    });

    it('Internal Sales Lead Alert compiles with high-priority banner and contact coordinates', () => {
      const email = renderInternalQuoteAlertEmail({
        referenceId: 'PZQ-2026-881920',
        name: 'Suresh Patil',
        company: 'Sahyadri Road Infrastructure Corp',
        email: 'spatil@sahyadriinfra.in',
        phone: '+91 98220 54321',
        city: 'Pune',
        state: 'Maharashtra',
        industry: 'Highway Infrastructure',
        application: 'Expressway Basalt Sub-base',
        productCategory: 'track-plants',
        capacityRequiredTPH: 450,
        dashboardUrl: 'https://puzzolana.com/admin/dashboard',
      });

      expect(email.subject).toContain('URGENT LEAD: PZQ-2026-881920');
      expect(email.html).toContain('spatil@sahyadriinfra.in');
      expect(email.html).toContain('+91 98220 54321');
      expect(email.html).toContain('Pune, Maharashtra');
      expect(email.text).toContain('Sahyadri Road Infrastructure Corp');
    });

    it('Customer Service Email compiles with PZS tracking code and 24/7 hotline', () => {
      const email = renderCustomerServiceEmail({
        referenceId: 'PZS-2026-118822',
        name: 'Anand Verma',
        company: 'Kalinga Mineral Beneficiation',
        plantLocation: 'Jajpur, Odisha',
        machineModel: 'PJC 14076 Jaw Crusher',
        urgency: 'HIGH',
        serviceType: 'Emergency Hydraulic Breakdown Support',
      });

      expect(email.subject).toContain('PZS-2026-118822');
      expect(email.html).toContain('1800 425 2626');
      expect(email.html).toContain('Jajpur, Odisha');
    });

    it('Spare Parts Email compiles with PZP tracking code and metallurgy grade', () => {
      const email = renderCustomerSparePartsEmail({
        referenceId: 'PZP-2026-339911',
        name: 'Manoj Kumar',
        company: 'Shree Cement Quarry Operations',
        machineModel: 'PCC 2000 Cone Crusher',
        partNumbers: ['PCC-2000-MANTLE-EC-MN18', 'PCC-2000-BOWL-LINER-MN18'],
      });

      expect(email.subject).toContain('PZP-2026-339911');
      expect(email.html).toContain('Mn18Cr2 / Mn22Cr2 High Impact Certified');
      expect(email.html).toContain('PCC-2000-MANTLE-EC-MN18');
    });

    it('Dealership Application Email compiles with PZD tracking code', () => {
      const email = renderCustomerDealerEmail({
        referenceId: 'PZD-2026-554433',
        name: 'Ramesh Patel',
        companyName: 'Gujarat Heavy Mining Equipments',
        territory: 'Gujarat & Western MP',
      });

      expect(email.subject).toContain('PZD-2026-554433');
      expect(email.html).toContain('Gujarat & Western MP');
    });

    it('Job Application Email compiles with PZJ tracking code', () => {
      const email = renderCustomerJobEmail({
        referenceId: 'PZJ-2026-778899',
        fullName: 'Vikram Singh',
        position: 'Senior Mechanical Design Engineer',
        department: 'Crushing R&D',
      });

      expect(email.subject).toContain('PZJ-2026-778899');
      expect(email.html).toContain('Senior Mechanical Design Engineer');
    });

    it('Gated CAD Access Alert compiles with document title and compliance notice', () => {
      const email = renderGatedCadAlertEmail({
        documentTitle: 'PJC 14076 GA Drawing & Foundation Plan',
        companyName: 'Larsen & Toubro Heavy Civil Infrastructure',
        applicantName: 'K. S. Narayanan',
        email: 'ks.narayanan@intecc.com',
        phone: '+91 98400 12345',
        projectApplication: 'Expressway Flyover Aggregate Plant',
      });

      expect(email.subject).toContain('GATED CAD ACCESS LOG');
      expect(email.html).toContain('Larsen & Toubro');
    });
  });

  describe('Notification Dispatch & Telemetry Engine', () => {
    it('dispatches quote received notifications to customer and internal sales alert', async () => {
      const res = await NotificationService.sendQuoteReceivedNotification({
        referenceId: 'PZQ-2026-102938',
        name: 'Naveen Rao',
        company: 'Telangana Aggregates Corp',
        email: 'naveen@telanganaaggregates.com',
        phone: '+91 98480 99887',
        city: 'Hyderabad',
        state: 'Telangana',
        industry: 'Commercial Quarrying',
        application: 'Granite & M-Sand',
        productCategory: 'crushers',
        capacityRequiredTPH: 500,
      });

      expect(res.customerSent).toBe(true);
      expect(res.salesAlertSent).toBe(true);

      const logs = NotificationService.getRecentLogs();
      expect(logs.length).toBe(2);
      expect(logs.some((l) => l.type === 'CUSTOMER_QUOTE_RECEIPT')).toBe(true);
      expect(logs.some((l) => l.type === 'INTERNAL_SALES_ALERT')).toBe(true);
    });

    it('dispatches service, spare parts, and dealer notifications with telemetry logging', async () => {
      await Promise.all([
        NotificationService.sendServiceEnquiryNotification({
          referenceId: 'PZS-2026-001',
          name: 'Sunil Gupta',
          company: 'Gupta Quarries',
          email: 'sunil@guptaquarries.com',
          plantLocation: 'Nagpur, Maharashtra',
          machineModel: 'PJC 11075',
          urgency: 'MEDIUM',
          serviceType: 'Routine Maintenance',
        }),
        NotificationService.sendSparePartsNotification({
          referenceId: 'PZP-2026-002',
          name: 'Sunil Gupta',
          company: 'Gupta Quarries',
          email: 'sunil@guptaquarries.com',
          machineModel: 'PJC 11075',
          partNumbers: ['PJC-11075-JAW-PLATE'],
        }),
      ]);

      const logs = NotificationService.getRecentLogs();
      expect(logs.length).toBe(2);
      expect(logs.every((l) => l.status === 'SIMULATED' || l.status === 'SENT')).toBe(true);
    });
  });
});
