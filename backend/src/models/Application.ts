import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProcessFlowStep {
  stepNumber: number;
  title: string;
  description: string;
  recommendedEquipmentFamily?: string;
}

export interface IApplicationDomain extends Document {
  applicationId: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullOverview: string;
  heroImage: string;
  challenges: string[];
  solutions: string[];
  recommendedCategories: string[];
  processFlowSteps: IProcessFlowStep[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProcessFlowStepSchema = new Schema<IProcessFlowStep>(
  {
    stepNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    recommendedEquipmentFamily: { type: String },
  },
  { _id: false }
);

const ApplicationDomainSchema = new Schema<IApplicationDomain>(
  {
    applicationId: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullOverview: { type: String, required: true },
    heroImage: { type: String, required: true },
    challenges: [{ type: String }],
    solutions: [{ type: String }],
    recommendedCategories: [{ type: String }],
    processFlowSteps: [ProcessFlowStepSchema],
    isPublished: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const ApplicationDomainModel: Model<IApplicationDomain> =
  mongoose.models.ApplicationDomain ||
  mongoose.model<IApplicationDomain>('ApplicationDomain', ApplicationDomainSchema);
