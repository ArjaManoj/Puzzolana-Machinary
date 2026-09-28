import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICaseStudy extends Document {
  caseStudyId: string;
  slug: string;
  title: string;
  clientName?: string;
  location: string;
  state: string;
  country: string;
  industry: string;
  application: string;
  plantCapacityTPH: number;
  equipmentSupplied: string[];
  featuredImage: string;
  challenge: string;
  solution: string;
  results: string[];
  yearOfInstallation?: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema = new Schema<ICaseStudy>(
  {
    caseStudyId: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    title: { type: String, required: true },
    clientName: { type: String },
    location: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true, default: 'India' },
    industry: { type: String, required: true, index: true },
    application: { type: String, required: true, index: true },
    plantCapacityTPH: { type: Number, required: true },
    equipmentSupplied: [{ type: String }],
    featuredImage: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    results: [{ type: String, required: true }],
    yearOfInstallation: { type: Number },
    isPublished: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const CaseStudyModel: Model<ICaseStudy> =
  mongoose.models.CaseStudy ||
  mongoose.model<ICaseStudy>('CaseStudy', CaseStudySchema);
