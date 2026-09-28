import request from 'supertest';
import { createApp } from '../src/app';

describe('Product APIs & Search Integration Test Suite', () => {
  const app = createApp();

  describe('GET /api/products/search', () => {
    it('should search products by model number string', async () => {
      const res = await request(app).get('/api/products/search?q=PJC');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data.some((p: { modelNumber: string }) => p.modelNumber.includes('PJC'))).toBe(true);
    });

    it('should search products by raw material handling', async () => {
      const res = await request(app).get('/api/products/search?q=Granite');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 400 when search query string is missing', async () => {
      const res = await request(app).get('/api/products/search');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/products/featured', () => {
    it('should return featured flagship machinery', async () => {
      const res = await request(app).get('/api/products/featured');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/products/related/:slug', () => {
    it('should return compatible downstream machinery for jaw crusher', async () => {
      const res = await request(app).get('/api/products/related/pjc-14076');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('GET /api/products/compare', () => {
    it('should return aligned comparison matrix when 2 valid machines are selected', async () => {
      const res = await request(app).get('/api/products/compare?ids=PJC-14076,PCC-2000');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.comparedCount).toBe(2);
      expect(Array.isArray(res.body.data.attributesComparison)).toBe(true);
      expect(res.body.data.attributesComparison.length).toBeGreaterThan(4);
    });

    it('should reject comparison request with fewer than 2 machines', async () => {
      const res = await request(app).get('/api/products/compare?ids=PJC-14076');
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/products sorting and mobility filtering', () => {
    it('should filter only Track-Mounted machines', async () => {
      const res = await request(app).get('/api/products?mobility=Track-Mounted');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      res.body.data.forEach((p: { mobilityType: string }) => {
        expect(p.mobilityType).toBe('Track-Mounted');
      });
    });

    it('should sort products by capacity ascending', async () => {
      const res = await request(app).get('/api/products?sortBy=capacity_asc');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      const data = res.body.data;
      if (data.length > 1) {
        expect(data[0].capacityMaxTPH).toBeLessThanOrEqual(data[1].capacityMaxTPH);
      }
    });
  });
});
