import { z } from 'zod';

export const machineFinderSchema = z.object({
  industry: z.string().optional(),
  application: z.string().optional(),
  material: z.string().optional(),
  category: z.string().optional(),
  requiredCapacity: z.number().positive().optional(),
  mobility: z.enum(['Stationary', 'Track-Mounted', 'Wheel-Mounted', 'Skid-Mounted', 'Any']).optional(),
});

export const adminProductCreateSchema = z.object({
  productId: z.string().min(2, 'Product ID is required'),
  name: z.string().min(2, 'Product Name is required'),
  slug: z.string().min(2, 'Product slug is required'),
  category: z.string().min(2, 'Category is required'),
  categoryName: z.string().min(2, 'Category Name is required'),
  subcategory: z.string().min(2, 'Subcategory is required'),
  productFamily: z.string().min(2, 'Product Family is required'),
  modelNumber: z.string().min(2, 'Model Number is required'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 chars'),
  fullDescription: z.string().min(20, 'Full description must be at least 20 chars'),
  primaryImage: z.string().min(1, 'Primary image is required'),
  capacityMinTPH: z.number().nonnegative(),
  capacityMaxTPH: z.number().nonnegative(),
  maxFeedSizeMM: z.number().nonnegative(),
  powerRatingKW: z.number().nonnegative(),
  dischargeSizeMM: z.string().optional(),
  mobilityType: z.enum(['Stationary', 'Track-Mounted', 'Wheel-Mounted', 'Skid-Mounted']).default('Stationary'),
  applications: z.array(z.string()).default([]),
  materialsHandled: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  specifications: z.array(
    z.object({
      groupName: z.enum(['General', 'Capacity', 'Dimensions', 'Power', 'Performance', 'Feed & Output', 'Configuration', 'Safety']),
      specifications: z.array(
        z.object({
          name: z.string(),
          value: z.string(),
          unit: z.string().optional(),
        })
      ),
    })
  ).default([]),
  status: z.enum(['draft', 'review', 'approved', 'published', 'archived']).default('draft'),
});

export const adminProductUpdateSchema = adminProductCreateSchema.partial();
