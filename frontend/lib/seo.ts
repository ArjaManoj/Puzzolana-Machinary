/**
 * Schema.org JSON-LD Structured Data Generators for Puzzolana Machinery OEM
 */

export const PUZZOLANA_BASE_URL = 'https://puzzolana.com';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${PUZZOLANA_BASE_URL}/#organization`,
    name: 'Puzzolana Machinery Fabricators (Hyderabad) Pvt. Ltd.',
    alternateName: 'Puzzolana Machinery',
    url: PUZZOLANA_BASE_URL,
    logo: `${PUZZOLANA_BASE_URL}/images/puzzolana-logo.png`,
    description:
      'Global OEM pioneer in crushing, screening, grinding, sand washing, surface mining, and asphalt road pavers with integrated cast-manganese foundry in Hyderabad, India.',
    foundingDate: '1964',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot No. 39, Phase-III, Pashamylaram Industrial Area',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '502307',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-40-23445600',
        contactType: 'sales',
        areaServed: ['IN', 'AE', 'SA', 'ZA', 'ID', 'NG', 'QA', 'OM'],
        availableLanguage: ['en', 'hi', 'te'],
      },
      {
        '@type': 'ContactPoint',
        telephone: '1800-425-2626',
        contactType: 'customer service',
        contactOption: 'TollFree',
        areaServed: 'IN',
      },
    ],
    sameAs: [
      'https://www.linkedin.com/company/puzzolana-machinery-fabricators/',
      'https://www.youtube.com/@PuzzolanaMachineryOEM',
      'https://twitter.com/PuzzolanaOEM',
    ],
  };
}

export function generateProductSchema(product: {
  id: string;
  name: string;
  modelNumber?: string;
  slug: string;
  category: string;
  categoryName?: string;
  shortDescription?: string;
  fullDescription?: string;
  primaryImage?: string;
  capacityMinTPH?: number;
  capacityMaxTPH?: number;
  powerRatingKW?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${PUZZOLANA_BASE_URL}/products/${product.category}/${product.slug}#product`,
    name: product.name,
    model: product.modelNumber || product.id,
    image: product.primaryImage || 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    description: product.shortDescription || product.fullDescription || `${product.name} industrial heavy machinery engineered by Puzzolana OEM.`,
    category: product.categoryName || product.category,
    brand: {
      '@type': 'Brand',
      name: 'Puzzolana',
      logo: `${PUZZOLANA_BASE_URL}/images/puzzolana-logo.png`,
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Puzzolana Machinery Fabricators',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: `${PUZZOLANA_BASE_URL}/products/${product.category}/${product.slug}`,
      priceValidUntil: '2026-12-31',
      seller: {
        '@type': 'Organization',
        name: 'Puzzolana Machinery OEM',
      },
    },
    additionalProperty: [
      ...(product.capacityMaxTPH
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Throughput Capacity',
              value: `${product.capacityMinTPH || ''} - ${product.capacityMaxTPH} TPH`,
            },
          ]
        : []),
      ...(product.powerRatingKW
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Drive Motor Rating',
              value: `${product.powerRatingKW} kW`,
            },
          ]
        : []),
    ],
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${PUZZOLANA_BASE_URL}${item.url}`,
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  slug: string;
  excerpt: string;
  author?: { name?: string; role?: string } | string;
  publishedDate?: string;
  category?: string;
}) {
  const authorName = typeof article.author === 'string' ? article.author : article.author?.name || 'Puzzolana Engineering Bureau';

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    url: `${PUZZOLANA_BASE_URL}/news/${article.slug}`,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    datePublished: article.publishedDate || '2026-02-15T00:00:00+05:30',
    dateModified: '2026-03-01T00:00:00+05:30',
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Puzzolana Machinery OEM',
      logo: {
        '@type': 'ImageObject',
        url: `${PUZZOLANA_BASE_URL}/images/puzzolana-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${PUZZOLANA_BASE_URL}/news/${article.slug}`,
    },
  };
}

export function generateEventSchema(event: {
  name: string;
  slug: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  city?: string;
  country?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ExhibitionEvent',
    name: event.name,
    description: event.description,
    url: `${PUZZOLANA_BASE_URL}/events`,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city || 'Bengaluru',
        addressCountry: event.country || 'India',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Puzzolana Machinery OEM',
      url: PUZZOLANA_BASE_URL,
    },
  };
}
