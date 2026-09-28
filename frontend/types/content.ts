export interface ApplicationDomain {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  challenges: string[];
  solutions: string[];
  recommendedCategories: string[];
  processFlowSteps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName?: string;
  location: string;
  industry: string;
  application: string;
  plantCapacityTPH: number;
  equipmentSupplied: string[];
  featuredImage: string;
  challenge: string;
  solution: string;
  results: string[];
  publishedAt: string;
}

export interface CompanyStatisticRecord {
  key: string;
  value: number;
  suffix?: string;
  label: string;
  source: string;
  lastUpdated: string;
  isActive: boolean;
}
