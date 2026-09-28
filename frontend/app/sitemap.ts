import { MetadataRoute } from 'next';
import { VERIFIED_FRONTEND_PRODUCTS, OFFICIAL_CATEGORIES } from '@/lib/seedCatalog';
import { VERIFIED_INDUSTRY_APPLICATIONS } from '@/lib/seedApplications';
import { VERIFIED_CASE_STUDIES } from '@/lib/seedCaseStudies';
import { VERIFIED_ARTICLES } from '@/lib/seedArticles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://puzzolana.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // 1. Core Primary Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/finder`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/applications`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/quote`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/products/compare`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/downloads`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/service`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/spare-parts`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/dealers`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/case-studies`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/news`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.85 },
    { url: `${baseUrl}/events`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/sustainability`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/careers`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/search`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.7 },
  ];

  // 2. Official Product Categories
  const categoryRoutes: MetadataRoute.Sitemap = OFFICIAL_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/products/${cat.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 3. Verified Machinery Product Detail Pages
  const productRoutes: MetadataRoute.Sitemap = VERIFIED_FRONTEND_PRODUCTS.map((prod) => ({
    url: `${baseUrl}/products/${prod.category}/${prod.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. Industry Applications
  const applicationRoutes: MetadataRoute.Sitemap = VERIFIED_INDUSTRY_APPLICATIONS.map((app) => ({
    url: `${baseUrl}/applications/${app.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // 5. Turnkey Case Studies
  const caseStudyRoutes: MetadataRoute.Sitemap = VERIFIED_CASE_STUDIES.map((cs) => ({
    url: `${baseUrl}/case-studies/${cs.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // 6. Metallurgy & Technical Articles
  const articleRoutes: MetadataRoute.Sitemap = VERIFIED_ARTICLES.map((art) => ({
    url: `${baseUrl}/news/${art.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...applicationRoutes,
    ...caseStudyRoutes,
    ...articleRoutes,
  ];
}
