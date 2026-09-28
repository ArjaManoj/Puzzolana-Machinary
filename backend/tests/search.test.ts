import request from 'supertest';
import { createApp } from '../src/app';

describe('Global Enterprise Search Engine Integration Tests', () => {
  const app = createApp();

  describe('GET /api/search - Unified Multi-Domain Search', () => {
    it('returns empty result set with suggested keywords when query is blank', async () => {
      const res = await request(app).get('/api/search');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.totalHits).toBe(0);
      expect(Array.isArray(res.body.data.results)).toBe(true);
      expect(res.body.data.suggestedKeywords.length).toBeGreaterThan(0);
    });

    it('finds verified machinery models by model number (PJC-14076)', async () => {
      const res = await request(app).get('/api/search?q=PJC-14076');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.totalHits).toBeGreaterThan(0);
      
      const productMatch = res.body.data.results.find((r: any) => r.category === 'products');
      expect(productMatch).toBeDefined();
      expect(productMatch.title).toMatch(/PJC[\s\-]14076/i);
      expect(productMatch.url).toContain('/products/');
      expect(productMatch.specs).toBeDefined();
      expect(productMatch.specs.capacity).toBeDefined();
    });

    it('filters search results by category (e.g. case-studies)', async () => {
      const res = await request(app).get('/api/search?q=Granite&category=case-studies');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.results.every((r: any) => r.category === 'case-studies')).toBe(true);
    });

    it('performs cross-domain matching for complex industrial queries (M-Sand)', async () => {
      const res = await request(app).get('/api/search?q=M-Sand');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.totalHits).toBeGreaterThan(0);
      
      // Should have category counts breakdown
      expect(res.body.data.categoryCounts).toBeDefined();
      expect(res.body.data.categoryCounts.all).toBeGreaterThan(0);
    });

    it('finds metallurgy wear parts and articles for Mn18Cr2 query', async () => {
      const res = await request(app).get('/api/search?q=Mn18Cr2');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.totalHits).toBeGreaterThan(0);
      
      const hasSparesOrArticle = res.body.data.results.some(
        (r: any) => r.category === 'spares' || r.category === 'articles'
      );
      expect(hasSparesOrArticle).toBe(true);
    });

    it('filters machinery by mobility type (TRACK_MOUNTED)', async () => {
      const res = await request(app).get('/api/search?q=Crusher&mobility=TRACK_MOUNTED');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      
      const products = res.body.data.results.filter((r: any) => r.category === 'products');
      if (products.length > 0) {
        expect(products.every((p: any) => p.badge === 'Track Mobile')).toBe(true);
      }
    });
  });

  describe('GET /api/search/suggestions - Typeahead Engine', () => {
    it('returns popular keywords and flagship machines when query is empty', async () => {
      const res = await request(app).get('/api/search/suggestions');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.popularKeywords.length).toBeGreaterThan(0);
      expect(res.body.data.recommendedProducts.length).toBeGreaterThan(0);
    });

    it('returns matching suggestions when query prefix is provided', async () => {
      const res = await request(app).get('/api/search/suggestions?q=PCC');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.products)).toBe(true);
      expect(res.body.data.products.some((p: any) => p.modelNumber.includes('PCC'))).toBe(true);
    });
  });
});
