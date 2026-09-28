import {
  ProductModel,
  QuoteEnquiryModel,
  StatisticModel,
  UserModel,
  ProductCategoryModel,
} from '../src/models';

describe('MongoDB Mongoose Schemas & Validation Tests', () => {
  describe('Product Schema Validation', () => {
    it('should instantiate a valid Machinery Product with grouped specs', () => {
      const product = new ProductModel({
        productId: 'PJC-14076',
        name: 'Primary Jaw Crusher PJC 14076',
        slug: 'pjc-14076',
        category: 'crushers',
        categoryName: 'Crushers',
        subcategory: 'Jaw Crushers',
        productFamily: 'PJC Heavy Duty Series',
        modelNumber: 'PJC 14076',
        shortDescription: 'Heavy-duty primary jaw crusher.',
        fullDescription: 'Detailed engineering overview of PJC 14076.',
        primaryImage: '/images/products/pjc-14076.png',
        capacityMinTPH: 350,
        capacityMaxTPH: 600,
        maxFeedSizeMM: 850,
        powerRatingKW: 160,
        specifications: [
          {
            groupName: 'General',
            specifications: [{ name: 'Feed Opening', value: '1400 x 760', unit: 'mm' }],
          },
        ],
        status: 'published',
      });

      const err = product.validateSync();
      expect(err).toBeUndefined();
      expect(product.capacityMinTPH).toBe(350);
      expect(product.specifications[0].groupName).toBe('General');
    });

    it('should fail validation when required product fields are missing', () => {
      const product = new ProductModel({});
      const err = product.validateSync();
      expect(err).toBeDefined();
      expect(err?.errors['productId']).toBeDefined();
      expect(err?.errors['name']).toBeDefined();
      expect(err?.errors['slug']).toBeDefined();
    });
  });

  describe('QuoteEnquiry Schema Validation', () => {
    it('should validate QuoteEnquiry with initial timeline', () => {
      const enquiry = new QuoteEnquiryModel({
        referenceId: 'PZQ-2026-987654',
        name: 'Vikram Singh',
        company: 'Infra Mining Corp',
        phone: '+91 9876543210',
        email: 'vikram@inframining.com',
        state: 'Telangana',
        city: 'Hyderabad',
        industry: 'Mining & Mineral Processing',
        application: 'Iron Ore Beneficiation',
        productCategory: 'crushers',
        timeline: [
          {
            stage: 'RECEIVED',
            label: 'Enquiry Received',
            completed: true,
          },
        ],
      });

      const err = enquiry.validateSync();
      expect(err).toBeUndefined();
      expect(enquiry.status).toBe('RECEIVED');
      expect(enquiry.timeline[0].stage).toBe('RECEIVED');
    });
  });

  describe('Statistic Schema Validation (Issue 1)', () => {
    it('should reject non-positive/zero statistic value', () => {
      const stat = new StatisticModel({
        key: 'invalid_zero_stat',
        value: 0, // Should fail min: 1 constraint
        label: 'Zero Stat Test',
        source: 'Test Source',
        lastUpdatedDate: '2026-01-01',
      });

      const err = stat.validateSync();
      expect(err).toBeDefined();
      expect(err?.errors['value']).toBeDefined();
    });

    it('should accept valid verified statistic with positive value', () => {
      const stat = new StatisticModel({
        key: 'experience_years',
        value: 50,
        suffix: '+',
        label: 'Years of Experience',
        source: 'Corporate Heritage Records',
        lastUpdatedDate: '2026-01-15',
      });

      const err = stat.validateSync();
      expect(err).toBeUndefined();
    });
  });

  describe('User Schema Validation', () => {
    it('should normalize email to lowercase and set default editor role', () => {
      const user = new UserModel({
        email: 'ENGINEER@PUZZOLANA.COM',
        passwordHash: '$2a$10$abcdefghijklmnopqrstuvwxyz123456',
        name: 'Lead Engineer',
      });

      expect(user.email).toBe('engineer@puzzolana.com');
      expect(user.role).toBe('editor');
      expect(user.isActive).toBe(true);
    });
  });
});
