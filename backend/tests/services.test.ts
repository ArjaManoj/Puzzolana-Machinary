import request from 'supertest';
import { createApp } from '../src/app';

describe('Express Backend Services & Validation Integration Tests', () => {
  const app = createApp();

  describe('Product Engine & Discovery Services', () => {
    it('GET /api/products returns verified product models with pagination metadata', async () => {
      const res = await request(app).get('/api/products?page=1&limit=10');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.meta.totalPages).toBeGreaterThanOrEqual(1);
    });

    it('GET /api/products/:slug returns verified single product specifications', async () => {
      const res = await request(app).get('/api/products/pjc-14076');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.modelNumber).toBe('PJC 14076');
      expect(res.body.data.specifications.length).toBeGreaterThan(0);
    });

    it('GET /api/products/:slug returns 404 for unverified non-existent product', async () => {
      const res = await request(app).get('/api/products/fake-non-existent-machine-model');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/products/compare returns compared machines matrix', async () => {
      const res = await request(app).get('/api/products/compare?ids=PJC-14076,PCC-2000');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.comparedCount).toBe(2);
      expect(Array.isArray(res.body.data.machines)).toBe(true);
      expect(Array.isArray(res.body.data.attributesComparison)).toBe(true);
    });

    it('POST /api/products/finder returns rule-based equipment matches', async () => {
      const res = await request(app)
        .post('/api/products/finder')
        .send({
          industry: 'Aggregates & Quarrying',
          material: 'Granite',
          requiredCapacity: 400,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].matchReason).toBeDefined();
    });
  });

  describe('B2B Quote Validation & Processing', () => {
    it('POST /api/quote-enquiries validates payload and generates tracking ID', async () => {
      const validPayload = {
        name: 'Suresh Reddy',
        company: 'Deccan Crushing & Quarrying Pvt Ltd',
        phone: '+91 98480 12345',
        email: 'suresh@deccanquarry.com',
        state: 'Telangana',
        city: 'Hyderabad',
        industry: 'Aggregates & Quarrying',
        application: 'Granite Aggregate Production',
        productCategory: 'crushers',
        productModel: 'PJC 14076',
        requiredCapacityTPH: 400,
      };

      const res = await request(app).post('/api/quote-enquiries').send(validPayload);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toMatch(/^PZQ-\d{4}-\d{6}$/);
      expect(res.body.data.status).toBe('RECEIVED');
    });

    it('POST /api/quote-enquiries returns 422 with field errors when invalid payload is submitted', async () => {
      const invalidPayload = {
        name: 'S', // too short
        email: 'invalid-email',
      };

      const res = await request(app).post('/api/quote-enquiries').send(invalidPayload);
      expect(res.status).toBe(422);
      expect(res.body.success).toBe(false);
      expect(Array.isArray(res.body.errors)).toBe(true);
      expect(res.body.errors.some((err: { field: string }) => err.field === 'email')).toBe(true);
    });
  });

  describe('Content & Statistics Verification (Issue 1)', () => {
    it('GET /api/statistics only returns non-zero verified metrics', async () => {
      const res = await request(app).get('/api/statistics');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      res.body.data.forEach((stat: { value: number; label: string }) => {
        expect(stat.value).toBeGreaterThan(0);
        expect(stat.label).toBeDefined();
      });
    });
  });
});
