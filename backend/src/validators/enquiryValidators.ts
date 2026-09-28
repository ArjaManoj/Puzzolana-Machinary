import { z } from 'zod';

export const quoteEnquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  designation: z.string().optional(),
  phone: z.string().min(8, 'Valid phone number is required'),
  email: z.string().email('Valid email address is required'),
  country: z.string().min(2, 'Country is required').default('India'),
  state: z.string().min(2, 'State is required'),
  city: z.string().min(2, 'City is required'),
  industry: z.string().min(2, 'Industry is required'),
  application: z.string().min(2, 'Application is required'),
  productCategory: z.string().min(2, 'Product category is required'),
  productModel: z.string().optional(),
  requiredQuantity: z.number().int().positive().default(1),
  requiredCapacityTPH: z.number().positive().optional(),
  feedMaterial: z.string().optional(),
  message: z.string().max(2000, 'Message cannot exceed 2000 characters').optional(),
});

export const serviceEnquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company is required'),
  phone: z.string().min(8, 'Phone is required'),
  email: z.string().email('Valid email is required'),
  location: z.string().min(2, 'Plant location is required'),
  machineModel: z.string().min(2, 'Machine model is required'),
  machineSerialNumber: z.string().optional(),
  serviceType: z.enum(['Routine Maintenance', 'Emergency Breakdown', 'Commissioning Support', 'Operational Training']),
  description: z.string().min(10, 'Please provide a detailed issue description (min 10 characters)'),
});

export const sparePartsEnquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company is required'),
  phone: z.string().min(8, 'Phone is required'),
  email: z.string().email('Valid email is required'),
  location: z.string().min(2, 'Location is required'),
  machineModel: z.string().min(2, 'Machine model is required'),
  machineSerialNumber: z.string().optional(),
  partName: z.string().min(2, 'Part name or description is required'),
  partNumber: z.string().optional(),
  quantity: z.number().int().positive().default(1),
  urgencyLevel: z.enum(['Normal', 'Urgent', 'Breakdown']).default('Normal'),
  description: z.string().optional(),
});

export const dealerEnquirySchema = z.object({
  name: z.string().min(2, 'Contact person name is required'),
  company: z.string().min(2, 'Company name is required'),
  phone: z.string().min(8, 'Phone number is required'),
  email: z.string().email('Valid email address is required'),
  country: z.string().min(2, 'Country is required'),
  state: z.string().min(2, 'State is required'),
  city: z.string().min(2, 'City is required'),
  businessType: z.string().min(2, 'Business type is required'),
  productInterest: z.array(z.string()).min(1, 'Please select at least one product category of interest'),
  existingBusinessDetails: z.string().min(10, 'Please describe your current business operations'),
  message: z.string().optional(),
});

export const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  company: z.string().optional(),
  phone: z.string().min(8, 'Phone is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredOffice: z.string().optional(),
});

export const jobApplicationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(8, 'Phone is required'),
  positionApplied: z.string().min(2, 'Position applied is required'),
  department: z.enum(['Mechanical Engineering', 'Manufacturing & Assembly', 'Service & Field Support', 'Corporate & Sales', 'R&D']),
  experienceYears: z.number().min(0, 'Experience years must be positive'),
  currentCompany: z.string().optional(),
  noticePeriodDays: z.number().int().nonnegative().default(30),
  resumeUrl: z.string().url('Valid resume URL or document link is required'),
  coverNote: z.string().optional(),
});
