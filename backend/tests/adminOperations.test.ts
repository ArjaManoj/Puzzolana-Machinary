import request from 'supertest';
import { createApp } from '../src/app';
import { AuthService, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASS } from '../src/services/authService';

describe('Admin Operations & Content Management Test Suite', () => {
  const app = createApp();
  let adminToken = '';
  let editorToken = '';

  beforeAll(async () => {
    await AuthService.seedInitialAdmin();

    const adminLogin = await request(app).post('/api/admin/login').send({
      email: DEFAULT_ADMIN_EMAIL,
      password: DEFAULT_ADMIN_PASS,
    });
    adminToken = adminLogin.body?.data?.token;

    const editorLogin = await request(app).post('/api/admin/login').send({
      email: 'editor@puzzolana.com',
      password: 'Editor@2026',
    });
    editorToken = editorLogin.body?.data?.token;
  });

  describe('Admin Product Management (CRUD & Zero-Suppression)', () => {
    let createdProductId = '';

    it('should create a new heavy industrial machine with verified specs', async () => {
      const newProductPayload = {
        productId: 'PZ-PROD-TEST-001',
        name: 'Puzzolana Super Heavy Jaw Crusher Test Edition',
        slug: 'pjc-200150-test-jaw-crusher',
        category: 'crushers',
        categoryName: 'Crushing Equipment',
        subcategory: 'Jaw Crushers',
        productFamily: 'PJC Series',
        modelNumber: 'PJC-200150-TEST',
        shortDescription: 'High-volume primary crushing station engineered for tough granite.',
        fullDescription: 'Engineered for extreme hardness granite, basalt, and iron ore operations with heavy-duty cast frame.',
        primaryImage: '/images/products/pjc-series.jpg',
        capacityMinTPH: 600,
        capacityMaxTPH: 1200,
        powerRatingKW: 250,
        maxFeedSizeMM: 1200,
        mobilityType: 'Stationary',
        status: 'published',
        features: ['Cast steel frame', 'Hydraulic gap adjustment'],
      };

      const res = await request(app)
        .post('/api/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newProductPayload);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.modelNumber).toBe('PJC-200150-TEST');
      createdProductId = res.body.data.id || res.body.data._id || res.body.data.productId;
    });

    it('should reject product creation with missing mandatory fields', async () => {
      const invalidProduct = {
        name: 'Invalid Zero Spec Crusher',
        modelNumber: 'PJC-ZERO-00',
        category: 'crushers',
      };

      const res = await request(app)
        .post('/api/admin/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(invalidProduct);

      expect(res.status).toBe(422);
      expect(res.body.success).toBe(false);
    });

    it('should update product details successfully', async () => {
      if (!createdProductId) return;

      const res = await request(app)
        .patch(`/api/admin/products/${createdProductId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          shortDescription: 'Updated high-efficiency primary crushing station.',
          status: 'draft',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should delete product when performed by Admin', async () => {
      if (!createdProductId) return;

      const res = await request(app)
        .delete(`/api/admin/products/${createdProductId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('Admin Enquiry Status Operations', () => {
    it('should update enquiry status and record operational audit', async () => {
      const res = await request(app)
        .patch('/api/admin/enquiries/PZQ-2026-000101')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: 'IN_REVIEW',
          assignedTo: 'Suresh Reddy (Senior Applications Engineer)',
          notes: 'Customer requires 2-stage jaw and cone flowsheet sizing.',
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('IN_REVIEW');
    });
  });

  describe('Admin Content Management (CMS Operations)', () => {
    let articleId = '';

    it('should allow Editor to create and publish a technical article', async () => {
      const res = await request(app)
        .post('/api/admin/content/articles')
        .set('Authorization', `Bearer ${editorToken}`)
        .send({
          title: 'Advanced Cone Crusher Automation & Cavity Level Control',
          category: 'Crushing Technology',
          summary: 'How ultrasonic sensors and variable closed side settings optimize product cubicity.',
          status: 'PUBLISHED',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      articleId = res.body.data.id;
    });

    it('should toggle publish status on content item', async () => {
      if (!articleId) return;

      const res = await request(app)
        .post(`/api/admin/content/articles/${articleId}/publish`)
        .set('Authorization', `Bearer ${editorToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should forbid Editor from deleting content (Admin-only privilege)', async () => {
      if (!articleId) return;

      const res = await request(app)
        .delete(`/api/admin/content/articles/${articleId}`)
        .set('Authorization', `Bearer ${editorToken}`);

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
    });

    it('should allow Admin to delete content', async () => {
      if (!articleId) return;

      const res = await request(app)
        .delete(`/api/admin/content/articles/${articleId}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
