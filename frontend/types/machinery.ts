export type EquipmentCategorySlug =
  | 'crushers'
  | 'feeders-and-screens'
  | 'classifiers'
  | 'mobile-crushers'
  | 'semi-mobile'
  | 'mining'
  | 'waste-processing'
  | 'road-building';

export interface TechnicalSpecificationGroup {
  groupName: 'General' | 'Capacity' | 'Dimensions' | 'Power' | 'Performance' | 'Feed & Output' | 'Configuration' | 'Safety';
  specifications: Array<{
    name: string;
    value: string;
    unit?: string;
  }>;
}

export interface MachineryProduct {
  id: string;
  name: string;
  slug: string;
  category: EquipmentCategorySlug;
  categoryName: string;
  subcategory: string;
  productFamily: string;
  modelNumber: string;
  shortDescription: string;
  fullDescription: string;
  primaryImage: string;
  galleryImages: string[];
  capacityMinTPH: number;
  capacityMaxTPH: number;
  maxFeedSizeMM: number;
  powerRatingKW: number;
  dischargeSizeMM: string;
  mobilityType: 'Stationary' | 'Track-Mounted' | 'Wheel-Mounted' | 'Skid-Mounted';
  applications: string[];
  materialsHandled: string[];
  features: string[];
  benefits: string[];
  specifications: TechnicalSpecificationGroup[];
  brochureUrl?: string;
  datasheetUrl?: string;
  model3dUrl?: string;
  videoUrl?: string;
  relatedProductSlugs: string[];
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived';
}
