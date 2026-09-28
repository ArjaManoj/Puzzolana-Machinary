// Shared TypeScript types for Puzzolana Platform

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type MachineCategory =
  | 'crushers'
  | 'feeders-and-screens'
  | 'classifiers'
  | 'mobile-crushers'
  | 'semi-mobile'
  | 'mining'
  | 'waste-processing'
  | 'road-building';

export interface TechnicalSpecificationItem {
  label: string;
  value: string | number;
  unit?: string;
  group: 'General' | 'Capacity' | 'Dimensions' | 'Power' | 'Performance' | 'Feed' | 'Output' | 'Configuration' | 'Safety';
}

export interface ProductSummary {
  id: string;
  name: string;
  slug: string;
  category: MachineCategory;
  subcategory: string;
  productFamily: string;
  modelNumber: string;
  shortDescription: string;
  primaryImage: string;
  capacityRange: string;
  powerRating: string;
  feedSizeMax: string;
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived';
}

export interface CompanyStatistic {
  key: string;
  value: number;
  suffix?: string;
  label: string;
  source: string;
  lastUpdated: string;
  isActive: boolean;
}
