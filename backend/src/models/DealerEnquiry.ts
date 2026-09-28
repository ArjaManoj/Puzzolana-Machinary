import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDealerEnquiry extends Document {
  referenceId: string; // PZD-YYYY-XXXXXX
  name: string;
  company: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city: string;
  businessType: string;
  productInterest: string[];
  existingBusinessDetails: string;
  message?: string;
  status: 'RECEIVED' | 'UNDER_EVALUATION' | 'MEETING_SCHEDULED' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

const DealerEnquirySchema = new Schema<IDealerEnquiry>(
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
    company: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    businessType: { type: String, required: true },
    productInterest: [{ type: String }],
    existingBusinessDetails: { type: String, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ['RECEIVED', 'UNDER_EVALUATION', 'MEETING_SCHEDULED', 'APPROVED', 'REJECTED'],
      default: 'RECEIVED',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const DealerEnquiryModel: Model<IDealerEnquiry> =
  mongoose.models.DealerEnquiry ||
  mongoose.model<IDealerEnquiry>('DealerEnquiry', DealerEnquirySchema);
