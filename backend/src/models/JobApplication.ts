import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IJobApplication extends Document {
  referenceId: string; // PZJ-YYYY-XXXXXX
  name: string;
  email: string;
  phone: string;
  positionApplied: string;
  department: 'Mechanical Engineering' | 'Manufacturing & Assembly' | 'Service & Field Support' | 'Corporate & Sales' | 'R&D';
  experienceYears: number;
  currentCompany?: string;
  noticePeriodDays?: number;
  resumeUrl: string;
  coverNote?: string;
  status: 'RECEIVED' | 'SHORTLISTED' | 'INTERVIEW_SCHEDULED' | 'OFFERED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
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
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    positionApplied: { type: String, required: true },
    department: {
      type: String,
      required: true,
      enum: ['Mechanical Engineering', 'Manufacturing & Assembly', 'Service & Field Support', 'Corporate & Sales', 'R&D'],
    },
    experienceYears: { type: Number, required: true, min: 0 },
    currentCompany: { type: String },
    noticePeriodDays: { type: Number, default: 30 },
    resumeUrl: { type: String, required: true },
    coverNote: { type: String },
    status: {
      type: String,
      enum: ['RECEIVED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'REJECTED'],
      default: 'RECEIVED',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const JobApplicationModel: Model<IJobApplication> =
  mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);
