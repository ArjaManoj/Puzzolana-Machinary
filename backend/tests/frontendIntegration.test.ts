import { VERIFIED_FRONTEND_PRODUCTS, OFFICIAL_CATEGORIES } from '../../frontend/lib/seedCatalog';
import { generateProductSchema, generateBreadcrumbSchema, generateOrganizationSchema } from '../../frontend/lib/seo';

describe('Frontend Integration & Business Logic Tests', () => {
  describe('Catalog Zero-Suppression & Integrity', () => {
    it('should have 8 verified machinery categories', () => {
      expect(OFFICIAL_CATEGORIES.length).toBe(8);
      const categoryIds = OFFICIAL_CATEGORIES.map((c) => c.id);
      expect(categoryIds).toContain('crushers');
      expect(categoryIds).toContain('feeders-and-screens');
      expect(categoryIds).toContain('classifiers');
      expect(categoryIds).toContain('mobile-crushers');
      expect(categoryIds).toContain('semi-mobile');
      expect(categoryIds).toContain('mining');
      expect(categoryIds).toContain('waste-processing');
      expect(categoryIds).toContain('road-building');
    });

    it('should strictly enforce positive (> 0) capacity, power, and feed sizes across all seed machinery', () => {
      expect(VERIFIED_FRONTEND_PRODUCTS.length).toBeGreaterThan(10);

      for (const machine of VERIFIED_FRONTEND_PRODUCTS) {
        expect(machine.capacityMinTPH).toBeGreaterThan(0);
        expect(machine.capacityMaxTPH).toBeGreaterThanOrEqual(machine.capacityMinTPH);
        expect(machine.powerRatingKW).toBeGreaterThan(0);
        expect(machine.maxFeedSizeMM).toBeGreaterThan(0);
        expect(machine.slug.length).toBeGreaterThan(2);
        expect(machine.features.length).toBeGreaterThan(0);
      }
    });
  });

  describe('SEO & Schema.org JSON-LD Generators', () => {
    it('should generate valid Schema.org Product structured data', () => {
      const sampleMachine = VERIFIED_FRONTEND_PRODUCTS[0];
      const jsonLd: any = generateProductSchema(sampleMachine);

      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBe('Product');
      expect(jsonLd.name).toBe(sampleMachine.name);
      expect(jsonLd.model).toBe(sampleMachine.modelNumber);
      expect(jsonLd.brand.name).toBe('Puzzolana');
    });

    it('should generate valid BreadcrumbList structured data', () => {
      const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Products', url: '/products' },
        { name: 'Crushers', url: '/products/crushers' },
      ];

      const jsonLd: any = generateBreadcrumbSchema(breadcrumbs);

      expect(jsonLd['@type']).toBe('BreadcrumbList');
      expect(jsonLd.itemListElement.length).toBe(3);
      expect(jsonLd.itemListElement[0].item).toBe('https://puzzolana.com/');
    });

    it('should generate valid Organization structured data', () => {
      const orgJsonLd: any = generateOrganizationSchema();

      expect(orgJsonLd['@type']).toBe('Organization');
      expect(orgJsonLd.name).toContain('Puzzolana');
      expect(orgJsonLd.url).toBe('https://puzzolana.com');
    });
  });
});
