import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEvent extends Document {
  eventId: string;
  slug: string;
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  country: string;
  venue: string;
  boothNumber?: string;
  description: string;
  bannerImage: string;
  registrationUrl?: string;
  status: 'upcoming' | 'ongoing' | 'past';
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    eventId: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true, index: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true, default: 'India' },
    venue: { type: String, required: true },
    boothNumber: { type: String },
    description: { type: String, required: true },
    bannerImage: { type: String, required: true },
    registrationUrl: { type: String },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'past'],
      default: 'upcoming',
      index: true,
    },
    isPublished: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const EventModel: Model<IEvent> =
  mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
