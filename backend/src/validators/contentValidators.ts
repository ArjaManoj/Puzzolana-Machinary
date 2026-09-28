import { z } from 'zod';

export const adminArticleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().optional(),
  type: z.enum(['blog', 'article', 'csr', 'news']).default('article'),
  author: z.string().default('Puzzolana Engineering Bureau'),
  category: z.string().min(2, 'Category is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  featuredImage: z.string().url().or(z.string().min(1)).default('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'),
  tags: z.array(z.string()).default([]),
  readTimeMinutes: z.number().min(1, 'Read time must be at least 1 minute').default(5),
  isPublished: z.boolean().default(true),
});

export const adminCaseStudySchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().optional(),
  clientName: z.string().optional(),
  location: z.string().min(2, 'Location is required'),
  state: z.string().min(2, 'State is required'),
  country: z.string().default('India'),
  industry: z.string().min(2, 'Industry is required'),
  application: z.string().min(2, 'Application is required'),
  plantCapacityTPH: z.number().min(1, 'Plant Capacity (TPH) must be strictly positive and non-zero (>0)'),
  equipmentSupplied: z.array(z.string()).default([]),
  featuredImage: z.string().url().or(z.string().min(1)).default('https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80'),
  challenge: z.string().min(10, 'Challenge description is required'),
  solution: z.string().min(10, 'Solution description is required'),
  results: z.array(z.string()).min(1, 'At least one verified result is required'),
  yearOfInstallation: z.number().optional(),
  isPublished: z.boolean().default(true),
});

export const adminEventSchema = z.object({
  name: z.string().min(3, 'Event name is required'),
  slug: z.string().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  location: z.string().min(2, 'Location is required'),
  country: z.string().default('India'),
  venue: z.string().min(2, 'Venue is required'),
  boothNumber: z.string().optional(),
  description: z.string().min(10, 'Description is required'),
  bannerImage: z.string().url().or(z.string().min(1)).default('https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80'),
  registrationUrl: z.string().optional(),
  status: z.enum(['upcoming', 'ongoing', 'past']).default('upcoming'),
  isPublished: z.boolean().default(true),
});

export const adminDownloadSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().optional(),
  category: z.enum(['Brochure', 'Datasheet', 'Technical Catalogue', 'Manual', 'Certificate']).default('Brochure'),
  productCategory: z.string().optional(),
  productModel: z.string().optional(),
  fileUrl: z.string().min(1, 'File URL is required'),
  fileSizeBytes: z.number().default(1048576),
  fileExtension: z.string().default('PDF'),
  isActive: z.boolean().default(true),
});
