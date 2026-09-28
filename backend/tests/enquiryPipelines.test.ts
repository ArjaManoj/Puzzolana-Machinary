import request from 'supertest';
import { createApp } from '../src/app';

describe('B2B Enquiry & Lifecycle Tracking Pipelines Suite', () => {
  const app = createApp();

  describe('1. Quote Enquiry Pipeline (PZQ-)', () => {
    it('should submit valid quote enquiry and return PZQ tracking ID', async () => {
      const res = await request(app).post('/api/quote-enquiries').send({
        name: 'Rajesh Sharma',
        company: 'Deccan Granite Quarries',
        phone: '+91 9848012345',
        email: 'rajesh@deccanquarries.com',
        country: 'India',
        state: 'Telangana',
        city: 'Karimnagar',
        industry: 'Mining & Aggregates',
        application: 'Granite Crushing & M-Sand',
        productCategory: 'crushers',
        productModel: 'PJC-14076',
        requiredQuantity: 1,
        requiredCapacityTPH: 400,
        feedMaterial: 'Hard Granite',
        message: 'Need complete primary jaw crusher station with feeder hopper.',
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toMatch(/^PZQ-\d{4}-\d{6}$/);
      expect(res.body.data.status).toBe('RECEIVED');
    });

    it('should reject invalid quote payload with 422 and validation errors', async () => {
      const res = await request(app).post('/api/quote-enquiries').send({
        name: 'R', // too short
        email: 'not-an-email',
      });

      expect(res.status).toBe(422);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('2. Service & Maintenance Enquiry Pipeline (PZS-)', () => {
    it('should submit service request and return PZS tracking ID', async () => {
      const res = await request(app).post('/api/service-enquiries').send({
        name: 'Vikram Singh',
        company: 'Maharashtra Expressways Ltd',
        phone: '+91 9123456780',
        email: 'vikram@mha-express.com',
        location: 'Pune Plant Site #4',
        machineModel: 'PTC-2500 Track Cone',
        machineSerialNumber: 'PZ-2024-TC994',
        serviceType: 'Emergency Breakdown',
        description: 'Main hydraulic cone clamping pressure dropping under load.',
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toMatch(/^PZS-\d{4}-\d{6}$/);
    });

    it('should reject service enquiry with missing issue description with 422', async () => {
      const res = await request(app).post('/api/service-enquiries').send({
        name: 'Vikram',
        company: 'MHA',
        phone: '+91 9123456780',
        email: 'vikram@mha-express.com',
        location: 'Pune',
        machineModel: 'PTC-2500',
        serviceType: 'Emergency Breakdown',
        description: 'short', // < 10 chars
      });

      expect(res.status).toBe(422);
      expect(res.body.success).toBe(false);
    });
  });

  describe('3. Spare Parts Enquiry Pipeline (PZP-)', () => {
    it('should submit wear parts order and return PZP tracking ID', async () => {
      const res = await request(app).post('/api/spare-parts-enquiries').send({
        name: 'Anil Kumar',
        company: 'Singareni Mining Subcontractors',
        phone: '+91 9988776655',
        email: 'anil@singarenisub.com',
        location: 'Ramagundam Site',
        machineModel: 'PJC-14076 Jaw Crusher',
        partName: 'Fixed & Movable Jaw Plates (Mn18Cr2)',
        partNumber: 'PZ-MN18-14076-SET',
        quantity: 2,
        urgencyLevel: 'Urgent',
        description: 'Requires high abrasion Mn18Cr2 alloy cast liners.',
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toMatch(/^PZP-\d{4}-\d{6}$/);
    });
  });

  describe('4. Dealer Network Application Pipeline (PZD-)', () => {
    it('should submit dealership onboarding form and return PZD tracking ID', async () => {
      const res = await request(app).post('/api/dealer-enquiries').send({
        name: 'David Ochieng',
        company: 'East Africa Earthmoving Equipment Ltd',
        phone: '+254 700 123456',
        email: 'david@ea-earthmoving.co.ke',
        country: 'Kenya',
        state: 'Nairobi Region',
        city: 'Nairobi',
        businessType: 'Equipment Distributor & Heavy Machinery Dealership',
        productInterest: ['Crushers', 'Screens', 'Mobile Crushing Plants'],
        existingBusinessDetails: 'Authorized earthmoving dealer representing Caterpillar and Komatsu with 12 service engineers.',
        message: 'Seeking exclusive dealership rights for Kenya and Tanzania territories.',
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toMatch(/^PZD-\d{4}-\d{6}$/);
    });
  });

  describe('5. Corporate Contact Message Pipeline (PZC-)', () => {
    it('should submit contact message and return PZC tracking ID', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'Meera Nambiar',
        company: 'Kerala Infrastructure Corp',
        phone: '+91 9846011223',
        email: 'meera@keralainfra.gov.in',
        subject: 'Inquiry regarding sustainable sand washing technology',
        message: 'We are evaluating wet sand washing and water recycling plants for municipal sand replenishment.',
        preferredOffice: 'Corporate Headquarters Hyderabad',
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toMatch(/^PZC-\d{4}-\d{6}$/);
    });
  });

  describe('6. Careers & Job Application Pipeline (PZJ-)', () => {
    it('should submit engineering job application and return PZJ tracking ID', async () => {
      const res = await request(app).post('/api/job-applications').send({
        name: 'Kiran Verma',
        email: 'kiran.verma@metallurgy-iit.ac.in',
        phone: '+91 9765432100',
        positionApplied: 'Senior Foundry Metallurgy Engineer',
        department: 'Manufacturing & Assembly',
        experienceYears: 6,
        currentCompany: 'Tata Steel Foundry Division',
        noticePeriodDays: 30,
        resumeUrl: 'https://puzzolana.com/resumes/kiran-verma-cv.pdf',
        coverNote: 'Passionate about high-manganese casting alloys and crushers wear optimization.',
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toMatch(/^PZJ-\d{4}-\d{6}$/);
    });
  });

  describe('7. Lifecycle Tracking Lookup', () => {
    it('should retrieve status timeline for valid reference ID', async () => {
      const res = await request(app).get('/api/enquiries/PZQ-2026-999888');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toBe('PZQ-2026-999888');
      expect(res.body.data.timeline).toBeDefined();
      expect(Array.isArray(res.body.data.timeline)).toBe(true);
    });
  });
});
