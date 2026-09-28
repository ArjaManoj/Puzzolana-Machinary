import request from 'supertest';
import { createApp } from '../src/app';
import { AuthService, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASS } from '../src/services/authService';

describe('Authentication & RBAC Security Suite', () => {
  const app = createApp();
  let adminToken = '';
  let editorToken = '';

  beforeAll(async () => {
    // 0. Seed accounts
    await AuthService.seedInitialAdmin();

    // 1. Authenticate as Admin
    const adminRes = await request(app).post('/api/admin/login').send({
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASS,
    });
    adminToken = adminRes.body?.data?.token;

    // 2. Authenticate as Editor
    const editorRes = await request(app).post('/api/admin/login').send({
      email: 'editor@puzzolana.com',
      password: 'Editor@2026',
    });
    editorToken = editorRes.body?.data?.token;
  });

  describe('POST /api/admin/login', () => {
    it('should authenticate valid admin and return signed JWT', async () => {
      const res = await request(app).post('/api/admin/login').send({
        email: DEFAULT_ADMIN_EMAIL,
        password: DEFAULT_ADMIN_PASS,
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.token).toBeDefined();
      expect(res.body.data.user.role).toBe('admin');
      expect(res.body.data.user.email).toBe(DEFAULT_ADMIN_EMAIL.toLowerCase());
    });

    it('should reject invalid password with 401 Unauthorized', async () => {
      const res = await request(app).post('/api/admin/login').send({
        email: DEFAULT_ADMIN_EMAIL,
        password: 'IncorrectPassword123!',
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('should reject non-existent user with 401 Unauthorized', async () => {
      const res = await request(app).post('/api/admin/login').send({
        email: 'ghost_user@puzzolana.com',
        password: 'SomePassword123',
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('JWT Bearer Protection on Admin Routes', () => {
    it('GET /api/admin/me should return 401 when token is missing', async () => {
      const res = await request(app).get('/api/admin/me');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/admin/me should return 401 when token is forged or invalid', async () => {
      const res = await request(app)
        .get('/api/admin/me')
        .set('Authorization', 'Bearer invalid_forged_token_string');

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/admin/me should return 200 and user profile with valid Bearer token', async () => {
      const res = await request(app)
        .get('/api/admin/me')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe(DEFAULT_ADMIN_EMAIL.toLowerCase());
    });
  });

  describe('Role-Based Access Control (RBAC)', () => {
    it('Editor role should be able to view KPIs', async () => {
      const res = await request(app)
        .get('/api/admin/kpis')
        .set('Authorization', `Bearer ${editorToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('Editor role should be forbidden (403) from deleting products (Admin-only)', async () => {
      const res = await request(app)
        .delete('/api/admin/products/PJC-14076')
        .set('Authorization', `Bearer ${editorToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Insufficient permissions');
    });

    it('Admin role should be authorized to delete products', async () => {
      const res = await request(app)
        .delete('/api/admin/products/PJC-14076')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('Editor role should be able to fetch content lists', async () => {
      const res = await request(app)
        .get('/api/admin/content?type=articles')
        .set('Authorization', `Bearer ${editorToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('Editor role should be forbidden (403) from deleting content items', async () => {
      const res = await request(app)
        .delete('/api/admin/content/articles/art-01')
        .set('Authorization', `Bearer ${editorToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('Admin role should be able to delete content items', async () => {
      const res = await request(app)
        .delete('/api/admin/content/articles/art-01')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
