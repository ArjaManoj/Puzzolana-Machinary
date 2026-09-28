import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILocation extends Document {
  locationId: string;
  type: 'HEAD_OFFICE' | 'BRANCH_OFFICE' | 'MANUFACTURING_UNIT' | 'DEALER' | 'SERVICE_CENTER';
  title: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  latitude?: number;
  longitude?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>(
  {
    locationId: { type: String, required: true, unique: true, index: true },
    type: {
      type: String,
      required: true,
      enum: ['HEAD_OFFICE', 'BRANCH_OFFICE', 'MANUFACTURING_UNIT', 'DEALER', 'SERVICE_CENTER'],
      index: true,
    },
    title: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true, index: true },
    state: { type: String, required: true, index: true },
    country: { type: String, required: true, default: 'India' },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const LocationModel: Model<ILocation> =
  mongoose.models.Location || mongoose.model<ILocation>('Location', LocationSchema);
