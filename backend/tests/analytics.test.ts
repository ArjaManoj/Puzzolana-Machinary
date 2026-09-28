import request from 'supertest';
import { createApp } from '../src/app';
import { AuthService, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASS } from '../src/services/authService';
import { AnalyticsService } from '../src/services/analyticsService';

describe('Analytics & Telemetry Subsystem Integration Tests', () => {
  const app = createApp();
  let adminToken = '';
  let editorToken = '';

  beforeAll(async () => {
    await AuthService.seedInitialAdmin();

    const adminRes = await request(app).post('/api/admin/login').send({
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASS,
    });
    adminToken = adminRes.body?.data?.token;

    const editorRes = await request(app).post('/api/admin/login').send({
      email: 'editor@puzzolana.com',
      password: 'Editor@2026',
    });
    editorToken = editorRes.body?.data?.token;
  });

  beforeEach(() => {
    AnalyticsService.clearEvents();
  });

  describe('Public Telemetry Ingestion (POST /api/analytics/event)', () => {
    it('successfully records a valid page_view event with IP hashing', async () => {
      const res = await request(app)
        .post('/api/analytics/event')
        .send({
          eventType: 'page_view',
          path: '/products/crushers/pjc-14076',
          metadata: { category: 'crushers', model: 'PJC 14076' },
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();

      const live = AnalyticsService.getLiveEventStream(10);
      expect(live.length).toBe(1);
      expect(live[0].eventType).toBe('page_view');
      expect(live[0].path).toBe('/products/crushers/pjc-14076');
      expect(live[0].ipHash).toBeDefined();
    });

    it('successfully records search and finder_run events', async () => {
      await request(app).post('/api/analytics/event').send({
        eventType: 'search',
        path: '/search?q=Cone+Crusher',
        metadata: { query: 'Cone Crusher', resultsCount: 6 },
      });

      await request(app).post('/api/analytics/event').send({
        eventType: 'finder_run',
        path: '/finder',
        metadata: { rockType: 'Basalt', capacityTPH: 450 },
      });

      const live = AnalyticsService.getLiveEventStream(10);
      expect(live.length).toBe(2);
      expect(live.some((e) => e.eventType === 'search')).toBe(true);
      expect(live.some((e) => e.eventType === 'finder_run')).toBe(true);
    });

    it('rejects invalid eventType with 400 Bad Request', async () => {
      const res = await request(app)
        .post('/api/analytics/event')
        .send({
          eventType: 'unsupported_fake_event_type',
          path: '/test',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('rejects event with missing path with 400 Bad Request', async () => {
      const res = await request(app)
        .post('/api/analytics/event')
        .send({
          eventType: 'page_view',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('Protected Operations Command Telemetry (GET /api/analytics/metrics & funnel)', () => {
    it('rejects unauthenticated requests with 401', async () => {
      const res = await request(app).get('/api/analytics/metrics');
      expect(res.status).toBe(401);
    });

    it('returns aggregated metrics with top models and search keywords for Editor role', async () => {
      const res = await request(app)
        .get('/api/analytics/metrics')
        .set('Authorization', `Bearer ${editorToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.overview).toBeDefined();
      expect(res.body.data.overview.pageViews).toBeGreaterThan(0);
      expect(Array.isArray(res.body.data.topViewedModels)).toBe(true);
      expect(res.body.data.topViewedModels.length).toBeGreaterThan(0);
      expect(Array.isArray(res.body.data.topRawMaterialsQueried)).toBe(true);
      expect(Array.isArray(res.body.data.topSearchKeywords)).toBe(true);
    });

    it('returns 4-stage conversion funnel for Admin role', async () => {
      const res = await request(app)
        .get('/api/analytics/funnel')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.stages).toHaveLength(4);
      expect(res.body.data.stages[0].stage).toContain('Discovery');
      expect(res.body.data.stages[3].stage).toContain('B2B Conversion');
      expect(res.body.data.conversionRatePct).toBeGreaterThan(0);
    });

    it('returns live event stream for authorized user', async () => {
      // Record a test event
      await request(app).post('/api/analytics/event').send({
        eventType: 'quote_submit',
        path: '/quote',
        metadata: { category: 'crushers', capacityTPH: 600 },
      });

      const res = await request(app)
        .get('/api/analytics/live?limit=10')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
      expect(res.body.data[0].eventType).toBe('quote_submit');
    });
  });
});
