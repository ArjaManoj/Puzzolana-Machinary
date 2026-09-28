export interface BaseEnquiryPayload {
  name: string;
  company: string;
  designation?: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city: string;
  message?: string;
}

export interface QuoteEnquiryPayload extends BaseEnquiryPayload {
  industry: string;
  application: string;
  productCategory: string;
  productModel?: string;
  requiredCapacityTPH?: number;
  feedMaterial?: string;
  expectedDeliveryDate?: string;
}

export interface SparePartsEnquiryPayload extends BaseEnquiryPayload {
  machineModel: string;
  machineSerialNumber?: string;
  partName: string;
  partNumber?: string;
  quantity: number;
  urgencyLevel: 'Normal' | 'Urgent' | 'Breakdown';
}

export interface TrackingStage {
  stage: 'NEW' | 'REVIEW' | 'SALES_CONTACTED' | 'EVALUATION' | 'QUOTATION' | 'CLOSED';
  label: string;
  completed: boolean;
  timestamp?: string;
  remarks?: string;
}

export interface EnquiryTrackingResult {
  referenceId: string;
  type: string;
  currentStatus: string;
  timeline: TrackingStage[];
  lastUpdated: string;
}
