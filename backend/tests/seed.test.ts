import { COMPREHENSIVE_PUZZOLANA_CATALOG } from '../src/config/seedData';
import { VERIFIED_CATEGORIES } from '../src/services/categoryService';
import { VERIFIED_STATISTICS } from '../src/services/contentService';

describe('Puzzolana Verified Database Seed Quality Assurance', () => {
  describe('Official Product Categories Verification (Spec Section 5)', () => {
    const expectedCategorySlugs = [
      'crushers',
      'feeders-and-screens',
      'classifiers',
      'mobile-crushers',
      'semi-mobile',
      'mining',
      'waste-processing',
      'road-building',
    ];

    it('should contain all 8 official verified product categories', () => {
      const categorySlugs = VERIFIED_CATEGORIES.map((c) => c.slug);
      expectedCategorySlugs.forEach((expectedSlug) => {
        expect(categorySlugs).toContain(expectedSlug);
      });
      expect(VERIFIED_CATEGORIES.length).toBe(8);
    });

    it('every category must have a non-empty name and description', () => {
      VERIFIED_CATEGORIES.forEach((cat) => {
        expect(cat.name.length).toBeGreaterThan(2);
        expect(cat.shortDescription.length).toBeGreaterThan(10);
        expect(cat.isActive).toBe(true);
      });
    });
  });

  describe('Comprehensive Machinery Product Models Verification (Spec Section 6)', () => {
    it('should have verified products across multiple equipment categories', () => {
      expect(COMPREHENSIVE_PUZZOLANA_CATALOG.length).toBeGreaterThanOrEqual(10);
    });

    it('every product must have non-zero capacity, max feed size, and power rating', () => {
      COMPREHENSIVE_PUZZOLANA_CATALOG.forEach((prod) => {
        expect(prod.productId).toBeDefined();
        expect(prod.name).toBeDefined();
        expect(prod.slug).toBeDefined();
        expect(prod.category).toBeDefined();
        expect(prod.productFamily).toBeDefined();
        expect(prod.modelNumber).toBeDefined();
        expect(prod.capacityMinTPH).toBeGreaterThan(0);
        expect(prod.capacityMaxTPH).toBeGreaterThanOrEqual(prod.capacityMinTPH);
        expect(prod.maxFeedSizeMM).toBeGreaterThan(0);
        expect(prod.powerRatingKW).toBeGreaterThan(0);
        expect(prod.status).toBe('published');
      });
    });

    it('every product must have structured specification groups', () => {
      COMPREHENSIVE_PUZZOLANA_CATALOG.forEach((prod) => {
        expect(Array.isArray(prod.specifications)).toBe(true);
        expect(prod.specifications.length).toBeGreaterThan(0);
        prod.specifications.forEach((group) => {
          expect(group.groupName).toBeDefined();
          expect(group.specifications.length).toBeGreaterThan(0);
          group.specifications.forEach((spec) => {
            expect(spec.name).toBeDefined();
            expect(spec.value).toBeDefined();
          });
        });
      });
    });
  });

  describe('Company Statistics Engine Zero-Suppression (Spec Issue 1)', () => {
    it('every verified statistic must have a strictly positive non-zero value and source', () => {
      VERIFIED_STATISTICS.forEach((stat) => {
        expect(stat.value).toBeGreaterThan(0);
        expect(stat.source.length).toBeGreaterThan(3);
        expect(stat.lastUpdatedDate).toBeDefined();
        expect(stat.isActive).toBe(true);
      });
    });
  });
});
