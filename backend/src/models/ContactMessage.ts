import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactMessage extends Document {
  referenceId: string; // PZC-YYYY-XXXXXX
  name: string;
  company?: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  preferredOffice?: string;
  status: 'RECEIVED' | 'IN_REVIEW' | 'RESPONDED' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
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
    company: { type: String, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    preferredOffice: { type: String },
    status: {
      type: String,
      enum: ['RECEIVED', 'IN_REVIEW', 'RESPONDED', 'CLOSED'],
      default: 'RECEIVED',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ContactMessageModel: Model<IContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
