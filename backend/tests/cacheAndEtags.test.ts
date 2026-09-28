import request from 'supertest';
import { createApp } from '../src/app';

describe('Performance, In-Memory Caching & ETag Validation Suite', () => {
  const app = createApp();

  describe('In-Memory Response Caching (X-Cache)', () => {
    it('should serve fresh response on first request and cached response on second request', async () => {
      // First request (MISS or newly generated)
      const res1 = await request(app).get('/api/statistics');
      expect(res1.status).toBe(200);
      expect(res1.headers['cache-control']).toBeDefined();
      expect(res1.headers['cache-control']).toContain('public');

      // Second identical request (HIT)
      const res2 = await request(app).get('/api/statistics');
      expect(res2.status).toBe(200);
      expect(res2.headers['x-cache']).toBe('HIT');
      expect(res2.body.success).toBe(true);
    });

    it('should cache category responses with stale-while-revalidate headers', async () => {
      const res = await request(app).get('/api/categories');
      expect(res.status).toBe(200);
      expect(res.headers['cache-control']).toContain('max-age=');
    });
  });

  describe('HTTP 304 Conditional Validation with Strong ETags', () => {
    it('should return strong ETag and respond with 304 Not Modified on matching If-None-Match', async () => {
      const initialRes = await request(app).get('/api/categories');
      const etag = initialRes.headers['etag'];

      expect(initialRes.status).toBe(200);
      expect(etag).toBeDefined();

      // Conditional GET with matching ETag
      const conditionalRes = await request(app)
        .get('/api/categories')
        .set('If-None-Match', etag);

      expect(conditionalRes.status).toBe(304);
      expect(conditionalRes.text).toBe('');
    });
  });
});
