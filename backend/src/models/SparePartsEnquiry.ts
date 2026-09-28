import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISparePartsEnquiry extends Document {
  referenceId: string; // PZP-YYYY-XXXXXX
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  machineModel: string;
  machineSerialNumber?: string;
  partName: string;
  partNumber?: string;
  quantity: number;
  urgencyLevel: 'Normal' | 'Urgent' | 'Breakdown';
  description?: string;
  attachmentUrl?: string;
  status: 'RECEIVED' | 'PARTS_CHECKED' | 'QUOTED' | 'DISPATCHED' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

const SparePartsEnquirySchema = new Schema<ISparePartsEnquiry>(
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
    location: { type: String, required: true },
    machineModel: { type: String, required: true },
    machineSerialNumber: { type: String },
    partName: { type: String, required: true },
    partNumber: { type: String },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    urgencyLevel: {
      type: String,
      enum: ['Normal', 'Urgent', 'Breakdown'],
      default: 'Normal',
    },
    description: { type: String },
    attachmentUrl: { type: String },
    status: {
      type: String,
      enum: ['RECEIVED', 'PARTS_CHECKED', 'QUOTED', 'DISPATCHED', 'CLOSED'],
      default: 'RECEIVED',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SparePartsEnquiryModel: Model<ISparePartsEnquiry> =
  mongoose.models.SparePartsEnquiry ||
  mongoose.model<ISparePartsEnquiry>('SparePartsEnquiry', SparePartsEnquirySchema);
