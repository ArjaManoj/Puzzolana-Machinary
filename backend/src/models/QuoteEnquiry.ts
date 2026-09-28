import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITrackingEvent {
  stage: 'RECEIVED' | 'UNDER_REVIEW' | 'SALES_CONTACTED' | 'TECHNICAL_EVALUATION' | 'QUOTATION' | 'CLOSED';
  label: string;
  completed: boolean;
  timestamp: Date;
  notes?: string;
}

export interface IQuoteEnquiry extends Document {
  referenceId: string; // PZQ-YYYY-XXXXXX
  name: string;
  company: string;
  designation?: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city: string;
  industry: string;
  application: string;
  productCategory: string;
  productModel?: string;
  requiredQuantity: number;
  requiredCapacityTPH?: number;
  feedMaterial?: string;
  message?: string;
  attachmentUrl?: string;
  status: 'RECEIVED' | 'UNDER_REVIEW' | 'SALES_CONTACTED' | 'TECHNICAL_EVALUATION' | 'QUOTATION' | 'CLOSED';
  timeline: ITrackingEvent[];
  assignedTo?: string;
  internalNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TrackingEventSchema = new Schema<ITrackingEvent>(
  {
    stage: {
      type: String,
      required: true,
      enum: ['RECEIVED', 'UNDER_REVIEW', 'SALES_CONTACTED', 'TECHNICAL_EVALUATION', 'QUOTATION', 'CLOSED'],
    },
    label: { type: String, required: true },
    completed: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
    notes: { type: String },
  },
  { _id: false }
);

const QuoteEnquirySchema = new Schema<IQuoteEnquiry>(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true, index: true },
    designation: { type: String, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    country: { type: String, required: true, default: 'India' },
    state: { type: String, required: true },
    city: { type: String, required: true },
    industry: { type: String, required: true },
    application: { type: String, required: true },
    productCategory: { type: String, required: true },
    productModel: { type: String },
    requiredQuantity: { type: Number, default: 1 },
    requiredCapacityTPH: { type: Number },
    feedMaterial: { type: String },
    message: { type: String },
    attachmentUrl: { type: String },
    status: {
      type: String,
      enum: ['RECEIVED', 'UNDER_REVIEW', 'SALES_CONTACTED', 'TECHNICAL_EVALUATION', 'QUOTATION', 'CLOSED'],
      default: 'RECEIVED',
      index: true,
    },
    timeline: [TrackingEventSchema],
    assignedTo: { type: String },
    internalNotes: { type: String },
  },
  {
    timestamps: true,
  }
);

QuoteEnquirySchema.index({ createdAt: -1 });

export const QuoteEnquiryModel: Model<IQuoteEnquiry> =
  mongoose.models.QuoteEnquiry ||
  mongoose.model<IQuoteEnquiry>('QuoteEnquiry', QuoteEnquirySchema);
