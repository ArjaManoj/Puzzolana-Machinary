import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IServiceEnquiry extends Document {
  referenceId: string; // PZS-YYYY-XXXXXX
  name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  machineModel: string;
  machineSerialNumber?: string;
  serviceType: 'Routine Maintenance' | 'Emergency Breakdown' | 'Commissioning Support' | 'Operational Training';
  description: string;
  status: 'RECEIVED' | 'ENGINEER_ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

const ServiceEnquirySchema = new Schema<IServiceEnquiry>(
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
    serviceType: {
      type: String,
      enum: ['Routine Maintenance', 'Emergency Breakdown', 'Commissioning Support', 'Operational Training'],
      default: 'Routine Maintenance',
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['RECEIVED', 'ENGINEER_ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
      default: 'RECEIVED',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ServiceEnquiryModel: Model<IServiceEnquiry> =
  mongoose.models.ServiceEnquiry ||
  mongoose.model<IServiceEnquiry>('ServiceEnquiry', ServiceEnquirySchema);
