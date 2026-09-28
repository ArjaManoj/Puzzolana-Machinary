import request from 'supertest';
import { createApp } from '../src/app';

describe('Architecture & Route Mounting Integration Tests', () => {
  const app = createApp();

  describe('Public Discovery Endpoints', () => {
    it('GET /api/categories returns verified categories', async () => {
      const res = await request(app).get('/api/categories');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /api/products returns product query response structure', async () => {
      const res = await request(app).get('/api/products?category=crushers');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.meta).toBeDefined();
      expect(res.body.meta.page).toBe(1);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.every((p: { category: string }) => p.category === 'crushers')).toBe(true);
    });

    it('GET /api/statistics returns active verified company stats', async () => {
      const res = await request(app).get('/api/statistics');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0].value).toBeGreaterThan(0);
    });

    it('GET /api/locations returns official company facilities', async () => {
      const res = await request(app).get('/api/locations');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.some((loc: { type: string }) => loc.type === 'HEAD_OFFICE')).toBe(true);
    });
  });

  describe('B2B Enquiry & Reference ID Generation', () => {
    it('POST /api/quote-enquiries generates PZQ-YYYY-XXXXXX tracking code', async () => {
      const payload = {
        name: 'John Doe',
        company: 'Apex Infrastructure Ltd',
        phone: '+91 9876543210',
        email: 'john@apexinfra.com',
        country: 'India',
        state: 'Telangana',
        city: 'Hyderabad',
        industry: 'Aggregates & Quarrying',
        application: 'Basalt Crushing',
        productCategory: 'crushers',
      };

      const res = await request(app).post('/api/quote-enquiries').send(payload);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toMatch(/^PZQ-\d{4}-\d{6}$/);
    });

    it('GET /api/enquiries/:referenceId returns tracking timeline', async () => {
      const res = await request(app).get('/api/enquiries/PZQ-2026-123456');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.timeline).toBeDefined();
      expect(res.body.data.referenceId).toBe('PZQ-2026-123456');
    });
  });

  describe('Admin Auth Guard & Security', () => {
    it('POST /api/admin/login fails with invalid credentials', async () => {
      const res = await request(app).post('/api/admin/login').send({
        email: 'wrong@puzzolana.com',
        password: 'wrongpassword',
      });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/admin/kpis rejects unauthenticated request', async () => {
      const res = await request(app).get('/api/admin/kpis');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });
});
